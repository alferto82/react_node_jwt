import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TranslatedComponent from '../commons/TranslatedComponent';
import SwitchLocale  from '../locale/switchLocale';
import { logoutUser } from '../../actions/users';

class HeaderTemplate extends Component {


  renderLinks(authenticatedUser) {
    const {translate} = this.props; 

    if (authenticatedUser) {
      return [
        <li key={`${1}header`}>
          <Link to="/">{ translate('header.home')}</Link>
        </li>,
        <li key={`${2}header`}>
          <Link to="dashboard">{ translate('header.dashboard')}</Link>
        </li>,
        <li key={`${3}header`}>
          <a onClick={this.props.logout} href="javascript:void(0)">
          { translate('header.logout')}
          </a>
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
        </li>
      ];
    }
  }

  render() {
    const { authenticatedUser } = this.props;
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
                {this.renderLinks(authenticatedUser)}
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
    authenticatedUser: state.user.status === 'authenticated' ? state.user.user : null,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
     logout: () => {
         sessionStorage.removeItem('jwtToken');
         dispatch(logoutUser());
     }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TranslatedComponent(HeaderTemplate));
