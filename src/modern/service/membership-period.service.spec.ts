import { Membership } from "../model/membership.model";
import { createMembershipPeriods } from "./membership-period.service";

describe("Tests for validating membership period creations", () => {
    const baseMembership: Membership = {
        id: 1,
        uuid: "123e4567-e89b-12d3-a456-426614174000",
        name: "Platinum Plan",
        user: 2000,
        recurringPrice: 150.0,
        validFrom: new Date("2023-01-01"),
        validUntil: new Date("2023-12-31"),
        state: "active",
        paymentMethod: "credit card",
        billingInterval: "monthly",
        billingPeriods: 12
      };

    it("should return missingMandatoryFields ", () => {
        const periods = createMembershipPeriods(baseMembership);
        
        expect(periods).toHaveLength(12);
        periods.forEach(period => {
            expect(period.membershipId).toEqual(1);
            expect(period.state).toEqual("planned");
        })
    })
})