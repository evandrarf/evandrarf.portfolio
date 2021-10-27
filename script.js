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

// modal image card

const cards = document.querySelectorAll(".card");
const modal = document.querySelector(".modal");
const modalImage = document.querySelector(".modal-image");
const cardImage = document.querySelectorAll(".card img");

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener("click", function () {
    modalImage.src = `gallery/${i + 1}.jpg`;
  });
}

// cards.forEach(function (c, i) {
//   c.addEventListener("click", function (e) {
//     modalImage.src = `gallery/${cards.index}.jpg`;
//     console.log(cards[i]);
//   });
// });
