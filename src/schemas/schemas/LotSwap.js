/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/

const lot_swap = {
  entity: 'lot_swap',
  title: 'lot_swap',
  nodelete: true, 

  fields: {
    id: {
      required: false,
    },
    lot_old: {
      dataIndex: 'lot_old',
      sorter: true,
    },
    lot_new: {
        dataIndex: 'lot_new',
        sorter: true,
    },    
    actname: {
      dataIndex: 'actname',
      sorter: true,
    },
    resourcename: {
        dataIndex: 'resourcename',
        sorter: true,
    },  
    serialname: {
        dataIndex: 'serialname',
        sorter: true,
    },    
    username: {
        dataIndex: 'username',
        sorter: true,
    },           
    updated_at: {
      dataIndex: 'updated_at',
      sorter: true,
    },   
  },
};
export { lot_swap };
