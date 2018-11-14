import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../Axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/index';
import {updateObject, checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
    orderForm : {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your name'
            },
            value:'',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value:'',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'ZIP code'
            },
            value:'',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value:'',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value:'',
            validation: {
                required: true,
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'fastest', displayValue: 'Fastest'},
                    {value: 'cheapest', displayValue: 'Cheapest'},
            ],
                placeholder: 'your name'
            },
            value:'fastest',
            formIsValid: false
        },
    },
    //loading: false,
    //purchasing: true
}

inputChangedHandler = (event, inputIdentifier) => { // inputIdentifier = name, street...
    //..........................Utility way................................................//
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state[inputIdentifier].validation),
        touched: true
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
        [inputIdentifier]: updatedFormElement
    });
    
    
    //.....................................................................................//
    /*const updatedOrderform = {
        ...this.state.orderForm
    };
    const updatedFormElement = {
        ...updatedOrderform[inputIdentifier]
    }
    if (updatedFormElement.hasOwnProperty('touched')) {
        updatedFormElement.touched = true    
    }
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    */
    updatedOrderForm[inputIdentifier] = updatedFormElement;
   
    let isFormValid = true;
   
    for (let inputIdentifier in updatedOrderForm) {
         if (updatedOrderForm[inputIdentifier].hasOwnProperty('valid')) {
        isFormValid = updatedOrderForm[inputIdentifier].valid && isFormValid;
    }
   }
    this.setState({
        orderForm: updatedOrderForm,
        formIsValid: isFormValid
    })
   
    /*const value = event.target.value;
    switch (inputIdentifier) {
        case ('name'):
            this.setState({name:{ value: value}})    
            console.log('[name update]', value);
            break;
        case ('street'):
            this.setState({street:{ value: value}})
            console.log('[street update]', value);    
            break;
        case ('zipCode'):
            this.setState({zipCode:{ value: value}})
            console.log('[zipCode update]', value);    
            break;
        case ('country'):
            this.setState({country:{ value: value}})    
            console.log('[country update]', value);
            break;
        case ('email'):
            this.setState({email:{ value: value}})    
            console.log('[email update]', value);
            break;
        case ('deliveryMethod'):
            this.setState({deliveryMethod:{ value: value}})    
            console.log('[deliveryMethod update]', value);
            break;
    }
    this.setState({value: value});*/
}

orderHandler = (event) => {
    event.preventDefault(); //prevent sending default request which reload the form

    //this.setState({loading: true});
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        orderData: formData,
        userId: this.props.userId
    }  
    this.props.onOrderBurger(order, this.props.token);
    /*axios.post('/orders.json', order)
    .then(response => {
        this.setState({loading: false, purchasing: false});
        this.props.history.push('/');
    })
    .catch(error => {
        this.setState({loading: false, purchasing: false});
    })*/
}

    render () {
        let formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
            //formElementsArray[key] = this.state.orderForm[key]
        } 
        //console.log(formElementsArray);
        /*Object.keys(this.state.orderForm).map(key => {
            return(
                <Input 
                    elementType={this.state.orderForm[key].elementType} 
                    elementConfig={this.state.orderForm[key].elementConfig} 
                    value={this.state.orderForm[key].value} 
                    />
            );
        })*/
        
        let form = (<form onSubmit={this.orderHandler}>
                        {formElementsArray.map(el =>(
                                <Input 
                                    elementType={el.config.elementType} 
                                    elementConfig={el.config.elementConfig} 
                                    value={el.value}
                                    changed={(event) => {this.inputChangedHandler(event, el.id)}}
                                    key={el.id}
                                    shouldValidate={el.config.validation}
                                    invalid={!el.config.valid}
                                    touched={el.config.touched} />
                            
                        ))}           
                        <Button btnType='Success' disable={!this.state.formIsValid}>ORDER</Button>
                        </form>
                    ); 

        if (this.props.loading) {
            form = <Spinner />    
        }
        
        
        return (
            <div className={classes.ContactData}>
                            <h4>Enter your Contact Data</h4>
                            {form}
                        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerState.ingredients,
        price: state.burgerState.totalPrice,
        loading: state.orderState.loading,
        token: state.authState.idToken,
        userId: state.authState.userId
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actionCreators.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));