const Mock = require('mockjs')

// 支部查询
const branchOptionsChoose = [{
  value: '1',
  label: '数媒支部'
}, {
  value: '2',
  label: '计科支部'
}, {
  value: '3',
  label: '软工支部'
}, {
  value: '4',
  label: '电信支部'
}, {
  value: '5',
  label: '通信支部'
}, {
  value: '6',
  label: '人工支部'
}]

// 班级查询
const classOptionsChoose = {
  '1': [{
    value: '1',
    label: '数字媒体技术201'
  }, {
    value: '2',
    label: '数字媒体技术202'
  }, {
    value: '3',
    label: '数字媒体技术203'
  }],
  '2': [{
    value: '1',
    label: '计算机科学与技术201'
  }, {
    value: '2',
    label: '计算机科学与技术202'
  }, {
    value: '3',
    label: '计算机科学与技术203'
  }, {
    value: '4',
    label: '计算机科学与技术204'
  }],
  '3': [{
    value: '1',
    label: '软件工程201'
  }, {
    value: '2',
    label: '软件工程202'
  }, {
    value: '3',
    label: '软件工程203'
  }],
  '4': [{
    value: '1',
    label: '电子信息201'
  }, {
    value: '2',
    label: '电子信息202'
  }],
  '5': [{
    value: '1',
    label: '通信工程201'
  }, {
    value: '2',
    label: '通信工程202'
  }],
  '6': [{
    value: '1',
    label: '人工智能201'
  }, {
    value: '2',
    label: '人工智能202'
  }]
}

const academicList = Mock.mock({
  'items|30': [{
    'id|+1': 1,
    'stuId|1200000000-1200999999': 1200651257,
    name: '@cname',
    branchname: function() {
      const i = Math.floor(Math.random() * (branchOptionsChoose.length)) + 1
      return branchOptionsChoose[i - 1]
    },
    classname: function() {
      const i = this.branchname.value
      const classname = classOptionsChoose[i]
      const area = Math.floor(Math.random() * (classOptionsChoose[this.branchname.value].length)) + 1
      return classname[area - 1]
    },
    developtime: '@date(yyyy-MM-dd)',
    operationpeople: '@cname'
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/development/list',
    type: 'post',
    response: config => {
      const searchKey = {
        name: config.body.name,
        classname: config.body.classname,
        branchname: config.body.branchname
      }
      // console.log(searchKey)

      const [index, size] = [config.body.pageIndex, config.body.pageSize]
      const items = academicList.items

      const DataList = JSON.parse(JSON.stringify(items))
      for (let i = 0; i < DataList.length; i++) {
        if (typeof (searchKey.name) !== 'undefined' && DataList[i].name !== searchKey.name) {
          DataList.splice(i, 1)
          i = i - 1
          continue
        }

        if (typeof (searchKey.classname) !== 'undefined' && DataList[i].classname.value !== searchKey.classname) {
          DataList.splice(i, 1)
          i = i - 1
          continue
        }

        if (typeof (searchKey.branchname) !== 'undefined' && DataList[i].branchname.value !== searchKey.branchname) {
          DataList.splice(i, 1)
          i = i - 1
          continue
        }
      }
      const total = DataList.length
      const len = total / size
      const totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
      const newDataList = DataList.slice((index - 1) * size, index * size)
      return {
        code: 20000,
        message: 'success',
        data: {
          'pageIndex': index,
          'pageSize': size,
          'content': newDataList,
          'total': total,
          'totalPages': totalPages
        }
      }
    }
  },
  {
    url: '/vue-admin-template/development/add',
    type: 'post',
    response: config => {
      const addKey = config.body
      const t = classOptionsChoose[addKey.branchname]
      console.log(addKey)
      academicList.items.push({
        name: addKey.name,
        classname: t[addKey.classname - 1],
        branchname: branchOptionsChoose[addKey.branchname - 1],
        operationpeople: addKey.operationpeople,
        developtime: addKey.developtime,
        id: academicList.items.length + 1
      })
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/development/edit',
    type: 'post',
    response: config => {
      const editKey = config.body
      // console.log(editKey)
      const items = academicList.items
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === editKey.id) {
          items[i].name = editKey.name
          items[i].branchname = branchOptionsChoose[editKey.branchname - 1]
          const t = classOptionsChoose[editKey.branchname]
          items[i].classname = t[editKey.classname - 1]
          items[i].operationpeople = editKey.operationpeople
          items[i].developtime = editKey.developtime
        }
      }
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  {
    url: '/vue-admin-template/development/delete',
    type: 'post',
    response: config => {
      const deleteKey = config.body
      console.log(deleteKey)
      const items = academicList.items
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === deleteKey.id) {
          // items[i].reason = reason[cancelKey.reason - 1]
          items.splice(i, 1)
          break
        }
      }
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

