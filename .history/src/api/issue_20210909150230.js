import { parse, stringify } from 'qs'
import servers from '@/utils/request'


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

// 问题修改
export const updateIssueInfoAPI = (params) => {
  return servers({
    url: '/jc/issuesInfo',
    method: 'post',
    data: params,
  })
};

// 问题删除
export const deleteIssueAPI = (params) => {
  return servers({
    url: '/jc/issuesDel',
    method: 'post',
    data: params,
  })
};

// 工作列表
export const getWorkListAPI = (params) => {
  return servers({
    url: '/jc/workList',
    method: 'post',
    data: params,
  })
};


// 工作详情
export const getWorkInfoAPI = (params) => {
  return servers({
    url: '/jc/workInfo',
    method: 'post',
    data: params,
  })
};
