import request from '@/utils/request'

export function getDevelopList(data) {
  return request({
    url: '/api/develop_object/search',
    method: 'post',
    data
  })
}

export function addDevelopList(data) {
  return request({
    url: '/api/develop_object/create',
    method: 'post',
    data
  })
}

export function editDevelopList(data) {
  return request({
    url: '/api/develop_object/update',
    method: 'post',
    data
  })
}

export function deleteDevelopList(params) {
  return request({
    url: '/api/develop_object/operate',
    method: 'post',
    params
  })
}

export function importFile(data) {
  return request({
    url: '/api/develop_object/import',
    method: 'post',
    data
  })
}

export function downModule() {
  return request({
    url: '/api/develop_object/Template',
    method: 'post',
    responseType: 'blob'
  })
}

// 发展对象 - 批量导出
export function exportExcel(headers) {
  return request({
    url: '/api/develop_object/export',
    method: 'post',
    params: {
      headers
    },
    responseType: 'blob'
  })
}

// 批量删除
export function bulkDelete(idList) {
  return request({
    url: '/api/develop_object/batch_delete',
    method: 'post',
    data: idList
  })
}
