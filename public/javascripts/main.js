$(document).ready(function() {
    console.log('ready!');
    $('.userChoice').on('click', function(e) {
        let choiceLabel = $($(e.target).children('.userLabel')).html();

        switch(choiceLabel) {
            case 'Customer':
                window.location.href = 'views/customer.php';
                break;
            case 'Staff':
                break;
            case 'Owner':
                break;
            default:
                break;
        }
    })
})
function testReq() {
    $.ajax({
        type: 'POST',
        url: '/order',
        data: {
            data: 'testData'
        },
        success: (data) => {
            console.log(data);
        },
        err: (err) => {
            console.log(err);
        }
    })
}