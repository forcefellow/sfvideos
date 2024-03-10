import { LightningElement } from 'lwc';

export default class LifecycleHooksParent extends LightningElement {
    userName = '';

    constructor() {
        super();
        this.userName = 'Hello';
        console.log('In parent constructor');
    }

    connectedCallback() {
        console.log('In parent connectedCallback');
    }

    renderedCallback() {
        console.log('In parent renderedCallback');
        //this.refs.userName.value = 'Demo';
    }

    disconnectedCallback() {
        console.log('In parent disconnectedCallback');
    }

    errorCallback(error, stack) {
        console.log('In parent errorCallback');
    }

    //
    submitClickHandler(event) {
        this.userName = this.refs.userName?.value;
    }
}