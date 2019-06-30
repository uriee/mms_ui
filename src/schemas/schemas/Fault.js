/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const fault = {
  entity: 'fault',
  title: 'Faults',
  forms: {
    insert: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'fault_name',
              placeholder: 'fault Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'status',
              placeholder: 'Status',
              style: {
                width: '80%',
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
              field: 'resource_name',
              style: {
                width: '80%',
                align: 'center',
              },
            },
            {
                field: 'serial_name',
                style: {
                  width: '80%',
                  align: 'center',
                },
            },            
            {
                field: 'quant',
                placeholder: 'Quantity',
                style: {
                  width: '80%',
                },
            },            
            {
              field: 'open_date',
              placeholder: 'Open Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'close_date',
              placeholder: 'Close Date',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1],[2], [3, 4]],
        },
      ],
    },
    update: {
      steps: [
        {
            title: 'Identifiers',
            fields: [
              {
                field: 'fault_name',
                placeholder: 'fault Name',
                style: {
                  width: '80%',
                },
              },
              {
                field: 'status',
                placeholder: 'Status',
                style: {
                  width: '80%',
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
              field: 'description',
              placeholder: 'Description',
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
                field: 'resource_name',
                style: {
                  width: '80%',
                  align: 'center',
                },
              },
              {
                  field: 'serial_name',
                  style: {
                    width: '80%',
                    align: 'center',
                  },
              },            
              {
                  field: 'quant',
                  placeholder: 'Quantity',
                  style: {
                    width: '80%',
                  },
              },            
              {
                field: 'open_date',
                placeholder: 'Open Date',
                style: {
                  width: '80%',
                },
              },
              {
                field: 'close_date',
                placeholder: 'Close Date',
                style: {
                  width: '80%',
                },
              },
            ],
            format: [[0, 1],[2], [3, 4]],
          },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    fault_name: {
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
      type: 'text',
      dataIndex: 'description',
      inputMethod: 'input',
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
        {
          min: 3,
          message: ' minimum 5 character',
        },
      ],
    },
    type: {
      dataIndex: 'type_name',
      link: '/router/fault_type',
      sorter: true,
      inputMethod: 'select',
      chooser: 'fault_type',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    status: {
        dataIndex: 'status_name',
        link: '/router/fault_status',
        sorter: true,
        inputMethod: 'select',
        chooser: 'fault_status',
        inputRules: [
            {
            required: true,
            message: 'This field is required',
            },
        ],
    },
    resource_name: {
      dataIndex: 'resource_name',
      link: '/router/resources',
      type: 'text',
      sorter: true,
      inputMethod: 'select',
      chooser: 'resource',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    serial_name: {
        dataIndex: 'serial_name',
        link: '/router/serials',
        type: 'text',
        sorter: true,
        inputMethod: 'select',
        chooser: 'serial',
        inputRules: [
          {
            required: true,
            message: 'This field is required',
          },
        ],
      },    
    open_date: {
        dataIndex: 'open_date',
        inputMethod: 'timestamp',
        sorter: true,
    },    
    close_date: {
        dataIndex: 'close_date',
        inputMethod: 'timestamp',
        sorter: true,
    },
    quant: {
        dataIndex: 'quant',
        inputMethod: 'number',
        sorter: true,
    }, 
    identifier: {
      link: '/router/identifier',
      son: true,
    },           
    tags: {
      inputMethod: 'tags',
      align: 'right',
    },
    user_name: {
        dataIndex: 'user_name',
        sorter: true,
      },    
  },
};
export { fault };
