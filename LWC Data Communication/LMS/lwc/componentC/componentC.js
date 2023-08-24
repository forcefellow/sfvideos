import { LightningElement, wire } from 'lwc';
import { publish, MessageContext, createMessageContext } from 'lightning/messageService';
import demoMessageChannel from '@salesforce/messageChannel/demoMessageChannel__c';

export default class ComponentC extends LightningElement {

    @wire(MessageContext)
    messageContext;

    submitClickHandler(event) {
        let userName = this.refs.userName?.value;

        const customEvent = new CustomEvent('usernamechange', {
            detail: { userName: userName }
        });
        this.dispatchEvent(customEvent);

        let payload = { userName: userName };
        publish(this.messageContext, demoMessageChannel, payload);
    }
}