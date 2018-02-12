import React, { Component}  from 'react';
import { connect } from "react-redux";
import { getTranslate, getActiveLanguage, getLanguages } from 'react-localize-redux';

function Decorate(ComponentToDecorate) { 
  class ComponentDecorated extends Component {

    componentDidMount() {
      // fetch data and stuff
    }

    render() {
      return <ComponentToDecorate {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return {
        // your shared props
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        locales: getLanguages(state.locale)
    };
  }

  const mapDispatchToProps = {
    // your shared action call
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentDecorated);
}

export default Decorate;