/*********************************************************************************

AUTOR INFORMATION
********************
@AUTHOR:            Janis Hau
@AUTHOR_EMAIL:      hau@haulyshit.de
@AUTHOR_WEBSITE:    haulyshit.de
****************************************

INTRODUCE
**********
- This script file ist jQuery (v.2.xxx) based.
- All function-snippets will be write in their own namend function and they will
  be called in the resize function. So far it is neccessary. ;)


RESIZE
**********
- The resize() will be used for the methodlogy "don't repeat yourself". So,
  you call it in the document ready scope, resize and something else.
- In the head of the resize() call are all variables they are needed.
- All objects should be give as a string.


DECLARED VARS
********************
- $var this vars are dom-cached objects.

*********************************************************************************/





/*********************************************************************************
haulyShow
*********

haulyShow is a rudimentary responsiv percentage based slideShow.
- One figure = one slide
*********************************************************************************/
var count = 0;

function haulyShow() {
    var $haulyShow = $('.haulyShow'),
        $figure = $haulyShow.children('figure'),
        npos = 0;

    // - Append the viewport
    // - Append the controls
    if ($('.haulyShow__viewport').length == 0) {

        $haulyShow.append('<div class="haulyShow__viewport" style="width: ' + (100 * $figure.length) + '%" data-pos="0%"></div><div class="haulyShow__controls"><button class="haulyshow--prev">PREV</button><button class="float--right haulyshow--next">NEXT</button></div>');
    }

    // - Give the slides, the width in percent
    // - Append the slides in the viewport
    // - Write the Data-images/caption in the figures
    $figure.css('width', (100 / $figure.length) + '%').appendTo('.haulyShow__viewport').each(function () {
        var imgUrl = $(this).attr('data-image'),
            caption = $(this).attr('data-caption');

        $(this).append('<img src="' + imgUrl + '" /><figcaption>' + caption + '</figcaption');
    });


    //Next and previous function
    function haulyShowNext() {
        if (count < $figure.length - 1) {
            count++;
            npos = 100 * (count * -1) + '%';
            $haulyShow.children('.haulyShow__viewport').css('left', npos).attr('data-pos', npos);
        }
    }

    function haulyShowPrev() {
        if (count > 0 && count > $figure.length - 1) {
            count--;
            npos = 100 * (count * -1) + '%';
            $haulyShow.children('.haulyShow__viewport').css('left', npos).attr('data-pos', npos);
        }
    }

    //Triggers
    // NEXT BUTTON
    $('.haulyshow--next').click(function () {
        haulyShowNext();
    });
    //PREV BUTTON
    $('.haulyshow--prev').click(function () {
        haulyShowPrev();
    });

}


/*********************************************************************************
#RESIZE
*********************************************************************************/
function resize() {
    var windowWidth = $(window).width(),     // window width
        windowHeight = $(window).height(),   // window height
        mobileWidth = 640

    haulyShow();
}
//RESIZE END


// $(function() {
$(document).ready(function () {
    haulyShow();
    resize();
});

$(window).resize(function () {
    resize();
});

// });