//Save Environment Prefix to Chrome Storage
function saveChanges(){
  var environment_prefix = document.getElementById('environment_input');
  console.log(environment_input.value);
  if(!environment_prefix.value){
    message("Error: No Environment Prefix Specified");
    return;
  }

  chrome.storage.local.set({'environment_input': environment_prefix.value, function() {
    message('Settings Saved');
  }});
}

//Restores the Populated Prefix using the saved preference
function restore_options(){
  chrome.storage.local.get({
    environment_prefix: ''
  }, function(items) {
    document.getElementById('environment_input').value = items.environment_prefix;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', saveChanges);
