import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionCreators from '../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail adress'
                },
                value:'',
                validation: {
                    required: true,
                    isEmail: false
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
                value:'',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSingUp: true
    } 
    
    inputChangedHandler = (event, controlName) => {
    //.................................Utility way...................................//
    const updatedControls = updateObject(this.state.controls, {
        [controlName]: updateObject(this.state.controls[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
            touched: true
        }) 
    });    
    //...............................................................................//
    /*    const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        }*/
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSingUp: !prevState.isSingUp};
        });
    }

    componentDidMount () {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAutRedirectPatch();     
        } 
    }

    render () {
        let formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }
        
        let errorMessage = null;
            if (this.props.error) {
                errorMessage = (
                <p style={{color: 'red'}}>{this.props.error.message}</p>
                );
            }

        let form =(<div className={classes.Auth}>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                    {formElementsArray.map(el => (
                    <Input
                        key={el.id}
                        elementType={el.config.elementType} 
                        elementConfig={el.config.elementConfig} 
                        value={el.value}
                        changed={(event) => {this.inputChangedHandler(event, el.id)}}
                        key={el.id}
                        shouldValidate={el.config.validation}
                        invalid={!el.config.valid}
                        touched={el.config.touched} 
                    />   
                    ))}
                    <Button btnType='Success'>SUBMIT</Button>         
                    </form>
                    <Button 
                        btnType='Danger'
                        clicked={this.switchAuthModeHandler}>
                        SWITCH TO {this.state.isSingUp ? 'SIGNIN' : 'SIGNUP'}
                    </Button>      
                </div> );    
            if (this.props.loading) {
                form = <Spinner/>
            }
            if (this.props.isAuthenticated) {
                form = <Redirect to={this.props.redirectPath} />
            }
        return form;
    }
}

const mapStateToProps = state => {
    return {
        loading: state.authState.loading,
        error: state.authState.error,
        isAuthenticated: state.authState.idToken !== null,
        buildingBurger: state.burgerState.building,
        redirectPath: state.authState.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionCreators.auth(email, password, isSignUp)),
        onSetAutRedirectPatch: () => dispatch(actionCreators.setAuthRedirectPath('/'))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);