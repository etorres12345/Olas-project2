// // https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
// document.addEventListener("DOMContentLoaded", () => {
//   console.log("olas-project2 JS imported successfully!");
// });

// const profilePencilIcon = document.getElementById("profilePencilIcon");
// const popupEditForm = document.getElementById("popupEditForm");
// const closePopupBtn = document.getElementById("closePopupBtn");
// const deleteProfileBtn = document.getElementById("deleteProfileBtn");

// profilePencilIcon.addEventListener("click", () => {
//   popupEditForm.style.display = "block";
// });
// closePopupBtn.addEventListener("click", () => {
//   popupEditForm.style.display = "none";
// });
// deleteProfileBtn.addEventListener("click", () => {
//   const isConfirmed = confirm("Are you suere you want to leave the surfers community?");

//   if(isConfirmed) {
//     window.location.href = "/";
//   }
// });

// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("olas-project2 JS imported successfully!");
});

document.addEventListener("DOMContentLoaded", function () {
  const searchImage = document.getElementById("search-image");
  const resetButton = document.getElementById("reset-button");

  searchImage.addEventListener("click", function () {
    const keyword = prompt("Enter a keyword to search for:");

    if (keyword) {
      const searchForm = document.getElementById("search-form");
      searchForm.querySelector('input[name="keyword"]').value = keyword;
      searchForm.submit();
    }
  });
  resetButton.addEventListener("click", function () {
    console.log("resetting!");
    window.location.reload();
  });
});

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
 
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
}

