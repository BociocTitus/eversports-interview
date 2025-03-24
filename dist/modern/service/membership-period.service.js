"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMembershipPeriod = void 0;
const uuid_1 = require("uuid");
const createMembershipPeriod = (newMembership) => {
    const membershipPeriods = [];
    let periodStart = newMembership.validFrom;
    for (let i = 0; i < newMembership.billingPeriods; i++) {
        const { validFrom, validUntil } = calculateValidity(periodStart, newMembership);
        const period = {
            id: i + 1,
            uuid: (0, uuid_1.v4)(),
            membershipId: newMembership.id,
            start: validFrom,
            end: validUntil,
            state: 'planned'
        };
        membershipPeriods.push(period);
        periodStart = validUntil;
    }
};
exports.createMembershipPeriod = createMembershipPeriod;
function calculateValidity(periodStart, newMembership) {
    const validFrom = periodStart;
    const validUntil = new Date(validFrom);
    if (newMembership.billingInterval === 'monthly') {
        validUntil.setMonth(validFrom.getMonth() + 1);
    }
    else if (newMembership.billingInterval === 'yearly') {
        validUntil.setMonth(validFrom.getMonth() + 12);
    }
    else if (newMembership.billingInterval === 'weekly') {
        validUntil.setDate(validFrom.getDate() + 7);
    }
    return { validFrom, validUntil };
}
