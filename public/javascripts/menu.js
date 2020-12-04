$(document).ready(function () {
    let currency;
    let orderID = 0;    //subject to change

    // get items from db on page load
    $('body').fadeIn(750, function () {
        $.ajax({
            type: 'GET',
            url: '../server/db.php',
            dataType: 'JSON',
            success: (data) => {
                for (var el of data) {
                    currency = el.f_currency;
                    let productCard =
                        `<div class="itemCard">
                            <iframe src="${el.f_image} class="foodImage"></iframe>
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
            let ignoreArr = ['foodImage','itemName', 'itemPrice', 'itemOptions', 'itemForm', 'formLabel', 'itemAmount', 'addButton'];
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
        let orderItems = "";
        $('#itemCollection').on('click', '.addButton', function(e) {
            let formElem = $(e.target).siblings('.itemAmount');
            let itemAmount = $(formElem).val();
            let itemName = $(e.target).parents('.itemOptions').siblings('.itemName');
            let itemPrice = $(e.target).parents('.itemOptions').siblings('.itemPrice').html().replace(currency, '');
            let totalPrice = parseInt(itemPrice) * $(formElem).val();
            cartTotal += totalPrice;

            let cartTableElem = 
                `<tr>
                    <td>${itemName.html()}</td>
                    <td>${$(formElem).val()}</td>
                    <td>${totalPrice}</td>
                </tr>`

            orderItems += itemName.html() + ':' + itemAmount + ',';
            $('#cartItemContainer table tbody').append(cartTableElem);
            $('#totalPrice').html('Total: ' + currency + String(cartTotal));
        });

        // order handler
        $('#orderButton').on('click', function(e) {
            if (cartTotal > 0) {
                console.log(orderItems);
                $.ajax({
                    type: 'GET',
                    url: '../server/order_2.php',
                    success: (data) => {
                        let orderObj = JSON.parse(data); 
                        orderID = parseInt(orderObj[0].maxID);
                        if (isNaN(orderID)) { orderID = 0; }
                        $.ajax({
                            type: 'POST',
                            url: '../server/order_1.php',
                            data: {
                                orderID: ++orderID,
                                items: orderItems,
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
                    },
                    error: (err) => { console.log(err); }
                });
                
            }
        })

        
    });
});