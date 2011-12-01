window.Model = (function() {
    var Model = Classy();

    function getLocalUrl() {
        return 'data/schilderij.json';
    }

    function getThumb(data) {
        // Fucking mess...
        var img = data.formats[0].url.match(/\/assets\/(.*)/)[1];
        return 'http://www.rijksmuseum.nl/assetimage2.jsp?id=' + img + '&aria/maxwidth_288';
    }

    function getViewUrl() {
        return ''.concat(
            'http://',
            Model.host, '/',
            Model.database, '/',
            '_design/view/_view/',
            Model.view
        );
    }

    function loadData(cb) {
        var url = (Model.local) ? getLocalUrl() : getViewUrl();
        $.getJSON(url, function(data) {
            cb(data);
        });
    }

    Model.extend({
        "data" : [],

        "database" : null,

        "getAll" : function() {
            return Model.data;
        },

        "host" : null,

        "init" : function(args) {
            $.each(args, function(key, value) {
                Model[key] = value;
            });

            Model.reload();
        },

        "local" : false,

        "reload" : function() {
            Model.data = [];

            loadData(function(data) {
                $.each(data.rows, function(i, item) {
                   if (item.value && item.value.type) {
                       var doc = item.value;
                   } else {
                       return true;
                   }

                   if (doc.type === "schilderij" && doc.height && doc.width) {
                       Model.data.push({
                           'image' : doc.formats[0].url,
                           'link' : doc.formats[1].url,
                           'title' : doc.title,
                           'width' : doc.width,
                           'height' : doc.height,
                           'thumb' : getThumb(doc)
                       });
                   }
                });

                Model.emit('dataloaded');
            });
        },

        "view" : null
    });

    return Model;
});