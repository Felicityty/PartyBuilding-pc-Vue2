import request from '@/utils/request'

export function getAcademicList(data) {
  return request({
    url: '/api/academic_quality/search',
    method: 'post',
    data
  })
}

export function addAcademicList(data) {
  return request({
    url: '/api/academic_quality/create',
    method: 'post',
    data
  })
}

export function editAcademicList(data) {
  return request({
    url: '/api/academic_quality/update',
    method: 'post',
    data
  })
}

export function deleteAcademicList(params) {
  return request({
    url: '/api/academic_quality/operate',
    method: 'post',
    params
  })
}

export function importFile(data) {
  return request({
    url: '/api/academic_quality/import',
    method: 'post',
    data
  })
}

// 学业素质-批量导出
export function exportExcel(headers) {
  return request({
    url: '/api/academic_quality/export',
    method: 'post',
    params: {
      headers
    },
    responseType: 'blob'
  })
}

export function downModule() {
  return request({
    url: '/api/academic_quality/Template',
    method: 'post',
    responseType: 'blob'
  })
}

// 批量删除
export function bulkDelete(idList) {
  return request({
    url: '/api/academic_quality/batch_delete',
    method: 'post',
    data: idList
  })
}
