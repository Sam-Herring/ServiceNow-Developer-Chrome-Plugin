// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    text = text.toLowerCase();
    if(text.startsWith("prod ")){
      //Sperate the potential search terms from the query
      var textArray = text.split(' ');
      textArray.shift();
      var searchTerm = textArray.join(' ');

      //Create the new Search URL in a new Tab
      var newURL = "https://usc.service-now.com/nav_to.do?uri=%2F$sn_global_search_results.do%3Fsysparm_search%3D" + encodeURIComponent(searchTerm);
      chrome.tabs.update({ url: newURL });
    } else if(text.startsWith("test ")){
      //Sperate the potential search terms from the query
      var textArray = text.split(' ');
      textArray.shift();
      var searchTerm = textArray.join(' ');

      //Create the new Search URL in a new Tab
      var newURL = "https://usctest.service-now.com/nav_to.do?uri=%2F$sn_global_search_results.do%3Fsysparm_search%3D" + encodeURIComponent(searchTerm);
      chrome.tabs.update({ url: newURL });
    } else if(text.startsWith("dev ")){
      //Sperate the potential search terms from the query
      var textArray = text.split(' ');
      textArray.shift();
      var searchTerm = textArray.join(' ');

      //Create the new Search URL in a new Tab
      var newURL = "https://uscdev.service-now.com/nav_to.do?uri=%2F$sn_global_search_results.do%3Fsysparm_search%3D" + encodeURIComponent(searchTerm);
      chrome.tabs.update({ url: newURL });
    } else {
      //Just search the result against Production
    var newURL = "https://usc.service-now.com/nav_to.do?uri=%2F$sn_global_search_results.do%3Fsysparm_search%3D" + encodeURIComponent(text);
      chrome.tabs.update({ url: newURL });
    }
  });

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
