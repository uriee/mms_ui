export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        component: './User/Login',
      },
      {
        path: '/user/register',
        component: './User/Register',
      },
      {
        path: '/user/register_result',
        component: './User/RegisterResult',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/',
        redirect: '/dashboard/analysis',
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
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
      {
        path: '/production',
        name: 'production',
        routes: [
          {
            path: '/production/work_orders',
            name: 'workorders',
            component: './List/MainList',
            params: {
              entity: 'serials',
            },
          },
          {
            path: '/production/work_orders_statuses',
            name: 'workOrdersStatuses',
            component: './List/MainList',
            params: {
              entity: 'serial_statuses',
            },
          },
          {
            path: '/production/actions',
            name: 'actions',
            component: './List/MainList',
            params: {
              entity: 'actions',
            },
          },
          {
            path: '/production/work_report',
            component: './List/MainList',
            params: {
              entity: 'work_report',
            },
            name: 'report',
          },
          {
            path: '/production/identifiers',
            name: 'serials',
            component: './List/MainList',
            params: {
              entity: 'iden',
            },
          },
          {
            path: '/production/work_plan',
            name: 'plan',
            component: './Result/Success',
          },
          {
            path: '/production/standard',
            name: 'standard',
            component: './Result/Success',
          },
          {
            path: '/production/equipments',
            name: 'equipments',
            component: './List/MainList',
            params: {
              entity: 'equipment',
            },
          },
        ],
      },
      {
        path: '/service',
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
        routes: [
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
        path: '/report',
        routes: [
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
        path: '/lean',
        routes: [
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
        path: '/maint',
        routes: [
          {
            path: '/maint/equipment',
            name: 'equipment',
            component: './List/MainList',
            params: {
              entity: 'equipment',
            },
          },
          {
            path: '/maint/malfunctions',
            name: 'malfunctions',
            component: './List/MainList',
            params: {
              entity: 'malfunctions',
            },
          },
          {
            path: '/maint/malfunction_types',
            name: 'malfunction_types',
            component: './List/MainList',
            params: {
              entity: 'malfunction_types',
            },
          },
          {
            path: '/maint/repairs',
            name: 'repairs',
            component: './List/MainList',
            params: {
              entity: 'repairs',
            },
          },
          {
            path: '/maint/repair_types',
            name: 'repair_types',
            component: './List/MainList',
            params: {
              entity: 'repair_types',
            },
          },
          {
            path: '/maint/mnt_plans',
            name: 'mnt_plans',
            component: './List/MainList',
            params: {
              entity: 'mnt_plans',
            },
          },
        ],
      },
      {
        name: 'plan',
        path: '/plan',
        routes: [
          {
            path: '/plan/resources',
            name: 'resources',
            component: './List/MainList',
            params: {
              entity: 'resource',
            },
          },
          {
            path: '/plan/resourcetree',
            name: 'resourcetree',
            component: './List/ResourceTree',
          },

          {
            path: '/plan/resource_groups',
            name: 'resource_groups',
            component: './List/MainList',
            params: {
              entity: 'resourceGroup',
            },
          },
          {
            path: '/plan/availability_profiles',
            name: 'availability_profiles',
            component: './List/MainList',
            params: {
              entity: 'availabilityProfile',
            },
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
        path: '/ctrl',
        routes: [
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
        path: '/hr',
        routes: [
          {
            path: '/hr/employees',
            name: 'employees',
            component: './List/MainList',
            params: {
              entity: 'emp',
            },
          },
          {
            path: '/hr/departments',
            name: 'departments',
            component: './List/MainList',
            params: {
              entity: 'dept',
            },
          },
          {
            path: '/hr/employee_timeoff',
            name: 'employee_timeoff',
            component: './List/MainList',
            params: {
              entity: 'employee_timeoff',
            },
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
        path: '/qa',
        routes: [
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
        path: '/model',
        routes: [
          {
            path: '/model/part',
            name: 'parts',
            component: './List/MainList',
            params: {
              entity: 'part',
            },
          },
          {
            path: '/model/part_status',
            name: 'part_status',
            component: './List/MainList',
            params: {
              entity: 'part_status',
            },
          },
          {
            path: '/model/process',
            name: 'process',
            component: './List/MainList',
            params: {
              entity: 'process',
            },
          },
        ],
      },
      {
        name: 'admin',
        path: '/admin',
        routes: [
          {
            path: '/admin/users',
            name: 'users',
            component: './List/MainList',
            params: {
              entity: 'user',
            },
          },
          {
            path: '/admin/roles',
            name: 'roles',
            component: './List/MainList',
            params: {
              entity: 'profile',
            },
          },
          {
            path: '/admin/preferences',
            name: 'preferences',
            component: './List/MainList',
            params: {
              entity: 'preferences',
            },
          },
          {
            path: '/admin/permissions',
            name: 'Edit Permissions',
            component: './List/Permissions',
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
            params: {
              entity: 'user',
            },
          },
          {
            path: '/router/profiles',
            component: './List/MainList',
            params: {
              entity: 'profile',
            },
          },
          {
            path: '/router/employees',
            component: './List/MainList',
            params: {
              entity: 'emp',
            },
          },
          {
            path: '/router/departments',
            component: './List/MainList',
            params: {
              entity: 'dept',
            },
          },
          {
            path: '/router/part',
            component: './List/MainList',
            params: {
              entity: 'part',
            },
          },
          {
            path: '/router/resources',
            component: './List/MainList',
            params: {
              entity: 'resource',
            },
          },
          {
            path: '/router/equipments',
            component: './List/MainList',
            params: {
              entity: 'equipment',
            },
          },
          {
            path: '/router/resource_groups',
            component: './List/MainList',
            params: {
              entity: 'resourceGroup',
            },
          },
          {
            path: '/router/availability_profiles',
            component: './List/MainList',
            params: {
              entity: 'availabilityProfile',
            },
          },
          {
            path: '/router/availabilities',
            component: './List/MainList',
            params: {
              entity: 'availabilities',
            },
          },
          {
            component: './List/MainList',
            path: '/router/resource_timeoff',
            params: {
              entity: 'resource_timeoff',
            },
          },
          {
            path: '/router/malfunctions',
            component: './List/MainList',
            params: {
              entity: 'malfunctions',
            },
          },
          {
            path: '/router/malfunction_types',
            name: 'malfunction_types',
            component: './List/MainList',
            params: {
              entity: 'malfunction_types',
            },
          },
          {
            path: '/router/repairs',
            name: 'repaires',
            component: './List/MainList',
            params: {
              entity: 'repairs',
            },
          },
          {
            path: '/router/repair_types',
            name: 'repair_types',
            component: './List/MainList',
            params: {
              entity: 'repair_types',
            },
          },
          {
            path: '/router/mnt_plans',
            name: 'mnt_plans',
            component: './List/MainList',
            params: {
              entity: 'mnt_plans',
            },
          },
          {
            path: '/router/mnt_plan_items',
            name: 'mnt_plan_items',
            component: './List/MainList',
            params: {
              entity: 'mnt_plan_items',
            },
          },
          {
            component: './List/MainList',
            path: '/router/serials',
            params: {
              entity: 'serials',
            },
            name: 'serials',
          },
          {
            component: './List/MainList',
            path: '/router/actions',
            params: {
              entity: 'actions',
            },
            name: 'actions',
          },
          {
            component: './List/MainList',
            path: '/router/identifiers',
            params: {
              entity: 'identifiers',
            },
            name: 'identifiers',
          },
          {
            component: './List/MainList',
            path: '/router/kit',
            params: {
              entity: 'kit',
            },
            name: 'kit',
          },
          {
            component: './List/MainList',
            path: '/router/bom',
            params: {
              entity: 'bom',
            },
            name: 'bom',
          },
          {
            component: './List/MainList',
            path: '/router/bom_locations',
            params: {
              entity: 'bom_locations',
            },
            name: 'bom_locations',
          },
          {
            component: './List/MainList',
            path: '/router/locations',
            params: {
              entity: 'locations',
            },
            name: 'locations',
          },
          {
            component: './List/MainList',
            path: '/router/identifier',
            params: {
              entity: 'identifier',
            },
            name: 'identifier',
          },
          {
            component: './List/MainList',
            path: '/router/iden',
            params: {
              entity: 'iden',
            },
            name: 'serials',
          },
          {
            component: './List/MainList',
            path: '/router/work_report',
            params: {
              entity: 'work_report',
            },
            name: 'work_report',
          },
          {
            component: './List/MainList',
            path: '/router/process',
            params: {
              entity: 'process',
            },
            name: 'process',
          },
          {
            component: './List/MainList',
            path: '/router/proc_act',
            params: {
              entity: 'proc_act',
            },
            name: 'proc_act',
          },
          {
            component: './List/MainList',
            path: '/router/serial_act',
            params: {
              entity: 'serial_act',
            },
            name: 'serial_act',
          },
          {
            component: './List/MainList',
            path: '/router/serial_status',
            params: {
              entity: 'serial_statuses',
            },
            name: 'serial_statuses',
          },
          {
            component: './List/MainList',
            path: '/router/part_status',
            params: {
              entity: 'part_status',
            },
            name: 'part_status',
          },
          {
            path: '/router/tags',
            name: 'Tag Search',
            component: './List/Tags',
          },
          {
            path: '/router/permissions',
            name: 'Edit Permissions',
            component: './List/Permissions',
          },
        ],
      },
       {
        name: 'exception',
        icon: 'warning',
        path: '/exception',
        routes: [
          // exception
          {
            path: '/exception/403',
            name: 'not-permission',
            component: './Exception/403',
          },
          {
            path: '/exception/404',
            name: 'not-find',
            component: './Exception/404',
          },
          {
            path: '/exception/500',
            name: 'server-error',
            component: './Exception/500',
          },
          {
            path: '/exception/trigger',
            name: 'trigger',
            hideInMenu: true,
            component: './Exception/TriggerException',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
