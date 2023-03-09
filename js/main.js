$(function () {

  //drawer
  $('a[href^="#"]').click(function () {

    $('.header__item').removeClass('is-active');
    $(this).addClass('is-active');

    return false;
  });

  $('.drawer-icon').click(function () {

    $('.drawer-icon').toggleClass('is-active');
    $('.drawer-content').toggleClass('is-active');
    $('.drawer-background').toggleClass('is-active');

    return false;
  });

  //swiper
  const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    slidesPerView: 'auto',

    spaceBetween: 20,

    breakpoints: {
      767: {
        spaceBetween: 40,
      }
    }
  });

  //accordion
  $('.q-and-a__q').click(function () {
    var findElm = $(this).next(".q-and-a__a");//直後のアコーディオンを行うエリアを取得し
    $(findElm).slideToggle();//アコーディオンの上下動作

    $(this).children('.q-and-a__plus').toggleClass('is-active');//プラスマイナスアイコンの切り替え

    if ($(this).hasClass('close')) {//タイトル要素にクラス名closeがあれば
      $(this).removeClass('close');//クラス名を除去し
    } else {//それ以外は
      $(this).addClass('close');//クラス名closeを付与
    }
  });

  //pagetop
  $("#js-pagetop").click(function () {
    $('html').animate({
      scrollTop: 0
    }, 500);
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 80) {
      $('#js-pagetop').fadeIn(300).css('display', 'flex')
    } else {
      $('#js-pagetop').fadeOut(300)
    }
  });

  // スクロール検知
  $(window).on("scroll", function () {
    // トップから100px以上スクロールしたら
    if (100 < $(this).scrollTop()) {
      // is-showクラスをつける
      $('.header').addClass('is-show');
    } else {
      // 100pxを下回ったらis-showクラスを削除
      $('.header').removeClass('is-show');
    }
  });

  // #から始まるURLがクリックされた時
  $('a[href^="#"]').click(function () {
    // .headerクラスがついた要素の高さを取得
    let header = jQuery(".header").innerHeight();
    let speed = 300;
    let id = jQuery(this).attr("href");
    let target = jQuery("#" == id ? "html" : id);
    // トップからの距離からヘッダー分の高さを引く
    let position = jQuery(target).offset().top - header;
    // その分だけ移動すればヘッダーと被りません
    jQuery("html, body").animate(
      {
        scrollTop: position
      },
      speed
    );

    jQuery('.drawer-icon').removeClass('is-active');
    jQuery('.drawer-content').removeClass('is-active');
    jQuery('.drawer-background').removeClass('is-active');

    return false;
  });


  //form
  let $form = $('#js-form')
  $form.submit(function (e) {
    $.ajax({
      url: $form.attr('action'),
      data: $form.serialize(),
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //送信に成功したときの処理 
          $('#js-success').slideDown()
        },
        200: function () {
          //送信に失敗したときの処理 
          $('#js-error').slideDown()
        }
      }
    });
    return false;
  });

  //formの入力確認
  let $submit = $('#js-submit')
  $('#js-form input').on('change', function () {
    if (
      $('#js-form input[type="text"]').val() !== "" &&
      $('#js-form input[name="entry.1680004984"]').prop('checked') === true
    ) {
      //すべて入力されたとき
      $submit.prop('disabled', false)
      $submit.addClass('is-active')
    } else {
      //入力されていないとき
      $submit.prop('disabled', true)
      $submit.removeClass('is-active')
    }
  })

});