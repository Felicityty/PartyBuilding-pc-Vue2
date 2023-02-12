import request from '@/utils/request'

// 获取列表
export function getCoordinationList(data) {
  return request({
    url: '/vue-admin-template/Coordination/list',
    method: 'post',
    data
  })
}

// 新增列表
export function addCoordinationList(data) {
  return request({
    url: '/vue-admin-template/Coordination/addlist',
    method: 'post',
    data
  })
}

// 编辑列表
export function editCoordinationList(data) {
  return request({
    url: '/vue-admin-template/Coordination/editlist',
    method: 'post',
    data
  })
}

// 删除列表
export function delCoordinationList(data) {
  return request({
    url: '/vue-admin-template/Coordination/dellist',
    method: 'post',
    data
  })
}
