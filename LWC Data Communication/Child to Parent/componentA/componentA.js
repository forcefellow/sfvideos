import { LightningElement } from 'lwc';

export default class ComponentA extends LightningElement {
    userName;

    userNameChangeHandler(event) {
        this.userName = event.detail.userName;
    }
}