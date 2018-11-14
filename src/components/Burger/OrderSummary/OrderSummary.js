import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';

class OrderSummary extends Component {

    state = {
        ingredients: null
    }
    
    componentDidMount() {
        const ingredients = this.props.ingredients;
        this.setState({ingredients: ingredients});
    }

    render () {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
        if (this.props.ingredients[igKey] > 0) {
            return( <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                    </li> );    
        } else{
            return(null);
            } 
        });

        return (
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
            {ingredientSummary}
            </ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={this.props.purchaseCancelled}>CANCEL</Button>            
            <Button btnType='Success' clicked={this.props.purchaseContinued} >CONTINUE</Button>
            </Aux> 
        );
    }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object      
};
    
export default OrderSummary;