
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

let themesList = {
    themes: []
};
var themeDirs = fs.readdirSync('themes');

themeDirs.forEach(dir => {
    let theme = dir;
    themesList.themes.push(theme);
});

fs.writeFileSync('themes-list.json', JSON.stringify(themesList, null, 2));