import { execSync } from 'child_process';
import { EleventyRenderPlugin } from '@11ty/eleventy';
import brode from '@geut/esbuild-plugin-brode';
import chalk from 'chalk';
import esbuild from 'esbuild';
import { dTSPathAliasPlugin } from 'esbuild-plugin-d-ts-path-alias';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { globby } from 'globby';
import minimist from 'minimist';
import { raw } from '../dist/utils/StoryUtils.js';
import * as filters from './eleventy/filters.js';
import * as globalData from './eleventy/globalData.js';

const argv = minimist(process.argv.slice(2), {
    string: [
        'input',
        'output',
        'formats',
        'config',
        'pathprefix',
        'port',
        'to',
    ],
    boolean: [
        'quiet',
        'version',
        'watch',
        'dryrun',
        'help',
        'serve',
        'passthroughall',
        'incremental',
    ],
    default: {
        quiet: null,
    },
    unknown: function (unknownArgument) {
        console.warn(`Unknown argument: `, unknownArgument);
    },
});
const incremental = argv.serve ?? false;

let buildResult = null;

await build();

export default async config => {

    for (const key in globalData) {
        config.addGlobalData(key, globalData[key]);
    }

    config.addPassthroughCopy('./eleventy/assets/');
    config.addPassthroughCopy('./eleventy/favicon.ico');
    config.addPassthroughCopy('./custom-elements.json');
    config.addPassthroughCopy('./themes-list.json');
    config.addPassthroughCopy('./themes/');

    config.addWatchTarget('./scripts/');
    config.addWatchTarget('./eleventy/assets/');
    config.addWatchTarget('./themes/');
    config.addWatchTarget('./src/');
    config.addWatchTarget('./*.md');

    config.addPlugin(EleventyRenderPlugin);

    for (const key in filters) {
        config.addFilter(key, filters[key]);
    }

    config.addShortcode('year', () => `${new Date().getFullYear()}`);
    config.addShortcode('baseHref', () => {
        const basePath = process.env.ELEVENTY_BASE_PATH;
        if (basePath) {
            return raw`<base href="${basePath}">`
        }
        return raw`<base href="/">`
    });

    config.on('eleventy.beforeWatch', async (files) => {
        const isSrc = files.some(f => f.startsWith('./src'));
        if (isSrc) {
            await build();
        }
    });

    config.setBrowserSyncConfig({
        logLevel: 'info',
        server: {
            baseDir: 'docs',
            routes: {
                '/dist': './dist',
                '/src': './src'
            }
        }
    });

    return {
        dir: {
            includes: 'includes',
            input: 'eleventy',
            output: 'docs',
        },
    };
};

async function build() {

    console.log(chalk.yellow('Analyzing custom elements...'));
    execSync('npm run docs:custom-elements', { stdio: 'inherit' });
    // execSync('npx -p typescript tsc', { stdio: 'inherit' });
    console.log(chalk.yellow('Generating themes list...'));
    execSync('npm run docs:theme-list', { stdio: 'inherit' });

    console.log(chalk.yellow('Reading entry points...'));
    const entryPoints = await globby('./src/**/*.ts');

    console.log(chalk.yellow('Running esbuild...'));

    if (!incremental || !buildResult) {
        buildResult = await esbuild.build({
            logOverride: {
                'unsupported-dynamic-import': 'silent',
                'unsupported-regexp': 'silent',
                'unsupported-require-call': 'silent'
            },
            format: 'esm',
            target: 'es2017',
            entryPoints: entryPoints,
            outdir: 'dist',
            chunkNames: 'chunks-[ext]/[name].[hash]',
            incremental: incremental,
            define: {
                'process.env.NODE_ENV': '"production"'
            },
            bundle: true,
            external: [],
            splitting: true,
            plugins: [
                nodeModulesPolyfillPlugin(),
                brode({
                    environmentsFilter: () => false,
                    modulesFilter: (m) => {
                        return m !== 'fs';
                    }
                })// ,
                // dTSPathAliasPlugin()
            ],
            logLevel: 'info',
            minify: true,
            sourcemap: 'linked',
            sourcesContent: false
        });
    } else if (incremental && buildResult) {
        buildResult = await buildResult.rebuild();
    }

    console.log(chalk.yellow('Generating root merged index...'));
    execSync('npx -p @innofake/merge-index merge-index --dir dist --out dist/omni-components.js');

    console.log(chalk.green('Done with build...'));
}
