import { LightningElement,api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/LWCAccountsController.getAccounts'

// Import message service features required for publishing and the message channel
import { publish, MessageContext } from 'lightning/messageService';
import viewAccountContactsChannel from '@salesforce/messageChannel/viewAccountContactsChannel__c';

const COLUMNS = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name'},
    { label: 'Actions', type:'button', typeAttributes:{
        label:'View Contacts',
        name:'View Contacts',
        title:'View Contacts',
        value:'View_Contacts',
    }},
];

export default class AccountSearchResult extends LightningElement {
    @api searchText
    columns=COLUMNS;
    @wire(getAccounts,{searchText:"$searchText"})
    accountsList;

    @wire(MessageContext)
    messageContext;

    rowActionHandler(event){
        if(event.detail.action.value=='View_Contacts'){
            const payload = { accountId: event.detail.row.Id,accountName: event.detail.row.Name };

            publish(this.messageContext, viewAccountContactsChannel, payload);
        }
    }

}