import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { toast } from 'react-toastify'

import { RequestArgs } from '../../types'

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const tokens = JSON.parse(localStorage.getItem('tokens') as string)
  config.headers!['Authorization'] = `Bearer ${tokens?.access_token}`

  return config
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = async (
  error: AxiosError,
): Promise<AxiosError | AxiosRequestConfig> => {
  if (error.response) {
    // Access Token was expired
    if (
      error.response.status === 401 &&
      // @ts-ignore
      error.response.data.message === 'Unauthorized'
    ) {
      const storedTokens = JSON.parse(localStorage.getItem('tokens') as string)

      try {
        const {
          data: { tokens },
        } = await axios({
          url: `${process.env.REACT_APP_BASE_URL}/auth/refresh-tokens`,
          method: 'put',
          headers: {
            Authorization: `Bearer ${storedTokens?.refresh_token}`,
          },
        })

        localStorage.setItem('tokens', JSON.stringify(tokens))

        return axios({
          ...error.config,
          headers: {
            ...error.config?.headers,
            Authorization: `Bearer ${tokens.access_token}`,
          },
        })
      } catch (_error) {
        return Promise.reject(_error)
      }
    }
  }
  return Promise.reject(error)
}

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}

const api = setupInterceptorsTo(
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
)

const request = async ({ url, method, body, type }: RequestArgs) => {
  try {
    const { data } = await api({
      url: `${process.env.REACT_APP_BASE_URL}${url}`,
      method,
      ...(body && { data: body }),
      ...(type === 'form-data' && {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    })

    return data
  } catch (err: any) {
    const error = err.response?.data?.message || 'something went wrong'
    if (err.statusCode !== 401 && err.message !== 'Unauthorised')
      toast.error(error)
    throw new Error(error)
  }
}

export default request
