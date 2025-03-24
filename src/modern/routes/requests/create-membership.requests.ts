// We assume anything can come as undefined
export interface CreateMembershipRequest {
    name?: string;
    recurringPrice?: number;
    validFrom: Date;
    state: string;
    paymentMethod: string;
    billingInterval: string;
    billingPeriods: number;
}