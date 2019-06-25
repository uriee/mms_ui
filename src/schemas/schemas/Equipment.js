/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const equipment = {
  loadable: true,
  entity: 'equipment',
  title: 'Equipments',
  
  functions: [
    {
      name: 'Clone',
      function: 'clone',
    },
  ],

  forms: {
    insert: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'name',
              placeholder: 'Equipment Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'active',
              placeholder: 'Active',
              style: {
                width: '80%',
              },
            },
            {
              field: 'equipment_type',
              placeholder: 'Type',
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
          format: [[0], [1, 2], [3]],
        },
        {
          title: 'Description',
          fields: [
            {
              field: 'description',
              placeholder: 'Description in Other languages',
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
          format: [[1], [0]],
        },
        {
          title: 'Details',
          fields: [
            {
              field: 'ap_name',
              placeholder: 'Availability',
              style: {
                width: '80%',
                align: 'center',
              },
            },
            {
              field: 'mac_address',
              placeholder: 'MacAddress',
              style: {
                width: '80%',
              },
            },
            {
              field: 'serial',
              placeholder: 'Serial',
              style: {
                width: '80%',
              },
            },
            {
              field: 'calibrated',
            },
            {
              field: 'last_calibration',
              placeholder: 'Last Calibration',
            },
          ],
          format: [[0], [1], [2], [3, 4]],
        },
      ],
    },
    update: {
      steps: [
        {
          title: 'Identifiers',
          fields: [
            {
              field: 'name',
              placeholder: 'Equipment Name',
              style: {
                width: '80%',
              },
            },
            {
              field: 'active',
              placeholder: 'Active',
              style: {
                width: '80%',
              },
            },
            {
              field: 'equipment_type',
              placeholder: 'Type',
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
          format: [[0], [1, 2], [3]],
        },
        {
          title: 'Description',
          fields: [
            {
              field: 'description',
              placeholder: 'Description',
              style: {
                width: '80%',
              },
            },
          ],
          format: [[0]],
        },
        {
          title: 'Details',
          fields: [
            {
              field: 'ap_name',
              placeholder: 'Availability',
              style: {
                width: '80%',
                align: 'center',
              },
            },
            {
              field: 'mac_address',
              placeholder: 'MacAddress',
              style: {
                width: '80%',
              },
            },
            {
              field: 'serial',
              placeholder: 'Serial',
              style: {
                width: '80%',
              },
            },
            {
              field: 'calibrated',
            },
            {
              field: 'last_calibration',
              placeholder: 'Last Calibration',
            },
          ],
          format: [[0], [1], [2], [3, 4]],
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
      type: 'text',
      dataIndex: 'description',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
    },
    description_t: {
      inputMethod: 'textArea',
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
    mac_address: {
      dataIndex: 'mac_address',
      type: 'text',
      inputMethod: 'input',
      defaultValue: '00:00:00:00:00:00',
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
    active: {
      type: 'text',
      inputMethod: 'bool',
      defaultValue: true,
      sorter: true,
      align: 'right',
    },
    serial: {
      type: 'text',
      inputMethod: 'input',
      sorter: true,
      align: 'right',
    },
    equipment_type: {
      type: 'text',
      inputMethod: 'select',
      selectValues: ['Tool', 'Machine', 'Machine accessory'],
      defaultValue: true,
      sorter: true,
      align: 'right',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    calibrated: {
      dataIndex: 'calibrated',
      inputMethod: 'bool',
      sorter: true,
    },
    last_calibration: {
      dataIndex: 'last_calibration',
      inputMethod: 'timestamp',
      defaultValue: null,
      sorter: true,
    },
    ap_name: {
      dataIndex: 'ap_name',
      link: '/router/availability_profiles',
      type: 'text',
      sorter: true,
      inputMethod: 'select',
      chooser: 'availability_profiles',
      inputRules: [
        {
          required: true,
          message: 'This field is required',
        },
      ],
    },
    tags: {
      inputMethod: 'tags',
      align: 'right',
    },
    resource_timeoff: {
      link: '/router/resource_timeoff',
      son: true,
    },
  },
};
export { equipment };
