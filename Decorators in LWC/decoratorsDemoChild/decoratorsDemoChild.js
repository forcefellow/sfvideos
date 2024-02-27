import { LightningElement, api } from 'lwc';

export default class DecoratorsDemoChild extends LightningElement {

    @api numberOne = 0;
    @api numberTwo = 0;
    multiNumber = 0;
    @api
    multiply() {
        this.multiNumber = this.numberOne * this.numberTwo;
    }
}