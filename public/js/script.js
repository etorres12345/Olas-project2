// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("olas-project2 JS imported successfully!");
});

document.addEventListener("DOMContentLoaded", function () {
  const searchImage = document.getElementById("search-image");

  searchImage.addEventListener("click", function () {
    const keyword = prompt("Enter a keyword to search for:");

    if (keyword) {
      const searchForm = document.getElementById("search-form");
      searchForm.querySelector('input[name="keyword"]').value = keyword;
      searchForm.submit();
    }
  });
});
