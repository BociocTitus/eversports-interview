import { CreateMembershipRequest } from "../routes/requests/create-membership.requests";
import { validateCreateMembershipRequestBody } from "./membership.validations";

describe("membership-validations-test", () => {
    const baseMembership: CreateMembershipRequest = {
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
        const missingMandatoryFieldsMembership = {
            ...baseMembership,
            name: undefined,
            recurringPrice: undefined,
        };

        expect(validateCreateMembershipRequestBody(missingMandatoryFieldsMembership))
            .toBe("missingMandatoryFields");
    })

    it("should return negativeRecurringPrice ", () => {
        const missingMandatoryFieldsMembership = {
            ...baseMembership,
            recurringPrice: -2,
        };

        expect(validateCreateMembershipRequestBody(missingMandatoryFieldsMembership))
            .toBe("negativeRecurringPrice");
    })

    it("should return cashPriceBelow100 ", () => {
        const missingMandatoryFieldsMembership = {
            ...baseMembership,
            recurringPrice: 102,
            paymentMethod: "cash",
        };

        expect(validateCreateMembershipRequestBody(missingMandatoryFieldsMembership))
            .toBe("cashPriceBelow100");
    })

    it("should return invalidBillingPeriods ", () => {
        const missingMandatoryFieldsMembership = {
            ...baseMembership,
            billingInterval: "daily"
        };

        expect(validateCreateMembershipRequestBody(missingMandatoryFieldsMembership))
            .toBe("invalidBillingPeriods");
    })

    it("should return billingPeriodsMoreThan12Months ", () => {
        const missingMandatoryFieldsMembership = {
            ...baseMembership,
            billingPeriods: 14
        };

        expect(validateCreateMembershipRequestBody(missingMandatoryFieldsMembership))
            .toBe("billingPeriodsMoreThan12Months");
    })

    it("should return billingPeriodsLessThan6Months ", () => {
        const missingMandatoryFieldsMembership = {
            ...baseMembership,
            billingPeriods: 1
        };

        expect(validateCreateMembershipRequestBody(missingMandatoryFieldsMembership))
            .toBe("billingPeriodsLessThan6Months");
    })

    it("should return billingPeriodsMoreThan10Years ", () => {
        const missingMandatoryFieldsMembership = {
            ...baseMembership,
            billingInterval: "yearly",
            billingPeriods: 11
        };

        expect(validateCreateMembershipRequestBody(missingMandatoryFieldsMembership))
            .toBe("billingPeriodsMoreThan10Years");
    })

    it("should return billingPeriodsLessThan3Years ", () => {
        const missingMandatoryFieldsMembership = {
            ...baseMembership,
            billingInterval: "yearly",
            billingPeriods: 5
        };

        expect(validateCreateMembershipRequestBody(missingMandatoryFieldsMembership))
            .toBe("billingPeriodsLessThan3Years");
    })
})