import chalk from 'chalk';
import { execSync } from 'child_process';
import commandLineArgs from 'command-line-args';
import { deleteSync } from 'del';
import esbuild from 'esbuild';
import fs from 'fs';
import { globby } from 'globby';
import copy from 'recursive-copy';

const { bundle, dir, tsdir, verbose } = commandLineArgs([
    { name: 'bundle', type: Boolean },
    { name: 'dir', type: String, defaultValue: 'dist' },
    { name: 'tsdir', type: String, defaultValue: 'dist' },
    { name: 'verbose', type: Boolean }
]);

const outdir = dir;

deleteSync(outdir);
deleteSync(tsdir);
fs.mkdirSync(tsdir, { recursive: true });

(async () => {
    try {
        if (verbose) console.log(chalk.bgYellow('Running the TypeScript compiler...'));
        execSync('npx -p typescript tsc', { stdio: 'inherit' });
        if (tsdir !== outdir) {
            console.log(chalk.greenBright(`TypeScript build has been generated at ${tsdir} \n`));
        }
    } catch (err) {
        console.error(chalk.red(err));
        process.exit(1);
    }

    // Copy the typescript output to an additional directory
    if (tsdir !== outdir) {
        if (verbose) console.log(chalk.bgYellow('Copying TypeScript output to build directory'));
        await copy(tsdir, outdir);
    }

    const format = 'esm';
    const target = 'es2017';

    console.log(`Building for ${format.toUpperCase()} ${target.toUpperCase()}...`);
    const entryPoints = await globby('./src/**/!(*.(style|test|stories)).ts');
    if (verbose) {
        console.log(chalk.bgYellow('Targeting the following entrypoints: \n'));
        entryPoints.forEach(e => console.log(chalk.bgYellow(`\t- ${e}`)));
    }
    const buildResult = await esbuild
        .build({
            format: format,
            target: target,
            entryPoints: entryPoints,
            outdir,
            chunkNames: 'chunks/[ext]/[name].[hash]',
            incremental: false,
            define: {
                // Floating UI requires this to be set
                'process.env.NODE_ENV': '"production"'
            },
            bundle: true,
            //
            // We don't bundle certain dependencies in the unbundled build. This ensures we ship bare module specifiers,
            // allowing end users to better optimize when using a bundler. (Only packages that ship ESM can be external.)
            //
            external: bundle ? [] : ['lit'],
            splitting: true,
            plugins: [],
            logLevel: verbose ? 'debug' : 'info'
        })
        .catch(err => {
            console.error(chalk.red(err));
            process.exit(1);
        });

    console.log(chalk.green(`The build has been generated at ${outdir} \n`));


    // Cleanup on exit
    process.on('SIGTERM', () => buildResult.rebuild.dispose());
})();