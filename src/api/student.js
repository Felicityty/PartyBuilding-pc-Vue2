import request from '@/utils/request'

// 获取列表
export function getThoughtList(data) {
  return request({
    url: '/api/ideological_quality/search',
    method: 'post',
    data
  })
}

// // 新增列表 - 还没改 - 应该不要了
export function addThoughtList(data) {
  return request({
    url: '/api/ideological_quality/create',
    method: 'post',
    data
  })
}

// 编辑列表
export function editThoughtList(data) {
  return request({
    url: '/api/ideological_quality/update',
    method: 'post',
    data
  })
}

// 删除列表
export function delThoughtList(params) {
  return request({
    url: '/api/ideological_quality/operate',
    method: 'post',
    params
  })
}

// 新增发展能力接口
export function addNewOne(data) {
  return request({
    url: '/api/develop_ability/create',
    method: 'post',
    data
  })
}

// 查询发展能力中是否已存在该用户的记录
export function findUser(data) {
  return request({
    url: '/api/develop_ability/search',
    method: 'post',
    data
  })
}
