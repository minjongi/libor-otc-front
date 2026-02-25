import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '/api-server'

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.reject(error)
)

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
