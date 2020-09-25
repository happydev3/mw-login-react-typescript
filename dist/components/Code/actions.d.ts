export interface IPostUsersCheckCode {
    account: number | string;
    code: string;
}
export declare function postUsersCheckCode(data: IPostUsersCheckCode): Promise<import("axios").AxiosResponse<any>>;
