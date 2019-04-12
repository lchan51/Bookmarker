window.addEventListener("load", fetchBookmarks);

document.querySelector("form").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault();
  var siteName = document.querySelector("#siteName").value;
  var siteUrl = document.querySelector("#siteUrl").value;

  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  document.querySelector("form").reset();

  fetchBookmarks();
}

function fetchBookmarks() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var output = document.querySelector("#bookmarks");
  output.innerHTML = "";

  for (var i = 0; i < bookmarks.length; i++) {
    var div = document.createElement("div");
    var h3 = document.createElement("h3");
    h3.textContent = bookmarks[i].name;

    var a = document.createElement("a");
    a.href = bookmarks[i].url;
    a.className = "btn btn-success";
    a.textContent = "Visit";

    var button = document.createElement("button");
    button.className = "btn btn-danger";
    button.textContent = "Delete";

    button.addEventListener("click", function(e) {
      var name = e.target.parentElement.children[0].textContent;
      deleteBookmark(name);
    });

    div.appendChild(h3);
    div.appendChild(a);
    div.appendChild(button);
    output.appendChild(div);
  }
}

function deleteBookmark(name) {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for (i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name === name) {
      bookmarks.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  fetchbookmarks();
}
