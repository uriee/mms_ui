import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
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
  Modal,
  message,
  Divider,
  Steps,
  Radio,
  Tag,
  Checkbox,
  List,
  notification
} from 'antd';
const FormItem = Form.Item;
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './TableList.less';

/* eslint react/no-multi-comp:0 */
@connect(({ action, loading }) => ({
  action,
  loading: loading.models.action,
}))
@Form.create()
class TagView extends PureComponent {
  constructor(props) {
    super(props);
    console.log("IN CONSTRUCTOR",this.props)
 
  this.columns = [
    {title: formatMessage({ id: `pages.type` }), dataIndex: 'row_type', sorter : true, render:(x) => x },
    {title: formatMessage({ id: `pages.name` }), dataIndex: 'name', sorter : true, render:(x,z,j) => this.nameRender(x,z,j)},
    {title: formatMessage({ id: `pages.tags` }), dataIndex: 'tags', sorter : true, render:(x,z,j) => this.tagsRender(x,z,j)},
    ]

    this.state = {
      formValues: {...this.props.location.query, ...this.props.route.params }, //get the entity and filters from router
    };
    const { dispatch } = this.props;
    dispatch({
      type: 'action/fetch',
      payload: {entity : 'tags', ...this.props.location.query },
    });

  }

  tagsRender = (x,j) => (<span key={`tags-${j}`}>
                              {x.map((tag,i) => (<a key={`${tag}a-${j}-${i}`} onClick={() => { router.push(`/router/tags?tags=${tag}`);
                                                                     router.go(`/router/tags?tags=${tag}`)}}>
                                                    <Tag color="blue" key={`${tag}-${j}-${i}`}>{tag}</Tag>
                                                </a>))}
                              </span>)

  nameRender = (x,z,j) => {
    const typeMap = {
      employee : {link :'employees',color : 'green'},
      equipment: {link :'equipments',color : 'orange'},
      resource_group : {link :'resource_groups',color : 'blue'},
      place: {link :'places',color : 'geekblue'},
      part: {link :'parts', color : 'gold'},
      dept: {link :'departments', color : 'cyan'},
      availability_profile: {link :'availability_profiles', color : 'lime'},      
      malfunction: {link :'malfunctions', color : 'red'},      
      repair: {link :'repairs', color : 'lime'},      
      mnt_plan: {link :'mnt_plans', color : 'magenta'}     
    }
console.log('_________+_______________+_____________+_',x,z,j)
    const color = typeMap[z.row_type].color
    const link = typeMap[z.row_type].link
      return (<a key={`stag-${x}-${j}`} onClick={() => router.push(`/router/${link}?name=${x}`)}><Tag color={color} key={`stag2-${x}-${j}`}>{x}</Tag></a>)  
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
      payload: { entity : 'tags', ...this.props.location.query }
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
      payload: {entity: 'tags'},
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
        payload: { ...values, entity: 'tags'}
      });
     
    });
  };

// states the pagination attributes
   listPaginationProps = {
      showSizeChanger: false,
      showQuickJumper: false,
      pageSize: 10,
      total: 50,
   };


  renderMainForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
     console.log('=========================:',this.props,this.columns)     
      return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} >
          {this.columns.map(col => (
                  <Col md={8} sm={24} key={'mainform'+col.dataIndex}>
                    <FormItem label={col.title}>
                      {getFieldDecorator(col.dataIndex)(
                      <Input placeholder={col.title}/>
                      )}
                    </FormItem>
                  </Col>
                ))}   
          </Row>
      </Form>
    );
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

  myTable  = (loading,data) => (
      <StandardTable
        selectedRows={1}
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
    console.log("DATA",data)

    if (data.entity !== 'tags') return <span/>
 
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">Delete</Menu.Item>
        <Menu.Item key="approval">Approve</Menu.Item>
      </Menu>
    );

     return (
      <PageHeaderWrapper title='Tag Search'>
        <Card bordered={true}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderMainForm()}</div>
            {( data.list[0] === undefined ? '' : window.innerWidth < 1000 ? this.myList(data.list) :this.myTable(loading,data))}
          </div>
        </Card>
         
      </PageHeaderWrapper>
    )
  }
}

export default TagView;
