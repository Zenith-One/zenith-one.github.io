  $(function() {
    if(qs('reference')){
      removeSlideParts();
    }

    if(qs('printable')){
      removeSlideParts();
      $('.slide').css({padding: '2.5em'});
    }

    $.deck('.slide');

    function removeSlideParts(){
      $slideParts = $('section .slide');
      $slideParts.removeClass('slide');
    }

    function qs(key) {
      key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&"); // escape RegEx meta chars
      var match = location.search.match(new RegExp("[?&]"+key+"=([^&]+)(&|$)"));
      return match && decodeURIComponent(match[1].replace(/\+/g, " "));
    }


  });

  hljs.initHighlightingOnLoad();