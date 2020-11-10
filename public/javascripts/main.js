$(document).ready(function() {
    console.log('ready!');
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