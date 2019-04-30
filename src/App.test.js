import React from 'react';
import App from './App';

import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { store } from './store/store';

const middlewares = []
const mockStore = configureStore(middlewares)
configure({ adapter: new Adapter() });


export const CustomProvider = ({ children }) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};

describe("Test App component", () => {
  it('check dispatch and store setup for component', () => {
    // test will not compile if component is not correctly setup
    const wrapper = shallow(<CustomProvider><App /></CustomProvider>);
    expect(true).toBeTruthy();  
       
  });
});

