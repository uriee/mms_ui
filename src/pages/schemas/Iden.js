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
    serial_name: {
      dataIndex: 'serial_name',
      sorter: true,
    },
    act_name: {
      dataIndex: 'act_name',
      sorter: true,
    },
    user_name: {
      dataIndex: 'user_name',
      sorter: true,
    },
    sig_date: {
      dataIndex: 'sig_date',
      sorter: true,
    },
  },
};
export { iden };
