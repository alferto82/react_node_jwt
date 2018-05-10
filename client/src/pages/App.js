import React from 'react';
import { Component } from 'react';
import AppContainer from '../containers/AppContainer';
import HeaderTemplate from '../components/template/header';
import FooterTemplate from '../components/template/footer';


export default class App extends Component {
  render() {
    return (
    	<AppContainer>
            <HeaderTemplate logo="Bicinetica" />
            <div className="container">
                {this.props.children}
            </div>
            <FooterTemplate />
    	</AppContainer>
    );
  }
}
