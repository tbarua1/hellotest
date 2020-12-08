(function($){ 
  "use strict";

// SUPERFISH MENU_________________________ //

jQuery(document).ready(function() {
    jQuery('ul.sf-menu').superfish({
      delay:10
    });
  });


// ______________ MOBILE MENU

 $(function(){
       $('nav.mobile-menu').slicknav({
          closedSymbol: "&#8594;",
          openedSymbol: "&#8595;"
});
});  

// FLEXSLIDER_________________________ //

$(window).load(function() {
$('.flexslider').flexslider({
  animation: "slide",
  direction: "vertical"
});
});

// TEXT ROTATOR_________________________ // 

  $(".rotate").textrotator({
  animation: "dissolve", 
  separator: ",",
  speed: 2000 
});


// TESTIMONIALS CAROUSEL - DATACENTER PAGE CAROUSEL - BLOG SLIDER - HOME HORIZONTAL SLIDER_________________________ //   

$(document).ready(function() {
$("#testimonials-carousel").owlCarousel({ 
items : 1,
autoPlay: 7500,
itemsDesktop : [1199,1],
itemsDesktopSmall : [979,1],
itemsTablet: [768,1]});
});

$(document).ready(function() {
$("#datacenter-carousel").owlCarousel({ 
items : 3,
autoPlay: 5000,
itemsDesktop : [1199,3],
itemsDesktopSmall : [979,2],
itemsTablet: [768,2]});
});

$(document).ready(function() {
$("#blogslider").owlCarousel({
navigation : false,
slideSpeed : 300,
paginationSpeed : 400,
singleItem:true
});
});

$(document).ready(function() {
$("#home-horizontal-slider").owlCarousel({
navigation : true,
navigationText: [
"<i class='fa fa-angle-left'></i>",
"<i class='fa fa-angle-right'></i>"
],
pagination: false,
autoPlay: 5000,
slideSpeed : 300,
paginationSpeed : 400,
singleItem:true,
transitionStyle : "backSlide"
});
});


// SMOOTH SCROLL________________________//

$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// ______________ BACK TO TOP BUTTON

$(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('#back-to-top').fadeIn('slow');
    } else {
      $('#back-to-top').fadeOut('slow');
    }
  });
$('#back-to-top').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 600);
            return false;
        });

// ______________ SHARED HOSTING MONTH/ANNUAL PRICE SWITCH

$(window).load(function() {

$(".period a.monthly").click(function() {
    $(".period li:last-child").removeClass("colored");
    $(".period li:first-child").addClass("colored");
    $(".annualprice").hide();
    $(".cta-button.annually").hide();
    $(".monthlyprice").show();
    $(".cta-button.monthly").show();
               });
    
$(".period a.annual").click(function() {
    $(".period li:first-child").removeClass("colored");
    $(".period li:last-child").addClass("colored");
    $(".monthlyprice").hide();
    $(".cta-button.monthly").hide();
    $(".annualprice").show();
    $(".cta-button.annually").show();
               });

    });

// ______________ TOOLTIPS
$(document).ready(function() {
$('.tooltipster').tooltipster({
  animation: 'grow',
  maxWidth: 300
});
});

// ______________ TABS
 $('#featuretabs').easyResponsiveTabs({           
    type: 'default', //Types: default, vertical, accordion           
    width: 'auto', //auto or any width like 600px
    fit: true,   // 100% fit in a container
    activate: function(event) {  }// Callback function if tab is switched                            
        });


 $('#accordiontabs').easyResponsiveTabs({           
    type: 'accordion', //Types: default, vertical, accordion           
    width: 'auto', //auto or any width like 600px
    fit: true,   // 100% fit in a container
    activate: function(event) {  }// Callback function if tab is switched                            
        });



// NUMBERS_________________________ // 
jQuery(document).ready(function() {
$('.numbers').waypoint(function() {

$('#firstcount')
  .prop('number', 0)
  .animateNumber(
    {
      number: 238
    },
    3000
  );

 $('#secondcount')
  .prop('number', 0)
  .animateNumber(
    {
      number: 15369
    },
    3500
  );
  $('#thirdcount')
  .prop('number', 0)
  .animateNumber(
    {
      number: 26127
    },
    4000
  );

   $('#fourthcount')
  .prop('number', 0)
  .animateNumber(
    {
      number: 56834
    },
    4500
  );
}, { offset: 300, triggerOnce: true });
});

$(document).foundation();

})(jQuery);