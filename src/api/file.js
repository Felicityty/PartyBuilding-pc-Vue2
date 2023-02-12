import request from '@/utils/request'

// 上传文件
export function uploadExcel(category, formData) {
  return request({
    url: `/file/upload/${category}`,
    method: 'post',
    data: formData
  })
}

// 公用下载模板
export function downExcel(filename, originalFilename) {
  return request({
    url: `/api/common/download_template/temp_import/${filename}`,
    method: 'get',
    params: {
      originalFilename
    },
    responseType: 'blob'
  })
}

// 详细信息对话框 - 获取文件
export function getFile(category, filename) {
  return request({
    url: `/file/${category}/${filename}`,
    method: 'get',
    responseType: 'blob'
  })
}

// 发展能力批量导入
export function importFile(category, url) {
  return request({
    url: `/api/develop_ability/import/${category}`,
    method: 'post',
    data: url
  })
}

// 发展能力下载模板
export function downModule(category) {
  return request({
    url: `/api/develop_ability/Template/${category}`,
    method: 'post',
    responseType: 'blob'
  })
}

// 发展能力编辑对话框
export function editList(data) {
  return request({
    url: '/api/develop_ability/update',
    method: 'post',
    data
  })
}

// 发展能力 - 批量导出
export function exportExcel(headers, category) {
  return request({
    url: `/api/develop_ability/export/${category}`,
    method: 'post',
    params: {
      headers
    },
    responseType: 'blob'
  })
}

// 发展能力 - 批量删除
export function bulkDelete(idList) {
  return request({
    url: '/api/develop_ability/batch_delete',
    method: 'post',
    data: idList
  })
}

