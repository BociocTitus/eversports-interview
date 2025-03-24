import { CreateMembershipRequest } from "../routes/requests/create-membership.requests";

interface ValidationRule {
    validation: (membership: CreateMembershipRequest) => boolean;
    errorMessage: string;
}

export const validateCreateMembershipRequestBody = (membership: CreateMembershipRequest): string | null => {
    // With this approach it's possible to have multiple errorMessages while also keeping the old logic
    // Moreover it is easier to extend and read each validation rule individually
    // The last validaiton rule was at the border where I wanted to add the possibility of a more complex rule in the class design
    // But due to it's simplistic operation I chose to just duplicate the code
    // another good way to do this is maybe extend validation rules by combining them with their own error message
    const validationRules: ValidationRule[] = [
        { 
            validation: (membership: CreateMembershipRequest) => !membership.name || !membership.recurringPrice,
            errorMessage: "missingMandatoryFields" 
        },
        { 
            validation: (membership: CreateMembershipRequest) =>  membership.recurringPrice !== undefined && membership.recurringPrice < 0,
            errorMessage: "negativeRecurringPrice" 
        },
        { 
            validation: (membership: CreateMembershipRequest) => membership.recurringPrice !== undefined && membership.recurringPrice > 100 && membership.paymentMethod === 'cash',
            errorMessage: "cashPriceBelow100" 
        },
        {
            validation: (membership: CreateMembershipRequest) => membership.billingInterval !== 'monthly' && membership.billingInterval !== 'yearly',
            errorMessage: "invalidBillingPeriods"
        },
        {
            validation: (membership: CreateMembershipRequest) => membership.billingInterval === 'monthly' && membership.billingPeriods > 12,
            errorMessage: "billingPeriodsMoreThan12Months"
        },
        {
            validation: (membership: CreateMembershipRequest) => membership.billingInterval === 'monthly' && membership.billingPeriods < 6,
            errorMessage: "billingPeriodsLessThan6Months"
        },
        // Add this validation first as billingPeriosLessThan3Years will cover all cases otherwise
        {
            validation: (membership: CreateMembershipRequest) => membership.billingInterval === 'yearly' && membership.billingPeriods > 10,
            errorMessage: "billingPeriodsMoreThan10Years"
        },
        // TODO check if the error message of this validation is correct. Maybe it should be billingPeriodMoreThan3Years
        {
            validation: (membership: CreateMembershipRequest) => membership.billingInterval === 'yearly' && membership.billingPeriods > 3,
            errorMessage: "billingPeriodsLessThan3Years"
        },
    ]

    const validationRulesHit = validationRules
        .filter(validationRule => validationRule.validation(membership))
        .map(validationRule => validationRule.errorMessage);

    // Return first hit but we could extend this to create a more comprehensive error message
    return validationRulesHit.length > 0 ? validationRulesHit[0] : null;
}