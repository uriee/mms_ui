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
      { path: '/', redirect: '/model/part' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Result/Success',
          },
          {
            path: '/dashboard/monitor',
            name: 'monitor',
            component: './Result/Success',
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Result/Success',
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
            component: './Result/Success',
          },
          {
            path: '/prod/work-report',
            name: 'report',
            component: './Result/Success',
          },
          {
            path: '/prod/work-plan',
            name: 'plan',
            icon: 'schedule',
            authority: ['admin'],
            component: './Result/Success',
          },
          {
            path: '/prod/standard',
            name: 'standard',
            authority: ['admin'],
            component: './Result/Success',
          },
          {
            path: '/prod/equipments',
            name: 'equipments',
            component: './List/MainList',
            params: { entity: 'equipment' },
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
            component: './Result/Success',
          },
          {
            path: '/service/serials',
            name: 'serials',
            component: './Result/Success',
          },
          {
            path: '/service/contracts',
            name: 'contracts',
            component: './Result/Success',
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
            component: './Result/Success',
          },
          {
            path: '/kcenter/blogs',
            name: 'blogs',
            component: './Result/Success',
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
            component: './List/MainList',
            params: { entity: 'resource' },
          },          
          {
            path: '/plan/resource_groups',
            name: 'resource_groups',
            component: './List/MainList',
            params: { entity: 'resourceGroup' },
          },
          {
            path: '/plan/availability_profiles',
            name: 'availability_profiles',
            component: './List/MainList',
            params: { entity: 'availabilityProfile' },
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
            component: './List/MainList',
            params: { entity: 'emp' },
          },
          {
            path: '/hr/departments',
            name: 'departments',
            component: './List/MainList',
            params: { entity: 'dept' },
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
            name: 'parts',
            component: './List/MainList',
            params: { entity: 'part' },
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
            component: './List/MainList',
            params: { entity: 'user' },       
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
            component: './Result/Success',
            routes: [
              {
                path: '/account/center',
                redirect: './Result/Success',
              },
              {
                path: '/account/center/articles',
                component: './Result/Success',
              },
              {
                path: '/account/center/applications',
                component: './Result/Success',
              },
              {
                path: '/account/center/projects',
                component: './Result/Success',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Result/Success',
            routes: [
              {
                path: '/account/settings',
                redirect: './Result/Success',
              },
              {
                path: '/account/settings/base',
                component: './Result/Success',
              },
              {
                path: '/account/settings/security',
                component: './Result/Success',
              },
              {
                path: '/account/settings/binding',
                component: './Result/Success',
              },
              {
                path: '/account/settings/notification',
                component: './Result/Success',
              },
            ],
          },
        ],
      },
      {
        name: 'router',
        path: '/router',
        hideInMenu: true,
        routes: [
          {
            path: '/router/users',
            component: './List/MainList',
            params: { entity: 'user' },             
          },
          {
            path: '/router/employees',
            component: './List/MainList',
            params: { entity: 'emp' },             
          }, 
          {
            path: '/router/departments',
            component: './List/MainList',
            params: { entity: 'dept' }           
          },
          {
            path: '/router/parts',
            component: './List/MainList',
            params: { entity: 'part' },             
          },          
          {
            path: '/router/resources',
            component: './List/MainList',
            params: { entity: 'resource' },             
          },
          {
            path: '/router/equipments',
            component: './List/MainList',
            params: { entity: 'equipment' },             
          }, 
          {
            path: '/router/resource_groups',
            component: './List/MainList',
            params: { entity: 'resourceGroup' },             
          }, 
          {
            path: '/router/ap',
            component: './List/MainList',
            params: { entity: 'availabilityProfile' },             
          },
          {
            path: '/router/availabilities',
            component: './List/MainList',
            params: { entity: 'availabilities' },             
          },          
        ]
      },      
      {
        component: '404',
      },
    ],
  },
];
