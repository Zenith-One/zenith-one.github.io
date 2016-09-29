(function($){

  var defaults = {
    blockClass: 'cd-timeline-block',
    contentClass: 'cd-timeline-content',
    imgClass: 'cd-timeline-img',
    offset: 0.8
  };

  $.fn.showTimeline = function(options){
    var conf = $.extend(defaults, options);
    var data = conf.data;
    return this.each(function(){
      var that = this;
      data.forEach(function(age){
        var $age = $(renderAge(age, conf));
        var $el = $(that);
        $age.appendTo($el);
      });

      var timelineBlocks = $(this).find('.'+conf.blockClass);

	    $(window).on('scroll', function(){
        if(!window.requestAnimationFrame){
          window.setTimeout(function(){ showBlocks(timelineBlocks, conf); }, 100);
        } else {
          window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, conf); });
        }
	    });

      hideBlocks(timelineBlocks, conf);
    });

  };



  function renderBlock(block, conf){
    var html =
      '<div class="' + conf.blockClass + '">'+
        '<div class="' + conf.imgClass + ' cd-'+block.type+'"></div> <!-- cd-timeline-img -->'+
        '<div class="' + conf.contentClass + '">'+
          '<h2>'+ block.title +'</h2>';

    block.content.forEach(function(item){
      html += '<p>' + item + '</p>';
    });
    html +=
        '<span class="cd-date">' + block.date + '</span>'+
      '</div> <!-- cd-timeline-content -->'+
    '</div> <!-- cd-timeline-block -->';
    return html;
  }

  function renderAge(age, conf){
    var html =
      '<div class="age">'+
        '<div class="age-info">'+
          '<h2 class="age-title">' + age.title + '</h2>'+
          '<p>' + age.description + '</p>'+
        '</div>'+
        '<section class="cd-container cd-timeline">';

    age.blocks.forEach(function(block){
      html += renderBlock(block, conf);
    });

    html +=
        '</section> <!-- cd-timeline -->'+
      '</div>';
    return html;
  }

	function hideBlocks(blocks, conf) {
		blocks.each(function(){
      if($(this).offset().top > $(window).scrollTop()+$(window).height()*conf.offset){
        $(this).find('.'+conf.imgClass + ', .' + conf.contentClass)
          .addClass('is-hidden');
      }
		});
	}

	function showBlocks(blocks, conf) {
		blocks.each(function(){
      if($(this).offset().top <= $(window).scrollTop()+$(window).height()*conf.offset &&
         $(this).find('.'+conf.imgClass).hasClass('is-hidden')){
        $(this).find('.'+conf.imgClass + ', .' + conf.contentClass)
          .removeClass('is-hidden')
          .addClass('bounce-in');
      }
		});
	}

})(jQuery);
