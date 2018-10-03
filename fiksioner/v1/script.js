function loadScript(url, callback) {
  var script = document.createElement('script')
  script.type = 'text/javascript';
  if(script.readyState) {  //IE
    script.onreadystatechange = function() {
      if ( script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else { //Others
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName('body')[0].prepend(script);
}

// Call The Function
loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', function() {
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
});
