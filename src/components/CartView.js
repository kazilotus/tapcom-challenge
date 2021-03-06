import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Drawer, Empty } from 'antd'
import { CloseOutlined } from '@ant-design/icons';

import { hideCart, updateToCart, removeFromCart, checkoutCart } from '../redux/actions/cart'

import '../components/CartView.css'
// import Counter from './Counter'

class CartView extends Component {

    render() {

        const { items } = this.props
        const total = !!items.length && items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

        return (
            <div>
                <Drawer
                    placement="right"
                    visible={this.props.visible}
                    onClose={this.props.hide}
                    closable={false}
                    width={380}
                >
                    <div id="cart" className="fh">
                        <div className="fr">
                            <h2 className="cart-title fg">Your Cart</h2>
                            <h2 className="cart-close" onClick={ this.props.hide }><CloseOutlined /></h2>
                        </div>
                        <div className="cart-content fc">

                            { total ? 
                            
                            <React.Fragment>

                                <div className="cart-items-wrapper fg">
                                    { items.map(item => (
                                        <div className="cart-item fr">
                                            <img src={ item?.image } alt="cart item preview"/>
                                            <div className="info fc fg">
                                                <h5>{item?.name}</h5>
                                                <span>{item?.quantity} x ${item?.price}</span>
                                                {/* <Counter value={item.quantity} scale={0.7}/> */}
                                            </div>
                                            <div>
                                                <Button type="text" icon={<CloseOutlined />} onClick={() => this.props.remove(item.id)}/>
                                            </div>
                                        </div>
                                    )) }
                                </div>

                                <div className="cart-total">
                                    Total: ${ total.toFixed(2) }
                                </div>

                                <Button onClick={ this.props.checkout }>Checkout</Button>

                            </React.Fragment>
                            :
                            <div style={{ marginTop: 80 }}>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Cart is empty"/>
                            </div> }

                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    visible: state.cart?.visible,
    items: state.cart?.items
})

const mapDispatchToProps = dispatch => ({
    hide: () => dispatch(hideCart()),
    update: (id, quantity) => dispatch(updateToCart(id, quantity)),
    remove: (id) => dispatch(removeFromCart(id)),
    checkout: () => dispatch(checkoutCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(CartView)
