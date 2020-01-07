/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const resource_groups = {
  entity: 'resource_group',
  title: 'Resource Groups',

  functions: [
    {
      name: 'Clone',
      function: 'clone',
    },
  ],
    
  forms: {
    insert: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'group_name',
              placeholder: 'Group Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'active',
              placeholder: 'Active',
              style: {
                width: '80%',
              },
            },
            {
              field: 'resource_names',
              placeholder: 'Resources In Group',
              style: {
                width: '80%',
              },
            },
            {
              field: 'tags',
              placeholder: 'Tags',
              style: {
                width: '100%',
              },
            },
          ],
          format: [[0, 1], [2], [3]],
        },
        {
          title: 'Description',
          fields: [
            {
              field: 'description',
              placeholder: 'Description',
              translated : true,
              style: {
                width: '80%',
              },
            },
            {
              field: 'description_t',
              placeholder: 'Description',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0], [1]],
        },
        {
          title: 'Details',
          fields: [
            {
              field: 'ap_name',
              placeholder: 'Availability',
              style: {
                width: '80%',
                align: 'center',
              },
            },
            {
              field: 'extname',
              placeholder: 'ERP Code',
              style: {
                width: '80%',
                align: 'center',
              },
            },            
          ],
          format: [[0,1]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'group_name',
              placeholder: 'Group Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'active',
              placeholder: 'Active',
              style: {
                width: '80%',
              },
            },

            {
              field: 'resource_names',
              placeholder: 'Resources In Group',
              style: {
                width: '80%',
              },
            },
            {
              field: 'tags',
              placeholder: 'Tags',
              style: {
                width: '100%',
              },
            },
          ],
          format: [[0, 1], [2], [3]],
        },
        {
          title: 'Description',
          fields: [
            {
              field: 'description',
              placeholder: 'Description',
              style: {
                width: '100%',
              },
            },
          ],
          format: [[0]],
        },
        {
          title: 'Details',
          fields: [
            {
              field: 'ap_name',
              placeholder: 'Availability Profile',
              style: {
                width: '100%',
              },
            },
            {
              field: 'extname',
              placeholder: 'ERP Code',
              style: {
                width: '80%',
                align: 'center',
              },
            },             
          ],
          format: [[0,1]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    group_name: {
      dataIndex: 'name',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
        {
          min: 2,
          message: ' minimum 2 character',
        },
      ],
    },
    description: {
      type: 'text',
      dataIndex: 'description',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
    },
    description_t: {
      inputMethod: 'textArea',
      sorter: true,
      align: 'right',
      required: false,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    active: {
      dataIndex: 'active',
      type: 'text',
      inputMethod: 'bool',
      defaultValue: true,
      sorter: true,
      align: 'right',
      width: 100,
    },
    resource_names: {
      dataIndex: 'resource_names',
      type: 'array',
      sorter: true,
      inputMethod: 'tags',
      chooser: 'resources',
      width: 500,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    ap_name: {
      dataIndex: 'ap_name',
      link: '/router/availability_profiles',
      type: 'text',
      sorter: true,
      inputMethod: 'select',
      chooser: 'availability_profiles',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    tags: {
      inputMethod: 'tags',
      align: 'right',
    },
    extname: {
      inputMethod: 'input',
      align: 'right',
      inputRules: [
        {
          max: 3,
          message: ' maximum 3 character',
        },
      ],      
    },
    resource_types: {
      dataIndex: 'resource_types',
      required: false,
    },
    resource_timeoff: {
      link: '/router/resource_timeoff',
      son: true,
    },
  },
};
export { resource_groups };
