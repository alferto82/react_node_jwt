import React, { Component } from 'react';
import cookie from 'react-cookie';
import { connect } from 'react-redux';
import { loadLocales, changeLocale } from '../../actions/locale'



class SwitchLocale extends Component {
  componentWillMount(){
   // this.props.loadLocales();
  }

  render() {
    const { changeLocale } = this.props;

    return (
        <select
        onChange={ e=>
          changeLocale({locale: e.target.value})
            
          }
      >
      {console.log(this.props)}
      <option key='en'>en</option>
      <option key='es'>es</option>
      </select>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, { loadLocales, changeLocale })(SwitchLocale);