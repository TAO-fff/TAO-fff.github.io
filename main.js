//scroll　足跡
document.addEventListener("DOMContentLoaded", function () {
  const scrollImg = document.querySelector(".scroll-img");

  function triggerAnimation() {
    scrollImg.style.top = "0"; // 画像を完全に表示
    setTimeout(() => {
      scrollImg.style.top = "-150%"; // 画像を隠す位置に戻す
    }, 50); // 画像が表示される時間を2秒と設定
  }

  setInterval(triggerAnimation, 5000); // 5秒に1回アニメーションをトリガー
});

// ham 【btn動き】
$(function () {/**** MV・hamメニュー・section ttl ****/
//scroll 足跡;
document.addEventListener("DOMContentLoaded", function () {
  const scrollImg = document.querySelector(".scroll-img");

  function triggerAnimation() {
    scrollImg.style.top = "0"; // 画像を完全に表示
    setTimeout(() => {
      scrollImg.style.top = "-150%"; // 画像を隠す位置に戻す
    }, 50); // 画像が表示される時間を2秒と設定
  }

  setInterval(triggerAnimation, 5000); // 5秒に1回アニメーションをトリガー
});


// ham 【btn動き】
$(function () {
  $(".sp__menu__btn").on("click", function () {
    $(".sp__menu__btn").toggleClass("open");
    $(".sp__header__nav").fadeToggle();
  });

  //hum click後閉じる
  $(".sp__nav__list li").on("click", function () {
    //header nav list liをclickしたら
    $(".sp__menu__btn").removeClass("open");
    //sp menu btn のopenクラスを消す。
    $(".sp__header__nav").fadeOut();
    //header nav フェードアウトしてもらう
  });
});



//MV 【title タイピング】
$(function () {
  setTimeout(startTypewriterEffect, 30);
  /*
    setTimeout・・・ある動作を後で行うように予約する為の命令
    startTypewriterEffect↓がページを読み込まれてから
    ↑3.1秒後に開始する
    */

  function startTypewriterEffect() {
    if (window.matchMedia("(max-width: 550px)").matches) {
      // SP  ウィンドウの幅が550px以下の場合
      animateText("sp-a", function () {
        $("#sp-b").removeClass("hidden");
        // sp-bのhiddenを消去
        animateText("sp-b");
      });
    } else {
      // Desktop view
      animateText("a", function () {
        $("#b").removeClass("hidden");
        animateText("b");
      });
    }
  }

  function animateText(id, callback) {
    var element = $("#" + id);
    var text = element.data("full-text") || element.text(); // Get the full text from data attribute if available
    var index = 0;

    element.data("full-text", text); // Save the full text in a data attribute
    element.text(""); // Clear the text for the animation

    function showNextLetter() {
      if (index < text.length) {
        element.text(text.substr(0, index + 1));
        index++;
        setTimeout(showNextLetter, 100); // 100 milliseconds for delay between letters
      } else {
        element.text(text); // Ensure the full text is displayed after the animation
        if (typeof callback === "function") callback();
      }
    }

    showNextLetter();
  }
});

//共通ttl 【タイピング】
$(function () {
  $(window).scroll(function () {
    $(".section__ttl-en").each(function () {
      if ($(this).hasClass("visible")) return;
      var topOfElement = $(this).offset().top;
      var bottomOfElement = $(this).offset().top + $(this).outerHeight();
      var bottomOfScreen = $(window).scrollTop() + $(window).height();
      var topOfScreen = $(window).scrollTop();

      if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
        $(this).addClass("visible");
        startTypewriterEffect($(this));
      }
    });
  });

  function startTypewriterEffect(element) {
    var text = element.data("text"); // オリジナルのテキストをdata属性から取得
    element.text(""); // 要素を空にする
    element.css("border-right", "2px solid #000"); // タイピング中の点滅バー
    var index = 0;

    function showNextLetter() {
      if (index < text.length) {
        element.append(text.charAt(index)); // 一文字ずつ追加
        index++;
        setTimeout(showNextLetter, 100); // タイピング速度を調整
      } else {
        // タイピング終了後に点滅アニメーションを継続
        element.css("border-right", "1px solid #333"); // 点滅バーを保持
        element.css("animation", "blink 0.5s step-end infinite"); // 点滅アニメーションを適用
      }
    }

    showNextLetter(); // タイピング効果の開始
  }
});

// header-nav 【hoverしたもの以外、薄く表示】
$(document).ready(function () {
  //$(document).ready →ウェブページの準備ができたら何かをする合図
  $(".header__nav li").hover(
    function () {
      //header__nav liにhoverをしたら
      $(this).siblings().css("opacity", "0.2");
      /* this→現在の要素。 siblings→hその要素の兄弟要素。
        現在の要素の兄弟要素(全て)のopacityを0.3に設定する */
    },
    function () {
      $(".header__nav li").css(
        "opacity",
        "1",
      ); /* hoverが外れたときに全てのli要素のopacityを元に戻します */
    }
  );
});



/**** works（横スクロール・スクロールとheader inout） ****/
// worksの横スクロール
const listWrapperEl = document.querySelector(".side-scroll-list-wrapper");
const listEl = document.querySelector(".side-scroll-list");
const firstItem = document.querySelector('.side-scroll-item');

// スクロール終了位置の計算
const calculateEndScrollPosition = () => Math.max(0, listEl.scrollWidth - listWrapperEl.clientWidth);
let endScrollPosition = calculateEndScrollPosition();

// .side-scroll-itemの高さを設定
const setListWrapperHeight = () => {
  if (firstItem) {
    listWrapperEl.style.height = `${firstItem.clientHeight}px`;
  }
};

// ページ読み込み時に高さを設定
window.addEventListener('load', () => {
  setListWrapperHeight();
  endScrollPosition = calculateEndScrollPosition();
  
  // 横スクロールのアニメーション
  gsap.to(listEl, {
    x: () => -endScrollPosition, // 横方向のスクロール
    ease: "none",
    scrollTrigger: {
      trigger: ".home__works",
      start: "top top", // スクロール開始位置
      end: () => `+=${endScrollPosition}`, // 横スクロールの終了位置
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true, // リサイズ時に再計算
    },
  });

  // works-scroll-areaのフェードイン・フェードアウトのアニメーションを追加
  gsap.fromTo(".works-scroll-area", 
    { opacity: 0 }, 
    {
      opacity: 1, 
      scrollTrigger: {
        trigger: ".side-scroll-list-wrapper",
        start: "top 1%",  // フェードイン開始位置
        end: () => `+=${endScrollPosition}`, // フェードアウト終了位置
        scrub: true, // スクロールに合わせてアニメーション
        onEnter: () => gsap.to("#header", { opacity: .8, duration: 0.5 }), // フェードアウト
        onLeave: () => gsap.to("#header", { opacity: 1, duration: 0.5 }), // フェードイン
        onEnterBack: () => gsap.to("#header", { opacity: 0, duration: 0.5 }), // 戻るときに非表示
        onLeaveBack: () => gsap.to("#header", { opacity: 1, duration: 0.5 }) // 戻るときに再表示
      }
    }
  );
});

// リサイズ時にも高さを再設定
window.addEventListener('resize', () => {
  setListWrapperHeight();
  endScrollPosition = calculateEndScrollPosition();
});

// header-nav  【footerのところで消える】
var startPos = 0;
var winScrollTop = 0;
const Header = $("#header"); //id headerをHeaderへ入れる
const Footer = $(".footer__wrapper"); //.footer__wrapperをFooterへ入れる
const worksTriggerPoint = $(".side-scroll-list-wrapper").offset().top; // works-scroll-areaの開始位置

$(window).on("scroll", function () {
  winScrollTop = $(this).scrollTop();
  var footerTop = Footer.offset().top;

  if (winScrollTop >= startPos) {
    // Footerの位置に応じてheader-navを隠す
    if (winScrollTop >= footerTop - $(window).height()) {
      $(Header).addClass("is-hide");
    } else {
      // works-scroll-areaが表示される位置でheader-navを隠す
      if (winScrollTop >= worksTriggerPoint && winScrollTop <= (worksTriggerPoint + endScrollPosition)) {
        $(Header).addClass("is-hide");
      } else {
        $(Header).removeClass("is-hide");
      }
    }
  } else {
    // スクロールアップ時のheader-nav表示/非表示
    if (winScrollTop >= worksTriggerPoint && winScrollTop <= (worksTriggerPoint + endScrollPosition)) {
      $(Header).addClass("is-hide");
    } else {
      $(Header).removeClass("is-hide");
    }
  }
  startPos = winScrollTop;
});










/**** design・about ボタン ****/

// ボタンのアクション
document.addEventListener("DOMContentLoaded", function() {
  const btns = document.querySelectorAll(".btn");

  btns.forEach(button => {
    button.addEventListener("mousemove", (e) => {
      const buttonRect = button.getBoundingClientRect();
      const offsetX = e.clientX - buttonRect.left;
      const offsetY = e.clientY - buttonRect.top;
      const x = (offsetX - buttonRect.width / 2) * 1;
      const y = (offsetY - buttonRect.height / 2) * 1;

      button.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0) scale(1)";
      button.style.transition = "transform 0.2s ease-out";
    });
  });
});



/**** skills ****/
// skills  bgc変更
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.skill__group--item1 li, .skill__group--item2 li').forEach(li => {
    ScrollTrigger.create({
      trigger: li,
      start: 'top 80%', // 修正後: liがビューポートの80%位置に来たときにトリガー
      end: 'bottom 20%', // 修正後: liがビューポートの20%位置を過ぎたときに終了
      onEnter: () => gsap.to(li, { backgroundColor: '#FBFBFB', duration: 0.5 }),
      onEnterBack: () => gsap.to(li, { backgroundColor: '#9dc4b788', duration: 0.5 }),
      onLeaveBack: () => gsap.to(li, { backgroundColor: '#9dc4b788', duration: 0.5 }),
    });
  });
});



/**** footer ****/
// footer TOP3秒かけて戻る
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("back-to-top-btn");
  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// top-btn 1000px以下の時、200pxスクロールしたら出てくる
document.addEventListener("DOMContentLoaded", function () {
  const topBtn = document.querySelector(".top-btn");
  topBtn.style.display = "none"; // 初期状態では非表示

  window.addEventListener("scroll", function () {
    if (window.innerWidth <= 3000) {
      if (window.scrollY > 200) {
        topBtn.style.display = "flex"; // スクロールが200pxを超えたら表示
      } else {
        topBtn.style.display = "none"; // スクロールが200px未満なら非表示
      }
    } else {
      topBtn.style.display = "none"; // 画面幅が1000pxを超えている場合は非表示
    }
  });
});






  $(".sp__menu__btn").on("click", function () {
    $(".sp__menu__btn").toggleClass("open");
    $(".sp__header__nav").fadeToggle();
  });

  //hum click後閉じる
  $(".sp__nav__list li").on("click", function () {
    //header nav list liをclickしたら
    $(".sp__menu__btn").removeClass("open");
    //sp menu btn のopenクラスを消す。
    $(".sp__header__nav").fadeOut();
    //header nav フェードアウトしてもらう
  });
});

// header-nav  【footerのところで消える】
var startPos = 0;
var winScrollTop = 0;
const Header = $("#header"); //id headerをHeaderへ入れる
const Footer = $(".footer__wrapper"); //.footer__wrapperをFooterへ入れる

$(window).on("scroll", function () {
  winScrollTop = $(this).scrollTop();
  /*$(this)→今見ているページ全体  scrollTop()→ページ上からどれくらい下スクロールしたか
   $(this)+scrollTop() ページの一番上からどのくらいスクロールしたか WinScrollTopに入れる*/
  var footerTop = Footer.offset().top;
  //offset() → 指定した要素の位置を返す。 topからfooterがどのくらい下にあるか返してくれる

  if (winScrollTop >= startPos) {
    /*今の位置(どのくらい下スクロールしたか) >= 前回のスクロール位置
      winScrollTop(今の位置)がstartPos(前回の位置)よりも以上の場合『今、下にスクロールしている』になる*/
    if (winScrollTop >= footerTop - $(window).height()) {
      /*$(window).height() ブラウザの高さを表す
        今の位置 >= footerの位置 - ウィンドウの高さを引いた位置
        footerの上がウィンドウの下に達する位置*/
      $(Header).addClass("is-hide");
      /*今の位置が、Footer(.footer__wrapper)より大きく(下の位置)になってたら
        Headerにis-hide(class)を追加。
        cssで#header.is-hideで少し上に移動＆透明になるようにしてある。
        cssにtransformを指定する理由：少し上に移動すると自然に隠れるように見える。*/
    } else {
      $(Header).removeClass("is-hide");
    }
    // 今の位置が、Footerより上に上がったらis-hideをremove。
  } else {
    $(Header).removeClass("is-hide");
    //Footerに到達していない状態でスクロール上下した場合にheader-nav消えないように
  }
  startPos = winScrollTop;
});

//MV 【title タイピング】
$(function () {
  setTimeout(startTypewriterEffect, 30);
  /*
    setTimeout・・・ある動作を後で行うように予約する為の命令
    startTypewriterEffect↓がページを読み込まれてから
    ↑3.1秒後に開始する
    */

  function startTypewriterEffect() {
    if (window.matchMedia("(max-width: 550px)").matches) {
      // SP  ウィンドウの幅が550px以下の場合
      animateText("sp-a", function () {
        $("#sp-b").removeClass("hidden");
        // sp-bのhiddenを消去
        animateText("sp-b");
      });
    } else {
      // Desktop view
      animateText("a", function () {
        $("#b").removeClass("hidden");
        animateText("b");
      });
    }
  }

  function animateText(id, callback) {
    var element = $("#" + id);
    var text = element.data("full-text") || element.text(); // Get the full text from data attribute if available
    var index = 0;

    element.data("full-text", text); // Save the full text in a data attribute
    element.text(""); // Clear the text for the animation

    function showNextLetter() {
      if (index < text.length) {
        element.text(text.substr(0, index + 1));
        index++;
        setTimeout(showNextLetter, 100); // 100 milliseconds for delay between letters
      } else {
        element.text(text); // Ensure the full text is displayed after the animation
        if (typeof callback === "function") callback();
      }
    }

    showNextLetter();
  }
});

//共通ttl 【タイピング】
$(function () {
  $(window).scroll(function () {
    $(".section__ttl-en").each(function () {
      if ($(this).hasClass("visible")) return;
      var topOfElement = $(this).offset().top;
      var bottomOfElement = $(this).offset().top + $(this).outerHeight();
      var bottomOfScreen = $(window).scrollTop() + $(window).height();
      var topOfScreen = $(window).scrollTop();

      if (bottomOfScreen > topOfElement && topOfScreen < bottomOfElement) {
        $(this).addClass("visible");
        startTypewriterEffect($(this));
      }
    });
  });

  function startTypewriterEffect(element) {
    var text = element.data("text"); // オリジナルのテキストをdata属性から取得
    element.text(""); // 要素を空にする
    element.css("border-right", "2px solid #000"); // タイピング中の点滅バー
    var index = 0;

    function showNextLetter() {
      if (index < text.length) {
        element.append(text.charAt(index)); // 一文字ずつ追加
        index++;
        setTimeout(showNextLetter, 100); // タイピング速度を調整
      } else {
        // タイピング終了後に点滅アニメーションを継続
        element.css("border-right", "1px solid #333"); // 点滅バーを保持
        element.css("animation", "blink 0.5s step-end infinite"); // 点滅アニメーションを適用
      }
    }

    showNextLetter(); // タイピング効果の開始
  }
});

// header-nav 【hoverしたもの以外、薄く表示】
$(document).ready(function () {
  //$(document).ready →ウェブページの準備ができたら何かをする合図
  $(".header__nav li").hover(
    function () {
      //header__nav liにhoverをしたら
      $(this).siblings().css("opacity", "0.2");
      /* this→現在の要素。 siblings→hその要素の兄弟要素。
        現在の要素の兄弟要素(全て)のopacityを0.3に設定する */
    },
    function () {
      $(".header__nav li").css(
        "opacity",
        "1",
      ); /* hoverが外れたときに全てのli要素のopacityを元に戻します */
    }
  );
});

// worksの横スクロール
const listWrapperEl = document.querySelector(".side-scroll-list-wrapper");
const listEl = document.querySelector(".side-scroll-list");
const firstItem = document.querySelector('.side-scroll-item');

// スクロール終了位置の計算
const calculateEndScrollPosition = () => Math.max(0, listEl.scrollWidth - listWrapperEl.clientWidth);
let endScrollPosition = calculateEndScrollPosition();

// .side-scroll-itemの高さを設定
const setListWrapperHeight = () => {
  if (firstItem) {
    listWrapperEl.style.height = `${firstItem.clientHeight}px`;
  }
};

// ページ読み込み時に高さを設定
window.addEventListener('load', () => {
  setListWrapperHeight();
  endScrollPosition = calculateEndScrollPosition();
  gsap.to(listEl, {
    x: () => -endScrollPosition, // 横方向のスクロール
    ease: "none",
    scrollTrigger: {
      trigger: ".home__works",
      start: "top top", // スクロール開始位置
      end: () => `+=${endScrollPosition}`, // 横スクロールの終了位置
      scrub: true,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true, // リサイズ時に再計算
    },
  });
});

// リサイズ時にも高さを再設定
window.addEventListener('resize', () => {
  setListWrapperHeight();
  endScrollPosition = calculateEndScrollPosition();
});




// ボタンのアクション
document.addEventListener("DOMContentLoaded", function() {
  const btns = document.querySelectorAll(".btn");
  const profileImg = document.querySelector(".profile-img");

  btns.forEach(button => {
    if (button.closest('.profile-button-wrapper')) {
      // profile-button-wrapperのbtnに対する処理
      button.addEventListener("mousemove", (e) => {
        const buttonRect = button.getBoundingClientRect();
        const offsetX = e.clientX - buttonRect.left;
        const offsetY = e.clientY - buttonRect.top;
        const x = (offsetX - buttonRect.width / 2) * 0.8;
        const y = (offsetY - buttonRect.height / 2) * 1;

        button.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
        profileImg.style.transform = `translate(${x}px, ${y}px)`;
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0) scale(1)";
        profileImg.style.transform = "translate(0, 0)";
        button.style.transition = "transform 0.2s ease-out";
      });
    } else {
      // その他のbtn（works-button-wrapperのbtnなど）に対する処理
      button.addEventListener("mousemove", (e) => {
        const buttonRect = button.getBoundingClientRect();
        const offsetX = e.clientX - buttonRect.left;
        const offsetY = e.clientY - buttonRect.top;
        const x = (offsetX - buttonRect.width / 2) * 0.6;
        const y = (offsetY - buttonRect.height / 2) * .8;

        button.style.transform = `translate(${x}px, ${y}px) scale(1.03)`;
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translate(0, 0) scale(1)";
        button.style.transition = "transform 0.2s ease-out";
      });
    }
  });
});




//skill  【テキストのフェードイン】
$(function () {
  var lastScrollTop = 0;

  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    // 上方向へのスクロールでもアニメーションを再度実行するための処理
    if (scroll < lastScrollTop) {
      $(".skills-text.show").removeClass("show");
    }
    lastScrollTop = scroll;

    $(".skill__group--item1 li, .skill__group--item2 li").each(function (index) {
      var targetPosition = $(this).offset().top;

      if (scroll > targetPosition - windowHeight + 160) {
        var $skillsText = $(this).find(".skills-text");
        setTimeout(function () {
          $skillsText.addClass("show");
        }, index * 160); // 遅延を追加
      }
    });
  });
});


// footer 3秒かけて戻る
document.addEventListener("DOMContentLoaded", function () {
  const backToTopBtn = document.getElementById("back-to-top-btn");
  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// top-btn 1000px以下の時、200pxスクロールしたら出てくる
document.addEventListener("DOMContentLoaded", function () {
  const topBtn = document.querySelector(".top-btn");
  topBtn.style.display = "none"; // 初期状態では非表示

  window.addEventListener("scroll", function () {
    if (window.innerWidth <= 3000) {
      if (window.scrollY > 200) {
        topBtn.style.display = "flex"; // スクロールが200pxを超えたら表示
      } else {
        topBtn.style.display = "none"; // スクロールが200px未満なら非表示
      }
    } else {
      topBtn.style.display = "none"; // 画面幅が1000pxを超えている場合は非表示
    }
  });
});


// skills  bgc変更
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.skill__group--item1 li, .skill__group--item2 li').forEach(li => {
    ScrollTrigger.create({
      trigger: li,
      start: 'top center', // トリガーの開始位置
      end: 'bottom center', // トリガーの終了位置
      onEnter: () => gsap.to(li, { backgroundColor: '#9dc4b788', duration: 0.5 }), // 要素がビューポートに入ったとき
      onEnterBack: () => gsap.to(li, { backgroundColor: '#9dc4b788', duration: 0.5 }), // 要素がビューポートに戻ったとき
      onLeaveBack: () => gsap.to(li, { backgroundColor: '#FBFBFB', duration: 0.5 }) // 要素がビューポートから再度出たとき
    });
  });
});

