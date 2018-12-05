import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import Link from 'umi/link';
import router from 'umi/router';
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
  Divider,
  Steps,
  Radio,
  Tag,
  Checkbox,
  List,
  TimePicker,
  notification
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';
import MainForm from './MainForm.js'

/*import the schemas*/
import {emp} from '../schemas/Emp.js';
import {part} from '../schemas/Part.js';
import {dept} from '../schemas/Departments.js';
import {user} from '../schemas/User.js';
import {equipment} from '../schemas/Equipment.js';
import {resourceGroup} from '../schemas/ResourceGroup.js';
import {resource} from '../schemas/Resource.js';
import {availabilityProfile} from '../schemas/AvailabilityProfile.js';
import {availabilities} from '../schemas/Availabilities.js';
import {malfunctions} from '../schemas/Malfunctions.js';
import {malfunction_types} from '../schemas/Malfunction_Types.js';
import {repairs} from '../schemas/Repairs.js';
import {repair_types} from '../schemas/Repair_Types.js';

const schemas = {
  emp : emp,
  part: part,
  dept: dept,
  user: user,
  equipment: equipment,
  resourceGroup : resourceGroup,
  resource : resource,
  availabilityProfile : availabilityProfile,
  availabilities : availabilities,
  malfunctions : malfunctions,
  malfunction_types : malfunction_types,
  repairs : repairs,
  repair_types : repair_types     
}

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
const pushKey = (obj) =>  Object.keys(obj).map(key => {
  obj[key].name = key
  return obj[key]
})

const formFields = (obj) => {
  for (var field in obj) {
    obj[field].dataIndex = (obj[field].dataIndex > '' ? obj[field].dataIndex : field)
    obj[field].title = formatMessage({ id: `pages.${obj[field].name}` })
  }
  return obj
}

/* eslint react/no-multi-comp:0 */
@connect(({ action, loading }) => ({
  action,
  loading: loading.models.action,
}))
@Form.create()
class TableList extends PureComponent {
  constructor(props) {
    super(props);
    console.log("IN CONSTRUCTOR",this.props)
    this.entity = this.props.route.params.entity
    this.schemaChange()    
    if(!this.schema  || !this.schema.fields.id) throw new Error("The schema does not have an id field!")

    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {...this.props.location.query, ...this.props.route.params }, //get the entity and filters from router
      stepFormValues: {},
    };
    const { dispatch } = this.props;
    const params = this.props.location ? this.props.location.query : {}
    dispatch({
      type: 'action/fetch',
      payload: {...params, entity : this.entity},
    });
  }
/*---  change the schema in page loading ---*/
 schemaChange = () => {
  console.log('0000000000000000000000:',this.entity,schemas[this.entity] )
    this.schema = schemas[this.entity]  
    this.fields = pushKey(this.schema.fields)
    this.columns = this.fields
                      .filter(field => field.required !== false) /* field ont need to be shown in the table it is needded for input forms only */
                      .sort((a,b) => a.order > b.order)
                      .map((field,fi) => ({
                        title: formatMessage({ id: `pages.${field.name}` }), 
                        dataIndex: (field.dataIndex ? field.dataIndex : field.name),
                        key: `${(field.dataIndex ? field.dataIndex : field.name)}-${fi}`, 
                        sorter: (field.sorter ? field.sorter : false), /*if the table can be sotrted by this field*/
                        link:  (field.link ? field.link : false), /*goto link when clicked upon*/
                        selectValues: (field.selectValues ? field.selectValues : null), /*in case you need to choose from constants in the schema*/
                        render: (x,z) => ( !x ? <span key={fi}/> : 
                          field.link ?  <a onClick={() => router.push(`${field.link}?name=${x}`)}>{x.toString()}</a> :
                          field.dataIndex === 'tags' && x ? (
                            <span key={`tags-${fi}`}>
                              {x.map((tag,i) => <Tag color="blue" key={`${tag}-${fi}-${i}`}>{tag}</Tag>)}
                            </span>
                          ) :
                          field.dataIndex === 'resource_names' && x ? this.resourcesRender(x,z) :
                          field.inputMethod === 'bool' ? <Checkbox key={`check-${fi}`} checked={x} disabled /> :
                          x ),
                        align: (field.align ? field.align :'left')
                      }))
    this.columns.push({
        title: '',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}> <Icon type="edit"  /></a>
          </Fragment>
        ),
      }) 
 }


/* Renders the resources */
  resourcesRender = (x,z) => {
    const resourceTypeMap = {
      employee : {link :'employees',color : 'green'},
      equipment: {link :'equipments',color : 'orange'},
      group : {link :'resource_groups',color : 'blue'},
      place: {link :'places',color : 'blue'}
    }    
    const types = z.resource_types.slice(1,-1).split(',');
    const colors = types.map(x => resourceTypeMap[x].color)
    const links =  types.map(x => resourceTypeMap[x].link)
    
    return( 
      <span>
        {x.map((tag,i) => <a key={`atag-${z.name}-${tag}-${i}`} onClick={() => router.push(`/router/${links[i]}?name=${tag}`)}><Tag color={colors[i]} key={`rtag-${z.name}-${tag}-${i}`}>{tag}</Tag></a>)}
      </span>
    )  
  }

  /*--- HandleTable Pagination and sorting  ----*/
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
      type: 'action/fetch',
      payload: { ...params, entity: this.entity }
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
      payload: {entity: this.entity},
    });
  };

  /*--- Refreshes the view After an update or insert ---*/ 
  handleFormAfterIU = () => {
    const { form, dispatch } = this.props;
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~1:",this.state.formValues) 
    dispatch({
      type: 'action/fetch',
      payload: { ...this.state.formValues, update: 'yes' ,entity: this.entity},
    });
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~2:",form)     
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
        dispatch({
          type: 'action/fetch',
          payload: {
            key: selectedRows.map(row => row.key),
            entity: this.entity
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
      const filterString = Object.keys(values).filter(x => values[x]).reduce((o,x) => o + `${x}=${values[x]}&`,'')
      router.push(`${this.props.route.path}?${filterString}`)

      dispatch({
        type: 'action/fetch',
        payload: { ...values, entity: this.entity}
      });
     
    });
  };

// shows the add new item form
  handleModalVisible = (flag, record) => {
    this.setState({
      modalVisible: !!flag,
      stepFormValues: record || {},
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
    let lang = { 'zh-CN': 2, 'en-US': 1 };
    let lang_id = lang[getLocale()];

    dispatch({
      type: 'action/add',
      payload: Object.assign(values,{lang_id: lang_id, entity: this.entity}),
      callback: this.handleFormAfterIU,
    });

    message.success('Raw was Added Successfully');
    this.handleModalVisible();
  };

// handled item update event
  handleUpdate = fields => {
    const { dispatch } = this.props;
    let lang = { 'zh-CN': 2, 'en-US': 1 };
    let lang_id = lang[getLocale()];
    /*console.log('fields 1111111111111111111111111111111111111:', fields)*/
    Object.keys(fields).forEach(field => {
      fields[field] = fields[field] instanceof moment ? moment(fields[field]._d).format(fields[field]._f) : fields[field]
    })
    dispatch({
      type: 'action/update',
      payload: Object.assign(fields,{lang_id: lang_id,entity: this.entity}),
      callback: this.handleFormAfterIU,
    });

    message.success('Raw was Updated Successfully');
    this.handleUpdateModalVisible();
  };

// states the pagination attributes
   listPaginationProps = {
      showSizeChanger: false,
      showQuickJumper: false,
      pageSize: 10,
      total: 50,
   };

  renderMainForm(from,to) {
    const {
      form: { getFieldDecorator },
    } = this.props;
 
    /*console.log('=========================:',this.props)     */
      return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} >
          {this.columns.filter(col => col.dataIndex !=='tags').slice(from,to).map(col => (
                  <Col md={8} sm={24} key={'mainform'+col.dataIndex}>
                    <FormItem label={col.title}>
                      {getFieldDecorator(col.dataIndex)(
                      <Input placeholder={col.title}/>
                      )}
                    </FormItem>
                  </Col>
                ))}   

        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              Reset
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              {to !== -1 ?  <Icon type="down" /> : <Icon type="up" />}
            </Button>
          </div>
        </div>
          </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderMainForm(0,-1) :this.renderMainForm(0,2);
  }



  myList = (data) => (
    <List key='list'
      grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 5 }}
      dataSource={data}
      pagination={this.listPaginationProps}
      renderItem={item => (
        <List.Item>
          <Card title={item.name} key={item.name}>
              {Object.keys(item)
                .filter(x => this.schema.fields.hasOwnProperty(x) && x!== 'id' && item[x])
                .map((x,i) =>{
                  var schema = this.columns.filter(col => col.dataIndex === x)[0]
                  if (!schema) return (<span/>)
                  var link = schema.link
                  var render = schema.render ? schema.render(item[x],item) : null
                  link = link ? `${link}?name=${item[x]}` : link
                  return (
                    <div key={item.name + 'div' + i}>
                      <span> {formatMessage({ id: `pages.${x}` })} : </span>
                      <span> {render}</span>
                    </div>
                )}
              )}
              <Button key={`bt_update_${item.name}`} style={{ float: 'right' }} onClick={() => this.handleUpdateModalVisible(true, item) }>
                Update
              </Button>
          </Card>
        </List.Item>
      )}
    />    
  )  

  myTable  = (selectedRows,loading,data) => (
      <StandardTable
        selectedRows={selectedRows}
        loading={loading}
        data={data}
        columns={this.columns}
        onSelectRow={this.handleSelectRows}
        onChange={this.handleStandardTableChange}
      />
    )

  render() {
    const {
      action: { data },
      loading,
    } = this.props;
    console.log("DATA",data,this.entity)
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues } = this.state;
    this.formFields = formFields(this.schema.fields)  
    if(data.entity !== this.entity) return <span/>  
 
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
                      Function <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            {( data.list[0] === undefined ? '' : window.innerWidth < 1000 ? this.myList(data.list) :this.myTable(selectedRows,loading,data))}
          </div>
        </Card>
        <MainForm
          {...parentMethods}
          ModalVisible={modalVisible}
          values={stepFormValues}
          choosers={data.choosers}
          fields={this.formFields}
          formLayout={this.schema.forms.insert}
          handler={this.handleAdd}
          handleModal={this.handleModalVisible}
          formType='insert'
        />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <MainForm
            {...updateMethods}
            ModalVisible={updateModalVisible}
            values={stepFormValues}
            choosers={data.choosers}
            fields={this.formFields}
            formLayout={this.schema.forms.update}
            handler={this.handleUpdate}
            handleModal={this.handleUpdateModalVisible}
            formType='update'
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
