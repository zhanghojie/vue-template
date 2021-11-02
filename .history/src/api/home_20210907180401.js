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

// 监察分类
export const getIssuesClassifyAPI = (params) => {
  return servers({
    url: '/jc/issuesFl',
    method: 'post',
    data: params,
  })
}

// 上传
export const uploadAPI = (params) => {
  return servers({
    url: '/jc/upload',
    method: 'post',
    data: params,
  })
};

// 问题添加
export const issuesAddAPI = (params) => {
  return servers({
    url: '/jc/issuesAdd',
    method: 'post',
    data: params,
  })
};

// 我已到达
export const arriveAPI = (params) => {
  return servers({
    url: '/jc/arrive',
    method: 'post',
    data: params,
  })
};

// 问题列表
export const getIssuesListAPI = (params) => {
  return servers({
    url: '/jc/issuesList',
    method: 'post',
    data: params,
  })
};

// 问题数量
export const getIssuesCountAPI = (params) => {
  return servers({
    url: '/jc/issuesCount',
    method: 'post',
    data: params,
  })
};

// 问题详情
export const getIssueInfoAPI = (params) => {
  return servers({
    url: '/jc/issuesCount',
    method: 'post',
    data: params,
  })
};
