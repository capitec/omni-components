import { raw } from '../../../dist/utils/StoryUtils.js';

export function baseHref() {
    const basePath = process.env.ELEVENTY_BASE_PATH;
    if (basePath) {
        return raw`<base href="${basePath}" ><script>window.ELEVENTY_BASE_PATH = '${basePath}'</script>`
    }
    return raw`<base href="/" >`
}

export function year() {
    return new Date().getFullYear().toString();
}

export function version() {
    const docsVersion = process.env.ELEVENTY_DOCS_VERSION;
    if (docsVersion) {
        return docsVersion;
    }
    return 'LOCAL'
}