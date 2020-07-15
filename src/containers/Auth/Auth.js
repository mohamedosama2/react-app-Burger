import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spiner from '../../components/UI/Spiner/Spiner'
import {Redirect} from 'react-router-dom'
import {updatedObject,checkValidity} from '../../shared/utility'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignup:true
    }

   

    componentDidMount(){
        if(!this.props.building&&this.props.authPath==='/'){
            this.props.onAuthPath()
        }
    }


    inputChangedHandler(event, elementName) {
        const updated = updatedObject(this.state.controls,{
            [elementName]: updatedObject(this.state.controls[elementName],{
                value:event.target.value,
                valid:checkValidity(event.target.value, this.state.controls[elementName].validation),
                touched: true
            })
        })
        this.setState({ controls: updated })
    }

    onSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup)
    }

    switchSignHandler=()=>{
        this.setState(prevState=>{
            return {isSignup: !prevState.isSignup}
        })
    }


    render() {


        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                inValid={!formElement.config.valid}
                hasValidity={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))
        if(this.props.loading){
            form=<Spiner />
        }
        let errorMessage=null;
        if(this.props.error){
            errorMessage=<p> {this.props.error.message} </p>
        }
        let auth=null;
        if(this.props.isAuthenticated){
            auth=<Redirect to={this.props.authPath} />
        }
        return (
            <div className={classes.Auth}>
                {auth}
                <form onSubmit={this.onSubmitHandler}>
                {errorMessage}
                    {form}
                    <Button btnType="Success"> SUBMIT </Button>
                </form>
                <Button btnType="Danger" clicked={this.switchSignHandler}> Swith to {this.state.isSignup?'Sign in':'Sign up '} </Button>
            </div>
        )
    }
}
const stateToProps=state=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticated:state.auth.token !==null,
        building:state.burger.building,
        authPath:state.auth.authPath
    }
}

const propsToDispatch = dispatch => {
    return {
        onAuth: (email, password,isSignup) => dispatch(actions.auth(email, password,isSignup)),
        onAuthPath:()=>dispatch(actions.setAuthPath('/'))
    }
}

export default connect(stateToProps,propsToDispatch)(Auth);