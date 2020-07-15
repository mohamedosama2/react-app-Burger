import React from 'react'
import {configure,shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter:new Adapter()});

describe('in navigation items',()=>{
    let wrapper;
    beforeEach(()=>{
         wrapper =shallow(<NavigationItems />)
    })

    it('should have 2',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should have 3',()=>{
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should have Logout',()=>{
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true)
    })
})