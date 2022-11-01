
const deasync = require('deasync');
const eleventyConfig = requireESM('./scripts/eleventy-config.mjs');

function requireESM(module) {
    let mod;

    import(module)
        .then(res => mod = res)
        .catch(err => console.error(mod = err))

    while (!mod) deasync.sleep(100);

    return mod;
}

function configSync(c) {
    let config;

    eleventyConfig.default(c)
        .then(res => config = res)
        .catch(err => console.error(config = err))

    while (!config) deasync.sleep(100);

    return config;
}

module.exports = c => configSync(c);