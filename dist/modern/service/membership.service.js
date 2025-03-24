"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMembership = void 0;
const memberships_json_1 = __importDefault(require("../../data/memberships.json"));
const uuid_1 = require("uuid");
const createMembership = (createMembershipRequest) => {
    var _a, _b;
    const userId = 2000;
    const validFrom = createMembershipRequest.validFrom ? new Date(createMembershipRequest.validFrom) : new Date();
    const validUntil = new Date(validFrom);
    calculateBillingInterval(createMembershipRequest, validUntil, validFrom);
    const newMembership = {
        id: memberships_json_1.default.length + 1,
        uuid: (0, uuid_1.v4)(),
        name: (_a = createMembershipRequest.name) !== null && _a !== void 0 ? _a : "",
        state: calculateMembershipState(validFrom, validUntil),
        validFrom: validFrom,
        validUntil: validUntil,
        userId: userId,
        assignedBy: "Admin",
        paymentMethod: createMembershipRequest.paymentMethod,
        recurringPrice: (_b = createMembershipRequest.recurringPrice) !== null && _b !== void 0 ? _b : 0,
        billingPeriods: createMembershipRequest.billingPeriods,
        billingInterval: createMembershipRequest.billingInterval,
    };
    const membershipToSaveInJsonFile = Object.assign(Object.assign({}, newMembership), { validFrom: String(validFrom), validUntil: String(validUntil) });
    memberships_json_1.default.push(membershipToSaveInJsonFile);
    return newMembership;
};
exports.createMembership = createMembership;
function calculateMembershipState(validFrom, validUntil) {
    if (validFrom > new Date()) {
        return 'pending';
    }
    if (validUntil < new Date()) {
        return 'expired';
    }
    return 'active';
}
function calculateBillingInterval(createMembershipRequest, validUntil, validFrom) {
    if (createMembershipRequest.billingInterval === 'monthly') {
        validUntil.setMonth(validFrom.getMonth() + createMembershipRequest.billingPeriods);
    }
    else if (createMembershipRequest.billingInterval === 'yearly') {
        validUntil.setMonth(validFrom.getMonth() + createMembershipRequest.billingPeriods * 12);
    }
    else if (createMembershipRequest.billingInterval === 'weekly') {
        validUntil.setDate(validFrom.getDate() + createMembershipRequest.billingPeriods * 7);
    }
}
