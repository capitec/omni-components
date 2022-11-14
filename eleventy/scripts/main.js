document.addEventListener('DOMContentLoaded', () => {

    // Open / Close the menu
    const menuButton = document.querySelector('.header-menu-button .material-icons');
    menuButton.addEventListener('click', (e) => {
        const nav = document.querySelector('nav');
        if (nav.classList.contains('mobile')) {
            nav.classList.remove('mobile');
            menuButton.innerText = 'menu';
        } else {
            nav.classList.add('mobile');
            menuButton.innerText = 'close';
        }
    });

    // Scroll highlight
    const storyRenderers = document.querySelectorAll('story-renderer');
    const tocAnchors = document.querySelectorAll('.component-toc a');

    window.addEventListener('scroll', () => {

        storyRenderers.forEach(sr => {
            let top = window.scrollY;
            let offset = sr.offsetTop + 65;
            let height = sr.offsetHeight;
            let id = sr.getAttribute('id');

            if (top > offset && top < offset + height) {

                // console.log(id, top, offset, height);

                tocAnchors.forEach(a => {
                    a.classList.remove('component-toc-active');
                    document.querySelector(`.component-toc a[href*='${id}']`).classList.add('component-toc-active');
                });
            }
        });
    });

    // Open tab from query string.
    if (document.location.pathname !== '/' && document.location.search) {
        const searchParams = new URLSearchParams(document.location.search);

        for (const param of searchParams) {
            switch (param[0]) {
                case 'tab': {
                    const id = param[1];
                    const target = document.querySelector(`[data-name="${id}"]`);
                    openTab(target, id);
                    break;
                } 
                default:
                    break;
            }
        }
    }

    document.querySelector('.component-overlay').style.display = 'none';
    document.querySelector('.component').style.display = 'block';
});

function openTab(target, tabId) {

    // Declare all variables
    var i, tabContent, tabLinks;

    // Get all elements with class="tabcontent" and hide them
    tabContent = document.getElementsByClassName('component-tab');
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tabLinks = document.getElementsByClassName('component-tab-button');
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove('active');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabId).style.display = 'block';
    target.classList.add('active');

    // Set nav state of tab.
    window.history.replaceState({}, '', `?tab=${tabId}`);
}

function copyToClipboard(id) {
    const range = document.createRange();
    range.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
}