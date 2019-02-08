function createBannerButton(previousClassName, className, href, overlayText){
    //Get the appropriate location (NavPage Header Content)
    var element = document.getElementsByClassName(previousClassName);
    var innerElement = element[0];

    //Generate the DOM Element to be injected

    //Div Generation
    var customDiv = document.createElement('div');
    customDiv.className = 'form-group picker ng-isolate-scope';

    //Icon Generation
    var icon = document.createElement('a');
    icon.className = className;
    icon.href = href;
    icon.target = 'gsft_main';
    var dataToggle = document.createAttribute('data-toggle');
    dataToggle.value = 'tooltip';
    icon.setAttributeNode(dataToggle);
    icon.setAttributeNode(document.createAttribute('data-original-title'));
    icon.setAttributeNode(document.createAttribute('title'));

    //Hover Text Generation
    var span = document.createElement('span')
    span.className = 'sr-only';
    span.innerHTML = overlayText;

    //Element Combination
    icon.appendChild(span);
    customDiv.appendChild(icon);

    //Insertion of custom CSS
    innerElement.insertAdjacentElement('afterbegin', customDiv);
}

console.log("--- RUNNING SHERRING CUSTOM SN DEV TOOLS ---");

var isAdmin = document.getElementsByClassName("icon icon-unlocked elevated-role-indicator")[0];
if(isAdmin.getAttribute('aria-hidden') == "false"){
  createBannerButton('navpage-pickers navpage-header-content', 'icon-all-apps btn btn-icon ng-scope', '/sys_update_set_list.do', 'View All Update Sets');
}

//icon-new-ticket
