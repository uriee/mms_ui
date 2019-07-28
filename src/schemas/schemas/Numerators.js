const numerators = {
  entity: 'numerators',
  title: 'Numerators',
  defaultKey: 'row_type',
  nodelete: true,
  forms: {
    update: {
      steps: [
        {
          title: 'Update numerator',
          fields: [
            {
              field: 'prefix',
              placeholder: 'prefix',
              style: {
                width: '80%',
              },              
            },            
            {
              field: 'numerator',
              placeholder: 'numerator',
            },
          ],
          format: [[1],[0]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    row_type: {
      dataIndex: 'row_type',
      inputMethod: 'input',
      sorter: true,
    },
    description: {
        dataIndex: 'description',
        inputMethod: 'input',
        sorter: true,
      },    
    prefix: {
      dataIndex: 'prefix',
      inputMethod: 'input',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],      
    },
    numerator: {
      dataIndex: 'numerator',
      inputMethod: 'input',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
  },
};
export { numerators };
