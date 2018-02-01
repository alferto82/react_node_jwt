import React, { Component } from 'react';
import HeaderTemplate from '../template/header';
import FooterTemplate from '../template/footer';
//import logo from '../styles/assets/logo.svg';

class App extends Component {
  render() {
    return (
      <div>
        <HeaderTemplate logo="Bicinetica" />

        <div className="container">
          {this.props.children}
        </div>

        <FooterTemplate />
      </div>
    );
  }
}

export default App;