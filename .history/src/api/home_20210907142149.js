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

// 按钮权限
export const getJudgeOperationButtonAPI = (params) => {
  return servers({
    url: '/jc/judgeOperationButton',
    method: 'post',
    data: params,
  })
}

// 问题分类
export const getIssuesClassify = (params) => {
  return servers({
    url: '/jc/issuesFl',
    method: 'post',
    data: params,
  })
}
