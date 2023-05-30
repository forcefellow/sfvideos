import { LightningElement } from 'lwc';

export default class WorkspaceAPIDemo extends LightningElement {
    tabsInfo = '';

    openNewTabHandler() {
        let compDefination = {
            componentDef: "c:workspaceAPINewTab",
            attributes: {

            }
        }
        let compBase64 = btoa(JSON.stringify(compDefination));

        this.invokeWorkspaceAPI('openTab', {
            url: `#${compBase64}`,
            focus: true
        })
    }

    async openNewSubTabHandler() {
        let compDefination = {
            componentDef: "c:workspaceAPINewTab",
            attributes: {

            }
        }
        let compBase64 = btoa(JSON.stringify(compDefination));
        let foucedTabInfo = await this.invokeWorkspaceAPI('getFocusedTabInfo');
        await this.invokeWorkspaceAPI('openSubtab', {
            parentTabId: foucedTabInfo.tabId,
            url: `#${compBase64}`,
            focus: true
        })
    }

    async refreshTabHandler() {
        let foucedTabInfo = await this.invokeWorkspaceAPI('getFocusedTabInfo');
        await this.invokeWorkspaceAPI('refreshTab', {
            tabId: foucedTabInfo.tabId,
            includeAllSubtabs: true
        })
    }

    async getAllTabsInfoHandler() {
        let tabsData = await this.invokeWorkspaceAPI('getAllTabInfo');
        this.tabsInfo = JSON.stringify(tabsData);
    }

    invokeWorkspaceAPI(methodName, methodArgs) {
        return new Promise((resolve, reject) => {
            const apiEvent = new CustomEvent("internalapievent", {
                bubbles: true,
                composed: true,
                cancelable: false,
                detail: {
                    category: "workspaceAPI",
                    methodName: methodName,
                    methodArgs: methodArgs,
                    callback: (err, response) => {
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(response);
                        }
                    }
                }
            });

            this.dispatchEvent(apiEvent);
        });
    }

}