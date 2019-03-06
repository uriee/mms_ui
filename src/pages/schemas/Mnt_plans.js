/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const mnt_plans = {
  entity: 'mnt_plan',
  title: 'Mnt_plans',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'mnt_plan_name',
              placeholder: 'Mnt_plan Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'start_date',
              placeholder: 'Start Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'end_date',
              placeholder: 'End Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'repeat',
              placeholder: 'Repeat Every ...',
              style: {
                width: '80%',
              },
            },
            {
              field: 'reschedule',
              placeholder: 'Reschedule',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0], [1, 2], [3, 4]],
        },
        {
          title: 'Descriptions',
          fields: [
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
              field: 'mnt_plan_name',
              placeholder: 'Mnt_plan Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'start_date',
              placeholder: 'Start Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'end_date',
              placeholder: 'End Date',
              style: {
                width: '80%',
              },
            },
            {
              field: 'repeat',
              placeholder: 'Repeat Every ...',
              style: {
                width: '50%',
              },
            },
            {
              field: 'reschedule',
              placeholder: 'Reschedule',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0], [1, 2], [3, 4]],
        },
        {
          title: 'Descriptions',
          fields: [
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
          format: [[0], [1]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    mnt_plan_name: {
      dataIndex: 'name',
      inputMethod: 'input',
      link: '/router/mnt_plan_items',
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
        {
          min: 2,
          message: ' minimum 2 character',
        },
      ],
    },
    start_date: {
      dataIndex: 'start_date',
      inputMethod: 'timestamp',
      defaultValue: null,      
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    end_date: {
      dataIndex: 'end_date',
      inputMethod: 'timestamp',
      defaultValue: null,       
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    repeat: {
      dataIndex: 'repeat',
      inputMethod: 'number',
      sorter: true,
    },
    reschedule: {
      dataIndex: 'reschedule',
      inputMethod: 'bool',
      sorter: true,
    },
    tags: {
      inputMethod: 'tags',
    },
  },
};
export { mnt_plans };
