color = {
  create: function() {
    var obj;

    switch (arguments.length) {
      case 1:
        obj = (new color_obj({hex: arguments[0]}));
        break;

      case 3:
        obj = (new color_obj({r: arguments[0], g: arguments[1], b: arguments[2]}));
        break;

      default:
        obj={};
    }
    return obj;
  },

  randomcreate: function() {
    return (new button_obj({random: true}));
  }
};

color_obj = (function() {
  var color = {r: 0, g: 0, b: 0};

  this.create = function(params){
    if(params.random === true){
      return random();
    }
  }

  this.random = function(){

  }
});
