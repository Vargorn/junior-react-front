import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import './Category.css';
import circleIcon from '../assets/icons/Circle_Icon.png';

class Category extends Component {
    static contextType = Context;

    addToCart = (product) => {
        this.context.addItemToCart(product, []);
    }

    displayCircleIcon = (product) => {
        if (product.attributes.length === 0 && product.inStock) {
            return (
                <Link to='/cart'>
                    <button className='btn_circleIcon' onClick={() => this.addToCart(product)}>
                        <img  src={circleIcon} alt="" />
                    </button>
                </Link>
            )
        }
    }

    displayCategory = () => {
        let data = this.props.data;
        let currencyIndex = this.context.state.currencyId;
        if (data.loading) {
            return <div>Loading...</div>
        }
        else {
            return (
                <div>
                    <h1 style={{ margin: '3rem 0', fontSize: '3rem', textTransform: 'uppercase' }}>
                        {data.category.name}
                    </h1>
                    <div className='category_products'>
                        {data.category.products.map((product, id) =>
                            <div key={id} className='categoty_product'>
                                <button className='btn_product_img'>
                                    <Link onClick={(e) => {
                                        if (!product.inStock) {
                                            e.preventDefault();
                                        }
                                    }}
                                        to={`/product/${product.id}`}>

                                        <img className={product.inStock ? 'category_product_img' : 'category_outOfStock_product_img'}
                                            src={product.gallery[0]} alt="" />

                                        {product.inStock ? null : <p className='p_outOfStock'>Out of stock</p>}
                                    </Link>
                                </button>

                                {this.displayCircleIcon(product)}

                                <p className={product.inStock ? null : 'p_productName_outOfStock'}>
                                    {product.name}
                                </p>
                                <p className={product.inStock ? 'category_product_price' : 'category_product_price_outOfStock'}>
                                    {product.prices[currencyIndex].currency.symbol}{product.prices[currencyIndex].amount}
                                </p>
                            </div>
                        )}
                    </div>
                </div>)
        }
    }

    render() {
        return (
            <div>
                {this.displayCategory()}
            </div>
        );
    }
}

export default Category;