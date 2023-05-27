import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NavigationButton extends NavigationMixin(LightningElement) {

    navigateToLWCHandler() {
        let userName = this.refs.userName.value;
        let compDefination = {
            componentDef: "c:navigateDemo",
            attributes: {
                userName: userName
            }
        }
        let compDefBase64 = btoa(JSON.stringify(compDefination));

        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + compDefBase64
            }
        });
    }
}