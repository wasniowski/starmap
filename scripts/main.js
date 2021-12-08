(function ($) {
  var main = {
    init: function () {
      // Enable Nav Switcher
      navigationSwitcher.init();

      // Floating labels in form (like google material)
      dynamicLabels.init();

      // Scroll To Next Section
      scrollToNext.init();

      slider.init();
    },
  };

  var slider = {
    init: function () {
      let flip = $('#card').flip({
        trigger: 'manual',
        front: '.front-slide',
        back: '.back-slide',
        speed: 300
      });
      let isFlipped = false;

      let imageUrl = $('.slider-images img').first().attr('src');
      $('#slider .slide h4').first().parent().addClass('active');
      $('#slider .front-slide').css('background-image', 'url('+imageUrl+')');

      $('#slider .slide h4').each(function(index) {
        $(this).click(function() {
          if (!$(this).parent().hasClass('active')) {
            $('#slider .slide').each(function (){
              $(this).removeClass('active');
            })
            $(this).parent().addClass('active');
            imageUrl = $('.slider-images img').eq(index).attr('src');
            console.log(isFlipped)
            if (isFlipped) {
              $('#slider .front-slide').css('background-image', 'url('+imageUrl+')');
            } else {
              $('#slider .back-slide').css('background-image', 'url('+imageUrl+')');
            }
            flip.flip('toggle');
            isFlipped = !isFlipped;
          }
        })
      })

    }
  }

  /*
   * Enable Simple Switcher
   */

  var navigationSwitcher = {
    switcherSelector: ".js-simple-switcher",
    txtSelector: ".js-simple-switcher-txt",
    animationSpeed: 250,

    init: function () {
      var _self = this;

      // switch on click
      $(this.switcherSelector).click(function () {
        var $siblingObj = $(this).next();

        if ($(this).data("prev")) {
          $siblingObj = $(this).prev();
        }

        if ($(this).data("slide")) {
          $siblingObj.slideToggle(_self.animationSpeed);
        }

        $(this).toggleClass("active");
        $siblingObj.toggleClass("switched");

        if ($(this).data("alttxt")) {
          if (
            $(this).data("alttxt") == $(this).find(_self.txtSelector).text()
          ) {
            $(this).find(_self.txtSelector).text($(this).data("basetxt"));
          } else {
            if (!$(this).data("basetxt")) {
              $(this).data("basetxt", $(this).find(_self.txtSelector).text());
            }
            $(this).find(_self.txtSelector).text($(this).data("alttxt"));
          }
        }

        return false;
      });
    },
  };

  /*
   * Dynamic Labels
   */

  var dynamicLabels = {
    formSelector: ".js-dl-form",
    itemSelector: ".js-dl-item",

    init: function () {
      var _self = this;

      var fieldsObj =
        this.formSelector +
        ' input[type="text"], ' +
        this.formSelector +
        ' input[type="email"], ' +
        this.formSelector +
        ' input[type="number"], ' +
        this.formSelector +
        ' input[type="tel"], ' +
        this.formSelector +
        ' input[type="password"], ' +
        this.formSelector +
        " textarea";

      $(fieldsObj).each(function () {
        _self.setFilled(this);
      });

      $(document).on("focus", fieldsObj, function () {
        $(this).closest(_self.itemSelector).addClass("filled");
      });

      $(document).on("blur", fieldsObj, function () {
        var obj = this;
        _self.setFilled(obj);
      });

      $(document).on("change", fieldsObj, function () {
        _self.setFilled(this);
      });

      $(document).on("click", this.itemSelector, function () {
        $(this)
          .find(
            'input[type="text"], input[type="email"], input[type="number"], input[type="tel"], input[type="password"], textarea'
          )
          .focus();
      });
    },

    setFilled: function (obj) {
      if ($(obj).val() != "") {
        $(obj).closest(this.itemSelector).addClass("filled");
      } else {
        $(obj).closest(this.itemSelector).removeClass("filled");
      }
    },
  };

  /*
   * Scroll To Next Section
   */

  var scrollToNext = {
    triggerSelector: ".js-stn-trigger",
    wrapperSelector: ".js-stn-wrapper",

    init: function () {
      var _self = this;

      $(this.triggerSelector).click(function () {
        _self.doScroll($(this));

        return false;
      });
    },

    doScroll: function ($trigger) {
      var $nextItem = $trigger.closest(this.wrapperSelector).next();

      if ($nextItem.length) {
        var scrollTop = Math.ceil($nextItem.offset().top) - 80;
        if (scrollTop < 0) {
          scrollTop = 0;
        }
        $("html, body").animate({
          scrollTop: scrollTop,
        });
      }
    },
  };

  $(function () {
    main.init();
  });
})(jQuery);
