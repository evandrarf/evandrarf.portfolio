$(window).scroll(function () {
  let wScroll = $(this).scrollTop();

  $(".judul").css({
    transform: "translate(0px, " + wScroll / 1.1 + "%)",
  });

  if (wScroll > $(".gallery").offset().top - 300) {
    $(".gallery .card").each(function (i) {
      setTimeout(function () {
        $(".gallery .card").eq(i).addClass("aktif");
      }, 250 * i);
    });
  }
});

const intViewportWidth = window.innerWidth;
const nav = document.querySelector("nav");

if (intViewportWidth < 992) {
  nav.classList.add("fixed-top", "bg-light");
} else {
  nav.classList.remove("fixed-top", "bg-light");
}
