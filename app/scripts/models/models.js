var Backbone = require('backbone');

var MenuItem = Backbone.Model.extend({

});

var OrderItem = Backbone.Model.extend({

});

var MenuCollection = Backbone.Collection.extend({
  model: MenuItem
});

var OrderCollection = Backbone.Collection.extend({
  model: OrderItem
});

module.exports = {
  MenuItem,
  OrderItem,
  MenuCollection,
  OrderCollection
}
