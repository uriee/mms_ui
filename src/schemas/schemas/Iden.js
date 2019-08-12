/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/

const checkMacAddress = (rule, value, callback) => {
  if (!(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(value)) && value ) {
    callback('The Input must be a Mac Address');
  }
  callback();
};

const iden = {
  entity: 'iden',
  title: 'Iden',
  nodelete: true,  
  forms: {
    update: {
      steps: [
        {
          title: 'Update',
          fields: [
            {
              field: 'parent_name',
              placeholder: 'Parent Serial',
              style: {
                width: '80%',
              },
            },
            {
              field: 'mac_address',
              placeholder: 'mac_address',
              style: {
                width: '80%',
              },
            },
            {
              field: 'secondary',
              placeholder: 'secondary',
              style: {
                width: '80%',
              },
            },                        
          ],
          format: [[0],[1,2]],
        },
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    identifier: {
      dataIndex: 'name',
      sorter: true,
    },
    part_name: {
      dataIndex: 'part_name',
      sorter: true,
    },   
    created_at: {
      dataIndex: 'created_at',
      sorter: true,
    },
    parent_name: {
      dataIndex: 'parent_name',
      sorter: true,
    }, 
    mac_address: {
      dataIndex: 'mac_address',
      sorter: true,
      inputMethod: 'input',  
      inputRules: [
        {
          validator: checkMacAddress,
          message: 'This field is Mac Address',
        },
      ],          
    }, 
    secondary: {
      dataIndex: 'secondary',
      sorter: true,
      inputMethod: 'input',      
    },   
    batch: {
      dataIndex: 'batch',
      sorter: true,
      inputMethod: 'input',      
    },             
    identifier_links: {
      link: '/router/identifier_links',
      son: true,
    },     
  },
};
export { iden };
