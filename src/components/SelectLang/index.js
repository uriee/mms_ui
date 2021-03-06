import React, { PureComponent } from 'react';
import { formatMessage, setLocale, getLocale } from 'umi/locale';
import { Menu, Icon } from 'antd';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export default class SelectLang extends PureComponent {
  changeLang = ({ key }) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeUserLang',
      payload: key,
    });
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();
    const locales = ['en-US', 'he-IL', 'de-DE'];
    const languageLabels = {
      'en-US': 'English',
      'he-IL': 'Hebrew',
      'de-DE': 'German',
    };
    const languageIcons = {
      'en-US': '🇬🇧',
      'he-IL': '🇮🇱',
      'de-DE': '🇩🇪',
    };
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={e => this.changeLang(e)}>
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{' '}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <HeaderDropdown overlay={langMenu} placement="bottomRight">
        <span className={classNames(styles.dropDown, className)}>
          <Icon type="global" title={formatMessage({ id: 'navBar.lang' })} />
        </span>
      </HeaderDropdown>
    );
  }
}
