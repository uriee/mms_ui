import React, { PureComponent } from 'react';
import { FormattedMessage, setLocale, getLocale } from 'umi/locale';
import { Menu, Icon, Dropdown } from 'antd';
import classNames from 'classnames';
import styles from './index.less';

export default class SelectLang extends PureComponent {
  changLang = ({ key }) => {
    setLocale(key);
  };

  render() {
    const { className } = this.props;
    const selectedLang = getLocale();
    const langMenu = (
      <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={this.changLang}>
        <Menu.Item key="en-US">
          <FormattedMessage id="lang.english" />
        </Menu.Item>        
        <Menu.Item key="he-IL">
          <FormattedMessage id="lang.hebrew" />
        </Menu.Item>
        <Menu.Item key="de-DE">
          <FormattedMessage id="lang.german" />
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu}>
        <span className={classNames(styles.dropDown, className)}>
          <FormattedMessage id="navBar.lang" /> <Icon type="down" />
        </span>
      </Dropdown>
    );
  }
}
