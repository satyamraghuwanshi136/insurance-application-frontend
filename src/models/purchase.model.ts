export interface Purchase{
    purchaseId: number,
    dop: [],
    dom: [],
    payCycle: string,
    premium: number,
    status: string,
    user: {
        userId: number,
        email: string,
        psw: string,
        role: string
    },
    policy: {
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
    },
    customer: {
        custId: number,
        name: string,
        email: string,
        psw: string,
        contactNo: string,
        role: string
    },
    nominee: {
        nomineeId: number,
        name: string,
        dob: number,
        relationship: string,
        idProof: string,
        customer: {
            custId: number,
            name: string,
            email: string,
            psw: string,
            contactNo: string,
            role: string
        }
    }
}