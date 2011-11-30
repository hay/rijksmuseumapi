window.View = (function() {
    var View = Classy();

    View.extend({
         "clear" : function() {
             $("#canvas").html('<p class="loading">een momentje...</p>');
             View.emit('cleared');
         },

         "init" : function() {

         },

         "redraw" : function(data) {
            $("#canvas .loading").remove();
            $.each(data, function(i, item) {
                var $p = $('<a class="painting" data-img="' + item.image + '">' + item.title + '</a>').css({
                    'width' : item.width,
                    'height' : item.height,
                    'display' : 'none'
                });

                $("#canvas").append( $p );
            });
            $("#canvas .painting").show();
            View.emit('reloaded');
         }
    });

    return View;
});