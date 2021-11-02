import { parse, stringify } from 'qs'
import request from '@/utils/request'


// 问题添加
export const issuesAddAPI = (params) => {
  return servers({
    url: '/jc/issuesAdd',
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