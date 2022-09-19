import packageJson from 'package-json';
import { execSync } from 'child_process';
import * as fs from 'fs/promises';

(async () => {

    try {
        const packageFile = JSON.parse(await fs.readFile('package.json'));
        const packageNpm = await packageJson(packageFile.name, { allVersions: true });

        const newVersion = !Object.keys(packageNpm.versions).find(v => v.includes(packageFile.version)) && true;

        if (!newVersion) {
            console.log('Bumping patch version');
            execSync('npm version patch -git-tag-version false -allow-same-version true');
        }
    } catch (error) {
        console.warn(error);
    }

})();