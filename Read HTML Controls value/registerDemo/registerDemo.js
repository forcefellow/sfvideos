import { LightningElement } from 'lwc';

export default class RegisterDemo extends LightningElement {
    // firstName = 'Test';
    // lastName = '';
    // phone = '';
    formData = {};

    firstNameChangeHandler(event) {
        //this.firstName = event.target.value;
    }

    // controlsValueChangeHandler(event) {
    //     let propName = event.target.dataset.propName,
    //         controlValue = event.target.value;

    //     switch (propName.toLowerCase()) {
    //         case 'firstname':
    //             this.firstName = controlValue;
    //             break;
    //         case 'lastname':
    //             this.lastName = controlValue;
    //             break;
    //         case 'phone':
    //             this.phone = controlValue;
    //             break;
    //     }
    // }

    controlsValueChangeHandler(event) {
        let propName = event.target.dataset.propName,
            controlValue = event.target.value;

        this.formData[propName] = controlValue;
    }

    submitClickHandler() {
        for (let prop in this.refs) {
            this.formData[prop] = this.refs[prop].value;
        }

        // let formControls = this.template.querySelectorAll('[data-prop-name]');
        // formControls.forEach(a => {
        //     this.formData[a.dataset.propName] = a.value;
        // });
        
        console.log(`First name is -${this.formData.firstName}`);
        console.log(`Last name is -${this.formData.lastName}`);
        console.log(`Phone is -${this.formData.phone}`);
        console.log(this.formData);
    }
}