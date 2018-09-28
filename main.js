$(document).ready(initializeApp);




var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

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
            console.log("this is the attempts", attempts);
            second_card_clicked = event.currentTarget;


           if ($(first_card_clicked).find('.front').css('background-image') ===
               $(second_card_clicked).find('.front').css('background-image'))
           {
               console.log("HEYYY THEY ARE THE SAME!!");
               match_counter++;
               matches++;
               first_card_clicked = null;
               second_card_clicked = null;

               if (match_counter === total_possible_matches) {
                   console.log("YOU HAVE WON!!!!!!!!!");
               }
               else {
                   console.log("Not enough points to win, YET")
                   return;
               }
           }
           else {
               doNotFlipCards();
               setTimeout(removeClassHide, 2000);
               setTimeout(reFlipCards, 3000);
               console.log("The pairs are not the same");
           }
           accuracy = matches / attempts;
           console.log(accuracy);
       }
   }
}

function addClassHide(element){
    $(element).addClass('hide');
}

function removeClassHide(){
    $(first_card_clicked).removeClass('hide');
    $(second_card_clicked).removeClass('hide');
    first_card_clicked = null;
    second_card_clicked = null;
}

function doNotFlipCards(){
    console.log('WOOOOOWWWWW');
    $('.card').off();
}

function reFlipCards(){
   $('.card').on("click", card_clicked);
}

function reset_clicked(){
    console.log("RESETCLICK!!");
    games_played++;
    console.log("games played: ", games_played);
}



function display_stats(){

}



