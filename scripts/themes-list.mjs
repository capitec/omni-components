import { readdirSync, writeFileSync } from 'fs';

let themesList = {
    themes: []
};
var themeDirs = readdirSync('themes');

themeDirs.forEach(dir => {
    let theme = dir;
    themesList.themes.push(theme);
});

writeFileSync('themes-list.json', JSON.stringify(themesList, null, 2));