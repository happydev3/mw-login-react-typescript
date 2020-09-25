import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api.xpto.ninja', // 'http://odin.local:8083', //
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(async (config) => {
  const tokenKey = 'MwLoginToken'
  const url = config.url
  const language = localStorage.getItem('_LOCALE') || 'pt_BR'

  config.headers['Accept-Language'] = language.replace('_', '-')

  if (url === 'v1/users/token') {
    sessionStorage.removeItem(tokenKey)
    // never add token
    return config
  }

  const token = sessionStorage.getItem(tokenKey)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
