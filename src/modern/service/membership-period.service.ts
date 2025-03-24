import { v4 as uuidv4 } from 'uuid';
import { Membership } from '../model/membership.model';
import { MembershipPeriod } from '../model/membership-period.model';

export const createMembershipPeriods = (newMembership: Membership): MembershipPeriod[] => {
    const membershipPeriods = []

    let periodStart = newMembership.validFrom;
    for (let i = 0; i < newMembership.billingPeriods; i++) {
        const { validFrom, validUntil } = calculateValidity(periodStart, newMembership);
        const period = {
            id: i + 1,
            uuid: uuidv4(),
            membershipId: newMembership.id,
            start: validFrom,
            end: validUntil,
            state: 'planned'
        }

        membershipPeriods.push(period)
        periodStart = validUntil
    }

    return membershipPeriods;
}

function calculateValidity(periodStart: Date, newMembership: Membership) {
    const validFrom = periodStart;
    const validUntil = new Date(validFrom);
    
    if (newMembership.billingInterval === 'monthly') {
        validUntil.setMonth(validFrom.getMonth() + 1);
    } else if (newMembership.billingInterval === 'yearly') {
        validUntil.setMonth(validFrom.getMonth() + 12);
    } else if (newMembership.billingInterval === 'weekly') {
        validUntil.setDate(validFrom.getDate() + 7);
    }

    return { validFrom, validUntil };
}
