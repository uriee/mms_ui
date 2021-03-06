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
            component: './Dashboard/Monitor',
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
            path: '/production/work_report',
            component: './List/MainList',
            params: {
              entity: 'work_report',
            },
            name: 'report',
          },
          {
            path: '/production/workReport',
            component: './List/WorkReport',
            name: 'workreport',
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
            path: '/production/lotswap',
            name: 'lot_swap',
            component: './List/MainList',
            params: {
              entity: 'lot_swap',
            },
          },          
          {
            path: '/production/standard',
            name: 'standard',
            component: './Result/Success',
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
        name: 'resources',
        path: '/resources',
        routes: [
          {
            path: '/resources/resources',
            name: 'resources',
            component: './List/MainList',
            params: {
              entity: 'resource',
            },
          },
          {
            path: '/resources/resourcetree',
            name: 'resourcetree',
            component: './List/ResourceTree',
          },

          {
            path: '/resources/resource_groups',
            name: 'resource_groups',
            component: './List/MainList',
            params: {
              entity: 'resource_groups',
            },
          },
          {
            path: '/resources/availability_profiles',
            name: 'availability_profiles',
            component: './List/MainList',
            params: {
              entity: 'availabilityProfile',
            },
          },
          {
            path: '/resources/employees',
            name: 'employees',
            component: './List/MainList',
            params: {
              entity: 'emp',
            },
          },
          {
            path: '/resources/equipment',
            name: 'equipment',
            component: './List/MainList',
            params: {
              entity: 'equipment',
            },
          },                    
        ],
      },      
      {
        name: 'plan',
        path: '/plan',
        routes: [
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
            component: './List/Triggers',
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
            path: '/hr/positions',
            name: 'positions',
            component: './List/MainList',
            params: {
              entity: 'positions',
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
            path: '/qa/fault',
            name: 'fault',
            component: './List/MainList',
            params: {
              entity: 'fault',
            },
          },
          {
            path: '/qa/fault_type',
            name: 'fault_type',
            component: './List/MainList',
            params: {
              entity: 'fault_type',
            },
          },        
          {
            path: '/qa/fault_status',
            name: 'fault_status',
            component: './List/MainList',
            params: {
              entity: 'fault_status',
            },
          },                    
          {
            path: '/qa/fix',
            name: 'fix',
            component: './List/MainList',
            params: {
              entity: 'fix',
            },
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
            path: '/model/actions',
            name: 'actions',
            component: './List/MainList',
            params: {
              entity: 'actions',
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
            path: '/admin/numerators',
            name: 'numerators',
            component: './List/MainList',
            params: {
              entity: 'numerators',
            },
          },          
          {
            path: '/admin/permissions',
            name: 'Edit Permissions',
            component: './List/Permissions',
          },
          {
            path: '/admin/importbyfile',
            name: 'importbyfile',
            component: './List/ImportByFile',
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
            path: '/router/positions',
            component: './List/MainList',
            params: {
              entity: 'positions',
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
            path: '/router/actResources',
            component: './List/MainList',
            params: {
              entity: 'act_resources',
            },
          },          
          {
            path: '/router/processActResources',
            component: './List/MainList',
            params: {
              entity: 'process_act_resources',
            },
          },
          {
            path: '/router/serialActResources',
            component: './List/MainList',
            params: {
              entity: 'serial_act_resources',
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
            path: '/router/fault',
            component: './List/MainList',
            params: {
              entity: 'fault',
            },
          },
          {
            path: '/router/fault_type',
            name: 'fault_type',
            component: './List/MainList',
            params: {
              entity: 'fault_type',
            },
          },
          {
            path: '/router/fault_type_actions',
            name: 'fault_type_actions',
            component: './List/MainList',
            params: {
              entity: 'fault_type_actions',
            },
          }, 
          {
            path: '/router/fix_actions',
            name: 'fix_actions',
            component: './List/MainList',
            params: {
              entity: 'fix_actions',
            },
          }, 
          {
            path: '/router/fix',
            name: 'fix',
            component: './List/MainList',
            params: {
              entity: 'fix',
            },
          },                               
          {
            path: '/router/fault_status',
            name: 'fault_status',
            component: './List/MainList',
            params: {
              entity: 'fault_status',
            },
          },                   
          {
            component: './List/MainList',
            path: '/router/serials',
            params: {
              entity: 'serials',
            },
            name: 'serial',
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
            path: '/router/identifier_links',
            params: {
              entity: 'identifier_links',
            },
            name: 'identifier_links',
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
