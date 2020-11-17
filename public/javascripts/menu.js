$(document).ready(function () {
    let currency = '$';
    $('body').fadeIn(750, function () {
        $.ajax({
            type: 'GET',
            url: '../db/db.php',
            dataType: 'JSON',
            success: (data) => {
                for (var el of data) {
                    let productCard =
                        `<div class="itemCard">
                            <div class="itemName">${el.name}</div>
                            <div class="itemPrice">${currency + el.price}</div>
                            <div class="itemOptions">
                                <form class="itemForm">
                                    <label class="formLabel" for="amountForm">Amount: </label>
                                    <input class="itemAmount" type="number" name="amountForm" value="1" />
                                    <button type="button" class="addButton">Add!</button>
                                </form>
                            </div>
                        </div>`
                    $('#' + el.type).append(productCard);
                }
            },
            error: (err) => {
                console.log('error:' + err);
            }
        });

        $('#cartArea').hover(function () {
            $('#cart').show('slide', { direction: 'right', easing: 'swing', duration: '250' });
        }, function () {
            $('#cart').hide('slide', { direction: 'right', easing: 'swing', duration: '250' });
        })

        let isSelected = true;
        $('#itemCollection').on('click', '.itemCard', function (e) {  
            let selectedItem = e.target;         
            let targetClass = $(e.target).attr('class');
            let ignoreArr = ['itemName', 'itemPrice', 'itemOptions', 'itemForm', 'formLabel', 'itemAmount', 'addButton'];
            if (isSelected) {
                if (ignoreArr.some(q => targetClass.includes(q))) {
                    selectedItem = $(e.target).parent('.itemCard');
                }
                
                $(selectedItem.children('.itemOptions')).slideDown();
            } else {
                if (ignoreArr.some(q => targetClass.includes(q))) {
                    selectedItem = $(e.target).parent('.itemCard');
                }
               
                $(selectedItem.children('.itemOptions')).slideUp();
            }
            isSelected = !isSelected;
        });

        let cartTotal = 0;
        $('#itemCollection').on('click', '.addButton', function(e) {
            let itemName = $(e.target).parents('.itemOptions').siblings('.itemName');
            let formElem = $(e.target).siblings('.itemAmount');
            let itemPrice = $(e.target).parents('.itemOptions').siblings('.itemPrice').html().replace(currency, '');
            let totalPrice = parseInt(itemPrice) * $(formElem).val();
            cartTotal += totalPrice;

            let cartTableElem = 
                `<tr>
                    <td>${itemName.html()}</td>
                    <td>${$(formElem).val()}</td>
                    <td>${totalPrice}</td>
                </tr>`
            $('#cartItemContainer table tbody').append(cartTableElem);
            $('#totalPrice').html('Total: ' + currency + String(cartTotal));
        });

        $('#orderButton').on('click', function(e) {
            console.log('order!');
        })
    });
});