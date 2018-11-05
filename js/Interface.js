var fontSize = 1;

//przyciski zoomIn + zoomOut
  $("#zoomIn").click(function() {
    if(fontSize < 1.35) {
    fontSize = fontSize + 0.03
    $("#text").css("font-size" ,fontSize+"em");
  }
  else {
    $("#zoomIn").prop('disabled', true);
  }
  });
  $("#zoomOut").click(function() {
    $("#zoomIn").prop('disabled', false);
    fontSize = fontSize - 0.03
    $("#text").css("font-size" ,fontSize+"em");
  });
