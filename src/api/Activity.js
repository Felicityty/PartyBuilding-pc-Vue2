import request from '@/utils/request'

// 获取列表
export function getActivityList(data) {
  return request({
    url: '/vue-admin-template/Activity/list',
    method: 'post',
    data
  })
}

// 新增列表
export function addActivityList(data) {
  return request({
    url: '/vue-admin-template/Activity/addlist',
    method: 'post',
    data
  })
}

// 编辑列表
export function editActivityList(data) {
  return request({
    url: '/vue-admin-template/Activity/editlist',
    method: 'post',
    data
  })
}

// 删除列表
export function delActivityList(data) {
  return request({
    url: '/vue-admin-template/Activity/dellist',
    method: 'post',
    data
  })
}
