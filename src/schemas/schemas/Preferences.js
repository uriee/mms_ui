const preferences = {
  entity: 'preferences',
  title: 'Preferences',
  defaultKey: 'name',
  nodelete: true,
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'name',
              placeholder: 'Name',
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
            {
              field: 'value',
              placeholder: 'Value',
              style: {
                width: '80%',
              },              
            },
          ],
          format: [[0, 2], [1]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Update Value',
          fields: [
            {
              field: 'value',
              placeholder: 'Value',
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
    name: {
      dataIndex: 'name',
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
      inputMethod: 'textArea',
      sorter: true,
    },
    value: {
      dataIndex: 'value',
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
export { preferences };
