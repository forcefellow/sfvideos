import { LightningElement } from 'lwc';

export default class AccountSearchFrom extends LightningElement {
    searchText = '';

    accountNameChangeHandler(event) {
        this.searchText = event.target.value;
    }

    searchClickHandler() {
        const event = new CustomEvent('searchaccountcontact', { detail: this.searchText });
        this.dispatchEvent(event);
    }
}