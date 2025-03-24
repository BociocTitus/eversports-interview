import request from "supertest";
import app from "./index";
import { CreateMembershipRequest } from "./modern/routes/requests/create-membership.requests";

describe("should validate the stability between the legacy and new membership routes implementations", () => {
    it("should return the same result on get", async () => {
        const responseLegacy = await request(app).get("/legacy/memberships");
        const response = await request(app).get("/memberships");

        expect(responseLegacy.body).toEqual(response.body);
    })

    it("should return the same result on post", async () => {
        const validMemebershipCreateRequest: CreateMembershipRequest = {
            name: "Platinum Plan",
            recurringPrice: 150.0,
            validFrom: new Date("2023-01-01"),
            validUntil: new Date("2023-12-31"),
            state: "active",
            paymentMethod: "credit card",
            billingInterval: "monthly",
            billingPeriods: 12
        };

        const responseLegacy = await request(app)
            .post("/legacy/memberships")
            .send(validMemebershipCreateRequest);
        const response = await request(app)
            .post("/memberships")
            .send(validMemebershipCreateRequest);

        const processedLegacyMembership = responseLegacy.body.membership;
        delete processedLegacyMembership.id;
        delete processedLegacyMembership.uuid;
        const processedLegacyMembershipPeriods = responseLegacy.body.membershipPeriods;
        processedLegacyMembershipPeriods.forEach((period: { membershipId: any; uuid: any; }) => {
            delete period.membershipId;
            delete period.uuid;
        });

        const processedMembership = response.body.membership;
        delete processedMembership.id;
        delete processedMembership.uuid;
        const processedMembershipPeriods = response.body.membershipPeriods;
        processedMembershipPeriods.forEach((period: { membershipId: any; uuid: any; }) => {
            delete period.membershipId;
            delete period.uuid;
        });

        expect(processedLegacyMembership).toEqual(processedMembership);
    })

    it("should receive errors the same way", async () => {
        const invalidBillingIntervalCreateMembershipRequest: CreateMembershipRequest = {
            name: "Platinum Plan",
            recurringPrice: 150.0,
            validFrom: new Date("2023-01-01"),
            validUntil: new Date("2023-12-31"),
            state: "active",
            paymentMethod: "credit card",
            billingInterval: "daily",
            billingPeriods: 12
        };

        const responseLegacy = await request(app)
            .post("/legacy/memberships")
            .send(invalidBillingIntervalCreateMembershipRequest);
        const response = await request(app)
            .post("/memberships")
            .send(invalidBillingIntervalCreateMembershipRequest);

        expect(responseLegacy.body).toEqual(response.body);
    })
})