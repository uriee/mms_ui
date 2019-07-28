import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import router from 'umi/router';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, FormattedMessage, getLocale } from 'umi/locale';
import { groupBy, treefy } from '@/utils/utils';

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
  Cascader,
  Icon,
  Button,
  message,
  Divider,
  notification,
  Progress,
  List,
  Table,
  Switch,
  Select,
} from 'antd';
const { Column, ColumnGroup } = Table;
const {Option} = Select
/* eslint react/no-multi-comp:0 */
@connect(({ action, workReport, loading }) => ({
    workReport,
    loading: loading.models.action,
  }))
class WorkReport extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      balance:  0,
      quant : 0 ,
      quantitative : true,
      serialize : true,
      amount : 0,
      serial : '',
      faultSwitch : false,
      location: '',
      type : '',
      sonIdentifiers : {}
    };  
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workReport/fetchPaths',
      payload: {},
    });  
  }  

  handlePick = (path) => {
    const { dispatch } = this.props;
    dispatch({
      type: `workReport/fetchWR`,
      payload: {path},
    });      
     const entry = this.getEntry(path)  
     entry && this.setState({balance : entry.balance, quant : entry.quant, serialize: entry.serialize, quantitative : entry.quantitative})     
     
  };
 
  handleAmountChange = e => {
      const value = e.target.value
      this.setState({ amount: value });
  }

  handleLocationChange = value => {
    this.setState({ location: value });
  }

  handleSonIdentifierChange = (value) => {
    const x = value.split('|')
    const partname = x[0]
    const identifier = x[1]
    let ret = {...this.state.sonIdentifiers}
    ret[partname] = identifier
    this.setState({ sonIdentifiers: ret });
  } 

  handleTypeChange = value => {
      this.setState({ type: value });
  }

  handleAmountClick= e => {
        if (e.key === 'Enter') this.handleAddAmount()       
  }

  handleSerialClick= e => {
     if (e.key === 'Enter') this.handleAddSerial()       
  }

   handleSerialChange = e => {
    const value = e.target.value       
    this.setState({ serial: value })
    }   

    handleFaultSwitchChange = (checked) => {
        this.setState({ faultSwitch: checked ,type: '', location: ''})
    }

    getEntry = path => {
        const entry = path && this.props.workReport.paths && Object.values(this.props.workReport.paths).filter(x=> x.resourcename === path[0] && x.serialname === path[1] && x.actname === path[2])
        return entry && entry[0]
    }

    setBalance = (value) => {
        this.setState({ balance: this.state.balance - value * (this.state.faultSwitch ? 0 : 1) })
        const { dispatch } = this.props;     
        dispatch({
            type: `workReport/fetchWR`,
            payload: {path : this.props.workReport.path},
        }).then(x => {
            this.setState({
              serial : null,
              amount : 0,
              faultSwitch : false,
              type: '',
              location: '' ,
              sonIdentifiers : {}
            })
        });
    }

  handleAddAmount = () => {
    const value = parseInt(this.state.quantitative ? this.state.amount : this.state.balance)

    if (value <= 0 ) {
        notification.error({ message: `Wrong Amount`, description: 'The Amount must be Positive',})
        return
    }
    if (value > this.state.balance ) {
      notification.error({ message: `Wrong Amount`, description: 'insufficient balance',})
      return
    }    

    const { dispatch } = this.props;
    var values = {
      resourcename: this.props.workReport.path[0] ,
      serialname : this.props.workReport.path[1],
      actname : this.props.workReport.path[2],
      quant: value,
      location : this.state.location,
      type_name : this.state.type,
      description : 'Automatic'
    }

    values.entity = this.state.faultSwitch ? 'fault' : 'work_report'
    values.parent_schema = this.state.faultSwitch ? 'fault' : 'work_report'        
    values.sig_date = moment()
    //.tz('Asia/Jerusalem')
    .format();
    values.sig_user =
    JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username;
    dispatch({
    type: 'action/add',
    payload: values
    }).then(res => {
        this.setBalance(value)
    });

    return 
  };

  handleAddSerial = (e) => {
    const value = this.state.serial

    if (!value ) {
        notification.error({ message: `Wrong S/N`, description: 'You need to input a serial number',})
        return
    }
    if (this.state.balance < 1 ) {
        notification.error({ message: `No Balance`, description: 'All the amount had been already reported',})
        return
    } 

    const sons = this.props.workReport.son_identifiers && this.props.workReport.son_identifiers.every(x=> !!this.state.sonIdentifiers[x.name])
    if ( this.props.workReport.son_identifiers && this.props.workReport.son_identifiers[0] && !sons) {
      notification.error({ message: `Missing data`, description: 'All Son Identifiers must be specified',})
      return      
    }

    const { dispatch } = this.props;
    var values = {
        resourcename: this.props.workReport.path[0] ,
        serialname : this.props.workReport.path[1],
        actname : this.props.workReport.path[2],
        quant: 1,
        identifier : this.state.serial,
        location : this.state.location,
        type_name : this.state.type,
        description : 'Automatic',
        son_identifiers : this.state.sonIdentifiers
    }

    values.entity = this.state.faultSwitch ? 'fault' : 'work_report'
    values.parent_schema = this.state.faultSwitch ? 'fault' : 'work_report' 
    values.sig_date = moment()
    //.tz('Asia/Jerusalem')
    .format();
    values.sig_user =
    JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username;
    
    dispatch({
    type: 'action/add',
    payload: values
    }).then(res => {
        this.setBalance(1)
      }) 
  };  

  
  handleSubAmount = () => {
    };  

  handleSubSerial = serial => {
  };

  render() {
    console.log('____render______', this.state,this.props);
    if (this.props.workReport.paths) {
        const options = Object.values(this.props.workReport.paths)
        const cascadeMap = ['resourcename','serialname', 'actname']  
        var cascadeData = options && groupBy(options, cascadeMap[0]);
        var cascadeData2 = options && treefy(options,['resourcename','serialname'] ).children;
        cascadeData = cascadeData && Object.keys(cascadeData).map(x => ({
        value: x,
        label: x,
        children: cascadeData[x].map(x1 => ({
            value: `${x}:${x1[cascadeMap[1]]}`,
            label: x1[cascadeMap[1]],
        })),
        })); this.props.workOrder
    }
 const columns = [
   { title : "Type", dataIndex : "", key :"sig-date" ,       render(text, record) {
      const color = record.row_type === 'fault' ? '#fff1f0' : ''
      const text1 = record.row_type === 'fault' ? 'Fault' : 'Work Report'
        return {
          props: {
            style: { background: color },
          },
          children: <div>{text1}</div>,
        };
      }
    },
    { title : "S/N", dataIndex : "serial" },    
   { title : "Date", dataIndex : "sig_date"},
   {title : "User Name", dataIndex : "username" },
   { title : "Quantity", dataIndex : "quant" },
   { title : "Resource", dataIndex : "resourcename" },
 ]   
 
  const son_identifiers =  this.props.workReport.son_identifiers && this.props.workReport.son_identifiers.map(x =>
    (
      <Row style={{margin : 8}}>

          <Select
            showSearch
            onChange={this.handleSonIdentifierChange}
            style={{ width: '100%' ,marginLeft : 8}}
            placeholder={x.name}
            optionFilterProp="children"
            value = {this.state.sonIdentifiers[x.name] ? this.state.sonIdentifiers[x.name] : undefined}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toUpperCase()) >= 0
            }
          >
            { x.identifiers.map(option => (
                  <Option key={x.name +'|'+option} value={x.name +'|'+option}>
                    {option}
                  </Option>
                ))}
          </Select>
      </Row>  
    )
  )


    return (
      <PageHeaderWrapper title="Work Report">
        <Card bordered={true}>
           
            <Row>
                <Col span={12}>
                    <Cascader
                    style = {{width : '100%'}}
                    key={`cascader}`}
                    size='large'
                    options={cascadeData2}
                    placeholder="Please select"
                    onChange={this.handlePick}            
                />
                </Col>   
                <Col span={12}>
                    {this.state.balance > 0  &&  <span style={{float : 'right'}}>Balance : {this.state.balance}</span> }    
                </Col>  
            </Row>
                        
            {this.state.balance > 0  && <Progress percent={parseInt((this.state.quant-this.state.balance)/this.state.quant*100)} />}
            {this.state.balance > 0  && <span >
                    <Row style={{margin : 16}}> 
                        <Switch color='red' onChange={this.handleFaultSwitchChange} checked={this.state.faultSwitch} checkedChildren="Fault Report" unCheckedChildren="Work Report" /> 
                    </Row>
                    {this.state.faultSwitch && <Row style={{marginTop : 24}}>
                      <Col span={8}  style={{marginLeft : 8}}>
                        <Select
                          showSearch
                          onChange={this.handleTypeChange}
                          style={{ width: '75%' }}
                          placeholder="Fault Type"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.props.workReport.type &&
                            this.props.workReport.type.map(option => (
                                <Option key={option.name} value={option.name}>
                                  {option.name} :  {option.description}
                                </Option>
                              ))}
                        </Select>   
                      </Col>
                      <Col span={8}  style={{marginLeft : 32}}>
                        <Select
                          showSearch
                          onChange={this.handleLocationChange}
                          style={{ width: '75%' }}
                          placeholder="Fault Location"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.props.workReport.loc &&
                            this.props.workReport.loc.map(option => (
                                <Option key={option.location} value={option.location}>
                                  {option.location}
                                </Option>
                              ))}
                        </Select>   
                      </Col>  

                  </Row>}                    
                    <Row style={{marginTop : 24}}> 
                    {!this.state.serialize && <span>
                        <Col span={6} style={{margin : 8}}>  <Input placeholder="Amount" value={this.state.quantitative ?  this.state.amount || null : this.state.balance } onKeyDown={this.handleAmountClick} onChange={this.handleAmountChange} disabled={!this.state.quantitative }></Input> </Col> 
                        <Col span={2} style={{margin : 8}}>  
                        <Button type="primary" style={{marginRight : 8}} onClick={ this.handleAddAmount}>+</Button> 

                        </Col>
                    </span>}


                    {this.state.serialize && <span>
                    <Col span={6} style={{margin : 8}}>
                      <Input placeholder="Serial"  value={this.state.serial || null} onKeyDown={this.handleSerialClick} onChange={this.handleSerialChange}></Input>
                    </Col> 
                    <Col span={2} style={{margin : 8}}>  
                      <Button type="primary" style={{marginRight : 8}} onClick={this.handleAddSerial}>+</Button> 
                    </Col>
                    </span>}

                    {son_identifiers && !this.state.faultSwitch && <span>
                    <Col span={12} >
                        {son_identifiers}
                    </Col>   
                    </span>}                                      
                </Row> 
            </span>
            }
            { this.state.balance > 0  && this.props.workReport && this.props.workReport.wr && <Table rowKeys="Id" dataSource={this.props.workReport.wr} style={{margin : 32}} columns={columns}/> }

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default  WorkReport ;
