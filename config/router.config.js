export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Dashboard/Monitor',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/prod',
        icon: 'robot',
        name: 'production',
        routes: [
          {
            path: '/prod/work-orders',
            name: 'workorders',
            component: './Forms/BasicForm',
          },
          {
            path: '/prod/work-report',
            name: 'report',
            component: './Forms/StepForm',
          },
          {
            path: '/prod/work-plan',
            name: 'plan',
            icon: 'schedule',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
          {
            path: '/prod/standard',
            name: 'standard',
            authority: ['admin'],
            component: './Forms/AdvancedForm',
          },
        ],
      },
      // list
      {
        path: '/service',
        icon: 'table',
        name: 'service',
        routes: [
          {
            path: '/service/calls',
            name: 'calls',
            component: './List/TableList',
          },
          {
            path: '/service/serials',
            name: 'serials',
            component: './List/BasicList',
          },
          {
            path: '/service/contracts',
            name: 'contracts',
            component: './List/CardList',
          },
        ],
      },
      {
        path: '/kcenter',
        name: 'kcenter',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/kcenter/instructions',
            name: 'instructions',
            component: './Profile/BasicProfile',
          },
          {
            path: '/kcenter/blogs',
            name: 'blogs',
            component: './Profile/AdvancedProfile',
          },
        ],
      },
      {
        name: 'report',
        icon: 'check-circle-o',
        path: '/report',
        routes: [
          // result
          {
            path: '/report/bi',
            name: 'bi',
            component: './Result/Success',
          },
          {
            path: '/report/dept',
            name: 'dept',
            component: './Result/Success',
          },
          {
            path: '/report/kpi',
            name: 'kpi',
            component: './Result/Success',
          },
        ],
      },

      {
        name: 'lean',
        icon: 'check-circle-o',
        path: '/lean',
        routes: [
          // result
          {
            path: '/lean/5s',
            name: '5s',
            component: './Result/Success',
          },
          {
            path: '/lean/suggestions',
            name: 'suggestions',
            component: './Result/Success',
          },
          {
            path: '/lean/tasks',
            name: 'tasks',
            component: './Result/Success',
          },
        ],
      },

      {
        name: 'maint',
        icon: 'check-circle-o',
        path: '/maint',
        routes: [
          // result
          {
            path: '/maint/equipment',
            name: 'equipment',
            component: './Result/Success',
          },
          {
            path: '/maint/care',
            name: 'care',
            component: './Result/Success',
          },
          {
            path: '/maint/malfunctions',
            name: 'malfunctions',
            component: './Result/Success',
          },
        ],
      },

      {
        name: 'plan',
        icon: 'check-circle-o',
        path: '/plan',
        routes: [
          // result
          {
            path: '/plan/resources',
            name: 'resources',
            component: './Result/Success',
          },
          {
            path: '/plan/standards',
            name: 'standards',
            component: './Result/Success',
          },
          {
            path: '/plan/planning',
            name: 'planning',
            component: './Result/Success',
          },
        ],
      },

      {
        name: 'ctrl',
        icon: 'check-circle-o',
        path: '/ctrl',
        routes: [
          // result
          {
            path: '/ctrl/eventm',
            name: 'eventm',
            component: './Result/Success',
          },
          {
            path: '/ctrl/controlpoints',
            name: 'controlpoints',
            component: './Result/Success',
          },
          {
            path: '/ctrl/cond',
            name: 'cond',
            component: './Result/Success',
          },
          {
            path: '/ctrl/interfaces',
            name: 'interfaces',
            component: './Result/Success',
          },
        ],
      },
      {
        name: 'hr',
        icon: 'check-circle-o',
        path: '/hr',
        authority: ['admin'],
        routes: [
          // result
          {
            path: '/hr/employees',
            name: 'employees',
            component: './List/EmployeeList',
            params: { entity: 'emp' },
          },
          {
            path: '/hr/departments',
            name: 'departments',
            component: './Result/Success',
          },
          {
            path: '/hr/certifications',
            name: 'certifications',
            component: './Result/Success',
          },
          {
            path: '/hr/tutorage',
            name: 'tutorage',
            component: './Result/Success',
          },
          {
            path: '/hr/tests',
            name: 'tests',
            component: './Result/Success',
          },
        ],
      },

      {
        name: 'qa',
        icon: 'check-circle-o',
        path: '/qa',
        routes: [
          // result
          {
            path: '/qa/malf',
            name: 'malf',
            component: './Result/Success',
          },
          {
            path: '/qa/tests',
            name: 'tests',
            component: './Result/Success',
          },
          {
            path: '/qa/calibrations',
            name: 'calibrations',
            component: './Result/Success',
          },
        ],
      },

      {
        name: 'model',
        icon: 'check-circle-o',
        path: '/model',
        routes: [
          // result
          {
            path: '/model/part',
            name: 'part',
            component: './Result/Success',
          },
          {
            path: '/model/partarc',
            name: 'partarc',
            component: './Result/Success',
          },
          {
            path: '/model/proccesses',
            name: 'proccesses',
            component: './Result/Success',
          },
        ],
      },

      {
        name: 'admin',
        icon: 'user',
        path: '/admin',
        authority: ['admin'],
        routes: [
          {
            path: '/admin/users',
            name: 'users',
            component: './Result/Success',
          },
          {
            path: '/admin/roles',
            name: 'roles',
            component: './Result/Success',
          },
          {
            path: '/admin/usergroups',
            name: 'usergroups',
            component: './Result/Success',
          },
        ],
      },

      {
        name: 'account',
        icon: 'user',
        path: '/account',
        hideInMenu: true,
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },

      {
        component: '404',
      },
    ],
  },
];
