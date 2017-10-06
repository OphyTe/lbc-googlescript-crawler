function processArticle(articleData, oldLastArtIdsTab, searchRowIndex, currentSearchAddedArticlesNbTab) {
  //var artUrlStartIndex = articleData.indexOf("<a href") + 9; // index de la 1ère url de la liste
  //var artUrl = "http:" + articleData.substring(artUrlStartIndex , articleData.indexOf(".htm", artUrlStartIndex) + 4); // lien vers le détail du 1er article
  //var artId = extractid(artUrl);

  var artUrl = "http:" + getAttrValue('href', articleData, '<a href');
  var artId = extractid(artUrl);

  log("artUrl = \"" + artUrl + "\"", levels.debug);
  log("artId = " + artId, levels.debug);

  if(isAlreadyProcessedArticle(oldLastArtIdsTab, artId)){
    log("Article '" + artId + "' déjà traité", levels.debug);
  } else {
    try {
      oldLastArtIdsTab.push(artId); // on ajoute l'élément au tableau des articles déjà traités
      oldLastArtIdsTab.sort(function(a, b){return b-a}); // on trie le tableau de manière décroissante
      log("oldLastArtIdsTab.valueOf() = " + oldLastArtIdsTab.valueOf(), levels.debug);
      if (logLevel < levels.debugReadOnly) {
        dataSheet.getRange(searchRowIndex,lastProductIdColomn).setValue(oldLastArtIdsTab.toString()) // on met à jour la cellule correspondante du classeur
      }
      log("Nouvel article ajouté : " + artId, levels.info);
    } catch (err) {
      log("ERREUR lors de l'ajout de l'article '" + artId + "'\n" + err, levels.error);
    }
    //var title = articleData.substring(articleData.indexOf("title=") + 7 , articleData.indexOf("\"", articleData.indexOf("title=") + 7) );
    //var isProStartIndex = articleData.indexOf('<p class="item_supp">');
    //var placeStartIndex = articleData.indexOf('<p class="item_supp">', isProStartIndex + 21) + 21; // 2ième occurence de item_supp
    //var placeEndIndex = articleData.indexOf('</p>', placeStartIndex);
    //var place = articleData.substring(placeStartIndex, placeEndIndex).trim();
    //var isProStartIndex = articleData.indexOf('<span class="ispro">');
    //var priceTabStartIndex = articleData.indexOf('<h3 class="item_price"') + 23;
    //var priceTabEndIndex = articleData.indexOf('&nbsp;&euro;</h3>', priceTabStartIndex);
    //var priceTab = articleData.substring(priceTabStartIndex, priceTabEndIndex).trim().split(" ");
    //var price = parseInt(priceTab.join(""));

    var title = getAttrValue('title', articleData);
    var place = getAttrValue('content', articleData, '<p class="item_supp" itemprop="availableAtOrFrom"');
    var price = parseInt(getAttrValue('content', articleData, '<h3 class="item_price"'));
    var mobileLink = "http://mobile.leboncoin.fr/vi/" + artId + ".htm";
    log("title = " + title + '\n'
      + "place = " + place + '\n'
      + "price = " + price + '\n'
      + "mobileLink = " + mobileLink + '\n', levels.debug);
    if ( (minPrice == "" || price > minPrice) && (maxPrice == "" || price < maxPrice) ) {
      currentSearchAddedArticlesNbTab[0]++;
      body = body + "<li><a href=\"" + artUrl + "\">" + title + "</a> (" + price + "&nbsp;&euro; - " + place + ")";
      // récupération de l'image
      //var imgStartIndex = articleData.indexOf('data-imgSrc="') + 13;
      //if (imgStartIndex != -1) {
        //var imgEndIndex = articleData.indexOf('"', imgStartIndex);
        //var imgSrc = 'http:' + articleData.substring(imgStartIndex, imgEndIndex);
      var imgSrc = getAttrValue('data-imgSrc', articleData);
      if (imgSrc != '') {
        imgSrc = 'http:' + imgSrc;
        log("imgSrc = " + imgSrc, levels.debug);
        body = body + "<br/><a href=\"" + mobileLink + '"><img src="' + imgSrc + '"/></a>';
      } else {
        body = body + "<a href=\"" + mobileLink + "\"> version mobile</a>";
      }
      body = body  + "</li>";
    }
  }
}
