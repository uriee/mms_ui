/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const dept = {
  entity: 'dept',
  title: 'Departments',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'dept_name',
              placeholder: 'Department Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'tags',
              placeholder: 'tags',
              style: {
                width: '100%',
              },
            },
          ],
          format: [[0], [1]],
        },
        {
          title: 'Descriptions',
          fields: [
            {
              field: 'description',
              placeholder: 'Description in Other languages',
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
          format: [[1], [0]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'dept_name',
              placeholder: 'Department Name',
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
              field: 'tags',
              placeholder: 'tags',
              style: {
                width: '100%',
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
      updateable: false,
      insertable: false,
      required: false,
    },

    dept_name: {
      dataIndex: 'name',
      updateable: false,
      insertable: true,
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
      updateable: false,
      dataIndex: 'description',
      insertable: true,
      inputMethod: 'input',
      sorter: true,
      align: 'right',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
        {
          min: 5,
          message: ' minimum 5 character',
        },
      ],
    },
    description_t: {
      updateable: false,
      insertable: true,
      inputMethod: 'input',
      sorter: true,
      align: 'right',
      required: false,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
        {
          min: 5,
          message: ' minimum 5 character',
        },
      ],
    },
    tags: {
      inputMethod: 'tags',
      align: 'right',
    },
  },
};
export { dept };
