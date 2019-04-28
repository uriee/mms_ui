/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const emp = {
  loadable: true,
  entity: 'emp',
  title: 'Employees',
  forms: {
    insert: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'name',
              placeholder: 'Employee Number',
              style: {
                width: '80%',
              },
            },
            {
              field: 'user_name',
              placeholder: 'User Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'position_name',
              placeholder: 'Position',
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
              field: 'id_n',
              placeholder: 'ID Number',
              style: {
                width: '100%',
              },
            },
            {
              field: 'clock_n',
              placeholder: 'Clock Number',
              style: {
                width: '100%',
              },
            },
            {
              field: 'salary_n',
              placeholder: 'Salary Number',
              style: {
                width: '100%',
              },
            },
          ],
          format: [[0, 3], [1, 2], [4], [5]],
        },
        {
          title: 'Employee Names',
          fields: [
            {
              field: 'fname',
              placeholder: 'First Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'fname_t',
              placeholder: 'First Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'sname',
              style: {
                width: '80%',
              },
            },
            {
              field: 'sname_t',
              style: {
                width: '80%',
              },
            },
            {
              field: 'email',
              style: {
                width: '80%',
              },
            },
            {
              field: 'phone',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1], [2, 3], [4, 5]],
        },
        {
          title: 'Details',
          fields: [
            {
              field: 'ap_name',
              placeholder: 'Availability',
              style: {
                width: '80%',
              },
            },
            {
              field: 'delivery_method',
              placeholder: 'Delivery Method',
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
          format: [[0], [1], [2]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'name',
              placeholder: 'Employee Number',
              style: {
                width: '80%',
              },
            },
            {
              field: 'user_name',
              placeholder: 'User Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'position_name',
              placeholder: 'Position',
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
              field: 'id_n',
              placeholder: 'ID Number',
              style: {
                width: '100%',
              },
            },
            {
              field: 'clock_n',
              placeholder: 'Clock Number',
              style: {
                width: '100%',
              },
            },
            {
              field: 'salary_n',
              placeholder: 'Salary Number',
              style: {
                width: '100%',
              },
            },
          ],
          format: [[0, 3], [1, 2], [4], [5]],
        },
        {
          title: 'Employee Details',
          fields: [
            {
              field: 'fname',
              placeholder: 'First Name',
              style: {
                width: '100%',
              },
            },
            {
              field: 'sname',
              style: {
                width: '100%',
              },
            },
            {
              field: 'email',
              style: {
                width: '80%',
              },
            },
            {
              field: 'phone',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1], [2, 3]],
        },
        {
          title: 'More Details',
          fields: [
            {
              field: 'ap_name',
              placeholder: 'Availability',
              style: {
                width: '80%',
              },
            },
            {
              field: 'delivery_method',
              placeholder: 'Delivery Method',
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
          format: [[0], [1], [2]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    name: {
      dataIndex: 'name',
      type: 'text',
      inputMethod: 'input',
      sorter: true,
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
    fname: {
      type: 'text',
      inputMethod: 'input',
      sorter: true,
    },
    sname: {
      type: 'text',
      inputMethod: 'input',
      sorter: true,
    },
    fname_t: {
      type: 'text',
      inputMethod: 'input',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
      required: false,
    },
    sname_t: {
      type: 'text',
      inputMethod: 'input',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
      required: false,
    },
    active: {
      type: 'text',
      inputMethod: 'bool',
      sorter: true,
    },
    email: {
      dataIndex: 'email',
      inputMethod: 'input',
    },
    phone: {
      dataIndex: 'phone',
      inputMethod: 'input',
    },
    delivery_method: {
      dataIndex: 'delivery_method',
      inputMethod: 'bo',
      required: false,
    },
    id_n: {
      dataIndex: 'id_n',
      inputMethod: 'input',
      required: false,
    },
    clock_n: {
      dataIndex: 'clock_n',
      inputMethod: 'input',
      required: false,
    },
    salary_n: {
      dataIndex: 'salary_n',
      inputMethod: 'input',
      required: false,
    },
    user_name: {
      dataIndex: 'user_name',
      link: '/router/users',
      type: 'text',
      sorter: true,
      inputMethod: 'select',
      chooser: 'users',
    },
    position_name: {
      dataIndex: 'position_name',
      link: '/router/positions',
      type: 'text',
      sorter: true,
      inputMethod: 'select',
      chooser: 'positions',
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
    },
    resource_timeoff: {
      link: '/router/resource_timeoff',
      son: true,
    },
  },
};
export { emp };
