import React, { Component } from 'react';
import TranslatedComponent from '../commons/TranslatedComponent';
import classNames from 'classnames';

class Feature extends Component {
  render() {
    return (
      <section>
        <span className={classNames('icon major', this.props.className)}></span>
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
      </section>
    );
  }
}

export default TranslatedComponent(Feature);
