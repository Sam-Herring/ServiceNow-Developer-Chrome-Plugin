//Sperate the potential search terms from the query
function textSplitter(text){
  var textArray = text.split(' ');
  textArray.shift();
  var searchTerm = textArray.join(' ');
  return searchTerm;
}

function prefixer(text){
  var textArray = text.split(' ');
  return textArray[0];
}

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    // read changeInfo data and do something with it
    // like send the new url to contentscripts.js
    if (changeInfo.url) {
      chrome.tabs.sendMessage( tabId, {
        message: 'urlChanged',
        url: changeInfo.url
      })
    }
  }
);

function newSearch(environment, specific, searchTerm, suffix){
  var newURL = "https://" + environment + specific + encodeURIComponent(searchTerm) + suffix;
  chrome.tabs.update({ url: newURL });
}

function newTableSearch(prefix, searchTerm){
  searchTerm = searchTerm.replace("[", '');
  searchTerm = searchTerm.replace("]", '');
  newSearch(prefix, ".service-now.com/nav_to.do?uri=%2F", searchTerm.toString(), "_list.do");
}

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    var text = text.toLowerCase();
    var prefix = prefixer(text);

    if(prefix == 'test ' || prefix == 'dev '){
      var searchTerm = (textSplitter(text));
      console.log(searchTerm);
      prefix = "usc" + prefix;

      if(searchTerm.match(/\[.*\]/g)){
        newTableSearch(prefix, searchTerm);
      } else {
        newSearch(prefix, ".service-now.com/nav_to.do?uri=%2Ftext_search_exact_match.do?sysparm_search=", searchTerm, "");
      }

    } else if (text.startsWith("docs ")){
      var searchTerm = textSplitter(text);
      var newURL = "https://docs.servicenow.com/search?q=" + encodeURIComponent(searchTerm) + "&labels=3";
      chrome.tabs.update({ url: newURL });
    } else {
      //Just search the result against Production
      var searchTerm = text;
      if(searchTerm.match(/\[.*\]/g)){
        newTableSearch("usc", searchTerm);
      } else {
        newSearch("usc", ".service-now.com/nav_to.do?uri=%2Ftext_search_exact_match.do?sysparm_search=", searchTerm, "");
      }
    }
  }
);
