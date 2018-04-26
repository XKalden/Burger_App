import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


import NavigagtionItems from './Navigationitems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});


describe('<Navigagtion/>', () => {

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigagtionItems />)
    });

    it('should render two <NavigationItem /> element if not', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);

    });


    it('should render three <NavigationItem /> element if Authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);



    });


});