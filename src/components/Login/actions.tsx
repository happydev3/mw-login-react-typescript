import { api } from '../../api'

export interface IgetToken {
  account: number | string
  username: string
  password: string
  force?: number
  fail?: string
}

export function getToken(data: IgetToken) {
  return api.post('v1/users/token', data)
}

export interface IPostUsersRecover {
  account: number | string
  username: string
}

export function postUsersRecover(data: IPostUsersRecover) {
  return api.post('v1/users/recover', data)
}
