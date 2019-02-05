$(document).ready(initializeApp);




var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;


function makeCardArray(){
    var classList = [];
    for(var classCounter = 1; classCounter<10; classCounter++){
        classList.push( 'front'+classCounter);
    }
    classList = classList.concat(classList);
    var secondClassList = [];

    while (classList.length > 0){
        var addingIntoSecondClassList = classList.splice(Math.floor(Math.random() * classList.length),1);
        secondClassList.push(addingIntoSecondClassList);
    }
    createCards(secondClassList);
}

function createCards(secondClassList){

        for (var ccIndex = 0; ccIndex < 18; ccIndex++) {
            var cardBig = $('<div>').addClass('card');
            var frontCard = $('<div>').addClass('front ' + secondClassList[ccIndex] + '');           
            var backCard = $('<div>').addClass('back cursorPointer');
            cardBig.append(frontCard);
            cardBig.append(backCard);
            $('.game-area').append(cardBig);
        }
}


function initializeApp(){
    makeCardArray();
    addClickHandler();
    $('.winnerContainer').hide();

}


function addClickHandler(){
    $('.card').on("click", card_clicked);
    $('.resetButton').on("click", reset_clicked);
    $('.playAgain').on("click", reset_clicked);
    // $(".playagain").on('click', playAgain);
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
            second_card_clicked = event.currentTarget;
           if ($(first_card_clicked).find('.front').css('background-image') ===
               $(second_card_clicked).find('.front').css('background-image'))
           {
               $(first_card_clicked).off("click", card_clicked);
               $(second_card_clicked).off("click", card_clicked);
               $(first_card_clicked).find('.front').addClass("hidingCard");
               $(second_card_clicked).find('.front').addClass("hidingCard");
               matches++;
               first_card_clicked = null;
               second_card_clicked = null;

               accuracy = matches / attempts;
               $('.accuracy .value').text(Math.floor(accuracy.toFixed(2) * 100) + "%");
               if (matches === total_possible_matches) {
                showWinModal();
                return;
               }
               else {
                   return;
               }

           }
           else {
               accuracy = matches / attempts;
               $('.accuracy .value').text(Math.floor(accuracy.toFixed(2) * 100) + "%");
               doNotFlipCards();
               $(first_card_clicked).find('.front').addClass("wrongMatch");
               $(second_card_clicked).find('.front').addClass("wrongMatch");
               setTimeout(removeClassHide, 1000);
              setTimeout(reFlipCards, 1300);

           }
       }
   }

}



function addClassHide(element){
    $(element).addClass('hideCard cantClick');
}

function hideFullCard(e){
    $(e).addClass('hideCard');
}

function removeClassHide(){
    $(first_card_clicked).removeClass('hideCard cantClick');
    $(second_card_clicked).removeClass('hideCard cantClick');
    $(first_card_clicked).find('.front').removeClass("wrongMatch");
    $(second_card_clicked).find('.front').removeClass("wrongMatch");
    first_card_clicked = null;
    second_card_clicked = null;
}

function doNotFlipCards(){
    $('.card').off("click", card_clicked);
}

function reFlipCards(){
   $('.card').on("click", card_clicked);
}

function reset_clicked(){
    games_played++;
    reset_stats();
    display_stats();
    $('.card').remove();
    makeCardArray();
    $('.card').on("click", card_clicked);
    first_card_clicked = null;
    second_card_clicked = null;
    hideWinModal();

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

function hideWinModal(){
    $('.modal-backdrop').addClass('displaynone')
    $('.win-modal').removeClass('show');
    $('.modal-background').removeClass('show2');
    $('.modal-background').addClass('hidden2');
    $('.win-modal').addClass('hidden');
}

function showWinModal(){
    $('.modal-backdrop').removeClass('displaynone')
    $('.modal-background').removeClass('hidden2 displaynone');
    $('.win-modal').removeClass('hidden displaynone')
    $('.modal-background').addClass('show2');
    $('.win-modal').addClass('show');
}






