/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const emp = {
  entity: 'emp',
  title: 'Employees',
  forms: {
    insert: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'emp_number',
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
              field: 'active',
              placeholder: 'Active',
              style: {
                width: '80%',
              },
            },
            {
              field: 'manager',
              placeholder: 'Manager type',
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
          format: [[0, 2], [1, 3], [4], [5], [6]],
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
                align: 'center',
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
              field: 'emp_number',
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
              field: 'active',
              placeholder: 'Active',
              style: {
                width: '80%',
              },
            },
            {
              field: 'manager',
              placeholder: 'Manager?',
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
          format: [[0, 2], [1, 3], [4], [5], [6]],
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
                align: 'center',
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
    emp_number: {
      dataIndex: 'name',
      type: 'text',
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
    fname: {
      type: 'text',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
    },
    sname: {
      type: 'text',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
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
      align: 'right',
    },
    manager: {
      dataIndex: 'manager',
      inputMethod: 'select',
      selectValues: ['None', 'Manager', 'Manager(HR)'],
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
      inputMethod: 'select',
      selectValues: ['Integral email', 'External email', 'Both'],
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
    resource_timeoff: {
      link: '/router/resource_timeoff',
      son: true,
    },
  },
};
export { emp };
