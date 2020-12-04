$(document).ready(function() {
    const timeElapsed = Date.now();
    const latestDate = new Date(timeElapsed);

    $('body').fadeIn(750, function() {
        $.ajax({
            type: 'GET',
            url: '../server/statistic-stocks.php',
            dataType: 'JSON',
            success: (data) => {
                for (var el of data) {
                    let statsRow = 
                    `<tr>
                        <td class="itemName">${el.f_name}</td>
                        <td class="itemStock">${el.f_stock}</td>
                        <td class="itemStock">${latestDate.toUTCString()}</td>
                    <tr>`;
                    $('#statsList tbody').append(statsRow);
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
        $.ajax({
            type: 'GET',
            url: '../server/statistic-profit.php',
            dataType: 'JSON',
            success: (data) => {
                for (var el of data) {
                    let profitsRow = 
                    `<tr>
                        <td class="itemName">${el.gained}</td>
                        <td class="itemStock">${el.dateAchieved}</td>
                    <tr>`;
                    $('#profitsList tbody').append(profitsRow);
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    });
});