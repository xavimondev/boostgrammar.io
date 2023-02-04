const SERVER_URL = 'https://boostgrammar.up.railway.app'
const LOCAL_URL = 'http://localhost:3001'
const isDevelopment = import.meta.env.MODE === 'development'

export const SERVER = isDevelopment ? LOCAL_URL : SERVER_URL
export const DASHBOARD_URL = isDevelopment ? `${LOCAL_URL}/dashboard` : `${SERVER_URL}/dashboard`
