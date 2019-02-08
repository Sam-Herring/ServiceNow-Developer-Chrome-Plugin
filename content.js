console.log("--- RUNNING SHERRING CUSTOM SN DEV TOOLS ---");

var element = document.getElementsByClassName('navpage-pickers navpage-header-content');
var innerElement = element[0];

innerElement.insertAdjacentHTML('afterbegin', '<div class="form-group picker ng-isolate-scope"><a ng-if="::inHeader" href="/sys_update_set_list.do" target="gsft_main" class="icon-all-apps btn btn-icon ng-scope" data-toggle="tooltip" data-original-title="" title=""><span class="sr-only">View All Update Sets</span></a></div>');
