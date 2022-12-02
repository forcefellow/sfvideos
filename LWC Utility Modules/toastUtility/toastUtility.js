
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const VARIENT_SUCCESS='success',
      VARIENT_ERROR='error',
      VARIENT_WARNING='warning';

var showToast=function(compnent,variant,title,message){
    const event = new ShowToastEvent({
        title,
        message,
        variant,
        mode: 'dismissable'
    });
    compnent.dispatchEvent(event);
}

var showSuccessToast=function(compnent,message,title='Success !'){
    showToast(compnent,VARIENT_SUCCESS,title,message);
}

var showErrorToast=function(compnent,message,title="Error !"){
    showToast(compnent,VARIENT_ERROR,title,message);
}

var showWarningToast=function(compnent,message,title="Warning !"){
    showToast(compnent,VARIENT_WARNING,title,message);
}

export{
    showToast,
    showErrorToast,
    showSuccessToast,
    showWarningToast
}