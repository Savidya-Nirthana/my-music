document.addEventListener("DOMContentLoaded", (event) => {
  const nav_links = document.querySelectorAll(".nav-links");
  const about_page = document.querySelector(".AboutArea");
  const home_page = document.querySelector(".introArea");
  const play_list = document.querySelector(".playlist_area");
  const nav_bar = document.querySelector(".navibar");
  const hamber = document.querySelector(".hamberger");
  const nav_side = document.querySelector(".naviUlList");
  nav_links.forEach((link) => {
    link.addEventListener("click", function () {
      nav_links.forEach((link) => link.classList.remove("active"));

      this.classList.add("active");
      const active_text = this.textContent;

      if (active_text == "Home") {
        home_page.classList.add("active");
        about_page.classList.remove("active");
        play_list.classList.add("active");
        nav_bar.classList.remove("change");
      } else if (active_text == "About") {
        about_page.classList.add("active");
        home_page.classList.remove("active");
        play_list.classList.add("active");
        nav_bar.classList.remove("change");
      } else {
        play_list.classList.add("active");
        about_page.classList.remove("active");
        home_page.classList.remove("active");
        nav_bar.classList.add("change");
      }
    });
  });

  hamber.addEventListener("click", function () {
    if (nav_side.style.width === "0px" || nav_side.style.width === "") {
      nav_side.style.width = "60%";
    } else {
      nav_side.style.width = 0;
    }
  });
  let slide_index = 0;
  slide_show();
  function slide_show() {
    const circles = document.getElementsByClassName("nav-circle");
    const slides = document.getElementsByClassName("popular-song");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slide_index++;
    if (slide_index > slides.length) {
      slide_index = 1;
    }
    for (i = 0; i < circles.length; i++) {
      circles[i].className = circles[i].className.replace(
        " active-circle",
        " "
      );
    }

    slides[slide_index - 1].style.display = "block";
    circles[slide_index - 1].className += " active-circle";
    setTimeout(slide_show, 3000);
  }
});
