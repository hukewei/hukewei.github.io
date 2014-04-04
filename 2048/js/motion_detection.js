// Setup Leap loop with frame callback function
var controllerOptions = {enableGestures: true, frameEventName: 'animationFrame'};
var controllerOptions1 = {enableGestures: true};
var left_count = 0;
var right_count = 0;
var up_count = 0;
var down_count = 0;
var circle_count = 0;
var last_timestamp = 0;
var controller = new Leap.Controller(controllerOptions);

var update = function(){
  frame = controller.frame();

  if ((frame.timestamp - last_timestamp > 750000)) {
  if (frame.gestures.length > 0) {
    for (var i = 0; i < frame.gestures.length; i++) {
      var gesture = frame.gestures[i];

      if (gesture.type == "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  //swipeDirection = "right";
                  right_count++;
                  
              } else {
                  //swipeDirection = "left";
                  left_count++;
                  
              }
          } else { //vertical
              if(gesture.direction[1] > 0){
                  //swipeDirection = "up";
                  up_count++;
                  
              } else {
                  //swipeDirection = "down";
                  down_count++;
              }                  
          }
        } else if (gesture.type == "circle") {
            circle_count++;
        }
      }
    }
    var array = [left_count, right_count, up_count, down_count, circle_count];
    var largest = Math.max.apply(Math, array);
    if (largest > 0 ) {
      console.log(largest);
      if (largest == left_count) {
        console.log('left');
        window.game.move(3);
      } else if (largest == right_count) {
        console.log('right');
        window.game.move(1);
      } else if (largest == up_count) {
        console.log('up');
        window.game.move(0);
      } else if (largest == down_count) {
        console.log('down');
        window.game.move(2);
      } else if (largest == circle_count && largest > 2) {
        console.log('restart');
        //window.game.restart();
      } 
      last_timestamp = frame.timestamp;
    }
    left_count = 0;
    right_count = 0;
    up_count = 0;
    down_count = 0;
    circle_count = 0;
    }
  };

  controller.connect();
  controller.on('gesture', update);
  controller.on('deviceConnected', function() {
    var n = noty({layout: 'top', text: 'LeapMotion controler is successfully connected.', type: 'success', timeout: 5000});
  console.log("Successfully connected.");
});
  controller.on('connect', function() {
      var m = noty({layout: 'topRight', text: 'Swipe your hand to move tiles', type: 'information', timeout: 10000});
  });
  controller.on('deviceDisconnected', function() {
  var o = noty({layout: 'top', text: 'A Leap device has been disconnected.', type: 'alert', timeout: 5000});
  console.log("A Leap device has been disconnected.");
});