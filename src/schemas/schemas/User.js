/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const checkPassword = (rule, value, callback) => {
  if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) && value ) {
    callback('Minimum eight characters, at least one letter and one number');
  }
  callback();
};

const checkEmail = (rule, value, callback) => {
  if (!(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)) && value ) {
    callback('The Input must be an Email');
  }
  callback();
};

const user = {
  entity: 'user',
  title: 'Users',
  forms: {
    insert: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'user_name',
              placeholder: 'User Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'currentAuthority',
              placeholder: 'Profile Name',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0], [1]],
        },
        {
          title: 'Password',
          fields: [
            {
              field: 'password',
              placeholder: 'Enter Password',
              style: {
                width: '80%',
              },
            },
            {
              field: 'password2',
              placeholder: 'Enter Password',
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
          title: 'Identifiers',
          fields: [
            {
              field: 'user_name',
              placeholder: 'User Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'currentAuthority',
              placeholder: 'Profile Name',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0], [1]],
        },
        {
          title: 'Info',
          fields: [
            {
              field: 'title',
              placeholder: 'Title',
              style: {
                width: '100%',
              },
            },
            {
              field: 'email',
              style: {
                width: '100%',
              },
            },
          ],
          format: [[0], [1]],
        },
        {
          title: 'Tags',
          fields: [
            {
              field: 'tags',
              placeholder: 'Tags',
              style: {
                width: '100%',
              },
            },
          ],
          format: [[0]],
        },
        {
          title: 'Password',
          fields: [             
            {
              field: 'password',
              placeholder: 'Enter Password',
              style: {
                width: '80%',
              },
            },            
            {
              field: 'password2',
              placeholder: 'Repeat Password',
              style: {
                width: '80%',
              }
            }
          ],
          format: [[0],[1]],
        },        
      ],
    },
  },
  fields: {
    id: {
      required: false,
    },
    user_name: {
      dataIndex: 'name',
      type: 'text',
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
    currentAuthority: {
      dataIndex: 'currentAuthority',
      type: 'text',
      sorter: true,
      inputMethod: 'select',
      chooser: 'profiles',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    email: {
      updateable: false,
      insertable: true,
      type: 'text',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
        {
          validator : checkEmail,
          message: 'The Input must be an Email',
        },        
      ],
    },
    title: {
      inputMethod: 'input',
      sorter: true,
      align: 'right',
      inputRules: [
        {
          min: 2,
          message: ' minimum 2 character',
        },
      ],
    },
    tags: {
      inputMethod: 'tags',
      align: 'right',
    },
    created_at: {
      updateable: false,
      insertable: true,
      sorter: true,
      align: 'right',
      inputRules: [
        {
          min: 2,
          message: ' minimum 2 character',
        },
      ],
    },
    password: {
      align: 'right',
      required: false,
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
        {
          validator : checkPassword,
          message: 'Minimum eight characters, at least one letter and one number',
        },        
        {
          min: 8,
          message: ' minimum 8 character',
        },
      ],
    },
    password2: {
      required: false,
      align: 'right',
      inputRules: [
        {
          validator : checkPassword,
          message: 'Minimum eight characters, at least one letter and one number',
        },
        {
          min: 8,
          message: ' minimum 8 character',
        },
      ],
    },    
  },
};



export { user };
