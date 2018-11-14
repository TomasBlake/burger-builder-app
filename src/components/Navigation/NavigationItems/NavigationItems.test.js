import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => { //jest methods
    
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    }); // bude provedena před začátkem všech ostatních funkcí

    it('Should render two <Navigation /> elements, if not autheticated', () => {
        //const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("Should render three <NavigationTime /> elements, if its authenticated", () => {
        //wrapper = shallow(<NavigationItems isAuthenticated='true' />);
        wrapper.setProps({isAuth: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('Should render logout component',() => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    })
})