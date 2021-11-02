import { parse, stringify } from 'qs'
import servers from '@/utils/request'


export const getJcListAPI = (params) => {
  return servers({
    url: '/jc/list',
    method: 'post',
    data: params,
  })
}
// 详情
export const getJcInfoAPI = (params) => {
  return servers({
    url: '/jc/info',
    method: 'post',
    data: params,
  })
}
