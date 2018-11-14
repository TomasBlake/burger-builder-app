import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
//import axios from '../../Axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import axios from '../../Axios-orders';
import * as actionCreators from '../../store/actions/index';

/*const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4, 
    meat: 1.3,
    bacon: 0.7
}*/

export class BurgerBuilder extends Component{
    
    state= {
      //  ingredients: null,
      //  totalPrice: 4,
      //  purchasable: false,
        purchasing: false,
      // loading: false,
      // error: null
    }

    componentDidMount () {
            this.props.onInitIngredients()        
    }
        /*axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
        }).catch(error => {
            this.setState({error: true});
        });
    }*/

    updatePurchasableState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);
        return sum > 0;
    }

    /*addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredience = {
            ...this.state.ingredients
        };
        updatedIngredience[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type]
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice + priceAddition;
        this.setState({ingredients: updatedIngredience, totalPrice: newTotalPrice});
        this.updatePurchasableState(updatedIngredience);
    }

    removeIngrdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredience = {
            ...this.state.ingredients
        };
        updatedIngredience[type] = updatedCount;
        const priceDetract = INGREDIENT_PRICES[type];
        const oldTotalPrice = this.state.totalPrice;
        const newTotalPrice = oldTotalPrice - priceDetract;
        this.setState({ingredients: updatedIngredience, totalPrice: newTotalPrice});
        this.updatePurchasableState(updatedIngredience);
    }*/

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});    
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
            /*const queryParams = [];
            for (let i in this.props.ingredients){
                queryParams.push(encodeURIComponent(i) + '=' + this.props.ingredients[i]);
            }
            queryParams.push('price=' + this.props.totalPrice);
            const queryString = queryParams.join('&');*/
            this.props.onInitPurchase();
            this.props.history.push({
                pathname: '/checkout',
               // search: '?' + queryString
            });
    }

    render(){
        const disableInfo = {
            ...this.props.ingredients
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
            // {salad: true, Cheese: false, meat: false}
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = ( 
                     <Aux>
                     <Burger ingredients={this.props.ingredients} />
                     <BuildControls 
                        ingredientAdded = {this.props.onAddIngredient}
                        ingredientDetracted = {this.props.onRemoveIngredient}
                        disabled={disableInfo}
                        price = {this.props.totalPrice}
                        purchasable={this.updatePurchasableState(this.props.ingredients)} 
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}/>
                        </Aux> );
            orderSummary = <OrderSummary 
                        ingredients={this.props.ingredients} 
                        price={this.props.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        orderSending={this.state.isSending}
                        />     
        }
        
        /*if (this.state.loading) {
            orderSummary = <Spinner />;
        }*/
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerState.ingredients,
        totalPrice: state.burgerState.totalPrice,
        error: state.burgerState.error,
        isAuthenticated: state.authState.idToken !== null,
        redirectPath: state.authState.authRedirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (typeOfIng) => dispatch(actionCreators.addingredient(typeOfIng)),
        onRemoveIngredient: (typeOfIng) => dispatch(actionCreators.removeingredient(typeOfIng)),
        onInitIngredients: () => dispatch(actionCreators.initIngredients()),
        onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actionCreators.setAuthRedirectPath(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));