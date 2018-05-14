import React, { Component } from 'react';
import Features from '../home/Features';
import TranslatedComponent from '../commons/TranslatedComponent';

class HomePage extends Component {
  render() {
    const {translate} = this.props; 
    
    return (
      <div>
        <h1>{ translate('home.msg')}</h1>
        <Features/>
      </div>
    );
  }
}

export default TranslatedComponent(HomePage);
