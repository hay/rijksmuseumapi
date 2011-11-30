function(doc) {
    if (doc.type === "schilderij" && doc.width && doc.height) {
        emit((doc.width * doc.height), doc);
    }
}