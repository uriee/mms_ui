/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const availabilities = {
  entity: 'availabilities',
  title: 'Availabilities',
  defaultKey: 'name',
  forms: {
    insert: {
      steps: [
        {
          title: 'Availability',
          fields: [
            {
              field: 'weekday',
              placeholder: 'Week Day',
              style: {
                width: '80%',
              },
            },
            {
              field: 'flag_o',
              style: {
                width: '80%',
              },
            },
            {
              field: 'from_time',
              placeholder: 'from time',
              style: {
                width: '80%',
              },
            },
            {
              field: 'to_time',
              placeholder: 'to time',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1], [2, 3]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Availability',
          fields: [
            {
              field: 'from_time',
              placeholder: 'from time',
              style: {
                width: '80%',
              },
            },
            {
              field: 'to_time',
              placeholder: 'to time',
              style: {
                width: '80%',
              },
            },
            {
              field: 'flag_o',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1, 2]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    availability_profile_name: {
      dataIndex: 'name',
      sorter: true,
      required: false,
    },
    from_time: {
      inputMethod: 'time',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    to_time: {
      inputMethod: 'time',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    weekday: {
      inputMethod: 'number',
      defaultValue: 0,
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
    },
  },
};
export { availabilities };
