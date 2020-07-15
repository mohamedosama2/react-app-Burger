import React from 'react'
import {configure,shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {BurgerBuilder} from './BurgerBuilder'
import BuildConrols from '../../components/Burger/BuildControls/BuildControls'

configure({adapter:new Adapter()});

describe('BurgerBuilder to have 1 ings',()=>{
    let wrappre;
    beforeEach(()=>{
        wrappre=shallow(<BurgerBuilder onInitIngs={()=>{}} />)
    })

    it('buid controls',()=>{
        wrappre.setProps({ings:{salad:0}})
        expect(wrappre.find(BuildConrols)).toHaveLength(1)
    })
})