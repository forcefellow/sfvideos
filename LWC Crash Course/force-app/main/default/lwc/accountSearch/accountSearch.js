import { LightningElement } from 'lwc';

export default class AccountSearch extends LightningElement {
    searchText = '';
    searchAccountContactHander(event) {
        this.searchText = event.detail;
    }
}