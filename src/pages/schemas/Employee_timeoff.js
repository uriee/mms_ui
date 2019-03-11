/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const employee_timeof = {
  entity: 'employee_timeof',
  title: 'employee_timeof',
  defaultKey: 'name',
  forms: {
    insert: {
      steps: [
        {
          title: 'Time Off',
          fields: [
            {
              field: 'from_date',
              placeholder: 'from date',
              style: {
                width: '40%',
              },
            },
            {
              field: 'to_date',
              placeholder: 'to date',
              style: {
                width: '40%',
              },
            },
            {
              field: 'flag_o',
              style: {
                width: '20%',
              },
            },
            {
              field: 'ts_range',
            },
            {
              field: 'request',
            },            
          ],
          format: [[0], [1], [2], [3], [4]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    from_date: {
      inputMethod: 'timestamp',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    to_date: {
      inputMethod: 'timestamp',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    flag_o: {
      inputMethod: 'bool',
      defaultValue: false,
      sorter: true,
      "width" : 150
    },
    ts_range: {
      inputMethod: 'timestamp_r',
      "width" : 400
    },
    approval:{
      defaultValue: 'Pending approval',
      inputMethod: 'select'
    },
    request:{
      inputMethod: 'textArea',
      "width" : 400
    }
    approved_by:{
      inputMethod: 'textArea',
      inputMethod: 'input'
    }    
  },
};
export { employee_timeof };
