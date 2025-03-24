export interface MembershipPeriod {
    start: Date // indicates the start of the period
    end: Date // indicates the end of the period
    membershipId: number;
    state: string
}