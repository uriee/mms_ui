/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const employee_timeoff = {
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
              field: 'request',
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
    ts_range: {
      required: false,
      inputMethod: 'timestamp_r',
      width: 400,
    },
    request: {
      inputMethod: 'textArea',
      width: 400,
    },
    approval: {
      defaultValue: 'Pending approval',
      inputMethod: 'select',
    },
    approved_by: {
      inputMethod: 'textArea',
      inputMethod: 'input',
    },
  },
};
export { employee_timeoff };
