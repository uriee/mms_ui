import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { AsyncLoadBizCharts } from '@/components/Charts/AsyncLoadBizCharts';
import { WidthProvider, Responsive } from "react-grid-layout";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import {
  Row,
  Col,
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
import GridContent from '@/components/PageHeaderWrapper/GridContent';
import { getTimeDistance } from '@/utils/utils';
import workOrders from './WOcards.js'

import styles from './Analysis.less';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

@connect(({ dash, loading }) => ({
  dash,
  loading: loading.effects['dash/fetch'],
}))
class Analysis extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    currentTabKey: '',
    rangePickerValue: getTimeDistance('week'),
    loading: true,
  };

  layout = []
  newCouter =  0
  breakpoint = 0
  cols = 0
  

  layoutProps = {
    className: "layout",
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };

  onAddItem = () =>  {
    /*eslint no-console: 0*/
    console.log("adding", "dash" + this.newCounter);
    this.layout.concat({
        i: "dash" + this.newCounter,
        x: (this.layout.length * 2) % (this.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      })
      this.newCounter =  this.newCounter + 1
  }
  

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange = (breakpoint, cols) => {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onRemoveItem = (i) => {
    console.log("removing", i);
    this.layout = this.layout.filter(cell => cell.i != i)
  }

  createElement = (el) => {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = 'dash' + el.i
    const html = el.html
    return (
      <div key={i} data-grid={el}>
        <span className="text">{i}</span>
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem(i)}
        >
          x
        </span>
      </div>
    );
  }

  onBreakpointChange(breakpoint, cols) {
    this.breakpoint =  breakpoint,
    this.cols =  cols
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
    this.layout =  layout
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
        this.setState({
          loading: false,
        });
      }, 600);
    });
  }

  componentWillUnmount() {
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

  render() {
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


    const ResourceChart = () => (
      <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
      <div className={styles.salesCard}>
        <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
          {work_report_placements_by_parent_resource.map(resource =>(
          <TabPane
          tab={resource.resource}
          key={resource.resource}
        >
          <Row>
            <Col xl={23} lg={12} md={12} sm={24} xs={24}>
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
            </Col>
          </Row>
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

    return (
      <div>
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
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
              contentHeight={46}
            >
              <MiniProgress
                percent={wo_percent_total ? wo_percent_total.avg * 100 : 0}
                strokeWidth={16}
                target={45}
                color="#13C2C2"
              />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
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
              contentHeight={46}
            >
              <MiniArea color="#975FE4" data={work_report_placements} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
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
              contentHeight={46}
            >
              <MiniBar data={work_report_products} />
            </ChartCard>
          </Col>
          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
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
              contentHeight={46}
            >
              <MiniProgress
                percent={wo_percent_total ? wo_percent_total.avg * 100 : 0}
                strokeWidth={16}
                target={45}
                color="#13C2C2"
              />
            </ChartCard>
          </Col>
        </Row>
        {ResourceChart()}
        {workOrders(serial_stats,loading)}
      </GridContent>
      <div>

          {this.layout.map(el => this.createElement(el))}

      </div>
      </div>
    );
  }
}

export default props => (
  <AsyncLoadBizCharts>
    <Analysis {...props} />
  </AsyncLoadBizCharts>
);
