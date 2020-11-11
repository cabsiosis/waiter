$(document).ready(function() {
    $.ajax({
        type: 'GET',
        url: '../db/db.php',
        dataType: 'JSON',
        success: (data) => {
            for (var el of data) {
                let productCard = 
                `<div class="itemCard">
                    <div class="itemName">${el.name}</div>
                    <div class="itemPrice">${'$' + el.price}</div>
                </div>`
                $('#' + el.type).append(productCard);
            }
        },
        error: (err) => {
            console.log('error:' + err);
        }
    });

    $('#cartArea').hover(function() {
        $('#cart').slideDown(250);
    }, function() {
        $('#cart').slideUp(250);
    })
});