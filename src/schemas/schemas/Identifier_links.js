/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const identifier_links = {
  entity: 'identifier links',
  title: 'Identifier Links',
  forms: {
  },

  fields: {
    id: {
        required: false,
      },      
    created_at :  {
        dataIndex: 'created_at',
    }, 
    act_name: {
      dataIndex: 'act_name',
    }, 
    serial_name: {
      dataIndex: 'serial_name',
    },
    resource_name :  {
        dataIndex: 'resource_name',
      },               
  },
};
export { identifier_links };
