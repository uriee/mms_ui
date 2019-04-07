/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const repair_types = {
  entity: 'repair',
  title: 'Repairs',
  forms: {
    insert: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'repair_type_name',
              placeholder: 'Repair Type Name',
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
              field: 'description_t',
              placeholder: 'Description',
              style: {
                width: '80%',
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
          title: 'Identifiers',
          fields: [
            {
              field: 'repair_type_name',
              placeholder: 'Repair Type Name',
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
          format: [[0], [1]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    repair_type_name: {
      dataIndex: 'name',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
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
      align: 'right',
    },
    description_t: {
      inputMethod: 'textArea',
      sorter: true,
      align: 'right',
      required: false,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
  },
};
export { repair_types };
