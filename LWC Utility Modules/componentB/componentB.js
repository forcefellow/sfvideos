import { LightningElement } from 'lwc';
import {  showErrorToast, showSuccessToast, showWarningToast } from 'c/toastUtility';

export default class ComponentB extends LightningElement {


    handleSuccessClick() {
        showSuccessToast(this,'Success! from component B');
    }

    handleWarningClick() {
        showWarningToast(this,'Warning from component B');
    }

    handleErrorClick() {
        showErrorToast(this,'Error from component B');
    }
}