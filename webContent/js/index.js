$(document).ready(function(){

    setTimeout(function(){
        $("#music audio")[0].play();
    }, 1000);

    /* poem */
    setTimeout(function(){
        $("#p1").fadeIn(2000);
    }, 3000);
    setTimeout(function(){
        $("#p2").fadeIn(2000);
    }, 5000);
    setTimeout(function(){
        $("#p3").fadeIn(2000);
    }, 7000);
    setTimeout(function(){
        $("#p4").fadeIn(2000);
    }, 9000);
    setTimeout(function(){
        $("#p5").fadeIn(2000);
    }, 11000);
    setTimeout(function(){
        $("#p6").fadeIn(2000);
    }, 13000);
    setTimeout(function(){
        $("#p7").fadeIn(2000);
    }, 15000);
    setTimeout(function(){
        $("#p8").fadeIn(2000);
    }, 17000);
    setTimeout(function(){
        $("#p9").fadeIn(2000);
    }, 19000);
    setTimeout(function(){
        $("#p10").fadeIn(2000);
    }, 21000);
    setTimeout(function(){
        $("#p11").fadeIn(2000);
    }, 23000);
    setTimeout(function(){
        $("#p12").fadeIn(2000);
    }, 25000);
    setTimeout(function(){
        $("#p13").fadeIn(2000);
    }, 27000);
    setTimeout(function(){
        $("#p14").fadeIn(2000);
    }, 29000);
    setTimeout(function(){
        $("#p15").fadeIn(2000);
    }, 31000);
    setTimeout(function(){
        $("#p16").fadeIn(2000);
    }, 33000);
    setTimeout(function(){
        $("#p17").fadeIn(2000);
    }, 35000);
    setTimeout(function(){
        $("#p18").fadeIn(2000);
    }, 37000);
    setTimeout(function(){
        $("#p19").fadeIn(2000);
    }, 39000);
    setTimeout(function(){
        $("#p20").fadeIn(2000);
    }, 41000);
    setTimeout(function(){
        $("#p21").fadeIn(2000);
    }, 43000);

    setTimeout(function(){
        $(".transparent").fadeOut(1000);
    }, 48000);

    /* ask */
    setTimeout(function(){
        $("#ask1").fadeIn(2000).fadeOut(2000);
    }, 50000);
    setTimeout(function(){
        $("#ask2").fadeIn(2000).fadeOut(2000);
    }, 54000);
    setTimeout(function(){
        $("#ask3").fadeIn(2000).fadeOut(2000);
    }, 58000);
    setTimeout(function(){
        $("#ask4").fadeIn(2000).fadeOut(2000);
    }, 62000);

    /* profile */
    setTimeout(function(){
        $(location).attr("href","profile.php");
    }, 66000);


});

var audio = document.getElementById("backmusic");
audio.volume = 0.4;

function jump(){
    $("#outercontainer").fadeOut(3000);
    setTimeout(function(){
        $(location).attr("href","profile.php");
    }, 3000);
}