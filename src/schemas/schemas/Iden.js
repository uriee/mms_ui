/*
The label in forms is determents by <FormattedMessage id=forms+entity+field /> forms+entity+field
*/
const iden = {
  entity: 'iden',
  title: 'Iden',
  forms: {},
  fields: {
    id: {
      required: false,
    },
    identifier: {
      dataIndex: 'name',
      sorter: true,
    },
    created_at: {
      dataIndex: 'created_at',
      sorter: true,
    },
    identifier_links: {
      link: '/router/identifier_links',
      son: true,
    },     
  },
};
export { iden };
