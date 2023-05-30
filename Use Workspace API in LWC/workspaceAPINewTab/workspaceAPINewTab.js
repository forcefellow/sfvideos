import { LightningElement } from 'lwc';

export default class WorkspaceAPINewTab extends LightningElement {

    async closeTabHandler(event) {
        let foucedTabInfo = await this.invokeWorkspaceAPI('getFocusedTabInfo');
        await this.invokeWorkspaceAPI('closeTab', {
            tabId: foucedTabInfo.tabId,
        })
    }

    async changeTabLabelHandler(event) {
        let foucedTabInfo = await this.invokeWorkspaceAPI('getFocusedTabInfo');
        await this.invokeWorkspaceAPI('setTabLabel', {
            tabId: foucedTabInfo.tabId,
            label: 'LWC Demo Tab'
        })
    }

    async changeTabIconHandler(event) {
        let foucedTabInfo = await this.invokeWorkspaceAPI('getFocusedTabInfo');
        await this.invokeWorkspaceAPI('setTabIcon', {
            tabId: foucedTabInfo.tabId,
            icon: 'standard:contact',
            iconAlt: 'LWC Demo Tab'
        })
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