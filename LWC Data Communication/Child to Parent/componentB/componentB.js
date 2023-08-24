import { LightningElement, api } from 'lwc';

export default class ComponentB extends LightningElement {
    userName;
    isRendered = false;

    renderedCallback() {
        if (!this.isRendered && this.refs.compC) {
            this.refs.compC.addEventListener('usernamechange', this.userNameChangeHandler.bind(this));
            this.isRendered = true;
        }
    }
    userNameChangeHandler(event) {
        this.userName = event.detail.userName;

        const customEvent = new CustomEvent('usernamechange', {
            detail: { userName: this.userName }
        });
        this.dispatchEvent(customEvent);
    }
}