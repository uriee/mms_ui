
const sub_resources = {
  entity: 'sub_resources',
  title: 'Sub Resources',
  defaultKey: 'name',
  defaultSort: 'ord',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'ord',
              placeholder: 'Order',
              style: {
                width: '80%',
              },
            },
            {
              field: 'name',
              placeholder: 'Resource Name',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0, 1]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'ord',
              placeholder: 'Order',
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
    son_id: {
        
    },   
    parent_id: {
        
    },        
     
    ord: {
      dataIndex: 'ord',
      inputMethod: 'number',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },    
    name: {
      dataIndex: 'name',
      link: '/router/resources',
      sorter: true,
      inputMethod: 'select',
      chooser: 'resources',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    desc: {
        sorter: true,        
    },    
  },
};
export { sub_resources };
