export interface IPutUsersPassword {
    id: number;
    password: string;
    password_confirm?: string;
}
export declare function putUsersPassword(data: IPutUsersPassword): Promise<import("axios").AxiosResponse<any>>;
