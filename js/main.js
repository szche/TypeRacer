
//CHECK README
var database = [
  ['I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell don\'t deserve me at my best.', 'Marilyn Monroe'],
  ['You\'ve gotta dance like there\'s nobody watching, Love like you\'ll never be hurt, Sing like there\'s nobody listening, And live like it\'s heaven on earth.', 'William W. Purkey'],
  ['Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines, Sail away from the safe harbor, Catch the trade winds in your sails. Explore. Dream. Discover.', 'Mark Twain'],
  ['Let others lead small lives, but not you. Let others argue over small things, but not you. Let others cry over small hurts, but not you. Let others leave their future in someone else\'s hands, but not you.', 'Jim Rohn'],
  ['People think a soul mate is your perfect fit, and that\'s what everyone wants. But a true soul mate is a mirror, the person who shows you everything that is holding you back, the person who brings you to your own attention so you can change your life.','Eat, Pray, Love by Elizabeth Gilbert']
];
//


var to_type;
var author;
var displayDiv = document.getElementById("text");
var inputDiv = document.getElementById("textinput");
var spacemark = 0;


$("document").ready(function(){
  random = randomIntFromInterval(0,database.length-1);
  to_type = database[random][0];
  author = database[random][1];

  inputDiv.value = "";

  //DISPLAY THE TEXT
  displayDiv.innerHTML = to_type;

  //PREVENT PASTING
  $('#textinput').bind("cut copy paste",function(e) {
     e.preventDefault();
   });

   //FOCUS THE INPUT
   $("#textinput").focus();

   //HIDE THE LOADING SCREEN
   ReadyScreen();
});


$('#textinput').on('input', function(e){
  //console.log(e);
  // console.log(e);
  //console.log(inputDiv.value);
  spellcheck(e);
  //console.log(to_type.substring(0, inputDiv.value.length) == inputDiv.value);
});


function spellcheck(e)
{
  console.log(to_type.substring(0, inputDiv.value.length));
  console.log(to_type);

  if(to_type.substring(0, inputDiv.value.length) == inputDiv.value)
  {

    //CLEAR THE INPUT FIELD WHEN THE CORRECT SPACE OCCURS
    if(inputDiv.value[inputDiv.value.length-1] == " ")
    {
      console.log("spacja");
      spacemark = inputDiv.value.length;
      to_type = to_type.substring(spacemark, to_type.length);
      console.log(to_type);
      inputDiv.value = "";
    }

  }
  else
  {
    console.log(to_type.substring(spacemark, inputDiv.value.length));
  }
}





function ReadyScreen() {
    setTimeout(function() {
        $(".LoadingScreen").hide("fast");
    }, 1000);
}





//RANDOM NUMBER GENERATOR
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
