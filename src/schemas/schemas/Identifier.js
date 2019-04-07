/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const identifier = {
  entity: 'identifier',
  title: 'Identifiers',
  defaultKey: 'name',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'identifier',
              placeholder: 'Identifier',
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
      required: false,
    },
    identifier: {
      dataIndex: 'identifier',
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
export { identifier };
