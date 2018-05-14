import React, { Component } from 'react';
import { connect } from 'react-redux';

class FooterTemplate extends Component {

  render() {
    const d = new Date();
    const year = d.getFullYear();

    return (
      <footer>
        <ul className="icons">
          <li>
            <a href="https://twitter.com/kinwatt_es" className="icon fab fa-twitter" target="_blank"/>
          </li>
          <li>
            <a href="https://www.facebook.com/kinwatt.es" target="_blank" className="icon fab fa-facebook-f"/>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/11411462/" target="_blank" className="icon fab fa-linkedin-in"/>
          </li>
          <li>
            <a href="https://www.instagram.com/kinwatt_es/" className="icon fab fa-instagram" target="_blank"/>
          </li>

        </ul>
        <ul className="copyright">
						<li>&copy; Kinwatt. Todos los derechos.</li><li>{year}</li>
					</ul>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(FooterTemplate);
