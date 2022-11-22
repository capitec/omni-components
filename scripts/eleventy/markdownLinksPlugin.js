
import GithubSlugger from 'github-slugger';
import innertext from 'innertext';

const defaultOptions = {
    prefixHeadingIds: true,
    prefix: 'user-content-',
    className: 'anchor',
    resetSlugger: true
}

export default function plugin(md, _opts) {
    const options = Object.assign({}, defaultOptions, _opts)

    if (!options.prefixHeadingIds) options.prefix = ''

    const slugger = new GithubSlugger();
    let Token;

    md.core.ruler.push('headingLinks', function (state) {
        if (options.resetSlugger) {
            slugger.reset()
        }
        
        if (!Token) {
            Token = state.Token
        }

        function fixLinks(token) {
            if (!token || !token.children) {
                return;
            }

            token.children.forEach(childToken => {
                if (childToken.attrs) {
                    childToken.attrs.forEach(attr => {
                        if (attr[0] === 'href' && attr[1].startsWith('#')) {
                            attr[1] = state.env.page.url + '#' + options.prefix + attr[1].replace('#','');
                        }
                    })
                }
                fixLinks(childToken);
            });
        }

        state.tokens.forEach(token => {
            if (token && token.content && token.content.includes('](#')) {
                token.content = token.content.replaceAll('](#',`](${state.env.page.url + '#' + options.prefix}`)
                fixLinks(token);
            }
        });
    })

    md.renderer.rules.heading_open = function (tokens, idx, opts, env, self) {
        const headingToken = tokens[idx + 1];
        const children = headingToken.children;
        
        if (children && children.length) {
            
            const unemojiWithToken = unemoji.bind(null, Token)
            const rendered = md.renderer.renderInline(children.map(unemojiWithToken), opts, env)
            const postfix = slugger.slug(
                innertext(rendered)
                    .replace(/[<>]/g, '') // In case the heading contains `<elements>`
                    .toLowerCase() // because `slug` doesn't lowercase
            )

            const linkOpen = new Token('link_open', 'a', 1)
            const text = new Token('html_inline', '', 0)
            const linkClose = new Token('link_close', 'a', -1)

            linkOpen.attrSet('id', options.prefix + postfix)
            linkOpen.attrSet('class', options.className)
            linkOpen.attrSet('href', env.page.url + '#' + options.prefix + postfix)
            linkOpen.attrSet('aria-hidden', 'true')

            children.unshift(linkClose)
            children.unshift(text)
            children.unshift(linkOpen)
        }

        return md.renderer.renderToken(tokens, idx, options, env, self)
    }
}

function unemoji(TokenConstructor, token) {
    if (token.type === 'emoji') {
        return Object.assign(new TokenConstructor(), token, { content: token.markup })
    }
    return token
}
