import { api } from '../../api'

export interface IPostUsersCheckCode {
  account: number | string
  code: string
}

export function postUsersCheckCode(data: IPostUsersCheckCode) {
  return api.post('v1/users/check-code', data)
}
