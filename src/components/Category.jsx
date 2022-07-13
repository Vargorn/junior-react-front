import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../context/Context';
import './Category.css';
import circleIcon from '../assets/icons/Circle_Icon.png';

class Category extends Component {
    static contextType = Context;

    addToCart = (product) => {
        let data = localStorage.getItem(product.id)
        if(product.attributes.length === 0 || data !== null){
            this.context.addItemToCart(product, JSON.parse(data));
        }
    }

    displayCircleIcon = (product) => {
        if (product.inStock) {
            const content = <button className='btn_circleIcon' onClick={() => this.addToCart(product)}>
                <img className='icon' src={circleIcon} alt="" />
            </button>
            
            if (product.attributes.length === 0) {
                return content;
            }

            const string = localStorage.getItem(product.id)
            
            if(string === null){
                return null;
            }

            const data = JSON.parse(string);
            
            if(data.length !== product.attributes.length){
                return null;
            }

            for (let i = 0; i < product.attributes.length; i++) {
                if(data[i] === undefined){
                    return null;
                }
            }

            return content;
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
                    <h1 className='categoryName'>
                        {data.category.name}
                    </h1>
                    <div className='category_products'>
                        {data.category.products.map((product, id) =>
                            <div key={id} className='categoty_product'>
                                <div className='product_content'>
                                <button className='btn_product_img'>
                                    <Link to={`/product/${product.id}`}>

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