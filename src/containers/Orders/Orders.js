import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../Axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Orders extends Component {

    /*state = {
        //orders: [],
        //loading: true
}*/

componentDidMount () {
this.props.onFecthOrders(this.props.token, this.props.userId);
    /*axios.get('/orders.json')
    .then(response => {
    let orders = [];
    for (let key in response.data) {
        orders.push({
            ...response.data[key],
            id: key
    });
    }
    this.setState({
        orders: orders,
        loading: false
    })
    })
    .catch(error => {
        this.setState({loading: false})
    });*/
}

    render () {

        let orders = <Spinner />;
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return (
                    <Order 
                        ingredients={order.ingredients} 
                        price={Number.parseFloat(order.price).toFixed(2)}
                        key={order.id} />
                    ); 
            })    
        }
        
    return (
        <div>
            {orders}
        </div>
    );
}
}

const mapStateToProps = state => {
    return {
        orders: state.orderState.orders,
        loading: state.orderState.loading,
        token: state.authState.idToken,
        userId: state.authState.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFecthOrders: (token) => dispatch(actionCreators.fetchOrders(token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));