import React from 'react';
import { ChartsExport } from './Charts';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<ChartsExport data={[{ name : ''}]} />);
});
