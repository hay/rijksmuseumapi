function(doc) {
  if (doc.type === "schilderij" && doc.width && doc.height) {
     emit(null, doc);
    }
}