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
  Switch

} from 'antd';
const { Column, ColumnGroup } = Table;

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
      amount : 0,
      serial : '',
      mainSwitch : false
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
     entry && this.setState({balance : entry.balance, quant : entry.quant})     
     
  };

  handleAmountChange = e => {
      const value = e.target.value
      this.setState({ amount: value });
   };
   handleAmountClick= e => {
       console.log(e.keyCode)
        if (e.key === 'Enter') this.handleAddAmount()       
   }
   handleSerialClick= e => {
    console.log(e.keyCode)
     if (e.key === 'Enter') this.handleAddSerial()       
   }

   handleSerialChange = e => {
    const value = e.target.value       
    this.setState({ serial: value })
    }   

    handleMainSwitchChange = (checked) => {
        this.setState({ mainSwitch: checked })
    }

    getEntry = path => {
        const entry = path && this.props.workReport.paths && Object.values(this.props.workReport.paths).filter(x=> x.resourcename === path[0] && x.serialname === path[1] && x.actname === path[2])
        return entry && entry[0]
    }

    setBalance = value => {
        this.setState({ balance: this.state.balance - value })
        const { dispatch } = this.props;     
        dispatch({
            type: `workReport/fetchWR`,
            payload: {path : this.props.workReport.path},
        }).then(x => {
            this.setState({serial : null ,amount : 0, mainSwitch : false })
        });
    }

  handleAddAmount = () => {
    const value = parseInt(this.state.amount)

    if (value <= 0 ) {
        notification.error({ message: `Wrong Amount`, description: 'The Amount must be Positive',})
        return
    }
    if (this.state.balance >= value) {
        const { dispatch } = this.props;
        var values = {entity: 'work_report' , resourcename: this.props.workReport.path[0] , serialname : this.props.workReport.path[1], actname : this.props.workReport.path[2] ,quant: value}
        values.sig_date = moment()
        //.tz('Asia/Jerusalem')
        .format();
        values.sig_user =
        JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username;

        dispatch({
        type: 'action/add',
        payload: values
        //callback: this.setBalance(value),
        }).then(res => {
            this.setBalance(value)
          });
    }
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

    const { dispatch } = this.props;
    var values = {entity: 'work_report' , resourcename: this.props.workReport.path[0] , serialname : this.props.workReport.path[1], actname : this.props.workReport.path[2] ,quant: 1 , identifier : this.state.serial}
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
            {this.state.balance > 0  && <span>
                    <Row style={{margin : 16}}> 
                        <Switch color='red' onChange={this.handleMainSwitchChange} checked={this.state.mainSwitch} checkedChildren="Fault Report" unCheckedChildren="Work Report" /> 
                    </Row>
                    <Row style={{marginTop : 24}}> 
                        <Col span={6} style={{margin : 8}}>  <Input placeholder="Amount" value={this.state.amount || null} onKeyDown={this.handleAmountClick} onChange={this.handleAmountChange}></Input> </Col> 
                        <Col span={2} style={{margin : 8}}>  
                        <Button type="primary" style={{marginRight : 8}} onClick={ this.handleAddAmount}>+</Button> 

                        </Col>


                    <Col span={6} style={{margin : 8}}>  <Input placeholder="Serial"  value={this.state.serial || null} onKeyDown={this.handleSerialClick} onChange={this.handleSerialChange}></Input> </Col> 
                    <Col span={2} style={{margin : 8}}>  
                    <Button type="primary" style={{marginRight : 8}} onClick={this.handleAddSerial}>+</Button> 

                    </Col>
                </Row> 
            </span>
            }
            { this.state.balance > 0  && this.props.workReport && this.props.workReport.wr && <Table dataSource={this.props.workReport.wr} style={{margin : 32}}>
                <Column title="Date" dataIndex="sig_date" key="sig-date" />
                <Column title="User Name" dataIndex="username" key="username" />
                <Column title="Quantity" dataIndex="quant" key="quant" />
                <Column title="Resource" dataIndex="resourcename" key="resourcename" />
                <Column title="S/N" dataIndex="serial" key="serial" />
            </Table>
            }

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default  WorkReport ;
