/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const kit = {
  entity: 'kit',
  title: 'Kit',
  defaultKey: 'name',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'partname',
              placeholder: 'End Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'lot',
              placeholder: 'lot',
              style: {
                width: '80%',
              },
            },
            {
              field: 'quant',
              placeholder: 'Quant',
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
          title: 'Details',
          fields: [
            {
              field: 'partname',
              placeholder: 'End Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'lot',
              placeholder: 'lot',
              style: {
                width: '80%',
              },
            },
            {
              field: 'balance',
              placeholder: 'balance',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0], [1], [2]],
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
    lot: {
      dataIndex: 'lot',
      inputMethod: 'input',
      sorter: true,
    },
    partname: {
      dataIndex: 'partname',
      inputMethod: 'input',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    quant: {
      dataIndex: 'quant',
      inputMethod: 'number',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    balance: {
      dataIndex: 'balance',
      inputMethod: 'number',
      sorter: true,
    },
  },
};
export { kit };
