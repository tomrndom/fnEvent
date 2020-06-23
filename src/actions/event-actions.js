import { authErrorHandler } from "openstack-uicore-foundation/lib/methods";

import {
  getRequest,
  createAction,
  stopLoading,
  startLoading,
  showMessage,
  showSuccessMessage,
} from 'openstack-uicore-foundation/lib/methods';

import { doLogin } from "openstack-uicore-foundation/lib/methods";

// import Swal from 'sweetalert2';

import { LOGOUT_USER } from "openstack-uicore-foundation/lib/actions";

export const GET_EVENT_DATA = 'GET_EVENT_DATA';

export const customErrorHandler = (err, res) => (dispatch, state) => {
  let code = err.status;
  let msg = '';
  dispatch(stopLoading());
  switch (code) {
      // case 403:
      //     let error_message = {
      //         title: 'ERROR',
      //         html: T.translate("errors.user_not_authz"),
      //         type: 'error'
      //     };
      //     dispatch(showMessage( error_message, initLogOut ));
      //     break;
      case 401:
          let currentLocation = window.location.pathname;
          let clearing_session_state = window.clearing_session_state || false;
          dispatch({
              type: LOGOUT_USER,
              payload: {}
          });
          if(!clearing_session_state) {
              window.clearing_session_state = true;
              console.log('authErrorHandler 401 - re login');
              doLogin(currentLocation);
          }
          break;
      // case 404:
      //     msg = "";
      //     if (err.response.body && err.response.body.message) msg = err.response.body.message;
      //     else if (err.response.error && err.response.error.message) msg = err.response.error.message;
      //     else msg = err.message;
      //     Swal.fire("Not Found", msg, "warning");
      //     break;
      // case 412:
      //     for (var [key, value] of Object.entries(err.response.body.errors)) {
      //         if (isNaN(key)) {
      //             msg += key + ': ';
      //         }
      //         msg += value + '<br>';
      //     }
      //     Swal.fire("Validation error", msg, "warning");
      //     dispatch({
      //         type: VALIDATE,
      //         payload: {errors: err.response.body.errors}
      //     });
      //     break;
      default:
          // Swal.fire("ERROR", T.translate("errors.server_error"), "error");
  }
}

export const handleResetReducers = () => (dispatch, getState) => {
  dispatch(createAction(LOGOUT_USER)({}));
}

export const getEventBySlug = (slug) => (dispatch, getState) => {

  dispatch(startLoading());

  return getRequest(
    dispatch(startLoading()),
    createAction(GET_EVENT_DATA),
    `${window.SUMMIT_API_BASE_URL}/api/public/v1/summits/${window.SUMMIT_ID}/events/${slug}/published?expand=rsvp_template%2C+type%2C+track%2C+location%2C+location.venue%2C+location.floor%2C+speakers%2C+moderator%2C+sponsors%2C+groups%2C+feedback%2C+summit`,
    customErrorHandler
  )({})(dispatch).then(() => {
    dispatch(stopLoading());
  }
  ).catch(e => {
    dispatch(stopLoading());
    return (e);
  });
}