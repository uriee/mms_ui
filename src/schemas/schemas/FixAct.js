
const fix_actions = {
  entity: 'fix_act',
  title: "Fix Actions",
  defaultKey: 'name',
  defaultSort: 'ord',
  noFilter : true,
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'name',
              placeholder: 'Action Name',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0]],
        },
      ],
    },
    update: {
        steps: [
          {
            title: 'Details',
            fields: [
              {
                field: 'name',
                placeholder: 'Action Name',
                style: {
                  width: '80%',
                },
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
    description: {
      dataIndex: 'description',
      sorter: true,
    },       
  },
};
export { fix_actions };
