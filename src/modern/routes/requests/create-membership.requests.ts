// We assume anything can come as undefined
export interface CreateMembershipRequest {
    name: string | undefined;
    recurringPrice: number | undefined;
    validFrom: Date;
    validUntil: Date;
    state: string;
    paymentMethod: string;
    billingInterval: string;
    billingPeriods: number;
}