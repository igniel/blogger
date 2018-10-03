// jQuery
var fiksioner = document.createElement('script');
fiksioner.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
fiksioner.async = true;
document.getElementsByTagName('body')[0].prepend(fiksioner);

!function(){
  // Menu
  document.getElementById('fiksionerMenu').addEventListener('click', function(){
    if (this.className != 'open'){
      document.querySelectorAll('.tabs li').forEach(function(a){a.classList.add('show');});
      this.classList.add('open');
    }
    else {
      document.querySelectorAll('.tabs li').forEach(function(a){a.classList.remove('show');});
      this.classList.remove('open');
    }
  });

  // Back To Top
  $(document).scroll(function() {
  return $(document).scrollTop() > 300 ? $('.ignielToTop').addClass('show') : $('.ignielToTop').removeClass('show')
  }), $('.ignielToTop').click(function() {
    return $('html,body').animate({
      scrollTop: '0'
    });
  });
}(window.jQuery);
