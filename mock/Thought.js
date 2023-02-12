const Mock = require('mockjs')

const thoughts = Mock.mock({
  'newsList|75': [{
    id: '@increment',
    name: '@cname()',
    'class|1': ['数字媒体技术203', '软件工程201', '计算机科学与技术201', '通信工程201', '电信工程202', '人工智能201'],
    'branch|1': ['数媒支部', '计科支部', '软工支部'],
    operate_time: '@date(yyyy-MM-dd)',
    filename: '@cname()' + '2022第一季度思想汇报'
  }]
})

const scores = Mock.mock({
  'newsList|75': [{
    id: '@increment',
    name: '@cname()',
    'class|1': ['数字媒体技术203', '软件工程201', '计算机科学与技术201', '通信工程201', '电信工程202', '人工智能201'],
    'branch|1': ['数媒支部', '计科支部', '软工支部'],
    'score|1-99': 1,
    operate_time: '@date(yyyy-MM-dd)',
    operator: '支部书记'
  }]
})

module.exports = [
  // 配置模块拿数据
  {
    url: '/vue-admin-template/Thought/list',
    type: 'post',
    response: config => {
      console.log(config.body)
      const body = config.body
      var searchKeyList = thoughts.newsList
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
    url: '/vue-admin-template/Thought/addlist',
    type: 'post',
    response: config => {
      // console.log(config.body)
      const body = config.body
      thoughts.newsList.push(
        Mock.mock({
          id: '@increment',
          name: body.name,
          class: body.class,
          branch: body.branch,
          operate_time: body.operate_time,
          filename: body.filename
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
    url: '/vue-admin-template/Thought/editlist',
    type: 'post',
    response: config => {
      console.log(config.body)
      const body = config.body
      var index = thoughts.newsList.findIndex((item) => {
        return item.id === body.id
      })
      thoughts.newsList.splice(index, 1, Mock.mock({
        id: body.id,
        name: body.name,
        class: body.class,
        branch: body.branch,
        operate_time: body.operate_time,
        filename: body.filename
      }))
      // console.log(thoughts.newsList)
      return {
        code: 20000,
        message: '编辑成功'
      }
    }
  },

  // 删除数据
  {
    url: '/vue-admin-template/Thought/dellist',
    type: 'post',
    response: config => {
      const body = config.body
      console.log(Object.keys(body)[0])
      const index = thoughts.newsList.findIndex((item) => {
        return item.id === Object.keys(body)[0] * 1
      })
      thoughts.newsList.splice(index, 1)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  },

  // 配置模块拿数据
  {
    url: '/vue-admin-template/Score/list',
    type: 'post',
    response: config => {
      console.log(config.body)
      const body = config.body
      var searchKeyList = scores.newsList
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
    url: '/vue-admin-template/Score/addlist',
    type: 'post',
    response: config => {
      // console.log(config.body)
      const body = config.body
      scores.newsList.push(
        Mock.mock({
          id: '@increment',
          name: body.name,
          class: body.class,
          branch: body.branch,
          score: body.score,
          operate_time: body.operate_time,
          operator: 'ffff'
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
    url: '/vue-admin-template/Score/editlist',
    type: 'post',
    response: config => {
      console.log(config.body)
      const body = config.body
      var index = scores.newsList.findIndex((item) => {
        return item.id === body.id
      })
      scores.newsList.splice(index, 1, Mock.mock({
        id: body.id,
        name: body.name,
        class: body.class,
        branch: body.branch,
        score: body.score,
        operate_time: body.operate_time,
        operator: 'ffff'
      }))
      // console.log(scores.newsList)
      return {
        code: 20000,
        message: '编辑成功'
      }
    }
  },

  // 删除数据
  {
    url: '/vue-admin-template/Score/dellist',
    type: 'post',
    response: config => {
      const body = config.body
      console.log(Object.keys(body)[0])
      const index = scores.newsList.findIndex((item) => {
        return item.id === Object.keys(body)[0] * 1
      })
      scores.newsList.splice(index, 1)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  }

]
