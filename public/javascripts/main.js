$(document).ready(function() {
    console.log('ready!');
    $('.userChoice').on('click', function(e) {
        let choiceLabel = $($(e.target).children('.userLabel')).html();

        $('body').fadeOut(750, function () {
            switch (choiceLabel) {
                case 'Customer':
                    window.location.href = 'views/customer.html';
                    break;
                case 'Staff':
                    window.location.href = 'views/staff.html';
                    break;
                case 'Owner':
                    window.location.href = 'views/owner.html';
                    break;
                default:
                    break;
            }
        });
        
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