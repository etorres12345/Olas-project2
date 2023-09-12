// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("olas-project2 JS imported successfully!");
});

const profilePencilIcon = document.getElementById("profilePencilIcon");
const popupEditForm = document.getElementById("popupEditForm");
const closePopupBtn = document.getElementById("closePopupBtn");
const deleteProfileBtn = document.getElementById("deleteProfileBtn");

profilePencilIcon.addEventListener("click", () => {
  popupEditForm.style.display = "block";
});
closePopupBtn.addEventListener("click", () => {
  popupEditForm.style.display = "none";
});
deleteProfileBtn.addEventListener("click", () => {
  const isConfirmed = confirm("Are you suere you want to leave the surfers community?");

  if(isConfirmed) {
    window.location.href = "/profile/delete";
  }
});