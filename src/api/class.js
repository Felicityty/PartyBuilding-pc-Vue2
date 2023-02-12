import request from '@/utils/request'

export function getClassList(data) {
  return request({
    url: '/api/class_grade/search',
    method: 'post',
    data
  })
}

export function operateClassList(data) {
  return request({
    url: '/api/class_grade/operate',
    method: 'post',
    data
  })
}

export function editClassList(data) {
  return request({
    url: '/api/class_grade/update',
    method: 'post',
    data
  })
}

export function importFile(data) {
  return request({
    url: '/api/class_grade/import',
    method: 'post',
    data
  })
}

export function downModule() {
  return request({
    url: '/api/class_grade/Template',
    method: 'post',
    responseType: 'blob'
  })
}

// 班级管理 - 批量导出
export function exportExcel(headers) {
  return request({
    url: '/api/class_grade/export',
    method: 'post',
    params: {
      headers
    },
    responseType: 'blob'
  })
}
