import React, { Component } from 'react';
import { Context } from '../context/Context';
import './Cart.css';
import arrowLeft from '../assets/icons/arrowLeft.png';
import arrowRight from '../assets/icons/arrowRight.png';

class Cart extends Component {

    static contextType = Context;

    componentDidMount() {
        this.context.calculatePrice()
    }

    displayArrows(product, productId) {
        if (product.gallery.length <= 1) {
            return null;
        }
        return (
            <div style={{ position: 'relative' }}>
                <button onClick={() => this.context.onLeftArrowClick(product.gallery.length, productId)} className='btn_arrowLeft'>
                    <img src={arrowLeft} alt="" />
                </button>
                <button onClick={() => this.context.onRightArrowClick(product.gallery.length, productId)} className='btn_arrowRight'>
                    <img src={arrowRight} alt="" />
                </button>
            </div>
        )
    }

    styleSwitcher = (id, attrId, name, product) => {
        if (product.selectedAttributesId[attrId] === id && name === 'Color') {
            return 'btn_color_selected'
        }
        if (name === 'Color') {
            return 'btn_color'
        }
        if (product.selectedAttributesId[attrId] === id && name !== 'Color') {
            return 'btn_size_selected'
        }
        else if (name !== 'Color') {
            return 'btn_size'
        }
    }

    displayCurrencySymbol = () => {
        if (this.context.state.currencyData === undefined) {
            return;
        }
        return this.context.state.currencyData[this.context.state.currencyId].symbol;
    }

    displayCartProducts = () => {
        let currencyIndex = this.context.state.currencyId;
        return (
            <div className='main_cart'>
                {this.context.state.cartItems.map((product, productId) =>
                    <div className='cart_product' key={productId}>
                        <div className='cart_product_info'>
                            <p className='p_productName'>{product.name}</p>
                            <p style={{ fontWeight: 900 }}>
                                {product.prices[currencyIndex].currency.symbol}
                                {product.prices[currencyIndex].amount}
                            </p>
                            {product.attributes.map((attribute, attrId) =>
                                <div className='cart_attribute' key={attrId}>
                                    <p className='p_cartAttribute'>{attribute.name}:</p>
                                    <div>
                                        {attribute.items.map((item, itemId) =>
                                            <button
                                                className={this.styleSwitcher(itemId, attrId, attribute.name, product)}
                                                style={{ backgroundColor: item.value }}
                                                key={itemId}>
                                                {attribute.name === 'Color' ? '' : item.value}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='cart_count'>
                            <button onClick={() => this.context.increaseProductAmount(productId)} className='btn_count'>+</button>
                            <p style={{ fontWeight: '900' }}>{product.counter}</p>
                            <button onClick={() => this.context.decreaseProductAmount(productId, product.id)} className='btn_count'>−</button>
                        </div>

                        <div className='cart_picture'>
                            <img className='cart_product_img' src={product.gallery[product.imageIndex]} alt="" />
                            {this.displayArrows(product, productId)}
                        </div>
                    </div>
                )}

                <div>
                    <div className='border'></div>
                    <div className='cart_order'>
                        <div>
                            Tax 21%: <span>{this.displayCurrencySymbol()}{this.context.state.tax}</span>
                        </div>
                        <div>Quantity: <span>{this.context.state.quantity}
                        </span></div>
                        <div>Total: <span>{this.displayCurrencySymbol()}{this.context.state.totalPrice}
                        </span></div>
                        <button className='btn_order btn_add'>Order</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.displayCartProducts()}
            </div>
        );
    }
}

export default Cart;