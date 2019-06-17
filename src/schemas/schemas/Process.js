/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const process = {
  entity: 'process',
  title: 'Process',

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
          title: 'Details',
          fields: [
            {
              field: 'process_name',
              placeholder: 'Process Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'active',
              placeholder: 'Active?',
              style: {
                width: '80%',
              },
            },
            {
              field: 'serial_report',
              placeholder: 'Serial Reporting?',
              style: {
                width: '80%',
              },
            },

            {
              field: 'erpproc',
              placeholder: 'Erp Acts',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1, 2], [3]],
        },
        {
          title: 'Descriptions',
          fields: [
            {
              field: 'description',
              placeholder: 'Description in English',
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
          title: 'Details',
          fields: [
            {
              field: 'process_name',
              placeholder: 'Process Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'active',
              placeholder: 'Active?',
              style: {
                width: '80%',
              },
            },
            {
              field: 'serial_report',
              placeholder: 'Serial Reporting?',
              style: {
                width: '80%',
              },
            },

            {
              field: 'erpproc',
              placeholder: 'Erp Acts',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1, 2], [3]],
        },
        {
          title: 'Descriptions',
          fields: [
            {
              field: 'description',
              placeholder: 'Description in English',
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
          format: [[0], [1]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    process_name: {
      dataIndex: 'name',
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
    description: {
      dataIndex: 'description',
      inputMethod: 'textArea',
      sorter: true,
    },
    description_t: {
      inputMethod: 'textArea',
      sorter: true,
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
      inputMethod: 'bool',
      sorter: true,
    },
    serial_report: {
      dataIndex: 'serial_report',
      inputMethod: 'bool',
      sorter: true,
    },
    erpproc: {
      dataIndex: 'erpproc',
      inputMethod: 'input',
      sorter: true,
    },
    tags: {
      inputMethod: 'tags',
    },
    actions: {
      link: '/router/proc_act',
    },
  },
};
export { process };
