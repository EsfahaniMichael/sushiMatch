$(document).ready(initializeApp);




var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


function initializeApp(){
    addClickHandler();
}

function addClickHandler(){
    $('.card').on("click", card_clicked);
    $('.reset').on("click", reset_clicked);
}
function card_clicked(){
if($(event.currentTarget).hasClass('cantClick')){
    return;
}
   if (first_card_clicked === null){
      first_card_clicked = event.currentTarget;
      addClassHide(first_card_clicked);
   }
   else {

       addClassHide(event.currentTarget);
       if (event.currentTarget === first_card_clicked) {
           return;
       }
       else{

            attempts++;
            $('.attempts .value').text(attempts);
            console.log("this is the attempts", attempts);
            second_card_clicked = event.currentTarget;


           if ($(first_card_clicked).find('.front').css('background-image') ===
               $(second_card_clicked).find('.front').css('background-image'))
           {
               $(first_card_clicked).off("click", card_clicked);
               $(second_card_clicked).off("click", card_clicked);
               console.log("HEYYY THEY ARE THE SAME!!");
               matches++;
               first_card_clicked = null;
               second_card_clicked = null;
               accuracy = matches / attempts;
               $('.accuracy .value').text(Math.floor(accuracy.toFixed(2) * 100) + "%");
               console.log(accuracy);
               if (matches === total_possible_matches) {
                   console.log("YOU HAVE WON!!!!!!!!!");
               }
               else {
                   console.log("Not enough points to win, YET")
                   return;
               }

           }
           else {
               accuracy = matches / attempts;
               $('.accuracy .value').text(Math.floor(accuracy.toFixed(2) * 100) + "%");
               console.log(accuracy);
               doNotFlipCards();
               setTimeout(removeClassHide, 1500);
              setTimeout(reFlipCards, 2000);
               console.log("The pairs are not the same");
           }
          /* accuracy = matches / attempts;
           $('.accuracy .value').text(accuracy.toFixed(2) * 100 + "%");
           console.log(accuracy);*/
       }
   }

}

function addClassHide(element){
    $(element).addClass('hide cantClick');
}

function removeClassHide(){
    $(first_card_clicked).removeClass('hide cantClick');
    $(second_card_clicked).removeClass('hide cantClick');
    first_card_clicked = null;
    second_card_clicked = null;
}

function doNotFlipCards(){
    console.log('WOOOOOWWWWW');
    $('.card').off("click", card_clicked);
}

function reFlipCards(){
   $('.card').on("click", card_clicked);
}

function reset_clicked(){
    console.log("RESETCLICK!!");
    games_played++;
    console.log("games played: ", games_played);
    reset_stats();
    display_stats();
}



function display_stats(){
var gamesValue = $('.games-played .value');
gamesValue.text(games_played);
var attemptsValue = $('.attempts .value');
attemptsValue.text(attempts);
var accuracyValue = $('.accuracy .value');
accuracyValue.text(Math.floor(accuracy.toFixed(2) * 100) + "%");
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();

}



