$(document).ready(function(){

    $("body").fadeIn(1000);

    /* profile */
    $("#infoText").click(function(){
        if($("#info").css("display") == "none"){
            $("#info").slideDown(1000);
        }
        else{
            $("#info").slideUp(1000);
        }
    });

    $("#educationText").click(function(){
        if($("#education").css("display") == "none"){
            $("#education").slideDown(1000);
        }
        else{
            $("#education").slideUp(1000);
        }
    });

    $("#skillText").click(function(){
        if($("#skills").css("display") == "none"){
            $("#skills").slideDown(1000);
        }
        else{
            $("#skills").slideUp(1000);
        }
    });

    $("#experienceText").click(function(){
        if($("#experience").css("display") == "none"){
            $("#experience").slideDown(1000);
        }
        else{
            $("#experience").slideUp(1000);
        }
    });

});

function FadeToProject(){
    $("#outercontainer").fadeOut(1000);
    setTimeout(function(){
        $(location).attr("href","project.html");
    }, 1000);
}

function FadeToResume(){
    $("#outercontainer").fadeOut(1000);
    setTimeout(function(){
        $(location).attr("href","resume.html");
    }, 1000);
}

function FadeToContact(){
    $("#outercontainer").fadeOut(1000);
    setTimeout(function(){
        window.location.href = "contact.php";
    }, 1000);
}