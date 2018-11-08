
//CHECK README
//Normally, you should handle the text generator on the server-side, but for the sake of this demo I did it locally on client-side
var database = [
  ['I\'m selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can\'t handle me at my worst, then you sure as hell don\'t deserve me at my best.', 'Marilyn Monroe'],
  ['You\'ve gotta dance like there\'s nobody watching, Love like you\'ll never be hurt, Sing like there\'s nobody listening, And live like it\'s heaven on earth.', 'William W. Purkey'],
  ['Twenty years from now you will be more disappointed by the things that you didn\'t do than by the ones you did do. So throw off the bowlines, Sail away from the safe harbor, Catch the trade winds in your sails. Explore. Dream. Discover.', 'Mark Twain'],
  ['Let others lead small lives, but not you. Let others argue over small things, but not you. Let others cry over small hurts, but not you. Let others leave their future in someone else\'s hands, but not you.', 'Jim Rohn'],
  ['People think a soul mate is your perfect fit, and that\'s what everyone wants. But a true soul mate is a mirror, the person who shows you everything that is holding you back, the person who brings you to your own attention so you can change your life.','Eat, Pray, Love by Elizabeth Gilbert'],
  ['Still, there are times I am bewildered by each mile I have traveled, each meal I have eaten, each person I have known, each room in which I have slept. As ordinary as it all appears, there are times when it is beyond my imagination.','Jhumpa Lahiri, Interpreter of Maladies'],
  ['Hello, babies. Welcome to Earth. It\'s hot in the summer and cold in the winter. It\'s round and wet and crowded. At the outside, babies, you\'ve got about a hundred years here. There\'s only one rule that I know of, babies - God damn it, you\'ve got to be kind.','Leo Tolstoy, Anna Karenina'],
  ['You call yourself a free spirit, a \'wild thing\', and you\'re terrified somebody\'s gonna stick you in a cage. Well baby, you\'re already in that cage. You built it yourself. And it\'s not bounded in the west by Tulip, Texas, or in the east by Somali-land. It\'s wherever you go. Because no matter where you run, you just end up running into yourself.','Truman Capote, Breakfast at Tiffany\'s'],
  ['There is a loneliness that can be rocked. Arms crossed, knees drawn up, holding, holding on, this motion, unlike a ship\'s, smooths and contains the rocker. It\'s an inside kind - wrapped tight like skin. Then there is the loneliness that roams. No rocking can hold it down. It is alive. On its own. A dry and spreading thing that makes the sound of one\'s own feet going seem to come from a far-off place.','Toni Morrison, Beloved'],
  ['Beautiful means \"full of beauty.\" Beautiful is not about how you look on the outside, beautiful is about what you\'re made of. Beautiful people spend time discovering what their idea of beauty on this earth is. They know themselves well enough to know what they love, and they love themselves enough to fill up with a little of their particular kind of beauty each day.','Love Warrior by Glennon Doyle Melton'],
  ['It cannot be doubted that each of us can only see part of the picture. The doctor sees one, the patient another, the engineer a third, the economist a fourth, the pearl diver a fifth, the alcoholic a sixth, the cable guy a seventh, the sheep farmer an eighth, the Indian beggar a ninth, the pastor a tenth. Human knowledge is never contained in one person. It grows from the relationships we create between each other and the world, and still it is never complete.','When Breath Becomes Air by Paul Kalanithi']
];
//

var correctColor = "rgba(40, 167, 69, 0.9)";
var mistakeColor = "rgba(200, 35, 51, 1)";

var to_type;
var author;
var displayDiv = document.getElementById("text");
var inputDiv = document.getElementById("textinput");
var gameOn = true;
var refreshPossible = true;
var time = 0;
var timer;
var intervalInSec = 1;
var mistakes = 0;
var writen = "";
var spaceplace;
var active_word;
var autoHeight;

$("document").ready(function(){


  chooseTheText();


  //PREVENT PASTING
  $('#textinput').bind("cut copy paste",function(e) {
     e.preventDefault();
  });

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
  refreshPossible = false;

  //MAKE THE BUTTON DISABLED AND HIDE IT
  $(".refreshTextButton").addClass("disabled");
  $( ".refreshTextButton" ).fadeTo( "slow" , 0.05, function() {
    $(".refreshTextButton").hide();
});


  timer = setInterval(timeCounter, intervalInSec*100);
  editDisplay();

});



function spellcheck()
{


  if(to_type.substring(0, inputDiv.value.length) == inputDiv.value)
  {

    //CLEAR THE INPUT FIELD WHEN THE CORRECT SPACE OCCURS
    if(inputDiv.value[inputDiv.value.length-1] == " ")
    {
      writen += to_type.substring(0, inputDiv.value.length);
      to_type = to_type.substring(inputDiv.value.length, to_type.length);
      handleDisplyChanges();
      inputDiv.value = "";
    }

    editInput(correctColor, "black");

    if(to_type == inputDiv.value)
    {
      gameOn = false;
      clearInterval(timer);
      stopGame();
    }
    editDisplay();
  }
  else
  {
    mistakes += 1;
    editInput(mistakeColor, mistakeColor);
  }

}

//HANDLE DISPLAY CHANGES
function handleDisplyChanges()
{
  spaceplace = to_type.search(" ");
  if(spaceplace <= 0)
  {
    spaceplace = to_type.length;
  }
  active_word = to_type.substring(0, spaceplace);
}

//EDUT THE DISPLAY DIV TO SHOW PROGRESS
function editDisplay()
{
  displayDiv.innerHTML = '<span class="completed-words">' + writen + '</span>' + '<span class="current-active-word">' + '<span class="current-word">' + inputDiv.value + '</span>'+ active_word.substring(inputDiv.value.length, active_word.length) + '</span>' + to_type.substring(spaceplace, to_type.length);
}

//EDIT INPUT FIELD AND DISPLAY DIV IN CASE OF MISTAKE/CORRECT INPUT
function editInput(borderInput, active_word_color)
{
  color = '0px 0px 4px ' + borderInput;
  // console.log(color);
   $('#textinput').css('box-shadow', color);
  $("#textinput:focus").css('border-color', borderInput);//zmiana border inputa na zioelony/czerwonyu
  $(".current-active-word").css('color', active_word_color);
}


//AFTER FINISHING THE GAME
function stopGame()
{
  inputDiv.value = "";
  $( "#textinput" ).prop( "disabled", true );
  $("#textinput").css("box-shadow", "none");
  $("#textinput").css("border-color", "#ced4da");
  $("#textinput:focus").css("border-color", "#ced4da");
  $("#text").css('color', correctColor);


  ShowStats();
}


//SHOW THE TYPING STATS
function ShowStats()
{
  $(".typeDisplayDiv").animate({
    fontSize: '2em',
    height: 'auto'
  }, "slow");
  $(".textBG").animate({
    padding: '2vh',
  }, "slow");
  $(".typeDisplayDiv").css('height', 'auto');

  accuracy = parseInt(((displayDiv.innerText.length-mistakes)/displayDiv.innerText.length * 100));

  $("#text-info").html(author);
  $("#accuracyID").html("Accuracy: " + accuracy + "%");
  $("#timeID").html("Time: " + time/10 + " s");
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
}


//HIDE THE LOADING SCREEN
function ReadyScreen() {
    setTimeout(function() {
        $(".LoadingScreen").hide("fast");
    }, 500);
}

function chooseTheText()
{
  if(refreshPossible)
  {
    random = randomIntFromInterval(0,database.length-1);
    to_type = database[random][0];
    author = database[random][1];
    handleDisplyChanges();
    inputDiv.value = "";


    $(".typeDisplayDiv").animate({
      height: '0px'}, "slow");
    $(".typeDisplayDiv").css('height', 'auto');
    displayDiv.innerHTML = to_type;
    autoHeight = $(".typeDisplayDiv").height();

    // //DISPLAY THE TEXT
    $(".typeDisplayDiv").animate({
      height: autoHeight}, "slow");



     //FOCUS THE INPUT
     $("#textinput").focus();
  }

}

//RANDOM NUMBER GENERATOR
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
