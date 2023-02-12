import request from '@/utils/request'

// 用户管理
// 获取列表
export function getUserManageList(data) {
  return request({
    url: '/api/auth/admin/users',
    method: 'post',
    data
  })
}

// 新增普通用户列表
export function addUserList(data) {
  return request({
    url: '/api/auth/admin/create',
    method: 'post',
    data
  })
}

// 新增管理员列表
export function addManageList(data) {
  return request({
    url: '/api/auth/admin/super/port/create',
    method: 'post',
    data
  })
}

// 编辑管理员列表
export function editManageList(data) {
  return request({
    url: '/api/auth/admin/super/update',
    method: 'post',
    data
  })
}

// 编辑普通用户列表
export function editUserList(data) {
  return request({
    url: '/api/auth/admin/update',
    method: 'post',
    data
  })
}

// 下载模板
export function downModule() {
  return request({
    url: '/api/auth/admin/Template',
    method: 'post',
    responseType: 'blob'
  })
}

// 批量导入
export function bulkImport(url) {
  return request({
    url: '/api/auth/admin/import',
    method: 'post',
    data: url
  })
}

// 用户管理 - 普通用户删除
export function bulkDeleteNormal(idList) {
  return request({
    url: '/api/auth/admin/delete',
    method: 'post',
    data: idList
  })
}

// 用户管理 - 超管删除
export function bulkDeleteSuper(idList) {
  return request({
    url: '/api/auth/admin/super/delete',
    method: 'post',
    data: idList
  })
}

// 用户管理 - 超管 - 移交权限
export function transmitSuper(params) {
  return request({
    url: '/api/auth/admin/super/transmit',
    method: 'post',
    params
  })
}