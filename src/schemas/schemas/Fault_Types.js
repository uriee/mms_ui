/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const fault_type = {
  loadable : true,  
  entity: 'fault_type',
  title: 'Fault Types',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'name',
              placeholder: 'fault Type Name (optional)',
              style: {
                width: '80%',
              },
            },
            {
              field: 'extname',
              placeholder: 'External Name',
              style: {
                width: '80%',
              },
            },            
            {
              field: 'active',
              style: {
                width: '80%',
              },
            },            
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
          format: [[0,2], [1], [3], [4]],
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
              placeholder: 'faultunction Type Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'active',
              style: {
                width: '80%',
              },
            }, 
            {
              field: 'extname',
              placeholder: 'External Name',
              style: {
                width: '80%',
              },
            },                        
            {
              field: 'description',
              placeholder: 'Description',
              style: {
                width: '80%',
              },
            },           
          ],
          format: [[0,1], [2], [3]],
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
          min: 2,
          message: ' minimum 2 character',
        },
      ],
    },
    description: {
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
          min: 2,
          message: ' minimum 5 character',
        },
      ],
    },
    active: {
      dataIndex: 'active',
      inputMethod: 'bool',
      sorter: true,
    }, 
    extname: {
      dataIndex: 'extname',
      inputMethod: 'input',
      sorter: true,
    },         
  },
};
export { fault_type };
