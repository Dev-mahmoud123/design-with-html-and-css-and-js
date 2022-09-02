// ------------------------ local storage-------------------------------------------------->
//  ------- randome backgeound global boolean variable
let backgroundOption = true;
//  -------- interval variable to store value in it
let intervalBackground;
// check if there is color in local storage
let mainColor = localStorage.getItem("color-option");
//  ckeck if  main color is not empty
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  /// romave active class form all childern in ul
  document.querySelectorAll(".color-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColor) {
      el.classList.add("active");
    }
  });
}
// get background optioin from local storage
let backgroundLocalItem = localStorage.getItem("background-option");
// check if background local is not empty
if (backgroundLocalItem !== null) {
  /// loop on all span in random background
  document.querySelectorAll(".random-background span").forEach((element) => {
    /// remove all active class from span
    element.classList.remove("active");
    /// check if the value in local storage is true make class yes is active else make class no is active
    if (backgroundLocalItem === "true") {
      backgroundOption = true;
      document.querySelector(".random-background .yes").classList.add("active");
    } else {
      backgroundOption = false;
      document.querySelector(".random-background .no").classList.add("active");
    }
  });
}

// --------------------------------toggle setting--------------------------------------------->
let settingIcon = document.querySelector(".toggle-setting .setting-icon");
settingIcon.onclick = function () {
  // to make icon rotate
  this.classList.toggle("fa-spin");
  // to open setting
  document.querySelector(".setting-box").classList.toggle("open");
};
// get all colors
let colors = document.querySelectorAll(".color-list li");
// loop on colors
colors.forEach((li) => {
  li.addEventListener("click", (e) => {
    // set color in root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    /// set color in local storage
    localStorage.setItem("color-option", e.target.dataset.color);
    handleActive(e);
  });
});

// --------------------------------get all random background---------
let randomBackgroundEl = document.querySelectorAll(".random-background span");
// loop on spans
randomBackgroundEl.forEach((li) => {
  li.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      //  callback function to change images
      randomizeImg();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      // clear interval to stop change image function
      clearInterval(intervalBackground);
      localStorage.setItem("background-option", false);
    }
  });
});

// ---------- show or hide bullets------------
let displayBullets = document.querySelectorAll(".display-bullets span");
let navBullets = document.querySelector(".nav-bullets");
displayBullets.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      navBullets.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets-option", "hide");
    }
    handleActive(e);
  });
});

// get display bullets from local storage ---
let bulletsOptionLocal = localStorage.getItem("bullets-option");
if (bulletsOptionLocal !== null) {
  displayBullets.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsOptionLocal === "block") {
    navBullets.style.display = "block";
    document.querySelector(".display-bullets .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".display-bullets .no").classList.add("active");
  }
}
// ------------- Reset Option -----------
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  window.location.reload();
};
//--------- ------------------------get landing page------------------------------------------->
let landingPage = document.querySelector(".landing-page");
// get images
let arrayOfImages = [
  "img1.jpg",
  "img2.jpg",
  "img3.jpg",
  "img4.jpg",
  "img5.jpg",
  "img6.jpg",
];
// change image randomly
function randomizeImg() {
  if (backgroundOption === true) {
    intervalBackground = setInterval(() => {
      let randomImage = Math.floor(Math.random() * arrayOfImages.length);
      landingPage.style.backgroundImage =
        'url("images/' + arrayOfImages[randomImage] + '")';
    }, 10000);
  }
}
randomizeImg();

// -------------- set width to skills when scrolling---------
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  let skillOffset = ourSkills.offsetTop;

  let skillOuterHeight = ourSkills.offsetHeight;

  let windowHeight = window.innerHeight;

  let windowOffset = window.pageYOffset;

  if (windowOffset >= skillOffset + skillOuterHeight - windowHeight) {
    document.querySelectorAll(".skill-box span").forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

//  ------------ make popup box ------------------->
let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    // display ovetlay to put popup inside it
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popup = document.createElement("div");
    popup.className = "popup-box";
    // display alternate text in popup
    if (img.altt !== null) {
      let imgHeading = document.createElement("h3");
      let imageHeadingText = document.createTextNode(img.alt);
      imgHeading.appendChild(imageHeadingText);
      popup.appendChild(imgHeading);
    }
    // create element to close popup
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popup.appendChild(closeButton);
    // display image in popup
    let imag = document.createElement("img");
    imag.src = img.src;
    popup.appendChild(imag);
    document.body.appendChild(popup);
  });
});
// close popup
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    //remove popup only
    e.target.parentNode.remove();
    // remove all (popup and overlay)
    document.querySelector(".popup-overlay").remove();
  }
});

// ----------------- Navigator bullets ---------
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

function scrollToSection(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// ------ hondle active elements ------------
function handleActive(event) {
  /// romave active class form all childern in ul
  event.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  event.target.classList.add("active");
}

// -------------- toggle to menu icon to open menu----------
let toggleMenu = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleMenu.onclick = function (e) {
  e.stopPropagation();
  //  add class when toggle the element if not exist or remove it if exist
  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
};
// click in anywhere outside toggle menu and links to close menu
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      toggleMenu.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});
tlinks.addEventListener("click", (e) => {
  e.stopPropagation();
});
