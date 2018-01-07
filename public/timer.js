//TODO phase 1
//Add a countdown to start
//Add sound to signal end and begining of getExercises
//Add categories (EX home: no machine weights and equipment - dumbells okay; Gym: weights and equipment)
//Change exercise intervals to number of circuits
//add an "exercise left" countdown
//Make the categories buttons (or at least look clickable)
//add a "Loading..." text to the exercises list when a category is clicked
//add pictures to the descriptions
//if the service is unavailable (503 Error) then update the page accordingly.

//COMPLETED phase 1
//Timer green when going
//make exercises dragable


//TODO phase 2
//create user login and profile
//allow user to create and save exercises
//allow user to create and save workouts



//dragable selected exercises
  $( function() {
    $( "#selectedExercises" ).sortable();
    $( "#selectedExercises" ).disableSelection();
  } );

var breakTime = 15;
var timer = {
    intervals: 0
    , currentExerciseId: 0
    , break: false
    , intervalTime: 0
    , circuitSecondsRemaining: 0
    , intervalSecondsRemaining: 0
    , setIntervalVariable: function () {}
    , getCircuitSecondsRemaining: function () {
        console.log(this.circuitSecondsRemaining);
        return this.circuitSecondsRemaining;
    }
    , getIntervalSecondsRemaining: function () {
        console.log(this.intervalSecondsRemaining);
        return this.intervalSecondsRemaining;
    }
    , setIntervalSecondsRemaining: function (num) {
        this.intervalSecondsRemaining = num;
        console.log(this.intervalSecondsRemaining);
    }
    , setTimer: function (intervals, intervalTime) {
        console.log(intervals);
        this.intervals = intervals;
        this.intervalTime = intervalTime;
        this.circuitSecondsRemaining = this.intervals * this.intervalTime + this.intervals * breakTime + this.intervals*2;
        this.intervalSecondsRemaining = intervalTime;
        this.break = false;
    }
    , reset: function(){
        this.intervals =0;
        this.currentExerciseId= 0;
        this.break =false;
        this.intervalTime= 0;
        this.circuitSecondsRemaining=0;
        this.intervalSecondsRemaining=0;
    }
 }

//variables
var setIntervalVariable;
$("#startbtn").click(start);
$("#resetbtn").click(resetTimer);
$("#pausebtn").click(pauseTimer);
$("#resumebtn").click(resumeTimer);
$(document).ready(function () {
    console.log("ready");
});





//start
function start() {
    console.log("starting timer: ");
    // clearInterval(setIntervalVariable);
    //get the values from the user
    var timeInterval = $('#circuitTime').find(":selected").val();
    console.log("Value " + timeInterval);
    var numIntervals = $('#numInterval').val();
    console.log("numInt " + numIntervals);
    //set the timer variables
    timer.setTimer(numIntervals, timeInterval)
        //start the interval
    resumeTimer();
}


//resetTimer
function resetTimer() {
    console.log("resetTimer");
    
    clearInterval(setIntervalVariable);
    
    //reset the timer
    timer.reset();
    
    //get the values from the user
    var timeInterval = $('#circuitTime').find(":selected").val();
    var numIntervals = $('#numInterval').val();
    timer.setTimer(numIntervals, timeInterval);
    
    //set the button back to normal
    $("#timeBox").empty().append("<button id=\"startbtn\" onclick=\"start();\" class=\"time-box\"> START</button>");
}


//pause
function pauseTimer() {
    //STOP THE clock
    clearInterval(setIntervalVariable);
    
    //adjust the ui 
    var itRemaining = timer.intervalSecondsRemaining;
    $("#timeBox").empty().append("<div class=\"time-box\"id=\"itRemaining\" > <strong>" + itRemaining + "</strong> </div>" + "<button id=\"resumebtn\" onclick=\"resumeTimer();\" class=\"time-box\">CONTINUE</button>");
}


//resume
function resumeTimer() {
    
    //reset the clock
    clearInterval(setIntervalVariable);
    
    //start the clock
    setIntervalVariable = setInterval(function () {
        //it=intervaltime
        var itRemaining = timer.intervalSecondsRemaining;
        
        //update exercise queue
        updateExerciseQueue();

        //empty div and add a pause button if they click resume
        $("#timeBox").empty().append(
            "<div class=\"time-box\"><strong>" + itRemaining + "</strong> </div>"
            + "<button id=\"pausebtn\" onclick=\"pauseTimer();\" class=\"time-box\"> PAUSE</button>");
        
        //if it is a break make the background orange
        if (timer.break) {
            $(".time-box").css("background", "orange");
            updateExerciseQueue();
        }
        //otherwise make the color red 
        else {
            $(".time-box").css("background", "#4CAF50");
        }

        //decrement the time
        timer.circuitSecondsRemaining--;
        timer.intervalSecondsRemaining--;
        //if we went lower than 0 then do something
        if (timer.intervalSecondsRemaining < 0){
            resetIntervalTime();
        }
        if(timer.circuitSecondsRemaining < 0){
            resetTimer();
            return;
        }
    }, 1000);
}

function resetIntervalTime(){
    if(timer.circuitSecondsRemaining <=0 ){
        //end the program and turn reset everything.
        resetTimer();
    }
    if(timer.break == true){
        //change break to false and change the ui
        timer.setIntervalSecondsRemaining(timer.intervalTime);
        timer.break = false;
        timer.currentExerciseId++;
    }else{
        //change break to true and change the ui
        timer.setIntervalSecondsRemaining(breakTime);
        timer.break = true;
    }
}

function updateExerciseQueue(){
    var selectedExercises = document.getElementById("selectedExercises").childNodes;
    console.log(selectedExercises);
    var index = timer.currentExerciseId % (selectedExercises.length-1);
    var eSize = selectedExercises.length -1;
    console.log(eSize);
    $("#currentExercise").empty();
    if( eSize < 1){
        $("#currentExercise").append("<h3>No Exercise Selected</h3>");
        return;
    }
    
    if(timer.break){
        if(timer.circuitSecondsRemaining <=0 || timer.circuitSecondsRemaining <= timer.intervalTime){
            $("#currentExercise").append("<h3>Finished</h3>");
        }
        else{
            //get the next exercise
            var nextExercise = selectedExercises.item((index + 1)%eSize).childNodes.item(0).innerHTML;
            $("#currentExercise").append("<p>Coming up: " + nextExercise + "</strong>"); 
        } 
    }
    else{
        //get the current exercise. 
        var currentExercise = selectedExercises.item(index).childNodes.item(0).innerHTML;
        console.log("CurrentExercise: " +currentExercise);
        $("#currentExercise").append("<h1><strong>"+ currentExercise+ "</strong></h1>");
    }     
}

            