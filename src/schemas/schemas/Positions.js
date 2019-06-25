
const positions = {
  entity: 'position',
  title: 'positions',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'name',
              placeholder: 'position Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'hr',
              placeholder: ' ',
              style: {
                width: '80%',
              },
            },
            {
                field: 'qa',
                placeholder: ' ',
                style: {
                  width: '80%',
                },
            },
            {
              field: 'manager',
              placeholder: ' ',
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
          format: [
              [0],
              [1,2,3],
              [4]
              ],
        },
        {
          title: 'Descriptions',
          fields: [
            {
              field: 'description',
              placeholder: 'Description in English',
              translated : true,
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
          format: [[0], [1]],
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
                placeholder: 'position Name',
                style: {
                  width: '80%',
                },
              },
              {
                field: 'hr',
                placeholder: ' ',
                style: {
                  width: '80%',
                },
              },
              {
                field: 'qa',
                placeholder: ' ',
                style: {
                  width: '80%',
                },
              },
              {
                field: 'manager',
                placeholder: ' ',
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
            format: [
                [0],
                [1,2,3],
                [4]
                ],
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
      inputMethod: 'input',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        }
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
          min: 1,
          message: ' minimum 5 character',
        },
      ],
    },
    hr: {
      dataIndex: 'hr',
      inputMethod: 'bool',
      sorter: true,
    },
    qa: {
      dataIndex: 'qa',
      inputMethod: 'bool',
      sorter: true,
    },
    manager: {
      dataIndex: 'manager',
      inputMethod: 'bool',
      sorter: true,
    },    
    tags: {
      inputMethod: 'tags',
    },
  },
};
export { positions };
