$(document).ready(function() {
    $('body').fadeIn(750, function() {
        $.ajax({
            type: 'GET',
            url: '../server/order.php',
            dataType: 'JSON',
            success: (data) => {
                console.log(data);
                for (var el of data) {
                    let orderRow = 
                    `<tr>
                        <td>${el.id}</td>
                        <td>${el.due}</td>
                        <td>${el.orderState}</td>
                        <td id="orderAction">
                            <button type="button" id="orderResolve">Resolve</button>
                            <button type="button" id="orderVoid">Void</button>
                        </td>
                    <tr>`;
                    $('#orderList tbody').append(orderRow);
                }
                
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});