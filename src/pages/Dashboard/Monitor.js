import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import { WidthProvider, Responsive } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  Icon,
  Card,
  Tabs,
  Table,
  Radio,
  DatePicker,
  Tooltip,
  Menu,
  Dropdown,
} from 'antd';
import {
  ChartCard,
  MiniArea,
  Area,
  MiniBar,
  MiniProgress,
  Field,
  Bar,
  Pie,
  TimelineChart,
} from '@/components/Charts';
import Trend from '@/components/Trend';
import NumberInfo from '@/components/NumberInfo';
import numeral from 'numeral';
import { getTimeDistance } from '@/utils/utils';
import workOrders from './WOcards.js'

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const ResponsiveReactGridLayout = WidthProvider(Responsive);


function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

@connect(({ dash, loading }) => ({
  dash,
  loading: loading.effects['dash/fetch'],
}))
class AddRemoveLayout extends Component {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100,
  };

  constructor(props) {
    super(props);

    this.state = {
      currentTabKey: '',
      rangePickerValue: getTimeDistance('week'),
      loading: true,      
    };

    this.layout = {
      items:[],
      newCounter: 0,
    }
    
    this.AddItem = this.AddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const params = {
      fromdate: this.state.rangePickerValue[0].format('YYYY-MM-DD'),
      todate: this.state.rangePickerValue[1].format('YYYY-MM-DD'),
      interval: 'day',
    };
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dash/fetchProdData',
        payload: { ...params },
      });

      this.timeoutId = setTimeout(() => {
        this.additems()
      }, 200);      
    });
  }

  
 
  
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
    cancelAnimationFrame(this.reqRef);
    clearTimeout(this.timeoutId);
  }

  handleChangeSalesType = e => {
    this.setState({
      salesType: e.target.value,
    });
  };

  handleTabChange = key => {
    this.setState({
      currentTabKey: key,
    });
  };

  handleRangePickerChange = rangePickerValue => {
    if (!rangePickerValue.length) return;
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });
    var fdt = rangePickerValue[0].format('YYYY-MM-DD'),
      tdt = rangePickerValue[1].format('YYYY-MM-DD');
    const params = {
      fromdate: fdt,
      todate: tdt,
      interval: 'day',
    };

    dispatch({
      type: 'dash/fetchProdData',
      payload: { ...params },
    });
    this.timeoutId = setTimeout(() => {
      this.additems()
    }, 200);      
  };

  selectDate = type => {
    const { dispatch } = this.props;
    let rangePickerValue = this.state.rangePickerValue;

    if (type === 'hour') rangePickerValue[1] = rangePickerValue[0].endOf('days');
    if (type === 'month' || type === 'year') {
      rangePickerValue[0] = rangePickerValue[0].startOf(type);
      //rangePickerValue[1] = rangePickerValue[1].endOf(type)
    }

    if (type === 'week') {
      rangePickerValue = getTimeDistance('week');
      type = 'day';
    }

    this.setState({
      rangePickerValue,
    });
    let fdt = rangePickerValue[0].format('YYYY-MM-DD'),
      tdt = rangePickerValue[1].format('YYYY-MM-DD');
    const params = {
      fromdate: fdt,
      todate: tdt,
      interval: type,
    };

    dispatch({
      type: 'dash/fetchProdData',
      payload: { ...params },
    });
    this.timeoutId = setTimeout(() => {
      this.additems()
    }, 200);     
  };

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  }

  onLayoutChange(layout, layouts) {
    saveToLS("layouts", layouts);
    console.log("~~~~~~~~~~~~~~~~~~~layout~~~~~~~~~~~~",layouts) 
   }

additems() {
  
  this.layout = {
    items:[],
    newCounter: 0,
  }

  const { rangePickerValue, salesType, loading: propsLoding, currentTabKey } = this.state;
  const { dash, loading: stateLoading } = this.props;
  const {
    work_report_placements,
    work_report_products,
    work_report_placements_by_parent_resource,
    wo_percent_total,
    serial_stats,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
  } = dash;
  const loading = propsLoding || stateLoading;
  let salesPieData;
  if (salesType === 'all') {
    salesPieData = salesTypeData;
  } else {
    salesPieData = salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline;
  }
  const menu = (
    <Menu>
      <Menu.Item>11?1</Menu.Item>
      <Menu.Item>22?2</Menu.Item>
    </Menu>
  );

  const iconGroup = (
    <span className={styles.iconGroup}>
      <Dropdown overlay={menu} placement="bottomRight">
        <Icon type="ellipsis" />
      </Dropdown>
    </span>
  );

  const salesExtra = (
    <div className={styles.salesExtraWrap}>
      <div className={styles.salesExtra}>
        <a className={this.isActive('today')} onClick={() => this.selectDate('hour')}>
          <FormattedMessage id="app.analysis.hour" defaultMessage="Hour" />
        </a>
        <a className={this.isActive('today')} onClick={() => this.selectDate('day')}>
          <FormattedMessage id="app.analysis.day" defaultMessage="Day" />
        </a>
        <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
          <FormattedMessage id="app.analysis.thisweek" defaultMessage="This Week" />
        </a>
        <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
          <FormattedMessage id="app.analysis.month" defaultMessage="Month" />
        </a>
        <a className={this.isActive('year')} onClick={() => this.selectDate('year')}>
          <FormattedMessage id="app.analysis.year" defaultMessage="Year" />
        </a>
      </div>
      <RangePicker value={rangePickerValue} onChange={this.handleRangePickerChange} style={{}} />
    </div>
  );


  const ResourceChart = (loading) => (
    <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <div className={styles.salesCard}>
      <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
        {work_report_placements_by_parent_resource.map(resource =>(
        <TabPane
        tab={resource.resource}
        key={resource.resource}
      >
            <div className={styles.salesBar}>
              <Bar
                height={295}
                title={
                  <FormattedMessage
                    id="app.analysis.placements"
                    defaultMessage="Placements"
                  />
                }
                data={resource.data}
              />
            </div>
      </TabPane>
        ))}
      </Tabs>
    </div>
  </Card>       
  )    
            
  const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

  const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
  };
  const workDone = (wo_percent_total) => (
    <ChartCard
      loading={false }
      bordered={false}
      title={
        <FormattedMessage id="app.analysis.wocp" defaultMessage="Percentage Of Work Done" />
      }
      action={
        <Tooltip
          title={
            <FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />
          }
        >
          <Icon type="info-circle-o" />
        </Tooltip>
      }
      total={wo_percent_total && parseInt(wo_percent_total.avg * 100) + '%'}
      footer={
        <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
          <Trend flag="up" style={{ marginRight: 16 }}>
            <FormattedMessage id="app.analysis.week" defaultMessage="Weekly changes" />
            <span className={styles.trendText}>12%</span>
          </Trend>
          <Trend flag="down">
            <FormattedMessage id="app.analysis.day" defaultMessage="Weekly changes" />
            <span className={styles.trendText}>11%</span>
          </Trend>
        </div>
      }
      contentHeight={75}
    >
      <MiniProgress
        percent={wo_percent_total ? wo_percent_total.avg * 100 : 0}
        strokeWidth={16}
        target={45}
        color="#13C2C2"
      />
    </ChartCard>)

const placements = (work_report_placements) => (
  <ChartCard
    bordered={false}
    loading={false}
    title={
      <FormattedMessage
        id="app.analysis.totalplacements"
        defaultMessage="Total Placements"
      />
    }
    action={
      <Tooltip
        title={
          <FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />
        }
      >
        <Icon type="info-circle-o" />
      </Tooltip>
    }
    total={numeral(work_report_placements.reduce((o, x) => o + x.y, 0)).format('0,0')}
    footer={
      <Field
        label={<FormattedMessage id="app.analysis.products" defaultMessage="Products" />}
        value={numeral(work_report_placements.reduce((o, x) => o + x.y, 0)).format('0,0')}
      />
    }
    contentHeight={75}
  >
    <MiniArea color="#975FE4" data={work_report_placements} />
  </ChartCard>)  
  
  const products = (work_report_products) =>(
    <ChartCard
              bordered={false}
              loading={false}
              title={<FormattedMessage id="app.analysis.products" defaultMessage="Products" />}
              action={
                <Tooltip
                  title={
                    <FormattedMessage id="app.analysis.introduce" defaultMessage="Introduce" />
                  }
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(work_report_products.reduce((o, x) => o + x.y, 0)).format('0,0')}
              footer={
                <Field
                  label={
                    <FormattedMessage
                      id="app.analysis.conversion-rate"
                      defaultMessage="Conversion Rate"
                    />
                  }
                  value="60%"
                />
              }
              contentHeight={75}
            >
              <MiniBar data={work_report_products} />
     </ChartCard>)

  this.AddItem('7',ResourceChart(false),0,0,8,4)  
  //this.AddItem('ee', workOrders(serial_stats,false),12,1+serial_stats.length/2)  
  this.AddItem('',workDone(wo_percent_total),0,1,2,2)
  this.AddItem('',placements(work_report_placements),0,0 ,4,2)  
  this.AddItem('2',products(work_report_products),0,0,4,2)    
  this.AddItem('4',workDone(wo_percent_total),0,0,2,2)

  console.log(this.layout.items,)
  var originalLayouts = getFromLS("layouts").lg || [];
  console.log("------1",this.layout.items,originalLayouts)
  this.layout.items.forEach(x=> {
    const layout = originalLayouts.filter(c => c.i === x.i)[0]
    x.w = layout && layout.w || x.w
    x.h = layout && layout.h || x.h
    x.x = layout && layout.x || x.x
    x.y = layout && layout.y || x.y
  })
  console.log("--------2",this.layout.items,originalLayouts)  
this.setState({
  loading: false,
});
}
  /*--*/

  createElement(el) {
    console.log('~~~~~~~~~~~~~ff~~~~~~~~',el)
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.i;
    return (
      <div key={i} data-grid={el}>
        
          <span className="text">{el.html}</span>
        
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
        </span>
      </div>
    );
  }

  AddItem(_,html,x,y,w,h) {
    console.log("adding", "n" + this.layout,x,y,w,h);
    this.layout = {
      // Add a new item. It must have a unique key!
      items: [...this.layout.items ,{
        html : html || (<p>{"dash" + this.layout.newCounter}</p>),
        i: "dash" + this.layout.newCounter,
        x: x || (this.layout.items.length * 2) % (this.layout.cols || 12),
        y: y || 0, // puts it at the bottom
        w: w || 2,
        h: h || 2
      }],
      // Increment the counter to ensure key is always unique.
      newCounter: this.layout.newCounter + 1 
    }
    console.log(this.layout)
    
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.layout = { ...this.layout, 
      breakpoint: breakpoint,
      cols: cols
    };
  }

 
  onRemoveItem(i) {
    console.log("removing", i);
    this.layout = {...this.layout,  items: this.layout.items.filter(x=>  x.i !=  i ) }
  }

  render() {
    
    return (
      <div>
        <button onClick={this.AddItem}>Add Item</button>
        <ResponsiveReactGridLayout
          onLayoutChange={this.onLayoutChange}
          onBreakpointChange={this.onBreakpointChange}
          {...this.props}
        >
          {this.layout.items.map(el => this.createElement(el))}
        </ResponsiveReactGridLayout>
      </div>
    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <AddRemoveLayout {...props} />
  </AsyncLoadBizCharts>
);
//export default AddRemoveLayout;
