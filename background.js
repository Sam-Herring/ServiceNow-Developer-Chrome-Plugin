//Sperate the potential search terms from the query
function textSplitter(text){
  var textArray = text.split(' ');
  textArray.shift();
  var searchTerm = textArray.join(' ');
  return searchTerm;
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

function newSearch(environment, searchTerm){
  var newURL = "https://" + environment + ".service-now.com/nav_to.do?uri=%2Ftext_search_exact_match.do?sysparm_search=" + encodeURIComponent(searchTerm);
  chrome.tabs.update({ url: newURL });
}

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    text = text.toLowerCase();
    if(text.startsWith("prod ")){
      var searchTerm = textSplitter(text);
      newSearch("usc", searchTerm);

    } else if(text.startsWith("test ")){
      var searchTerm = textSplitter(text);
      newSearch("usctest", searchTerm);

    } else if(text.startsWith("dev ")){
      var searchTerm = textSplitter(text);
      newSearch("uscdev", searchTerm);

    } else if (text.startsWith("docs ")){
      var searchTerm = textSplitter(text);
      var newURL = "https://docs.servicenow.com/search?q=" + encodeURIComponent(searchTerm) + "&labels=3";
      chrome.tabs.update({ url: newURL });

    } else {
      //Just search the result against Production
      var searchTerm = text;
      newSearch("usc", searchTerm);
  }});

chrome.commands.onCommand.addListener( function(command) {
    if(command === "save-record"){
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
          url = tabs[0].url;
          if(url.includes("service-now")){
            //chrome.tabs.update({ url: url + "return gsftSubmit(this);"});
            chrome.tabs.executeScript(null, {code:"gsftSubmit(gel('sysverb_update_and_stay'));"},
              function(results){
                console.log(results);
              });
          }
      });
    }
});
