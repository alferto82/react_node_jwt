import React, { Component } from 'react';
import HeaderTemplate from '../components/template/header';
import FooterTemplate from '../components/template/footer';
//import logo from '../styles/assets/logo.svg';

class App extends Component {
  render() {
    const {translate} = this.props; 
    
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
