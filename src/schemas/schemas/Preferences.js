/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const preferences = {
  entity: 'preferences',
  title: 'Preferencess',
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
            },
            {
              field: 'description',
              placeholder: 'Description',
            },
            {
              field: 'value',
              placeholder: 'Value',
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
