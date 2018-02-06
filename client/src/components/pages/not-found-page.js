import React, { Component } from 'react';
import TranslatedComponent from '../commons/TranslatedComponent';

class NotFoundPage extends Component {

  render() {
    const {translate} = this.props; 
    
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>{ translate('notFound.message') }</p>
      </div>
    );
  }
}

export default TranslatedComponent(NotFoundPage);
