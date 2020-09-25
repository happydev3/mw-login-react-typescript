import { api } from '../../api'

export interface IPutUsersPassword {
  id: number
  password: string
  password_confirm?: string
}

export function putUsersPassword(data: IPutUsersPassword) {
  return api.put(`v1/users/${data.id}`, data)
}
