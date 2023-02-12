const myRouter = {
  // 管理员动态路由
  'admin-token': [
    {
      path: '/',
      redirect: '/activists'
    },

    {
      path: '/activists',
      name: 'activists',
      component: 'Layout',
      redirect: '/activists/activist',
      meta: { title: '积极分子', icon: 'el-icon-data-board' },
      children: [
        {
          path: 'activist',
          name: 'Activist',
          component: 'activists/Activist',
          meta: { title: '积极分子库', icon: 'el-icon-collection' }
        },
        {
          path: 'thought',
          name: 'Thought',
          component: 'activists/Thought',
          meta: { title: '思想素质', icon: 'el-icon-suitcase-1' }
        },
        {
          path: 'academic',
          name: 'Academic',
          component: 'activists/Academic',
          meta: { title: '学业素质', icon: 'el-icon-edit' }
        },
        {
          path: 'activistschildren',
          name: 'activistschildren',
          component: 'activists/activistschildren/index',
          redirect: '/activists/activistschildren/Activity',
          meta: { title: '发展能力', icon: 'el-icon-set-up' },
          children: [
            {
              path: 'activity',
              name: 'Activity',
              component: 'activists/activistschildren/Activity',
              meta: { title: '活动参与', icon: 'el-icon-coordinate' }
            },
            {
              path: 'innovate',
              name: 'Innovate',
              component: 'activists/activistschildren/Innovate',
              meta: { title: '创新创业', icon: 'el-icon-magic-stick' }
            },
            {
              path: 'honor',
              name: 'Honor',
              component: 'activists/activistschildren/Honor',
              meta: { title: '个人荣誉', icon: 'el-icon-trophy' }
            },
            {
              path: 'speciality',
              name: 'Speciality',
              component: 'activists/activistschildren/Speciality',
              meta: { title: '文体特长', icon: 'el-icon-cpu' }
            },
            {
              path: 'coordination',
              name: 'Coordination',
              component: 'activists/activistschildren/Coordination',
              meta: { title: '组织协调', icon: 'el-icon-data-line' }
            }
          ]
        }
      ]
    },

    {
      path: '/development',
      name: 'development',
      component: 'Layout',
      meta: { title: '发展对象', icon: 'el-icon-user' },
      children: [
        {
          path: 'development',
          name: 'Development',
          component: 'development/Development',
          meta: { title: '发展对象', icon: 'el-icon-user' }
        }
      ]
    },

    {
      path: '/user',
      name: 'user',
      component: 'Layout',
      meta: { title: '用户管理', icon: 'el-icon-notebook-2' },
      children: [
        {
          path: 'usermanage',
          name: 'UserManage',
          component: 'user/UserManage',
          meta: { title: '用户管理', icon: 'el-icon-notebook-2' }
        }
      ]
    },

    {
      path: '/class',
      name: 'class',
      component: 'Layout',
      meta: { title: '班级管理', icon: 'el-icon-document-copy' },
      children: [
        {
          path: 'classmanage',
          name: 'ClassManage',
          component: 'class/ClassManage',
          meta: { title: '班级管理', icon: 'el-icon-document-copy' }
        }
      ]
    },

    {
      path: '/organization',
      name: 'organization',
      component: 'Layout',
      meta: { title: '支部组织管理', icon: 'el-icon-files' },
      children: [
        {
          path: 'organization',
          name: 'Organization',
          component: 'organization/Organization',
          meta: { title: '支部组织管理', icon: 'el-icon-files' }
        }
      ]
    },

    {
      path: '/statistics',
      name: 'statistics',
      component: 'Layout',
      meta: { title: '统计', icon: 'el-icon-files' },
      children: [
        {
          path: 'index',
          name: 'Statistics',
          component: 'statistics/Statistics',
          meta: { title: '统计', icon: 'el-icon-files' }
        }
      ]
    }
  ],
  // 非管理员动态路由
  'editor-token': [
    {
      path: '/',
      redirect: '/student'
    },

    {
      path: '/student',
      name: 'Student',
      redirect: '/student/index',
      component: 'Layout',
      children: [
        {
          path: 'index',
          name: 'index',
          component: 'student/index',
          meta: { title: '学生端', icon: 'el-icon-s-promotion' }
        }
      ]
    }
  ]
}

module.exports = {
  myRouter
}
