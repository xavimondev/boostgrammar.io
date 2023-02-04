const REMOTE_SERVER_URL = 'https://boostgrammar.up.railway.app'
const LOCAL_SERVER_URL = 'http://localhost:3001'
const LOCAL_CLIENT_URL = 'http://localhost:3000'
const isDevelopment = import.meta.env.MODE === 'development'

export const SERVER = isDevelopment ? LOCAL_SERVER_URL : REMOTE_SERVER_URL
export const DASHBOARD_URL = isDevelopment
  ? `${LOCAL_CLIENT_URL}/dashboard`
  : `${REMOTE_SERVER_URL}/dashboard`
