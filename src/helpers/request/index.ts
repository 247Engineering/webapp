import axios from 'axios'
import { toast } from 'react-toastify'

import { RequestArgs } from '../../types'

export const request = async ({ url, method, body, type }: RequestArgs) => {
  try {
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
  } catch (err: any) {
    toast.error(err.response.data.message)
    throw new Error(err.response.data.message)
  }
}
