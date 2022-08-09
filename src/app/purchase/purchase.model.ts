export interface IPurchase {
    purchase_id?: number,
    cust_id?: number,
    policyId: number,
    userId?: number,
    dop: string,
    dom: string,
    pay_cycle: string,
    premium: number,
    status: string
}