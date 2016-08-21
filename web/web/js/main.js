$(function () {
  var $overlay = $('.js-overlay');

  $overlay.magnificPopup({
    type: 'ajax',
    fixedContentPos: true,
    closeMarkup: '<div class="Overlay-actions"><button title="Schliessen (Esc)" type="button" class="mfp-close Overlay-close">Schliessen</button></div>',
  });

});
