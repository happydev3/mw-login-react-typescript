export interface IgetToken {
    account: number | string;
    username: string;
    password: string;
    force?: number;
    fail?: string;
}
export declare function getToken(data: IgetToken): Promise<import("axios").AxiosResponse<any>>;
export interface IPostUsersRecover {
    account: number | string;
    username: string;
}
export declare function postUsersRecover(data: IPostUsersRecover): Promise<import("axios").AxiosResponse<any>>;
