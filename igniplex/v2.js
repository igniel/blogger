/****************
Script for IGNIPLEX Blogger Template
https:igniplex.blogspot.com
*****************/*

var rain = {
        a: function() { //Tag Kondisional Halaman
          let url = window.location.href, homepage = window.location.origin+'/', homepageM = window.location.origin+'/?m=1', view,
            isHomePage, isPage, isPost, isArchive, isMultipleItems, isPreview,
            num1 = /(\/\d+\/)/gi, num2 = /(\/\d+\/\d+\/)/gi,
            post = /(\/\d+\/\d+\/\S+[\\.]html)/gi,
            page = /(\/p\/.*)/gi,
            search = /(\/search([//?])q.*)/gi,
            label = /(\/search\/label\/.*)/gi,
            nextpage = /(\/search([//?])updated.*)/gi,
            preview = /(\/b\/post-preview.*)/gi;
          if (url.match(page)) {
            view = 'isPage';
          }
          else if (url.match(post)){
            view = 'isPost';
          }
          else if (url == homepage || url == homepageM || url.match(search) || url.match(label) || url.match(nextpage) || url.match(num1) || url.match(num2)) {
            view = 'isMultipleItems';
          }
          else if (url.match(preview)) {
            view = 'isPreview';
          };

          if (view == 'isMultipleItems') {
            console.log('isMultipleItems');
            rain.i();
          }
          else if (view == 'isPost' || view == 'isPreview') {
            console.log('isPost');
            rain.c(); rain.d(); rain.f(); rain.k();
          }
          else if (view == 'isPage' || view == 'isPreview') {
            console.log('isPage');
          }
          if (view != 'isPreview') {
            console.log('!isPreview');
            rain.j();
          }
        },
        b: function() { //Back to Top , Lazy Load Gambar
          $(document).scroll(function() { //Back to Top
            return $(document).scrollTop() > 300 ? $('.totop').addClass('show') : $('.totop').removeClass('show')
            }), $('.totop').click(function() {
              return $('html,body').animate({
                scrollTop: '0'
              });
          });
          //Lazy Load Gambar
          $('img').each(function() {
            $(this).attr('src', $(this).data('src')).removeAttr('data-src');
          });
        },
        c: function() { //Konten Tengah Artikel
          if (document.getElementById('HTML3')){
            document.getElementById('HTML3').classList.add('igniplexTengah');
          }
          let ads = document.querySelectorAll('.igniplexTengah');
          if (ads) {
            setTimeout(function() {
              let post = document.querySelectorAll('.post-body br, .post-body p'),
                a = ads.length + 1, //total pembagian paragraf
                b = post.length / a; //total baris paragraf dibagi 'a'
                c = Array.from({length: a}, (v, k) => k+1), //masukkan 'a' menjadi array
                d = c.slice(0,-1);
              for (let e = 0; e < d.length; e++) {
                let f = d[e], //dimasukkan dalam paragraf ke 'f' doang
                  g = parseInt((b * f));
                if (post[g].nodeName == 'P') {
                  post[g].parentNode.insertBefore(ads[e], post[g]);
                }
                else {
                  post[g].parentNode.insertBefore(ads[e], post[g].nextSibling);
                }
              }
            }, 100);
          }
        },
        d: function() { // Navigasi Blogger dengan Judul by igniel.com
          !function(t) {
            var next = 'Next', prev = 'Previous', home = 'Latest';
            var a = t('a.blog-pager-newer-link'),
              n = t('a.blog-pager-older-link'),
              c = $('.home-link');
            t.get(a.attr('href'), function(n) {
              a.html('<span>'+next+'</span> <span>' + t(n).find('.post .post-title').first().text() + '</span>')
              .removeClass('ripple')
            }, 'html');
            t.get(n.attr('href'), function(a) {
              n.html('<span>'+prev+'</span> <span>' + t(a).find('.post .post-title').first().text() + '</span>')
              .removeClass('ripple')
            }, 'html');
            c.html('<span>'+home+'</span> <span>' + $('.post-title').first().text() + '</span>')
              .removeClass('ripple');
            a.parent().removeClass('ripple').addClass('stream'), n.parent().removeClass('ripple').addClass('stream'), c.parent().removeClass('ripple').addClass('stream');
          }(jQuery);
        },
        e: function(a) { //Pagination
          let URL = decodeURIComponent(window.location.search.substring(1)),
            b = URL.split('&'), d;
          for (let i = 0; i < b.length; i++) {
            d = b[i].split('=');
            if (d[0] === a) {
              return d[1] === undefined ? true : d[1];
            }
          }
        },
        f: function() { //Run pagination
          let a = $('.ignielPagination').length;
          if (a != 0) {
            $('.ignielPagination').first().before('<div class=\"ignielPagination\" style=\"display:none;\">Blogspot Pagination by igniel.com</div>');
            $('.ignielPagination').last().after('<div id=\"ignielPagination\"></div><div class=\"clear\"></div>');
            let b = $('.ignielPagination'),
              c = 'page', //nama halaman
              num = rain.e(c);
            b.hide();
            if (num === undefined) {
              b.eq(0).hide(); b.eq(1).show();
            }
            else {
              b.eq(num).show();
            }
            for (i = 1; i <= a; i++) {
              $('#ignielPagination').append($('<a href=\"' + window.location.pathname + '?' + c + '=' + i + '\" title=\"Page ' + i + '\" rel=\"nofollow\">' + i + '</a>'));
            }
            num == undefined ? $('#ignielPagination > a').eq(0).replaceWith(function(){return $('<span class=\"selected\">1</span>')}) : $('#ignielPagination > a').eq((rain.e(c))-1).replaceWith(function(){return $('<span class=\"selected\">'+rain.e(c)+'</span>')});
          }
          else {
            $('#ignielPagination').hide();
          }
        },
        g: function() { //jQuery
          let a = document.createElement('script');
          a.type = 'text/javascript';
          a.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
          a.async = true;
          a.onload = function() {
            rain.a(); rain.b();
          }
          document.getElementsByTagName('head')[0].appendChild(a);
        },
        h: { //Navigasi Halaman Bernomor
          perPage: (function() {
            return config.halaman_bernomor.tampilan_per_halaman
          })(),
          numPages: (function() {
            return config.halaman_bernomor.tampilan_nomor_navigasi
          })(),
          firstText: (function() {
            return config.halaman_bernomor.firstText
          })(),
          lastText: (function() {
            return config.halaman_bernomor.lastText
          })(),
          a: function(pageInfo) {
            var html = '', pageNumber = parseInt(rain.h.numPages / 2);
            if (typeof firstText == 'undefined') firstText = 'First';
            if (typeof lastText == 'undefined') lastText = 'Last';
            if (pageNumber == rain.h.numPages  - pageNumber) {
              rain.h.numPages = pageNumber * 2 + 1
            }
            pageStart = currentPageNo - pageNumber;
            if (pageStart < 1) pageStart = 1;
            lastPageNo = parseInt(pageInfo / rain.h.perPage) + 1;
            if (lastPageNo - 1 == pageInfo / rain.h.perPage) lastPageNo = lastPageNo - 1;
            pageEnd = pageStart + rain.h.numPages - 1;
            if (pageEnd > lastPageNo) pageEnd = lastPageNo;
            var prevNumber = parseInt(currentPageNo) - 1;
            if (currentPageNo > 1) {
              if (currentPage == "page") {
                html += '<a href="/" class="first" title="'+firstText+'">' + firstText + '</a>'
              } else {
                html += '<a href="/search/label/' + postLabel + '?max-results=' + rain.h.perPage + '" class="first" title="'+firstText+'">' + firstText + '</a>'
              }
            }
            if (pageStart > 1) {
              if (currentPage == "page") {
                html += '<a href="/" title="Page 1">1</a>'
              } else {
                html += '<a href="/search/label/' + postLabel + '?max-results=' + rain.h.perPage + '" title="Page 1">1</a>'
              }
            }
            if (pageStart > 2) {
              html += '<span class="dot">...</span>'
            }
            for (var jj = pageStart; jj <= pageEnd; jj++) {
              if (currentPageNo == jj) {
                html += '<span class="current">' + jj + '</span>'
              } else if (jj == 1) {
                if (currentPage == "page") {
                  html += '<a href="/" title="Page 1">1</a>'
                } else {
                  html += '<a href="/search/label/' + postLabel + '?max-results=' + rain.h.perPage + '" title="Page 1">1</a>'
                }
              } else {
                if (currentPage == "page") {
                  html += '<a onclick="rain.h.d(' + jj + ');return false" title="Page '+jj+'">' + jj + '</a>'
                } else {
                  html += '<a onclick="rain.h.e(' + jj + ');return false" title="Page '+jj+'">' + jj + '</a>'
                }
              }
            }
            if (pageEnd < lastPageNo - 1) {
              html += '<span class="dot">...</span>'
            }
            if (pageEnd < lastPageNo) {
              if (currentPage == "page") {
                html += '<a onclick="rain.h.d(' + lastPageNo + ');return false" title="Page '+lastPageNo+'">' + lastPageNo + '</a>'
              } else {
                html += '<a onclick="rain.h.e(' + lastPageNo + ');return false" title="Page '+lastPageNo+'">' + lastPageNo + '</a>'
              }
            }
            var nextnumber = parseInt(currentPageNo) + 1;
            if (currentPageNo < lastPageNo) {
              if (currentPage == "page") {
                html += '<a class="last" onclick="rain.h.d(' + lastPageNo + ');return false" title="'+lastText+'">' + lastText + '</a></span>'
              } else {
                html += '<a class="last" onclick="rain.h.d(' + lastPageNo + ');return false" title="'+lastText+'">' + lastText + '</a>'
              }
            }
            var pageArea = document.getElementsByName("pageArea");
            var blogPager = document.getElementById("blog-pager");
            for (var p = 0; p < pageArea.length; p++) {
              pageArea[p].innerHTML = html
            }
            if (pageArea && pageArea.length > 0) {
              html = ''
            }
            if (blogPager) {
              blogPager.innerHTML = html, blogPager.classList.add('number');

            }
          },
          b: function(root) {
            var feed = root.feed;
            var totaldata = parseInt(feed.openSearch$totalResults.$t, 10);
            rain.h.a(totaldata)
          },
          c: function() {
            var thisUrl = window.location.href;
            if (thisUrl.indexOf('/search/label/') != -1) {
              if (thisUrl.indexOf('?updated-max') != -1) {
                postLabel = thisUrl.substring(thisUrl.indexOf('/search/label/') + 14, thisUrl.indexOf('?updated-max'))
              }
              else if (thisUrl.indexOf('?max') != -1) {
                postLabel = thisUrl.substring(thisUrl.indexOf('/search/label/') + 14, thisUrl.indexOf('?max'))
              }
              else {
                postLabel = thisUrl.substring(thisUrl.indexOf('/search/label/') + 14);
              }
            }
            if (thisUrl.indexOf('?q=') == -1) {
              if (thisUrl.indexOf('/search/label/') == -1) {
                currentPage = 'page';
                if (window.location.href.indexOf('#page=') != -1) {
                  currentPageNo = window.location.href.substring(window.location.href.indexOf('#page=') + 6, window.location.href.length)
                } else {
                  currentPageNo = 1
                }
                let a = document.createElement('script');
                a.type = 'text/javascript';
                a.src = '/feeds/posts/summary?max-results=1&alt=json-in-script&callback=rain.h.b';
                a.async = true;
                document.getElementsByTagName('body')[0].appendChild(a);
              }
              else {
                currentPage = 'label';
                if (thisUrl.indexOf('max-results=') == -1) {
                  rain.h.perPage = 20
                }
                if (window.location.href.indexOf('#page=') != -1) {
                  currentPageNo = window.location.href.substring(window.location.href.indexOf('#page=') + 6, window.location.href.length)
                } else {
                  currentPageNo = 1
                }
                let a = document.createElement('script');
                a.type = 'text/javascript';
                a.src = '/feeds/posts/summary/-/' + postLabel + '?alt=json-in-script&callback=rain.h.b&max-results=1';
                a.async = true;
                document.getElementsByTagName('body')[0].appendChild(a);
              }
            }
          },
          d: function(numberpage) {
            jsonstart = (numberpage - 1) * rain.h.perPage;
            noPage = numberpage;
            var nameBody = document.getElementsByTagName('head')[0];
            var newInclude = document.createElement('script');
            newInclude.type = 'text/javascript';
            newInclude.setAttribute('src', '/feeds/posts/summary?start-index=' + jsonstart + '&max-results=1&alt=json-in-script&callback=rain.h.f');
            nameBody.appendChild(newInclude)
          },
          e: function(numberpage) {
            jsonstart = (numberpage - 1) * rain.h.perPage;
            noPage = numberpage;
            var nameBody = document.getElementsByTagName('head')[0];
            var newInclude = document.createElement('script');
            newInclude.type = 'text/javascript';
            newInclude.setAttribute('src', '/feeds/posts/summary/-/' + postLabel + '?start-index=' + jsonstart + '&max-results=1&alt=json-in-script&callback=rain.h.f');
            nameBody.appendChild(newInclude)
          },
          f: function(root) {
            post = root.feed.entry[0];
            var timestamp1 = post.published.$t.substring(0, 19) + post.published.$t.substring(23, 29);
            var timestamp = encodeURIComponent(timestamp1);
            if (currentPage == 'page') {
              var pAddress = '/search?updated-max=' + timestamp + '&max-results=' + rain.h.perPage + '#page=' + noPage
            }
            else {
              var pAddress = '/search/label/' + postLabel + '?updated-max=' + timestamp + '&max-results=' + rain.h.perPage + '#page=' + noPage
            }
            window.location.href = pAddress
          },
          g: function() {
            let noPage, currentPage, currentPageNo, postLabel;
          }
        },
        i: function() { //Run navigasi Halaman Bernomor
          if (config.halaman_bernomor.pakai){
            rain.h.c();
          }
        },
        j: function() {//AdBlock
          if (config.adblock.pakai) {
            if (window.adsbygoogle){
              console.log('AdSense terpasang...');
              let a = document.createElement('script');
              a.type = 'text/javascript';
              a.src = '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
              a.async = true;
              a.onerror = function() {
                let c = document.createElement('div');
                c.id = 'ignielAdBlock';
                c.innerHTML = '<div class=\"isiAds\"><svg viewBox=\"0 0 24 24\"><path d=\"M13,13H11V7H13M13,17H11V15H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z\"></path></svg>'+config.adblock.text+'</div>';
                document.body.append(c);
                document.body.style.overflow = 'hidden';
              };
              document.getElementsByTagName('head')[0].appendChild(a);
            }
            else {
              console.log('Tidak ada AdSense...')
            }
          }
        },
        k: function() { //Share Counter
          if ($('.igniplexShare')){
            $.ajax({
              url: 'https://source.igniel.com/sharecounter',
              type: 'POST',
              dataType: 'json',
              data: {
                id: $('link[rel=canonical]').attr('href')
              },
              success:function(data) {
                $('.igniplexShare .total').html(data.ignielShare.facebook + data.ignielShare.pinterest).css('font-size', '26px');
              },
              error:function() {
                console.log('Terjadi kesalahan. Cek koneksi internet atau refresh halaman, kak.')
              }
            });
          }
        }
      };

      function igniel(){
        rain.g();
      }

      window.addEventListener ? window.addEventListener('load',igniel) : window.attachEvent && window.attachEvent('onload',igniel);
