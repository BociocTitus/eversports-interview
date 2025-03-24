"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const membership_validations_1 = require("./membership.validations");
describe("membership-validations-test", () => {
    const baseMembership = {
        name: "Platinum Plan",
        recurringPrice: 150.0,
        validFrom: new Date("2023-01-01"),
        validUntil: new Date("2023-12-31"),
        state: "active",
        paymentMethod: "credit card",
        billingInterval: "monthly",
        billingPeriods: 12
    };
    it("should return missingMandatoryFields ", () => {
        const missingMandatoryFieldsMembership = Object.assign(Object.assign({}, baseMembership), { name: undefined, recurringPrice: undefined });
        expect((0, membership_validations_1.validateCreateMembershipRequestBody)(missingMandatoryFieldsMembership))
            .toBe("missingMandatoryFields");
    });
    it("should return negativeRecurringPrice ", () => {
        const missingMandatoryFieldsMembership = Object.assign(Object.assign({}, baseMembership), { recurringPrice: -2 });
        expect((0, membership_validations_1.validateCreateMembershipRequestBody)(missingMandatoryFieldsMembership))
            .toBe("negativeRecurringPrice");
    });
    it("should return cashPriceBelow100 ", () => {
        const missingMandatoryFieldsMembership = Object.assign(Object.assign({}, baseMembership), { recurringPrice: 102, paymentMethod: "cash" });
        expect((0, membership_validations_1.validateCreateMembershipRequestBody)(missingMandatoryFieldsMembership))
            .toBe("cashPriceBelow100");
    });
    it("should return invalidBillingPeriods ", () => {
        const missingMandatoryFieldsMembership = Object.assign(Object.assign({}, baseMembership), { billingInterval: "daily" });
        expect((0, membership_validations_1.validateCreateMembershipRequestBody)(missingMandatoryFieldsMembership))
            .toBe("invalidBillingPeriods");
    });
    it("should return billingPeriodsMoreThan12Months ", () => {
        const missingMandatoryFieldsMembership = Object.assign(Object.assign({}, baseMembership), { billingPeriods: 14 });
        expect((0, membership_validations_1.validateCreateMembershipRequestBody)(missingMandatoryFieldsMembership))
            .toBe("billingPeriodsMoreThan12Months");
    });
    it("should return billingPeriodsLessThan6Months ", () => {
        const missingMandatoryFieldsMembership = Object.assign(Object.assign({}, baseMembership), { billingPeriods: 1 });
        expect((0, membership_validations_1.validateCreateMembershipRequestBody)(missingMandatoryFieldsMembership))
            .toBe("billingPeriodsLessThan6Months");
    });
    it("should return billingPeriodsMoreThan10Years ", () => {
        const missingMandatoryFieldsMembership = Object.assign(Object.assign({}, baseMembership), { billingInterval: "yearly", billingPeriods: 11 });
        expect((0, membership_validations_1.validateCreateMembershipRequestBody)(missingMandatoryFieldsMembership))
            .toBe("billingPeriodsMoreThan10Years");
    });
    it("should return billingPeriodsLessThan3Years ", () => {
        const missingMandatoryFieldsMembership = Object.assign(Object.assign({}, baseMembership), { billingInterval: "yearly", billingPeriods: 5 });
        expect((0, membership_validations_1.validateCreateMembershipRequestBody)(missingMandatoryFieldsMembership))
            .toBe("billingPeriodsLessThan3Years");
    });
});
