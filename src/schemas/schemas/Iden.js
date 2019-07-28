/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const iden = {
  entity: 'iden',
  title: 'Iden',
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
    identifier_links: {
      link: '/router/identifier_links',
      son: true,
    },     
  },
};
export { iden };
