/*********************************************************************************
 * AUTOR INFORMATION
 * ********************
 * @AUTHOR:            Janis Hau
 * @AUTHOR_EMAIL:      hau@haulyshit.de
 * @AUTHOR_WEBSITE:    haulyshit.de
 *
 *
 * INTRODUCE
 * **********
 * haulyShow is a rudimentary responsiv, percent-based slideShow.
 *
 * - One figure = one slide
 * - This script file ist jQuery (v.2.xxx) based.
 * - All function-snippets will be write in their own namend function and they
 *   will be called in the resize function. So far it is neccessary. ;)
 ********************************************************************************/
var count = 0;

function haulyShow ( ) {
	// @formatter:off
		var $haulyShow	= $ ( '.haulyShow' ) ,
			viewport	= 'haulyShow-viewport',
			controls	= 'haulyShow-controls',
			prev		= 'haulyshow-prev',
			next		= 'haulyshow-next',
			slide		= 'haulyShow-slide',
		    $figure		= $haulyShow.children ( '.'+slide ) ,
		    npos		= 0;
		// @formatter:on

	// - Append the viewport
	// - Append the controls
	if ( $ ( '.' + viewport ).length == 0 ) {
		// @formatter:off
			$haulyShow.append ( 
				'<div class="'+viewport+'" style="width: ' + ( 100 * $figure.length ) + '%" data-pos="0%"></div>' +
					'<div class="'+controls+'">' + '<button class="'+prev+'">PREV</button>' + 
					'<button class="float--right '+next+'">NEXT</button>' + 
				'</div>' );
			// @formatter:on
	}

	// - Give the slides, the width in percent
	// - Append the slides in the viewport
	// - Write the Data-images/caption in the figures
	$figure.css ( 'width' , ( 100 / $figure.length ) + '%' ).appendTo ( '.' + viewport ).each ( function ( ) {

		var imgUrl = $ ( this ).attr ( 'data-image' ) ,
		    caption = $ ( this ).attr ( 'data-caption' );

		if ( typeof imgUrl !== typeof undefined && imgUrl !== false ) {
			$ ( this ).append ( '<img src="' + imgUrl + '" />' );
		}
		if ( typeof caption !== typeof undefined && caption !== false ) {
			$ ( this ).append ( '<figcaption>' + caption + '</figcaption' );
		}

	} );

	function haulyShowSlideActive ( ) {
		$ ( '.' + slide ).removeClass ( 'active' );
		$ ( '.' + slide + ':nth-child(' + ( count + 1 ) + ')' ).addClass ( 'active' );
	}


	//Next and previous function
	function haulyShowNext ( ) {
		if ( count < $figure.length - 1 ) {
			count++;
			npos = 100 * ( count * -1 ) + '%';
			$haulyShow.children ( '.' + viewport ).css ( 'left' , npos ).attr ( 'data-pos' , npos );
			haulyShowSlideActive ( );
		}
	}


	// .haulyShow-slide:nth-child(2)
	// .haulyShow-slide:nth-child(2)

	function haulyShowPrev ( ) {
		if ( count > 0 && count >= $figure.length - 1 ) {
			count--;
			npos = 100 * ( count * -1 ) + '%';
			$haulyShow.children ( '.' + viewport ).css ( 'left' , npos ).attr ( 'data-pos' , npos );
			haulyShowSlideActive ( );
		}
	}


	//Triggers
	// NEXT BUTTON
	$ ( '.' + next ).click ( function ( ) {
		haulyShowNext ( );
	} );
	//PREV BUTTON
	$ ( '.' + prev ).click ( function ( ) {
		haulyShowPrev ( );
	} );

}



jQuery ( document ).ready ( function ( ) {
	haulyShow ( );
} );
