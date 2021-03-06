/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const serial_act = {
  entity: 'serial_act',
  title: 'Serial Actions',
  defaultKey: 'name',
  defaultSort: 'pos',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'pos',
              placeholder: 'Positiion',
              style: {
                width: '80%',
              },
            },
            {
              field: 'act_name',
              placeholder: 'Act Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'quant',
              placeholder: 'Quant',
            },
            {
              field: 'balance',
              placeholder: 'Balance',
            },
            {
              field: 'quantitative',
            }, 
            {
              field: 'serialize',
            }, 
            {
              field: 'batch_size',
              placeholder: 'Batch Size',
              style: {
                width: '80%',
              },              
            },                                  
          ],
          format: [[0, 1], [2, 3] ,[4, 5,6]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'pos',
              placeholder: 'Position',
              style: {
                width: '80%',
              },
            },
            {
              field: 'act_name',
              placeholder: 'Act Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'quantitative',
            }, 
            {
              field: 'serialize',
            },
            {
              field: 'batch_size',
              placeholder: 'Batch Size',
              style: {
                width: '80%',
              },              
            },                         
          ],
          format: [[0, 1], [2, 3, 4]],
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
      sorter: true,
      required: false,
    },
    pos: {
      dataIndex: 'pos',
      inputMethod: 'number',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    act_name: {
      dataIndex: 'act_name',
      link: '/router/actions',
      sorter: true,
      inputMethod: 'select',
      chooser: 'actions',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    quant: {
      dataIndex: 'quant',
      inputMethod: 'number',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    balance: {
      dataIndex: 'balance',
      inputMethod: 'number',
      sorter: true,
    },
    quantitative: {
      dataIndex: 'quantitative',
      inputMethod: 'bool',
      sorter: true,
    },
    serialize: {
      dataIndex: 'serialize',
      inputMethod: 'bool',
      sorter: true,
    },
    batch_size: {
      dataIndex: 'batch_size',
      inputMethod: 'number',
      sorter: true,
    },         
    act_resources: {
      link: '/router/serialActResources?type=3&',
      son: true,
    },
    type: {
      value: 'a',
      required : false
    },         
  },
};
export { serial_act };
