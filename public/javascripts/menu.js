$(document).ready(function () {
    let currency = '$'; 
    let orderID = 0;    //subject to change

    // get items from db on page load
    $('body').fadeIn(750, function () {
        $.ajax({
            type: 'GET',
            url: '../server/db.php',
            dataType: 'JSON',
            success: (data) => {
                for (var el of data) {
                    let productCard =
                        `<div class="itemCard">
                            <div class="itemName">${el.f_name}</div>
                            <div class="itemPrice">${el.f_currency + el.f_price}</div>
                            <div class="itemOptions">
                                <form class="itemForm">
                                    <label class="formLabel" for="amountForm">Amount: </label>
                                    <input class="itemAmount" type="number" name="amountForm" value="1" />
                                    <button type="button" class="addButton">Add!</button>
                                </form>
                            </div>
                        </div>`
                    $('#' + el.f_type).append(productCard);
                }
                console.log(data);
            },
            error: (err) => {
                console.log(err);
            }
        });

        // toggle cart on or off
        let isCart = false;
        $('body').on('click', function(e) {
            let targetChildren = Object.values($(e.target).find('*'));
            let cartChildren = Object.values($('#cart').find('*'));
            
            // still needs fixing but main function works
            if (!cartChildren.some(q => targetChildren.includes(q))) { isCart = false; } 
            if (e.target.id === 'cartArea') { isCart = true; }
            if (isCart === true) {
                $('#cart').show('slide', { direction: 'right', easing: 'swing', duration: '250' });
            } else {
                $('#cart').hide('slide', { direction: 'right', easing: 'swing', duration: '250' });
            }
        })

        // card selector handler
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

        // add cart items
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

        // order handler
        $('#orderButton').on('click', function(e) {
            if (cartTotal > 0) {
                $.ajax({
                    type: 'POST',
                    url: '../server/order.php',
                    data: {
                        orderID: 'order#' + orderID,
                        due: cartTotal,
                        orderState: 'PENDING'
                    },
                    success: (data) => {
                        console.log(data);
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
            }
            orderID++;  // subject to change
        })

        
    });
});