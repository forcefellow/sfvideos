import { LightningElement } from 'lwc';

export default class ComponentA extends LightningElement {
    parentUserName;
    submitClickHandler(event) {
        this.parentUserName = this.refs.userName.value;
        this.refs.compB.userName = this.parentUserName;
        this.refs.compB.demoMethod(this.parentUserName);
    }
}