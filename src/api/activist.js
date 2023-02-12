import request from '@/utils/request'

// 获取积极分子列表
export function getActivistList(data) {
  return request({
    url: '/api/activist/search',
    method: 'post',
    data
  })
}

// 编辑积极分子信息
export function editActivistInfoById(data) {
  return request({
    url: '/api/activist/update',
    method: 'post',
    data
  })
}

// 删除积极分子
export function deleteActivistById(params) {
  return request({
    url: '/api/activist/operate',
    method: 'post',
    params
  })
}

// 积极分子 - 导入
export function upload(url) {
  return request({
    url: '/api/activist/import',
    method: 'post',
    data: url
  })
}

// 积极分子 - 下载模板
export function downModule() {
  return request({
    url: '/api/activist/Template',
    method: 'post',
    responseType: 'blob'
  })
}

// 积极分子 - 批量导出
export function exportExcel(headers) {
  return request({
    url: '/api/activist/export',
    method: 'post',
    params: {
      headers
    },
    responseType: 'blob'
  })
}

// 积极分子 - 批量删除
export function bulkDelete(idList) {
  return request({
    url: '/api/activist/batch_delete',
    method: 'post',
    data: idList
  })
}
