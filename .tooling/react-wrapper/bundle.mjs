import { execSync } from 'child_process';
import esbuild from 'esbuild';
import fs from 'fs-extra';
import { globby } from 'globby';

const outDir = 'bundle-dist';
const componentsDir = 'dist';
const format = 'esm';
const target = ["esnext", "node12.22.0"];//'es2017';


fs.rmSync(outDir, { recursive: true, force: true });

(async () => {

    if (!fs.existsSync(componentsDir)) {
        execSync('npm run generate');
    }

    await fs.copy(componentsDir, outDir);

    const packageFile = JSON.parse(fs.readFileSync(`${outDir}/package.json`, 'utf-8'));

    console.log(`Building for ${format.toUpperCase()} ${target.toString().toUpperCase()}...`);
    const entryPoints = (await globby(`./${outDir}/**/*.jsx`));

    entryPoints.forEach(e => {
        let contents = fs.readFileSync(e, 'utf-8');
        // Remove react import
        contents = contents.replace(new RegExp(`import React from 'react';`, 'g'), '')
            // Use React from window
            .replace(new RegExp(`react: React,`, 'g'), 'react: window.React,');

        fs.writeFileSync(e, contents, 'utf-8');
    })

    const buildResult = await esbuild
        .build({
            format: format,
            target: target,
            entryPoints: entryPoints,
            outdir: outDir,
            chunkNames: 'chunks-[ext]/[name].[hash]',
            define: {
                // Floating UI requires this to be set
                'process.env.NODE_ENV': '"production"'
            },
            bundle: true,
            //
            // We don't bundle certain dependencies in the unbundled build. This ensures we ship bare module specifiers,
            // allowing end users to better optimize when using a bundler. (Only packages that ship ESM can be external.)
            //
            external: ['react', 'react-dom'],
            splitting: true,
            plugins: [],
            logLevel: process.argv.includes('--debug') ? 'debug' : 'info',
            minify: true,
            sourcemap: 'linked',
            sourcesContent: false
            // sourceRoot: './'
        })
        .catch(err => {
            console.error(err);
            process.exit(1);
        });

    // Set package version and dependency to match Omni Components version
    const localOmniComponentsPackage = JSON.parse(fs.readFileSync('../../package.json', 'utf-8'));
    packageFile.version = localOmniComponentsPackage.version;

    delete packageFile.private;
    delete packageFile.scripts;
    delete packageFile.devDependencies;

    packageFile.dependencies = {
        'react': packageFile.dependencies['react']
    };

    packageFile.files.push('chunks-js');

    // Write out package file
    fs.writeFileSync(`${outDir}/package.json`, JSON.stringify(packageFile, null, 4), 'utf-8');

    console.log(`The build has been generated at ${outDir} \n`);

    // Cleanup on exit
    process.on('SIGTERM', () => buildResult.rebuild.dispose());
})();