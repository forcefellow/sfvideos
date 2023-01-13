import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    sampleText = 'Hello World'
    employee = {
        Name: 'Vinay',
        Age: '30Y',
        City: 'Jaipur',
        Salary: 70000
    }

    employeeList = [
        {
            Code: '001',
            Name: 'Vinay',
            Age: '30Y',
            City: 'Jaipur',
            Salary: 70000
        },
        {
            Code: '002',
            Name: 'Rohan',
            Age: '35Y',
            City: 'Jaipur',
            Salary: 80000
        },
        {
            Code: '003',
            Name: 'Amit',
            Age: '38Y',
            City: 'Jaipur',
            Salary: 90000
        }

    ]

    get getEmployeeCode() {
        const band = this.employee.Salary <= 30000 ? 'B1' : this.employee.Salary <= 60000 ? 'B2' : 'B3';
        return band;
    }
    constructor() {
        super();
        console.log('HelloWorld Constructor');
    }
    connectedCallback() {
        console.log('HelloWorld connectedCallback');
    }
    renderedCallback() {
        console.log('HelloWorld renderedCallback');
    }
    disconnectedCallback() {
        console.log('HelloWorld disconnectedCallback');
    }
}