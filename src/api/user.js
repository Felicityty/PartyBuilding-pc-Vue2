import request from '@/utils/request'

// 管理员1 222108855002 ck@2022
// 学生1  1201020009 123456  解文俊
export function login(data) {
  return request({
    // url: '/user/login',
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

// 获取用户详情
export function getInfo() {
  return request({
    url: '/api/auth/detail',
    method: 'get'
  })
}

// 登出
export function logout() {
  return request({
    // url: '/remote-visit2/user/logout',
    url: '/vue-admin-template/user/logout',
    // url: '/user/logout',
    method: 'post'
  })
}

// 获取动态路由
export function getRouter(params) {
  return request({
    url: '/api/router/get_router',
    method: 'get',
    params
  })
}
