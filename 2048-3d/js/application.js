// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
// Setup Leap loop with frame callback function
  window.game = new GameManager(3, KeyboardInputManager, HTMLActuator, LocalScoreManager);
});
