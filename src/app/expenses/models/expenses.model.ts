import { Moment } from "moment";

export interface Expense {
    _id?: string;
    name: string;
    value: string;
    monthly: boolean;
    paid: boolean;
    expireDate?: Date;
    description?: string;
    paymentDate?: Date;
}

