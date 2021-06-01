$(function () {
  console.log("Hi!");

  let audioElement = document.createElement("audio");

  audioElement.volume = 1;

  audioElement.addEventListener(
    "ended",
    function () {
      this.play();
    },
    false
  );

  function handleCanPlay() {
    audioElement.play();
  }

  audioElement.addEventListener("timeupdate", function () {
    var currentTime = audioElement.currentTime;
    var duration = audioElement.duration;
    $(".active .bar")
      .show()
      .css("width", (currentTime / duration) * 100 + "%");
  });

  $(".sound")
    .mousedown(function () {
      let path = $(this).attr("src");
      $(this).show().addClass("active");
      audioElement.setAttribute("src", path);
      audioElement.addEventListener("canplay", handleCanPlay);
    })
    .mouseup(function () {
      audioElement.pause();
      audioElement.removeEventListener("canplay", handleCanPlay);
      audioElement.currentTime = 0;
      $(this).removeClass("active");
      $(this).find(".bar").hide().css("width", 0);
    });
});
