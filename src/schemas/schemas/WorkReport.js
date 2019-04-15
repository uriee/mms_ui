/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/

const work_report = {
  entity: 'work_report',
  title: 'Work_report',

  cascaders: {
    resseract: ['resourcename','serialname', 'actname'],
  },

  forms: {
    insert: {
      steps: [
        {
          title: 'Report',
          fields: [
            {
              field: 'resourcename',
              placeholder: 'Work Order -> Action',
            },
            {
              field: 'quant',
              placeholder: 'Quantity',
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
    resourcename: {
      dataIndex: 'resourcename',
      link: '/router/resources',
      sorter: true,
      inputMethod: 'cascader',
      chooser: 'resseract',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    serialname: {
      dataIndex: 'serialname',
      link: '/router/serials',
      sorter: true,
      chooser: 'resseract',
    },   
    actname: {
      dataIndex: 'actname',
      link: '/router/actions',
      sorter: true,
      chooser: 'resseract',
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
    sig_date: {
      dataIndex: 'sig_date',
      inputMethod: 'timestamp',
      sorter: true,
    },
    username: {
      dataIndex: 'username',
      link: '/router/users',
      sorter: true,
    },
    sig_user: {
      dataIndex: 'sig_date',
      required: false,
    },
    maxq: {
      dataIndex: 'maxq',
    },
    identifier: {
      link: '/router/identifier',
      son: true,
    },
  },
};
export { work_report };
