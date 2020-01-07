import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import Filter from '@/components/Filter';
const lang = {
  'he-IL': { id: 2, align: 'right' },
  'en-US': { id: 1, align: 'left' },
  'de-DE': { id: 3, align: 'left' },
};

import {
  Row,
  Col,
  Card,
  Input,
  Icon,
  Button,
  Dropdown,
  Modal,
  message,
  Divider,
  Table,
  notification,
  Switch,
  Select,
  Checkbox,
} from 'antd';
const { Column, ColumnGroup } = Table;
const {Option} = Select
const { TextArea } = Input;

const groups = [{
  name: 'and',
  caption: 'And',
}, {
  name: 'or',
  caption: 'Or',
}];

/* eslint react/no-multi-comp:0 */

@connect(({ triggers, loading }) => ({
  triggers,
  loading: loading.models.action,
}))
class Triggers extends PureComponent {
  constructor(props) {
    super(props);
    console.log('IN my triggers CONSTRUCTOR', this.props);

    this.state = {
      name: '',
      active : true,
      message_text : '',
      queues : [] ,
      error : false,
      del :false,
      schema : '',
      
      conditions : {
        "groupName": "and",
        "items": []
      } 

    } 

  }

  componentDidMount() {
    console.log('_______________________________________________________')
    const { dispatch } = this.props;
    dispatch({
      type: 'triggers/fetchSchemas',
      payload: {}
    })  
  }  



    handlePick = schema => {
      const { dispatch } = this.props;
      this.state.conditions = {
         "groupName": "and",
         "items": []
         }    
      dispatch({
        type: `triggers/fetchFields`,
        payload: {schema},     
      }).then(x => {
        this.postSubmition()
    });  
      this.setState({
         schema : schema,    
        })     
       
    };    

    handleNameChange = e => {
      const value = e.target.value
      this.setState({ name: value });
    }
    handleMessageTextChange = e => {
      const value = e.target.value
      this.setState({ message_text: value });
    }
    handleMessageCodeChange = e => {
      const value = e.target.value
      this.setState({ massage_code: value });
    }
    handleActiveChange = e => {
      this.setState({ active: !this.state.active});
    }
    handleErrorChange = e => {
      this.setState({ error: !this.state.error});
    }   
    handleDelChange = e => {
      this.setState({ del: !this.state.del});
    }    
    handleQueuesChange = value => {   
      this.setState({ queues: value })
    } 
    handleConditionsChange = value => { 
      console.log("VAL",value)  
      this.setState({ conditions: value })
    }             

    postSubmition = () => {
      this.setState({
        name: '',
        active : true,
        message_text : '',
        queues : [] ,
        error : false,
        del : false,
        conditions : {
          "groupName": "and",
          "items": []
        }
      })
      this.handleAfter()                  
    }

    handleAfter = () => {
      const { dispatch } = this.props;
      dispatch({
        type: `triggers/fetchFields`,
        payload: {schema : this.state.schema},
      });        
    };

  handleUpdate = (trigger) => {
    console.log("################",this.state,trigger)
    this.setState({
      id: trigger.id,
      name: trigger.name,
      active : trigger.active,
      message_text : trigger.message_text,
      queues : trigger.queues ,
      error : trigger.error,
      del : trigger.del,
      conditions : JSON.parse(trigger.conditions)
    }) 
  }

  delete = (trigger) => {
    console.log("################",this.state,trigger)
    const { dispatch } = this.props;
    var values = {
     id : trigger.id
    }
    dispatch({
    type: 'triggers/delete',    
    payload: values,
    callback: this.handleAfter,
    })
  }
  
  handleDelete = trigger => {
    const remove = this.delete;
    Modal.confirm({
      title: 'Warning, You are about to delete a trigger',
      content: trigger.name,
      okText: 'Delete',
      cancelText: 'Keep',
      onOk: () => {
        remove(trigger);
        return;
      },
    });
  };

  handleSubmit = () => {
    const { name, active , message_text, schema, error, del, conditions, queues } = this.state  

    if (name === '') {
      notification.error({ message: `Input Error`, description: 'The name entry is empty.'})
      return
    } 

    if (message_text === '') {
      notification.error({ message: `Input Error`, description: 'The Message Text entry is empty.'})
      return
    }     

    const { dispatch } = this.props;
    var values = {
      name,
      active,
      error,
      del,
      message_text,
      queues,
      conditions,
      table_id : schema,
      sig_user : JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username
    }

    dispatch({
    type: 'triggers/add',    
    payload: values
    }).then(x => {
        this.postSubmition()
    });

    return 
  };
  

  render() {
    console.log('____render______', this.props,this.state);

    const fields= this.props.triggers.fields && this.props.triggers.fields.map(x => ({
          name : `${x.table_name}.${x.column_name}`,
          operators :  (x.data_type === 'boolean' ? this.props.triggers.booleanOperators :
                        x.data_type === 'integer' ? this.props.triggers.integerOperators :
                        x.data_type.startsWith('timestamp')  ? this.props.triggers.integerOperators.map(x=> ({...x, date : true})) :
                        x.data_type === 'ARRAY' ? this.props.triggers.arrayOperators :          
                        this.props.triggers.textOperators),
          defaultValue: null
        })
    ) 
    const fieldsNames = fields && fields.map(x=>x.name)
    const schemas = this.props.triggers.schemas && this.props.triggers.schemas.map(x => x.table_name)/* && JSON.parse(this.props.triggers.schemas)    */
    const {schema} = this.state
    const columns = [
      {
        title: '',
        fixed : 'left',
        width: 40,
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleUpdate(record)}>
              {' '}
              <Icon type="edit" />
            </a>
            <a onClick={() => this.handleDelete(record)}>
              {' '}
              <Icon type="delete" />
            </a>            
          </Fragment>
        ),
      },
      { title :  formatMessage({ id: `pages.trigger_name` }), dataIndex : "name" },    
      { title :  formatMessage({ id: `pages.active` }), dataIndex : "active" },
      { title :  formatMessage({ id: `pages.message_text` }), dataIndex : "message_text"},
      { title :  formatMessage({ id: `pages.queues` }), dataIndex : "queues" },
      { title :  formatMessage({ id: `pages.trigger_error` }), dataIndex : "error" },
      { title :  formatMessage({ id: `pages.trigger_delete` }), dataIndex : "del" },       
    ]     

    return (
      <PageHeaderWrapper title="Edit Triggers">
        <Card bordered={true}>
           
        <Row style={{margin : 8}}>
        <Col span={10} style={{margin : 8}}>
         { schemas &&  <Select
                showSearch
                onChange={this.handlePick}
                style={{ width: '100%' ,marginLeft : 8}}
                placeholder='Event Triggers Entity'
                optionFilterProp="children"
                value = {schema ? schema : undefined}
              >
                { schemas.map(option => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
              </Select>}
              </Col>
                      
        
            <Col span={10} style={{margin : 8}}>
              <Input placeholder={formatMessage({ id: `pages.trigger_name` })}  value={this.state.name || null}  onChange={this.handleNameChange}></Input>
            </Col> 
            </Row>
            <Row style={{margin : 8, marginLeft : 16}}>             
            <Col span={6} style={{margin : 8}}>
              <Checkbox key='active' checked={this.state.active || false} onChange={this.handleActiveChange}>{formatMessage({ id: `pages.active` })}</Checkbox>
            </Col> 
            <Col span={6} style={{margin : 8}}>
              <Checkbox key='error' checked={this.state.error || false} onChange={this.handleErrorChange}>{formatMessage({ id: `pages.trigger_error` })}</Checkbox>
            </Col> 
            <Col span={6} style={{margin : 8}}>
              <Checkbox key='del' checked={this.state.del || false} onChange={this.handleDelChange}>{formatMessage({ id: `pages.trigger_delete` })}</Checkbox>
            </Col>   
            </Row>
            <Row style={{margin : 8, marginLeft : 16}}>         
            <Col span={14} style={{margin : 8}}>
              <TextArea rows={2} placeholder={formatMessage({ id: `pages.trigger_message_text` })}  value={this.state.message_text}  onChange={this.handleMessageTextChange} />
            </Col>  
            <Col span={6} style={{margin : 8}}>

              <Select
                mode="tags"
                placeholder={formatMessage({ id: `pages.queues` })}
                tokenSeparators={[',']}
                style={{ width: '100%' }}
                onChange={this.handleQueuesChange}
                value={this.state.queues}
              >
                {this.state.queues.map(option => (
                  <Option key={option} value={option}>
                    {option }
                  </Option>
                ))}
              </Select>              
            </Col>  
            <Col span={24} style={{marginTop : 8}}> 
            
            {fields &&  <Card title='Trigger Specification'  bordered={false}><Filter   filterValue={this.state.conditions} fields={fields} groups ={groups} onChange={this.handleConditionsChange}/></Card>}
             
            {fields && <Button type="primary" style={{margin : 8}} onClick={this.handleSubmit}>+</Button> }
            </Col>                                                                        
          </Row>

        { this.props.triggers.triggers && this.props.triggers.triggers.length ? <Table    rowKey={(record) =>  record.name} dataSource={this.props.triggers.triggers} style={{margin : 32}} columns={columns}/>:<span/> }

        </Card>
      </PageHeaderWrapper>
    )
  }
}

export default Triggers;
