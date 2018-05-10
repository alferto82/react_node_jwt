import React, { Component } from 'react';
import { connect } from 'react-redux';
import { meFromToken, meFromTokenSuccess, meFromTokenFailure, resetToken } from '../actions/users';
import App from '../components/App';
import { setActiveLanguage } from 'react-localize-redux';

const mapDispatchToProps = (dispatch) => {
  return {
  	 loadUserFromToken: () => {
        let token = sessionStorage.getItem('jwtToken');
        if(!token || token === '') {//if there is no token, dont bother
          return;
        }

      //fetch user from token (if server deems it's valid token)
        dispatch(meFromToken(token))
          .then((response) => {
            if (!response.error) {
              //reset token (possibly new token that was regenerated by the server)
              sessionStorage.setItem('jwtToken', response.payload.data.token);
              dispatch(meFromTokenSuccess(response.payload))
            } else {
              sessionStorage.removeItem('jwtToken');//remove token from storage
              dispatch(meFromTokenFailure(response.payload));
            }
          });
     },
     chooseLanguage: () => {
      let locale = sessionStorage.getItem('locale');
      if(!locale || locale === '') {//if there is no token, dont bother
        locale = 'en';
        sessionStorage.setItem('locale', 'en');
      }
      dispatch(setActiveLanguage(locale));
     },
     resetMe: () =>{
     	sessionStorage.removeItem('jwtToken'); //remove token from storage
     	dispatch(resetToken());
     }
  }
}


export default connect(null, mapDispatchToProps)(App);
