import { LightningElement } from 'lwc';
import {  showErrorToast, showSuccessToast, showWarningToast } from 'c/toastUtility';


export default class ComponentA extends LightningElement {

     handleSuccessClick() {
        showSuccessToast(this,'Success! from component A');
    }

    handleWarningClick() {
        showWarningToast(this,'Warning from component A');
    }

    handleErrorClick() {
        showErrorToast(this,'Error from component A');
    }
}