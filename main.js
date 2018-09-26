$(document).ready(initializeApp())


function initializeApp(){
    addClickHandler();
    console.log('wow')
}

function addClickHandler(){
    $('.back').click(card_clicked);
    console.log('boo')
}
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

function card_clicked(){
    $(this).removeClass('back')
    console.log('hi')
}
