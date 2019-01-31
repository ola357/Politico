$(document).ready(function () {

  $('#menu-btn').click(changeNav);
  $('#links').toggle();

  function changeNav() {
    $('#links').toggle(800);
    $('#menu-btn').toggleClass('turn')
  }

})
