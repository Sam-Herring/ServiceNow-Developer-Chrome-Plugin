function createUpdateSetListIcon(){
    //Get the appropriate location (NavPage Header Content)
    var element = document.getElementsByClassName('navpage-pickers navpage-header-content');
    var innerElement = element[0];

    //Generate the DOM Element to be injected

    //Div Generation
    var customDiv = document.createElement('div');
    customDiv.className = 'form-group picker ng-isolate-scope';

    //Icon Generation
    var icon = document.createElement('a');
    icon.className = 'icon-all-apps btn btn-icon ng-scope';
    icon.href = '/sys_update_set_list.do';
    icon.target = 'gsft_main';

    //Hover Text Generation
    var span = document.createElement('span')
    span.className = 'sr-only';
    span.innerHTML = 'View All Update Sets';

    //Element Combination
    icon.appendChild(span);
    customDiv.appendChild(icon);

    //Insertion of custom CSS
    innerElement.insertAdjacentElement('afterbegin', customDiv);
}

console.log("--- RUNNING SHERRING CUSTOM SN DEV TOOLS ---");
createUpdateSetListIcon();
