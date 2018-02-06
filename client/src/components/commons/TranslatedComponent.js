import React, { Component}  from 'react';
import { connect } from "react-redux";
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

function Decorate(ComponentToDecorate) { 
  class ComponentDecorated extends Component {
    constructor(props) {
      super(props);
    }

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
        currentLanguage: getActiveLanguage(state.locale).code
    };
  }

  const mapDispatchToProps = {
    // your shared action call
  };

  return connect(mapStateToProps, mapDispatchToProps)(ComponentDecorated);
}

export default Decorate;