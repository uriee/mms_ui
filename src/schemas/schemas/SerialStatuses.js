/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const serialStatuses = {
  entity: 'serialStatuses',
  title: 'Serial Statuses',
  forms: {
    insert: {
      steps: [
        {
          title: 'Status Data',
          fields: [
            {
              field: 'status_name',
              placeholder: 'Status Name',
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
              field: 'closed',
              placeholder: 'Closed Work Order',
              style: {
                width: '80%',
              },
            },            
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
              field: 'ext_status',
              placeholder: 'External Status',
              style: {
                width: '80%',
              },
            },            
          ],
          format: [[0, 1, 2], [3], [4], [5],[6]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Status Data',
          fields: [
            {
              field: 'status_name',
              placeholder: 'Status Name',
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
              field: 'closed',
              placeholder: 'Closed Work Order',
              style: {
                width: '10%',
              },
            },            
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
          format: [[0, 1, 2], [3], [4]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    status_name: {
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
    closed: {
      dataIndex: 'closed',
      inputMethod: 'bool',
      sorter: true,
    },      
    tags: {
      inputMethod: 'tags',
    },
    ext_status: {
      dataIndex: 'ext_status',
      inputMethod: 'input',
      sorter: true,
    },      
  },
};
export { serialStatuses };
