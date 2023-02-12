import { getClassList } from '@/api/class'
import { getOrganList } from '@/api/organ'

const options = {
  branchOptions: [],
  classOptions: {},
  // 支部查询
  branchOptionsChoose: [{
    value: '1',
    label: '数媒专业学生党支部'
  }, {
    value: '2',
    label: '计科专业学生第一党支部'
  }, {
    value: '3',
    label: '计科专业学生第二党支部'
  }, {
    value: '4',
    label: '软工专业学生第一党支部'
  }, {
    value: '5',
    label: '软工专业学生第二党支部'
  }, {
    value: '6',
    label: '电信专业学生党支部'
  }, {
    value: '7',
    label: '通信专业学生党支部'
  }, {
    value: '8',
    label: '研究生学生党支部'
  }],

  // 班级查询
  classOptionsChoose: {
    '数媒专业学生党支部': [{
      value: '0',
      label: '数字媒体技术201'
    }, {
      value: '1',
      label: '数字媒体技术202'
    }, {
      value: '2',
      label: '数字媒体技术203'
    }],
    '计科专业学生第一党支部': [{
      value: '0',
      label: '计算机科学与技术201'
    }, {
      value: '1',
      label: '计算机科学与技术202'
    }],
    '计科专业学生第二党支部': [{
      value: '0',
      label: '计算机科学与技术203'
    }, {
      value: '1',
      label: '计算机科学与技术204'
    }],
    '软工专业学生第一党支部': [{
      value: '0',
      label: '软件工程201'
    }, {
      value: '1',
      label: '软件工程202'
    }, {
      value: '2',
      label: '软件工程203'
    }],
    '软工专业学生第二党支部': [{
      value: '0',
      label: '人工智能201'
    }, {
      value: '1',
      label: '人工智能202'
    }, {
      value: '2',
      label: '人工智能203'
    }],
    '电信专业学生党支部': [{
      value: '0',
      label: '电子信息201'
    }, {
      value: '1',
      label: '电子信息202'
    }],
    '通信专业学生党支部': [{
      value: '0',
      label: '通信工程201'
    }, {
      value: '1',
      label: '通信工程202'
    }],
    '研究生学生党支部': [{
      value: '0',
      label: '20级'
    }, {
      value: '1',
      label: '21级'
    }]
  },

  // 超管添加用户角色
  roleOptions: [{
    value: 'ORGANIZER',
    label: '组织员'
  }, {
    value: 'BRANCH_SECRETARY',
    label: '支部书记'
  }, {
    value: 'GRADE_COUNSELOR',
    label: '年级辅导员'
  }, {
    value: 'COMPETITION_COUNSELOR',
    label: '竞赛辅导员'
  }],

  // 管理员添加用户角色
  roleStuOptions: [{
    value: 'STUDENT',
    label: '学生'
  }],

  // 用户性别
  sexOptions: [{
    value: 'MALE',
    label: '男'
  }, {
    value: 'FEMALE',
    label: '女'
  }],

  // 用户端新增类型
  addNewTypeOptionChoose: [{
    value: '1',
    label: '活动参与'
  }, {
    value: '2',
    label: '创新创业'
  }, {
    value: '3',
    label: '个人荣誉'
  }, {
    value: '4',
    label: '文体特长'
  }, {
    value: '5',
    label: '组织协调'
  }],

  // 支部与班级对应
  classChoose: [
    {
      value: '数媒专业学生党支部',
      class: ['数字媒体技术']
    },
    {
      value: '计算机专业学生第一党支部',
      class: ['计算机科学与技术']
    },
    {
      value: '计算机专业学生第二党支部',
      class: ['计算机科学与技术']
    },
    {
      value: '软工专业学生第一党支部',
      class: ['软件工程']
    },
    {
      value: '软工专业学生第二党支部',
      class: ['人工智能']
    },
    {
      value: '电信专业学生党支部',
      class: ['电子信息']
    },
    {
      value: '通信专业学生党支部',
      class: ['通信工程']
    },
    {
      value: '研究生学生党支部',
      class: ['信息研']
    }
  ]
}

const tip = {
  delete: '确认删除该条数据？（此操作不可撤销）',
  close: '确认关闭？',
  switch: '确定转移超级管理员权限？'
}

// 判断是否重复
function findElem(array, val) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].label === val) {
      return i // 返回当前索引值
    }
  }
  return -1
}

// 去重
function noRepeat(arr) {
  const newArr = []
  for (const t of arr) {
    if (newArr.find((c) => c.classGradeName === t.classGradeName)) {
      continue
    }
    newArr.push(t)
  }
  return newArr
}

// 排序
function compareValues(key) {
  return function innerSort(a, b) {
    const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key]
    const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key]
    let comparison = 0
    if (varA > varB) {
      comparison = 1
    } else if (varA < varB) {
      comparison = -1
    }
    return comparison
  }
}

async function getOptions() {
  await getOrganList({
    pageNum: 0,
    pageSize: 0
  }).then((res) => {
    const obj = {}
    const a = []
    res.rows.forEach((item) => { obj[item.partyBranchName] = item })
    for (const key in obj) { a.push(obj[key]) }
    for (let i = 0; i < a.length; i++) {
      if (findElem(options.branchOptions, a[i].partyBranchName) === -1) {
        options.branchOptions.push({
          value: i + '',
          label: a[i].partyBranchName
        })
      }
    }
    const branch = options.branchOptions
    for (let i = 0; i < branch.length; i++) {
      options.classOptions[branch[i].label] = []
    }
  })

  getClassList({
    pageNum: 0,
    pageSize: 0
  }).then((res) => {
    const row = noRepeat(res.rows)
    const rowdata = JSON.parse(JSON.stringify(row))
    rowdata.sort(compareValues('classGradeName'))
    const classname = options.classOptions
    for (let i = 0; i < rowdata.length; i++) {
      options.classChoose.find((e) => {
        for (let j = 0; j < e.class.length; j++) {
          if (rowdata[i].classGradeName.indexOf(e.class[j]) === 0 && classname[e.value]) {
            if ((rowdata[i].classGradeName.substr(rowdata[i].classGradeName.length - 1, 1) === '1' ||
            rowdata[i].classGradeName.substr(rowdata[i].classGradeName.length - 1, 1) === '2') &&
              e.value === '计算机专业学生第一党支部') {
              classname[e.value].push({
                value: i + '',
                label: rowdata[i].classGradeName
              })
            } else if ((rowdata[i].classGradeName.substr(rowdata[i].classGradeName.length - 1, 1) === '3' ||
            rowdata[i].classGradeName.substr(rowdata[i].classGradeName.length - 1, 1) === '4') &&
              e.value === '计算机专业学生第二党支部') {
              classname[e.value].push({
                value: i + '',
                label: rowdata[i].classGradeName
              })
            } else if (e.value !== '计算机专业学生第一党支部' && e.value !== '计算机专业学生第二党支部') {
              classname[e.value].push({
                value: i + '',
                label: rowdata[i].classGradeName
              })
            }
          }
        }
      })
    }
  })
}

export default {
  ...options,
  ...tip,
  getOptions
}
