import { api } from '../../api'

export interface getTermProps {
  id: number
}

export function getTerm(data: getTermProps) {
  return api.get(`v1/terms/${data.id}`)
}

export function postTermsAccept(id: number) {
  return api.post(`v1/terms/accept/${id}`)
}
