

$(function(){

    // // ローディング
    // loadingAnime();

    //スワイパー
    initSwiper();

    // スクロールアニメ
    scrollFadeIn();

    

});



/* scrollFadeIn */
let scrollFadeIn = () => {

    $(window).on('scroll', function(){

        $('.scroll-effect').each(function(){

            // 要素の高さを取得
            let taegetPos = $(this).offset().top;

            // スクロールの値を取得
            let scroll = $(window).scrollTop();

            // ウインドウの高さを取得
            let windowHeight = $(window).height();

            if(scroll > taegetPos - windowHeight){

                $(this).addClass('scroll-in');

            }

        });
    });
}


//Swipers
let initSwiper = () => {

    var swiper = new Swiper('.swiper-container', {
        
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
		    clickable: true

          },
          autoplay: {
            delay: 5000, // 次スライドまでの待機時間
         },
          speed: 3500, // スライドするスピード
          loop:true,
          observer: true, // ローディング後のうまく行かない挙動対策
          observeParents: true,
          
      });

};


/* mitsuhashi 追記 */
$(window).on('scroll load', function (){

    /* eachメソッドでnav_whitet、.nav_blackクラスの付いている要素全ての高さを見にいく */
    $('.nav_white, .nav_black').each(function(){


        // 要素の高さを取得
        let targetPos = $(this).offset().top;
            console.log(targetPos)

        // スクロールの値を取得
        let scroll = $(window).scrollTop();
        console.log(scroll)

        // ウインドウの高さを取得
        let windowHeight = $(window).height();
        console.log(windowHeight)

        // ターゲットが可視範囲に入ったら
        // +100とかちょっとずらして範囲の調整も可能
        // if (scroll > targetPos - windowHeight + 100){
        //  if (scroll > targetPos - windowHeight){
        if (scroll > targetPos-300){


          // .nav_whiteの部分だったらフォントを白くする
          if($(this).hasClass('nav_white')){
              $("#global-nav a").removeClass('color-black');
              $("#global-nav a").addClass('color-white');
          }


          // .nav_blackの部分だったらフォントを黒くする
          if($(this).hasClass('nav_black')){
              $("#global-nav a").removeClass('color-white');
              $("#global-nav a").addClass('color-black');
          }

        }

    });


});


$(function(){

    var effect_btm = 300; // 画面下からどの位置でフェードさせるか(px)
    var effect_move = 50; // どのぐらい要素を動かすか(px)
    var effect_time = 1600; // エフェクトの時間(ms) 1秒なら1000

    //親要素と子要素のcssを定義
    $('.scroll-fade-row').css({
        opacity: 0
    });
    $('.scroll-fade-row').children().each(function(){
        $(this).css({
            opacity: 0,
            transform: 'translateY('+ effect_move +'px)',
            transition: effect_time + 'ms'
        });
    });

    // スクロールまたはロードするたびに実行
    $(window).on('scroll load', function(){
        var scroll_top = $(this).scrollTop();
        var scroll_btm = scroll_top + $(this).height();
        var effect_pos = scroll_btm - effect_btm;

        //エフェクトが発動したとき、子要素をずらしてフェードさせる
        $('.scroll-fade-row').each( function() {
            var this_pos = $(this).offset().top;
            if ( effect_pos > this_pos ) {
                $(this).css({
                    opacity: 1,
                    transform: 'translateY(0)'
                });
                $(this).children().each(function(i){
                    $(this).delay(100 + i*200).queue(function(){
                        $(this).css({
                            opacity: 1,
                            transform: 'translateY(0)'
                        }).dequeue();
                    });
                });
            }
        });
    });

});