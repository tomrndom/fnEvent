import axios from 'axios';

import { authErrorHandler } from "openstack-uicore-foundation/lib/methods";
import {
    getRequest,
    createAction,
    stopLoading,
    startLoading,
    showMessage,
    showSuccessMessage,
} from 'openstack-uicore-foundation/lib/methods';

export const GET_SUMMIT_DATA = 'GET_SUMMIT_DATA';

// export function getSummitData() {

//   let url = `${window.SUMMIT_API_BASE_URL}/api/public/v1/summits/${window.SUMMIT_ID}?expand=event_types%2C+tracks%2C+track_groups%2C+presentation_levels%2C+locations.rooms%2C+locations.floors`

//   return function (dispatch) {
//     axios.get(url)
//       .then((response) => dispatch({
//         type: GET_SUMMIT_DATA,
//         payload: response.data
//       })).catch((response) => dispatch({
//         type: GET_SUMMIT_DATA,
//         payload: response.error
//       }))
//   }
// }

export const getSummitData = () => (dispatch, getState) => {

  console.log('parapaaa');

  dispatch(startLoading());

  return getRequest(
    dispatch(startLoading()),
    createAction(GET_SUMMIT_DATA),
    `${window.SUMMIT_API_BASE_URL}/api/public/v1/summits/${window.SUMMIT_ID}?expand=event_types%2C+tracks%2C+track_groups%2C+presentation_levels%2C+locations.rooms%2C+locations.floors`,
    authErrorHandler
  )({})(dispatch).then(() => {
    dispatch(stopLoading());
  }
  ).catch(e => {
    dispatch(stopLoading());
    return (e);
  });
}