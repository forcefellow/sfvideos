import { LightningElement } from 'lwc';

export default class HelloIndia extends LightningElement {
    constructor() {
        super();
        console.log('HelloIndia Constructor');
    }
    connectedCallback() {
        console.log('HelloIndia connectedCallback');
    }
    renderedCallback() {
        console.log('HelloIndia renderedCallback');
    }
    disconnectedCallback() {
        console.log('HelloIndia disconnectedCallback');
    }
}