import request from '@/utils/request'

// 获取组织信息列表的接口
export function getOrganList(data) {
  return request({
    url: '/api/party_branch/search',
    method: 'post',
    data
  })
}

// 启用 禁用接口
export function changeStatus(data) {
  return request({
    url: '/api/party_branch/operate',
    method: 'post',
    data
  })
}

// 编辑接口
export function confirmEdit(data) {
  return request({
    url: '/api/party_branch/update',
    method: 'post',
    data
  })
}

// 支部组织管理 - 导入
export function upload(data) {
  return request({
    url: '/api/party_branch/import',
    method: 'post',
    data
  })
}

// 支部组织管理 - 下载模板
export function downModule() {
  return request({
    url: '/api/party_branch/Template',
    method: 'post',
    responseType: 'blob'
  })
}

// 支部组织管理 - 批量导出
export function exportExcel(headers) {
  return request({
    url: '/api/party_branch/export',
    method: 'post',
    params: {
      headers
    },
    responseType: 'blob'
  })
}
