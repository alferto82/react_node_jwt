import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import SwitchLocale  from '../components/locale/switchLocale';

class HeaderTemplate extends Component {


  renderLinks() {
    const {translate} = this.props; 

    if (this.props.authenticated) {
      return [
        <li key={`${1}header`}>
          <Link to="/">Home { translate('title')}</Link>
        </li>,
        <li key={`${2}header`}>
          <Link to="dashboard">Dashboard</Link>
        </li>,
        <li key={`${3}header`}>
          <Link to="logout">Logout</Link>
        </li>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li key={1}>
          <Link to="/">Home</Link>
        </li>,
        <li key={2}>
          <Link to="login">Login</Link>
        </li>,
        <li key={3}>
          <Link to="register">Register</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <div>
        <SwitchLocale />
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#nav-collapse">
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <Link className="navbar-brand" to="/">{this.props.logo}</Link>
            </div>

            <div className="collapse navbar-collapse" id="nav-collapse">
              <ul className="nav navbar-nav navbar-right">
                {this.renderLinks()}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  };
}

export default connect(mapStateToProps)(HeaderTemplate);
