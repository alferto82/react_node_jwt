import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import TranslatedComponent from '../components/commons/TranslatedComponent';


class Dashboard extends Component {

  renderUserInfo(userInfo){
    const { translate } = this.props;
    if(userInfo){
      return (
          <div>
          <span>{translate('dashboard.lastName')}: {userInfo.username}</span>
            <br/>
            <span>{translate('dashboard.email')}: {userInfo.email}</span>       
            <br/>
          </div>
        );
      }
    }
 

  render() {
    const {asyncValidating, handleSubmit, submitting, userInfo, translate} = this.props;

    return (
      <div>
        {this.renderUserInfo(userInfo)}
        <Link to="/dashboard/inbox">Inbox</Link> | <Link to="/profile/edit">Edit Profile</Link> | <Link to="/billing/settings">Billing</Link>
        <p>{this.props.content}</p>
      </div>
    )
  }
}

export default TranslatedComponent(Dashboard);

