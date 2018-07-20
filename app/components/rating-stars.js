import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    $('.star-rating').each(function(index, box) {
      let rating = $(box).find('input').val();
      $(box).find('span').each(function (index, span) {
        if (parseInt(rating) >= parseInt($(span).data('rating'))) {
          return $(span).removeClass('fa-star-o').addClass('fa-star');
        } else {
          return $(span).removeClass('fa-star').addClass('fa-star-o');
        }
      });
    });
  }
});
