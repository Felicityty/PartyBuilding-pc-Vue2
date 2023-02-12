import request from '@/utils/request'

// 思想汇报

// 获取列表
export function getThoughtList(data) {
  return request({
    url: '/api/ideological_quality/search',
    method: 'post',
    data
  })
}

// // 新增列表 - 还没改 - 应该不要了
// export function addThoughtList(data) {
//   return request({
//     url: '/vue-admin-template/Thought/addlist',
//     method: 'post',
//     data
//   })
// }

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

// 思想素质 - 批量导出
export function exportExcel(headers) {
  return request({
    url: '/api/ideological_quality/export',
    method: 'post',
    params: {
      headers
    },
    responseType: 'blob'
  })
}

// 文件导入
export function importFile(url) {
  return request({
    url: '/api/ideological_quality/import',
    method: 'post',
    data: url
  })
}

// 下载模版
export function downModule() {
  return request({
    url: '/api/ideological_quality/Template',
    method: 'post',
    responseType: 'blob'
  })
}

// 批量删除
export function bulkDelete(idList) {
  return request({
    url: '/api/ideological_quality/batch_delete',
    method: 'post',
    data: idList
  })
}
