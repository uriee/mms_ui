import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

/*-if exist value in local language then send it if not use the original -*/
const check_t = (trans, orig) => (trans > '' ? trans : orig);

@Form.create()
class CreateForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVals: {},
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const { form, handleAdd, choosers } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 1) {
            this.forward();
          } else {
            handleAdd(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="username" {...this.formLayout} label="username">
          {form.getFieldDecorator('username', {
            rules: [{ required: true, message: 'This field is required' }],
            initialValue: formVals.username,
          })(
            <Select style={{ width: '100%' }}>
              {this.props.choosers.users.map(user => (
                <Option key={user.username} value={user.username}>
                  {user.username}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>,
        <FormItem key="dept_name" {...this.formLayout} label="username">
          {form.getFieldDecorator('dept_name', {
            rules: [{ required: true, message: 'This field is required' }],
            initialValue: formVals.dept_name,
          })(
            <Select style={{ width: '100%' }}>
              {this.props.choosers.departments.map(dept => (
                <Option key={dept.name} value={dept.name}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>,
      ];
    }

    return [
      <Row key="fname_row">
        <Col md={12} sm={24}>
          <FormItem key="fname" label="First name">
            {form.getFieldDecorator('fname', {
              rules: [
                { required: true, message: 'This field is required, minimum 2 charecter', min: 2 },
              ],
            })(<Input placeholder="First Name" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem key="fname_t" label={<FormattedMessage id="pages.fname" />}>
            {form.getFieldDecorator('fname_t', {
              rules: [{ message: 'Minimum 2 charecter', min: 2 }],
            })(<Input placeholder="" />)}
          </FormItem>
        </Col>
      </Row>,
      <Row key="sname_row">
        <Col md={12} sm={24}>
          <FormItem key="sname" label="Family name">
            {form.getFieldDecorator('sname', {
              rules: [
                { required: true, message: 'This field is required, minimum 2 charecter', min: 2 },
              ],
            })(<Input placeholder="Last Name" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem key="sname_t" label={<FormattedMessage id="pages.fname" />}>
            {form.getFieldDecorator('sname_t', {
              rules: [{ message: 'Minimum 2 charecter)', min: 2 }],
            })(<Input placeholder="" />)}
          </FormItem>
        </Col>
      </Row>,
    ];
  };

  renderFooter = currentStep => {
    const { handleModalVisible } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          Back
        </Button>,
        <Button key="cancel" onClick={() => handleModalVisible()}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          Submit
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleModalVisible()}>
        Cancel
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        Forward
      </Button>,
    ];
  };

  render() {
    const { ModalVisible, handleModalVisible } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="Edit"
        visible={ModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="step 1" />
          <Step title="step 2" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

@Form.create()
class UpdateForm extends PureComponent {
  constructor(props) {
    super(props);
    console.log('!!!!~!~', props.values);
    this.state = {
      formVals: {
        name: props.values.name,
        sname: props.values.sname,
        fname: props.values.fname,
        username: props.values.username,
        dept_name: props.values.dept_name,
        id: props.values.id,
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const { form, handleUpdate, choosers } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 1) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form } = this.props;
    if (currentStep === 1) {
      return [
        <FormItem key="username" {...this.formLayout} label="username">
          {form.getFieldDecorator('username', {
            rules: [{ required: true, message: 'This field is required' }],
            initialValue: formVals.username,
          })(
            <Select style={{ width: '100%' }}>
              {this.props.choosers.users.map(user => (
                <Option key={user.username} value={user.username}>
                  {user.username}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>,
        <FormItem key="dept_name" {...this.formLayout} label="username">
          {form.getFieldDecorator('dept_name', {
            rules: [{ required: true, message: 'This field is required' }],
            initialValue: formVals.dept_name,
          })(
            <Select style={{ width: '100%' }}>
              {this.props.choosers.departments.map(dept => (
                <Option key={dept.name} value={dept.name}>
                  {dept.name}
                </Option>
              ))}
            </Select>
          )}
        </FormItem>,
      ];
    }

    return [
      <FormItem key="fname" {...this.formLayout} label={<FormattedMessage id="pages.fname" />}>
        {form.getFieldDecorator('fname', {
          rules: [{ required: true, message: 'This field is required' }],
          initialValue: formVals.fname,
        })(<Input placeholder="First Name" />)}
      </FormItem>,

      <FormItem key="sname" {...this.formLayout} label={<FormattedMessage id="pages.sname" />}>
        {form.getFieldDecorator('sname', {
          rules: [{ required: true, message: 'This field is required' }],
          initialValue: formVals.sname,
        })(<Input placeholder="English" />)}
      </FormItem>,
    ];
  };

  renderFooter = currentStep => {
    const { handleUpdateModalVisible } = this.props;
    if (currentStep === 1) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          Back
        </Button>,
        <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          Submit
        </Button>,
      ];
    }
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible()}>
        Cancel
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        Forward
      </Button>,
    ];
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="Edit"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="step 1" />
          <Step title="step 2" />
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ emp, loading }) => ({
  emp,
  loading: loading.models.emp,
}))
@Form.create()
class TableList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      entity: this.props.route.params.entity,
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
    };

    this.columns = [
      {
        title: formatMessage({ id: 'pages.emp_name' }),
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: formatMessage({ id: 'pages.fname' }),
        dataIndex: 'fname',
        sorter: true,
        align: 'right',
      },
      {
        title: formatMessage({ id: 'pages.sname' }),
        dataIndex: 'sname',
        sorter: true,
        align: 'right',
      },
      {
        title: formatMessage({ id: 'pages.dept_name' }),
        dataIndex: 'dept_name',
        sorter: true,
        align: 'right',
      },
      {
        title: formatMessage({ id: 'pages.username' }),
        dataIndex: 'username',
        sorter: true,
        align: 'right',
      },
      {
        title: '',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>Update</a>
          </Fragment>
        ),
      },
    ];
  }

  componentDidMount() {
    const { dispatch } = this.props;
    console.log('~~~~~~~~~', this.props, this.state.entity);
    dispatch({
      type: 'emp/fetch',
      payload: {},
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'emp/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'emp/fetch',
      payload: {},
    });
  };

  handleFormAfterIU = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'emp/fetch',
      payload: { update: 'yes' },
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'emp/fetch',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'emp/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, record) => {
    this.setState({
      modalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;
    let lang = { 'zh-CN': 2, 'en-US': 1 };
    let lang_id = lang[getLocale()];

    dispatch({
      type: 'emp/add',
      payload: {
        lang_id: lang_id,
        fname: fields.fname,
        fname_t: check_t(fields.fname_t, fields.fname),
        sname: fields.sname,
        sname_t: check_t(fields.sname_t, fields.sname),
        emp_name: `${fields.fname} ${fields.sname}`,
        user_name: fields.username,
        dept_name: fields.dept_name,
      },
      callback: this.handleFormAfterIU,
    });

    message.success('Raw was Added Successfully');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    console.log(fields);
    let lang = { 'zh-CN': 2, 'en-US': 1 };
    let lang_id = lang[getLocale()];

    dispatch({
      type: 'emp/update',
      payload: {
        id: fields.id,
        lang_id: lang_id,
        fname: fields.fname,
        sname: fields.sname,
        emp_name: fields.name,
        user_name: fields.username,
        dept_name: fields.dept_name,
      },
      callback: this.handleFormAfterIU,
    });

    message.success('Raw was Updated Successfully');
    this.handleUpdateModalVisible();
  };

  renderSimpleForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="Name">
              {getFieldDecorator('name')(<Input placeholder="Name" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="User Name">
              {getFieldDecorator('username')(<Input placeholder="User Name" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                Reset
              </Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                Advanced Filter <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label={<FormattedMessage id="pages.emp_name" />}>
              {getFieldDecorator('name')(
                <Input placeholder={<FormattedMessage id="pages.emp_name" />} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="First Name">
              {getFieldDecorator('fname')(<Input placeholder="First Name" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Family Name">
              {getFieldDecorator('sname')(<Input placeholder="Family Name" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="Department">
              {getFieldDecorator('dept_name_t')(<Input placeholder="Department" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="User Name">
              {getFieldDecorator('username')(<Input placeholder="User Name" />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              Reset
            </Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              Toggle <Icon type="up" />
            </a>
          </div>
        </div>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      emp: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">Delete</Menu.Item>
        <Menu.Item key="approval">Approve</Menu.Item>
      </Menu>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
    };

    return (
      <PageHeaderWrapper title="Title">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)} />
              {selectedRows.length > 0 && (
                <span>
                  <Button>what am i ?</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      down <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm
          {...parentMethods}
          ModalVisible={modalVisible}
          values={stepFormValues}
          choosers={data.choosers}
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
            choosers={data.choosers}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
