export interface Policy {
    policyId: number;
    name: string;
    tenure: number;
    amount: number;
    basePremium: number;
    minIncome: number;
    type: string;
    subtype: string;
    numberOfDependent: number;
    extraForAgeSlap: number;
    extraForNotEligible: string;
    maxAge: number;
    minAge: number;
    description: string;
}