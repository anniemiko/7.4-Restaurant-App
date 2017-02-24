var React = require('react');
var Backbone = require('backbone');

var MenuCollection = require('../models/models.js').MenuCollection;
var OrderCollection = require('../models/models.js').OrderCollection;

var RestAppContainer = React.createClass({
  getInitialState: function(){
    var foodCollection = new MenuCollection();
    var orderCollection = new OrderCollection();
    return {foodCollection: foodCollection, orderCollection: orderCollection};
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
    this.state.orderCollection.create(menu);
  },
  render: function(){
    // console.log(this.state.foodCollection);
    return (
      <div>
        <FoodItemView updateOrder={this.updateOrder} foodCollection={this.state.foodCollection}/>
        <OrderView orderCollection={this.state.orderCollection}/>
      </div>
    )
  }
});

var FoodItemView = React.createClass({
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

// var FoodListView = React.createClass({
//   render: function(){
//     return (
//       <div className="menu col-md-8">
//         <ul className="menu-list">
//           <h3>Menu</h3>
//           {FoodItemView}
//         </ul>
//       </div>
//     )
//   }
// });

var OrderView = React.createClass({
  getInitialState: function(){
    var orderCollection = new OrderCollection();
    return {orderCollection: orderCollection};
  },
  // additem: function(){
  //   var newOrderCollection = this.state.orderCollection;
  //
  //   newOrderCollection.create(
  //   )
  // },
  render: function(){
    
    return (
      <div className="order-box col-md-4">
        <ul>
          <h3>Order Preview</h3>
          <li className="item">
            <span className="item-name"></span>
            <span className="item-price"></span>
          </li>
        </ul>
        <div className="subtotal">
          <span className="total"></span>
          <span className="total-price"></span>
        </div>
      </div>
    )
  }
});

module.exports = {
  RestAppContainer
}
