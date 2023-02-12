import request from '@/utils/request'

export function getSpecialityList(data) {
  return request({
    url: '/api/develop_ability/search',
    method: 'post',
    data
  })
}

export function addSpecialityList(data) {
  return request({
    url: '/api/develop_ability/create',
    method: 'post',
    data
  })
}

export function editSpecialityList(data) {
  return request({
    url: '/api/develop_ability/update',
    method: 'post',
    data
  })
}

export function deleteSpecialityList(params) {
  return request({
    url: '/api/develop_ability/operate',
    method: 'post',
    params
  })
}
