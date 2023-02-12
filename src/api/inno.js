import request from '@/utils/request'

// 获取创新创业信息列表的接口
export function getInnoList(data) {
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

// 根据id删除创新创业接口
export function deleteInnoById(params) {
  return request({
    url: '/api/develop_ability/operate',
    method: 'post',
    params
  })
}

// 确定提交编辑表单
export function confirmEditInfo(data) {
  return request({
    url: '/api/develop_ability/update',
    method: 'post',
    data
  })
}
