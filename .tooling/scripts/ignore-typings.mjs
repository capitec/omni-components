import chalk from 'chalk';
import { readdir } from 'fs/promises';
import fs from 'fs-extra';

(async () => {
    const getDirectories = async source =>
        (await readdir(source, { withFileTypes: true }))
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

    console.log(chalk.grey('Updating file lists for components'));

    // Detect all component directories in src
    const directories = await getDirectories('./src');

    // Read relevant files for edit
    const packageFile = JSON.parse(await fs.readFile('package.json'));
    const vscodeSettings = JSON.parse(await fs.readFile('.vscode/settings.json'));

    // Loop through each component directory and update relevant files where necessary
    directories.forEach(d => {
        console.log(chalk.grey(`\t${d}`));

        try {
    
            // Ensure package.json has a files list
            if (!packageFile.files) {
                packageFile.files = [];
            }
    
            // Update package files for every component if not already there
            if (!packageFile.files.find(line => line === d)) {
                packageFile.files.push(d);
            }
    
            // Ensure .vscode settings.json has a files exclusion setting
            if (!vscodeSettings['files.exclude']) {
                vscodeSettings['files.exclude'] = {};
            }
    
            // Update .vscode settings.json files exclusion setting for every component
            vscodeSettings['files.exclude'][d] = true;
        } catch (error) {
            console.warn(chalk.bgYellow(error));
        }        
    });    

    // Clean up package files for non-existent components
    packageFile.files = packageFile.files.filter(file => (file.startsWith('dist') || file.startsWith('src') || file.startsWith('!') || directories.includes(file)) && !file.includes('utils'));
            

    // Write out updated files
    await fs.writeFile('package.json',JSON.stringify(packageFile, null, 4));
    await fs.writeFile('.vscode/settings.json',JSON.stringify(vscodeSettings, null, '\t'));

    console.log(chalk.green('Done...'))

})();