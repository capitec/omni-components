
function loadCssProperties(element: string, customElements: any, cssDeclarations: any = undefined): any {
    if (!cssDeclarations) {
        cssDeclarations = {};
    }

    const elementModule = customElements.modules.find((module: { exports: any[]; }) => module.exports.find((e: { name: string; }) => e.name === element));
    for (const key in elementModule.declarations) {
        const declaration = elementModule.declarations[key];
        if (declaration.cssProperties && declaration.cssProperties.length > 0) {
            for (const cssKey in declaration.cssProperties) {
                const cssProperty = declaration.cssProperties[cssKey];
                if (!cssDeclarations[cssProperty.name.replace("--", "")]) {
                    cssDeclarations[cssProperty.name.replace("--", "")] = {
                        control: cssProperty.name.includes("color") || cssProperty.name.includes("colour") || cssProperty.name.includes("fill") ? "color" : "text",
                        description: cssProperty.description,
                        category: "CSS Variables",
                        subcategory: "Component Variables",
                        value: ""
                    }
                } else {
                    cssDeclarations[cssProperty.name.replace("--", "")].subcategory = "Component Variables";
                }
            }
        }
    }

    return cssDeclarations;
}

function loadThemeVariablesRemote() {
    let error = undefined;
    let output = "";
    const request = new XMLHttpRequest();
    request.open('GET', 'theme-variables.json', false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = request.status;
    };
    request.send(null);
    
    if (error) {
        console.warn(error);
        return {};
    }

    let themeVariables = JSON.parse(output);
    return themeVariables;
}

function loadCssPropertiesRemote(element: string, cssDeclarations: any = undefined): any {
    if (!cssDeclarations) {
        const defaultVariables = loadThemeVariablesRemote();
        cssDeclarations = { ...defaultVariables };
    }

    let error = undefined;
    let output = "";
    const request = new XMLHttpRequest();
    request.open('GET', 'custom-elements.json', false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = request.status;
    };
    request.send(null);
    
    if (error) {
        return cssDeclarations;
    }

    let customElements = JSON.parse(output);
    
    cssDeclarations = loadCssProperties(element, customElements, cssDeclarations);

    // console.log(element, cssDeclarations);
    return cssDeclarations;
}

function loadCustomElementsRemote(): any {
    let error = undefined;
    let output = "";
    const request = new XMLHttpRequest();
    request.open('GET', 'custom-elements.json', false);  // `false` makes the request synchronous
    request.onload = () => {
        output = request.responseText;
    };
    request.onerror = () => {
        error = `${request.status} - ${request.statusText}`;
    };
    request.send(null);
    
    if (error) {
        throw new Error(error);
    }

    let customElements = JSON.parse(output);

    return customElements;
}


export { loadCustomElementsRemote, loadCssPropertiesRemote, loadCssProperties, loadThemeVariablesRemote }