import { LightningElement, api } from 'lwc';
import templateOne from './lifecycleHooksChild.html';
import templateTwo from './lifecycleHooksChild1.html';

export default class LifecycleHooksChild extends LightningElement {
    @api userName;
    constructor() {
        super();
        console.log('In child constructor');
    }

    connectedCallback() {
        console.log('In child connectedCallback');
    }

    render() {
        console.log('In child render');
        if (this.userName == 'render demo') {
            return templateTwo;
        }
        return templateOne;
    }
    renderedCallback() {
        console.log('In child renderedCallback');
    }

    disconnectedCallback() {
        console.log('In child disconnectedCallback');
    }

    errorCallback(error, stack) {
        console.log('In child errorCallback');
    }
}