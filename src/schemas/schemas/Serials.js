/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const serials = {
  entity: 'serial',
  title: 'Work Orders',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'serial_name',
              placeholder: 'Serial Name (Optional)',
              style: {
                width: '80%',
              },
            },
            {
              field: 'active',
              placeholder: 'Active?',
              style: {
                width: '60%',
              },
            },
            {
              field: 'quant',
              placeholder: 'Quantity',
              style: {
                width: '60%',
              },
            },
            {
              field: 'partname',
              placeholder: 'End Date',
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
              field: 'procname',
              placeholder: 'Process',
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
          format: [[0, 1, 2], [3, 4], [5, 6]],
        },
        {
          title: 'Descriptions',
          fields: [
            {
              field: 'description',
              placeholder: 'Description in English',
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
            {
              field: 'tags',
              placeholder: 'Tags',
              style: {
                width: '100%',
              },
            },
            {
              field: 'extserial',
              placeholder: 'External Serial',
              style: {
                width: '80%',
              },
            }, 
            {
              field: 'parent_serial',
              placeholder: 'Parent Serial',
              style: {
                width: '80%',
              },
            },                       
          ],
          format: [[0], [1], [2], [3,4]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'serial_name',
              placeholder: 'Serial Name',
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
              field: 'quant',
              placeholder: 'Quantity',
              style: {
                width: '60%',
              },
            },
            {
              field: 'partname',
              placeholder: 'End Date',
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
              field: 'procname',
              placeholder: 'Process',
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
          format: [[0, 1, 2], [3, 4], [5, 6]],
        },
        {
          title: 'Descriptions',
          fields: [
            {
              field: 'description',
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
            {
              field: 'parent_serial',
              placeholder: 'Parent Serial',
              style: {
                width: '80%',
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
    serial_name: {
      dataIndex: 'name',
      inputMethod: 'input',
      sorter: true,
      inputRules: [
        {
          min: 5,
          message: ' minimum 5 character',
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
    end_date: {
      dataIndex: 'end_date',
      inputMethod: 'timestamp',
      sorter: true,
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
    quant: {
      dataIndex: 'quant',
      inputMethod: 'number',
      sorter: true,
    },
    status: {
      dataIndex: 'status',
      link: '/router/serial_status',
      sorter: true,
      inputMethod: 'select',
      chooser: 'status',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    partname: {
      dataIndex: 'partname',
      link: '/router/part',
      sorter: true,
      inputMethod: 'select',
      chooser: 'part',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    procname: {
      dataIndex: 'procname',

      link: '/router/process',
      sorter: true,
      inputMethod: 'select',
      chooser: 'process',
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
    actions: {
      link: '/router/serial_act',
      son: true,
    },
    work_reports: {
      link: '/router/work_report',
      son: true,
    },
    kit_items: {
      link: '/router/kit',
      son: true,
    },    
    parent_serial: {
      dataIndex: 'parent_serial_name',
      link: '/router/serials',
      sorter: true,
      inputMethod: 'select',
      chooser: 'parent_serial',
    },     
    extserial: {
      dataIndex: 'extserial',
      inputMethod: 'input',
      sorter: true,
    },    
  },
};
export { serials };
