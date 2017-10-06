/*
 * Extrait le contenu de la 1ère balise 'marker'.en supprimant sauts de ligne, tabulations et espaces
 * @param markerFilter facultatif - filtre sur une balise en particulier
 */
 function getMarkersContent(marker, data, markerFilter) {
  //data = '<p class="item_supp" itemprop="category" content="Jardinage">           Jardinage                        	</p>';
  //marker = 'p';
  //markerFilter = '<p class="item_supp"';

  var content = '';
  if (markerFilter === undefined) markerFilter = marker;
  var startIndex = data.indexOf(markerFilter);
  if (startIndex >= -1) {
    var contentStartIndex = data.indexOf('>', startIndex) + 1;
    var contentEndIndex = data.indexOf('</' + marker + '>', contentStartIndex);
    content = data.substring(contentStartIndex, contentEndIndex).replace(/\n/gm, '').replace(/\t/g, '').trim();
  }
  return content;
}

/*
 * Extrait la valeur du prochain attribut 'attr'.
 * @param markerFilter facultatif - filtre sur une balise en particulier
 */
 function getAttrValue(attr, data, markerFilter) {
  //data = '<p class="item_supp" itemprop="category" content="Jardinage">           Jardinage                        	</p>';
  //attr = 'itemprop';

  var attrValue = '';
  var startIndex = 0;
  if (markerFilter != undefined && data.indexOf(markerFilter) > -1) startIndex = data.indexOf(markerFilter);
  var attrStartIndex = data.indexOf(attr + '="', startIndex) + attr.length + 2;
  if (attrStartIndex > attr.length + 2) {
    var attrEndIndex = data.indexOf('"', attrStartIndex);
    attrValue = data.substring(attrStartIndex, attrEndIndex);
  }
  return attrValue;
}