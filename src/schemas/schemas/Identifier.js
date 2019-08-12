/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const checkMacAddress = (rule, value, callback) => {
  if (!(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(value)) && value ) {
    callback('The Input must be a Mac Address');
  }
  callback();
};

const identifier = {
  entity: 'identifier',
  title: 'Identifiers',
  defaultKey: 'name',
  forms: {
    insert: {
      steps: [
        {
          title: 'Details',
          fields: [
            {
              field: 'identifier',
              placeholder: 'Identifier',
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
    name: {
      dataIndex: 'name',
      required: false,
    },   
    serial_id: {
      dataIndex: 'serial_id',
      required: false,
    }, 
    act_id: {
      dataIndex: 'act_id',
      required: false,
    },         
    identifier: {
      dataIndex: 'identifier',
      inputMethod: 'input',
      sorter: true,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
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
    parent_identifier: {
      dataIndex: 'parent_identifier',
      inputMethod: 'input',
      sorter: true,
    },    
    identifier_links: {
      link: '/router/identifier_links',
      son: true,
    },     
  },
};
export { identifier };
