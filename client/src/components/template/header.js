import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TranslatedComponent from '../commons/TranslatedComponent';
import SwitchLocale  from '../locale/switchLocale';
class HeaderTemplate extends Component {


  renderLinks() {
    const {translate} = this.props; 

    if (this.props.authenticated) {
      return [
        <li key={`${1}header`}>
          <Link to="/">{ translate('header.home')}</Link>
        </li>,
        <li key={`${2}header`}>
          <Link to="dashboard">{ translate('header.dashboard')}</Link>
        </li>,
        <li key={`${3}header`}>
          <Link to="logout">{ translate('header.logout')}</Link>
        </li>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li key={1}>
          <Link to="/">{ translate('header.home')}</Link>
        </li>,
        <li key={2}>
          <Link to="login">{ translate('header.login')}</Link>
        </li>,
        <li key={3}>
          <Link to="register">{ translate('header.register')}</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <div> 
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
                <li>
                  <SwitchLocale />
                </li>
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
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(TranslatedComponent(HeaderTemplate));
