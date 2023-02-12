import request from '@/utils/request'

// 获取积极分子个人荣誉列表的接口
export function getHonorList(data) {
  return request({
    url: '/api/develop_ability/search',
    method: 'post',
    data
  })
}

// 新增创新创业角色接口
export function addNewOne(data) {
  return request({
    url: '/api/develop_ability/create',
    method: 'post',
    data
  })
}

// 删除积极分子个人荣誉的接口
export function deleteHonorById(params) {
  return request({
    url: '/api/develop_ability/operate',
    method: 'post',
    params
  })
}

// 编辑积极分子信息
export function confirmEditInfo(data) {
  return request({
    url: '/api/develop_ability/update',
    method: 'post',
    data
  })
}
