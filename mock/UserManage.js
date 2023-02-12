const Mock = require('mockjs')

const userManages = Mock.mock({
  'newsList|75': [{
    id: '@increment',
    name: '@cname()',
    'role|1': ['组织员', '支部书记', '相关负责老师', '年级辅导员', '竞赛辅导员', '学生'],
    idNumber: '@natural(1200000000,1990000000)',
    'status|1': ['启用', '禁用']
  }]
})

module.exports = [
  // 配置模块拿数据
  {
    url: '/vue-admin-template/UserManage/list',
    type: 'post',
    response: config => {
      // console.log(config.body)
      const body = config.body
      var searchKeyList = userManages.newsList
      // 分页
      var [index, size, total] = [body.pagenum, body.pagesize, searchKeyList.length]
      var len = total / size
      var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
      var newDataList = searchKeyList.slice((index - 1) * size, index * size)

      return {
        code: 20000,
        data: {
          pagenum: index,
          pagesize: size,
          content: newDataList,
          total: total,
          totalPages: totalPages
        }
      }
    }
  },

  // 新增数据
  {
    url: '/vue-admin-template/UserManage/addlist',
    type: 'post',
    response: config => {
      // console.log(config.body)
      var status = ''
      const body = config.body
      if (body.radioSta === '1') status = '启用'
      else status = '禁用'
      userManages.newsList.push(
        Mock.mock({
          id: '@increment',
          name: body.name,
          role: body.role,
          idNumber: body.idNumber,
          status: status
        })
      )
      return {
        code: 20000,
        message: '添加成功'
      }
    }
  },

  // 编辑数据
  {
    url: '/vue-admin-template/UserManage/editlist',
    type: 'post',
    response: config => {
      console.log(config.body)
      const body = config.body
      var index = userManages.newsList.findIndex((item) => {
        return item.id === body.id
      })
      if (body.radioSta === '1') status = '启用'
      else status = '禁用'
      userManages.newsList.splice(index, 1, Mock.mock({
        id: body.id,
        name: body.name,
        role: body.role,
        idNumber: body.idNumber,
        status: status
      }))
      // console.log(userManages.newsList)
      return {
        code: 20000,
        message: '编辑成功'
      }
    }
  },

  // 删除数据
  {
    url: '/vue-admin-template/UserManage/dellist',
    type: 'post',
    response: config => {
      const body = config.body
      // console.log(Object.keys(body)[0])
      const index = userManages.newsList.findIndex((item) => {
        return item.id === Object.keys(body)[0] * 1
      })
      userManages.newsList.splice(index, 1)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  }

]
