/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const locations = {
  entity: 'locations',
  title: 'Locations',
  defaultKey: 'parent',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'location',
              placeholder: 'Location',
              style: {
                width: '80%',
              },
            },
            {
              field: 'partname',
              placeholder: 'End Date',
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
            {
              field: 'act_name',
              placeholder: 'Act Name',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1], [2, 3]],
        },
        {
          title: 'Locations',
          fields: [
            {
              field: 'x',
              placeholder: 'X',
              style: {
                width: '80%',
              },
            },
            {
              field: 'y',
              placeholder: 'Y',
              style: {
                width: '80%',
              },
            },
            {
              field: 'z',
              placeholder: 'Z',
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
              field: 'location',
              placeholder: 'Location',
              style: {
                width: '80%',
              },
            },
            {
              field: 'partname',
              placeholder: 'End Date',
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
            {
              field: 'act_name',
              placeholder: 'Act Name',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1], [2, 3]],
        },
        {
          title: 'Locations',
          fields: [
            {
              field: 'x',
              placeholder: 'X',
              style: {
                width: '80%',
              },
            },
            {
              field: 'y',
              placeholder: 'Y',
              style: {
                width: '80%',
              },
            },
            {
              field: 'z',
              placeholder: 'Z',
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

    location: {
      dataIndex: 'location',
      inputMethod: 'input',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
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
    act_name: {
      dataIndex: 'act_name',
      link: '/router/actions',
      sorter: true,
      inputMethod: 'select',
      chooser: 'actions',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    x: {
      dataIndex: 'x',
      inputMethod: 'number',
      sorter: true,
    },
    y: {
      dataIndex: 'y',
      inputMethod: 'number',
      sorter: true,
    },
    z: {
      dataIndex: 'z',
      inputMethod: 'number',
      sorter: true,
    },
  },
};
export {locations} ;
