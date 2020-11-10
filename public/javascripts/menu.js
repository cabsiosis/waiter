$(document).ready(function() {
    console.log('ready!');
    $('#cartButton').on('click', function() {
        $('#cart').slideToggle(500);
    })
});