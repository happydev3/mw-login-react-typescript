export interface getTermProps {
    id: number;
}
export declare function getTerm(data: getTermProps): Promise<import("axios").AxiosResponse<any>>;
export declare function postTermsAccept(id: number): Promise<import("axios").AxiosResponse<any>>;
