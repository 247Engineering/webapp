import axios from 'axios'
import { RequestArgs } from '../../types'

export const request = async ({ url, method, body, type }: RequestArgs) => {
  const { data } = await axios({
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
}
