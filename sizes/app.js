$.getJSON("http://localhost:5984/rijksmuseum/_design/view/_view/schilderij?limit=1000&include_docs=true&callback=?", function(data) {
    $.each(data.rows, function() {
        if (this.doc && this.doc.type) {
            var doc = this.doc;
        } else {
            return true;
        }

        if (doc.type === "schilderij" && doc.height && doc.width) {
            var $p = $('<a class="painting" data-img="' + doc.formats[0].url + '">' + doc.title + '</a>').css({
                'width' : doc.width,
                'height' : doc.height
            });

            $p.click(function() {
                var img = $(this).data('img');
                $(this).append('<img src="' + img + '" />');
            });

            $("body").append($p);
        }
    })
});