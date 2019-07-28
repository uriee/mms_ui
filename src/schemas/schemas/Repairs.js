/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const repairs = {
  entity: 'repairs',
  title: 'Repairs',
  forms: {
    insert: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'repair_name',
              placeholder: 'Repair Name (Optional)',
              style: {
                width: '80%',
              },
            },
            {
              field: 'malfunction_name',
              placeholder: 'Availability',
              style: {
                width: '80%',
                align: 'center',
              },
            },
            {
              field: 'type',
              placeholder: 'Type',
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
          format: [[0], [1, 2], [3]],
        },
        {
          title: 'Description',
          fields: [
            {
              field: 'details',
              placeholder: 'Details',
              translated : true,
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0]],
        },
        {
          title: 'Details',
          fields: [
            {
              field: 'employee_name',
              placeholder: 'Repaired By',
              style: {
                width: '80%',
              },
            },
            {
              field: 'start_date',
              placeholder: 'Start Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'end_date',
              placeholder: 'End Date',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0], [1, 2]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'repair_name',
              placeholder: 'Repair Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'malfunction_name',
              placeholder: 'Availability',
              style: {
                width: '80%',
                align: 'center',
              },
            },
            {
              field: 'type',
              placeholder: 'Type',
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
          format: [[0], [1, 2], [3]],
        },
        {
          title: 'Description',
          fields: [
            {
              field: 'details',
              placeholder: 'Details',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0]],
        },
        {
          title: 'Details',
          fields: [
            {
              field: 'employee_name',
              placeholder: 'Repaired By',
              style: {
                width: '80%',
              },
            },
            {
              field: 'start_date',
              placeholder: 'Start Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'end_date',
              placeholder: 'End Date',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0], [1, 2]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    repair_name: {
      dataIndex: 'name',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
      inputRules: [
        {
          min: 5,
          message: ' minimum 5 character',
        },
      ],
    },
    details: {
      dataIndex: 'details',
      inputMethod: 'area',
      sorter: true,
      align: 'right',
    },
    end_date: {
      dataIndex: 'end_date',
      inputMethod: 'timestamp',
      sorter: true,
    },
    start_date: {
      dataIndex: 'start_date',
      inputMethod: 'timestamp',
      sorter: true,
    },
    type: {
      dataIndex: 'type',
      link: '/router/repair_types',
      sorter: true,
      inputMethod: 'select',
      chooser: 'repair_types',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    malfunction_name: {
      dataIndex: 'malfunction_name',
      link: '/router/malfunctions',
      type: 'text',
      sorter: true,
      inputMethod: 'select',
      chooser: 'malfunctions',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    employee_name: {
      dataIndex: 'employee_name',
      link: '/router/employees',
      type: 'text',
      sorter: true,
      inputMethod: 'select',
      chooser: 'employees',
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
  },
};
export { repairs };
