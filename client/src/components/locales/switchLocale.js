import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { loadLocales, changeLocale } from '../../actions/locales';



class SwitchLocale extends Component {
  componentWillMount(){
    this.props.loadLocales();
  }

  render() {
    const { changeLocale } = this.props;

    return (
        <select
        onChange={ e=>
          changeLocale(e.target.value, this.props.locales.locales[e.target.value])
            
          }
      >
        {Object.keys(this.props.locales.locales).map(locale => <option key={locale}>{locale}</option>)}
      </select>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentLocale: state.intl.locale,
    locales: state.locales
  };
}

export default connect(mapStateToProps, { loadLocales, changeLocale })(SwitchLocale);
