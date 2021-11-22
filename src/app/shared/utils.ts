import * as moment from "moment";
import { FormGroup } from "@angular/forms";

export function formatDate(value) {
    if(value.seconds) {
        value = value.toDate()
    }
  
    return moment(new Date(value)).format('DD/MM/YYYY')
}


export function checkRequeridAllFields(form: FormGroup) {
    console.log(form)
    return
}