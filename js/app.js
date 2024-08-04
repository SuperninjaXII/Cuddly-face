const $ = (id) => document.querySelector(id);

// //logic for changing profile.pic {
// window.addEventListener('message', (event) => {
//   if (event.data.type === 'updateProfilePic') {
//     const profilePic = $('profile-pic');
//     profilePic.src = event.data.data;
//   }
// });
// //}

/*Popup utility {*/
const Popup = function(btnid) {
  $(`${btnid}`).addEventListener('click', function() {
    $('#popup').style.display = 'block';
  });

  $('#closePopup').addEventListener('click', function() {
    $('#popup').style.display = 'none';
    $('#dropInContainer').remove()
  });

  window.onclick = function(event) {
    if (event.target === $('#popup')) {
      $('#popup').style.display = 'none';
      $('.dropInContainer').src = '';
    }
  };
}
//end of movement mechanic }

Popup(`#movableButton`)
Popup(`#toggleNoteApp`)
