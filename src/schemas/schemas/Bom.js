/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const bom = {
  entity: 'bom',
  title: 'Bom',
  defaultKey: 'name',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'partname',
              placeholder: 'Part Name',
            },
            {
              field: 'coef',
              placeholder: 'coef',
            },
            {
              field: 'produce',
              placeholder: 'Produce',
            },            
          ],
          format: [[0], [1 ,2]],
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
              placeholder: 'Part Name',
            },
            {
              field: 'coef',
              placeholder: 'coef',
            },
            {
              field: 'produce',
              placeholder: 'Produce',
            },            
          ],
          format: [[0], [1,2]],
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
    coef: {
      dataIndex: 'coef',
      inputMethod: 'number',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    produce: {
      dataIndex: 'produce',
      inputMethod: 'bool',
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
  },
};
export { bom };
