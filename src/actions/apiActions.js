import * as types from './actionTypes';
import ServiceApi from '../api/ServiceApi';

export const GetData = () => {
  return dispatch => {
    return ServiceApi.getData().then(data => {
      dispatch(loadDataSuccess(data));
    }).catch(error => {
      throw (error);
    });

  }
}


export const loadDataSuccess = (data) => {
  return {type: types.ApiGetData, data};
}