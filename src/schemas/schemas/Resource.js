/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/


const resource = {
  entity: 'resource',
  title: 'Resources',
  forms: {
    update: {
      steps: [
        {
          title: 'Drag',
          fields: [
            {
              field: 'dragable',
              placeholder: '',
            },
          ],
          format: [[0]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    resource_name: {
      dataIndex: 'name',
      inputMethod: 'input',
      link: (type) => {
                const types = {
                  employee : 'employees',
                  equipment : 'equipments',
                  resource_group : 'resource_groups'
                }  
                return '/router/' + types[type]
              },
      linkParam : 'type', 
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
    active: {
      dataIndex: 'active',
      inputMethod: 'bool',
      defaultValue: true,
      sorter: true,
      align: 'right',
    },
    type: {
      dataIndex: 'type',
      sorter: true,
      align: 'right',
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
    dragable: {
      dataIndex: 'dragable',
      inputMethod: 'bool',
      defaultValue: true,
      sorter: true,
    },
    resource_timeoff: {
      link: '/router/resource_timeoff',
      son: true,
    },
  },
};
export { resource };
