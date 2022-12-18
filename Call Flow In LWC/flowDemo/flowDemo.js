import { LightningElement } from 'lwc';

export default class FlowDemo extends LightningElement {
    firstName;
    lastName;
    isShowFlow = false;
    flowVariables = [];
    showFlowHandler() {
        this.firstName = this.template.querySelector('lightning-input[data-name="firstName"]').value;
        this.lastName = this.template.querySelector('lightning-input[data-name="lastName"]').value;
        this.flowVariables = [
            {
                name: "fristName",
                type: "String",
                value: this.firstName
            },
            {
                name: "lastName",
                type: "String",
                value: this.lastName
            }
        ];
        this.isShowFlow = true;
    }

    handleFlowStatusChange(event) {
        if (event.detail.status?.toLowerCase() == 'finished') {
            this.isShowFlow = false;
            this.template.querySelector('lightning-input[data-name="firstName"]').value = '';
            this.template.querySelector('lightning-input[data-name="lastName"]').value = '';
        }
    }
}