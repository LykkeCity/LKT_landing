import wretch from 'wretch'

const baseUrl = '/api'

const api = wretch(baseUrl)

export const subscribe = (json) => api.url('/subscribe').json(json).post().res()
export const order = (json) => api.url('/order').json(json).post().res()
export const convert = (json) => api.url('/convert').json(json).post().json()
