

$(document).ready(function(){

    if(getGender() == 0) {
        $("#enteredMessage img").attr("src", "image/girl.jpeg");
    }
    else {
        $("#enteredMessage img").attr("src", "image/boy.jpg");
    }

    $('form').on('submit', function (e) {

        // process data string
        var comment = $("#mytext").val();
        var username = $("#myusername").val();
        var dataString = "comment=" + comment + "&username=" + username + "&gender=";
        if(getGender() == 1){
            dataString += "male";
        }
        else {
            dataString += "female";
        }

        // process output string
        var printstr =  '<div class="userSingleMessage">';
        if(getGender() == 1) {
            printstr += '<img src="image/boy.jpg" ';
            printstr += 'class="userDisplayImg"><p class="userUsername">';
            printstr += username;
            printstr += '</p><span class="arrow-right"></span><p class="userTextStyle">';
        }
        else {
            printstr += '<img src="image/girl.jpeg" ';
            printstr += 'class="userDisplayImg"><p class="userUsername" style="font-size: 15px;">';
            printstr += username;
            printstr += '</p><span class="arrow-right" style="border-left: 15px solid #dbce1054;"></span><p class="userTextStyle" style="background: #dbce1054;">';
        }
        printstr += (comment + '</p><div style="clear: both;"></div></div><br><br><br>');

        $.ajax({
            type: 'post',
            url: 'php/input.php',
            data: dataString,
            success: function (mydata) {

                // insert spinner first
                spinnerstr = '<div id="tempSpinner" class="lynchMessage"></br>' + 
                            '<img src="image/my2.jpeg" class="lynchDisplayImg">' +
                            '<p class="usernameSpecial">Lynch</p>' + 
                            '<span class="Lynch-arrow-left"></span>' + 
                            '<div class="lynchTextStyle spinner">' +
                            '<div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>' + 
                            '<div style="clear: both;"></div></div><br><br><br><br>'
                scrollDown();
                var y = $("#insertResponse").before(y+printstr+spinnerstr).fadeIn(500);
                setTimeout(function(){
                    $("#tempSpinner").removeClass("spinner");
                    $("#tempSpinner .lynchTextStyle").replaceWith(mydata);
                    $("#tempSpinner").removeAttr("id");
                }, 2500);
            },
            error: function () {
                alert("There is an error somewhere!");
            }
        });
        e.preventDefault();
    });
});

var count = 0;
function switchImg(){
    if(count%2 ===0){
        $("#icon").attr("src", "image/boy.jpg");
        $("#enteredMessage img").attr("src", "image/boy.jpg");
    }
    else{
        $("#icon").attr("src", "image/girl.jpeg");
        $("#enteredMessage img").attr("src", "image/girl.jpeg");
    }
    count += 1;
}

function getGender() {
    return count%2;
}


var chatMessages = [{
    name: "ms1",
    msg: "Who are you?",
    delay: 1000,
    align: "right",
    showTime: true,
    time: "19:58"
}];
var chatDelay = 0;

// auto scroll down
function scrollDown() {
    $('#messageField').animate({
        scrollTop: $('#messageField').prop('scrollHeight')
    });
};

// < 410