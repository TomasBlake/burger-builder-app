import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

    /*state = {
        ingredients: null,
        price: 0
    }*/

    /*componentWillMount () {
        let ingredients = {};
        let price = 0;
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({
            ingredients: ingredients,
            price: price
        });
    }*/

    componentDidUpdate () {
        if (this.props.purchased) {
            this.props.history.replace('/');
        }
    }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    checkouContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to='/' />;
        if (this.props.ingredients) {
           summary =  (
            <div>
            <CheckoutSummary 
                ingredients={this.props.ingredients}
                onCheckoutCanceled={this.checkoutCanceledHandler}
                onCheckoutContinued={this.checkouContinuedHandler} />
            <Route 
                path={this.props.match.path + '/contact-data'} 
                //render={(props) => (<ContactData ingredients={this.props.ingredients} price={this.props.price} {...props} />)} 
                component={ContactData}
                />
            </div>);
        }
        
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerState.ingredients,
        purchased: state.orderState.purchased
    }
}

export default connect(mapStateToProps)(Checkout);