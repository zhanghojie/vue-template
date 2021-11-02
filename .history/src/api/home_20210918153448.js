import { parse, stringify } from 'qs'
import servers from '@/utils/request'


export const getJcListAPI = (params) => {
  return servers({
    url: '/jc/list',
    method: 'post',
    data: params,
  })
}
