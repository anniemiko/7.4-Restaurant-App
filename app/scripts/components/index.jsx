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
      {title: 'spring rolls', description: 'crispy, savory goodness with plum sauce', price: 7},
      {title: 'red curry with tofu', description: "the most delicious dish you'll ever eat", price: 11},
      {title: 'thai iced tea', description: 'the only beverage you should ever drink', price: 3},
      {title: 'sticky rice', description: 'yummy', price: 4}
    ]);
    var subTotal = this.state.newOrderCollection.calculateTotal();
    this.setState({foodCollection: newFoodCollection, subTotal: subTotal})
  },
  updateOrder: function(menu){
    // console.log(menu);
    this.state.newOrderCollection.create(menu);
    this.setState({newOrderCollection: this.state.newOrderCollection});
  },
  clearCart: function(){
    var newOrderCollection = new NewOrderCollection
    this.setState({newOrderCollection});
  },
  render: function(){
    // console.log(this.state.foodCollection);
    return (
      <div>
        <FoodListView updateOrder={this.updateOrder} foodCollection={this.state.foodCollection}/>
        <OrderView newOrderCollection={this.state.newOrderCollection} orderCollection={this.state.orderCollection} subTotal={this.state.subTotal} clearCart={this.clearCart}/>
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
      <div className="menu col-md-5 col-md-push-2">
        <h3>Menu</h3>
        <ul className="menu-list">
          {menuItems}
        </ul>
      </div>
    )
  }
});

var OrderView = React.createClass({
  getInitialState: function(){
    var cartItem = this.props.newOrderCollection;
    var subTotal = this.props.newOrderCollection.subTotal;
    return {cartItem: cartItem, subTotal: subTotal};
    // var
  },
  deleteItem: function(){

  },
  placeOrder: function(){
    var orderFood = this.props.newOrderCollection
    // console.log(orderFood);
    // console.log(this.props.orderCollection);
    this.props.orderCollection.create(orderFood);
    // make an ajax call to post my collection array to the database
    // Backbone.LocalStorage.setVersion(0);
    // clearing local storage for next order
    this.props.clearCart();
    this.setState({orderCollection: new OrderCollection, subTotal: 0});
    localStorage.clear();
  },
  render: function(){
    console.log(this.props.newOrderCollection.length);
    var orderItems = this.props.newOrderCollection.map(function(order){
      var self = this;
      return (
            <li key={order.cid} className="item">
              <span className="item-name">{order.get('title')}</span>
              <span className="item-price">{order.get('price')}</span>
              {/*<button className="btn btn-danger delete-btn">Delete</button>*/}
            </li>
          )
        })
    return(
      <div className="order-box col-md-3 col-md-push-2">
        <h3>Order Preview</h3>
        <div className="orders">
          <ul>
          {orderItems}
          </ul>
          <div className="subtotal">
            <span className="total">Total:</span>
            <span className="total-price">${this.props.subTotal}</span>
          </div>
          <button className="btn btn-success" onClick={this.placeOrder}>Place Order</button>
        </div>
      </div>
    )
    this.forceUpdate();
  }
});

var AdminContainer = React.createClass({
  render: function(){
    return (
      <OrderView newOrderCollection={this.state.newOrderCollection} orderCollection={this.state.orderCollection} subTotal={this.state.subTotal}/>
    )
  }
})

module.exports = {
  RestAppContainer,
  AdminContainer
}
