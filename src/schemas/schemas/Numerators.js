const numerators = {
  entity: 'numerators',
  title: 'Numerators',
  defaultKey: 'row_type',
  nodelete: true,
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'row_type',
              placeholder: 'row_type',
              style: {
                width: '80%',
              },              
            },
            {
                field: 'description',
                placeholder: 'description',
                style: {
                  width: '80%',
                },              
            },            
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
              style: {
                width: '80%',
              },              
            },
          ],
          format: [[0,1], [2,3]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Update numerator',
          fields: [
            {
              field: 'numerator',
              placeholder: 'numerator',
            },
          ],
          format: [[0]],
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
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    description: {
        dataIndex: 'description',
        inputMethod: 'input',
        sorter: true,
        inputRules: [
          {
            required: true,
            message: 'This field is required',
          },
        ],
      },    
    prefix: {
      dataIndex: 'prefix',
      inputMethod: 'input',
      sorter: true,
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
