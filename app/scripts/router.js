var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone')

var RestAppContainer = require('./components/index.jsx').RestAppContainer;

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index'
  },
  index: function(){
      ReactDOM.render(
      React.createElement(RestAppContainer),
      document.getElementById('app')
    );
  }
});

var appRouter = new AppRouter();

module.exports = appRouter;
