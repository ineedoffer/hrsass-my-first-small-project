import request from '@/utils/request'

/**
 * 登录接口
 * @param {*} data 登录所需参数
 * @returns
 */
export const loginApi = (data) => {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfoApi = () => {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取员工基本信息
export const getBaseUserInfoApi = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'get'
  })
}
