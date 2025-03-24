
import memberships from "../../data/memberships.json"
import { v4 as uuidv4 } from 'uuid';
import { CreateMembershipRequest } from "../routes/requests/create-membership.requests";
import { Membership } from "../model/membership.model";

export const createMembership = (createMembershipRequest: CreateMembershipRequest): Membership => {
    const userId = 2000;
    const validFrom = createMembershipRequest.validFrom ? new Date(createMembershipRequest.validFrom) : new Date()
    const validUntil = new Date(validFrom);
  
    calculateBillingInterval(createMembershipRequest, validUntil, validFrom);

    const newMembership = {
      id: memberships.length + 1,
      uuid: uuidv4(),
      // This should never happen at this point 
      name: createMembershipRequest.name?? "",
      recurringPrice: createMembershipRequest.recurringPrice ?? 0,
      state: calculateMembershipState(validFrom, validUntil),
      validFrom: validFrom,
      validUntil: validUntil,
      user: userId,
      paymentMethod: createMembershipRequest.paymentMethod,
      billingPeriods: createMembershipRequest.billingPeriods,
      billingInterval: createMembershipRequest.billingInterval,
    };

    const membershipToSaveInJsonFile = {
        ...newMembership,
        validFrom: String(validFrom),
        validUntil: String(validUntil),
        userId: userId,
        assignedBy: "Admin"
    }
    
    memberships.push(membershipToSaveInJsonFile);

    return newMembership;
}

function calculateMembershipState(validFrom: Date, validUntil: Date) {
    if (validFrom > new Date()) {
      return 'pending'
    }

    if (validUntil < new Date()) {
      return 'expired'
    }

    return 'active';
}

function calculateBillingInterval(createMembershipRequest: CreateMembershipRequest, validUntil: Date, validFrom: Date) {
    if (createMembershipRequest.billingInterval === 'monthly') {
        validUntil.setMonth(validFrom.getMonth() + createMembershipRequest.billingPeriods);
    } else if (createMembershipRequest.billingInterval === 'yearly') {
        validUntil.setMonth(validFrom.getMonth() + createMembershipRequest.billingPeriods * 12);
    } else if (createMembershipRequest.billingInterval === 'weekly') {
        validUntil.setDate(validFrom.getDate() + createMembershipRequest.billingPeriods * 7);
    }
}
