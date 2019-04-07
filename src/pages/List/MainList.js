import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Logic } from '@/defaultSettings';
import moment from 'moment-timezone';
import { BugReporter } from 'simple-bug-reporter';
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
  Modal,
  message,
  Divider,
  Steps,
  Radio,
  Tag,
  Checkbox,
  List,
  notification,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';
import MainForm from './MainForm.js';
import schemas from '../../schemas/schemas.js';

const lang = {
  'en-US': { id: 1, align: 'left' },
  'he-IL': { id: 2, align: 'right' },
  'de-DE': { id: 3, align: 'left' },
};

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
const pushKey = obj =>
  Object.keys(obj).map(key => {
    obj[key].name = key;
    return obj[key];
  });

const formFields = obj => {
  for (var field in obj) {
    obj[field].dataIndex = obj[field].dataIndex > '' ? obj[field].dataIndex : field;
    obj[field].title = formatMessage({ id: `pages.${obj[field].name}` });
  }
  return obj;
};

/* eslint react/no-multi-comp:0 */
@connect(({ action, loading }) => ({
  action,
  loading: loading.models.action,
}))
@Form.create()
class TableList extends PureComponent {
  constructor(props) {
    super(props);
    this.entity = this.props.route.params.entity;

    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: { ...this.props.location.query, ...this.props.route.params }, //get the entity and filters from router
      stepFormValues: {},
      showBugReporter: false,
    };

    this.schemaChange();
    if (!this.schema || !this.schema.fields.id)
      throw new Error('The schema does not have an id field!');
    const params = this.props.location ? this.props.location.query : {};

    this.insertKey = {}; //this.insetrKey passes to the insert form in order to allow insertion of new child rows in parent-child entities
    if (this.schema.defaultKey) {
      this.insertKey[this.schema.defaultKey] = params.name;
    }

    const { dispatch } = this.props;

    dispatch({
      type: 'action/fetch',
      payload: { ...params, entity: this.entity },
    });
  }


    componentWillUnmount(){
      if (this.insertKey.hasOwnProperty('name') || this.insertKey.hasOwnProperty('parent'))  localStorage.setItem('lastEntity', '')
    }

  /*---  change the schema in page loading ---*/
  schemaChange = () => {
    this.schema = schemas[this.entity];
    this.fields = pushKey(this.schema.fields);
    this.columns = this.fields
      .filter(
        field => field.required !== false
      ) /* field ont need to be shown in the table it is needded for input forms only */
      .sort((a, b) => a.order > b.order)
      .map((field, fi) => ({
        title: formatMessage({ id: `pages.${field.name}` }),
        dataIndex: field.dataIndex ? field.dataIndex : field.name,
        key: `${field.dataIndex ? field.dataIndex : field.name}-${fi}`,
        sorter: field.sorter ? field.sorter : false /*if the table can be sotrted by this field*/,
        link: field.link ? field.link : false /*goto link when clicked upon*/,
        son: field.son,
        selectValues: field.selectValues
          ? field.selectValues
          : null /*in case you need to choose from constants in the schema*/,
        //fixed: (field.dataIndex === "name" ? 'left' : /*field.son ? 'right' */'none'),
        width: field.width
          ? field.width
          : 200 /*field.son ? formatMessage({ id: `pages.${field.name}` }).length * 7 : field.dataIndex === "name" ? 100 : 0,*/,
        render: (x, z) =>
          !x && !field.dataIndex ? (
            <span key={fi}></span>
          ) : field.link ? (
            <a
              onClick={() => {
                localStorage.setItem('lastEntity', z.name);
                x
                  ? router.push(`${field.link}?name=${x.split(':')[0] || z.name}`)
                  : router.push(`${field.link}?parent=${z.id}`);
              }}
            >
              {x ? x.toString() : <Icon type="double-right" color="mgenta" />}
            </a>
          ) : field.dataIndex === 'tags' && x ? (
            this.tagsRender(x, fi)
          ) : field.dataIndex === 'resource_names' && x ? (
            this.resourcesRender(x, z)
          ) : x && field.inputMethod === 'bool' ? (
            <Checkbox key={`check-${fi}`} checked={x} disabled />
          ) : x && field.inputMethod === 'timestamp_r' ? (
            x
              .replace('[', '')
              .replace(/"/g, '')
              .replace(',', ' . . . ')
              .replace(')', '')
          ) : x && field.inputMethod === 'timestamp' ? (
            x.replace('T', ' ').split('.')[0]
          ) : (
            x
          ),
        align: lang[getLocale()] ? lang[getLocale()].align : 'left',
      }));
    this.columns.push({ title: '' });
    this.columns = this.schema.forms.update
      ? (this.columns = [
          {
            title: <Icon type="edit" />,
            //fixed : 'right',
            width: 40,
            render: (text, record) => (
              <Fragment>
                <a onClick={() => this.handleUpdateModalVisible(true, record)}>
                  {' '}
                  <Icon type="edit" />
                </a>
              </Fragment>
            ),
          },
          ...this.columns,
        ])
      : this.columns;
    /*
      this.columns.push({
        title: '',
        //fixed : 'right',
        width: 50,
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>
              {' '}
              <Icon type="edit" />
            </a>
          </Fragment>
        ),
      });
      */
    //if(lang[getLocale()].align === 'right') this.columns.reverse()
    return 1;
  };

  tagsRender = (x, j) => (
    <span key={`tags-${j}`}>
      {x.map((tag, i) => (
        <a key={`${tag}a-${j}-${i}`} onClick={() => router.push(`/router/tags?tags=${tag}`)}>
          <Tag  style={{marginTop: 8}} color="blue" key={`${tag}-${j}-${i}`}>
            {tag}
          </Tag>
        </a>
      ))}
    </span>
  );
  /* Renders the resources */
  resourcesRender = (x, z) => {
    if (!x[0]) return <span/>
    const resourceTypeMap = {
      employee: { link: 'employees', color: 'green' },
      equipment: { link: 'equipments', color: 'orange' },
      resource_group: { link: 'resource_groups', color: 'blue' },
      place: { link: 'places', color: 'blue' },
    };
    const types = z.resource_types.slice(1, -1).split(',');
    const colors = types.map(x => resourceTypeMap[x].color);
    const links = types.map(x => resourceTypeMap[x].link);

    return (
      <span>
        {x.map((tag, i) => (
          <a
            key={`atag-${z.name}-${tag}-${i}`}
            onClick={() => router.push(`/router/${links[i]}?name=${tag}`)}
          >
            <Tag style={{marginTop: 8}} color={colors[i]} key={`rtag-${z.name}-${tag}-${i}`}>
              {tag}
            </Tag>
          </a>
        ))}
      </span>
    );
  };

  /*--- HandleTable Pagination and sorting  ----*/
  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { filtersArgformValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      //currentPage: pagination.current,
      //pageSize: pagination.pageSize,
      ...this.state.formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'action/fetch',
      payload: { ...params, entity: this.entity },
    });
  };

  /*--- Handles the reset of the filters form ---*/
  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'action/fetch',
      payload: { entity: this.entity },
    });
  };

  flipShowBugReporter = () => {
    this.setState({ showBugReporter: !this.state.showBugReporter });
  };

  /*--- Refreshes the view After an update or insert ---*/

  handleFormAfterIUD = () => {
    const { form, dispatch } = this.props;
    dispatch({
      type: 'action/fetch',
      payload: { ...this.state.formValues, update: 'yes', entity: this.entity },
    });
  };

  /*--- Toggels the Fitlters form ---*/
  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  /*--- HANDLE the menu clisks for the cumulative actions for the form selected raws ---*/
  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    switch (e.key) {
      case 'remove':
        this.handleDelete(selectedRows);
        break;
      default:
        this.handleFunction(e.key, selectedRows);
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

      const filterString = Object.keys(values)
        .filter(x => values[x])
        .reduce((o, x) => o + `${x}=${values[x]}&`, '');
      router.push(`${this.props.route.path}?${filterString}`);
      this.setState({ formValues: { ...this.state.formValues, ...values } });

      dispatch({
        type: 'action/fetch',
        payload: { ...values, entity: this.entity },
      });
    });
  };

  // shows the add new item form
  handleModalVisible = (flag, record) => {
    this.setState({
      modalVisible: !!flag,
      stepFormValues: { ...record, ...this.state.stepFormValues },
    });
  };

  //shows the update item from
  handleUpdateModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
    });
  };

  //handles item add event
  handleAdd = values => {
    const { dispatch } = this.props;

    this.schema.cascaders &&
      Object.keys(this.schema.cascaders).forEach(x => {
        values[this.schema.cascaders[x][1]] = values[this.schema.cascaders[x][0]][1].split(':')[1];
        values[this.schema.cascaders[x][0]] = values[this.schema.cascaders[x][0]][0];
      });

    //put value in X when only X_t has value
    Object.keys(values)
      .filter(x => x.endsWith('_t'))
      .forEach(x => (values[x.split('_t')[0]] = values[x.split('_t')[0]] || values[x]));
    //any time field is been converted to string
    Object.keys(values)
      .filter(x => x.includes('time'))
      .forEach(x => (values[x] = moment(values[x]).format('HH:mm')));

    let lang_id = lang[getLocale()].id;
    values.name = values.name || this.state.formValues.name;
    values.sig_date = moment()
      //.tz('Asia/Jerusalem')
      .format();
    values.sig_user =
      JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username;
    values.parent = this.state.formValues.parent;
    dispatch({
      type: 'action/add',
      payload: Object.assign(values, { lang_id: lang_id, entity: this.entity }),
      callback: this.handleFormAfterIUD,
    });

    this.insertKey = {};
    let params = this.props.location ? this.props.location.query : {};
    if (this.schema.defaultKey) {
      this.insertKey[this.schema.defaultKey] = params.name;
    }
    if (params.name) {
      this.handleFormReset;
    }

    this.handleModalVisible();
  };

  // handled item update event
  handleUpdate = fields => {
    const { dispatch } = this.props;
    let lang_id = lang[getLocale()].id;
    //any time field is been converted to string
    Object.keys(fields)
      .filter(x => x.includes('_time'))
      .forEach(x => (fields[x] = moment(fields[x]).format('HH:mm')));

    /*Object.keys(fields).forEach(field => {
      fields[field] = fields[field] instanceof moment ? moment(fields[field]._d).format(fields[field]._f) : fields[field]
    })*/

    dispatch({
      type: 'action/update',
      payload: Object.assign(fields, { lang_id: lang_id, entity: this.entity }),
      callback: this.handleFormAfterIUD,
    });

    //message.success('Raw was Updated Successfully');
    this.handleUpdateModalVisible();
  };

  // handled item delete event
  remove = rows => {
    const handleFormAfterIUD = this.handleFormAfterIUD;
    const { dispatch } = this.props;
    dispatch({
      type: 'action/remove',
      payload: {
        keys: rows.map(row => row.id),
        entity: this.entity,
      },
      callback: test => {
        this.setState({
          selectedRows: [],
        });
        return handleFormAfterIUD();
      },
    });
  };

  // handled functions from schema
  sendFunction = (funcName, rows) => {
    const handleFormAfterIUD = this.handleFormAfterIUD;
    const { dispatch } = this.props;
    dispatch({
      type: 'action/sendFunction',
      payload: {
        funcName: funcName,
        keys: rows.map(row => row.id),
        entity: this.entity,
      },
      callback: test => {
        this.setState({
          selectedRows: [],
        });
        return handleFormAfterIUD();
      },
    });
  };

  // handled item delete event
  handleDelete = rows => {
    const remove = this.remove;
    Modal.confirm({
      title: 'Warning, You are about to delete data!!',
      content: rows
        .filter(x => x.name)
        .map(x => `delete ${x.name}？\n`)
        .join(),
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        remove(rows);
        return;
      },
    });
  };

  handleFunction = (funcName, rows) => {
    const sendFunction = this.sendFunction;
    Modal.confirm({
      title: `You are about to ${funcName} the flowing entities:`,
      content: rows.map(x => `${x.name}？\n`).join(),
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        sendFunction(funcName, rows);
        return;
      },
    });
  };

  // states the pagination attributes
  /*
   listPaginationProps = {
      showSizeChanger: true,
      showQuickJumper: false,
      pageSize: 20,
      total: 50,
   };
*/

  renderMainForm(from, to) {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          {this.columns
            .filter(col => col.dataIndex && col.dataIndex !== 'tags')
            .filter(col => !col.son)
            .slice(from, to)
            .map(col => (
              <Col md={8} sm={24} key={'mainform' + col.dataIndex}>
                <FormItem label={col.title}>
                  {getFieldDecorator(col.dataIndex)(<Input placeholder={col.title} style={{width: '80%'}}/>)}
                </FormItem>
              </Col>
            ))}

          <div>
            <div style={{ float: 'right', marginBottom: 24 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                Reset
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                {to !== -1 ? <Icon type="down" /> : <Icon type="up" />}
              </Button>
            </div>
          </div>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm
      ? this.renderMainForm(0, this.columns.length - 1)
      : lang[getLocale()].align === 'left'
      ? this.renderMainForm(0, 2)
      : this.renderMainForm(this.columns.length - 3, this.columns.length - 1);
  }

  myList = data => (
    <List
      key="list"
      grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 5 }}
      dataSource={data}
      pagination={false} //{this.listPaginationProps}
      renderItem={item => (
        <List.Item>
          <Card title={item.name || ''} key={item.name}>
            {//renders fields and values
            Object.keys(item)
              .filter(x => this.schema.fields.hasOwnProperty(x) && x !== 'id' && item[x])
              .map((x, i) => {
                var schema = this.columns.filter(col => col.dataIndex === x)[0];
                if (!schema) return <span />;
                var link = schema.link;
                var render = schema.render ? schema.render(item[x], item) : null;
                link = link ? `${link}?name=${item[x].split(':')[0]}` : link;
                return (
                  <div key={item.name + 'div' + i} className={styles.tableList}>
                    <span> {formatMessage({ id: `pages.${x}` })} : </span>
                    <span> {render}</span>
                  </div>
                );
              })}

            {//renders son relation links
            Object.keys(this.schema.fields)
              .filter(x => this.schema.fields[x].son)
              .map((x, i) => {
                const obj = this.schema.fields[x];
                if (!obj.link) return <span />;
                var link = `${obj.link}?parent=${item.id}`;
                return (
                  <Button
                    style={{ marginTop: 12, marginLeft: 8, color: '#fa8c16' }}
                    color="#fa8c16"
                    key={item.name + 'div' + i}
                    onClick={() => {
                      localStorage.setItem('lastEntity', item.name);
                      router.push(`${link}`);
                    }}
                  >
                    <span> {formatMessage({ id: `pages.${x}` })} </span>
                    <span>
                      <Icon type="double-right" />
                    </span>
                  </Button>
                );
              })}
            {this.schema.forms.update && (
              <Button
                key={`bt_update_${item.name}`}
                style={{ marginTop: 12, float: 'right' }}
                onClick={() => this.handleUpdateModalVisible(true, item)}
              >
                <Icon type="edit" />
              </Button>
            )}
          </Card>
        </List.Item>
      )}
    />
  );

  myTable = (selectedRows, loading, data) => (
    <StandardTable
      selectedRows={selectedRows}
      loading={loading}
      data={data}
      key="uid"
      columns={this.columns}
      onSelectRow={this.handleSelectRows}
      onChange={this.handleStandardTableChange}
      nodelete={this.schema.nodelete}
    />
  );

  render() {
    const {
      action: { data },
      loading,
      location,
    } = this.props;

    if (this.state.formValues.name != location.query.name) {
      const params = this.props.location ? this.props.location.query : {};
      const { dispatch } = this.props;
      this.setState({
        ...this.state,
        formValues: { name: location.query.name, entity: this.state.formValues.entity },
      });
      dispatch({
        type: 'action/fetch',
        payload: { ...params, entity: this.entity },
      });
    }

    console.log('DATA', this.state, location, localStorage.getItem('lastEntity'), getLocale());
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    this.formFields = formFields(this.schema.fields);
    if (data.entity !== this.entity) return <span />;

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">Delete</Menu.Item>
        {this.schema.functions &&
          this.schema.functions.map(x => <Menu.Item key={x.function}>{x.name}</Menu.Item>)}
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
      <PageHeaderWrapper title={this.schema.title}>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)} />
              {selectedRows.length > 0 && (
                <span>
                  <Dropdown overlay={menu}>
                    <Button>
                      {menu.key} <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
              {(this.insertKey.hasOwnProperty('name') ||
                this.insertKey.hasOwnProperty('parent')) && (
                <h2 style={{ textAlign: 'center' }}> {localStorage.getItem('lastEntity')} </h2>
              )}
            </div>
            {data.list[0] === undefined
              ? ''
              : window.innerWidth < 1000
              ? this.myList(data.list)
              : this.myTable(selectedRows, loading, data)}
          </div>
          <a onClick={() => this.flipShowBugReporter()}>
            <Icon type="exclamation-circle" />
          </a>
        </Card>
        {this.schema.forms.insert ? (
          <MainForm
            {...parentMethods}
            ModalVisible={modalVisible}
            values={this.insertKey}
            choosers={data.choosers}
            cascaders={this.schema.cascaders}
            fields={this.formFields}
            formLayout={this.schema.forms.insert}
            handler={this.handleAdd}
            handleModal={this.handleModalVisible}
            insertKey={this.insertKey}
            formType="insert"
          />
        ) : null}
        {this.schema.forms.update && stepFormValues && Object.keys(stepFormValues).length ? (
          <MainForm
            {...updateMethods}
            ModalVisible={updateModalVisible}
            values={stepFormValues}
            choosers={data.choosers}
            cascaders={this.schema.cascaders}
            fields={this.formFields}
            formLayout={this.schema.forms.update}
            handler={this.handleUpdate}
            handleModal={this.handleUpdateModalVisible}
            formType="update"
          />
        ) : null}
        {this.state.showBugReporter ? (
          <BugReporter
            name={JSON.stringify({ ...this.props, ...this.state })}
            serverURL={`${Logic}mymes/bug`}
          />
        ) : (
          <span />
        )}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
