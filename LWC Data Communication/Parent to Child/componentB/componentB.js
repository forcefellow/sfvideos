import { LightningElement, api } from 'lwc';

export default class ComponentB extends LightningElement {
    @api userName;

    @api
    demoMethod(name) {
        console.log(name);
    }
}