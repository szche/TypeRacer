
//CHECK README
var database = [
  ['I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell don\'t deserve me at my best.', 'Marilyn Monroe'],
  ['You\'ve gotta dance like there\'s nobody watching, Love like you\'ll never be hurt, Sing like there\'s nobody listening, And live like it\'s heaven on earth.', 'William W. Purkey'],
  ['Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines, Sail away from the safe harbor, Catch the trade winds in your sails. Explore. Dream. Discover.', 'Mark Twain'],
  ['Let others lead small lives, but not you. Let others argue over small things, but not you. Let others cry over small hurts, but not you. Let others leave their future in someone else\'s hands, but not you.', 'Jim Rohn'],
  ['People think a soul mate is your perfect fit, and that\'s what everyone wants. But a true soul mate is a mirror, the person who shows you everything that is holding you back, the person who brings you to your own attention so you can change your life.','Eat, Pray, Love by Elizabeth Gilbert'],
  ['test', 'author']
];
//


var to_type;
var author;
var displayDiv = document.getElementById("text");
var inputDiv = document.getElementById("textinput");
var gameOn = true;
var time = 0;
var timer;
var intervalInSec = 1;
var mistakes = 0;
var writen = "";
var spaceplace;
var active_word;

$("document").ready(function(){
  random = randomIntFromInterval(0,database.length-1);
  to_type = database[random][0];
  author = database[random][1];

  handleDisplyChanges();

  inputDiv.value = "";
  editDisplay();

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


$('#textinput').on('input', function(){


  //CHECK IF THE GAME ISN'T ARLEADY FINISHED
  if(gameOn)
  {
    spellcheck();
  }
});

//START THE TIMER
$('#textinput').one('keypress', function() {
  timer = setInterval(timeCounter, intervalInSec*100);
});



function spellcheck()
{


  if(to_type.substring(0, inputDiv.value.length) == inputDiv.value)
  {

    //CLEAR THE INPUT FIELD WHEN THE CORRECT SPACE OCCURS
    if(inputDiv.value[inputDiv.value.length-1] == " ")
    {
      writen += to_type.substring(0, inputDiv.value.length);
      // console.log(writen);
      to_type = to_type.substring(inputDiv.value.length, to_type.length);
      handleDisplyChanges();
      // console.log(to_type);
      // console.log(spaceplace);
      // console.log(active_word);
      inputDiv.value = "";
    }

    editInput("rgba(40, 167, 69, 0.9)", "black");


    if(to_type == inputDiv.value)
    {
      console.log("KONIEC");
      gameOn = false;

      clearInterval(timer);

      stopGame();
      console.log(time);
    }


    editDisplay();
  }
  else
  {
    mistakes += 1;
    console.log(to_type.substring(inputDiv.value.length, inputDiv.value.length));
    editInput("rgba(200, 35, 51, 0.9)", "red");
  }

}


function handleDisplyChanges()
{
  spaceplace = to_type.search(" ");
  if(spaceplace <= 0)
  {
    spaceplace = to_type.length;
  }
  active_word = to_type.substring(0, spaceplace);
}

function editDisplay()
{
  displayDiv.innerHTML = '<span class="completed-words">' + writen + '</span>' + '<span class="current-word">' + inputDiv.value + '</span>'+ active_word.substring(inputDiv.value.length, active_word.length) + to_type.substring(spaceplace, to_type.length);
}

function editInput(borderInput, active_word_color)
{
  // $("#textinput:focus").css('box-shadow', shadowInput);//zmiana poswiaty inputa na zielony/czerwony
  $("#textinput:focus").css('border-color', borderInput);//zmiana border inputa na zioelony/czerwonyu
  $(".current-word").css('color', active_word_color);

  // $("#wrongRight").css('border-color', borderSpan);

}


//AFTER FINISHING THE GAME
function stopGame()
{
  inputDiv.value = "";
  // Timer(timer); // end the timer
  $( "#textinput" ).prop( "disabled", true );
  $("#textinput").css("box-shadow", "none");
  $("#textinput").css("border-color", "#ced4da");
  $("#textinput:focus").css("border-color", "#ced4da");
  $("#text").css('color', 'rgba(40, 167, 69, 0.9)');


  ShowStats();
}


//SHOW THE TYPING STATS
function ShowStats()
{
  accuracy = parseInt(((displayDiv.innerText.length-mistakes)/displayDiv.innerText.length * 100));

  $("#text-info").html(author);
  $("#accuracyID").html("Accuracy: " + accuracy + "%");
  $("#timeID").html("Time: " + time/10 + "s");
  $("#accuracyIDmore").html("Mistakes:<b> " + mistakes + "</b></br>Characters Total: <b>" + displayDiv.innerText.length +"</b>");
  $("#speedID").html("Speed : " + parseInt(displayDiv.innerText.length / (time/600)) + " CPM");
  $("#statsText").css("display", "flex");
  $("#statsText").hide();
  $("#statsText").show("slow");
}




//MEASURE TIME
function timeCounter()
{
  time += 1;
  // console.log(time);
}


//HIDE THE LOADING SCREEN
function ReadyScreen() {
    setTimeout(function() {
        $(".LoadingScreen").hide("fast");
    }, 500);
}

//RANDOM NUMBER GENERATOR
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
