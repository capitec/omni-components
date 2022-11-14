import { execSync } from 'child_process';
import brode from '@geut/esbuild-plugin-brode';
import esbuild from 'esbuild';
import { dTSPathAliasPlugin } from 'esbuild-plugin-d-ts-path-alias';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { globby } from 'globby';
import * as filters from './eleventy/filters.js';
import * as globalData from './eleventy/globalData.js';

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

    for (const key in filters) {
        config.addFilter(key, filters[key]);
    }

    config.addShortcode('year', () => `${new Date().getFullYear()}`);

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

    execSync('npx cem analyze --litelement --globs src/**', { stdio: 'inherit' });
    // execSync('npx -p typescript tsc', { stdio: 'inherit' });
    execSync('npm run docs:theme-list');

    const entryPoints = await globby('./src/**/*.ts');

    await esbuild.build({
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
        incremental: true,
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
            }),
            dTSPathAliasPlugin()
        ],
        logLevel: 'info',
        minify: true,
        sourcemap: 'linked',
        sourcesContent: false
    });
    
    execSync('npx -p @innofake/merge-index merge-index --dir dist --out dist/omni-components.js');
}
