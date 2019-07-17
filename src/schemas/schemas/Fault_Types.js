/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const fault_type = {
  entity: 'fault_type',
  title: 'faultunction Types',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'fault_type_name',
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
          format: [[0,1], [2], [3]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'fault_type_name',
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
              field: 'description',
              placeholder: 'Description',
              style: {
                width: '80%',
              },
            },           
          ],
          format: [[0,1], [2]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    fault_type_name: {
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
  },
};
export { fault_type };