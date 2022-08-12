const fs = require('fs');
const { customElementsManifestToMarkdown } = require('@custom-elements-manifest/to-markdown');
const path = require('path');

const manifestRaw = fs.readFileSync('custom-elements.json', 'utf-8');
const manifest = JSON.parse(manifestRaw);

const groupedManifests = [];
manifest.modules.forEach(module => {
    if (module.path.endsWith(`.ts`) &&
        !module.path.endsWith(`index.ts`) &&
        !module.path.includes(`stories`) &&
        !module.path.toLowerCase().includes(`story`) &&
        !module.path.toLowerCase().includes(`style`) &&
        !module.path.toLowerCase().includes(`icon`) &&
        !module.path.toLowerCase().includes(`internal`) &&
        !module.path.includes(`test`) &&
        !module.exports.find(ex => ex.kind === `custom-element-definition`) &&
        module.exports.find(ex => ex.kind === `js`)
    ) {
        const dir = path.dirname(module.path);
        if (!groupedManifests[dir]) {
            groupedManifests[dir] = []
        }

        if (module.declarations) {
            module.declarations.forEach(dec => {
                if (dec.members ) {
                    dec.members.forEach(member => {
                        if (member.description) {
                            member.description = member.description.replaceAll(`\r\n`,`
                            `);
                        }
                    });
                }
            })
        }
        groupedManifests[dir].push(module)
    }
});

for (const dir in groupedManifests) {
    if (Object.hasOwnProperty.call(groupedManifests, dir)) {
        const manifests = groupedManifests[dir];

        let manifest = {
            schemaVersion: "1.0.0",
            readme: "",
            modules: manifests
        };
        const markdown = customElementsManifestToMarkdown(manifest);

        fs.writeFileSync(`${dir}/README.md`, markdown);
    }
}
