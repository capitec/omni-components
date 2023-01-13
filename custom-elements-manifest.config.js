/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-case-declarations */
const plugins = {
    plugins: [
        function cssCategoryPlugin() {
            return {
                // Runs for each module
                analyzePhase({ ts, node, moduleDoc }) {
                    switch (node.kind) {
                        case ts.SyntaxKind.ClassDeclaration:
                            const className = node.name.getText();

                            node.jsDoc?.forEach(jsDoc => {
                                jsDoc.tags?.forEach(tag => {
                                    const tagName = tag.tagName.getText();
                                    if (tagName && (tagName.toLowerCase() === 'csscat' || tagName.toLowerCase() === 'csscategory')) {
                                        const description = tag.comment;

                                        const classDeclaration = moduleDoc.declarations.find(declaration => declaration.name === className);

                                        classDeclaration.cssCategory = description;
                                    }
                                });
                            });

                            break;
                    }
                },
                // Runs for each module, after analyzing, all information about your module should now be available
                moduleLinkPhase({ moduleDoc }) {
                    // console.log(moduleDoc);
                },
                // Runs after all modules have been parsed, and after post processing
                packageLinkPhase(customElementsManifest) {
                    // console.log(customElementsManifest);
                },
            };
        }(),
        function slotFixPlugin() {
            return {
                // Runs for each module
                analyzePhase({ ts, node, moduleDoc }) {
                    switch (node.kind) {
                        case ts.SyntaxKind.ClassDeclaration:
                            const declaration = moduleDoc.declarations.find((d) => d.slots && d.slots.length > 0 && d.slots.find((s) => s.name === ''));
                            if (declaration) {
                                const slot = declaration.slots.find((s) => s.name === '');
                                if (slot) {
                                    slot.name = '[Default Slot]';
                                }
                            }

                            break;
                    }
                },
                // Runs for each module, after analyzing, all information about your module should now be available
                moduleLinkPhase({ moduleDoc }) {
                    // console.log(moduleDoc);
                },
                // Runs after all modules have been parsed, and after post processing
                packageLinkPhase({ customElementsManifest }) {
                    // console.log(customElementsManifest);
                    customElementsManifest.modules.filter(m => m.declarations.find((d) => d.superclass)).forEach((moduleDoc) => {
                        const declaration = moduleDoc.declarations.find((d) => d.superclass);

                        let superModule = moduleDoc;
                        do {
                            if (superModule.declarations.find((sd) => sd.superclass)) {
                                superModule = customElementsManifest.modules.find((module) => module.exports.find((e) => e.name === superModule.declarations.find((sd) => sd.superclass).superclass.name));
                            } else {
                                superModule = undefined;
                            }
                            if (superModule) {
                                superModule.declarations.forEach((dec) => {
                                    let slots = dec.slots;
                                    if (slots) {
                                        slots = JSON.parse(JSON.stringify(slots)).filter(s => !declaration.slots?.find(ds => ds.name === s.name));
                                        slots.forEach((slot) => {
                                            slot.inheritedFrom = {
                                                name: dec.name,
                                                module: superModule.path
                                            };
                                        });
                                        declaration.slots = [
                                            ...slots,
                                            ...(declaration.slots ?? [])
                                        ];
                                    }
                                });
                            }
                        } while (superModule);
                    });
                },
            };
        }(),
        function importPlugin() {
            return {
                analyzePhase({ ts, node, moduleDoc }) {
                    switch (node.kind) {
                        case ts.SyntaxKind.ClassDeclaration:
                            const className = node.name.getText();

                            node.jsDoc?.forEach(jsDoc => {
                                jsDoc.tags?.forEach(tag => {
                                    const tagName = tag.tagName.getText();
                                    if (tagName && (tagName.toLowerCase() === 'import')) {
                                        const value = tag.comment;
                                        const classDeclaration = moduleDoc.declarations.find(declaration => declaration.name === className);
                                        classDeclaration.import = value;
                                    }
                                });
                            });

                            break;
                    }
                },
                moduleLinkPhase({ moduleDoc }) {
                    // console.log(moduleDoc);
                },
                packageLinkPhase({ customElementsManifest }) {
                    // console.log(customElementsManifest);
                }
            };
        }(),
        function removeAttributePlugin() {
            return {
                analyzePhase({ ts, node, moduleDoc }) {
                    switch (node.kind) {
                        case ts.SyntaxKind.PropertyDeclaration:
                            const propertyName = node.name.getText();
                            const classNode = findParentClass(ts, node);
                            if (classNode){
                                const className = classNode.name.getText();
    
                                node.jsDoc?.forEach(jsDoc => {
                                    jsDoc.tags?.forEach(tag => {
                                        const tagName = tag.tagName.getText();
                                        if (tagName && (tagName.toLowerCase() === 'no_attribute')) {
                                            const value = tag.comment;
                                            const classDeclaration = moduleDoc.declarations.find(declaration => declaration.name === className);
                                            
                                            const attributes = classDeclaration.attributes.filter(a => a.name !== propertyName && a.fieldName !== propertyName);
                                            classDeclaration.attributes = attributes;

                                            const field = classDeclaration.members.find(m => m.name === propertyName);
                                            delete field.attribute;
                                        }
                                    });
                                });
                            }

                            break;
                    }
                },
                moduleLinkPhase({ moduleDoc }) {
                    // console.log(moduleDoc);
                },
                packageLinkPhase({ customElementsManifest }) {
                    // console.log(customElementsManifest);
                }
            };
        }()
    ]
};

function findParentClass(ts, node) {
    let parent = node.parent;
    while (parent && parent.kind !== ts.SyntaxKind.ClassDeclaration) {
        parent = parent.parent;
    }
    return parent;
}

export default plugins;