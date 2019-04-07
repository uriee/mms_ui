/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const partStatus = {
  entity: 'partStatus',
  title: 'part Statuses',
  forms: {
    insert: {
      steps: [
        {
          title: 'Status Data',
          fields: [
            {
              field: 'status_name',
              placeholder: 'Status Name',
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
          format: [[0, 1], [2], [3], [4]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Status Data',
          fields: [
            {
              field: 'status_name',
              placeholder: 'Status Name',
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
          format: [[0, 1], [2], [3]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    status_name: {
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
      ],
    },
    active: {
      dataIndex: 'active',
      inputMethod: 'bool',
      sorter: true,
    },
    tags: {
      inputMethod: 'tags',
    },
  },
};
export { partStatus };
