$(document).ready(function() {
    $('body').fadeIn(750, function() {
        $.ajax({
            type: 'GET',
            url: '../server/order_1.php',
            dataType: 'JSON',
            success: (data) => {
                for (var el of data) {
                    let orderRow = 
                    `<tr>
                        <td class="orderID">${el.id}</td>
                        <td class="orderCost">${el.cost}</td>
                        <td class="orderStatus">${el.orderState}</td>
                        <td id="orderAction">
                            <button type="button" class="orderResolve">Resolve</button>
                            <button type="button" class="orderVoid">Void</button>
                        </td>
                    <tr>`;
                    $('#orderList tbody').append(orderRow);
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
        $('tbody').on('click', '.orderResolve', function(e) {
            let resolveObj = $(e.target).parent().siblings('.orderID');
            let costObj = $(e.target).parent().siblings('.orderCost');
            let statusObj = $(e.target).parent().siblings('.orderStatus');
            statusObj.html('COMPLETED');

            // delete from orderlist
            $.ajax({
                type: 'POST',
                url: '../server/order_2.php',
                data: {
                    id: resolveObj.html()
                },
                success: (data) => {
                    console.log(data);
                },
                error: (err) => {
                    console.log(err);
                }
            });

            // add to owner statistic report
            $.ajax({
                type: 'POST',
                url: '../server/statistic-profit.php',
                data: {
                    id: resolveObj.html(),
                    cost: costObj.html(),
                },
                success: (data) => {
                    console.log(data);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });
        $('tbody').on('click', '.orderVoid', function(e) {
            let voidObj = $(e.target).parent().siblings('.orderID');
            let statusObj = $(e.target).parent().siblings('.orderStatus');
            statusObj.html('VOIDED');

            // delete from orderlist
            $.ajax({
                type: 'POST',
                url: '../server/voidOrder.php',
                data: {
                    id: voidObj.html()
                },
                success: (data) => {
                    console.log(data);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });
    });
});