import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import externalCSSDemo from '@salesforce/resourceUrl/externalCSSDemo';

export default class ApplyCustomCSS extends LightningElement {
    value = '';

    get options() {
        return [
            { label: 'Sales', value: 'option1' },
            { label: 'Force', value: 'option2' },
        ];
    }

    connectedCallback() {
        loadStyle(this, externalCSSDemo);
    }

    renderedCallback() {
        // const style = document.createElement('style');
        // style.innerText = `.custom-brand .slds-input,.custom-brand .slds-button{
        //     border-radius:25px;
        // }
        // .custom-brand lightning-radio-group .slds-form-element__control{
        //     display:flex;
        // }
        // `;
        // this.template.querySelector('.custom-brand')?.appendChild(style);
    }
}