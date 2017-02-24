var React = require('react');
var Backbone = require('backbone');

var models = require('../models/models.js');

var RestAppContainer = React.createClass({
  getInitialState: function(){
    var menuCollection = new models.MenuCollection();
    return {foodItemCollection: menuCollection};
  },
  componentWillMount: function(){
    var foodCollection = this.state.foodItemCollection;

    foodCollection.add([
      {title: 'burger', description: 'yum', price: 5},
      {title: 'fries', description: 'yumyum', price: 3},
      {title: 'shake', description: 'creamy', price: 4},
      {title: 'cookie', description: 'yummy', price: 2}
    ])
  },
  render: function(){
    return (
      <div>
        <FoodListView />
        <OrderView />
      </div>
    )
  }
});

var FoodItemView = React.createClass({
  render: function(){
    return (
      <li className="menu-item">
        <span className="menu-itemTitle"></span>
        <span className="price"></span>
        <p className="menu-itemDescription"></p>
      </li>
    )
  }
});

var FoodListView = React.createClass({
  render: function(){
    return (
      <div className="menu col-md-8">
        <ul className="menu-list">
          <h3>Menu</h3>

        </ul>
      </div>
    )
  }
});

var OrderView = React.createClass({
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
