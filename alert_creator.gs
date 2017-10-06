/**
* Fonction permettant de créer une nouvelle alerte
*/
function createAlert(){
  log("'=========== Création d'une alerte ===========", levels.separator);
  //var alertLabel = Browser.inputBox("Entrez le nom de l'alerte", Browser.Buttons.OK_CANCEL);
  var alertLabel = Browser.inputBox('Entrez la recherche si elle est sur la Gironde et précisez la catégorie dans laquelle chercher ("Maisons" par défaut) et éventuellement un prix min et/ou un prix max.\nDans le cas contraire, cliquez sur "Annuler" et insérez une nouvelle ligne de recherche directement dans la feuille en précisant les urls de recherche.', Browser.Buttons.OK_CANCEL);
  log("alertLabel = " + alertLabel, levels.debug);
  if(alertLabel != "cancel" && alertLabel != ""){
    /*var alertUrl;
    while (alertUrl == null || alertUrl =="") {
      alertUrl = Browser.inputBox("Coller ici l'url de la page de recherche du Bon Coin", Browser.Buttons.OK);
      log("alertUrl = " + alertUrl, levels.debug);
    }
    var alertMobileUrl = Browser.inputBox("Coller ici l'url mobile de la page de recherche du Bon Coin", Browser.Buttons.OK);
    var alertMinPrice = Browser.inputBox("Entrez ici le prix minimum des articles (facultatif)", Browser.Buttons.OK);
    var alertMaxPrice
    while (alertMaxPrice == null || alertMaxPrice != "" && alertMaxPrice < alertMinPrice) {
      alertMaxPrice = Browser.inputBox("Entrez ici le prix maximum des articles (facultatif)", Browser.Buttons.OK);
    }*/
    // Insertion de l'alerte
    if (logLevel < levels.debugReadOnly) {
      dataSheet.insertRowBefore(firstDataRow);
      dataSheet.getRange(firstDataRow, searchLabelColomn).setValue(alertLabel);
      /*dataSheet.getRange(2, urlColomn).setValue(alertUrl);
      dataSheet.getRange(2, mobileUrlColomn).setValue(alertMobileUrl);
      dataSheet.getRange(2, minPriceColomn).setValue(alertMinPrice);
      dataSheet.getRange(2, maxPriceColomn).setValue(alertMaxPrice);*/
    }
    //log("alertMobileUrl = " + alertMobileUrl + " ; " + "alertMinPrice = " + alertMinPrice + " ; " + "alertMaxPrice = " + alertMaxPrice, levels.debug);
    log("Alerte " + alertLabel + " crée", levels.info);
    //Browser.msgBox("Alerte " + alertLabel + " crée");
  } else {
    log("Création de l'alerte annulée", levels.warn);
    return false;
  }
}