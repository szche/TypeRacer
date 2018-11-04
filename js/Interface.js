var fontSize = 1;

//przyciski zoomIn + zoomOut
  $("#zoomIn").click(function() {
    if(fontSize < 1.35) {
    fontSize = fontSize + 0.01
    $("#text").css("font-size" ,fontSize+"em");
  }
  else {
    $("#zoomIn").prop('disabled', true);
  }
  });
  $("#zoomOut").click(function() {
    $("#zoomIn").prop('disabled', false);
    fontSize = fontSize - 0.01
    $("#text").css("font-size" ,fontSize+"em");
  });





  $(".badge").hover(function(){
    $(this).popover('show')
  }, function(){
    $(this).popover('hide')
  });
