
const act_resources = {
  entity: 'act_resources',
  title: "Action Resources",
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
              field: 'ord',
              placeholder: 'Order',
              style: {
                width: '80%',
              },
            },
            {
              field: 'resource_name',
              placeholder: 'Resource Name',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0],[1]],
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
    resource_id: {
      required: false,      
    },   
    act_id: { 
      required: false,      
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
    resource_name: {
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
    description: {
      dataIndex: 'description',
      sorter: true,
    },
    type: {
      value: 1,
      required : false
    },       
  },
};
export { act_resources };
