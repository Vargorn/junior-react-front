import React, { Component } from 'react';
import { Context } from '../context/Context';
import './Product.css';
import { Link } from 'react-router-dom';

class Product extends Component {
    constructor(props) {
        super(props)

        this.state = {
            imageId: '0',
            selectedAttributesId: [],
            disabled: true
        }
    }

    static getDerivedStateFromProps(props, state) {
        for (let i = 0; i < state.selectedAttributesId.length; i++) {
            if (state.selectedAttributesId[i] === undefined) {
                return null;
            }
        }
        if (state.selectedAttributesId.length === props.data.product.attributes.length) {
            return { disabled: false }
        }
        return { disabled: true }
    }

    static contextType = Context;

    componentDidMount() {
        const data = localStorage.getItem(this.props.data.product.id) || [];
        if (data.length === 0) {
            return
        }
        this.setState({selectedAttributesId: JSON.parse(data)});
    }

    componentDidUpdate() {
        localStorage.setItem(this.props.data.product.id, JSON.stringify(this.state.selectedAttributesId));
    }

    addToCart = (product) => {
        localStorage.setItem(this.props.data.product.id, []);
        this.context.addItemToCart(product, this.state.selectedAttributesId);
    }

    changeProductAttribute = (attributeId, id) => {
        let selectedAttributesId = this.state.selectedAttributesId;
        selectedAttributesId[attributeId] = id;
        this.setState({ selectedAttributesId: selectedAttributesId })

    }

    styleSwitcher = (id, attributeId, name) => {
        if (this.state.selectedAttributesId[attributeId] === id && name === 'Color') {
            return 'btn_color_selected'
        }
        if (name === 'Color') {
            return 'btn_color'
        }
        if (this.state.selectedAttributesId[attributeId] === id && name !== 'Color') {
            return 'btn_attribute_selected'
        }
        else if (name !== 'Color') {
            return 'btn_attribute'
        }
    }

    displayProductContent = () => {
        let data = this.props.data;
        let currencyIndex = this.context.state.currencyId;
        if (data.loading) {
            return <div>Loading...</div>
        }
        else {
            return (
                <div className='main_product'>

                    <div className='product'>

                        <div className='additional_photos'>
                            {data.product.gallery.map((img, id) =>
                                <img className='additional_photos_img' src={img} key={id} alt="" onClick={() => this.setState({ imageId: id })} />
                            )}
                        </div>

                        <div className='product_picture'>
                            <img className='product_img' src={data.product.gallery[this.state.imageId]} alt="" />
                        </div>

                        <div className='product_info'>
                            <p style={{ fontSize: '2rem' }}>{data.product.name}</p>

                            {data.product.attributes.map((attribute, attributeId) =>
                                <div className='product_attributes' key={attributeId}>
                                    <p className='p_title'>
                                        {attribute.name}:
                                    </p>
                                    <p className='p_attribute'>
                                        {attribute.items.map((item, id) =>
                                            <button
                                                onClick={() => this.changeProductAttribute(attributeId, id)}
                                                className={this.styleSwitcher(id, attributeId, attribute.name)}
                                                style={{ backgroundColor: item.value }}
                                                key={id}>
                                                {attribute.name === 'Color' ? '' : item.value}
                                            </button>
                                        )}
                                    </p>

                                </div>
                            )}

                            <p className='p_title'>
                                Price:
                            </p>
                            <p style={{ fontWeight: 900 }}>{data.product.prices[currencyIndex].currency.symbol}
                                {data.product.prices[currencyIndex].amount}
                            </p>
                            <Link to='/cart'>
                                <button
                                    disabled={this.state.disabled}
                                    onClick={() => this.addToCart(data.product)} className='btn_add'>
                                    Add to cart
                                </button>
                            </Link>
                            <div>
                                <p className='p_description'
                                    dangerouslySetInnerHTML={{ __html: data.product.description }}>
                                </p>
                            </div>
                        </div>


                    </div>

                </div>
            )
        }
    }

    render() {
        return (
            <div>
                {this.displayProductContent()}
            </div>
        );
    }
}

export default Product;