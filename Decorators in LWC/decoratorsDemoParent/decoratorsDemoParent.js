import { LightningElement, track, wire } from 'lwc';

import getAccounts from '@salesforce/apex/DecoratorsDemoController.getAccounts';
const COLUMNS = [
    {
        label: 'Account Name', fieldName: 'accountURL', type: 'url',
        typeAttributes: {
            label: { fieldName: 'Name' },
            target: '_blank'
        }
    },
    { label: 'Phone', fieldName: 'Phone' }
]

export default class ParentComponent extends LightningElement {

    // #region SECTION CODE
    section = '';
    handleSectionToggle(event) {
        this.section = event.detail.openSections;
    }
    // #endregion

    // #region TRACK DECORATOR EXAMPLE

    // EXAMPLE 1
    counter = 0;
    example1CounterClickHandler(event) {
        this.counter += 1;
    }

    // EXAMPLE 2
    example2Obj = { counter: 0 };
    example2CounterClickHandler(event) {
        this.example2Obj = { counter: this.example2Obj.counter + 1 };
    }

    // EXAMPLE 3
    example3Obj = { counter: 0 };
    example3CounterClickHandler(event) {
        this.example3Obj.counter += 1;
    }

    // EXAMPLE 4
    @track example4Obj = { counter: 0 };
    example4CounterClickHandler(event) {
        this.example4Obj.counter += 1;
    }

    // #endregion

    // #region API DECORATOR EXAMPLE
    number1 = 0;
    number2 = 0;
    multiply = 0;
    apiSubmitClickHandler(event) {
        // this.number1 = this.refs.numberOne?.value;
        // this.number2 = this.refs.numberTwo?.value;

        this.refs.childDemo.numberOne = this.refs.numberOne?.value;
        this.refs.childDemo.numberTwo = this.refs.numberTwo?.value;

        console.log('Child number 2-', this.refs.childDemo.numberTwo);
    }

    multiplyClickHandler(event) {
        this.refs.childDemo?.multiply();
    }
    // #endregion

    // #region WIRE DECORATOR EXAMPLE
    columns = COLUMNS;
    accountsList = [];
    searchInputText = '';

    // @wire(getAccounts, { searchText: '$searchText' })
    // wiredAccountsList;  data / error


    @wire(getAccounts, { searchText: '$searchInputText' })
    //wiredAccounts({data,error}) {
    wiredAccounts(result) {
        console.log('In Wired Account');
        if (result.data) {
            this.accountsList = result.data.map(acc => ({
                ...acc,
                accountURL: '/' + acc.Id
            }));
        }
        else if (result.error) {
            console.log('Error while fetchting-' + result.error);
        }
    }

    connectedCallback() {
        console.log('In Connected Cacllback');
    }

    searchAccountsClickHandler(event) {
        this.searchInputText = this.refs.searchText?.value;
    }
    // #endregion 
}

