/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const actions = {
  loadable: true,
  entity: 'action',
  title: 'Actions',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'name',
              placeholder: 'Action Name',
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
              field: 'erpact',
              placeholder: 'Erp Acts',
              style: {
                width: '80%',
              },
            },              
            {
                field: 'quantitative',
                placeholder: 'Quantitative?',
                style: {
                  width: '80%',
                },                
            },
          ],
          format: [[0, 1], [2,3]],
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
              field: 'name',
              placeholder: 'Action Name',
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
              field: 'erpact',
              placeholder: 'Erp Acts',
              style: {
                width: '80%',
              },
            },
            {
              field: 'quantitative',
              placeholder: 'Quantitative?',
              style: {
                width: '80%',
              },                
          },            
          ],
          format: [[0, 1], [2,3]],
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
    name: {
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
        {
          min: 1,
          message: ' minimum 5 character',
        },
      ],
    },
    active: {
      dataIndex: 'active',
      inputMethod: 'bool',
      sorter: true,
    },
    quantitative: {
      dataIndex: 'quantitative',
      inputMethod: 'bool',
      sorter: true,
    },    
    erpact: {
      dataIndex: 'erpact',
      inputMethod: 'input',
      sorter: true,
    },
    tags: {
      inputMethod: 'tags',
    },
    act_resources: {
      link: '/router/actResources?type=1&',
      son: true,
    },
  },
};
export { actions };
