import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { protectedTest } from '../../actions/auth';
import TranslatedComponent from '../commons/TranslatedComponent';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.props.protectedTest();
  }

  isRole(roleToCheck, toRender) {
    const { userInfo } = this.props;
    const userRole = userInfo.role;

    if (userRole === roleToCheck) {
      return toRender;
    }
    return false;
  }

  adminMenu() {
    return (
      <div className="admin-menu">
        <Link to="/admin">Admin</Link>
      </div>
    );
  }

  ownerMenu() {
    return (
      <div className="trainer-menu">
        Owner menu coming soon.
      </div>
    );
  }

  clientMenu() {
    return (
      <div className="client-menu">
        Client menu coming soon.
      </div>
    );
  }

  render() {
    const {userInfo, translate} = this.props;

    return (
      <div>
        <h1>Dashboard</h1>
        <span>{translate('dashboard.name')}: {userInfo.firstName}</span>
        <br/>
        <span>{translate('dashboard.lastName')}: {userInfo.lastName}</span>
        <br/>
        <span>{translate('dashboard.email')}: {userInfo.email}</span>
        <br/>
        <span>{translate('dashboard.role')}: {userInfo.role}</span>
        <br/>
        <Link to="/dashboard/inbox">Inbox</Link> | <Link to="/profile/edit">Edit Profile</Link> | <Link to="/billing/settings">Billing</Link>
        {this.isRole('Admin', this.adminMenu())}
        {this.isRole('Owner', this.ownerMenu())}
        {this.isRole('Client', this.clientMenu())}
        <p>{this.props.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content };
}

export default connect(mapStateToProps, { protectedTest })(TranslatedComponent(Dashboard));
