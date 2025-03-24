import { Membership } from "../model/membership.model";
import { CreateMembershipRequest } from "../routes/requests/create-membership.requests";
import { createMembership } from "./membership.service";

describe("Tests for validating membership creation", () => {
    const validUntilDefaultDate = new Date("2023-12-31");
    const baseMembership: CreateMembershipRequest = {
        name: "Platinum Plan",
        recurringPrice: 150.0,
        validFrom: new Date("2023-01-01"),
        state: "active",
        paymentMethod: "credit card",
        billingInterval: "monthly",
        billingPeriods: 12
    };

    it("should create a membership with monthly plan ", () => {
        const membership = createMembership(baseMembership);
        expect(membership.state).toEqual("expired");

        const baseMembershipValidUntilMonthResult = validUntilDefaultDate;
        baseMembershipValidUntilMonthResult.setMonth(membership.validFrom.getMonth() + membership.billingPeriods);
        expect(membership.validUntil.getMonth()).toEqual(baseMembershipValidUntilMonthResult.getMonth());
    })

    it("should create a membership with yearly plan ", () => {
        const yearlyMembership = {
            ...baseMembership,
            billingInterval: "yearly",
            billingPeriods: 3
        }
        const membership = createMembership(yearlyMembership);
        expect(membership.state).toEqual("active");

        const baseMembershipValidUntilMonthResult = validUntilDefaultDate;
        baseMembershipValidUntilMonthResult.setMonth(membership.validFrom.getMonth() + membership.billingPeriods * 12);
        expect(membership.validUntil.getFullYear()).toEqual(2026);
    })

    //This shouldn't be reachable according to validation but it might be possible to exist in future implementations
    it("should create a membership with weekly plan ", () => {
        const weeklyMembership = {
            ...baseMembership,
            billingInterval: "weekly",
        }
        const membership = createMembership(weeklyMembership);
        expect(membership.state).toEqual("expired");

        const baseMembershipValidUntilMonthResult = validUntilDefaultDate;
        baseMembershipValidUntilMonthResult.setMonth(membership.validFrom.getMonth() + membership.billingPeriods * 7);

        expect(membership.validUntil.getDay()).toEqual(0);
        // It's going to be march after 84 days 
        expect(membership.validUntil.getMonth()).toEqual(2);
    })
})