import qs from 'qs'
import servers from '@/utils/request'





// 文章列表
export const getArticleListAPI = (data) => {
  return servers({
    url: '/visit/qy/articleList',
    method: 'post',
    data
  })
}

// 提交申请
export const submitInvitationVisitAPI = (data) => {
  return servers({
    url: '/visit/qy/invitationVisit',
    method: 'post',
    data
  })
}

// 申请列表数据
export const getUserListAPI = (data) => {
  return servers({
    url: '/visit/qy/userQyList',
    method: 'post',
    data
  })
}

// 用户信息+单位信息
export const getUserInfoAPI = (data) => {
  return servers({
    headers: {
      accessKey: '60f1b9d6rfe70r4234ra8f0r0061c76af2ef'
    },
    url: '/data-crab/zxqy/user/login',
    method: 'post',
    data
  })
}


// 选择部门
export function getAllorgAPI(data) {
  return servers({
    headers: {
      accessKey: '60f1b9d6rfe70r4234ra8f0r0061c76af2ef'
    },
    url: '/data-crab/centerOrgUser/getAllOrg',
    method: 'post',
    data
  })
}

// 获取验证码
export const getVerify = (data) => {
  return servers({
    url: '/data-crab/zxqy/sms/send',
    method: 'post',
    data
  })
}
// 验证短信
export const validate = (data) => {
  return servers({
    url: '/gateway/msg/oauthVerificationCode',
    method: 'post',
    data
  })
}


// 消息
export const qyXxzx = (data) => {
  return servers({
    url: '/visit/qy/qyXxzx',
    method: 'post',
    data
  })
}

// 文章详情
export const getArticleDetail = (data) => {
  return servers({
    url: '/visit/qy/articleInfo',
    method: 'post',
    data
  })
}
