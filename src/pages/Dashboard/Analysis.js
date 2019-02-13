import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
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
import Yuan from '@/utils/Yuan';
import { getTimeDistance } from '@/utils/utils';

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

  componentDidMount() {
    const { dispatch } = this.props;
    
    const params = {
      fromdate : this.state.rangePickerValue[0].format('YYYY-MM-DD'),
      todate: this.state.rangePickerValue[1].format('YYYY-MM-DD'),
      interval: 'day'}
    this.reqRef = requestAnimationFrame(() => {
      dispatch({
        type: 'dash/fetchProdData',
        payload: {...params},        
      });
      this.timeoutId = setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 600);
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
    if(!rangePickerValue.length) return
    const { dispatch } = this.props;
    this.setState({
      rangePickerValue,
    });
    var fdt = rangePickerValue[0].format('YYYY-MM-DD'),
        tdt = rangePickerValue[1].format('YYYY-MM-DD')     
    const params = {
      fromdate : fdt,
      todate: tdt,
      interval: 'day'}

      dispatch({
        type: 'dash/fetchProdData',
        payload: {...params},        
      });

  };

  selectDate = type => {
    const { dispatch } = this.props;
    let rangePickerValue = this.state.rangePickerValue
    console.log("rangePickerValue 1:", rangePickerValue,type)

    if (type === 'hour') rangePickerValue[1] = rangePickerValue[0].endOf('days')
    if (type === 'month' ||  type === 'year')  {
      rangePickerValue[0] = rangePickerValue[0].startOf(type)
      //rangePickerValue[1] = rangePickerValue[1].endOf(type)
    }

    if (type === 'week') {
      rangePickerValue = getTimeDistance('week')
      type = 'day'
    }

    console.log("rangePickerValue 2:", rangePickerValue,type)

    this.setState({
      rangePickerValue,
    });
    let fdt = rangePickerValue[0].format('YYYY-MM-DD'),
        tdt = rangePickerValue[1].format('YYYY-MM-DD')
    const params = {
      fromdate : fdt,
      todate: tdt,
      interval: type}     

      dispatch({
        type: 'dash/fetchProdData',
        payload: {...params},        
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
        <RangePicker
          value={rangePickerValue}
          onChange={this.handleRangePickerChange}
          style={{  }}
        />
      </div>
    );

    const WOStats = (serial_stats) => (
        <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '8px 8px 8px 8px' }}
          style={{ marginTop: 32 }}
        >
        <Row key='WoRow' gutter={24}>
          {serial_stats.map(wo => (
          <Col key={'WoCol'+wo.name} {...serialStatsProps}>
            <ChartCard
              loading={loading}
              bordered={true}
          style={{ margin: 8 }}              
              title='Work Order Stats'
              action={
                <Tooltip   title={<FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" /> } >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={`${wo.name} : ${parseInt(wo.avg * 100)}%`}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>

                    <FormattedMessage id="app.analysis.wofepPercent" defaultMessage="Finished End Products" />
                    <span className={styles.trendText}>{parseInt(wo.min*100)}%</span>

                </div>
              }
              contentHeight={46}
            >
              <MiniProgress percent={wo ? wo.avg*100 : 0 } strokeWidth={16} target={100} color="#4372A2" />
            </ChartCard>
          </Col>
          ))}
        </Row> 
      </Card>       
    );    


    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle={
              <FormattedMessage
                id="app.analysis.conversion-rate"
                defaultMessage="Conversion Rate"
              />
            }
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={currentKey !== data.name && 'light'}
          />
        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={currentKey !== data.name && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

    const serialStatsProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 2 },
    };    

    return (
      <GridContent>
        <Row gutter={24}>
          <Col {...topColResponsiveProps}>
            <ChartCard
              loading={loading}
              bordered={false}
              title={
                <FormattedMessage
                  id="app.analysis.wocp"
                  defaultMessage="Percentage Of Work Done"
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
              total={wo_percent_total && parseInt(wo_percent_total.avg * 100)  +"%"}
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
              <MiniProgress percent={wo_percent_total ? wo_percent_total.avg*100 : 0 } strokeWidth={16} target={45} color="#13C2C2" />
            </ChartCard>
          </Col>        
          <Col {...topColResponsiveProps}>
            <ChartCard
              bordered={false}
              loading={loading}
              title={<FormattedMessage id="app.analysis.totalplacements" defaultMessage="Total Placements" />}
              action={
                <Tooltip
                  title={
                    <FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />
                  }
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              total={numeral(work_report_placements.reduce((o,x) => o+x.y , 0)).format('0,0')}
              footer={
                <Field
                  label={
                    <FormattedMessage id="app.analysis.products" defaultMessage="Products" />
                  }
                  value={numeral(work_report_placements.reduce((o,x) => o+x.y , 0)).format('0,0')}
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
              total={numeral(work_report_products.reduce((o,x) => o+x.y , 0)).format('0,0')}
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
                <FormattedMessage
                  id="app.analysis.wocp"
                  defaultMessage="Percentage Of Work Done"
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
              total={wo_percent_total && parseInt(wo_percent_total.avg * 100)  +"%"}
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
              <MiniProgress percent={wo_percent_total ? wo_percent_total.avg*100 : 0 } strokeWidth={16} target={45} color="#13C2C2" />
            </ChartCard>
          </Col>
        </Row>

        <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
          <div className={styles.salesCard}>
            <Tabs tabBarExtraContent={salesExtra} size="large" tabBarStyle={{ marginBottom: 24 }}>
              <TabPane
                tab={<FormattedMessage id="app.analysis.placements" defaultMessage="Placements" />}
                key="placements"
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
                        data={work_report_placements}
                      />
                    </div>
                  </Col>
                </Row>
              </TabPane>
              <TabPane
                tab={<FormattedMessage id="app.analysis.products" defaultMessage="Products" />}
                key="views"
              >
                <Row>
                  <Col xl={23} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Bar
                        height={292}
                        title={
                          <FormattedMessage id="app.analysis.visits-trend"
                            defaultMessage="Products"
                          />
                        }
                        data={work_report_products}
                      />
                    </div>
                  </Col>
                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>
                        <FormattedMessage
                          id="app.analysis.visits-ranking"
                          defaultMessage="Visits Ranking"
                        />
                      </h4>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Card>

        {WOStats(serial_stats)}

      </GridContent>
    );
  }
}

export default Analysis;
