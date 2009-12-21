sys = require("sys");

function wrap(app){
  if (typeof(app) === 'function') {
    return new Chain.Link('', {onRequest: app});
  } else {
    return app;
  }
}

Builder = {
  make : function(stack){
    var firstApp, app, nextApp, i;
    if (typeof(stack) === 'function') {
      stack = [stack];
    }
    firstApp = wrap(stack[0]);
    app = firstApp;
    for(i = 1; i < stack.length; i++){
      nextApp = wrap(stack[i]);
      app.nextApp = nextApp;
      app = nextApp;
    }
    return firstApp;
  }
};

exports.Builder = Builder;
