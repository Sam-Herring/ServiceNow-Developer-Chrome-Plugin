//Save Environment Prefix to Chrome Storage
function saveChanges(){
  console.log("Saving Changes...");
  var environment_prefix = document.getElementById('environment_input');
  if(!environment_prefix){
    message("Error: No Environment Prefix Specified");
    return;
  }

  console.log("Setting Environment Prefix to " + environment_input.value);
  chrome.storage.local.set({'environment_input': environment_prefix.value});
}

//Restores the Populated Prefix using the saved preference
function restore_options(){
  chrome.storage.local.get(['environment_input'], function(result) {
    document.getElementById('environment_input').value = result.environment_input;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', saveChanges);
