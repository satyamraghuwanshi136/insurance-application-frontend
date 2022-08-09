export interface IPolicy {
    name: string, 
    tenure: number,
    amount: number,
    type: string,
    subType: string,
    basePremium: number,
    numberOfDependent: number,
    extra_for_dependent: number,
    extraForAgeSlap: number,
    description: string
}