import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Row,
  Col,
  Icon,
  Tooltip,
} from 'antd';
import {
  ChartCard,
  MiniProgress,
} from '@/components/Charts';

import router from 'umi/router';

import styles from './Analysis.less';

const serialStatsProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 2 },
  };

const WOLink = (wo) =>  () => router.push(`/router/serials?name=${wo}`)

export default (serial_stats,loading) => (
      <Row key="WoRow" gutter={24}>
        {serial_stats.map(wo => (
          <Col key={'WoCol' + wo.name} {...serialStatsProps}>
            <ChartCard
              key={'WoCard' + wo.name}
              loading={loading}
              bordered={true}
              title="Work Order Stats"
              style={{ marginTop: 24 }}
              action={
                <Tooltip
                  title={
                    <FormattedMessage id="app.analysis.introduce" defaultMessage="introduce" />
                  }
                >
                  <Icon type="info-circle-o" />
                </Tooltip>
              }
              //total={`${wo.name} : ${parseInt(wo.avg * 100)}%`}
              total={{text :`${wo.name} : ${parseInt(wo.avg * 100)}%`, link : WOLink(wo.name)}}
              footer={
                <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                  <FormattedMessage
                    id="app.analysis.wofepPercent"
                    defaultMessage="Finished End Products"
                  />
                  <span className={styles.trendText}>{parseInt(wo.min * 100)}%</span>
                </div>
              }
              contentHeight={46}
            >
              <MiniProgress
                percent={wo ? wo.avg * 100 : 0}
                strokeWidth={16}
                target={100}
                color="#4372A2"
              />
            </ChartCard>
          </Col>
        ))}
      </Row>
    );



