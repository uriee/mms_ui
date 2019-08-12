/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const proc_act = {
  entity: 'proc_act',
  title: 'Process Actions',
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
              field: 'quantitative',
            }, 
            {
              field: 'serialize',
            }, 
            {
              field: 'batch',
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
              field: 'batch',
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
    batch: {
      dataIndex: 'batch',
      inputMethod: 'bool',
      sorter: true,
    },      
    act_resources: {
      link: '/router/processActResources?type=2&',
      son: true,
    },     
  },
};
export { proc_act };
