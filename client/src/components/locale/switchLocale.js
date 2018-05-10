import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadLocales, changeLocale } from '../../actions/locale'
import TranslatedComponent from '../commons/TranslatedComponent';

class SwitchLocale extends Component {
  componentWillMount(){
   this.state = {currentLocale: Object.values(this.props.locales).filter(locale => locale.active === true).code}
  }

  render() {
    const { changeLocale } = this.props;

    return (
      
        <select className="selectpicker" value={this.props.currentLanguage} data-width="fit"
        onChange={ e=>
          changeLocale({locale: e.target.value})
          }
      >
      {Object.values(this.props.locales).map(locale => <option key={locale.code}>{locale.code}</option>) }
      </select>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { loadLocales, changeLocale })(TranslatedComponent(SwitchLocale));