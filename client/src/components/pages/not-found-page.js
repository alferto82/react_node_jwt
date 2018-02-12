import React, { Component } from 'react';
import TranslatedComponent from '../commons/TranslatedComponent';

class NotFoundPage extends Component {

  render() {
    const {translate} = this.props; 
    
    return (
      <div>
        <h1>{ translate('notFound.404') }</h1>
        <p>{ translate('notFound.message') }</p>
      </div>
    );
  }
}

export default TranslatedComponent(NotFoundPage);
