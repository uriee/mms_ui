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
  List,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';

/*import the schemas*/
import {emp} from '../schemas/Emp.js';
import {part} from '../schemas/Part.js';
import {dept} from '../schemas/Departments.js';
const schemas = {emp : emp,part: part, dept: dept}

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

@Form.create()
class CreateForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      formVals: Object.keys(this.props.fields).reduce((obj,key)=>{
        obj[this.props.fields[key].dataIndex] = this.props.values[this.props.fields[key].dataIndex]
        return obj
      },{}),
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = currentStep => {
    const numOfSteps = this.props.formLayout.steps.length-1  
    const { form, handler, choosers, handleModal } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep <  numOfSteps) {
            this.forward();
          } else {
            handler(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    if (currentStep > 0) {
      this.setState({
        currentStep: currentStep - 1,
      });
    }
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  getFormItemFromSchema = (fieldData)  => {
    const fieldName = fieldData.field
    const fieldStyle = fieldData.style
    const { form, fields } = this.props;
    const field = fields[fieldName]
    console.log('~~~~~~~~',field,fieldData)
    if (field.inputMethod === "select" && !this.props.hasOwnProperty('choosers')) return <span/> //a bug that need to be fixed
    const placeHolder = fieldData.placeholder || field.title
    const formVals = this.state.formVals
    let formField = null
    let layout = {}
    switch(field.inputMethod) {
      case 'input':
        formField = (<Input placeholder={placeHolder} style={fieldStyle} />)
        break
      case 'select':
        formField = (
         <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {this.props.choosers[field.chooser].map(option => (
                <Option key={option.name} value={option.name}>
                  {option.name}
                </Option>
              ))}
          </Select>  
          )
        layout = this.formLayout
        break
      default : formField = (<Input placeholder={field.title} style={field.style} />)
    }
    return (
       <FormItem key={field.dataIndex} {...this.Layout} label={field.title}>
         {form.getFieldDecorator(field.dataIndex, {rules: field.inputRules,initialValue: formVals[field.dataIndex]})(formField)}
       </FormItem>  
      )
  }


  renderContent = (currentStep) => {
    const type = this.props.formType
    const steps = this.props.formLayout.steps
    const step = steps[currentStep]
    const format = step.format
    const length = format.length
    const fields = step.fields
    return format.map((subStep,i) => {
      const length = subStep.length
      const elements = subStep.map((place,j) => (
        <Col md={24/length} sm={24}  key={`${type}step${i}${j}`}>
          {this.getFormItemFromSchema(fields[place])}
        </Col>
        ))
      return (
        <Row key={`${type}step${i}`}>
        {elements}
        </Row>
        )
    })    

  } 
     
 
  renderFooter = currentStep => {
    const { handleModal } = this.props;
    const numOfSteps = this.props.formLayout.steps.length    
    if (currentStep === numOfSteps-1) {
      var ret = []
       if (currentStep > 0 ) {
        ret = [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          Back
        </Button>
        ]
       }
      return [...ret,
        <Button key="cancel" onClick={() => handleModal()}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
          Submit
        </Button>,
      ];
    }
    if (currentStep < numOfSteps-1 && currentStep > 0 ) {
      return [
        <Button key="back" style={{ float: 'left' }} onClick={this.backward}>
          Back
        </Button>,
        <Button key="cancel" onClick={() => handleModal()}>
          Cancel
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          Forward
        </Button>,
      ];
    }    
    return [
      <Button key="cancel" onClick={() => handleModal()}>
        Cancel
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        Forward
      </Button>,
    ];
  };

  render() {
    if (!this.props.fields) return {}
    const { ModalVisible, handleModal } = this.props;
    const { currentStep, formVals } = this.state;
    const steps = this.props.formLayout.steps    
    const type = this.props.formType
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="Edit"
        visible={ModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleModal()}
      >
        <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          {steps.map((step,i) => <Step title={step.title} key={`${type}step${i}`}/>)}
        </Steps>
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
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

    this.entity = this.props.route.params.entity
    this.schema = schemas[this.entity]
    if(!this.schema.fields.id) throw new Error("The schema does not have an id field!")

    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
    };

    this.fields = pushKey(this.schema.fields)
    this.formFields = formFields(this.schema.fields)  
    this.columns = this.fields
                      .filter(field => field.required !== false)
                      .sort((a,b) => a.order > b.order)
                      .map(field => ({
                        title: formatMessage({ id: `pages.${field.name}` }),
                        dataIndex: (field.dataIndex ? field.dataIndex : field.name),
                        sorter: (field.sorter ? field.sorter : false),
                        align: (field.align ? field.align :'left')
                      }))
    this.columns.push({
        title: '',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdateModalVisible(true, record)}>Update</a>
          </Fragment>
        ),
      })  
  }




  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'action/fetch',
      payload: {entity : this.entity},
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
      type: 'action/fetch',
      payload: { ...params, entity: this.entity }
    });
  };

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

  handleFormAfterIU = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'action/fetch',
      payload: { update: 'yes' ,entity: this.entity},
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

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'action/fetch',
        payload: { ...values, entity: this.entity}
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

  handleUpdate = fields => {
    const { dispatch } = this.props;
    let lang = { 'zh-CN': 2, 'en-US': 1 };
    let lang_id = lang[getLocale()];
    dispatch({
      type: 'action/update',
      payload: Object.assign(fields,{lang_id: lang_id,entity: this.entity}),
      callback: this.handleFormAfterIU,
    });

    message.success('Raw was Updated Successfully');
    this.handleUpdateModalVisible();
  };


  renderMainForm(from,to) {
    const {
      form: { getFieldDecorator },
    } = this.props;
      return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} >
          {this.columns.slice(from,to).map(col => (
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
      renderItem={item => (
        <List.Item>
          <Card title={item.name} key={item.name}>
              {Object.keys(item).filter(x => this.schema.fields.hasOwnProperty(x) && x!== 'id').map(x =>{console.log(item,x);
                return(
                <div>
                  <span > {formatMessage({ id: `pages.${x}` })} : </span>
                  <span > {item[x].toString()} </span>
                   
                </div>)})}
              <Button key={`bt_update_${item.name}`} style={{ float: 'right' }} onClick={() => this.handleUpdateModalVisible(true, item) }>
                Update
              </Button>
          </Card>
        </List.Item>
      )}
    />    
  );  


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
    console.log("DATA",data,this.entity)
    if(data.entity !== this.entity) return <span/>
      console.log("-------------------------------------",window.innerWidth)
     return (
      <PageHeaderWrapper title={this.schema.title}>
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
            {( window.innerWidth < 1000 ? this.myList(data.list) :this.myTable(selectedRows,loading,data))}
          </div>
        </Card>
        <CreateForm
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
          <CreateForm
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
