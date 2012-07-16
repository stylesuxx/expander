/* jQuery List expander expands lists of the form:
 * 
 * class item +
 *            |- class headline +  (switcher and helper are attached here)
 *            |                 |- class title (The title of the item)
 *            |
 *            |- class content (The actual content which should be expanded)
 * 
 * 
 * For usage and examples view:
 * http://stylesuxx.github.com/XXXXXXX
 * 
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright (C) 2012 by Chris Landa chris[-at-]1337[-dot-]af
 */

(function($, jQuery) {
  $.fn.expander = function(options) {
    // Default settings
    var settings = $.extend( {
      'helper': true,				// If the Helpers should be attached
      'slide': 300,				// Sliding speed
      'opened': '-',				// the switcher text for an opened item
      'closed': '+',				// the switcher text for a closed item
      'helperClosed': '<- Click to unfold',	// the helper text for a closed item
      'helperOpened': '<- Click to fold'	// the helper text for an opened item
    }, options);
    
    return this.each(function(){
      // Make initial changes that users without jQuery do not need to see
      $(this).find('.content').hide();
      $(this).find('.item .headline').append('<div class="switcher">' + settings['closed'] + '</div>');
      if(settings['helper']){
	$(this).find('.headline:first').append('<div class="helper">' + settings['helperClosed'] + '</div>');
      }
      
      // At first all items are closed
      $(this).children('.item').addClass('closed');
      
      // In case one of the switchers is clicked
      $('.switcher').click(function(){
	$clicked = $(this).parent().parent();
	
	// If it is closed, open it
	if($clicked.hasClass('closed')){
	  $clicked.removeClass('closed');
	  $clicked.addClass('opened');
	  $clicked.children('.content').slideDown(settings['slide']);
	  $clicked.find('.switcher').html(settings['opened']);
	}
	// If it is opened, close it
	else{
	  $clicked.removeClass('opened');
	  $clicked.addClass('closed');
	  $clicked.children('.content').slideUp(settings['slide']);
	  $clicked.find('.switcher').html(settings['closed']);
	}

	if(settings['helper']){
	  helper($clicked.parent());
	}
      });
      
      // Attaching and disattaching helpers
      var helper = function($list){
	$firstClosed = true;
	$firstOpened = true;
	
	// Remove all helpers
	$list.find('.helper').remove();
	
	// Attach them where needed
	$heads = $list.find('.headline');
	$heads.each(function(){
	  if($firstClosed && $(this).parent().hasClass('closed')){
	    $(this).append('<div class="helper">' + settings['helperClosed'] + '</div>');
	    $firstClosed = false;
	  }
	  else if($firstOpened && $(this).parent().hasClass('opened')){
	    $(this).append('<div class="helper">' + settings['helperOpened'] + '</div>');
	    $firstOpened = false;
	  }
	});
      };
    });
  };
})(jQuery, jQuery);