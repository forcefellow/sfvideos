import { LightningElement, wire } from 'lwc';
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';
import demoMessageChannel from '@salesforce/messageChannel/demoMessageChannel__c';

export default class ComponentD extends LightningElement {
    userName = ''
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscription = subscribe(this.messageContext, demoMessageChannel, (message) => this.userNameHandler(message));
    }
    userNameHandler(message) {
        this.userName = message.userName;
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
    }
}