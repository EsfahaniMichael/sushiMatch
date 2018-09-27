$(document).ready(initializeApp);


function initializeApp(){
    addClickHandler();
}

function addClickHandler(){
    $('.card').click(card_clicked);
}
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

function card_clicked(){

   if (first_card_clicked === null){
      first_card_clicked = $(event.currentTarget);
      addClassHide(first_card_clicked);
   }
   else{
       second_card_clicked = $(event.currentTarget);
        addClassHide(second_card_clicked);

       if(first_card_clicked.find('.front').css('background-image') ==
       second_card_clicked.find('.front').css('background-image')){
        console.log("HEYYY THEY ARE THE SAME!!");
        match_counter++;
        first_card_clicked = null;
        second_card_clicked = null;
        console.log(match_counter);
        if(match_counter === total_possible_matches){
            console.log("YOU HAVE WON!!!!!!!!!");
        }
        else{
            console.log("Not enough points to win, YET")
            return;
        }
       }
       else{
           setTimeout(removeClassHide, 2000);
           console.log("The pairs are not the same");
       }
   }
}

function addClassHide(element){
    element.addClass('hide');
}

function removeClassHide(){
    first_card_clicked.removeClass('hide');
    second_card_clicked.removeClass('hide');
    first_card_clicked = null;
    second_card_clicked = null;
}


