import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import expect from 'expect';
import * as types from './actionTypes';
import {GetData} from './apiActions';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('GetData actions', () => {

  beforeEach(function () {
    moxios.install();
  });

  afterEach(function () {
    moxios.uninstall();
  });

  it('creates ApiGetData after successfuly fetching data', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [{}],
      });
    });

    const expectedActions = [
      { type: types.ApiGetData, data : [{}] },      
    ];

    const store = mockStore({ posts: {} })

    return store.dispatch(GetData()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

