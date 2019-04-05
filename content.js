function createBannerButton(id, previousClassName, className, js, overlayText, disabled){
    //Get the appropriate location (NavPage Header Content)
    var element = document.getElementsByClassName(previousClassName);
    var innerElement = element[0];

    //Generate the DOM Element to be injected

    //Div Generation
    var customDiv = document.createElement('div');
    customDiv.className = 'form-group picker ng-isolate-scope';

    //Icon Generation
    var icon = document.createElement('button');
    icon.id = id;
    icon.className = className;
    icon.title = overlayText;
    icon.target = gsft_main;

    if(disabled){
      icon.setAttributeNode(document.createAttribute('disabled'));
    }

    var onclick = document.createAttribute('onclick');
    onclick.value = js;
    icon.setAttributeNode(onclick);

    var dataToggle = document.createAttribute('data-toggle');
    dataToggle.value = 'tooltip';
    icon.setAttributeNode(dataToggle);

    var inheader = document.createAttribute('in-header');
    inheader.value = "true";
    icon.setAttributeNode(inheader);

    //Hover Text Generation
    var span = document.createElement('span')
    span.className = 'sr-only';

    //Element Combination
    icon.appendChild(span);
    customDiv.appendChild(icon);

    //Insertion of custom CSS
    innerElement.insertAdjacentElement('afterbegin', customDiv);
}

function createBannerLink(id, previousClassName, className, href, overlayText, target, disabled){
    //Get the appropriate location (NavPage Header Content)
    var element = document.getElementsByClassName(previousClassName);
    var innerElement = element[0];

    //Generate the DOM Element to be injected

    //Div Generation
    var customDiv = document.createElement('div');
    customDiv.className = 'form-group picker ng-isolate-scope';

    //Icon Generation
    var icon = document.createElement('a');
    icon.id = id;
    icon.className = className;
    icon.href = href;
    icon.title = overlayText;

    if(!target){
      icon.target = 'gsft_main';
    } else {
      icon.target = target;
    }

    if(disabled){
      icon.setAttributeNode(document.createAttribute('disabled'));
    }

    var dataToggle = document.createAttribute('data-toggle');
    dataToggle.value = 'tooltip';
    icon.setAttributeNode(dataToggle);

    var inheader = document.createAttribute('in-header');
    inheader.value = "true";
    icon.setAttributeNode(inheader);

    //Hover Text Generation
    var span = document.createElement('span')
    span.className = 'sr-only';

    //Element Combination
    icon.appendChild(span);
    customDiv.appendChild(icon);

    //Insertion of custom CSS
    innerElement.insertAdjacentElement('afterbegin', customDiv);
}

function createDivider(){
  var element = document.getElementsByClassName('navpage-pickers navpage-header-content');
  var innerElement = element[0];

  var dividerDiv = document.createElement('div');
  dividerDiv.className = 'divider';
  innerElement.insertAdjacentElement('afterbegin', dividerDiv);
}

function getSysID(){
  var url = document.URL;
  var extract = url.match(/sys_id%\w*%/g);
  var sys_id = extract[0].replace('sys_id%', "").replace('%',"");
  return sys_id;
}

console.log("--- RUNNING SHERRING CUSTOM SN DEV TOOLS ---");

if(document.getElementById("update_set_picker_select") != null){
  //Create the divider to seperate the OOB Banner Icons and the custom icons.
  createDivider();

  //Create a VR Split
  createBannerButton(
    'split',
    'navpage-pickers navpage-header-content',
    'icon-or btn btn-icon ng-scope disabled',
    '',
    '',
    true
  );

  //Create Open All Update Sets Icon/Link
  createBannerLink(
    'all_update_sets',
    'navpage-pickers navpage-header-content',
    'icon-all-apps btn btn-icon ng-scope',
    '/sys_update_set_list.do',
    'All Update Sets',
    '',
    false
  );

  //Create New Update Set Icon/Link
  createBannerLink(
    'new_update_set',
    'navpage-pickers navpage-header-content',
    'icon-new-ticket btn btn-icon ng-scope',
    '/sys_update_set.do',
    'New Update Set',
    '',
    false
  );

  //Create Update Sources Icon/Link
  createBannerLink(
    "update_sources",
    'navpage-pickers navpage-header-content',
    'icon-bot btn btn-icon ng-scope',
    '/sys_update_set_list.do',
    'Update Sources',
    '',
    false
  );

  //Create a VR Split
  createBannerButton(
    'split',
    'navpage-pickers navpage-header-content',
    'icon-or btn btn-icon ng-scope disabled',
    '',
    '',
    true
  );

}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // listen for messages sent from background.js
    if (request.message === 'urlChanged') {
      if(document.URL.includes('incident.do')){
        //Create a VR Split
        createBannerButton(
          'split',
          'navpage-pickers navpage-header-content',
          'icon-or btn btn-icon ng-scope disabled',
          '',
          '',
          true
        );
        console.log("--- ADDING INCIDENT MAIL LINK ---");
        createBannerLink(
          'new_email',
          'navpage-pickers navpage-header-content',
          'icon-mail btn btn-icon ng-scope',
          '/email_client.do?sysparm_table=incident&sysparm_sys_id=' + getSysID(),
          "New Email",
          '_blank',
          true
        );
        //Create a VR Split
        createBannerButton(
          'split',
          'navpage-pickers navpage-header-content',
          'icon-or btn btn-icon ng-scope disabled',
          '',
          '',
          true
        );
      } else if(document.URL.includes('u_request.do')){
        console.log("--- ADDING REQUEST MAIL LINK ---");
        //Create a VR Split
        createBannerButton(
          'split',
          'navpage-pickers navpage-header-content',
          'icon-or btn btn-icon ng-scope disabled',
          '',
          '',
          true
        );
        createBannerLink(
          'new_email',
          'navpage-pickers navpage-header-content',
          'icon-mail btn btn-icon ng-scope',
          '/email_client.do?sysparm_table=u_request&sysparm_sys_id=' + getSysID(),
          "New Email",
          '_blank',
          true
        );
        //Create a VR Split
        createBannerButton(
          'split',
          'navpage-pickers navpage-header-content',
          'icon-or btn btn-icon ng-scope disabled',
          '',
          '',
          true
        );
      } else if(!document.URL.includes("u_request.do") && !document.URL.includes("incident.do")){
        document.getElementById('new_email').remove();
      }
    }
});
