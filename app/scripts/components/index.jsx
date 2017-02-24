var React = require('react');
var Backbone = require('backbone');

var MenuCollection = require('../models/models.js').MenuCollection;
var OrderCollection = require('../models/models.js').OrderCollection;
var NewOrderCollection = require('../models/models.js').NewOrderCollection;

var RestAppContainer = React.createClass({
  getInitialState: function(){
    var foodCollection = new MenuCollection();
    var orderCollection = new OrderCollection();
    var newOrderCollection = new NewOrderCollection();

    newOrderCollection.fetch();

    return {foodCollection: foodCollection, orderCollection: orderCollection, newOrderCollection: newOrderCollection};
  },
  componentWillMount: function(){
    var newFoodCollection = this.state.foodCollection;

    newFoodCollection.add([
      {title: 'burger', description: 'yum', price: 5},
      {title: 'fries', description: 'yumyum', price: 3},
      {title: 'shake', description: 'creamy', price: 4},
      {title: 'cookie', description: 'yummy', price: 2}
    ]);
    this.setState({foodCollection: newFoodCollection})
  },
  updateOrder: function(menu){
    // console.log(menu);
    this.state.newOrderCollection.create(menu);
  },
  render: function(){
    // console.log(this.state.foodCollection);
    return (
      <div>
        <FoodListView updateOrder={this.updateOrder} foodCollection={this.state.foodCollection}/>
        <OrderView newOrderCollection={this.state.newOrderCollection} orderCollection={this.state.orderCollection}/>
      </div>
    )
  }
});

var FoodListView = React.createClass({
  propTypes: {
    foodCollection: React.PropTypes.instanceOf(Backbone.Collection).isRequired
  },
  getInitialState: function(){
    return {}
},
  addItem: function(menu){

    var title = menu.get('title');
    var price = menu.get('price');

    this.props.updateOrder({title: title, price: price});
  },
  render: function(){
    var self = this;
    var menuItems = this.props.foodCollection.map(function(menu){
      return (
        <a key={menu.cid} onClick={()=>{self.addItem(menu)}}><li className="menu-item">
          <span className="menu-itemTitle">{menu.get('title')}</span>
          <span className="price">{menu.get('price')}</span>
          <p className="menu-itemDescription">{menu.get('description')}</p>
        </li>
        </a>
      )
    })
    return (
      <div className="menu col-md-8">
        <ul className="menu-list">
          <h3>Menu</h3>
          {menuItems}
        </ul>
      </div>
    )
  }
});

var OrderView = React.createClass({
  getInitialState: function(){
    var cartItem = this.props.newOrderCollection;
    return {cartItem: cartItem};
    // var
  },
  placeOrder: function(){
    var orderFood = this.props.newOrderCollection
    console.log(orderFood);
    // console.log(this.props.orderCollection);
    this.props.orderCollection.create(orderFood)
    // make an ajax call to post my collection array to the database
  },
  render: function(){
    var orderItems = this.props.newOrderCollection.map(function(order){
      return (
            <li key={order.cid} className="item">
              <span className="item-name">{order.get('title')}</span>
              <span className="item-price">{order.get('price')}</span>
            </li>
          )
        })
    return(
      <div className="order-box col-md-4">
        <h3>Order Preview</h3>
          <ul>
          {orderItems}
          </ul>
          <div className="subtotal">
            <span className="total"></span>
            <span className="total-price"></span>
          </div>
          <button onClick={this.placeOrder}>Place Order</button>
        </div>
    )
  }
});

module.exports = {
  RestAppContainer
}
