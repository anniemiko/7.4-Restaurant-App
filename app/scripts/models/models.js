var Backbone = require('backbone');
Backbone.LocalStorage = require('backbone.localstorage');

var MenuItem = Backbone.Model.extend({

});

var OrderItem = Backbone.Model.extend({
  idAttribute: '_id'
});

var MenuCollection = Backbone.Collection.extend({
  model: MenuItem
});

var OrderCollection = Backbone.Collection.extend({
  model: OrderItem,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/mikorestaurant'
});

var NewOrderCollection = Backbone.Collection.extend({
  model: OrderItem,
  localStorage: new Backbone.LocalStorage('cart'),
  calculateTotal: function(){
    var subTotal = this.reduce(function(accum, i){
      return accum + i.get('price')
    }, 0);
    return subTotal.toFixed(2)
   }
});

module.exports = {
  MenuItem,
  OrderItem,
  MenuCollection,
  OrderCollection,
  NewOrderCollection
}
