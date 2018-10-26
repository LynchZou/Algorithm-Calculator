var counters = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var intervals = [null, null, null, null, null, null, null, null, null];

 // set up text to print, each item in array is new line
var aText_cpp = new Array(
    "• Functional programming", 
    "• Lambda",
    "• Parallel Programming"
);
var aText_java = new Array(
    "• JSP/Servlet", 
    "• Multi-thread programming"
);
var aText_js = new Array(
    "• jQuery",
    "• AngularJS",
    "• Non-DOM Operations"
);
var aText_html = new Array(
    "• CSS Animation",
    "• BootStrap",
    "• SCSS"
);
var aText_php = new Array(
    "• Database Operation",
    "• File Uploading",
    "• Laravel (learning)"
);
var aText_python = new Array(
    "• Data Processing",
    "• Spyder",
    "• GUI"
);
var aText_mysql = new Array(
    "• Foreign Key Relation",
    "• Searching Algorithm"
);
var aText_mongo = new Array(
    "• Basic Operations"
);
var aText_doc = new Array(
    "• Detailed Documentation",
    "• Clean/Concise Layout"
);

var iSpeed; // time delay of print out
var iIndex; // start printing array at this posision
var iArrLength; // the length of the text array
var iScrollAt; // start scrolling up at this many lines
var activeBorder = $("#activeBorder");
var iTextPos; // initialise text position
var sContents; // initialise contents variable
var iRow; // initialise current row

$('document').ready(function() {

    $('#name-line').addClass("visible");
    $('#name').addClass("visible");
    $('#intro-button').addClass("visible");

    $('#show-profile').waypoint(function() {
        $('#profileWord').addClass("hovered");
        $('#profileSpan').addClass("hovered")
    });

    $('#show-education').waypoint(function(){
        $("#edu-home").css("opacity", 1);
        $("#educationWord").addClass("hovered");
        $("#educationSpan").addClass("hovered");
        $("#edu-left").addClass("hovered");
        $("#edu-line").addClass("hovered");
        $("#edu-right").addClass("hovered");
        $("#edu-left-1").addClass("hovered");
        $("#edu-right-1").addClass("hovered");
        $("#dot-circle-1-edu").addClass("hovered");
        $("#dot-circle-2-edu").addClass("hovered");
        setTimeout(function(){
            $("#triangle-left-1-edu").css("opacity", 1);
        }, 3000);
        setTimeout(function(){
            $("#triangle-right-1-edu").css("opacity", 1);
        }, 3500);
    });

    $('#show-skill').waypoint(function() {

        $("#skillsWord").addClass("hovered");
        $("#skillsSpan").addClass("hovered");
        
        intervals[0] = setInterval(increment_0_70, 30);
        intervals[1] = setInterval(increment_1_55, 30);
        intervals[2] = setInterval(increment_2_60, 30);
        intervals[3] = setInterval(increment_3_70, 30);
        intervals[4] = setInterval(increment_4_40, 30);
        intervals[5] = setInterval(increment_5_50, 30);
        intervals[6] = setInterval(increment_6_40, 30);
        intervals[7] = setInterval(increment_7_30, 30);
        intervals[8] = setInterval(increment_8_65, 30);
        this.destroy();

    });

    $("#show-experience").waypoint(function(){
        $("#icon-home").css("opacity", 1);
        $("#experienceWord").addClass("hovered");
        $("#experienceSpan").addClass("hovered");
        $("#experience-left").addClass("hovered");
        $("#experience-line").addClass("hovered");
        $("#experience-right").addClass("hovered");
        $("#event-left-1").addClass("hovered");
        $("#event-right-1").addClass("hovered");
        $("#dot-circle-1").addClass("hovered");
        $("#dot-circle-2").addClass("hovered");
        setTimeout(function(){
            $("#triangle-left-1").css("opacity", 1);
        }, 3000);
        setTimeout(function(){
            $("#triangle-right-1").css("opacity", 1);
        }, 3500);
    });

    $("#show-project").waypoint(function() {
        $("#projectWord").addClass("hovered");
        $("#projectSpan").addClass("hovered");
        $("#project-box-1").addClass("visible");
        $("#project-box-2").addClass("visible");
        $("#project-box-3").addClass("visible");
    });

    $("#show-contact").waypoint(function() {
        $("#contactWord").addClass("hovered");
        $("#contactSpan").addClass("hovered");
    });

    $("#project-box-1").on("mouseenter", function() {
        $("#project-link-1").addClass("visible");
    });

    $("#project-box-1").on("mouseleave", function() {
        $("#project-link-1").removeClass("visible");
    });

    $("#project-box-2").on("mouseenter", function() {
        $("#project-link-2").addClass("visible");
    });

    $("#project-box-2").on("mouseleave", function() {
        $("#project-link-2").removeClass("visible");
    });

    $("#project-box-3").on("mouseenter", function() {
        $("#project-link-3").addClass("visible");
    });

    $("#project-box-3").on("mouseleave", function() {
        $("#project-link-3").removeClass("visible");
    });

    $("#icon-1").on("click", function() {
        window.open("https://github.com/LynchZou/Genetic-Algorithm");
    });

    $("#icon-2").on("click", function() {
        window.open("https://github.com/LynchZou/Fanhao_Searcher");
    });

    $("#icon-3").on("click", function() {
        window.open("https://github.com/LynchZou/Syncamore-Calendar");
    });

    $("#website-icon").on("click", function() {
        window.open("http://lynchzou0114.com/genetic.html");
    });
 
    $(".skill").on("mouseenter", function(){

        $(this).find(".skillIntro").addClass("clicked");
        var language = $(this).find(".skillIntro").attr("id");

        if($(this).find(".skillIntro").attr("class").includes("clicked")){
            if(language == "cpp") {
                initTypeWriter(aText_cpp);
                typewriter_cpp();
            }
            else if(language == "java"){
                initTypeWriter(aText_java);
                typewriter_java();
            }
            else if(language == "js") {
                initTypeWriter(aText_js);
                typewriter_js();
            }
            else if(language == "html") {
                initTypeWriter(aText_html);
                typewriter_html();
            }
            else if(language == "php") {
                initTypeWriter(aText_php);
                typewriter_php();
            }
            else if(language == "python") {
                initTypeWriter(aText_python);
                typewriter_python();
            }
            else if(language == "mysql") {
                initTypeWriter(aText_mysql);
                typewriter_mysql();
            }
            else if(language == "mongo") {
                initTypeWriter(aText_mongo);
                typewriter_mongo();
            }
            else if(language == "doc") {
                initTypeWriter(aText_doc);
                typewriter_doc();
            }
        }
    });

    $(".skill").on("mouseleave", function(){
        $(this).find(".skillIntro").removeClass("clicked");
    });

    setInterval(function() {
        $("#selfing-sv").addClass("onhover");
        $("#selfing-sv").attr("src", "image/selfing_evolved_sv.png");
    }, 5000);

    setInterval(function() {
        $("#selfing-sv").removeClass("onhover");
        $("#selfing-sv").attr("src", "image/selfing_sv.png");
    }, 10000);

});

var increment_0_70 = function() {

    // deal with percentage
    counters[0]++;
    $("#prec-cpp").text(counters[0] + "%");
    if(counters[0] >= 70) {
        clearInterval(intervals[0]);
    }

    // deal with circle
    if (counters[0] <= 50){
        $("#activeBorder-cpp").css('background-image','linear-gradient(' + (90+counters[0]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }
    else if(counters[0] <= 70 && counters[0] > 50){
        $("#activeBorder-cpp").css('background-image','linear-gradient(' + (counters[0]*3.6-90) + 'deg, transparent 50%, rgb(136, 231, 112) 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }
}


var increment_1_55 = function() {

    // deal with percentage
    counters[1]++;
    $("#prec-java").text(counters[1] + "%");
    if(counters[1] >= 55) {
        clearInterval(intervals[1]);
    }

    // deal with circle
    if (counters[1] <= 50){
        $("#activeBorder-java").css('background-image','linear-gradient(' + (90+counters[1]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }
    else {
        $("#activeBorder-java").css('background-image','linear-gradient(' + (counters[1]*3.6-90) + 'deg, transparent 50%, rgb(136, 231, 112) 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }
}

var increment_2_60 = function() {

    // deal with percentage
    counters[2]++;
    $("#prec-js").text(counters[2] + "%");
    if(counters[2] >= 60) {
        clearInterval(intervals[2]);
    }

    // deal with circle
    if (counters[2] <= 50){
        $("#activeBorder-js").css('background-image','linear-gradient(' + (90+counters[2]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }
    else {
        $("#activeBorder-js").css('background-image','linear-gradient(' + (counters[2]*3.6-90) + 'deg, transparent 50%, rgb(136, 231, 112) 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }

}

var increment_3_70 = function() {

    // deal with percentage
    counters[3]++;
    $("#prec-html").text(counters[3] + "%");
    if(counters[3] >= 70) {
        clearInterval(intervals[3]);
    }

    // deal with circle
    if (counters[3] <= 50){
        $("#activeBorder-html").css('background-image','linear-gradient(' + (90+counters[3]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }
    else {
        $("#activeBorder-html").css('background-image','linear-gradient(' + (counters[3]*3.6-90) + 'deg, transparent 50%, rgb(136, 231, 112) 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }

}

var increment_4_40 = function() {


    // deal with percentage
    counters[4]++;
    $("#prec-php").text(counters[4] + "%");
    if(counters[4] >= 40) {
        clearInterval(intervals[4]);
    }

    $("#activeBorder-php").css('background-image','linear-gradient(' + (90+counters[4]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
}

var increment_5_50 = function() {


    // deal with percentage
    counters[5]++;
    $("#prec-python").text(counters[5] + "%");
    if(counters[5] >= 50) {
        clearInterval(intervals[5]);
    }

    $("#activeBorder-python").css('background-image','linear-gradient(' + (90+counters[5]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
}

var increment_6_40 = function() {


    // deal with percentage
    counters[6]++;
    $("#prec-mysql").text(counters[6] + "%");
    if(counters[6] >= 40) {
        clearInterval(intervals[6]);
    }

    $("#activeBorder-mysql").css('background-image','linear-gradient(' + (90+counters[6]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
}

var increment_7_30 = function() {


    // deal with percentage
    counters[7]++;
    $("#prec-mongo").text(counters[7] + "%");
    if(counters[7] >= 30) {
        clearInterval(intervals[7]);
    }

    $("#activeBorder-mongo").css('background-image','linear-gradient(' + (90+counters[7]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
}

var increment_8_65 = function() {


    // deal with percentage
    counters[8]++;
    $("#prec-doc").text(counters[8] + "%");
    if(counters[8] >= 65) {
        clearInterval(intervals[8]);
    }

    // deal with circle
    if (counters[8] <= 50){
        $("#activeBorder-doc").css('background-image','linear-gradient(' + (90+counters[8]*3.6) + 'deg, transparent 50%, whitesmoke 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }
    else {
        $("#activeBorder-doc").css('background-image','linear-gradient(' + (counters[8]*3.6-90) + 'deg, transparent 50%, rgb(136, 231, 112) 50%),linear-gradient(90deg, whitesmoke 50%, transparent 50%)');
    }

}


/* type writer */

function initTypeWriter (aText_type) {
    iSpeed = 50; // time delay of print out
    iIndex = 0; // start printing array at this posision
    iArrLength = aText_type[0].length;
    iScrollAt = 20; // start scrolling up at this many lines
    iTextPos = 0; // initialise text position
    sContents = ''; // initialise contents variable
}

function typewriter_cpp()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_cpp[iRow++] + '<br />';
    }

    var destination = $(".skill #cpp");
    destination.html(sContents + aText_cpp[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_cpp.length ) {
            iArrLength = aText_cpp[iIndex].length;
            setTimeout("typewriter_cpp()", 500);
        }
    } else {
        setTimeout("typewriter_cpp()", iSpeed);
    }
}

function typewriter_java()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_java[iRow++] + '<br />';
    }

    var destination = $(".skill #java");
    destination.html(sContents + aText_java[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_java.length ) {
            iArrLength = aText_java[iIndex].length;
            setTimeout("typewriter_java()", 500);
        }
    } else {
        setTimeout("typewriter_java()", iSpeed);
    }
}

function typewriter_js()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_js[iRow++] + '<br />';
    }

    var destination = $(".skill #js");
    destination.html(sContents + aText_js[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_js.length ) {
            iArrLength = aText_js[iIndex].length;
            setTimeout("typewriter_js()", 500);
        }
    } else {
        setTimeout("typewriter_js()", iSpeed);
    }
}

function typewriter_html()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_html[iRow++] + '<br />';
    }

    var destination = $(".skill #html");
    destination.html(sContents + aText_html[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_html.length ) {
            iArrLength = aText_html[iIndex].length;
            setTimeout("typewriter_html()", 500);
        }
    } else {
        setTimeout("typewriter_html()", iSpeed);
    }
}

function typewriter_php()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_php[iRow++] + '<br />';
    }

    var destination = $(".skill #php");
    destination.html(sContents + aText_php[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_php.length ) {
            iArrLength = aText_php[iIndex].length;
            setTimeout("typewriter_php()", 500);
        }
    } else {
        setTimeout("typewriter_php()", iSpeed);
    }
}

function typewriter_python()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_python[iRow++] + '<br />';
    }

    var destination = $(".skill #python");
    destination.html(sContents + aText_python[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_python.length ) {
            iArrLength = aText_python[iIndex].length;
            setTimeout("typewriter_python()", 500);
        }
    } else {
        setTimeout("typewriter_python()", iSpeed);
    }
}

function typewriter_mysql()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_mysql[iRow++] + '<br />';
    }

    var destination = $(".skill #mysql");
    destination.html(sContents + aText_mysql[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_mysql.length ) {
            iArrLength = aText_mysql[iIndex].length;
            setTimeout("typewriter_mysql()", 500);
        }
    } else {
        setTimeout("typewriter_mysql()", iSpeed);
    }
}

function typewriter_mongo()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_mongo[iRow++] + '<br />';
    }

    var destination = $(".skill #mongo");
    destination.html(sContents + aText_mongo[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_mongo.length ) {
            iArrLength = aText_mongo[iIndex].length;
            setTimeout("typewriter_mongo()", 500);
        }
    } else {
        setTimeout("typewriter_mongo()", iSpeed);
    }
}

function typewriter_doc()
{
    sContents =  ' ';
    iRow = Math.max(0, iIndex-iScrollAt);
 
    while (iRow < iIndex ) {
        sContents += aText_doc[iRow++] + '<br />';
    }

    var destination = $(".skill #doc");
    destination.html(sContents + aText_doc[iIndex].substring(0, iTextPos));

    if ( iTextPos++ == iArrLength ) {
        iTextPos = 0;
        iIndex++;
        if ( iIndex != aText_doc.length ) {
            iArrLength = aText_doc[iIndex].length;
            setTimeout("typewriter_doc()", 500);
        }
    } else {
        setTimeout("typewriter_doc()", iSpeed);
    }
}
