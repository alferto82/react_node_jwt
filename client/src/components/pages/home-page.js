import React, { Component } from 'react';
import TranslatedComponent from '../commons/TranslatedComponent';

class HomePage extends Component {
  render() {
    const {translate} = this.props; 
    
    return (
      <h1>{ translate('home.msg')}</h1>
    );
  }
}

export default TranslatedComponent(HomePage);
