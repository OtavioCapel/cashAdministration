import { Moment } from "moment";

export interface Expense {
    name: string;
    value: string;
    monthly: boolean;
    paid: boolean;
    expireDate: Date | Moment | string;
    description?: string;
    paymentDate?: Date;
}

