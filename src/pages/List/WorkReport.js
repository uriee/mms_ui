import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import 'antd/dist/antd.css';
import router from 'umi/router';
import moment from 'moment';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatMessage, getLocale } from 'umi/locale';
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

const initBatchArray = (size) => {
  if (!size) return null
  const a = new Array(size)
  for (var i = 0; i < a.length; i++) {a[i] = i+1}
  return a
}

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
      batch_size : 0,
      batch_array : [],
      quant : 0 ,
      quantitative : true,
      serialize : true,
      amount : 0,
      serial : '',
      faultSwitch : false,
      location: null,
      type : null,
      fix : null,
      secondary : '',
      mac_address : '',
      kitSwitch : false,
      kit1 : null,
      kit2 : null,
      sonIdentifiers : {},
      kitPartName : '',
      kitAction : null
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
     entry && this.setState({
       balance : entry.balance,
       batch_size : entry.batch_size,
       batch_array :  initBatchArray(entry.batch_size),
       quant : entry.quant,
       serialize: entry.serialize,
       quantitative : entry.quantitative
      })     
     
  };
 
  handleAmountChange = e => {
      const value = e.target.value
      this.setState({ amount: value });
  }

  handleLocationChange = value => {
    this.setState({ location: value });
  }

  handleSonIdentifierChange = (value) => {

    console.log("~~~~~~~~~~~~~~",value)
    const x = value.split('|')
    const partname = x[0]
    const identifier = x[1]
    if (identifier ==='N/A') return 
    const i = x[2]    
    let ret = {...this.state.sonIdentifiers}
    ret[partname] = ret[partname] || [] 
    console.log('11:',x,ret[partname][i],this.state.sonIdentifiers)    
    ret[partname][i] = identifier
    console.log('22:',x,ret[partname][i],this.state.sonIdentifiers)
    this.setState({ sonIdentifiers: ret });
  } 

  handleTypeChange = value => {
      this.setState({ type: value });
  }

  handleFixChange = value => {
    this.setState({ fix: value });
}

  handleAmountClick= e => {
        if (e.key === 'Enter') this.handleAddAmount()       
  }

  handleSerialClick= e => {
     if (e.key === 'Enter') this.handleAddSerial()       
  }

  handleKit2Click= e => {
    if (e.key === 'Enter') this.handleKitSubmition()       
  }

  handleSerialChange = e => {
    const value = e.target.value       
    this.setState({ serial: value })
  }   

  handleMacChange = e => {
    const value = e.target.value       
    this.setState({ mac_address: value })
  }   

  handleSecondaryChange = e => {
    const value = e.target.value       
    this.setState({ secondary: value })
  }   

  handleBatchExcludeChange = value => {   
    this.setState({ batch_array: value })
  }      


  handleFaultSwitchChange = (checked) => {
        this.setState({ faultSwitch: checked ,type: '',fix: '', location: ''})
  }

  handleKitSwitchChange = (checked) => {
      this.setState({ kitSwitch: checked ,kit1: '',kit2: ''})
  } 

  handleKit1Change = value => {
    const lot = this.props.workReport.kit.filter(x=> x.lot === value)[0]
    const pn = lot && lot.partname
    this.setState({ kit1: value ,kitPartName : pn});
  }   

  handleKit2Change = e => {
    const value = e.target.value  
    this.setState({ kit2: value });
  }       
  

    getEntry = path => {
        const entry = path && this.props.workReport.paths && Object.values(this.props.workReport.paths).filter(x=> x.resourcename === path[0] && x.serialname === path[1] && x.actname === path[2])
        return entry && entry[0]
    }

    setBalance = (value) => {
        //this.setState({ balance: this.state.balance - value * (this.state.faultSwitch ? 0 : 1) })
        const { dispatch } = this.props;    
        
        dispatch({
            type: `workReport/fetchWR`,
            payload: {path : this.props.workReport.path},
        }).then(x => {
            this.setState({
              serial : this.state.faultSwitch ? this.state.serial : null ,
              balance: this.state.balance - value * (this.state.faultSwitch ? 0 : 1) ,
              batch_array : initBatchArray(this.state.batch_size),
              amount : 0,
              type: null,
              fix: null,
              location: null ,
              sonIdentifiers : {},
              mac_address : null,
              secondary : null
            }) 
            console.log("popopo1:",x,this.state)                    
        });
    }

    postKitSubmition = () => {
  
      const { dispatch } = this.props;    
      
      dispatch({
          type: `workReport/fetchWR`,
          payload: {path : this.props.workReport.path},
      }).then(x => {
          this.setState({
            kit1 : null,
            kit2: null
          })                  
      });
  }

  
  handleKitSubmition = () => {
    const { kit1,kit2 } = this.state  
    if (!kit1 && kit2) {
      notification.error({ message: `Wrong Lot`, description: 'At least one of the lots is empty.'})
      return
    }   
    if (kit1 === kit2) {
      notification.error({ message: `Wrong Lot`, description: 'This Two Lots are the same.'})
      return
    }        
    const kit2Object = this.props.workReport.kit.filter(x=> x.lot === kit2)[0]
    if (!kit2Object) {
      notification.error({ message: `Wrong Lot`, description: 'This Lot do not belong to the current work order.'})
      return
    }    
    const kit2PartName  = kit2Object && kit2Object.partname

    if (kit2PartName !== this.state.kitPartName) {
      notification.error({ message: `Wrong Lot`, description: 'This Lot has different PN than the former Lot.'})
      return
    } 
    const posibleKit2 = this.props.workReport.kit.filter(x=> x.partname ===this.state.kitPartName && x.lot !== this.state.kit1 )
    const posibleLots = posibleKit2.map(x => x.lot)
    console.log("!~~~~~~",kit1,kit2,kit2Object,kit2PartName,this.state.kitPartName,posibleKit2,posibleLots)
    if (!(posibleLots.includes(kit2))) {
      notification.error({ message: `Wrong Lot`, description: 'This Lot do not belong to the current work order',})
      return
    }
    const { dispatch } = this.props;
    var values = {
      entity : 'lot_swap',
      resourcename: this.props.workReport.path[0] ,
      serialname : this.props.workReport.path[1],
      actname : this.props.workReport.path[2],
      lot_old: kit1,
      lot_new : kit2,
      sig_user : JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username
    }

    dispatch({
    type: 'action/add',    
    payload: values
    }).then(x => {
        this.postKitSubmition()
    });
   /*
   dispatch({
    type: `workReport/lot_swap`,
    payload: {path : this.props.workReport.path},
    }).then(x => {
      this.postKitSubmition() 
    });   
*/
    return 
  };
/* 190100098416 */
  handleAddAmount = () => {
    const batch_amount = batch_amount && this.state.batch_array.length
    const amount = this.state.amount  * (batch_amount || 1 )
    const value = parseInt(this.state.quantitative ? amount : this.state.balance)

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
      fix: this.state.fix,
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
    const batch = this.state.batch_array 

    if (!value ) {
        notification.error({ message: `Wrong S/N`, description: 'You need to input a serial number',})
        return
    }
    if (this.state.balance < 1 * (batch && batch.length || 1 )  ) {
        notification.error({ message: `No Balance`, description: 'All the amount had been already reported',})
        return
    } 
    if (!(/^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/.test(this.state.mac_address)) && this.state.mac_address) {
      notification.error({ message: `Input Error`, description: 'Mac Address format : xx:xx:xx:xx:xx:xx',})
      return
    }
    const sons = this.props.workReport.son_identifiers && this.props.workReport.son_identifiers.every(x=> !!this.state.sonIdentifiers[x.name])

    if ( !this.state.faultSwitch && this.props.workReport.son_identifiers && this.props.workReport.son_identifiers[0] && !sons) {
      notification.error({ message: `Missing data`, description: 'All Son Identifiers must be specified',})
      return      
    }

    const { dispatch } = this.props;
    var values = {
        resourcename: this.props.workReport.path[0] ,
        serialname : this.props.workReport.path[1],
        actname : this.props.workReport.path[2],
        quant: 1  * (batch && batch.length || 1 ),
        identifier : this.state.serial,
        batch_array : this.state.batch_array,
        mac_address : this.state.mac_address|| '',
        secondary : this.state.secondary || '',
        location : this.state.location,
        type_name : this.state.type,
        fix: this.state.fix,
        description : 'Automatic',
        son_identifiers : this.state.sonIdentifiers
    }

    values.entity = this.state.faultSwitch ? 'fault' : 'work_report'
    values.parent_schema = this.state.faultSwitch ? 'fault' : 'work_report' 
    values.sig_date = moment().format();
    values.sig_user = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username;
    
    dispatch({
    type: 'action/add',
    payload: values
    }).then(res => {
        this.setBalance( this.state.batch_array && this.state.batch_array.length || 1 )
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
   { title : formatMessage({ id: `pages.report_type` }), dataIndex : "", key :"sig-date" ,       render(text, record) {
      const color = record.row_type === 'fault' ? '#fff1f0' : ''
      const text1 = record.row_type === 'fault' ? formatMessage({ id: `pages.fault` }) : formatMessage({ id: `pages.work_report` })
        return {
          props: {
            style: { background: color },
          },
          children: <div>{text1}</div>,
        };
      }
    },
    { title :  formatMessage({ id: `pages.identifier` }), dataIndex : "serial" },    
   { title :  formatMessage({ id: `pages.open_date` }), dataIndex : "sig_date"},
   {title :  formatMessage({ id: `pages.username` }), dataIndex : "username" },
   { title :  formatMessage({ id: `pages.quant` }), dataIndex : "quant" },
   { title :  formatMessage({ id: `pages.resource_name` }), dataIndex : "resourcename" },
   { title :  formatMessage({ id: `pages.action_name` }), dataIndex : "actname" },    
   { title :  formatMessage({ id: `pages.fault_type` }), dataIndex : "type" },  
   { title :  formatMessage({ id: `pages.fix` }), dataIndex : "fix" },     
   { title :  formatMessage({ id: `pages.location` }), dataIndex : "location" },      
   { title :  formatMessage({ id: `pages.sent` }), dataIndex : "sent" },    
 ]   
 
  const son_identifiers =  this.props.workReport.son_identifiers && this.props.workReport.son_identifiers.map(x => new Array(x.coef).fill(x)
    .map((son,i) =>  (
                          <Row style={{margin : 8}}>

                              <Select
                                showSearch
                                onChange={this.handleSonIdentifierChange}
                                style={{ width: '100%' ,marginLeft : 8}}
                                placeholder={son.name}
                                optionFilterProp="children"
                                value = {this.state.sonIdentifiers[x.name] ? this.state.sonIdentifiers[son.name][i] : undefined}
                                filterOption={(input, option) =>
                                  option.props.children.toLowerCase().indexOf(input.toUpperCase()) >= 0
                                }
                              >
                                { son.identifiers.map(option => (
                                      <Option key={son.name +'|'+option} value={son.name +'|'+option +'|' +i}>
                                        {option}
                                      </Option>
                                    ))}
                              </Select>
                          </Row>  
                        )
                      )
  )

  const batch_exclude =  this.state.batch_array && this.state.batch_array.length > 0  && 
    (
      <Row style={{margin : 8}}>

          <Select
            showSearch
            mode="multiple"
            onChange={this.handleBatchExcludeChange}
            style={{ width: '100%' ,marginLeft : 8}}
            placeholder='Exclude From Batch'
            optionFilterProp="children"
            value = {this.state.batch_array ? this.state.batch_array : undefined}
          >
            { initBatchArray(this.state.batch_size).map(option => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
          </Select>
      </Row>  
    )

    return (
      <PageHeaderWrapper title={formatMessage({ id: `pages.work_report` })}>
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
                <Col span={8}>
                    {this.state.batch_size > 0  &&  <span style={{float : 'right'}}>  {formatMessage({ id: `pages.batch_size` })} : {this.state.batch_size}</span> }    
                </Col>                
                <Col span={4}>
                    {this.state.balance > 0  &&  <span style={{float : 'right'}}>{formatMessage({ id: `pages.balance` })} : {this.state.balance}</span> }    
                </Col>  
            </Row>
                        
            {this.state.balance > 0  && <Progress percent={parseInt((this.state.quant-this.state.balance)/this.state.quant*100)} />}
            {this.state.balance > 0  && <span >
                    <Row style={{margin : 24}}> 
                        <Switch color='red' onChange={this.handleFaultSwitchChange} checked={this.state.faultSwitch} checkedChildren={formatMessage({ id: `pages.fault_report` })} unCheckedChildren={formatMessage({ id: `pages.work_report` })} />
                        {!this.state.faultSwitch && <Switch style={{float : 'right'}} color='green' onChange={this.handleKitSwitchChange} checked={this.state.kitSwitch} checkedChildren={formatMessage({ id: `pages.kit_usage` })} unCheckedChildren={formatMessage({ id: `pages.work_orders` })} /> }                        
                    </Row>
             {!this.state.kitSwitch && <span>
                    <Row style={{marginTop : 24}}> 
                    {!this.state.serialize && <span>
                        <Col span={6} style={{margin : 8}}>  <Input placeholder="Amount" value={this.state.quantitative ?  this.state.amount || null : this.state.balance } onKeyDown={this.handleAmountClick} onChange={this.handleAmountChange} disabled={!this.state.quantitative }></Input> </Col> 
                        <Col span={2} style={{margin : 8}}>  
                    {!this.state.faultSwitch && <Button type="primary" style={{marginRight : 8}} onClick={ this.handleAddAmount}>+</Button> }

                        </Col>
                    </span>}


                    {this.state.serialize && <span>
                    <Col span={6} style={{margin : 8}}>
                      <Input placeholder={formatMessage({ id: `pages.identifier` })}  value={this.state.serial || null} onKeyDown={this.handleSerialClick} onChange={this.handleSerialChange}></Input>
                    </Col> 
                    <Col span={2} style={{margin : 8}}>  
                    {!this.state.faultSwitch && <Button type="primary" style={{marginRight : 8}} onClick={this.handleAddSerial}>+</Button> }
                    </Col>
                    <Col span={6} style={{margin : 8}}>
                    {!this.state.faultSwitch && <Input placeholder={formatMessage({ id: `pages.mac_address` })}  value={this.state.mac_address || null}  onChange={this.handleMacChange}></Input>}
                    </Col> 
                    <Col span={6} style={{margin : 8}}>
                    {!this.state.faultSwitch &&<Input placeholder={formatMessage({ id: `pages.secondary` })}  value={this.state.secondary || null}  onChange={this.handleSecondaryChange}></Input>}
                    </Col>                                         
                    </span>}

                    {son_identifiers && !this.state.faultSwitch && <span>
                    <Col span={12} >
                        {son_identifiers}
                    </Col>   
                    </span>}                                                         
                </Row> 
                {batch_exclude && !this.state.faultSwitch && <span>
                   <Row>       
                      <Col span={20} >
                          {batch_exclude}
                      </Col>   
                   </Row>
                    </span>} 
              </span>}
                {this.state.kitSwitch && <Row>
                  <Col span={10}  style={{marginLeft : 8}}>
                        <Select
                          showSearch
                          onChange={this.handleKit1Change}
                          value={this.state.kit1 || undefined}
                          style={{ width: '90%' }}
                          placeholder={formatMessage({ id: `pages.kit1` })}
                        
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.props.workReport.kit &&
                            this.props.workReport.kit.map(option => (
                                <Option key={option.lot} value={option.lot}>
                                  {option.lot} :  {option.partname}
                                </Option>
                              ))}
                        </Select>   
                      </Col>  
                      <Col span={6}  style={{marginLeft : 8}}>
                        <Input 
                          placeholder={formatMessage({ id: `pages.kit2` })}
                          value={this.state.kit2 || null}
                          onKeyDown={this.handleKit2Click}
                          onChange={this.handleKit2Change}>
                        </Input>
                      </Col> 
                      <Col span={4}  style={{marginLeft : 8}}>
                        <Button type="primary" style={{marginRight : 8}}>+</Button>
                      </Col>                               
                </Row>}
                {this.state.faultSwitch && <Row style={{marginTop : 24}}>
                      <Col span={6}  style={{marginLeft : 8}}>
                        <Select
                          showSearch
                          onChange={this.handleTypeChange}
                           style={{ width: '90%' }}
                          placeholder={formatMessage({ id: `pages.fault_type` })}
                          value = {this.state.type ?this.state.type : undefined}
                          optionFilterProp="children"
                          filterOption={(input, option) => option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                      <Col span={6}  style={{marginLeft : 8}}>
                        <Select
                          showSearch
                          onChange={this.handleFixChange}
                          value={this.state.fix || undefined}
                          style={{ width: '90%' }}
                          placeholder={formatMessage({ id: `pages.fix` })}
                        
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.children[2].toLowerCase().indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {this.props.workReport.fix &&
                            this.props.workReport.fix.map(option => (
                                <Option key={option.name} value={option.name}>
                                  {option.name} :  {option.description}
                                </Option>
                              ))}
                        </Select>   
                      </Col>                      
                      <Col span={6}  style={{marginLeft : 32}}>
                        <Select
                          showSearch
                          onChange={this.handleLocationChange}
                          style={{ width: '90%' }}
                          value={this.state.location || undefined}                          
                          placeholder={formatMessage({ id: `pages.fault_location` })}
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
                      <Col span={4}>
                        <Button type="danger"  onClick={this.state.serialize ? this.handleAddSerial : this.handleAddAmount }>+</Button>
                      </Col>
                  </Row>}
                                   
            </span>
            }
            { this.state.balance > 0  && this.props.workReport && this.props.workReport.wr && <Table rowKeys="Id" dataSource={this.props.workReport.wr} style={{margin : 32}} columns={columns}/> }

        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default  WorkReport ;
