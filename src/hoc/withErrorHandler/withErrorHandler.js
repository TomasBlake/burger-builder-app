import React, {Component} from 'react';
import Aux from '../Auxiliary';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return  class extends Component {
        state = {
            error: null
        }
        
        componentWillMount () {
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            }, error => {
                this.setState({error: error});
            })
            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }
        
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (<Aux>
                        <Modal 
                            show={this.state.error} 
                            modelClosed={this.errorConfirmedHandler}>
                            <p>{this.state.error ? this.state.error.message : null}</p>
                        </Modal>
                        <WrappedComponent {...this.props} />
                    </Aux> );
        }
        
    }
}

export default withErrorHandler;