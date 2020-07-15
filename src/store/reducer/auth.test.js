import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
    it('initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            error: null,
            token: null,
            userId: null,
            authPath: '/'
        })
    })

    it('AUTH TOKEN is verifird', () => {
        expect(reducer({
            loading: false,
            error: null,
            token: null,
            userId: null,
            authPath: '/'
        },{
           type:actionTypes.AUTH_SUCCESS,
           token:"some token",
           userId:"some user id"
        })).toEqual({
            loading: false,
            error: null,
            token: "some token",
            userId: "some user id",
            authPath: '/'
        })
    })
})