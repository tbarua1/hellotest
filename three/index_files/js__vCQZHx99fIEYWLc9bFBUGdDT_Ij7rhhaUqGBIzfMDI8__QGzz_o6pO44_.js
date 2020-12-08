/*
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License MIT
*/
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof module&&module.exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){var e=-1,o=-1,i=function(t){return parseFloat(t)||0},n=function(e){var o=1,n=t(e),a=null,r=[];return n.each(function(){var e=t(this),n=e.offset().top-i(e.css("margin-top")),s=r.length>0?r[r.length-1]:null;null===s?r.push(e):Math.floor(Math.abs(a-n))<=o?r[r.length-1]=s.add(e):r.push(e),a=n}),r},a=function(e){var o={
byRow:!0,property:"height",target:null,remove:!1};return"object"==typeof e?t.extend(o,e):("boolean"==typeof e?o.byRow=e:"remove"===e&&(o.remove=!0),o)},r=t.fn.matchHeight=function(e){var o=a(e);if(o.remove){var i=this;return this.css(o.property,""),t.each(r._groups,function(t,e){e.elements=e.elements.not(i)}),this}return this.length<=1&&!o.target?this:(r._groups.push({elements:this,options:o}),r._apply(this,o),this)};r.version="master",r._groups=[],r._throttle=80,r._maintainScroll=!1,r._beforeUpdate=null,
r._afterUpdate=null,r._rows=n,r._parse=i,r._parseOptions=a,r._apply=function(e,o){var s=a(o),h=t(e),c=[h],l=t(window).scrollTop(),p=t("html").outerHeight(!0),d=h.parents().filter(":hidden");return d.each(function(){var e=t(this);e.data("style-cache",e.attr("style"))}),d.css("display","block"),s.byRow&&!s.target&&(h.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block"),e.data("style-cache",e.attr("style")),e.css({display:o,"padding-top":"0",
"padding-bottom":"0","margin-top":"0","margin-bottom":"0","border-top-width":"0","border-bottom-width":"0",height:"100px",overflow:"hidden"})}),c=n(h),h.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||"")})),t.each(c,function(e,o){var n=t(o),a=0;if(s.target)a=s.target.outerHeight(!1);else{if(s.byRow&&n.length<=1)return void n.css(s.property,"");n.each(function(){var e=t(this),o=e.css("display");"inline-block"!==o&&"flex"!==o&&"inline-flex"!==o&&(o="block");var i={display:o};i[s.property]="",
e.css(i),e.outerHeight(!1)>a&&(a=e.outerHeight(!1)),e.css("display","")})}n.each(function(){var e=t(this),o=0;s.target&&e.is(s.target)||("border-box"!==e.css("box-sizing")&&(o+=i(e.css("border-top-width"))+i(e.css("border-bottom-width")),o+=i(e.css("padding-top"))+i(e.css("padding-bottom"))),e.css(s.property,a-o+"px"))})}),d.each(function(){var e=t(this);e.attr("style",e.data("style-cache")||null)}),r._maintainScroll&&t(window).scrollTop(l/p*t("html").outerHeight(!0)),this},r._applyDataApi=function(){
var e={};t("[data-match-height], [data-mh]").each(function(){var o=t(this),i=o.attr("data-mh")||o.attr("data-match-height");i in e?e[i]=e[i].add(o):e[i]=o}),t.each(e,function(){this.matchHeight(!0)})};var s=function(e){r._beforeUpdate&&r._beforeUpdate(e,r._groups),t.each(r._groups,function(){r._apply(this.elements,this.options)}),r._afterUpdate&&r._afterUpdate(e,r._groups)};r._update=function(i,n){if(n&&"resize"===n.type){var a=t(window).width();if(a===e)return;e=a}i?-1===o&&(o=setTimeout(function(){
s(n),o=-1},r._throttle)):s(n)},t(r._applyDataApi),t(window).bind("load",function(t){r._update(!1,t)}),t(window).bind("resize orientationchange",function(t){r._update(!0,t)})});;/**/
/*
 * jQuery One Page Nav Plugin
 * http://github.com/davist11/jQuery-One-Page-Nav
 *
 * Copyright (c) 2010 Trevor Davis (http://trevordavis.net)
 * Dual licensed under the MIT and GPL licenses.
 * Uses the same license as jQuery, see:
 * http://jquery.org/license
 *
 * @version 3.0.0
 *
 * Example usage:
 * $('#nav').onePageNav({
 *   currentClass: 'current',
 *   changeHash: false,
 *   scrollSpeed: 750
 * });
 */

;(function($, window, document, undefined){

	// our plugin constructor
	var OnePageNav = function(elem, options){
		this.elem = elem;
		this.$elem = $(elem);
		this.options = options;
		this.metadata = this.$elem.data('plugin-options');
		this.$win = $(window);
		this.sections = {};
		this.didScroll = false;
		this.$doc = $(document);
		this.docHeight = this.$doc.height();
	};

	// the plugin prototype
	OnePageNav.prototype = {
		defaults: {
			navItems: 'a',
			currentClass: 'current',
			changeHash: false,
			easing: 'swing',
			filter: '',
			scrollSpeed: 750,
			scrollThreshold: 0.5,
			begin: false,
			end: false,
			scrollChange: false
		},

		init: function() {
			// Introduce defaults that can be extended either
			// globally or using an object literal.
			this.config = $.extend({}, this.defaults, this.options, this.metadata);

			this.$nav = this.$elem.find(this.config.navItems);

			//Filter any links out of the nav
			if(this.config.filter !== '') {
				this.$nav = this.$nav.filter(this.config.filter);
			}

			//Handle clicks on the nav
			this.$nav.on('click.onePageNav', $.proxy(this.handleClick, this));

			//Get the section positions
			this.getPositions();

			//Handle scroll changes
			this.bindInterval();

			//Update the positions on resize too
			this.$win.on('resize.onePageNav', $.proxy(this.getPositions, this));

			return this;
		},

		adjustNav: function(self, $parent) {
			self.$elem.find('.' + self.config.currentClass).removeClass(self.config.currentClass);
			$parent.addClass(self.config.currentClass);
		},

		bindInterval: function() {
			var self = this;
			var docHeight;

			self.$win.on('scroll.onePageNav', function() {
				self.didScroll = true;
			});

			self.t = setInterval(function() {
				docHeight = self.$doc.height();

				//If it was scrolled
				if(self.didScroll) {
					self.didScroll = false;
					self.scrollChange();
				}

				//If the document height changes
				if(docHeight !== self.docHeight) {
					self.docHeight = docHeight;
					self.getPositions();
				}
			}, 250);
		},

		getHash: function($link) {
			return $link.attr('href').split('#')[1];
		},

		getPositions: function() {
			var self = this;
			var linkHref;
			var topPos;
			var $target;

			self.$nav.each(function() {
				linkHref = self.getHash($(this));
				$target = $('#' + linkHref);

				if($target.length) {
					var minus = 0;
					if ($target.parent().hasClass('block') || $target.hasClass('section-container')) {
						minus = parseFloat($target.closest('.block').css('paddingTop'));
					}
					topPos = $target.offset().top - minus;
					self.sections[linkHref] = Math.round(topPos);
				}
			});
		},

		getSection: function(windowPos) {
			var returnValue = null;
			var windowHeight = Math.round(this.$win.height() * this.config.scrollThreshold);

			for(var section in this.sections) {
				if((this.sections[section] - windowHeight) < windowPos) {
					returnValue = section;
				}
			}

			return returnValue;
		},

		handleClick: function(e) {
			var self = this;
			var $link = $(e.currentTarget);
			var $parent = $link.parent();
			var newLoc = '#' + self.getHash($link);

			if(!$parent.hasClass(self.config.currentClass)) {
				//Start callback
				if(self.config.begin) {
					self.config.begin();
				}

				//Change the highlighted nav item
				self.adjustNav(self, $parent);

				//Removing the auto-adjust on scroll
				self.unbindInterval();

				//Scroll to the correct position
				self.scrollTo(newLoc, function() {
					//Do we need to change the hash?
					if(self.config.changeHash) {
						// window.location.hash = newLoc; // replace this code because scroll issue in mozilla on click
						if(history.pushState) {
							history.pushState(null, null, newLoc);
						}
						else {
							window.location.hash = newLoc;
						}
					}


					//Add the auto-adjust on scroll back in
					self.bindInterval();

					//End callback
					if(self.config.end) {
						self.config.end();
					}
				});
			}

			e.preventDefault();
		},

		scrollChange: function() {
			var windowTop = this.$win.scrollTop();
			var position = this.getSection(windowTop);
			var $parent;

			//If the position is set
			if(position !== null) {
				$parent = this.$elem.find('a[href$="#' + position + '"]').parent();

				//If it's not already the current section
				if(!$parent.hasClass(this.config.currentClass)) {
					//Change the highlighted nav item
					this.adjustNav(this, $parent);

					//If there is a scrollChange callback
					if(this.config.scrollChange) {
						this.config.scrollChange($parent);
					}
				}
			}
		},

		scrollTo: function(target, callback) {
			var offset = $(target).offset().top;

			if (!$("body").hasClass("fixed-nav-not-fixed")) {
				if ($(target).parent().hasClass('block') || $(target).hasClass('section-container')) {
					var localNav = $('.fixed-nav').outerHeight(true);
					var paddingTop = parseFloat($(target).closest('.block').css('paddingTop'));

					if (!$('.fixed-nav').hasClass('fixed')) {
						offset = offset - ((localNav * 2) + paddingTop) ;
					} else {
						offset = offset - (localNav + paddingTop);
					}
				}
			}

			$('html, body').animate({
				scrollTop: offset + 1 // 1px is added bcz there is scroll issue of 1px when click on menu
			}, this.config.scrollSpeed, this.config.easing, callback);
		},

		unbindInterval: function() {
			clearInterval(this.t);
			this.$win.unbind('scroll.onePageNav');
		}
	};

	OnePageNav.defaults = OnePageNav.prototype.defaults;

	$.fn.onePageNav = function(options) {
		return this.each(function() {
			new OnePageNav(this, options).init();
		});
	};

})( jQuery, window , document );
;/**/
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.6.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 1) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }


        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }

        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick',
                '*:not(.slick-arrow)', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        _.$slideTrack.attr('role', 'listbox');

        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            });
        });

        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);
        }

        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            _.setPosition();

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }

    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.setSlideClasses(index);
            _.asNavFor(index);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }

        swipeDirection = _.swipeDirection();

        if (swipeDirection === 'vertical') {
            return;
        }

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                .removeClass('slick-active')
                .attr('aria-hidden', 'true');

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active')
                .attr('aria-hidden', 'false');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));
;/**/
(function($){var autoplay,bgcolor,blocknum,blocktitle,border,core,container,content,dest,evitacontent,evitanext,evitaprev,extraCss,figliall,framewidth,frameheight,infinigall,items,keyNavigationDisabled,margine,numeratio,overlayColor,overlay,prima,title,thisgall,thenext,theprev,type,finH,sonH,nextok,prevok,preloader,navigation,spinner,titlePosition,titleColor,titleBackground,closeColor,closeBackground,numerationPosition,numerationColor,numerationBackground,pre_open_callback,post_open_callback,pre_close_callback,
post_close_callback,post_resize_callback;$.fn.extend({venobox:function(options){var defaults={arrowsColor:"#B6B6B6",autoplay:false,bgcolor:"#fff",border:"0",closeBackground:"#161617",closeColor:"#d2d2d2",framewidth:"",frameheight:"",infinigall:false,numeratio:false,numerationBackground:"#161617",numerationColor:"#d2d2d2",numerationPosition:"top",overlayClose:true,overlayColor:"rgba(23,23,23,0.85)",spinner:"double-bounce",spinColor:"#d2d2d2",titleattr:"title",titleBackground:"#161617",titleColor:"#d2d2d2",
titlePosition:"top",pre_open_callback:function(){return true},post_open_callback:function(){},pre_close_callback:function(){return true},post_close_callback:function(){},post_resize_callback:function(){}};var option=$.extend(defaults,options);return this.each(function(){var obj=$(this);if(obj.data("venobox"))return true;obj.addClass("vbox-item");obj.data("framewidth",option.framewidth);obj.data("frameheight",option.frameheight);obj.data("border",option.border);obj.data("bgcolor",option.bgcolor);obj.data("numeratio",
option.numeratio);obj.data("infinigall",option.infinigall);obj.data("overlaycolor",option.overlayColor);obj.data("venobox",true);post_open_callback=option.post_open_callback;post_resize_callback=option.post_resize_callback;obj.on("click",function(e){e.preventDefault();obj=$(this);var rtn=option.pre_open_callback(obj);if(rtn!=undefined&&!rtn)return;overlayColor=obj.data("overlay")||obj.data("overlaycolor");framewidth=obj.data("framewidth");frameheight=obj.data("frameheight");autoplay=obj.data("autoplay")||
option.autoplay;border=obj.data("border");bgcolor=obj.data("bgcolor");nextok=false;prevok=false;keyNavigationDisabled=false;dest=obj.data("href")||obj.attr("href");extraCss=obj.data("css")||"";$("body").addClass("vbox-open");preloader='<div class="vbox-preloader">';switch(option.spinner){case "rotating-plane":preloader+='<div class="sk-rotating-plane"></div>';break;case "double-bounce":preloader+='<div class="sk-double-bounce">'+'<div class="sk-child sk-double-bounce1"></div>'+'<div class="sk-child sk-double-bounce2"></div>'+
"</div>";break;case "wave":preloader+='<div class="sk-wave">'+'<div class="sk-rect sk-rect1"></div>'+'<div class="sk-rect sk-rect2"></div>'+'<div class="sk-rect sk-rect3"></div>'+'<div class="sk-rect sk-rect4"></div>'+'<div class="sk-rect sk-rect5"></div>'+"</div>";break;case "wandering-cubes":preloader+='<div class="sk-wandering-cubes">'+'<div class="sk-cube sk-cube1"></div>'+'<div class="sk-cube sk-cube2"></div>'+"</div>";break;case "spinner-pulse":preloader+='<div class="sk-spinner sk-spinner-pulse"></div>';
break;case "three-bounce":preloader+='<div class="sk-three-bounce">'+'<div class="sk-child sk-bounce1"></div>'+'<div class="sk-child sk-bounce2"></div>'+'<div class="sk-child sk-bounce3"></div>'+"</div>";break;case "cube-grid":preloader+='<div class="sk-cube-grid">'+'<div class="sk-cube sk-cube1"></div>'+'<div class="sk-cube sk-cube2"></div>'+'<div class="sk-cube sk-cube3"></div>'+'<div class="sk-cube sk-cube4"></div>'+'<div class="sk-cube sk-cube5"></div>'+'<div class="sk-cube sk-cube6"></div>'+
'<div class="sk-cube sk-cube7"></div>'+'<div class="sk-cube sk-cube8"></div>'+'<div class="sk-cube sk-cube9"></div>'+"</div>";break}preloader+="</div>";navigation='<a class="vbox-next"><span>next</span></a><a class="vbox-prev"><span>prev</span></a>';vbheader='<div class="vbox-title"></div><div class="vbox-num">0/0</div><div class="vbox-close">&times;</div>';core='<div class="vbox-overlay '+extraCss+'" style="background:'+overlayColor+'">'+preloader+'<div class="vbox-container"><div class="vbox-content"></div></div>'+
vbheader+navigation+"</div>";$("body").append(core);$(".vbox-preloader .sk-child, .vbox-preloader .sk-rotating-plane, .vbox-preloader .sk-rect, .vbox-preloader .sk-cube, .vbox-preloader .sk-spinner-pulse").css("background-color",option.spinColor);overlay=$(".vbox-overlay");container=$(".vbox-container");content=$(".vbox-content");blocknum=$(".vbox-num");blocktitle=$(".vbox-title");blocktitle.css(option.titlePosition,"-1px");blocktitle.css({"color":option.titleColor,"background-color":option.titleBackground});
$(".vbox-close").css({"color":option.closeColor,"background-color":option.closeBackground});$(".vbox-num").css(option.numerationPosition,"-1px");$(".vbox-num").css({"color":option.numerationColor,"background-color":option.numerationBackground});$(".vbox-next span, .vbox-prev span").css({"border-top-color":option.arrowsColor,"border-right-color":option.arrowsColor});content.html("");content.css("opacity","0");checknav();overlay.animate({opacity:1},250,function(){if(obj.data("vbtype")=="iframe")loadIframe();
else if(obj.data("vbtype")=="inline")loadInline();else if(obj.data("vbtype")=="ajax")loadAjax();else if(obj.data("vbtype")=="vimeo")loadVid(autoplay,"vimeo");else if(obj.data("vbtype")=="youtube")loadVid(autoplay,"youtube");else{content.html('<img src="'+dest+'">');preloadFirst()}});function checknav(){thisgall=obj.data("vbgall");numeratio=obj.data("numeratio");infinigall=obj.data("infinigall");items=$('.vbox-item[data-vbgall="'+thisgall+'"]');if(items.length>1&&numeratio===true){blocknum.html(items.index(obj)+
1+" / "+items.length);blocknum.show()}else blocknum.hide();thenext=items.eq(items.index(obj)+1);theprev=items.eq(items.index(obj)-1);if(obj.attr(option.titleattr)){title=obj.attr(option.titleattr);blocktitle.show()}else{title="";blocktitle.hide()}if(items.length>1&&infinigall===true){nextok=true;prevok=true;if(thenext.length<1)thenext=items.eq(0);if(items.index(obj)<1)theprev=items.eq(items.index(items.length))}else{if(thenext.length>0){$(".vbox-next").css("display","block");nextok=true}else{$(".vbox-next").css("display",
"none");nextok=false}if(items.index(obj)>0){$(".vbox-prev").css("display","block");prevok=true}else{$(".vbox-prev").css("display","none");prevok=false}}}var gallnav={prev:function(){if(keyNavigationDisabled)return;else keyNavigationDisabled=true;overlayColor=theprev.data("overlay")||theprev.data("overlaycolor");framewidth=theprev.data("framewidth");frameheight=theprev.data("frameheight");border=theprev.data("border");bgcolor=theprev.data("bgcolor");dest=theprev.data("href")||theprev.attr("href");
autoplay=theprev.data("autoplay");if(theprev.attr(option.titleattr))title=theprev.attr(option.titleattr);else title="";content.animate({opacity:0},500,function(){overlay.css("background",overlayColor);if(theprev.data("vbtype")=="iframe")loadIframe();else if(theprev.data("vbtype")=="inline")loadInline();else if(theprev.data("vbtype")=="ajax")loadAjax();else if(theprev.data("vbtype")=="youtube")loadVid(autoplay,"youtube");else if(theprev.data("vbtype")=="vimeo")loadVid(autoplay,"vimeo");else{content.html('<img src="'+
dest+'">');preloadFirst()}obj=theprev;checknav();keyNavigationDisabled=false})},next:function(){if(keyNavigationDisabled)return;else keyNavigationDisabled=true;overlayColor=thenext.data("overlay")||thenext.data("overlaycolor");framewidth=thenext.data("framewidth");frameheight=thenext.data("frameheight");border=thenext.data("border");bgcolor=thenext.data("bgcolor");dest=thenext.data("href")||thenext.attr("href");autoplay=thenext.data("autoplay");if(thenext.attr(option.titleattr))title=thenext.attr(option.titleattr);
else title="";content.animate({opacity:0},500,function(){overlay.css("background",overlayColor);if(thenext.data("vbtype")=="iframe")loadIframe();else if(thenext.data("vbtype")=="inline")loadInline();else if(thenext.data("vbtype")=="ajax")loadAjax();else if(thenext.data("vbtype")=="youtube")loadVid(autoplay,"youtube");else if(thenext.data("vbtype")=="vimeo")loadVid(autoplay,"vimeo");else{content.html('<img src="'+dest+'">');preloadFirst()}obj=thenext;checknav();keyNavigationDisabled=false})}};$("body").keydown(function(e){if(e.keyCode==
37&&prevok==true)gallnav.prev();if(e.keyCode==39&&nextok==true)gallnav.next()});$(".vbox-prev").click(function(){gallnav.prev()});$(".vbox-next").click(function(){gallnav.next()});function escapeHandler(e){if(e.keyCode===27)closeVbox()}function closeVbox(){var rtn=option.pre_close_callback(obj,content,blocknum,blocktitle);if(rtn!=undefined&&!rtn)return;$("body").removeClass("vbox-open");$("body").off("keydown",escapeHandler);overlay.animate({opacity:0},500,function(){overlay.remove();keyNavigationDisabled=
false;obj.focus();option.post_close_callback(obj,content,blocknum,blocktitle)})}var closeclickclass=".vbox-overlay";if(!option.overlayClose)closeclickclass=".vbox-close";$(closeclickclass).click(function(e){if($(e.target).is(".vbox-overlay")||$(e.target).is(".vbox-content")||$(e.target).is(".vbox-close")||$(e.target).is(".vbox-preloader"))closeVbox()});$("body").keydown(escapeHandler);return false})})}});function loadAjax(){$.ajax({url:dest,cache:false}).done(function(msg){content.html('<div class="vbox-inline">'+
msg+"</div>");preloadFirst()}).fail(function(){content.html('<div class="vbox-inline"><p>Error retrieving contents, please retry</div>');updateoverlay()})}function loadIframe(){content.html('<iframe class="venoframe" src="'+dest+'"></iframe>');updateoverlay()}function loadVid(autoplay,host){var player,videoid;var stringAutoplay=autoplay?"?rel=0&autoplay=1":"?rel=0";if(host=="vimeo"){player="https://player.vimeo.com/video/";var pezzi=dest.split("/");videoid=pezzi[pezzi.length-1]}else{player="https://www.youtube.com/embed/";
videoid=YouTubeGetID(dest)}content.html('<iframe class="venoframe vbvid" webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder="0" src="'+player+videoid+stringAutoplay+'"></iframe>');updateoverlay()}function YouTubeGetID(url){var ID="";url=url.replace(/(>|<)/gi,"").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);if(url[2]!==undefined){ID=url[2].split(/[^0-9a-z_\-]/i);ID=ID[0]}else ID=url;return ID}function loadInline(){content.html('<div class="vbox-inline">'+$(dest).html()+"</div>");
updateoverlay()}function preloadFirst(){images=$(".vbox-content").find("img");if(images.length)images.each(function(){$(this).one("load",function(){updateoverlay()})});else updateoverlay()}function updateoverlay(){blocktitle.html(title);content.find(">:first-child").addClass("figlio");$(".figlio").css("width",framewidth).css("height",frameheight).css("padding",border).css("background",bgcolor);updateol(sonH,finH);content.animate({"opacity":"1"},"slow",post_open_callback(content,blocknum,blocktitle))}
function updateol(){sonH=content.outerHeight();finH=$(window).height();if(sonH+30<finH){margine=(finH-sonH)/2;content.css("margin-top",margine);content.css("margin-bottom",margine)}else{content.css("margin-top","30px");content.css("margin-bottom","30px")}post_resize_callback(content,blocknum,blocktitle)}$(window).resize(function(){if($(".vbox-content").length)setTimeout(updateol(),800)})})(jQuery);;/**/
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.5, License: MIT License (MIT) */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&Q(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(G(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&G(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),N.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=Y.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=X.call(this,c[0],"y"),c[1]=X.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=ne()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",G(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",G(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&Q(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){o.data(a);N.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),N.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),$(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),$(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir='"+n.langDir+"' /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=oe(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' "+r+" />","<a href='#' class='"+d[14]+"' "+r+" />","<a href='#' class='"+d[15]+"' "+r+" />","<a href='#' class='"+d[16]+"' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(Q(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),G(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),G(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),W.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}P.call(this),U.call(this),i.advanced.autoScrollOnFocus&&H.call(this),i.scrollButtons.enable&&F.call(this),i.keyboard.enable&&q.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!A()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),$(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),$(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),$(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document&&null!==frameElement?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=A()&&t.target.ownerDocument!==top.document&&null!==frameElement?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e,t,a,n){if(h[0].idleTimer=d.scrollInertia<233?250:0,o.attr("id")===f[1])var i="x",s=(o[0].offsetLeft-t+n)*l.scrollRatio.x;else var i="y",s=(o[0].offsetTop-e+a)*l.scrollRatio.y;G(r,s.toString(),{dir:i,drag:!0})}var o,n,i,r=e(this),l=r.data(a),d=l.opt,u=a+"_"+l.idx,f=["mCSB_"+l.idx+"_dragger_vertical","mCSB_"+l.idx+"_dragger_horizontal"],h=e("#mCSB_"+l.idx+"_container"),m=e("#"+f[0]+",#"+f[1]),p=d.advanced.releaseDraggableSelectors?m.add(e(d.advanced.releaseDraggableSelectors)):m,g=d.advanced.extraDraggableSelectors?e(!A()||top.document).add(e(d.advanced.extraDraggableSelectors)):e(!A()||top.document);m.bind("contextmenu."+u,function(e){e.preventDefault()}).bind("mousedown."+u+" touchstart."+u+" pointerdown."+u+" MSPointerDown."+u,function(t){if(t.stopImmediatePropagation(),t.preventDefault(),ee(t)){c=!0,s&&(document.onselectstart=function(){return!1}),L.call(h,!1),Q(r),o=e(this);var a=o.offset(),l=O(t)[0]-a.top,u=O(t)[1]-a.left,f=o.height()+a.top,m=o.width()+a.left;f>l&&l>0&&m>u&&u>0&&(n=l,i=u),C(o,"active",d.autoExpandScrollbar)}}).bind("touchmove."+u,function(e){e.stopImmediatePropagation(),e.preventDefault();var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;t(n,i,r,l)}),e(document).add(g).bind("mousemove."+u+" pointermove."+u+" MSPointerMove."+u,function(e){if(o){var a=o.offset(),r=O(e)[0]-a.top,l=O(e)[1]-a.left;if(n===r&&i===l)return;t(n,i,r,l)}}).add(p).bind("mouseup."+u+" touchend."+u+" pointerup."+u+" MSPointerUp."+u,function(){o&&(C(o,"active",d.autoExpandScrollbar),o=null),c=!1,s&&(document.onselectstart=null),L.call(h,!0)})},D=function(){function o(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if(te(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),W.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],R,n,"y","all",!0),B.overflowed[1]&&s(w[1],R,n,"x",L,!0)}}function i(e){if(!te(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),Q(y),p=K();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],W=[]}function r(e){if(te(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=K();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],W[W.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&G(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],W=[],R=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction&&""!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,j(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(){t||(i&&(i=0,n("off",null)),c=!1)})},W=function(){function t(t,a){if(Q(o),!z(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v="y"===i.mouseWheel.axis?t.deltaY||a:t.deltaX;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<5&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),G(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},R=new Object,A=function(t){var o=!1,a=!1,n=null;if(void 0===t?a="#empty":void 0!==e(t).attr("id")&&(a=e(t).attr("id")),a!==!1&&void 0!==R[a])return R[a];if(t){try{var i=t.contentDocument||t.contentWindow.document;n=i.body.innerHTML}catch(r){}o=null!==n}else{try{var i=top.document;n=i.body.innerHTML}catch(r){}o=null!==n}return a!==!1&&(R[a]=o),o},L=function(e){var t=this.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}},z=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},P=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){Q(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-u*(.9*l.width())}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-u*(.9*l.height())}G(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(){var o=e(document.activeElement),a=r.find(".mCustomScrollBox").length,i=0;o.is(n.advanced.autoScrollOnFocus)&&(Q(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=a?(i+17)*a:0,t[0]._focusTimeout=setTimeout(function(){var e=[ae(o)[0],ae(o)[1]],a=[r[0].offsetTop,r[0].offsetLeft],s=[a[0]+e[0]>=0&&a[0]+e[0]<l.height()-o.outerHeight(!1),a[1]+e[1]>=0&&a[0]+e[1]<l.width()-o.outerWidth(!1)],c="yx"!==n.axis||s[0]||s[1]?"all":"none";"x"===n.axis||s[0]||G(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i}),"y"===n.axis||s[1]||G(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:i})},t[0]._focusTimer))})},U=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(){0===i.scrollTop()&&0===i.scrollLeft()||e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},F=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("contextmenu."+r,function(e){e.preventDefault()}).bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,j(t,e,o)}if(a.preventDefault(),ee(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},q=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||j(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){Q(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-f*(.9*d.width());else var h="y",m=Math.abs(c[0].offsetTop)-f*(.9*d.height());G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;G(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).bind("load",function(){A(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},j=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*(d[1]*n):s[0]+f.dir[1]*(d[0]*n),v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=!!e;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),G(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),$(f,"step"),Q(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],Q(t),oe(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},Y=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},X=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1)-s.width():l.outerHeight(!1)-s.height(),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?ae(m)[1]:ae(m)[0];case"string":case"number":if(oe(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&oe(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?ae(m)[1]:ae(m)[0]}return e(t).length?"x"===o?ae(e(t))[1]:ae(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},N=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){
return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void $(f[0],"autoUpdate")):void o()},V=function(e,t,o){return Math.round(e/t)*t-o},Q=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){Z.call(this)})},G=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?Y.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?Y.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,0===m.scrollTop()&&0===m.scrollLeft()||(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=V(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),J(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),!s.tweenRunning&&(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0])||J(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},J=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=K()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=K(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},K=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},Z=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},$=function(e,t){try{delete e[t]}catch(o){e[t]=null}},ee=function(e){return!(e.which&&1!==e.which)},te=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},oe=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},ae=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},ne=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).bind("load",function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+ae(n)[0]>=0&&a[0]+ae(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+ae(n)[1]>=0&&a[1]+ae(n)[1]<o.width()-n.outerWidth(!1)},mcsInSight:e.expr[":"].mcsInSight||function(t,o,a){var n,i,r,l,s=e(t),c=s.parents(".mCSB_container"),d="exact"===a[3]?[[1,0],[1,0]]:[[.9,.1],[.6,.4]];if(c.length)return n=[s.outerHeight(!1),s.outerWidth(!1)],r=[c[0].offsetTop+ae(s)[0],c[0].offsetLeft+ae(s)[1]],i=[c.parent()[0].offsetHeight,c.parent()[0].offsetWidth],l=[n[0]<i[0]?d[0]:d[1],n[1]<i[1]?d[0]:d[1]],r[0]-i[0]*l[0][0]<0&&r[0]+n[0]-i[0]*l[0][1]>=0&&r[1]-i[1]*l[1][0]<0&&r[1]+n[1]-i[1]*l[1][1]>=0},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});;/**/
(function($,window,document,undefined){Drupal.behaviors.general={attach:function(context){var screencheck=Drupal.behaviors.library.screencheck;if($(".investors-popup .investors-popup-slides").length){if($(".open-investors-popup").length){$(".investors-popup .investors-close-popup").unbind("click").click(function(event){event.preventDefault();$(".investors-popup").addClass("popup-invisible")});$(".open-investors-popup").unbind("click").click(function(event){event.preventDefault();$(".investors-popup").removeClass("popup-invisible")})}$(".investors-popup .investors-popup-slides").not(".slick-initialized").slick({slidesToShow:1,
slidesToScroll:1,autoplay:false,dots:true,arrows:false})}if($(".sli-four-box-section .sli-four-box .sli-four-box-inner").length)$(window).on("load resize",function(){if(!screencheck(480)){var equal_ht=Drupal.behaviors.library.equalheight;equal_ht(".sli-four-box-section .sli-four-box .sli-four-box-inner .sli-four-box-title h2",0);equal_ht(".sli-four-box-section .sli-four-box .sli-four-box-inner .sli-four-box-description",0)}});if($(".sli-top-border-box-section .sli-top-border-box .sli-top-border-box-inner").length)$(window).on("load resize",
function(){if(!screencheck(480)){var equal_ht=Drupal.behaviors.library.equalheight;equal_ht(".sli-top-border-box-section .sli-top-border-box .sli-top-border-box-inner .sli-top-border-box-title h2",0);equal_ht(".sli-top-border-box-section .sli-top-border-box .sli-top-border-box-inner .sli-top-border-box-description .sli-top-border-box-description-inner",0);equal_ht(".sli-top-border-box-section .sli-top-border-box .sli-top-border-box-inner .sli-top-border-box-description .sli-top-border-box-description-inner1",
0)}});$(".scroll-on-click").on("click",function(event){event.preventDefault();var link=$(this).attr("href");if($(".fixed-nav").hasClass("fixed"))var explore=$(link).offset().top-$(".fixed-nav").outerHeight();else var explore=$(link).offset().top-2*$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:explore},500)});$(".scroll-to-id").on("click",function(event){event.preventDefault();var link=$(this).attr("href");var explore=$(link).offset().top;$("html, body").animate({scrollTop:explore},
500)});var $win=$(window);$winW=function(){return $(window).width()};$winH=function(){return $(window).height()};$screensize=function(element){$(element).width($winW()).height($winH())};$("html").removeClass("no-js").addClass("js");$("#mainmenu li:first").addClass("first");$win.on("load",function(){$win.on("resize",function(){$screensize("your selector")}).resize()});$(window).on("resize",function(){if(screencheck(960))$(".footer .accordion-trigger").each(function(index){if(!$(this).attr("data-toggle"))$(this).attr("data-toggle",
"collapse")});else{$(".footer .accordion-trigger").each(function(index){$(this).removeAttr("data-toggle")});if($(".tab-section .tab-navigation li.active .tabslider-section").length)$(".tab-section .tabslider-section").appendTo(".view-content .container")}}).resize();if($(".footer .footer-col-md.footer-col-parent").length)$(".footer .footer-col-md.footer-col-parent").matchHeight();(function(){$(".tab-pane").on("show.bs.collapse hide.bs.collapse",function(e){if(e.type=="show"){$(".tab-pane").find(".collapse").removeClass("in");
$(".tab-pane").find(".panel-title").removeClass("open");$(this).find(".collapse").addClass("in");$(this).find(".panel-title").addClass("open")}else{$(this).find(".collapse").removeClass("in");$(this).find(".panel-title").removeClass("open")}})}).call(this);$(".footer-col-inner.collapse").on("show.bs.collapse hide.bs.collapse",function(e){if(e.type=="show"){$(".footer-col-parent").find(".footer-col-inner.collapse").removeClass("in");$(".footer-col-parent").find("h3").removeClass("open");$(this).addClass("in");
$(this).parents(".footer-col-parent").find("h3").addClass("open")}else $(this).parents(".footer-col-parent").find("h3").removeClass("open")});(function(){$(".footer-col-child .collapse").on("show.bs.collapse hide.bs.collapse",function(e){e.stopPropagation();if(e.type=="show"){$(".footer-col-parent").find(".footer-col-child .collapse").removeClass("in");$(".footer-col-inner").find("h4").removeClass("open");$(this).addClass("in");$(this).parents(".footer-col-child").find("h4").addClass("open")}else{$(this).removeClass("in");
$(this).parents(".footer-col-child").find("h4").removeClass("open")}})}).call(this);if($(".video-youtube").length)$(".video-youtube").venobox({framewidth:"640px",frameheight:"360px",titleattr:"data-title",numeratio:true,infinigall:true});if($(".venobox-image").length)$(".venobox-image").venobox({bgcolor:"#FFFFFF",numeratio:true,infinigall:true,spinner:"three-bounce"});var slick_banner={slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:1E4,dots:true,arrows:false,pauseOnHover:true,pauseOnFocus:false};
var slick_banner_append_dots={slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:1E4,dots:true,appendDots:$(".Slick-Navigation"),arrows:false,pauseOnHover:true,pauseOnFocus:false};if(!$("body.remove-banner-slider").length)if($(".slider-section").length)if($(".play-pause-wrapper-global .Slick-Navigation").length){$(".slider-section").not(".slick-initialized").slick(slick_banner_append_dots);if($(".node-type-ct-service-line-landing-page").length)$(".play-pause-wrapper-global .item:not(.slick-cloned)").each(function(){var slide_desc=
$(this).attr("aria-label");var slide_id=$(this).attr("aria-describedby");$(".play-pause-wrapper-global .Slick-Navigation #"+slide_id).attr("aria-label",slide_desc);$(".play-pause-wrapper-global .Slick-Navigation #"+slide_id+" button").attr("aria-label",slide_desc);$(".play-pause-wrapper-global .Slick-Navigation #"+slide_id+" button").attr("title",slide_desc)})}else $(".slider-section").not(".slick-initialized").slick(slick_banner);$(".slider-section .video-youtube").click(function(){$(".slider-section").slick("slickPause")});
$("body").on("click",".vbox-overlay",function(){$(".slider-section").slick("slickPlay")});if($(".carousel-section").length)$(".carousel-section").not(".slick-initialized").slick({slidesToShow:4,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,responsive:[{breakpoint:1198,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:640,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:478,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".sub-carousel").length)$(".sub-carousel").not(".slick-initialized").slick({slidesToShow:1,
slidesToScroll:1,autoplay:true,dots:true,arrows:false,pauseOnFocus:false,autoplaySpeed:5E3});var hash=window.location.hash;if(hash!=""){hash=hash.substring(1,hash.length);hash=encodeURI(hash);window.location.hash=hash}var flag=0;var obj;$("#block-bootstrap-general-bootstrap-fixed-nav .menu a").each(function(){var path=$(this).attr("href");var section=path.substr(path.indexOf("#")+0);if(hash==section){window.location.hash="";flag=1;obj=$(this)}});$(window).on("load",function(){if(flag==1)obj.click()});
$(".blue-bg").closest("[id*='block-']").addClass("blue-bg-wrap");$(".white-bg").closest("[id*='block-']").addClass("white-bg-wrap");$(window).resize(function(){var equal_ht=Drupal.behaviors.library.equalheight;if($(".equal_height").length)if(!screencheck(767))equal_ht(".equal_height",5)});$(window).resize(function(){var equal_ht=Drupal.behaviors.library.equalheight;if($(".footer-menu").length)if(!screencheck(767))equal_ht(".footer-menu",5)});keyFinancialTabs();keyFinancialTabsHash();function keyFinancialTabs(){var url=
document.location.toString();if(url.match("#")){window_width=$(window).width();if(window_width>=768)$('.event-campaign-html-section .key-financial-data ul.nav a[href="#'+url.split("#")[1]+'"]').tab("show");else $("#"+url.split("#")[1]+".panel-collapse").collapse("show")}}function keyFinancialTabsHash(){$(".event-campaign-html-section .key-financial-data ul.nav a").on("shown.bs.tab",function(e){if(history.pushState)history.pushState(null,null,e.target.hash);else location.hash=e.target.hash;$($(e.relatedTarget).attr("href")).removeClass("in active")});
$(".event-campaign-html-section .key-financial-data .panel").on("shown.bs.collapse",function(e){if(history.pushState)history.pushState(null,null,e.target.id);else location.hash=e.target.id})}$(".menu_name_wrapper.menu-main-menu-industries").attr("tabindex","0");$(".menu_name_wrapper.menu-main-menu-services").attr("tabindex","0");$(".menu_name_wrapper.menu-main-menu-about-us").attr("tabindex","0");$(".menu_name_wrapper.menu-main-menu-technology-leader").attr("tabindex","0");$(".menu_name_wrapper.menu-main-menu-careers").attr("tabindex",
"0");$(".cookie-policy-close").attr("tabindex","0");$(".leaf.dhtml-menu a").click(function(){$(this).tooltip("hide")});$("[data-toggle='tooltip']").tooltip();$(".main-menu .menu_name_wrapper").focusin(function(event){$(".main-menu .menu_name_wrapper.dropdown.hover").not(this).removeClass("hover")});$(document).keyup(function(event){if(event.which===27)$(".main-menu .menu_name_wrapper.dropdown.hover").removeClass("hover")});$(document).click(function(event){if(!$(event.target).parents(".main-menu").length)$(".main-menu .menu_name_wrapper.dropdown.hover").removeClass("hover")});
$(".main-menu .menu_name_wrapper.dropdown").bind("keydown",function(event){if(event.keyCode==13)$(this).addClass("hover")});if($(".view-views-media .form-type-date-popup input").length)$(".view-views-media .form-type-date-popup input").click(function(){$(".view-views-media .form-type-date-popup input").datepicker("option","maxDate",new Date)});if($(".bootom-header").length){$(".header-search-icon").unbind("click").click(function(event){if($(this).hasClass("show")){$("html, body").removeAttr("style");
$(".header-search-icon").text("Search");$(".small-screen-contact-us").attr("tabindex","0");$(".block-search .search-form .search-form-block-content-wrapper input").attr("tabindex","-1");$(".block-search .search-form .search-form-block-content-wrapper button").attr("tabindex","-1")}else{$(".header-search-icon").text("Close");$(".small-screen-contact-us").attr("tabindex","-1");$(".block-search .search-form .search-form-block-content-wrapper input").attr("tabindex","0");$(".block-search .search-form .search-form-block-content-wrapper button").attr("tabindex",
"0");$("html, body").css({overflow:"hidden",height:"100%"})}$(this).toggleClass("show");$(".bootom-header").toggleClass("show")});$("body a").focus(function(event){if(!$(this).parents(".top_search_form").length||!$(this).hasClass(".header-search-icon")||!$(this).hasClass(".small-screen-contact-us"))if($(".header-search-icon").hasClass("show")){$(".header-search-icon").trigger("click");$(".small-screen-contact-us").attr("tabindex","0")}});$(document).keyup(function(event){if(event.which===27)if($(".header-search-icon.show").length){$("html, body").removeAttr("style");
$(".header-search-icon.show").toggleClass("show");$(".bootom-header").toggleClass("show");$(".header-search-icon").text("Search");$(".small-screen-contact-us").attr("tabindex","0")}});var screencheck=Drupal.behaviors.library.screencheck;$(window).on("load resize",function(){if(screencheck(1064))$(".bootom-header .top_search_form .search-form-block-content-wrapper button").unbind("keydown").keydown(function(event){var keycode=event.keyCode?event.keyCode:event.which;if(keycode=="9"){$(".small-screen-contact-us").attr("tabindex",
"0");$(".small-screen-contact-us").focus();return false}})});$(".header-search-icon").unbind("keydown").keydown(function(event){var keycode=event.keyCode?event.keyCode:event.which;if(keycode=="27"){$(".block-search .search-form .search-form-block-content-wrapper input").attr("tabindex","-1");$(".block-search .search-form .search-form-block-content-wrapper button").attr("tabindex","-1");$(".header-search-icon").text("Search");$(".small-screen-contact-us").attr("tabindex","0")}})}if($(".breadcrumb-wrapper .general-revamp-breadcrumb-mobile .arrow .collapsed").length)$(".breadcrumb-wrapper .general-revamp-breadcrumb-mobile .arrow .collapsed").unbind("click").click(function(){$(".breadcrumb-wrapper .general-revamp-breadcrumb-mobile .arrow .collapsed .img-expanded").toggle();
$(".breadcrumb-wrapper .general-revamp-breadcrumb-mobile .arrow .collapsed .img-collapsed").toggle()});if($("#login-tabs").length>0){$("#login-tabs .nav-tabs a").on("shown.bs.tab",function(e){history.pushState({},"",e.target.href);if(e.target.hash!==undefined)$(e.target.hash).find("form").attr("action","/user"+e.target.hash)});var url=document.location.toString();if(url.match("#"))$('#login-tabs .nav-tabs a[href="#'+url.split("#")[1]+'"]').tab("show");$(".user-register-tab").click(function(event){$('#login-tabs .nav-tabs a[href="#register-form"]').tab("show");
event.preventDefault()})}$(document).ready(function(){function get_current_email_domain(email){email=email.toLowerCase();var current_email_domain=email.split("@").slice(1);current_email_domain=current_email_domain.toString();var domain=current_email_domain.substr(0,current_email_domain.indexOf("."));domain=domain.toLowerCase();return domain}var competition_list=["tcs","wipro","infosys","capgemini","accenture","cognizant","atos","dxc","dell","ibm","hexaware","microsoft","techmahindra"]});if($(".packaged-solution-form").length){$(".packaged-solution-form .schedule-demo").on("click",
function(){$(".packaged-solution-form .rhs-content.webform").css("visibility","visible")});$(".packaged-solution-form .rhs-content.webform .webform-inner h6").on("click",function(){$(".packaged-solution-form .rhs-content.webform").css("visibility","hidden")})}$('#ajax-webform-client-form-3468 .form-item-submitted-i-am-a-citizen-of-usa-federation .form-item.form-type-checkbox input[type="checkbox"], .workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation .form-item.form-type-checkbox input[type="checkbox"], .contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation .form-item.form-type-checkbox input[type="checkbox"], #webform-client-form-276483 .form-item-submitted-i-am-a-citizen-of-usa-federation .form-item.form-type-checkbox input[type="checkbox"').click(function(){if($(this).prop("checked")==
true)if($(".form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error").length)$(".form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error").remove()});$("#ajax-webform-client-form-3468 .contact-button.contact-field.form-submit, .workload-automation-form .form-submit, .contact-support-sales-form .form-submit, #webform-client-form-276483 .form-submit").click(function(){if($(".form-item-submitted-i-am-a-citizen-of-usa-federation .form-item.form-type-checkbox input").prop("checked")==
false)if(!$(".form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error").length){$(".form-item-submitted-i-am-a-citizen-of-usa-federation-yes label").css("color","red");$(".form-item-submitted-i-am-a-citizen-of-usa-federation .form-item.form-type-checkbox").after('<div for="submitted[i_am_a_citizen_of_usa_federation]_group" generated="true" class="custom-error" style="display: block;"><div class="info">U.S. Federal Government acknowledgement field is required. HCL provides software and services to U.S. Federal Government customers through its partner ImmixGroup, Inc. Please contact ImmixGroup, Inc. at <a href="mailto:HCLFederal@immixgroup.com">HCLFederal@immixgroup.com</a></div><span class="federation-close-popup">X</span></div>')}});
$("#ajax-webform-client-form-3468 select.contact-field.country, .workload-automation-form select#edit-submitted-gdpr-country, .contact-support-sales-form select#edit-submitted-gdpr-country--2, #webform-client-form-276483 select.contact-field.country").change(function(){var selectedCountry=$(this).children("option:selected").val();var country_list=["US","GU","MP","PR","AS","VI"];if(country_list.indexOf(selectedCountry)>-1){$(".form-item-submitted-i-am-a-citizen-of-usa-federation .form-type-checkbox label").show();
$("form.webform-client-form .form-item-submitted-i-am-a-citizen-of-usa-federation ~ .form-type-markup").show();$(".workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation").show();$(".contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation").show();$(".form-item-submitted-i-am-a-citizen-of-usa-federation").show()}else{$(".form-item-submitted-i-am-a-citizen-of-usa-federation .form-type-checkbox label").hide();$("form.webform-client-form .form-item-submitted-i-am-a-citizen-of-usa-federation ~ .form-type-markup").hide();
$(".workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation").hide();$(".contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation").hide();$(".form-item-submitted-i-am-a-citizen-of-usa-federation").hide()}});if($("#ajax-webform-client-form-3468, .workload-automation-form, .contact-support-sales-form, #webform-client-form-276483").length){var selectedCountry=$("#ajax-webform-client-form-3468 select.contact-field.country, .workload-automation-form select#edit-submitted-gdpr-country, .contact-support-sales-form select#edit-submitted-gdpr-country--2").children("option:selected").val();
var country_list=["US","GU","MP","PR","AS","VI"];if(country_list.indexOf(selectedCountry)>-1){$(".form-item-submitted-i-am-a-citizen-of-usa-federation .form-type-checkbox label").show();$("form.webform-client-form .form-item-submitted-i-am-a-citizen-of-usa-federation ~ .form-type-markup").show();$(".workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation").show();$(".contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation").show();$(".form-item-submitted-i-am-a-citizen-of-usa-federation").show()}else{$(".form-item-submitted-i-am-a-citizen-of-usa-federation .form-type-checkbox label").hide();
$("form.webform-client-form .form-item-submitted-i-am-a-citizen-of-usa-federation ~ .form-type-markup").hide();$(".workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation").hide();$(".contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation").hide();$(".form-item-submitted-i-am-a-citizen-of-usa-federation").hide()}}$("#ajax-webform-client-form-3468 .form-item-submitted-i-am-a-citizen-of-usa-federation, .workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation, .contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation, #webform-client-form-276483 .form-item-submitted-i-am-a-citizen-of-usa-federation").on("click",
"span.federation-close-popup",function(){if($("#ajax-webform-client-form-3468 .form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error, .workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error, .contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error, #webform-client-form-276483 .form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error").length)$("#ajax-webform-client-form-3468 .form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error, .workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error, .contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error, #webform-client-form-276483 .form-item-submitted-i-am-a-citizen-of-usa-federation .custom-error").remove()});
$(".why-asking-federation .why-asking-federation-link a").unbind("click").click(function(e){var form_id=$(this).closest("form")[0].id;if(typeof form_id!="undefined")$("#"+form_id+" .why-asking-federation .why-asking-federation-desc").not(":animated").slideToggle(10);return false});$('#ajax-webform-client-form-3468 .form-item-submitted-i-am-a-citizen-of-usa-federation-yes input[type="checkbox"], .workload-automation-form .form-item-submitted-i-am-a-citizen-of-usa-federation-yes input[type="checkbox"], .contact-support-sales-form .form-item-submitted-i-am-a-citizen-of-usa-federation-yes input[type="checkbox"], #webform-client-form-276483 .form-item-submitted-i-am-a-citizen-of-usa-federation-yes input[type="checkbox').click(function(){if($(this).prop("checked")==
true)$(".webform-component .form-item-submitted-i-am-a-citizen-of-usa-federation-yes label").css("color","#424143")});$("#webform-client-form-3479 .form-submit, .node-type-special-event-campaign-revamp .form-submit, node-type-special-event-campaign .form-submit, .dt-survey-exit-popup .form-submit, .node-type-special-page-revamp .form-submit, .node-type-special-event-campaign .form-submit, .node-type-jobs-campaign .form-submit, .node-type-job-posting-revamp .form-submit, .packaged-solution-form-box .form-submit, .node-type-analyst-pdfs .form-submit, .node-type-webinar .form-submit").click(function(){var form_id=
$(this).closest("form")[0].id;if(typeof form_id!="undefined")if(!$(".workload-automation-form select#edit-submitted-gdpr-country, .contact-support-sales-form select#edit-submitted-gdpr-country--2").length)if(form_id!="webform-client-form-3468")if($("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-item.form-type-checkbox input").prop("checked")==false)if(!$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .custom-error").length){$("#"+
form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee-yes label").css("color","red");if($(".node-type-webinar").length)$(".form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee-yes label").css("color","#333");$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-type-checkbox").after('<div for="submitted[i_am_a_citizen_of_usa_federation]_group" generated="true" class="custom-error" style="display: block;"><div class="info">U.S. Federal Government acknowledgement field is required. HCL provides software and services to U.S. Federal Government customers through its partner ImmixGroup, Inc. Please contact ImmixGroup, Inc. at <a href="mailto:HCLFederal@immixgroup.com">HCLFederal@immixgroup.com</a></div><span class="federation-close-popup">X</span></div>')}});
$('.form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-item.form-type-checkbox input[type="checkbox"]').click(function(){if($(this).prop("checked")==true){var form_id=$(this).closest("form")[0].id;if(typeof form_id!="undefined"){$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee-yes label").addClass("usa-federation-color").css("color","#fff");if($(".form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .custom-error").length)$("#"+form_id+
" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .custom-error").remove()}}else $(".form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee-yes label").removeClass("usa-federation-color")});$('.workblaze .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-item.form-type-checkbox input[type="checkbox"], #webform-client-form-3807 .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-item.form-type-checkbox input[type="checkbox"]').click(function(){if($(this).prop("checked")==
true){var form_id=$(this).closest("form")[0].id;if(typeof form_id!="undefined"){$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee-yes label").addClass("usa-federation-color").css("color","#424143");if($(".form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .custom-error").length)$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .custom-error").remove()}}else $(".form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee-yes label").removeClass("usa-federation-color")});
$(document).on("click",".form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee span.federation-close-popup",function(){if($(this).parents(".form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee").find(".custom-error").length)$(this).parents(".form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee").find(".custom-error").remove()});$("#webform-client-form-3479 select#edit-submitted-gdpr-country, .node-type-webinar-campaign .form-item-submitted-gdpr-country select, .node-type-special-event-campaign-revamp .form-item-submitted-gdpr-country select, .node-type-special-event-campaign .form-item-submitted-gdpr-country select, .dt-survey-exit-popup .form-item-submitted-gdpr-country select, .node-type-special-page-revamp .form-item-submitted-gdpr-country select, .node-type-jobs-campaign .form-item-submitted-gdpr-country select, #webform-client-form-3479 .form-item-submitted-gdpr-country select, .node-type-job-posting-revamp .form-item-submitted-gdpr-country select, .packaged-solution-form-box .form-item-submitted-gdpr-country select, .node-type-analyst-pdfs select#edit-submitted-gdpr-country--2, .node-type-analyst-pdfs select#edit-submitted-gdpr-country, .node-type-analyst-pdfs select#edit-submitted-gdpr-country--3,  .node-type-webinar select#edit-submitted-gdpr-country").change(function(){var form_id=
$(this).closest("form")[0].id;if(typeof form_id!="undefined"){var selectedCountry=$(this).children("option:selected").val();var country_list=["United States","GU","MP","PR","AS","VI","US"];if(country_list.indexOf(selectedCountry)>-1){$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-type-checkbox label").show();$("#"+form_id+".webform-client-form .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee ~ .form-type-markup").show();$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee").show()}else{$("#"+
form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-type-checkbox label").hide();$("#"+form_id+".webform-client-form .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee ~ .form-type-markup").hide();$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee").hide()}}});if($("#webform-client-form-3479 select#edit-submitted-gdpr-country, .node-type-webinar-campaign, .node-type-special-event-campaign-revamp .form-item-submitted-gdpr-country, .node-type-special-event-campaign .form-item-submitted-gdpr-country, .dt-survey-exit-popup .form-item-submitted-gdpr-country select, .node-type-special-page-revamp .form-item-submitted-gdpr-country, .node-type-jobs-campaign, #webform-client-form-3479 .form-item-submitted-gdpr-country select, .node-type-job-posting-revamp .form-item-submitted-gdpr-country select, .packaged-solution-form-box, .node-type-analyst-pdfs select#edit-submitted-gdpr-country--2, .node-type-analyst-pdfs select#edit-submitted-gdpr-country--3, .node-type-analyst-pdfs select#edit-submitted-gdpr-country, .node-type-webinar select#edit-submitted-gdpr-country, .node-type-power20 .form-item-submitted-gdpr-country select, #covid_webform_popup .left-right-wrapper.wrapper-resources-popup .form-item-submitted-gdpr-country select").length){var country_list=
["United States","GU","MP","PR","AS","VI","US"];$("form").each(function(){var form_id="";form_id=this.id;if(form_id!="")if(typeof form_id!="undefined")if(!form_id.trim()){var selectedCountry=$("#"+form_id+" select#edit-submitted-gdpr-country, .node-type-webinar-campaign #"+form_id+" .form-item-submitted-gdpr-country select, .node-type-special-event-campaign-revamp #"+form_id+" .form-item-submitted-gdpr-country select, .node-type-special-event-campaign #"+form_id+" .form-item-submitted-gdpr-country select, .node-type-special-page-revamp #"+
form_id+" .form-item-submitted-gdpr-country select, .node-type-jobs-campaign #"+form_id+" .form-item-submitted-gdpr-country select, #"+form_id+" .form-item-submitted-gdpr-country select, .node-type-job-posting-revamp #"+form_id+" .form-item-submitted-gdpr-country select, .packaged-solution-form-box #"+form_id+" .form-item-submitted-gdpr-country select, .node-type-power20 #"+form_id+"  .form-item-submitted-gdpr-country select").children("option:selected").val();if(form_id.includes("webform"))if(country_list.indexOf(selectedCountry)>
-1){$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-type-checkbox label").show();$("#"+form_id+".webform-client-form .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee ~ .form-type-markup").show();$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee").show()}else{$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee .form-type-checkbox label").hide();$("#"+form_id+".webform-client-form .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee ~ .form-type-markup").hide();
$("#"+form_id+" .form-item-submitted-i-am-a-citizen-of-usa-federation-gvt-employee").hide()}}})}$(".dropdown-toggle").removeAttr("data-target");if($(".node-type-ct-kale-jd .kale-job-form .form-item-submitted-resume .form-file.error").length){$(".kale-job-form").addClass("in");$(".kale-job-form").show();if(!$(".node-type-ct-kale-jd .kale-job-form .kale-form-error").length)$(".node-type-ct-kale-jd .kale-job-form .form-item-submitted-resume").prepend("<div class='error kale-form-error'>Please upload a valid file.</div>")}$("body.node-type-webinar .webform-component").each(function(){if($(this).find(".control-label"))$(this).find(".form-control").insertAfter($(this).find(".control-label"))});
if($(".page-campaign-kale-hiring").length){Drupal.behaviors.library.threeTabOverlay(".three_tab_overlay .tab_content",".three_tab_overlay ul.tabs li",".three_tab_overlay .tab_drawer_heading");$("#leadership .col-container").unbind("click").click(function(){Drupal.behaviors.library.slide_desc("#leadership",this,".col-container",".content-block",".more-info-container")});$(document).click(function(){$("#leadership .more-info-container").each(function(){if($(this).css("display")=="block")$(this).prev().find(".col-container").click()})});
$("#leadership .more-info-container").click(function(event){event.stopPropagation()});$("#leadership .content-block").click(function(event){event.stopPropagation()});$(".application-block-content .box-info").click(function(event){if(screencheck(767))Drupal.behaviors.library.accordion_content($(this),".application-block-content",".box-table",".box-content",event)});$(".application-block-content .box-table").click(function(event){if(!screencheck(767))Drupal.behaviors.library.application_content($(this))});
$(".application-block-content .box-info").click(function(event){if(!screencheck(767)){$(".box-info").removeClass("active");$(this).addClass("active")}});var job_map=$(".page-campaign-kale-hiring .job-campaign-maps");$(".map-list .jc-map .multi-map",job_map).on("click",function(){var embed_src=$(this).find("span.map-embed-code").html();$(".map-list .jc-map .multi-map").removeClass("selected");$(this).addClass("selected");$(".job-map",job_map);if($(".job-map iframe",job_map).length)$(".job-map iframe",
job_map).attr("src",embed_src)});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;equal_ht(".page-campaign-kale-hiring .Horizontal .paraHeight",0);equal_ht(".page-campaign-kale-hiring .Horizontal .paraHeight1",0);equal_ht(".job-campaign-maps .map-list .jc-map .jc-map-inner",0);var slick_equal_ht=Drupal.behaviors.library.equalheightslickdots;if(!screencheck(768)){var mapLH=$(".job-campaign-maps .map-list .jc-map").outerHeight();var mapH=mapLH*3;$(".job-map iframe").css("height",
mapH)}var max=Drupal.behaviors.library.equalheight(".kale-hiring-news .videos-section .name",0);if($(".kale-hiring-news .videos-section .name").length){var slick_bottom=max+30;$(".kale-hiring-news .videos-section .name").closest(".slick-dotted").find(".slick-dots").css("bottom",slick_bottom)}equal_ht(".page-campaign-kale-hiring .videos-news-section .same-height",0)});$(".job-campaign-maps .map-list").not(".slick-initialized").slick({dots:false,arrows:true,slidesToShow:3,slidesToScroll:1,vertical:true,
autoplay:false,autoplaySpeed:5E3,infinite:true,speed:300,responsive:[{breakpoint:768,settings:{slidesToShow:2}}]});if($(".page-campaign-kale-hiring .dpo-mutili-banner").length)$(".page-campaign-kale-hiring .dpo-mutili-banner").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:true,arrow:false,autoplay:true})}if($(".node-type-webinar .webform-client-form .form-item-submitted-solutions").length){var last_valid_selection=null;$(".node-type-webinar .webform-client-form .form-item-submitted-solutions select").change(function(event){if($(this).val().length>
5)$(this).val(last_valid_selection);else last_valid_selection=$(this).val()})}if($(".play-pause-wrapper-global").length){$(document).on("click",".play",function(){$(this).find(".fa").removeClass("fa-play-circle-o").addClass("fa-pause-circle-o");$(this).removeClass("play");$(this).addClass("pause");$(this).attr("aria-label","pause");$(this).parent(".play-pause-wrapper-global").find(".slick-initialized").slick("slickPlay")});$(document).on("click",".pause",function(event){$(this).find(".fa").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");
$(this).removeClass("pause");$(this).addClass("play");$(this).attr("aria-label","play");$(this).parent(".play-pause-wrapper-global").find(".slick-initialized").slick("slickPause")});$(document).keypress(function(event){var keycode=event.keyCode?event.keyCode:event.which;if(keycode=="13"){$(this).find(".fa").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");$(this).removeClass("pause");$(this).addClass("play");$(this).attr("aria-label","play");$(this).parent(".play-pause-wrapper-global").find(".slick-initialized").slick("slickPause")}})}if($(".slick-initialized").length){var windowWidth=
$(window).width();if(windowWidth>1200){if($(".slick-prev").length){$(".slick-prev").attr("data-toggle","tooltip");$(".slick-prev").attr("data-title","Previous")}if($(".slick-next").length){$(".slick-next").attr("data-toggle","tooltip");$(".slick-next").attr("data-title","Next")}$("[data-toggle=tooltip]").tooltip({trigger:"hover"})}}if($(".top_search_form .search-form-block-content-wrapper .custom-search-box").length)$(".top_search_form .search-form-block-content-wrapper input.custom-search-box").unbind("keypress").keypress(function(event){var keycode=
event.keyCode?event.keyCode:event.which;if(keycode=="40")if($(".ac_results li").length)if(!$(".ac_results:first-of-type li div.selected_element").length){$(".ac_results:first-of-type li:first-child div").addClass("selected_element");$(".ac_results:first-of-type li:first-child div").focus()}});if($("#block-general-blocks-global-contact-form").length)$("#block-general-blocks-global-contact-form").unbind("keydown").keydown(function(event){var keycode=event.keyCode?event.keyCode:event.which;if(keycode==
"27"){$("#block-general-blocks-global-contact-form button.ctools-collapsible-handle").click();$("#block-general-blocks-global-contact-form button.ctools-collapsible-handle").focus()}});if($(".fixed-nav .menulines-button").length&&$("#block-bootstrap-general-bootstrap-fixed-nav").length){$(".fixed-nav .menulines-button").unbind("keydown").keydown(function(event){var keycode=event.keyCode?event.keyCode:event.which;if(keycode=="13"||keycode=="27")$(this).click();if(keycode=="40")$("#block-bootstrap-general-bootstrap-fixed-nav ul.menu li:nth-child(2) a").focus()});
$("#block-bootstrap-general-bootstrap-fixed-nav ul.menu li a").unbind("keydown").keydown(function(event){var keycode=event.keyCode?event.keyCode:event.which;if(keycode=="40")if(!$(this).parent().is(":last-child"))$(this).parent().next().find("a").focus();if(keycode=="38")if($(this).parent().is(":nth-child(2)"))$(".fixed-nav .menulines-button").focus();else $(this).parent().prev().find("a").focus();if(keycode=="27"){$(".fixed-nav .menulines-button").click();$(".fixed-nav .menulines-button").focus()}})}}}})(jQuery,
window,document);;/**/
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.commonblock = {
    attach: function (context){
      var screencheck = Drupal.behaviors.library.screencheck;

    	// Contact us form.
    	$(window).on("load", function() {
    		$('#block-general-blocks-global-contact-form').show();
    	});

      $('#block-general-blocks-global-contact-form .ctools-collapsible-handle').click(function() {
        if ($('#block-general-blocks-global-contact-form .ctools-collapsible-container').hasClass('ctools-collapsed')) {
          $('#block-general-blocks-global-contact-form .ctools-collapsible-handle div').hide();
        } else {
          $('#block-general-blocks-global-contact-form .ctools-collapsible-handle div').show();

          // Set height of contact us form.
          //var viewportHeight = $(window).height();
          //var calHeight = viewportHeight - $('#block-general-blocks-global-contact-form .ctools-collapsible-handle').outerHeight();
          //$('#block-general-blocks-global-contact-form .webform-client-form').outerHeight(calHeight);

          // Set custom scroll.
          // $("#block-general-blocks-global-contact-form .webform-client-form").mCustomScrollbar();
        }
      });

      // Hide form when click outside.
      $(document).click(function() {
        if (!$('#block-general-blocks-global-contact-form .ctools-collapsible-container').hasClass('ctools-collapsed')) {
          $('#block-general-blocks-global-contact-form .ctools-collapsible-handle').click();
        }
      });

      $('#block-general-blocks-global-contact-form').click(function(event) {
        event.stopPropagation();
      });

      // Override contact us button functionality and replace it with a link.
      // For reference: https://www.hcltech.com/enterprise-studio
      if ($(".contact-override-link").length > 0) {
        $('.packaged-solution-form .configurable-form-section .schedule-demo img').click(function(event) {
          $('.packaged-solution-form .rhs-content.webform').hide();
          location.href = $(".contact-override-link").text();
        });
      }

      // Hide search in header.
      if (screencheck(1064)) {
        $('.search-dummy-icon').click(function(){
          $('.right-menu-small-screen form').toggleClass('active');
          $(this).toggleClass('hide');
        });

        $('#navbar .top-header .search-form.form-search.content-search .btn-primary').click(function(event){
          event.preventDefault();
          $('.right-menu-small-screen form').toggleClass('active');
          $('.search-dummy-icon').toggleClass('hide');
        });
      }

      /* Fixed Navigation Menu
      ---------------------------------------------------------------------*/
      // Menu Icon Append prepend for responsive
      $(window).on('resize', function(){
        if (screencheck(767)) {
          if(!$('#menu').length){
            $('.fixed-nav .container').append('<div class="menulines-button-block"><a data-toggle="collapse" data-target=".fixed-nav .container .block-menu" id="menu" class="menulines-button" tabindex="0"><span class="menulines"></span> <em>Menu</em></a></div>');
          }
          if(!$('.fixed-nav .container .block-menu').hasClass('collapse')){
            $('.fixed-nav .container .block-menu').addClass('collapse');
          }
        } else {
          $('.menulines-button-block').remove();
          $('#block-menu-menu-iot-nav').removeClass('collpase');
          $('.region-fixed-nav .block-menu').removeClass('collapse');
        }
      }).resize();

      if($('.fixed-nav .menu').length){
        $('.fixed-nav .menu').onePageNav({
          changeHash: true,
          scrollThreshold: 0.2,
          // end: function() {
          //   if(!$('body').hasClass('exclude-fixednav-end')) {
          //     var tab_element = $('.fixed-nav .menu li.current a').attr('href').split("#").pop();
          //     $('#' + tab_element).attr("tabindex",-1).focus();
          //   }
          // },
        });
      }

      if($('.fixed-nav').length){
        if( $(window).scrollTop() > 100 ){
          $('.fixed-nav').addClass('fixed');
        }
        $(window).scroll( function(){
          if( $(window).scrollTop() > 100 ){
            $('.fixed-nav').addClass('fixed');
          } else {
            $('.fixed-nav').removeClass('fixed');
          }
        });
      }

      $('.fixed-nav .menu li a').click( function(e){
        var htm_cont = $(this).html();
        $('.fixed-nav #menu').removeClass('menuopen')
        $('.fixed-nav .block-menu').removeClass('in');
        $('#menu em').html(htm_cont);
      });

      if($('.fixed-nav').length) {
        $(window).scroll(function() {
          var current_section = $('.fixed-nav .menu li.current');
          var current_section_html = $('a', current_section).html();
          var index = current_section.index();
          var menu_html = ((index < 1) ? 'Menu' : current_section_html);
          $('#menu em').html(menu_html);
        });
      }

      $('a.bootstrap-section').click(function(event) {
        section = $(this).attr('href').split("#").pop();
        if ($('#' + section).length) {
          var scrollAmount = $('#' + section).offset().top - ($('.fixed-nav').outerHeight()) - 100;
          $("html, body").animate({scrollTop: scrollAmount});
        }
      });

      // Scroll to local nav blocks.
      // $('.region-fixed-nav .block-menu a').click(function(e) {
      //   var offset;
      //   var localNav = $('.fixed-nav').outerHeight(true);
      //   var obj = $(this).attr('href').substr($(this).attr('href').indexOf('#') + 0);
      //   var paddingTop = parseFloat($(obj).closest('.block').css('paddingTop'));

      //   if (!$('.fixed-nav').hasClass('fixed')) {
      //     offset = $(obj).offset().top - ((localNav * 2) + paddingTop) ;
      //   } else {
      //     offset = $(obj).offset().top - (localNav + paddingTop);
      //   }

      //   $("html, body").animate({ scrollTop: offset }, 600);
      // });

      // Vertically align the logo in fixed nav.
      $(window).on("load", function() {
        Drupal.behaviors.library.vertical_align_block('.fixed-nav', '.fixed-nav-logo');
      });

      // Scroll back to top.
      $('.fixed-nav-logo a').click(function() {
        if ($('.fixed-nav').hasClass('fixed')) {
          $("html, body").animate({ scrollTop: 0 }, "slow");
        }
      });

      // client success slick pause and paly when popup open and close;

      $("#clientsuccess .video-youtube").click(function() {
        $('.sub-carousel').slick('slickPause');
      });

      $("body").on("click", ".vbox-overlay", function() {
        $('.sub-carousel').slick('slickPlay');
      });

    }
  }


})(jQuery, Drupal, this, this.document);
;/**/
(function($,Drupal,window,document,undefined){Drupal.behaviors.library={screencheck:function(mediasize){var $win=$(window),$doc=$(document),$winW=function(){return $(window).width()},$winH=function(){return $(window).height()},$mainmenu=$("#mainmenu"),$screensize=function(element){$(element).width($winW()).height($winH())};if(typeof window.matchMedia!=="undefined"){var screensize=window.matchMedia("(max-width:"+mediasize+"px)");if(screensize.matches)return true;else return false}else if($winW()<=
mediasize)return true;else return false},equalheight:function(selector,extra_space){if($(selector).length){$(selector).css("height","auto");var max=0;$(selector).each(function(){var h=$(this).height();max=h>max?h:max});max=max+extra_space;$(selector).height(max);return max}},equalheightslickdots:function(selector,extra_space){var max=Drupal.behaviors.library.equalheight(selector,extra_space);if($(selector).length){var slick_bottom=max+62;$(selector).closest(".slick-dotted").find(".slick-dots").css("bottom",
slick_bottom)}},equalheightSomeblock:function(block1,block2){if($(block1).length&&$(block2).length){$(block2).css("height","auto");var calPadding=parseFloat($(block1).children().css("padding-top"))*3;var calHeight=$(block1).height()-calPadding;$(block2).height(calHeight)}},testimonial_slider:function(selector){var $carousel=$(selector);var screencheck=Drupal.behaviors.library.screencheck;if(screencheck(1023)){if($carousel.length)$carousel.not(".slick-initialized").slick({slidesToShow:3,slidesToScroll:1,
arrows:true,infinite:false,responsive:[{breakpoint:640,settings:{slidesToShow:2}},{breakpoint:480,settings:{slidesToShow:1}}]})}else if($carousel.hasClass("slick-initialized"))$carousel.unslick},services_icon:function(selector){$(selector).each(function(index){$getImageSrc=$(this).find("img").attr("src");$(this).find(".icon").css("background-image","url("+$getImageSrc+")")})},slide_desc:function(section,selector,commonSelector,selectorParent,descBlock){if($(selector).parents(selectorParent).next(descBlock).is(":visible")){$(selector).parents(section).removeClass("show-info");
$(selector).parents(selectorParent).next(descBlock).fadeOut();$(selector).removeClass("open");var scrollAmount=$(selector).offset().top-$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:scrollAmount},200)}else{$(selector).parents(section).addClass("show-info");$(section+" "+commonSelector).removeClass("open");$(selector).addClass("open");$(descBlock).hide();var scrollAmount=$(selector).offset().top-$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:scrollAmount},200);
$(selector).parents(selectorParent).next(descBlock).slideDown()}$(".close-trigger").unbind().click(function(){$(section).removeClass("show-info");$(section+" "+commonSelector).removeClass("open");$(descBlock).slideUp();var scrollAmount=$(selector).offset().top-$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:scrollAmount},200);return false})},application_content:function(selector){var title=$(".sub-heading",$(selector)).html();var content=$(".box-content",$(selector)).html();parent_wrapper=
$(selector).parents(".application-block-content");if(parent_wrapper.length){parent_wrapper.find(".application-content .sub-heading").html(title);parent_wrapper.find(".application-content .sub-heading").siblings().remove();parent_wrapper.find(".application-content .sub-heading").after(content)}},accordion_content:function(selector,section,outerBlock,contentBlock,event){event.stopPropagation();event.stopImmediatePropagation();if($(selector).parent().hasClass("active")){$(selector).parent().toggleClass("active");
$(selector).next().slideToggle(function(){var scrollAmount=$(selector).offset().top-$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:scrollAmount},200)})}else{$(section+" "+outerBlock+".active"+" "+contentBlock).slideUp("fast");$(section+" "+outerBlock).removeClass("active");$(selector).parent().toggleClass("active");$(selector).next().slideToggle(function(){var scrollAmount=$(selector).offset().top-$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:scrollAmount},200)})}},
vertical_align_block:function(parentBlock,childBlock){var parentHeight=$(parentBlock).height();var childHeight=$("img",$(childBlock)).height();var calPadding=(parentHeight-childHeight)/2;$(childBlock).css("padding-top",calPadding);$(childBlock).css("padding-bottom",calPadding)},video_slider:function(selector){$(selector).not(".slick-initialized").slick({arrows:true,dots:false,infinite:true,slidesToShow:4,slidesToScroll:4,responsive:[{breakpoint:1023,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:767,
settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:460,settings:{slidesToShow:1,slidesToScroll:1}}]})},united_video_slider:function(selector){$(selector).not(".slick-initialized").slick({arrows:true,dots:false,infinite:true,slidesToShow:3,slidesToScroll:3,responsive:[{breakpoint:1023,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:767,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:460,settings:{slidesToShow:1,slidesToScroll:1}}]})},top_bottom_padding:function(selector){var max=
0;$(selector).each(function(){var h=$(this).innerHeight();max=h>max?h:max});$("body").data("rbtc_max",max);$(selector).each(function(){var h=$(this).height();var calPadding=(max-h)/2;$(this).css("padding-top",calPadding);$(this).css("padding-bottom",calPadding)})},vertical_align_banner_block:function(bannerWrapper,contentWrapper){var bannerHeight=$(bannerWrapper).outerHeight();var contentHeight=$(contentWrapper).outerHeight();var topPos=(bannerHeight-contentHeight)/2;topPosi=topPos>20?topPos:20;$(contentWrapper).css("top",
topPosi)},vertical_align_banner_block_with_padding:function(bannerWrapper,contentWrapper){var bannerHeight=$(bannerWrapper).outerHeight();var contentHeight=$(contentWrapper).outerHeight();var topPos=(bannerHeight-contentHeight)/2;topPosi=topPos>20?topPos:20;$(contentWrapper).css("padding-top",topPosi)},threeTabOverlay:function(tabContent,tabsLi,accordionHeading){$(tabContent).hide();$(tabContent+":first").show();$(tabsLi).click(function(){$(tabContent).hide();var activetab=$(this).attr("rel");$("#"+
activetab).fadeIn();$(tabsLi).removeClass("active");$(this).addClass("active");$(accordionHeading).removeClass("d_active");$(accordionHeading+"[rel^='"+activetab+"']").addClass("d_active")});$(accordionHeading).unbind("click").click(function(){if($(this).hasClass("d_active"))if($(this).next().css("display")=="none")$(this).next().fadeIn();else{$(this).next().hide();$(this).removeClass("d_active")}else{$(tabContent).hide();var d_activeTab=$(this).attr("rel");$("#"+d_activeTab).fadeIn();$(accordionHeading).removeClass("d_active");
$(this).addClass("d_active");$(tabsLi).removeClass("active");$(tabsLi+"[rel^='"+d_activeTab+"']").addClass("active")}});$(tabsLi).last().addClass("tab_last");$(accordionHeading).click(function(){var fixnavH=$(".fixed-nav").outerHeight();var acrHTPos=$(this).offset().top-fixnavH;if($(".fs-big-pebble .sticky-on-scroll").length)if($(".fs-big-pebble .sticky-on-scroll").hasClass("sticky-fixed"))var acrHTPos=$(this).offset().top-$(".fs-big-pebble .sticky-on-scroll").outerHeight();$("html, body").animate({"scrollTop":acrHTPos},
300)})},changeUrl:function(page,url){if(typeof history.pushState!="undefined"){var obj={Page:page,Url:url};history.pushState(obj,obj.Page,obj.Url)}}};Drupal.behaviors.meanNavAdjust={mean_nav_mainmenu_top_adjust:function(context,settings){top_distance=0;if($(".lang-link-popup").length!=0&&$(".lang-link-popup").css("position")=="static"&&$(".lang-link-popup").is(":visible"))top_distance=$(".lang-link-popup").outerHeight();top_distance=top_distance+$(".omege-header").outerHeight();$(".mean-nav").css("top",
top_distance)}}})(jQuery,Drupal,this,this.document);;/**/
(function($, Drupal, window, document, undefined) {

  Drupal.behaviors.menu = {
  	attach: function (context){
	  	//code for mobile
	  	var screencheck = Drupal.behaviors.library.screencheck;
      var main_menu = '#block-om-maximenu-om-maximenu-1';
      $(window).on('load resize', function() {

      if(('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-2').length){
        $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-2 .dropdown-menu li').once().each(function(){
          if($(this).hasClass('has-arrow')) {
            $(this).children('a').after("<span class='arrow'></span>");
          }
        });
      }
      if(('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-1 .services-mode-column').length){
        $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-1 .services-mode-column .dropdown-menu li').once().each(function(){
          if($(this).hasClass('has-arrow')) {
            $(this).children('a').after("<span class='arrow'></span>");
          }
        });
      }
      if(('.leaf-return-t-ABOUT-US- .block-menu-id-menu-main-menu-about-us .vertical-column').length){
        $('.leaf-return-t-ABOUT-US- .block-menu-id-menu-main-menu-about-us .vertical-column .dropdown-menu li').once().each(function(){
          if($(this).hasClass('has-arrow')) {
            $(this).children('a').after("<span class='arrow'></span>");
          }
        });
      }
	  	if (screencheck(1064)) {
        if ($('.accessibiity-new-changes #navbar .small-screen-contact-us').length) {
          $(document).unbind("keydown").keydown(function (event) {
            // If user enter D key, then focus on contact us in main menu.
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '68') {
              var target = $(event.target);
              if (target.is("input") || target.is("textarea")) {
              }
              else {
                $('.accessibility-contrast #navbar .small-screen-contact-us').focus();
              }
            }
          });
        }

        $(main_menu + ' .om-link').each(function(index, el) {
          $(this).text($(this).text().toLowerCase());
        });

        $('.menu-overlay-open').unbind("click").click(function(event) {
          event.stopPropagation()
          $(main_menu).slideToggle();
          $(main_menu).toggleClass('open');
        });

        // Closes menu when user comes on next option other than menu item.
        $('.accessibility_mobile_logo, #skip-link').focus(function (event) {
          $(main_menu).slideUp();
          $(main_menu).removeClass('open');
        });

        //also close main menu if anything else is clicked.
        $('body').click(function(){
          if ($(main_menu).hasClass('open')) {
            $(main_menu).slideToggle();
            $(main_menu).toggleClass('open');
          }
        });

        $(main_menu).click(function(event){
          event.stopPropagation()
        });

        /*$('.services-mode-column .has-arrow .dropdown-toggle').click(function(event) {
          var href = $(this).attr('href');
          window.location.href = href;
        });*/

	  		$(main_menu + ' .om-link').unbind("click").click(function() {
	  			//close all other open menus
	  			if (!$(this).closest('.om-leaf').hasClass('active')) {
	  				$('.om-leaf').removeClass('active');
	  			}
	  			$(this).closest('.om-leaf').toggleClass('active');
	  			var scrollAmount = $(this).offset().top;
	  			$("html, body").animate({scrollTop: scrollAmount},200);
	  		});

        $(main_menu + ' .om-link').unbind("keydown").keydown(function (event) {
          var keycode = (event.keyCode ? event.keyCode : event.which);
          if (keycode == '13') {
            $(this).trigger('click');
          }
          // Closes menu when user presses ESC. Will work only on parent links.
          if (keycode == '27') {
            $(main_menu).slideUp();
            $(main_menu).removeClass('open');
          }
        });

	  		$(main_menu + ' .has-children a.dropdown-toggle').unbind("click").click(function(event){
	  			if (!$(this).parent('.has-children').hasClass('has-arrow')) {
            event.preventDefault();
            $(this).parent('.has-children').toggleClass('drop-active');
          }
	  			/*if ($(this).parent('.has-children').hasClass('drop-active')) {
	  				$('.drop-active').removeClass('drop-active');
	  			}*/
	  			var scrollAmount = $(this).offset().top;
	  			// $("html, body").animate({scrollTop: scrollAmount},200);
	  		});
        $(main_menu + ' .has-arrow .arrow').unbind("click").click(function(event){
          $(this).parent('.has-children').toggleClass('drop-active');
          var scrollAmount = $(this).offset().top;
        });

	  		// $(main_menu + ' .has-children a').click(function(event){
	  		// 	event.preventDefault();
	  		// 	if (!$(this).closest('li').hasClass('drop-active')) {
	  		// 		$('.drop-active').removeClass('drop-active');
	  		// 	}
	  		// 	$(this).closest('li').toggleClass('drop-active');
	  		// 	var scrollAmount = $(this).offset().top;
	  		// 	$("html, body").animate({scrollTop: scrollAmount},200);
	  		// });

	  	}
	  	else {
        if ($('.accessibility-contrast #om-maximenu-Mega-Main-Menu .link-CONTACT-US').length) {
          $(document).unbind("keydown").keydown(function (event) {
            // If user enter D key, then focus on contact us in main menu.
            var keycode = (event.keyCode ? event.keyCode : event.which);
            if (keycode == '68') {
              var target = $(event.target);
              if (target.is("input") || target.is("textarea")) {
              }
              else {
                $('#om-maximenu-Mega-Main-Menu a.link-CONTACT-US').focus();
              }
            }
          });
        }
        // Close opened menu when tab is pressed on next item.
        $('.block-om-maximenu #om-menu-Mega-Main-Menu .om-link').unbind("focus").focus(function (event) {
          $('#om-menu-Mega-Main-Menu li.om-leaf').removeClass("open-menu-accessibility");
        });

        $('.block-om-maximenu #om-menu-Mega-Main-Menu li.om-leaf li.leaf a').unbind("keydown").keydown(function (event) {
          // Escase key. Close menu.
          var keycode = (event.keyCode ? event.keyCode : event.which);
          if (keycode == '27') {
            if ($(this).parents('li.om-leaf').hasClass("open-menu-accessibility")) {
              $(this).parents('li.om-leaf').removeClass("open-menu-accessibility");
            }
          }
        });
        $('.block-om-maximenu #om-menu-Mega-Main-Menu li').unbind("keydown").keydown(function (event) {
          if ($(this).find(".om-maximenu-content").length) {
            var keycode = (event.keyCode ? event.keyCode : event.which);
            // When enter key pressed, open menu. When enter key is pressed on already opened menu, close it.
            if (keycode == '13') {
              $('#om-menu-Mega-Main-Menu li.om-leaf').not(this).removeClass("open-menu-accessibility");
              if (!$(this).hasClass("open-menu-accessibility")) {
                $(this).addClass("open-menu-accessibility");
                if ($(this).hasClass("leaf-return-t-SERVICES-PRODUCTS-")) {
                  servies_column_height();
                }
              }
              else {
                $(this).removeClass("open-menu-accessibility");
              }
            }
            else {
              // Escase key. Close menu.
              if (keycode == '27') {
                if ($(this).hasClass("open-menu-accessibility")) {
                  $(this).removeClass("open-menu-accessibility");
                }
              }
            }
          }
        });

        $('.leaf-return-t-SERVICES-PRODUCTS-').hover(function() {
          servies_column_height();
        });
        $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .services-mode-column:nth-child(2) .dropdown-menu .arrow').once().on('click', function(e) {
          //e.preventDefault();
          $(this).siblings('ul.dropdown-menu').slideToggle('normal');
          $(this).toggleClass("nav-open");
        });
        $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .services-mode-column:nth-child(3) .dropdown-menu .arrow').once().on('click', function(e) {
          //e.preventDefault();
          $(this).siblings('ul.dropdown-menu').slideToggle('normal');
          $(this).toggleClass("nav-open");
        });
        $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .services-mode-column:nth-child(4) .dropdown-menu .arrow').once().on('click', function(e) {
          //e.preventDefault();
          $(this).siblings('ul.dropdown-menu').slideToggle('normal');
          $(this).toggleClass("nav-open");

        });
        $('.leaf-return-t-ABOUT-US- .block-menu-id-menu-main-menu-about-us .vertical-column .dropdown-menu .arrow').once().on('click', function(e) {
          //e.preventDefault();
          $(this).siblings('ul.dropdown-menu').slideToggle('normal');
          $(this).toggleClass("nav-open");

        });
        $('.leaf-return-t-ABOUT-US- .block-menu-id-menu-main-menu-about-us .vertical-column .dropdown-menu li a').once().click(function(event) {
          if($(this).parent().hasClass('link-disabled')){
            event.preventDefault();
          }
          else {
            var href = $(this).attr('href');
            window.location.href = href;
            // window.open(href, "_blank");
          }
        });
        $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column a.dropdown-toggle').once().click(function(event) {
          if($(this).parent().hasClass('link-disabled')){
            event.preventDefault();
          }
          else {
            var href = $(this).attr('href');
            window.location.href = href;

            // window.open(href, "_blank");
          }
        });
        // $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-2 a').once().click(function(event) {
        //   if($(this).parent().hasClass('link-disabled')){
        //     event.preventDefault();
        //   }
        //   else {
        //     var href = $(this).attr('href');
        //     window.open(href, "_blank");
        //   }
        // });
        // $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-3 > a').once().click(function(event) {
        //   if($(this).parent().hasClass('link-disabled')){
        //     event.preventDefault();
        //   }
        //   else {
        //     var href = $(this).attr('href');
        //     window.open(href, "_blank");
        //   }
        // });
        $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-2 .dropdown-menu .has-arrow .arrow').once().on('click', function(e) {
          //$(this).siblings('ul.dropdown-menu').not(':animated').slideToggle(10);
          var accordion_menu = $(this).next('ul');
          if( $(accordion_menu).is(':visible') ){
            $(this).removeClass('nav-open');
            $(accordion_menu).slideUp('normal');
            return false;
          } else {
            $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-2 .dropdown-menu .has-arrow > .arrow').removeClass('nav-open');
            $('.leaf-return-t-SERVICES-PRODUCTS- .block-menu-id-menu-main-menu-services .vertical-column-mode-2 .dropdown-menu .has-arrow > .dropdown-menu').slideUp('normal');
            $(this).parents('.has-arrow').find('.dropdown-menu').slideUp('normal');
            $(this).addClass('nav-open');
            $(accordion_menu).slideDown('normal');
          }
        });

        /*$('.link-disabled').click(function(e) {
          e.preventDefault();
        });*/
	  		menu_dropdown_placement();

        $(window).resize(function() {
		  		menu_dropdown_placement();
				});

        function servies_column_height() {
          var equal_ht = Drupal.behaviors.library.equalheight;
          if ($('.leaf-return-t-SERVICES-PRODUCTS- .vertical-column').length) {
            equal_ht('.leaf-return-t-SERVICES-PRODUCTS- .vertical-column', 0);
          }
        }

		    function menu_dropdown_placement() {
  		    if ($('.leaf-return-t-SERVICES-PRODUCTS-').length) {
            services_width = $(window).width() - 200;
  		  		services_offset = $('.leaf-return-t-SERVICES-PRODUCTS-').offset();
  		  		$('.leaf-return-t-SERVICES-PRODUCTS- .om-maximenu-content').css({
  		  			width : services_width,
  		  			left : -(services_offset.left - 100)
  	  			});
          }
		    }
	  	}
    });

    //======== career menu sub menu title link prevent default

    var windowWidth = $(window).width();
        if(windowWidth < 1200){
          $(".leaf-return-t-CAREERS- li.dropdown:nth-child(2), .leaf-return-t-CAREERS- li.dropdown:nth-child(3)").addClass("has-children");
      }


	  }
  }

})(jQuery, Drupal, this, this.document);
;/**/
/**
 * @file
 * bootstrap.js
 *
 * Provides general enhancements and fixes to Bootstrap's JS files.
 */

var Drupal = Drupal || {};

(function($, Drupal){
  "use strict";

  Drupal.behaviors.bootstrap = {
    attach: function(context) {
      // Provide some Bootstrap tab/Drupal integration.
      $(context).find('.tabbable').once('bootstrap-tabs', function () {
        var $wrapper = $(this);
        var $tabs = $wrapper.find('.nav-tabs');
        var $content = $wrapper.find('.tab-content');
        var borderRadius = parseInt($content.css('borderBottomRightRadius'), 10);
        var bootstrapTabResize = function() {
          if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right')) {
            $content.css('min-height', $tabs.outerHeight());
          }
        };
        // Add min-height on content for left and right tabs.
        bootstrapTabResize();
        // Detect tab switch.
        if ($wrapper.hasClass('tabs-left') || $wrapper.hasClass('tabs-right')) {
          $tabs.on('shown.bs.tab', 'a[data-toggle="tab"]', function (e) {
            bootstrapTabResize();
            if ($wrapper.hasClass('tabs-left')) {
              if ($(e.target).parent().is(':first-child')) {
                $content.css('borderTopLeftRadius', '0');
              }
              else {
                $content.css('borderTopLeftRadius', borderRadius + 'px');
              }
            }
            else {
              if ($(e.target).parent().is(':first-child')) {
                $content.css('borderTopRightRadius', '0');
              }
              else {
                $content.css('borderTopRightRadius', borderRadius + 'px');
              }
            }
          });
        }
      });
    }
  };

  /**
   * Behavior for .
   */
  Drupal.behaviors.bootstrapFormHasError = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.formHasError) {
        var $context = $(context);
        $context.find('.form-item.has-error:not(.form-type-password.has-feedback)').once('error', function () {
          var $formItem = $(this);
          var $input = $formItem.find(':input');
          $input.on('keyup focus blur', function () {
            var value = $input.val() || false;
            $formItem[value ? 'removeClass' : 'addClass']('has-error');
            $input[value ? 'removeClass' : 'addClass']('error');
          });
        });
      }
    }
  };

  /**
   * Bootstrap Popovers.
   */
  Drupal.behaviors.bootstrapPopovers = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.popoverEnabled) {
        var $currentPopover = $();
        if (settings.bootstrap.popoverOptions.triggerAutoclose) {
          $(document).on('click', function (e) {
            if ($currentPopover.length && !$(e.target).is('[data-toggle=popover]') && $(e.target).parents('.popover.in').length === 0) {
              $currentPopover.popover('hide');
              $currentPopover = $();
            }
          });
        }
        var elements = $(context).find('[data-toggle=popover]').toArray();
        for (var i = 0; i < elements.length; i++) {
          var $element = $(elements[i]);
          var options = $.extend({}, settings.bootstrap.popoverOptions, $element.data());
          if (!options.content) {
            options.content = function () {
              var target = $(this).data('target');
              return target && $(target) && $(target).length && $(target).clone().removeClass('element-invisible').wrap('<div/>').parent()[$(this).data('bs.popover').options.html ? 'html' : 'text']() || '';
            }
          }
          $element.popover(options).on('click', function (e) {
            e.preventDefault();
          });
          if (settings.bootstrap.popoverOptions.triggerAutoclose) {
            $element.on('show.bs.popover', function () {
              if ($currentPopover.length) {
                $currentPopover.popover('hide');
              }
              $currentPopover = $(this);
            });
          }
        }
      }
    }
  };

  /**
   * Bootstrap Tooltips.
   */
  Drupal.behaviors.bootstrapTooltips = {
    attach: function (context, settings) {
      if (settings.bootstrap && settings.bootstrap.tooltipEnabled) {
        var elements = $(context).find('[data-toggle="tooltip"]').toArray();
        for (var i = 0; i < elements.length; i++) {
          var $element = $(elements[i]);
          var options = $.extend({}, settings.bootstrap.tooltipOptions, $element.data());
          $element.tooltip(options);
        }
      }
    }
  };

  /**
   * Anchor fixes.
   */
  var $scrollableElement = $();
  Drupal.behaviors.bootstrapAnchors = {
    attach: function(context, settings) {
      var i, elements = ['html', 'body'];
      if (!$scrollableElement.length) {
        for (i = 0; i < elements.length; i++) {
          var $element = $(elements[i]);
          if ($element.scrollTop() > 0) {
            $scrollableElement = $element;
            break;
          }
          else {
            $element.scrollTop(1);
            if ($element.scrollTop() > 0) {
              $element.scrollTop(0);
              $scrollableElement = $element;
              break;
            }
          }
        }
      }
      if (!settings.bootstrap || settings.bootstrap.anchorsFix !== '1') {
        return;
      }
      var anchors = $(context).find('a').toArray();
      for (i = 0; i < anchors.length; i++) {
        if (!anchors[i].scrollTo) {
          this.bootstrapAnchor(anchors[i]);
        }
      }
      $scrollableElement.once('bootstrap-anchors', function () {
        $scrollableElement.on('click.bootstrap-anchors', 'a[href*="#"]:not([data-toggle],[data-target],[data-slide])', function(e) {
          if (this.scrollTo) {
            this.scrollTo(e);
          }
        });
      });
    },
    bootstrapAnchor: function (element) {
      element.validAnchor = element.nodeName === 'A' && (location.hostname === element.hostname || !element.hostname) && (element.hash.replace(/#/,'').length > 0);
      element.scrollTo = function(event) {
        var attr = 'id';
        var $target = $(element.hash);
        // Check for anchors that use the name attribute instead.
        if (!$target.length) {
          attr = 'name';
          $target = $('[name="' + element.hash.replace('#', '') + '"]');
        }
        // Immediately stop if no anchors are found.
        if (!this.validAnchor && !$target.length) {
          return;
        }
        // Anchor is valid, continue if there is an offset.
        var offset = $target.offset().top - parseInt($scrollableElement.css('paddingTop'), 10) - parseInt($scrollableElement.css('marginTop'), 10);
        if (offset > 0) {
          if (event) {
            event.preventDefault();
          }
          var $fakeAnchor = $('<div/>')
            .addClass('element-invisible')
            .attr(attr, $target.attr(attr))
            .css({
              position: 'absolute',
              top: offset + 'px',
              zIndex: -1000
            })
            .appendTo($scrollableElement);
          $target.removeAttr(attr);
          var complete = function () {
            location.hash = element.hash;
            $fakeAnchor.remove();
            $target.attr(attr, element.hash.replace('#', ''));
          };
          if (Drupal.settings.bootstrap.anchorsSmoothScrolling) {
            $scrollableElement.animate({ scrollTop: offset, avoidTransforms: true }, 400, complete);
          }
          else {
            $scrollableElement.scrollTop(offset);
            complete();
          }
        }
      };
    }
  };

  /**
   * Tabledrag theming elements.
   */
  Drupal.theme.tableDragChangedMarker = function () {
    return '<span class="tabledrag-changed glyphicon glyphicon-warning-sign text-warning"></span>';
  };

  Drupal.theme.tableDragChangedWarning = function () {
    return '<div class="tabledrag-changed-warning alert alert-warning messages warning">' + Drupal.theme('tableDragChangedMarker') + ' ' + Drupal.t('Changes made in this table will not be saved until the form is submitted.') + '</div>';
  };

})(jQuery, Drupal);
;/**/
