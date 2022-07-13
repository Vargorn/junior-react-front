import React, { Component } from 'react';
import Cart from '../components/Cart';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import './CartPage.css';

const query = gql`
{
    categories{
        products{
            id
            name
            gallery
            prices{
                currency{
                    symbol
                    label
                }
                amount
            }
            attributes{
                name
   			    items{
                    value
                }
            }
        }
    }
}
`

class CartPage extends Component {

    render() {
        return (
            <div >
                <h1 className='name'>Cart</h1>
                <Cart data={this.props.data} />
            </div>
        );
    }
}

export default graphql(query)(CartPage);