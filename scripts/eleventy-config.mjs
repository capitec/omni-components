import { execSync } from 'child_process';
import { readFile } from 'fs/promises';
import brode from '@geut/esbuild-plugin-brode';
import esbuild from 'esbuild';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';
import { globby } from 'globby';

await build();

export default async config => {

    // Global data for components.
    config.addGlobalData('components', async () => {
        const stories = await globby('./dist/**/*.stories.js');
        const response = [];

        for (const story of stories) {
            response.push({
                path: story.replace('./', '/'),
                name: story.match(/([A-Z])\w+/g)[0]
            });
        }
        
        return response;
    });

    // Global data for custom elements.
    config.addGlobalData('customElements', async () => {
        const ce = await readFile('./custom-elements.json', 'utf-8');
        const pce = JSON.parse(ce);
        return pce;
    });

    config.addPassthroughCopy('./docs/assets/');
    config.addPassthroughCopy('./docs/favicon.ico');

    config.addWatchTarget('./docs/assets/');
    config.addWatchTarget('./src/');

    config.addShortcode('year', () => `${new Date().getFullYear()}`);

    config.on('eleventy.beforeWatch', async () => {
        await build();
    });

    config.setBrowserSyncConfig({
        logLevel: 'debug',
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

    const entryPoints = await globby('./src/**/*.ts');

    await esbuild.build({
        logOverride: {
            'unsupported-dynamic-import': 'silent'
        },
        format: 'esm',
        target: 'es2017',
        entryPoints: entryPoints,
        outdir: 'dist',
        chunkNames: 'chunks-[ext]/[name].[hash]',
        incremental: true,
        define: {
            // Floating UI requires this to be set
            'process.env.NODE_ENV': '"production"'
        },
        bundle: true,
        external: [],
        splitting: true,
        // plugins: [globPlugin()],
        plugins: [
            nodeModulesPolyfillPlugin(),
            brode({
                environmentsFilter: (e) => false,
                modulesFilter: (m) => {
                    return m !== 'fs';
                }
            })
        ],
        logLevel: 'debug',
        minify: true,
        sourcemap: 'linked',
        sourcesContent: false
    });
}
