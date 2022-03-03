
export interface Expense {
    _id?: string;
    name: string;
    value: string;
    monthly: boolean;
    expireDate?: Date;
    description?: string;
    paymentDate?: string;
}


