const Mock = require('mockjs')

const coordinations = Mock.mock({
  'newsList|75': [{
    id: '@increment',
    name: '@cname()',
    'class|1': ['数字媒体技术203', '软件工程201', '计算机科学与技术201', '通信工程201', '电信工程202', '人工智能201'],
    'branch|1': ['数媒支部', '计科支部', '软工支部'],
    content: '1.班级班长考核优秀</br>2.院学生会主席考核优秀</br>',
    contents: [
      {
        'content': '班级班长考核优秀',
        'score': 10
      },
      {
        'content': '院学生会主席考核优秀',
        'score': 10
      }
    ],
    score: 20,
    operate_time: '@date(yyyy-MM-dd)',
    operator: '@cname()',
    file: [
      { name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }
    ]
  }]
})

module.exports = [
  // 配置模块拿数据
  {
    url: '/vue-admin-template/Coordination/list',
    type: 'post',
    response: config => {
      console.log(config.body)
      const body = config.body
      var searchKeyList = coordinations.newsList
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
    url: '/vue-admin-template/Coordination/addlist',
    type: 'post',
    response: config => {
      // console.log(config.body)
      const body = config.body
      var con = ''
      var num = 1
      body.contents.map(item => {
        con += num + '.'
        con += item.content + '</br>'
        num++
      })

      coordinations.newsList.push(
        Mock.mock({
          id: '@increment',
          name: body.name,
          class: body.class,
          branch: body.branch,
          content: con,
          contents: body.contents,
          score: body.score,
          operate_time: body.operate_time,
          operator: body.operator
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
    url: '/vue-admin-template/Coordination/editlist',
    type: 'post',
    response: config => {
      console.log(config.body)
      const body = config.body
      var con = ''
      var num = 1
      body.contents.map(item => {
        con += num + '.'
        con += item.content + '</br>'
        num++
      })
      var index = coordinations.newsList.findIndex((item) => {
        return item.id === body.id
      })
      if (body.radioSta === '1') status = '启用'
      else status = '禁用'
      coordinations.newsList.splice(index, 1, Mock.mock({
        id: body.id,
        name: body.name,
        class: body.class,
        branch: body.branch,
        content: con,
        contents: body.contents,
        score: body.score,
        operate_time: body.operate_time,
        operator: body.operator
      }))
      // console.log(coordinations.newsList)
      return {
        code: 20000,
        message: '编辑成功'
      }
    }
  },

  // 删除数据
  {
    url: '/vue-admin-template/Coordination/dellist',
    type: 'post',
    response: config => {
      const body = config.body
      console.log(Object.keys(body)[0])
      const index = coordinations.newsList.findIndex((item) => {
        return item.id === Object.keys(body)[0] * 1
      })
      coordinations.newsList.splice(index, 1)
      return {
        code: 20000,
        message: '删除成功'
      }
    }
  }

]
