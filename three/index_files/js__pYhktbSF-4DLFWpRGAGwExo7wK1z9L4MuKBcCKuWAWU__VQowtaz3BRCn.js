(function($,Drupal,window,document,undefined){Drupal.behaviors.contactusQueryLimit={attach:function(context,settings){var description_html=$("#webform-component-message-comments .description").html();$("#webform-component-message-comments .description").html(description_html+"<br><span></span>");$("#webform-component-message-comments textarea").bind("input",function(e){value=$("#webform-component-message-comments textarea").val();sliced_content=value.replace(/\r(?!\n)|\n(?!\r)/g,"\r\n").slice(0,1E4);
$("#webform-component-message-comments textarea").val(sliced_content);var limit=1E4-sliced_content.length;$("#webform-component-message-comments .description span").html("");$("#webform-component-message-comments .description span").html("Remaining characters : "+limit)})}}})(jQuery,Drupal,this,this.document);;/**/
(function($,Drupal,window,document,undefined){Drupal.behaviors.hclCookiePolicy={attach:function(context){$(".cookie-policy-wrapper").hide();var cookie_hide=true;$(document).on("click",".cookie-policy-close",function(){close_cookie_policy();cookie_hide=true;$.cookie("hcl_cookie_policy","0",{path:"/"})});$(document).on("keypress",".cookie-policy-close",function(e){if(e.which==13){close_cookie_policy();cookie_hide=true;$.cookie("hcl_cookie_policy","0",{path:"/"})}});hcl_cookie_policy=jQuery.cookie("hcl_cookie_policy");
if(hcl_cookie_policy==null){$(".cookie-policy-wrapper").slideDown();cookie_hide=false}if($(".cookie-policy-wrapper").length&&$(".home-page #navbar.navbar, body.wef-2020 .banner #fixed-nav").length){$(".cookie-policy-wrapper").click(function(){if($(".home-page #navbar.navbar").length){var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".home-page .covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}if($("body.wef-2020 .banner #fixed-nav").length)$("body.wef-2020 .banner #fixed-nav").css({top:"0",
transition:"all .5s ease"})});$(window).on("load resize",function(){general_adjust_main_menu_cookie();$(window).scroll(function(){if($(window).width()<1065&&$(window).width()>=620)if(cookie_hide){var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}else if($(".home-page #navbar.navbar").offset().top>32){var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();
$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}else{var covid_top=$(".home-page .cookie-policy-wrapper").outerHeight();var header_top=$(".home-page .covid-strip-wrapper").outerHeight()+covid_top;$(".home-page #navbar.navbar").css({top:header_top,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:covid_top,transition:"all .5s ease"})}else if($(window).width()<620&&$(window).width()>479)if(cookie_hide){var covid_height=
$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}else if($(".home-page #navbar.navbar").offset().top>110){var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}else{var covid_top=$(".home-page .cookie-policy-wrapper").outerHeight();
var header_top=$(".home-page .covid-strip-wrapper").outerHeight()+covid_top;$(".home-page #navbar.navbar").css({top:header_top,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:covid_top,transition:"all .5s ease"})}else if($(window).width()<=479&&$(window).width()>340)if(cookie_hide){var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}else if($(".home-page #navbar.navbar").offset().top>
110){var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}else{var covid_top=$(".home-page .cookie-policy-wrapper").outerHeight();var header_top=$(".home-page .covid-strip-wrapper").outerHeight()+covid_top;$(".home-page #navbar.navbar").css({top:header_top,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:covid_top,transition:"all .5s ease"})}else if($(window).width()<=
340)if(cookie_hide){var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}else if($(".home-page #navbar.navbar").offset().top>140){var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}else{var covid_top=
$(".home-page .cookie-policy-wrapper").outerHeight();var header_top=$(".home-page .covid-strip-wrapper").outerHeight()+covid_top;$(".home-page #navbar.navbar").css({top:header_top,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:covid_top,transition:"all .5s ease"})}})})}function close_cookie_policy(){$(".cookie-policy-wrapper").slideUp(400,function(){Drupal.behaviors.meanNavAdjust.mean_nav_mainmenu_top_adjust()})}function general_adjust_main_menu_cookie(){if(!cookie_hide){$(".cookie-policy-wrapper").show();
if($(".home-page #navbar.navbar").length){var covid_top=$(".home-page .cookie-policy-wrapper p").outerHeight(true);if($("body.node-type-ct-german-business-pages").length)var covid_top=$(".home-page .cookie-policy-wrapper p.german-cookie-policy").outerHeight(true);var header_top=$(".home-page .covid-strip-wrapper").outerHeight()+covid_top;$(".home-page #navbar.navbar").css({top:header_top,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:covid_top,transition:"all .5s ease"})}if($(window).width()<
620&&$(window).width()>340){if($("body.wef-2020 .banner #fixed-nav").length){$("body.wef-2020 .banner #fixed-nav").css({top:"47px"});$("body.wef-2020").css("padding-top","47px")}}else if($(window).width()<=340){if($("body.wef-2020 .banner #fixed-nav").length){$("body.wef-2020 .banner #fixed-nav").css({top:"62px"});$("body.wef-2020").css("padding-top","62px")}}else if($("body.wef-2020 .banner #fixed-nav").length){$("body.wef-2020 .banner #fixed-nav").css({top:"32px"});$("body.wef-2020").css("padding-top",
"32px")}}else{var covid_height=$(".home-page .covid-strip-wrapper").outerHeight();$(".home-page #navbar.navbar").css({top:covid_height,transition:"all .5s ease"});$(".covid-strip-wrapper").css({top:"0",transition:"all .5s ease"})}}}}})(jQuery,Drupal,this,this.document);;/**/
(function($){Drupal.behaviors.ga_event_tracking={attach:function(context){$(".view-id-list_jobs .views-exposed-form .form-submit").click(function(event){form=$(this).parents("form");event_cat=form.attr("data-gaptracking-eventcat");event_action=form.attr("data-gaptracking-eventaction");event_label=form.attr("data-gaptracking-eventlabel");if(event_cat&&event_action&&event_label)if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":event_cat,"gaEventAction":event_action,
"gaEventLabel":event_label})});$(".kenexa-job-link a").click(function(event){event_label=$("h1.pane-title").text();if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":"HCL-careers-view-apply-job","gaEventAction":"view-apply-job-CTA-click","gaEventLabel":event_label})});$(".webform-client-form-3479 .form-submit").click(function(event){form=$(this).parents("form");event_cat=form.attr("data-gaptracking-eventcat");event_action=form.attr("data-gaptracking-eventaction");
event_label=form.attr("data-gaptracking-eventlabel");if(event_cat&&event_action&&event_label)if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":event_cat,"gaEventAction":event_action,"gaEventLabel":event_label})});$(".pane-general-blocks-global-contact-form form .form-submit").click(function(event){eventCategory="contact-us-flyer-form-submission";eventAction="submit-btn-click";eventLabel="contact-us";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL",
"gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".section-blogs .sharethis-wrapper > span").click(function(){social_widget_arr={};social_widget_arr["facebook"]="Facebook";social_widget_arr["linkedin"]="LinkedIn";social_widget_arr["twitter"]="Twitter";social_widget_arr["googleplus"]="Google+";social_widget_arr["email"]="Email";social_widget_arr["sharethis"]="ShareThis";social_widget=$(this).attr("displaytext");eventCategory="hcl-blogs-share-social-media";
eventAction="social-media-icon-click";eventLabel=social_widget_arr[social_widget];if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".section-webinars .sharethis-wrapper > span").click(function(){social_widget_arr={};social_widget_arr["facebook"]="Facebook";social_widget_arr["linkedin"]="LinkedIn";social_widget_arr["twitter"]="Twitter";social_widget_arr["googleplus"]="Google+";social_widget_arr["email"]=
"Email";social_widget_arr["sharethis"]="ShareThis";social_widget=$(this).attr("displaytext");eventCategory="hcl-webinar-share-social-media";eventAction="social-media-icon-click";eventLabel=social_widget_arr[social_widget];if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});var Title=$("h1.pane-title").text();$(".print_html .print-page").click(function(e){eventCategory="hcl-breadcrumb-rhs-print-content";
eventAction="print-page-content-icon-click";eventLabel=Title;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".print_mail .print-mail").click(function(e){eventCategory="hcl-breadcrumb-rhs-print-content";eventAction="send-by-mail-icon-click";eventLabel=Title;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,
"gaEventLabel":eventLabel})});$(".print_pdf .print-pdf").click(function(e){eventCategory="hcl-breadcrumb-rhs-print-content";eventAction="print-pdf-icon-click";eventLabel=Title;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".service-line-resource, .industry-resource").click(function(){class_arr=$(this).attr("class").split(" ");download_type_arr={};download_type_arr["brochure"]="Brochures";
download_type_arr["case-study"]="Case Studies";download_type_arr["article"]="Articles";download_type_arr["whitepaper"]="Whitepapers";download_type=class_arr[1].replace("resource-","");resource=$(this).parents("td").find("p span").text();eventCategory=download_type_arr[download_type]+" - Download Zone";eventAction="Click";eventLabel=resource;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});
$(".download-zone .dwn_zn").click(function(){page_title=$(".page-title-wrapper .pane-title").text();eventCategory="Download Button";eventAction="Click";eventLabel=page_title;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});event_category="Gartner-CS-ALTASM";if($("#webform-component-ga-event-category").length)event_category=$("#webform-component-ga-event-category input").val();$("#campaign-page .main-content-block .webform-client-form .form-submit").click(function(e){eventCategory=
"Download PDF-"+event_category;eventAction="Download";eventLabel=event_category;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$("#campaign-page .main-content-block .webform-client-form a.hybridauth-widget-provider").click(function(e){social_site=$(this).attr("title");eventCategory=social_site+"-Sign-in-"+event_category;eventAction="Click";eventLabel=event_category;if(typeof dataLayer!=
"undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".search-cta a").click(function(){eventCategory="hcl-site-search-result-cta";eventAction="site-search-result-click";eventLabel="site-search";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".job-apply-link a").click(function(){eventCategory="ApplyNow";
eventAction="Click";eventLabel="Jobs-ApplyNow";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});var hiral_title=$("h1.pane-title").text();$(".hiral-job-posting-page .main-content-block .webform-client-form .form-actions .form-submit").click(function(e){eventCategory="hcl-hiral-apply-now";eventAction="apply-now-btn-click";eventLabel=hiral_title;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL",
"gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$("a.personalization-ga-event-tracking").click(function(){if(typeof dataLayer!="undefined"){ga_event=$(this).attr("data-ga-event");personalization_type=$(this).attr("data-personalization-type");category="";switch(personalization_type){case "bp":category="DB-Banners";break;case "sbvp":category="SDB-Banners";break}eventCategory=category;eventAction="Click";eventLabel=category+"-"+ga_event;dataLayer.push({"event":"gaEventHCL",
"gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})}});$(".ga-tracking-handler").click(function(){event_category=$(this).attr("data-gatracking-eventcategory");event_label=$(this).attr("data-gatracking-eventlabel");if(event_category&&event_label){eventCategory=event_category;eventAction="Click";eventLabel=event_label;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})}});
$(".ga-tracking-interaction").click(function(){event_category=$(this).attr("data-gatracking-eventcategory");event_action=$(this).attr("data-gatracking-eventaction");event_label=$(this).attr("data-gatracking-eventlabel");if(event_category&&event_label){eventCategory=event_category;eventAction=event_action;eventLabel=event_label;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel,"gaEventInteraction":"true"})}});
$(".node-field-pane-jd").click(function(e){eventCategory="ApplyNow";eventAction="Click";eventLabel="Jobs-ApplyNow";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".webform-client-form-141148 .form-actions > .form-submit").click(function(e){eventCategory="Download";eventAction="Submit";eventLabel="Ideapreneurship-Page-Download";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL",
"gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".webform-client-form-142953 .form-actions > .form-submit").click(function(e){eventCategory="Register-submit";eventAction="Click";eventLabel="CitizenGrant";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".section-citizens-grant .contact-form form .form-actions > .form-submit").click(function(e){eventCategory=
"Submit";eventAction="Click";eventLabel="CitizenGrant";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$("#peeelback a").click(function(e){eventCategory="Page-Peel";eventAction="Click";eventLabel="UnitedByHCL-PagePeel";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".unitedbyhcl-link").click(function(e){eventCategory=
"Page-Peel";eventAction="Click";eventLabel="UnitedByHCL-PagePeel";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".job-posting-node-page .pane-content .field--name-field-kenexa-jobs-job-link .field__items  .field__item a").click(function(e){eventCategory="View Job Details";eventAction="Click";eventLabel=Title;if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,
"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".section-contact-us .main-content-block form .form-submit").click(function(e){eventCategory="contact-us-submit";eventAction="Submit";eventLabel="contact-us-webpage-submit";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".node-type-event .node--event .register-link a").click(function(e){eventCategory="Event-page";eventAction=
"Register";eventLabel="Event-page-register";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".node-type-event .node--event .add-schedule a").click(function(e){eventCategory="Event-page";eventAction="Add-Schedule";eventLabel="Event-page-add-schedule";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});
$(".node-type-webinar .node--webinar .register-link a").click(function(e){eventCategory="Event-page";eventAction="Add-Schedule";eventLabel="Event-page-add-schedule";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".node-type-webinar .node--webinar .add-schedule a").click(function(e){eventCategory="Event-page";eventAction="Add-Schedule";eventLabel="Event-page-add-schedule";if(typeof dataLayer!=
"undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$("#section-events-financial-services-netherlands-india-business-meet-nibm .node--event .register-link a").click(function(e){eventCategory="BM-FS-ShowcasePage";eventAction="Register";eventLabel="NIBM";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})});$(".pane-general-blocks-global-contact-form .ctools-collapsed .ctools-collapsible-handle div").click(function(e){if(typeof dataLayer!=
"undefined")dataLayer.push({"event":"vpv-hcl","vpv-name":"/VPV/HCLTech/ContactUs/ContactUs-PopUp"})});$(".pane-general-blocks-global-contact-form .ctools-collapsed .ctools-collapsible-content #ajax-webform-client-form-3468 form .contact-button").click(function(e){if(typeof dataLayer!="undefined")dataLayer.push({"event":"vpv-hcl","vpv-name":"/VPV/HCLTech/ContactUs/ContactUs-PopUp-Submit"})});$('a[href*="satori2.hcl.com/octo/ucc"]').click(function(e){if(typeof dataLayer!="undefined"){eventCategory=
"English-website-sitemap";if($("body").hasClass("i18n-de"))eventCategory="German-website-sitemap";eventAction="UCC-link-click";eventLabel="hcl.com";dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel,"gaEventInteraction":"true"})}});$('a[href*="satori2.hcl.com/octo/eps-sap"]').click(function(e){if(typeof dataLayer!="undefined"){eventCategory="English-website-sitemap";if($("body").hasClass("i18n-de"))eventCategory="German-website-sitemap";
eventAction="EPS-SAP-link-click";eventLabel="hcl.com";dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel,"gaEventInteraction":"true"})}});$('a[href*="satori2.hcl.com/octo/eps-oracle"]').click(function(e){if(typeof dataLayer!="undefined"){eventCategory="English-website-sitemap";if($("body").hasClass("i18n-de"))eventCategory="German-website-sitemap";eventAction="EPS-Oracle-link-click";eventLabel="hcl.com";dataLayer.push({"event":"gaEventHCL",
"gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel,"gaEventInteraction":"true"})}});$('a[href*="satori2.hcl.com/octo/eps-appops"]').click(function(e){if(typeof dataLayer!="undefined"){eventCategory="English-website-sitemap";if($("body").hasClass("i18n-de"))eventCategory="German-website-sitemap";eventAction="EPS-Appops-link-click";eventLabel="hcl.com";dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel,
"gaEventInteraction":"true"})}});$('a[href*="satori2.hcl.com/octo/eis"]').click(function(e){if(typeof dataLayer!="undefined"){eventCategory="English-website-sitemap";if($("body").hasClass("i18n-de"))eventCategory="German-website-sitemap";eventAction="EIS-link-click";eventLabel="hcl.com";dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel,"gaEventInteraction":"true"})}});$('a[href*="satori2.hcl.com/octo/bps"]').click(function(e){if(typeof dataLayer!=
"undefined"){eventCategory="English-website-sitemap";if($("body").hasClass("i18n-de"))eventCategory="German-website-sitemap";eventAction="BPS-link-click";eventLabel="hcl.com";dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel,"gaEventInteraction":"true"})}});$('.front a[href*="www.straighttalkonline.com/community"]').click(function(e){if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":"English-website",
"gaEventAction":"Straight-talk-link-click","gaEventLabel":"straighttalkonline.com","gaEventInteraction":"true"})});$(".eventtracking").click(function(event){if(typeof dataLayer!="undefined"){_this=$(this);var classes=_this.attr("class");var classes_arr=classes.split(" ");var eventCategory="";var eventAction="";var eventLabel="";$.each(classes_arr,function(index,val){if(val.startsWith("eventcategory")){val_arr=val.split("-");eventCategory=val_arr[1];eventCategory=eventCategory.replace(/__/g,"-").replace(/_/g,
" ");eventCategory=eventCategory+"-Menu-Events"}if(val.startsWith("eventaction")){val_arr=val.split("-");eventAction=val_arr[1];eventAction=eventAction.replace(/__/g,"-").replace(/_/g," ");eventAction_suffix="-Sub Menu Click";if(_this.hasClass("parent-level"))eventAction_suffix="-Menu Clicks";if(_this.hasClass("single-level"))eventAction_suffix="-Menu-Click";eventAction=eventAction+eventAction_suffix}if(val.startsWith("eventlabel")){val_arr=val.split("-");eventLabel=val_arr[1];eventLabel=eventLabel.replace(/__/g,
"-").replace(/_/g," ");eventLabel=eventLabel}});dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,"gaEventLabel":eventLabel})}})}};if(Drupal.ajax!==undefined){Drupal.ajax.prototype.commands.globalContactSuccess=function(ajax,response,status){eventCategory="Contact-us-pop-up";eventAction="Submit";eventLabel="Global-Contact-us-pop-up";if(typeof dataLayer!="undefined")dataLayer.push({"event":"gaEventHCL","gaEventCategory":eventCategory,"gaEventAction":eventAction,
"gaEventLabel":eventLabel});if(Drupal.settings.hcl_ga_tracking.check_adroll){try{__adroll.record_user({"adroll_segments":"a53b42a6"})}catch(err){}$('<img src="https://www.bizographics.com/collect/?fmt=gif&url=loginregister.hcl.com&pid=5579" width="1" height="1" border="0" alt="" />').load(function(){$(this).appendTo("body")})}};Drupal.ajax.prototype.commands.subscribeSubmit=function(ajax,response,status){if(typeof dataLayer!="undefined")dataLayer.push({"event":"hcl-blogsub-submit"})}}})(jQuery);;/**/
!function(e){"use strict";e.fn.meanmenu=function(n){var a={meanMenuTarget:jQuery(this),meanMenuContainer:"body",meanMenuClose:"X",meanMenuCloseSize:"18px",meanMenuOpen:"<span /><span /><span />",meanRevealPosition:"right",meanRevealPositionDistance:"0",meanRevealColour:"",meanScreenWidth:"480",meanNavPush:"",meanShowChildren:!0,meanExpandableChildren:!0,meanExpand:"+",meanContract:"-",meanRemoveAttrs:!1,onePage:!1,meanDisplay:"block",removeElements:""};n=e.extend(a,n);var t=document.documentElement.clientWidth||document.body.clientWidth;return this.each(function(){var e=n.meanMenuTarget,a=n.meanMenuTarget.clone();a.find(".contextual-links-wrapper").remove().find("ul.contextual-links").remove();var r=n.meanMenuContainer,i=n.meanMenuClose,u=n.meanMenuCloseSize,m=n.meanMenuOpen,s=n.meanRevealPosition,l=n.meanRevealPositionDistance,o=n.meanRevealColour,c=n.meanScreenWidth,d=n.meanNavPush,v=".meanmenu-reveal",h=n.meanShowChildren,y=n.meanExpandableChildren,j=n.meanExpand,Q=n.meanContract,f=n.meanRemoveAttrs,g=n.onePage,p=n.meanDisplay,C=n.removeElements,x=!1;(navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/Blackberry/i)||navigator.userAgent.match(/Windows Phone/i))&&(x=!0),(navigator.userAgent.match(/MSIE 8/i)||navigator.userAgent.match(/MSIE 7/i))&&jQuery("html").css("overflow-y","scroll");var w="",b=function(){if("center"===s){var e=document.documentElement.clientWidth||document.body.clientWidth,n=e/2-22+"px";w="left:"+n+";right:auto;",x?jQuery(".meanmenu-reveal").animate({left:n}):jQuery(".meanmenu-reveal").css("left",n)}},A=!1,M=!1;"right"===s&&(w="right:"+l+";left:auto;"),"left"===s&&(w="left:"+l+";right:auto;"),b();var E="",P=function(){E.html(jQuery(E).is(".meanmenu-reveal.meanclose")?i:m)},W=function(){jQuery(".mean-bar,.mean-push").remove(),jQuery(r).removeClass("mean-container"),jQuery(e).css("display",p),A=!1,M=!1,jQuery(C).removeClass("mean-remove")},k=function(){var n="background:"+o+";color:"+o+";"+w;if(c>=t){jQuery(C).addClass("mean-remove"),M=!0,jQuery(r).addClass("mean-container"),jQuery(".mean-container").prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="'+n+'">Show Navigation</a><nav class="mean-nav"></nav></div>');var i=jQuery(a).html();jQuery(".mean-nav").html(i),f&&jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function(){jQuery(this).is(".mean-remove")?jQuery(this).attr("class","mean-remove"):jQuery(this).removeAttr("class"),jQuery(this).removeAttr("id")}),jQuery(e).before('<div class="mean-push" />'),jQuery(".mean-push").css("margin-top",d),jQuery(e).hide(),jQuery(".meanmenu-reveal").show(),jQuery(v).html(m),E=jQuery(v),jQuery(".mean-nav ul").hide(),h?y?(jQuery(".mean-nav ul ul").each(function(){jQuery(this).children().length&&jQuery(this,"li:first").parent().append('<a class="mean-expand" href="#" style="font-size: '+u+'">'+j+"</a>")}),jQuery(".mean-expand").on("click",function(e){e.preventDefault(),jQuery(this).hasClass("mean-clicked")?(jQuery(this).text(j),jQuery(this).prev("ul").slideUp(300,function(){})):(jQuery(this).text(Q),jQuery(this).prev("ul").slideDown(300,function(){})),jQuery(this).toggleClass("mean-clicked")})):jQuery(".mean-nav ul ul").show():jQuery(".mean-nav ul ul").hide(),jQuery(".mean-nav ul li").last().addClass("mean-last"),E.removeClass("meanclose"),jQuery(E).click(function(e){e.preventDefault(),A===!1?(E.css("text-align","center"),E.css("text-indent","0"),E.css("font-size",u),jQuery(".mean-nav ul:first").slideDown(),A=!0):(jQuery(".mean-nav ul:first").slideUp(),A=!1),E.toggleClass("meanclose"),P(),jQuery(C).addClass("mean-remove")}),g&&jQuery(".mean-nav ul > li > a:first-child").on("click",function(){jQuery(".mean-nav ul:first").slideUp(),A=!1,jQuery(E).toggleClass("meanclose").html(m)})}else W()};x||jQuery(window).resize(function(){t=document.documentElement.clientWidth||document.body.clientWidth,t>c,W(),c>=t?(k(),b()):W()}),jQuery(window).resize(function(){t=document.documentElement.clientWidth||document.body.clientWidth,x?(b(),c>=t?M===!1&&k():W()):(W(),c>=t&&(k(),b()))}),k()})}}(jQuery);;/**/
(function($){Drupal.behaviors.responsive_menus_mean_menu={attach:function(context,settings){settings.responsive_menus=settings.responsive_menus||{};$.each(settings.responsive_menus,function(ind,iteration){if(iteration.responsive_menus_style!="mean_menu")return true;if(!iteration.selectors.length)return;$.each(iteration,function(key,value){if(value==0)iteration[key]=false;if(value==1)iteration[key]=true});$(iteration.selectors).once("responsive-menus-mean-menu",function(){$(this).meanmenu({meanMenuContainer:iteration.container||
"body",meanMenuClose:iteration.close_txt||"X",meanMenuCloseSize:iteration.close_size||"18px",meanMenuOpen:iteration.trigger_txt||"<span /><span /><span />",meanRevealPosition:iteration.position||"right",meanScreenWidth:iteration.media_size||"480",meanExpand:iteration.expand_txt||"+",meanContract:iteration.contract_txt||"-",meanShowChildren:iteration.show_children,meanExpandableChildren:iteration.expand_children,meanRemoveAttrs:iteration.remove_attrs})})})}}})(jQuery);;/**/
// Generated by CoffeeScript 1.3.3
((function(){var reqwest=function(){function handleReadyState(a,b,c){return function(){a&&a[readyState]==4&&(twoHundo.test(a.status)?b(a):c(a))}}function setHeaders(a,b){var c=b.headers||{},d;c.Accept=c.Accept||defaultHeaders.accept[b.type]||defaultHeaders.accept["*"],!b.crossOrigin&&!c[requestedWith]&&(c[requestedWith]=defaultHeaders.requestedWith),c[contentType]||(c[contentType]=b.contentType||defaultHeaders.contentType);for(d in c)c.hasOwnProperty(d)&&a.setRequestHeader(d,c[d])}function generalCallback(a){lastValue=a}function urlappend(a,b){return a+(/\?/.test(a)?"&":"?")+b}function handleJsonp(a,b,c,d){var e=uniqid++,f=a.jsonpCallback||"callback",g=a.jsonpCallbackName||"reqwest_"+e,h=new RegExp("((^|\\?|&)"+f+")=([^&]+)"),i=d.match(h),j=doc.createElement("script"),k=0;i?i[3]==="?"?d=d.replace(h,"$1="+g):g=i[3]:d=urlappend(d,f+"="+g),win[g]=generalCallback,j.type="text/javascript",j.src=d,j.async=!0,typeof j.onreadystatechange!="undefined"&&(j.event="onclick",j.htmlFor=j.id="_reqwest_"+e),j.onload=j.onreadystatechange=function(){if(j[readyState]&&j[readyState]!=="complete"&&j[readyState]!=="loaded"||k)return!1;j.onload=j.onreadystatechange=null,j.onclick&&j.onclick(),a.success&&a.success(lastValue),lastValue=undefined,head.removeChild(j),k=1},head.appendChild(j)}function getRequest(a,b,c){var d=(a.method||"GET").toUpperCase(),e=typeof a=="string"?a:a.url,f=a.processData!==!1&&a.data&&typeof a.data!="string"?reqwest.toQueryString(a.data):a.data||null,g;return(a.type=="jsonp"||d=="GET")&&f&&(e=urlappend(e,f),f=null),a.type=="jsonp"?handleJsonp(a,b,c,e):(g=xhr(),g.open(d,e,!0),setHeaders(g,a),g.onreadystatechange=handleReadyState(g,b,c),a.before&&a.before(g),g.send(f),g)}function Reqwest(a,b){this.o=a,this.fn=b,init.apply(this,arguments)}function setType(a){var b=a.match(/\.(json|jsonp|html|xml)(\?|$)/);return b?b[1]:"js"}function init(o,fn){function complete(a){o.timeout&&clearTimeout(self.timeout),self.timeout=null,o.complete&&o.complete(a)}function success(resp){var r=resp.responseText;if(r)switch(type){case"json":try{resp=win.JSON?win.JSON.parse(r):eval("("+r+")")}catch(err){return error(resp,"Could not parse JSON in response",err)}break;case"js":resp=eval(r);break;case"html":resp=r}fn(resp),o.success&&o.success(resp),complete(resp)}function error(a,b,c){o.error&&o.error(a,b,c),complete(a)}this.url=typeof o=="string"?o:o.url,this.timeout=null;var type=o.type||setType(this.url),self=this;fn=fn||function(){},o.timeout&&(this.timeout=setTimeout(function(){self.abort()},o.timeout)),this.request=getRequest(o,success,error)}function reqwest(a,b){return new Reqwest(a,b)}function normalize(a){return a?a.replace(/\r?\n/g,"\r\n"):""}function serial(a,b){var c=a.name,d=a.tagName.toLowerCase(),e=function(a){a&&!a.disabled&&b(c,normalize(a.attributes.value&&a.attributes.value.specified?a.value:a.text))};if(a.disabled||!c)return;switch(d){case"input":if(!/reset|button|image|file/i.test(a.type)){var f=/checkbox/i.test(a.type),g=/radio/i.test(a.type),h=a.value;(!f&&!g||a.checked)&&b(c,normalize(f&&h===""?"on":h))}break;case"textarea":b(c,normalize(a.value));break;case"select":if(a.type.toLowerCase()==="select-one")e(a.selectedIndex>=0?a.options[a.selectedIndex]:null);else for(var i=0;a.length&&i<a.length;i++)a.options[i].selected&&e(a.options[i])}}function eachFormElement(){var a=this,b,c,d,e=function(b,c){for(var e=0;e<c.length;e++){var f=b[byTag](c[e]);for(d=0;d<f.length;d++)serial(f[d],a)}};for(c=0;c<arguments.length;c++)b=arguments[c],/input|select|textarea/i.test(b.tagName)&&serial(b,a),e(b,["input","select","textarea"])}function serializeQueryString(){return reqwest.toQueryString(reqwest.serializeArray.apply(null,arguments))}function serializeHash(){var a={};return eachFormElement.apply(function(b,c){b in a?(a[b]&&!isArray(a[b])&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c},arguments),a}var context=this,win=window,doc=document,old=context.reqwest,twoHundo=/^20\d$/,byTag="getElementsByTagName",readyState="readyState",contentType="Content-Type",requestedWith="X-Requested-With",head=doc[byTag]("head")[0],uniqid=0,lastValue,xmlHttpRequest="XMLHttpRequest",isArray=typeof Array.isArray=="function"?Array.isArray:function(a){return a instanceof Array},defaultHeaders={contentType:"application/x-www-form-urlencoded",accept:{"*":"text/javascript, text/html, application/xml, text/xml, */*",xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",js:"application/javascript, text/javascript"},requestedWith:xmlHttpRequest},xhr=win[xmlHttpRequest]?function(){return new XMLHttpRequest}:function(){return new ActiveXObject("Microsoft.XMLHTTP")};return Reqwest.prototype={abort:function(){this.request.abort()},retry:function(){init.call(this,this.o,this.fn)}},reqwest.serializeArray=function(){var a=[];return eachFormElement.apply(function(b,c){a.push({name:b,value:c})},arguments),a},reqwest.serialize=function(){if(arguments.length===0)return"";var a,b,c=Array.prototype.slice.call(arguments,0);return a=c.pop(),a&&a.nodeType&&c.push(a)&&(a=null),a&&(a=a.type),a=="map"?b=serializeHash:a=="array"?b=reqwest.serializeArray:b=serializeQueryString,b.apply(null,c)},reqwest.toQueryString=function(a){var b="",c,d=encodeURIComponent,e=function(a,c){b+=d(a)+"="+d(c)+"&"};if(isArray(a))for(c=0;a&&c<a.length;c++)e(a[c].name,a[c].value);else for(var f in a){if(!Object.hasOwnProperty.call(a,f))continue;var g=a[f];if(isArray(g))for(c=0;c<g.length;c++)e(f,g[c]);else e(f,a[f])}return b.replace(/&$/,"").replace(/%20/g,"+")},reqwest.compat=function(a,b){return a&&(a.type&&(a.method=a.type)&&delete a.type,a.dataType&&(a.type=a.dataType),a.jsonpCallback&&(a.jsonpCallbackName=a.jsonpCallback)&&delete a.jsonpCallback,a.jsonp&&(a.jsonpCallback=a.jsonp)),new Reqwest(a,b)},reqwest}();((function(){function a(b,c,d){if(b===c)return 0!==b||1/b==1/c;if(null==b||null==c)return b===c;b._chain&&(b=b._wrapped),c._chain&&(c=c._wrapped);if(b.isEqual&&v.isFunction(b.isEqual))return b.isEqual(c);if(c.isEqual&&v.isFunction(c.isEqual))return c.isEqual(b);var e=i.call(b);if(e!=i.call(c))return!1;switch(e){case"[object String]":return b==""+c;case"[object Number]":return b!=+b?c!=+c:0==b?1/b==1/c:b==+c;case"[object Date]":case"[object Boolean]":return+b==+c;case"[object RegExp]":return b.source==c.source&&b.global==c.global&&b.multiline==c.multiline&&b.ignoreCase==c.ignoreCase}if("object"!=typeof b||"object"!=typeof c)return!1;for(var f=d.length;f--;)if(d[f]==b)return!0;d.push(b);var f=0,g=!0;if("[object Array]"==e){if(f=b.length,g=f==c.length)for(;f--&&(g=f in b==f in c&&a(b[f],c[f],d)););}else{if("constructor"in b!="constructor"in c||b.constructor!=c.constructor)return!1;for(var h in b)if(v.has(b,h)&&(f++,!(g=v.has(c,h)&&a(b[h],c[h],d))))break;if(g){for(h in c)if(v.has(c,h)&&!(f--))break;g=!f}}return d.pop(),g}var b=this,c=b._,d={},e=Array.prototype,f=Object.prototype,g=e.slice,h=e.unshift,i=f.toString,j=f.hasOwnProperty,k=e.forEach,l=e.map,m=e.reduce,n=e.reduceRight,o=e.filter,p=e.every,q=e.some,r=e.indexOf,s=e.lastIndexOf,f=Array.isArray,t=Object.keys,u=Function.prototype.bind,v=function(a){return new G(a)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=v),exports._=v):b._=v,v.VERSION="1.3.3";var w=v.each=v.forEach=function(a,b,c){if(a!=null)if(k&&a.forEach===k)a.forEach(b,c);else if(a.length===+a.length){for(var e=0,f=a.length;e<f;e++)if(e in a&&b.call(c,a[e],e,a)===d)break}else for(e in a)if(v.has(a,e)&&b.call(c,a[e],e,a)===d)break};v.map=v.collect=function(a,b,c){var d=[];return a==null?d:l&&a.map===l?a.map(b,c):(w(a,function(a,e,f){d[d.length]=b.call(c,a,e,f)}),a.length===+a.length&&(d.length=a.length),d)},v.reduce=v.foldl=v.inject=function(a,b,c,d){var e=arguments.length>2;a==null&&(a=[]);if(m&&a.reduce===m)return d&&(b=v.bind(b,d)),e?a.reduce(b,c):a.reduce(b);w(a,function(a,f,g){e?c=b.call(d,c,a,f,g):(c=a,e=!0)});if(!e)throw new TypeError("Reduce of empty array with no initial value");return c},v.reduceRight=v.foldr=function(a,b,c,d){var e=arguments.length>2;a==null&&(a=[]);if(n&&a.reduceRight===n)return d&&(b=v.bind(b,d)),e?a.reduceRight(b,c):a.reduceRight(b);var f=v.toArray(a).reverse();return d&&!e&&(b=v.bind(b,d)),e?v.reduce(f,b,c,d):v.reduce(f,b)},v.find=v.detect=function(a,b,c){var d;return x(a,function(a,e,f){if(b.call(c,a,e,f))return d=a,!0}),d},v.filter=v.select=function(a,b,c){var d=[];return a==null?d:o&&a.filter===o?a.filter(b,c):(w(a,function(a,e,f){b.call(c,a,e,f)&&(d[d.length]=a)}),d)},v.reject=function(a,b,c){var d=[];return a==null?d:(w(a,function(a,e,f){b.call(c,a,e,f)||(d[d.length]=a)}),d)},v.every=v.all=function(a,b,c){var e=!0;return a==null?e:p&&a.every===p?a.every(b,c):(w(a,function(a,f,g){if(!(e=e&&b.call(c,a,f,g)))return d}),!!e)};var x=v.some=v.any=function(a,b,c){b||(b=v.identity);var e=!1;return a==null?e:q&&a.some===q?a.some(b,c):(w(a,function(a,f,g){if(e||(e=b.call(c,a,f,g)))return d}),!!e)};v.include=v.contains=function(a,b){var c=!1;return a==null?c:r&&a.indexOf===r?a.indexOf(b)!=-1:c=x(a,function(a){return a===b})},v.invoke=function(a,b){var c=g.call(arguments,2);return v.map(a,function(a){return(v.isFunction(b)?b||a:a[b]).apply(a,c)})},v.pluck=function(a,b){return v.map(a,function(a){return a[b]})},v.max=function(a,b,c){if(!b&&v.isArray(a)&&a[0]===+a[0])return Math.max.apply(Math,a);if(!b&&v.isEmpty(a))return-Infinity;var d={computed:-Infinity};return w(a,function(a,e,f){e=b?b.call(c,a,e,f):a,e>=d.computed&&(d={value:a,computed:e})}),d.value},v.min=function(a,b,c){if(!b&&v.isArray(a)&&a[0]===+a[0])return Math.min.apply(Math,a);if(!b&&v.isEmpty(a))return Infinity;var d={computed:Infinity};return w(a,function(a,e,f){e=b?b.call(c,a,e,f):a,e<d.computed&&(d={value:a,computed:e})}),d.value},v.shuffle=function(a){var b=[],c;return w(a,function(a,d){c=Math.floor(Math.random()*(d+1)),b[d]=b[c],b[c]=a}),b},v.sortBy=function(a,b,c){var d=v.isFunction(b)?b:function(a){return a[b]};return v.pluck(v.map(a,function(a,b,e){return{value:a,criteria:d.call(c,a,b,e)}}).sort(function(a,b){var c=a.criteria,d=b.criteria;return c===void 0?1:d===void 0?-1:c<d?-1:c>d?1:0}),"value")},v.groupBy=function(a,b){var c={},d=v.isFunction(b)?b:function(a){return a[b]};return w(a,function(a,b){var e=d(a,b);(c[e]||(c[e]=[])).push(a)}),c},v.sortedIndex=function(a,b,c){c||(c=v.identity);for(var d=0,e=a.length;d<e;){var f=d+e>>1;c(a[f])<c(b)?d=f+1:e=f}return d},v.toArray=function(a){return a?v.isArray(a)||v.isArguments(a)?g.call(a):a.toArray&&v.isFunction(a.toArray)?a.toArray():v.values(a):[]},v.size=function(a){return v.isArray(a)?a.length:v.keys(a).length},v.first=v.head=v.take=function(a,b,c){return b!=null&&!c?g.call(a,0,b):a[0]},v.initial=function(a,b,c){return g.call(a,0,a.length-(b==null||c?1:b))},v.last=function(a,b,c){return b!=null&&!c?g.call(a,Math.max(a.length-b,0)):a[a.length-1]},v.rest=v.tail=function(a,b,c){return g.call(a,b==null||c?1:b)},v.compact=function(a){return v.filter(a,function(a){return!!a})},v.flatten=function(a,b){return v.reduce(a,function(a,c){return v.isArray(c)?a.concat(b?c:v.flatten(c)):(a[a.length]=c,a)},[])},v.without=function(a){return v.difference(a,g.call(arguments,1))},v.uniq=v.unique=function(a,b,c){var c=c?v.map(a,c):a,d=[];return a.length<3&&(b=!0),v.reduce(c,function(c,e,f){if(b?v.last(c)!==e||!c.length:!v.include(c,e))c.push(e),d.push(a[f]);return c},[]),d},v.union=function(){return v.uniq(v.flatten(arguments,!0))},v.intersection=v.intersect=function(a){var b=g.call(arguments,1);return v.filter(v.uniq(a),function(a){return v.every(b,function(b){return v.indexOf(b,a)>=0})})},v.difference=function(a){var b=v.flatten(g.call(arguments,1),!0);return v.filter(a,function(a){return!v.include(b,a)})},v.zip=function(){for(var a=g.call(arguments),b=v.max(v.pluck(a,"length")),c=Array(b),d=0;d<b;d++)c[d]=v.pluck(a,""+d);return c},v.indexOf=function(a,b,c){if(a==null)return-1;var d;if(c)return c=v.sortedIndex(a,b),a[c]===b?c:-1;if(r&&a.indexOf===r)return a.indexOf(b);c=0;for(d=a.length;c<d;c++)if(c in a&&a[c]===b)return c;return-1},v.lastIndexOf=function(a,b){if(a==null)return-1;if(s&&a.lastIndexOf===s)return a.lastIndexOf(b);for(var c=a.length;c--;)if(c in a&&a[c]===b)return c;return-1},v.range=function(a,b,c){arguments.length<=1&&(b=a||0,a=0);for(var c=arguments[2]||1,d=Math.max(Math.ceil((b-a)/c),0),e=0,f=Array(d);e<d;)f[e++]=a,a+=c;return f};var y=function(){};v.bind=function(a,b){var c,d;if(a.bind===u&&u)return u.apply(a,g.call(arguments,1));if(!v.isFunction(a))throw new TypeError;return d=g.call(arguments,2),c=function(){if(this instanceof c){y.prototype=a.prototype;var e=new y,f=a.apply(e,d.concat(g.call(arguments)));return Object(f)===f?f:e}return a.apply(b,d.concat(g.call(arguments)))}},v.bindAll=function(a){var b=g.call(arguments,1);return b.length==0&&(b=v.functions(a)),w(b,function(b){a[b]=v.bind(a[b],a)}),a},v.memoize=function(a,b){var c={};return b||(b=v.identity),function(){var d=b.apply(this,arguments);return v.has(c,d)?c[d]:c[d]=a.apply(this,arguments)}},v.delay=function(a,b){var c=g.call(arguments,2);return setTimeout(function(){return a.apply(null,c)},b)},v.defer=function(a){return v.delay.apply(v,[a,1].concat(g.call(arguments,1)))},v.throttle=function(a,b){var c,d,e,f,g,h,i=v.debounce(function(){g=f=!1},b);return function(){return c=this,d=arguments,e||(e=setTimeout(function(){e=null,g&&a.apply(c,d),i()},b)),f?g=!0:h=a.apply(c,d),i(),f=!0,h}},v.debounce=function(a,b,c){var d;return function(){var e=this,f=arguments;c&&!d&&a.apply(e,f),clearTimeout(d),d=setTimeout(function(){d=null,c||a.apply(e,f)},b)}},v.once=function(a){var b=!1,c;return function(){return b?c:(b=!0,c=a.apply(this,arguments))}},v.wrap=function(a,b){return function(){var c=[a].concat(g.call(arguments,0));return b.apply(this,c)}},v.compose=function(){var a=arguments;return function(){for(var b=arguments,c=a.length-1;c>=0;c--)b=[a[c].apply(this,b)];return b[0]}},v.after=function(a,b){return a<=0?b():function(){if(--a<1)return b.apply(this,arguments)}},v.keys=t||function(a){if(a!==Object(a))throw new TypeError("Invalid object");var b=[],c;for(c in a)v.has(a,c)&&(b[b.length]=c);return b},v.values=function(a){return v.map(a,v.identity)},v.functions=v.methods=function(a){var b=[],c;for(c in a)v.isFunction(a[c])&&b.push(c);return b.sort()},v.extend=function(a){return w(g.call(arguments,1),function(b){for(var c in b)a[c]=b[c]}),a},v.pick=function(a){var b={};return w(v.flatten(g.call(arguments,1)),function(c){c in a&&(b[c]=a[c])}),b},v.defaults=function(a){return w(g.call(arguments,1),function(b){for(var c in b)a[c]==null&&(a[c]=b[c])}),a},v.clone=function(a){return v.isObject(a)?v.isArray(a)?a.slice():v.extend({},a):a},v.tap=function(a,b){return b(a),a},v.isEqual=function(b,c){return a(b,c,[])},v.isEmpty=function(a){if(a==null)return!0;if(v.isArray(a)||v.isString(a))return a.length===0;for(var b in a)if(v.has(a,b))return!1;return!0},v.isElement=function(a){return!!a&&a.nodeType==1},v.isArray=f||function(a){return i.call(a)=="[object Array]"},v.isObject=function(a){return a===Object(a)},v.isArguments=function(a){return i.call(a)=="[object Arguments]"},v.isArguments(arguments)||(v.isArguments=function(a){return!!a&&!!v.has(a,"callee")}),v.isFunction=function(a){return i.call(a)=="[object Function]"},v.isString=function(a){return i.call(a)=="[object String]"},v.isNumber=function(a){return i.call(a)=="[object Number]"},v.isFinite=function(a){return v.isNumber(a)&&isFinite(a)},v.isNaN=function(a){return a!==a},v.isBoolean=function(a){return a===!0||a===!1||i.call(a)=="[object Boolean]"},v.isDate=function(a){return i.call(a)=="[object Date]"},v.isRegExp=function(a){return i.call(a)=="[object RegExp]"},v.isNull=function(a){return a===null},v.isUndefined=function(a){return a===void 0},v.has=function(a,b){return j.call(a,b)},v.noConflict=function(){return b._=c,this},v.identity=function(a){return a},v.times=function(a,b,c){for(var d=0;d<a;d++)b.call(c,d)},v.escape=function(a){return(""+a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")},v.result=function(a,b){if(a==null)return null;var c=a[b];return v.isFunction(c)?c.call(a):c},v.mixin=function(a){w(v.functions(a),function(b){I(b,v[b]=a[b])})};var z=0;v.uniqueId=function(a){var b=z++;return a?a+b:b},v.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/.^/,B={"\\":"\\","'":"'",r:"\r",n:"\n",t:"\t",u2028:"\u2028",u2029:"\u2029"},C;for(C in B)B[B[C]]=C;var D=/\\|'|\r|\n|\t|\u2028|\u2029/g,E=/\\(\\|'|r|n|t|u2028|u2029)/g,F=function(a){return a.replace(E,function(a,b){return B[b]})};v.template=function(a,b,c){c=v.defaults(c||{},v.templateSettings),a="__p+='"+a.replace(D,function(a){return"\\"+B[a]}).replace(c.escape||A,function(a,b){return"'+\n_.escape("+F(b)+")+\n'"}).replace(c.interpolate||A,function(a,b){return"'+\n("+F(b)+")+\n'"}).replace(c.evaluate||A,function(a,b){return"';\n"+F(b)+"\n;__p+='"})+"';\n",c.variable||(a="with(obj||{}){\n"+a+"}\n");var a="var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n"+a+"return __p;\n",d=new Function(c.variable||"obj","_",a);return b?d(b,v):(b=function(a){return d.call(this,a,v)},b.source="function("+(c.variable||"obj")+"){\n"+a+"}",b)},v.chain=function(a){return v(a).chain()};var G=function(a){this._wrapped=a};v.prototype=G.prototype;var H=function(a,b){return b?v(a).chain():a},I=function(a,b){G.prototype[a]=function(){var a=g.call(arguments);return h.call(a,this._wrapped),H(b.apply(v,a),this._chain)}};v.mixin(v),w("pop,push,reverse,shift,sort,splice,unshift".split(","),function(a){var b=e[a];G.prototype[a]=function(){var c=this._wrapped;b.apply(c,arguments);var d=c.length;return(a=="shift"||a=="splice")&&d===0&&delete c[0],H(c,this._chain)}}),w(["concat","join","slice"],function(a){var b=e[a];G.prototype[a]=function(){return H(b.apply(this._wrapped,arguments),this._chain)}}),G.prototype.chain=function(){return this._chain=!0,this},G.prototype.value=function(){return this._wrapped}})).call(this);var DemandbaseClient,_,__slice=[].slice;_=this._.noConflict(),DemandbaseClient=function(){function a(a,b){this.key=a,b==null&&(b={}),this.staging=!1,this.versions={ip:2,email:3,domain:1},this.reqwest=b.reqwest||reqwest}return a.prototype.setVersion=function(a,b){return this.versions[a]=b},a.prototype.getVersion=function(a){return this.versions[a]},a.prototype.setStaging=function(a){return this.staging=a},a.prototype.ip=function(){var a,b;return a=1<=arguments.length?__slice.call(arguments,0):[],a=this._extract_args(a),b=a.opts,a[0]!=null&&(b.query=a[0]),this._invoke_api("ip",a.opts,"organization",a.callback)},a.prototype.email=function(){var a,b;return a=1<=arguments.length?__slice.call(arguments,0):[],a=this._extract_args(a),b=a.opts,b.query=a[0],this._invoke_api("email",b,"person",a.callback)},a.prototype.domain=function(){var a,b;return a=1<=arguments.length?__slice.call(arguments,0):[],a=this._extract_args(a),b=a.opts,b.query=a[0],this._invoke_api("domain",b,"domain",a.callback)},a.prototype._invoke_api=function(a,b,c,d){var e;return e=this.getVersion(a),_.extend(b,{key:this.key,page:document.location.href,referrer:document.referrer,page_title:document.title,ns:c}),this.reqwest({url:this._api_url(a,e),type:"jsonp",data:b,success:function(a){if(d!=null)return d(a[c])}})},a.prototype._extract_args=function(a){var b;return b={},_.isFunction(a[a.length-1])&&(b.callback=a.pop()),typeof a[a.length-1]=="object"?b.opts=a.pop():b.opts={},_.extend(b,a)},a.prototype._api_url=function(a,b,c){var d;return c==null&&(c=!0),d=c?"callback=?":"",""+this._protocol()+"://"+this._api_host()+"/api/v"+b+"/"+a+".json?"+d},a.prototype._protocol=function(){return"https:"===document.location.protocol?"https":"http"},a.prototype._api_host=function(){return this.staging?"ec2-184-73-197-21.compute-1.amazonaws.com":"api.demandbase.com"},a}(),this.DemandbaseClient=DemandbaseClient})).call(this);;/**/
/* Custom General jQuery
/*--------------------------------------------------------------------------------------------------------------------------------------*/
(function($, window, document, undefined) {
  // This code is used to delete cookies from the cookie groups for which the user hasn't given permission.
  var groups = [];
  var disabled_categories = 'No';
  // var groups = [];
  $.getJSON('https://cdn.cookielaw.org/consent/945fba74-dc72-4e25-9f4e-762a02221603/abc920e2-f74e-406e-a62d-85d8b78dae1d/en.json', function(data) {
    $.each(data.DomainData.Groups, function (i, val) {
      groups[val.OptanonGroupId] = val;
    });
  });

  $(document).on("DOMNodeInserted", "#onetrust-consent-sdk", function(e) {
    // This flag is used to ensure that the code is ran only once.
    if (disabled_categories == 'No') {
      // Delete cookies from straighttalk.hcltech.com and microsite.hcltech.com
      $("#onetrust-consent-sdk #onetrust-pc-sdk .category-group li input.category-switch-handler").each(function(){
        var category = $(this).attr('data-optanongroupid');
        if (!$.isEmptyObject(groups)) {
          if (!$.isEmptyObject(groups[category])) {
            var hosts_arr = groups[category].Hosts;
            $.each(hosts_arr, function (index, host) {

             if((host.HostName == "straighttalk.hcltech.com") || (host.HostName == "microsite.hcltech.com")){
                var cookies_arr = host.Cookies;
                $.each(cookies_arr, function (i, val) {
                  document.cookie = val.Name +'=; Domain=www.hcltech.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                  document.cookie = val.Name +'=; Domain=.hcltech.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                  //$.cookie(val.Name, '', { path: '/take-care-hcl/covid-19-bak-123', expires:-1 });
                  $.cookie(val.Name, null, { path: '/' });
                });
              }
            });
            var first_party_cookies_arr = groups[category].FirstPartyCookies;
            $.each(first_party_cookies_arr, function (i, val) {
              if((val.Host == "straighttalk.hcltech.com") || (val.Host == "microsite.hcltech.com")){
              document.cookie = val.Name +'=; Domain=www.hcltech.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              document.cookie = val.Name +'=; Domain=.hcltech.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              // $.cookie(val.Name, '', { path: '/take-care-hcl/covid-19-bak-123', expires:-1 });
              $.cookie(val.Name, null, { path: '/' });
             }
            });
          }
        }
      });
      $("#onetrust-consent-sdk #onetrust-pc-sdk .category-group li:not(.ot-always-active-group) input.category-switch-handler").each(function(){
        // The current cookie group is disabled.
        if($(this).prop("checked") == false){
          var category = $(this).attr('data-optanongroupid');
          if (!$.isEmptyObject(groups)) {
            if (!$.isEmptyObject(groups[category])) {
              var hosts_arr = groups[category].Hosts;
              $.each(hosts_arr, function (index, value) {
                var cookies_arr = value.Cookies;
                $.each(cookies_arr, function (i, val) {
                  document.cookie = val.Name +'=; Domain=www.hcltech.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                  document.cookie = val.Name +'=; Domain=.hcltech.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                  //$.cookie(val.Name, '', { path: '/take-care-hcl/covid-19-bak-123', expires:-1 });
                  $.cookie(val.Name, null, { path: '/' });
                });
              });
              var first_party_cookies_arr = groups[category].FirstPartyCookies;
              $.each(first_party_cookies_arr, function (i, val) {
                document.cookie = val.Name +'=; Domain=www.hcltech.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                document.cookie = val.Name +'=; Domain=.hcltech.com; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                // $.cookie(val.Name, '', { path: '/take-care-hcl/covid-19-bak-123', expires:-1 });
                $.cookie(val.Name, null, { path: '/' });
              });
            }
          }
        }
        disabled_categories = 'Yes';
      });
    }
  });
})(jQuery, window, document);
;/**/
(function($,window,document,undefined){$(window).on("load",function(){if($(".view-id-views_past_webinars.view-display-id-block_2").length){var industry_id="";industry_id=getUrlParameter_special_pages("industry_id");if(industry_id=="hitech")$(".view-id-views_past_webinars.view-display-id-block_2 li#19069").trigger("click")}});Drupal.behaviors.special_pages={attach:function(context){if($(".cte-header-sec.erx-page-navbar-new").length){var screencheck=Drupal.behaviors.library.screencheck;$(".cte-header-sec.erx-page-navbar-new .arrow .fa-angle-down").unbind("click").click(function(event){if($(this).hasClass("arrow-up")){$(this).parent().next().slideUp();
$(this).removeClass("arrow-up");if($(this).closest("li").hasClass("selected-item"))$(this).closest("li").removeClass("selected-item")}else{$(".cte-header-sec.erx-page-navbar-new li.has-children ul.sub-menu").slideUp();$(".cte-header-sec.erx-page-navbar-new .arrow .fa-angle-down").removeClass("arrow-up");if($(".cte-header-sec.erx-page-navbar-new li.has-children").hasClass("selected-item"))$(".cte-header-sec.erx-page-navbar-new li.has-children").removeClass("selected-item");$(this).parent().next().slideDown();
$(this).addClass("arrow-up");if(!$(this).closest("li").hasClass("selected-item"))$(this).closest("li").addClass("selected-item")}if(screencheck(767))return false})}if($(".ca-hcl-partnership .inspired-series").length){$(".ca-hcl-partnership .inspired-series #Series").addClass("show");$(".ca-hcl-partnership .inspired-series section").click(function(){$(".ca-hcl-partnership .inspired-series #Series").removeClass("show")})}if($(".node-type-special-page-revamp .configurable-form-section").length){$(".node-type-special-page-revamp .configurable-form-section .schedule-demo").on("click",
function(){$(".node-type-special-page-revamp .configurable-form-section .rhs-content.webform").css("visibility","visible")});$(".node-type-special-page-revamp .configurable-form-section .rhs-content.webform .webform-inner h6").on("click",function(){$(".node-type-special-page-revamp .configurable-form-section .rhs-content.webform").css("visibility","hidden")})}$(".qa-term-desc .load").click(function(){$(this).siblings(".inner-wrapper-ten").show();$(this).hide();$(this).siblings(".showless").show()});
$(".qa-term-desc .showless").click(function(){$(this).siblings(".inner-wrapper-ten").hide();$(this).hide();$(this).siblings(".load").show()});$(".prime-key-features #myCarousel").carousel({pause:true,interval:false});var screencheck=Drupal.behaviors.library.screencheck;$("#block-special-pages-special-pages-banner .item").each(function(){$getImageSrc=$(this).find("img").attr("src");$(this).css("background-image","url("+$getImageSrc+")")});$(".filter-label").click(function(){$(".filter-values").not(":animated").slideToggle(10)});
$("#block-special-pages-special-pages-section2 .filter-values .form-select").mCustomScrollbar({theme:"rounded"});$("body").on("click",function(){$(".filter-values").hide()});$(".filter-block").on("click",function(event){event.stopPropagation()});Drupal.behaviors.library.video_slider("#block-special-pages-special-pages-section2 .special-page-section2 .slider");if($(".sub-geo-presence-usa").length)$(".sub-geo-presence-usa").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:false,
arrows:true});if($(".sub-carousel-arrow-actian").length)$(".sub-carousel-arrow-actian").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:false,arrows:true});if($(".sub-carousel-arrow-highlight-actian").length)$(".sub-carousel-arrow-highlight-actian").not(".slick-initialized").slick({infinite:true,slidesToShow:3,slidesToScroll:1,dots:false,arrows:true,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1,infinite:true,dots:false,arrows:true}},{breakpoint:768,settings:{slidesToShow:1,
slidesToScroll:1}}]});function hide_current_slide(){var videoDisplay=$("#block-special-pages-special-pages-section2 .video-display").attr("id");var currentSlide=$("#block-special-pages-special-pages-section2 .video-thumb").find(".slick-slide[data-key='"+videoDisplay+"']");currentSlide.hide();$("#block-special-pages-special-pages-section2 .slick-slide").not(currentSlide).show()}if(!screencheck(980))hide_current_slide();if($(".special-page-section2").length){var selected_item="",selected_item_value=
"",selected_item_text="";var selected_items=[];var all_filter='<span class="selected-filter all"><span class="filter-value">All</span>';$(".selected-filters").append(all_filter);var selectedFilter=0;selectedFilter=$(".selected-filter").outerHeight(true)}$(".special-page-section2 .form-select .option").off("click").on("click",function(){if($(this).hasClass("selected")){var id=$(this).attr("id");var close_class=".close_"+id;$(close_class).click();return false}if($(this).hasClass("disabled"))return false;
var selected_filters={};selected_items=[];$(this).addClass("selected");$(".special-page-section2 .form-select .option.selected").each(function(){selected_item_text=$(this).text();selected_item_value=$(this).attr("id");selected_item="."+selected_item_value;selected_filters[selected_item_value]=selected_item_text;selected_items.push(selected_item)});selected_items_string=selected_items.join();filter_elements(selected_items_string);var filters="";$.each(selected_filters,function(i,val){var close_class=
"close_"+i;filters+='<span class="selected-filter"><span class="filter-value" data-attribute="'+i+'">'+val+'</span><span class="filter-close '+close_class+'">X</span></span>'});$(".selected-filters .selected-filter.all").remove();$(".selected-filters .selected-filter").remove();$(".selected-filters").append(filters);var selectedFilters=$(".selected-filters").height();if(selectedFilters>selectedFilter){$(".selected-filters").height(selectedFilter);$(".selected-filters .down-side").show();$(".selected-filters .up-side").hide();
$(".selected-filters").addClass("down-up-space")}});$(".special-page-section2 .filter-block").on("click",".selected-filter .filter-close",function(event){var remove_item_text=$(this).siblings(".filter-value").attr("data-attribute");$(".special-page-section2 .form-select #"+remove_item_text).removeAttr("disabled");remove_text="."+remove_item_text;remove_fitler="#"+remove_item_text;selected_items=$.grep(selected_items,function(value){return value!=remove_text});selected_items_string=selected_items.join();
filter_elements(selected_items_string);$(this).parent().remove();$(remove_fitler).removeClass("selected");if(!$(".selected-filters .filter-value").length)$(".selected-filters").append(all_filter);var selectedFilters=0;if($(".selected-filters").prop("style").height=="auto"){selectedFilters=$(".selected-filters").height();if(selectedFilters==selectedFilter){$(".selected-filters .up-side").hide();$(".selected-filters").removeClass("down-up-space")}}else{$(".selected-filters").css("height","auto");selectedFilters=
$(".selected-filters").height();if(selectedFilters==selectedFilter||selectedFilters<selectedFilter){$(".selected-filters .down-side").hide();$(".selected-filters").removeClass("down-up-space")}else $(".selected-filters").height(selectedFilter)}});function filter_elements(selected_item){if(selected_item.length===0)$(".video-thumb").slick("slickUnfilter");else{$(".video-thumb").slick("slickUnfilter");$(".video-thumb").slick("slickFilter",selected_item)}replace_featured_video_html();if(!screencheck(980))hide_current_slide()}
function replace_featured_video_html(){var video_url=$(".video-thumb").find(".slick-current .small-videos").attr("href");$("#block-special-pages-special-pages-section2 .video-display a").attr("href",video_url);var video_id=$(".video-thumb").find(".slick-current .small-videos").parent().attr("data-key");$("#block-special-pages-special-pages-section2 .video-display").attr("id",video_id);var video_img=$(".video-thumb").find(".slick-current .small-videos .img-responsive").attr("src");$("#block-special-pages-special-pages-section2 .video-display .img-responsive").attr("src",
video_img);var title=$(".video-thumb").find(".slick-current .small-videos .desc .title").html();var parse_content=$.parseHTML(title);$("#block-special-pages-special-pages-section2 .video-content .title").html(title);var organization=$(".video-thumb").find(".slick-current .small-videos .desc .sub-title").text();$("#block-special-pages-special-pages-section2 .video-content .sub-title").text(organization);var designation=$(".video-thumb").find(".slick-current .small-videos .desc .video-designation").text();
$("#block-special-pages-special-pages-section2 .video-content .video-designation").text(designation);var video_body=$(".video-thumb").find(".slick-current .video-body").html();$("#block-special-pages-special-pages-section2 .video-content .video-body").html(video_body)}$(".video-thumb .small-videos").on("click",function(event){event.preventDefault();var video_url=$(this).attr("href");$("#block-special-pages-special-pages-section2 .video-display a").attr("href",video_url);var video_id=$(this).parent().attr("data-key");
$("#block-special-pages-special-pages-section2 .video-display").attr("id",video_id);var video_img=$(this).find(".img-responsive").attr("src");$("#block-special-pages-special-pages-section2 .video-display .img-responsive").attr("src",video_img);var title=$(this).find(".desc .title").html();var parse_content=$.parseHTML(title);$("#block-special-pages-special-pages-section2 .video-content .title").html(title);var organization=$(this).find(".desc .sub-title").text();$("#block-special-pages-special-pages-section2 .video-content .sub-title").text(organization);
var designation=$(this).find(".desc .video-designation").text();$("#block-special-pages-special-pages-section2 .video-content .video-designation").text(designation);var video_body=$(this).siblings(".video-body").html();$("#block-special-pages-special-pages-section2 .video-content .video-body").html(video_body)});if($(".special-page-section2").length){$(".selected-filters").on("click",".down-side",function(){$(".selected-filters").css("height","auto");$(".selected-filters .down-side").hide();$(".selected-filters .up-side").show()});
$(".selected-filters").on("click",".up-side",function(){$(".selected-filters").height(selectedFilter);$(".selected-filters .up-side").hide();$(".selected-filters .down-side").show()})}if(!screencheck(1199))$("#block-special-pages-special-pages-section2 .slick-slide").click(function(){var video_id=$(this).attr("data-key");var selectedSlide=$("#block-special-pages-special-pages-section2 .video-thumb").find(".slick-slide[data-key='"+video_id+"']");selectedSlide.hide();$("#block-special-pages-special-pages-section2 .video-thumb .slick-slide").not(selectedSlide).show()});
else $("#block-special-pages-special-pages-section2 .small-videos").click(function(){$("#block-special-pages-special-pages-section2 .video-youtube").click()});$(".slider-campaigns").not(".slick-initialized").slick({dots:true,infinite:true,speed:300,slidesToShow:1,slidesToScroll:1});var random_no_slide=Math.floor(Math.random()*6);$(".relationship_slide").not(".slick-initialized").slick({autoplay:false,autoplaySpeed:2E4,dots:false,arrows:true,variableWidth:true,initialSlide:random_no_slide});$(".azure-overview-right-bar").not(".slick-initialized").slick({dots:true,
arrows:false,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:false,speed:300,adaptiveHeight:true});$(window).on("load",function(){var selector=$("#block-special-pages-special-pages-section1 .tab-pane");if(!screencheck(767)&&$(selector).length)Drupal.behaviors.library.top_bottom_padding(selector)});$("#block-special-pages-special-pages-section1 .nav-pills .rel").click(function(){$("#relationship").show();if(random_no_slide>=0)$(".relationship_slide").slick("slickGoTo",random_no_slide);
random_no_slide=-1;$(".relationship_slide").slick("slickSetOption","variableWidth",false);var max_ht=$("body").data("rbtc_max");var relation_tab=$("#block-special-pages-special-pages-section1 .tab-pane.relationship");var h=relation_tab.height();var calPadding=(max_ht-h)/2;relation_tab.css("padding-top",calPadding);relation_tab.css("padding-bottom",calPadding)});$("#block-special-pages-special-pages-section1 .nav-pills a").click(function(){if(!$(this).hasClass("rel"))$("#relationship").hide()});var max=
0;var equal_ht=Drupal.behaviors.library.equalheight;if(!screencheck(767))max=equal_ht("#block-special-pages-special-pages-section1 #value .content-col h3",0);$("#block-special-pages-special-pages-section1 .nav-pills .val").click(function(){$("#block-special-pages-special-pages-section1 #value .content-col h3").height(max)});$(window).on("load",function(){$(window).resize(function(){if(!screencheck(767))equal_ht("#block-special-pages-special-pages-section1 #value .content-col h3",0)})});$("#block-special-pages-special-pages-section1 .box-info").click(function(event){if(screencheck(767))Drupal.behaviors.library.accordion_content($(this),
"#block-special-pages-special-pages-section1",".box-table",".box-content",event);var cc=$("body").data("called");if($(this).hasClass("mob-rel")&&typeof cc==="undefined"){$("body").data("called",1);if(random_no_slide>=0)$(".relationship_slide").slick("slickGoTo",random_no_slide);random_no_slide=-1;$(".relationship_slide").slick("slickSetOption","variableWidth",false)}});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;var slick_equal_ht=Drupal.behaviors.library.equalheightslickdots;
if(!screencheck(639))equal_ht("#block-special-pages-special-pages-section3 .col-container h3",0);slick_equal_ht("#block-special-pages-special-pages-section3 .col-container h4",0);if($("body.containerizit .our_solution .our_sol_bxs ul").length)if(!screencheck(639)){equal_ht("body.containerizit .our_solution .our_sol_bxs ul",0);equal_ht("body.containerizit .our_solution .our_sol_bxs p",0)}if($("body.containerizit .we-ensure .mt-80 .col-1").length)if(!screencheck(767))equal_ht("body.containerizit .we-ensure .mt-80 .col-1",
0);if($("body.containerizit .overview .col-1").length)if(!screencheck(767))equal_ht("body.containerizit .overview .col-1",0);if($(".we-ensure-section-boxes .col-1").length)if(!screencheck(767))equal_ht(".we-ensure-section-boxes .col-1",0)});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;var slick_equal_ht=Drupal.behaviors.library.equalheightslickdots;if(!screencheck(639))equal_ht(".digital-transformation .col-container h3",0);slick_equal_ht(".digital-transformation .col-container h4",
0)});$("#explore").on("click",function(){var explore=$("#block-special-pages-special-pages-section1").offset().top-$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:explore},500)});$(".scroll-to-section1").on("click",function(event){event.preventDefault();if($(".fixed-nav").hasClass("fixed"))var explore=$("#block-special-pages-special-pages-section1").offset().top-$(".fixed-nav").outerHeight();else var explore=$("#block-special-pages-special-pages-section1").offset().top-2*$(".fixed-nav").outerHeight();
$("html, body").animate({scrollTop:explore},500)});$(".scroll-to-section").on("click",function(event){event.preventDefault();var link=$(this).attr("href");if($(".fixed-nav").hasClass("fixed"))var explore=$(link).offset().top-$(".fixed-nav").outerHeight();else var explore=$(link).offset().top-2*$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:explore},500)});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;var slick_equal_ht=Drupal.behaviors.library.equalheightslickdots;
if(!screencheck(639))equal_ht(".digital-transformation .col-container h3",0);slick_equal_ht(".digital-transformation .col-container h4",0)});Drupal.behaviors.library.united_video_slider("#customer-testimonials .special-page-section2 .slider");$(".video-thumb .small-videos").on("click",function(event){event.preventDefault();var video_url=$(this).attr("href");$("#customer-testimonials .video-display a").attr("href",video_url);var video_img=$(this).find(".img-responsive").attr("src");$("#customer-testimonials .video-display .img-responsive").attr("src",
video_img);var title=$(this).find(".desc .title").html();var parse_content=$.parseHTML(title);$("#customer-testimonials .video-content .title").html(title);var organization=$(this).find(".desc .sub-title").text();$("#customer-testimonials .video-content .sub-title").text(organization);var video_body=$(this).siblings(".video-body").html();$("#customer-testimonials .video-content .video-body").html(video_body)});$("#customer-testimonials .filter-values .form-select").mCustomScrollbar({theme:"rounded"});
$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;equal_ht("#leadership .col-container .profile-summary",0)});if(!$("#leadership").hasClass("acquisition-contact"))$("#leadership .col-container").unbind("click").click(function(){Drupal.behaviors.library.slide_desc("#leadership",this,".col-container",".content-block",".more-info-container")});$(document).click(function(){$("#leadership .more-info-container").each(function(){if($(this).css("display")=="block")$(this).prev().find(".col-container").click()})});
$("#leadership .more-info-container").click(function(event){event.stopPropagation()});$("#leadership .content-block").click(function(event){event.stopPropagation()});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;var slick_equal_ht=Drupal.behaviors.library.equalheightslickdots;if(!screencheck(639))equal_ht(".section-client-success .col-container h3",0);slick_equal_ht(".section-client-success .col-container h4",0)});$(window).resize(function(event){var equal_ht=
Drupal.behaviors.library.equalheight;var slick_equal_ht=Drupal.behaviors.library.equalheightslickdots;if(!screencheck(639))equal_ht("#newsroom .col-container h3",0);slick_equal_ht("#newsroom .col-container h4",0)});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;var slick_equal_ht=Drupal.behaviors.library.equalheightslickdots;if(!screencheck(639))equal_ht(".section-latest-thinking .col-container h3",0);slick_equal_ht(".section-latest-thinking .col-container h4",
0)});Drupal.behaviors.library.threeTabOverlay(".three_tab_overlay .tab_content",".three_tab_overlay ul.tabs li",".three_tab_overlay .tab_drawer_heading");$("#ind_slid").not(".slick-initialized").slick({dots:true,arrows:false,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;if(!screencheck(639)){equal_ht(".challenges .sol_bx_in",0);equal_ht(".challenges .sol_bx_in h4",0)}});$(window).resize(function(event){var equal_ht=
Drupal.behaviors.library.equalheight;if(!screencheck(639)){equal_ht(".our_sol_sec .sol_bx_in",0);equal_ht(".our_sol_sec .sol_bx_in h4",0)}});$("#home_sliderIot").not(".slick-initialized").slick({dots:true,arrows:false,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300});$(".application-block-content .box-info").click(function(event){if(screencheck(767))Drupal.behaviors.library.accordion_content($(this),".application-block-content",".box-table",".box-content",event)});
$(".application-block-content .box-table").click(function(event){if(!screencheck(767))Drupal.behaviors.library.application_content($(this))});$(".application-block-content .box-info").click(function(event){if(!screencheck(767)){$(".box-info").removeClass("active");$(this).addClass("active")}});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;if(!screencheck(639)){equal_ht(".our_solution .our_sol_bxs .bdr_bx .para_sol_bx",0);equal_ht(".our_solution .our_sol_bxs .bdr_bx ul",
0);equal_ht(".cloud-concept .our_solution .our_sol_bxs .our_sol_bxs_in .bdr_bx",0)}});if($("html").hasClass("fp-enabled"))$.fn.fullpage.destroy("all");if(!screencheck(1065))if($("#home-page").length){var FF=!(window.mozInnerScreenX==null);if(FF)$("#home-page").fullpage({parallaxKey:"aGNsdGVjaC5jb21fMlE1Y0dGeVlXeHNZWGc9anZV",parallax:true,scrollOverflow:false,css3:false,scrollBar:false,onLeave:function(index,nextIndex,direction){var leavingSection=$(this);if((index==2||index==5)&&direction=="up"){$(".fp-bg").css("transition",
"transform 2700ms ease");_}else if((index==1||index==4)&&direction=="down"){$(".fp-bg").css("transition","transform 700ms ease");_}}});else $("#home-page").fullpage({parallaxKey:"aGNsdGVjaC5jb21fMlE1Y0dGeVlXeHNZWGc9anZV",parallax:true,scrollOverflow:false,scrollBar:false,scrollingSpeed:600})}$(".arrowDown").click(function(){$.fn.fullpage.moveSectionDown()});if($(".event-campaign-html-section .key_client_engagement").length){var maxLength=100;$(".key_client_engagement .blocks-pack .pack-txt p").each(function(){var myStr=
$(this).text();var wordArray=myStr.split(" ");var newStr=[];var removedStr=[];for(i=0;i<wordArray.length;i++)if(i<=20)newStr.push(wordArray[i]);else removedStr.push(wordArray[i]);$(this).empty().html(newStr.join(" "));if(typeof removedStr!=="undefined"&&removedStr.length>0){$(this).append(' <a href="javascript:void(0);" class="read-more"></a>');$(this).append('<span class="more-text">'+removedStr.join(" ")+'<a href="javascript:void(0);" class="read-less"></a>'+"</span>")}});$(".read-more").click(function(){$(this).parents(".pack-txt").toggleClass("active");
$(this).siblings(".more-text").toggleClass("active")});$(".read-less").click(function(){$(this).parent(".more-text").toggleClass("active");$(this).parents(".pack-txt").toggleClass("active")})}if($(".view-awards-revamp").length){$(".view-awards-revamp .nav-tabs .view-awards-revamp").find("li").removeClass("active");$(".view-awards-revamp .nav-tabs .view-awards-revamp").find("li:first").addClass("active");$(".view-awards-revamp .tab-content").find(".tab-pane:first").addClass("in active");$(".view-awards-revamp .nav-tabs .view-awards-revamp li").click(function(){$(this).siblings().removeClass("active")})}if($(".investors-financial-data .investor-reports").length){$(".annual-reports .view-investors-financial-data .view-grouping .item-list").removeClass("equal_height");
if($(".financial_investors_pdf .view-investors-financial-data .view-grouping .item-list").length)if($(window).width()<769)$(".financial_investors_pdf .view-investors-financial-data .view-grouping .item-list").each(function(){$(this).removeClass("equal_height")});$(".annual-reports .view-filters #edit-field-financial-year-value").on("change",function(e){var selected_option=$(this).val();$(".quarter-reports .view-filters .form-select").val(selected_option).trigger("change");$(".quarter-reports #edit-submit-investors-financial-data").click();
$(".annual-reports #edit-submit-investors-financial-data").click()});var annual_report_first_year=$(".annual-reports .view-investors-financial-data .view-grouping:first-child .view-grouping-header").text();var quarter_report_first_year=$(".quarter-reports .view-investors-financial-data .view-grouping:first-child .view-grouping-header").text();if(annual_report_first_year!==quarter_report_first_year)$(".annual-reports .view-investors-financial-data .view-grouping:nth-child(3)").hide()}if($("#financial_filings .financial .finances-data").length){var share_data=
$(context).find("#financial_filings .financial .finances-data").once("special_pages");if(share_data.length){equal_ht("#financial_filings .financial .block .investor-icon-text",0);$.ajax({url:"/investors_page_financial_data/ajax",method:"POST",dataType:"json",success:function(data){var finance_data='<h4>NSE: HCLTECH \u2013 <span class="finance-date">'+data.finances_date+"</span>IST</h4>";var financial_rise_fall_class="";var check_rise=data.finances_rise_fall;if(check_rise>0)var financial_rise_fall_class=
"positive";else if(check_rise<0)var financial_rise_fall_class="negative";finance_data+='<div><span class="price">'+data.finances_data+'<span>INR</span></span> <span class="status"><span class="fluctuation-arrow '+financial_rise_fall_class+'">'+data.finances_rise_fall+'</span>(<span class="percentage">'+data.finances_rise_fall_percent+"</span>%)</span></div>";if($("#financial_filings .financial .finances-data .financial-data-loader").length)$("#financial_filings .financial .finances-data .financial-data-loader").remove();
if(!$("#financial_filings .financial .finances-data .price").length)$("#financial_filings .financial .finances-data").append(finance_data)}});setInterval(function(){$.ajax({url:"/investors_page_financial_data/ajax",method:"POST",dataType:"json",success:function(data){$("#financial_filings .financial .finance-date").text(data.finances_date);$("#financial_filings .financial .price").html(data.finances_data+"<span>INR</span>");var check_rise=data.finances_rise_fall;if(check_rise>0){if($("#financial_filings .financial .status").children(":first-child").hasClass("negative")){$("#financial_filings .financial .status").children(":first-child").removeClass("negative");
$("#financial_filings .financial .status").children(":first-child").addClass("positive")}$("#financial_filings .financial .status").children(":first-child").addClass("fluctuation-arrow")}else if(check_rise<0){if($("#financial_filings .financial .status").children(":first-child").hasClass("positive")){$("#financial_filings .financial .status").children(":first-child").removeClass("positive");$("#financial_filings .financial .status").children(":first-child").addClass("negative")}$("#financial_filings .financial .status").children(":first-child").addClass("fluctuation-arrow")}$("#financial_filings .financial .status").children(":first-child").text(data.finances_rise_fall);
$("#financial_filings .financial .status .percentage").text(data.finances_rise_fall_percent)}})},9E5)}}$(".inverse_img_content").closest(".container").addClass("container-override");$(window).resize(function(){if(!screencheck(767))equal_ht(".event-campaign-news-section .view-content .views-row .news-outer-wrapper",0)});$(window).resize(function(){if(!screencheck(767))equal_ht(".aht-best-services .aht-best-services-box .aht-best-services-box-inner",0)});$(".container-full").closest(".container").addClass("container-override");
$(".select-country select").change(function(){var url=$(this).val();window.location=url});$(".overviow_more_cont .col-container").click(function(){Drupal.behaviors.library.slide_desc(".overviow_more_cont",this,".col-container",".content-block",".more-info-container")});if($(".section-ideapreneurship .view-id-_ideapreneurship_revamp.view-display-id-block_1 .view-content").length)$(".section-ideapreneurship .view-id-_ideapreneurship_revamp.view-display-id-block_1 .view-content").not(".slick-initialized").slick({dots:false,
infinite:true,speed:300,slidesToScroll:1,asNavFor:".section-ideapreneurship .view-id-_ideapreneurship_revamp.view-display-id-block .view-content",centerMode:true,focusOnSelect:true,slidesToShow:5,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:580,settings:{slidesToShow:1,arrows:true,slidesToScroll:1}}]});if($(".section-ideapreneurship .view-id-_ideapreneurship_revamp.view-display-id-block .view-content").length)$(".section-ideapreneurship .view-id-_ideapreneurship_revamp.view-display-id-block .view-content").not(".slick-initialized").slick({dots:false,
infinite:true,speed:300,slidesToShow:1,slidesToScroll:1,asNavFor:".section-ideapreneurship .view-id-_ideapreneurship_revamp.view-display-id-block_1 .view-content"});$(".section-all-qa .all-qa .qa-term-name").unbind("click").click(function(){Drupal.behaviors.library.slide_desc(".section-all-qa",this,".qa-term-name",".qa-term-name-outer-wrapper",".qa-term-desc")});equal_ht(".section-all-qa .qa-term-name-outer-wrapper .qa-term-name",5);$(".accessibility-invert").click(function(){$("body").toggleClass("invert_color")});
$(window).resize(function(){if(!screencheck(767))equal_ht(".hm-section-3 .hm-sec-3",0)});if($(".hm-sec-6-slider").length)$(".hm-sec-6-slider").not(".slick-initialized").slick({dots:true,arrows:false,slidesToShow:3,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".hm-sec-4-lhs-outer .hm-sec-4-lhs").length)$(".hm-sec-4-lhs-outer .hm-sec-4-lhs").not(".slick-initialized").slick({dots:true,
arrows:false,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300});if($(".hm-section-5-slides").length)$(".hm-section-5-slides").not(".slick-initialized").slick({dots:true,arrows:false,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300});if($(".hm-section-2 .hm-section-2-inner .hm-sec-2-lhs .hm-sec-2-lhs-innr .hm-sec-2-txt").length)$(".hm-section-2 .hm-section-2-inner .hm-sec-2-lhs .hm-sec-2-lhs-innr .hm-sec-2-txt").not(".slick-initialized").slick({dots:false,
arrows:true,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300});if($(".hm-section-2 .hm-section-2-inner .hm-sec-2-rhs .hm-sec-2-rhs-innr .hm-sec-2-txt").length)$(".hm-section-2 .hm-section-2-inner .hm-sec-2-rhs .hm-sec-2-rhs-innr .hm-sec-2-txt").not(".slick-initialized").slick({dots:false,arrows:true,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300});if($(".event-campaign-executive-profile-section .nav-tabs").length){var url=
document.location.toString();if(url.match("#")){$('.nav-tabs a[href="#'+url.split("#")[1]+'"]').tab("show");$(".tab-content #executive_profiles").addClass("in");setTimeout(function(){$("html, body").animate({scrollTop:$("#leadership").offset().top-45},2E3)},500)}}if($(".geo-offices-new-design").length)if(!screencheck(480))equal_ht(".geo-offices-new-design .html-offices-regions-new .display-country-address .rows",20);$(".heading-offices-regions-new .country-select").click(function(){countryName=$(this).attr("value");
$(".display-country-address").removeClass("show");$("#"+countryName).addClass("show");if(!screencheck(480))equal_ht(".geo-offices-new-design .html-offices-regions-new .display-country-address .rows",20)});$(".publication-carousel").not(".slick-initialized").slick({slidesToShow:4,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,responsive:[{breakpoint:1215,settings:{slidesToShow:4,slidesToScroll:1}},{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:640,settings:{slidesToShow:2,
slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});$(".application-block-top-bottom .col-container").click(function(){Drupal.behaviors.library.slide_desc(".application-block-top-bottom",this,".col-container",".content-block",".more-info-container")});$(".node-type-job-posting-revamp .html-section .northern-ireland-webform-collapse").click(function(event){event.preventDefault();$(".node-type-job-posting-revamp #job-application-form").toggle()});if($(".node-type-job-posting-revamp #job-application-form").length){$("#job-application-form .webform-datepicker .form-item-submitted-date-of-birth-year").on("DOMNodeInserted",
"div.error",function(){$(this).html("Required")});$("#job-application-form .webform-datepicker .form-item-submitted-date-of-birth-month").on("DOMNodeInserted","div.error",function(){$(this).html("Required")});$("#job-application-form .webform-datepicker .form-item-submitted-date-of-birth-day").on("DOMNodeInserted","div.error",function(){$(this).html("Required")});$("#job-application-form .form-item-submitted-regardless-of-whether").on("DOMNodeInserted","div.error",function(){$(this).html("This field is required")});
$("#job-application-form .form-item-submitted-confirmation").on("DOMNodeInserted","div.error",function(){$(this).html("Minimum 1 selection is required")});if($(".messages.error.alert-danger").length){$(".node-type-job-posting-revamp #job-application-form").show();var job_posting_error_box=$(".messages.error.alert-danger").clone();$(".node-type-job-posting-revamp .messages.error.alert-danger").remove();$(".node-type-job-posting-revamp .sliding-banner-wrapper").after(job_posting_error_box)}}if($("body.node-type-special-page-revamp .solutions-section").length)$("body.node-type-special-page-revamp .solutions-section .col-container").click(function(){Drupal.behaviors.library.slide_desc("body.node-type-special-page-revamp .solutions-section",
this,".col-container",".content-block",".more-info-container")});if($(".cloud-concept #cloud-sass-services").length)$(".partners-carousel").not(".slick-initialized").slick({slidesToShow:4,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".cloud-concept #cloud-platfrom-services").length)$(window).on("load resize",
function(){if(!screencheck(480)){equal_ht("#cloud-platfrom-services .platform-blocks .plat-serv-block .title",0);equal_ht("#cloud-platfrom-services .platform-blocks .plat-serv-block .content",0)}});if($(".aws-four-boxes .platform-services .mid-section").length){var window_width=$(window).width();if(!screencheck(480)){equal_ht(".aws-four-boxes .platform-services .mid-section .top-block .title",0);equal_ht(".aws-four-boxes .platform-services .mid-section .top-block .content",0)}if(!screencheck(480)){equal_ht(".aws-four-boxes .platform-services .mid-section .bottom-block .title",
0);equal_ht(".aws-four-boxes .platform-services .mid-section .bottom-block .content",0)}}if($(".analyst-videos-authorise #webinar-gallery").length){$(".thumbnail-image").click(function(e){if(!$(".thumbnail-image").hasClass("email-verified")){e.preventDefault();$("#myModal").modal();if($(".video-play video",this).length)$(".video-play video",this).addClass("play-this")}});$("form.email-form").submit(function(e){e.preventDefault();var email_id=$('input[name="analyst_email"]',this).val();var pattern=
/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;if($.trim(email_id).match(pattern)){$('input[type="submit"]',this).attr("disabled",true);$.ajax({url:"/analyst-email/verify",type:"POST",data:{"email_id":email_id},dataType:"text",success:function(data){$(".popup-form p.invalid-email").remove();if(data=="otp_bypass"){$("form.email-form").html("Thank You for registration. You can watch videos now.");$(".thumbnail-image").addClass("email-verified");
setTimeout(function(){$(".view-video .modal").modal("hide");$(".thumbnail-image a").hide();$(".thumbnail-image .video-play").show();$(".download-video").show();$(".thumbnail-image .video-play video.play-this").prop("autoplay",true);$(".thumbnail-image .video-play video.play-this")[0].play()},1E3)}else if(data=="otp_send"){$("form.email-form").hide();$('form.otp-form input[name="otp_email"]').val(email_id);$("form.otp-form").show();$("form.otp-form").before('<p class="otp-sent">Thank You for registration. An OTP has been sent to your email id.</p>');
$(".popup-form p.otp-expired").hide();$('form.otp-form input[name="otp"]').val("")}else if(data=="email_not_exist"){$("form.email-form").html("Your request has gone to the administrator. You will get access within 3-5 business days.");setTimeout(function(){$(".view-video .modal").modal("hide")},5E3)}}})}else if(!$("form.email-form").prev().hasClass("invalid-email"))$("form.email-form").before('<p class="invalid-email">Enter valid email address</p>')});$("form.otp-form").submit(function(e){e.preventDefault();
var email_id=$('input[name="otp_email"]',this).val();var otp=$('input[name="otp"]',this).val();$.ajax({url:"/analyst-video-otp/verify",type:"POST",data:{"email_id":email_id,"event":"verify_otp","otp":otp},dataType:"json",success:function(data){if(data.message=="otp_expired"){$("form.otp-form").prev().hide();$("form.otp-form").hide();$("form.email-form").show();$("form.email-form").before('<p class="otp-expired">OTP has been already expired. Please fill the form again.</p>')}else if(data.message==
"correct_otp_not_expired"){$(".popup-form p.otp-sent").hide();$(".popup-form p.otp-wrong").hide();$("form.otp-form").html("Thank You for registration. You can watch videos now.");$(".thumbnail-image").addClass("email-verified");setTimeout(function(){$(".view-video .modal").modal("hide");$(".thumbnail-image a").hide();$(".thumbnail-image .video-play").show();$(".download-video").show();$(".thumbnail-image .video-play video.play-this").prop("autoplay",true);$(".thumbnail-image .video-play video.play-this")[0].play()},
1E3)}else if(data.message=="otp_incorrect"){$("form.otp-form").prev().html('<p class="otp-wrong"> You have entered wrong OTP. Please enter again.</p>');$('form.otp-form input[name="otp"]').val("")}}})});$(window).on("load resize",function(){if(!screencheck(640)){equal_ht(".video-panel .video-wrapper .field .text .title",0);equal_ht(".video-panel .video-wrapper .field .text .content",0);equal_ht(".video-panel .thumbnail-image",0)}})}if(!screencheck(767))if($(".product-communities").length)equal_ht(".product-communities p a",
0);if($("body.node-type-special-page-revamp.feb").length)$(window).on("load resize",function(){if(!screencheck(480)){if($("#our-solutions .feb-app-examples").length){equal_ht("#our-solutions .feb-app-examples .feb-app-title",0);equal_ht("#our-solutions .feb-app-examples .feb-app-image",0)}if($("#our-resources .feb-resources").length)equal_ht("#our-resources .feb-resources .feb-app-title",0)}});$(".iot-works-innerpages .team-slides-ss").slick({slidesToShow:3,slidesToScroll:1,infinite:true,speed:300,
responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});$(".iot-works-innerpages .team-slides").slick({slidesToShow:3,slidesToScroll:1,infinite:true,speed:300,arrows:true,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});
$(".iot-works-innerpages .team-slides2").slick({slidesToShow:4,slidesToScroll:1,infinite:true,speed:300,arrows:true,responsive:[{breakpoint:1024,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});$(".iot-works-innerpages .team-slides-recognitions").slick({slidesToShow:4,slidesToScroll:1,infinite:true,speed:300,arrows:true,responsive:[{breakpoint:1024,settings:{slidesToShow:1,slidesToScroll:1}},
{breakpoint:768,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".iot-works-innerpages").length)$("#tab1").addClass("active");$(".iot-works-innerpages .tabs a").on("click",function(e){e.preventDefault();$("#tab1, #tab2, #tab3, #tab4").removeClass("active");$(".iot-works-innerpages .tabs a").removeClass("active");$($(this).attr("href")).addClass("active");$(this).addClass("active")});$(window).on("load",function(){if($(window).width()<
1025)$("#tab1 .slick-arrow").css("top",$("#tab1 img").height()/2+"px");$(".solution-resources .slick-arrow").css("top",$(".solution-resources img").height()/2+"px");if($(".iot-works-innerpages .solution-features .solu-feat-col-1").length)equal_ht(".iot-works-innerpages .solution-features .solu-feat-col-1",0);if($(".iot-works-innerpages .why-us .test-stories").length)equal_ht(".iot-works-innerpages .why-us .test-stories",0);if($(".iot-works-innerpages .why-us .accelators-stories").length)equal_ht(".iot-works-innerpages .why-us .accelators-stories",
0);if($(".iot-works-innerpages .why-us .ss-stories").length)equal_ht(".iot-works-innerpages .why-us .ss-stories",0);if($(".iot-works-innerpages .why-us .ss-stories p").length)equal_ht(".iot-works-innerpages .why-us .ss-stories p",0);if($(window).width()>639)$(".azure-partnership #our-journey #partners .slick-arrow").css("top",$(".azure-partnership #our-journey #partners .image-box").height()/2+$(".azure-partnership #our-journey #partners .slick-arrow").height()/2+"px");else $(".azure-partnership #our-journey #partners .slick-arrow").css("top",
"130px");if(!screencheck(480))if($(".three-column-icons-design .views-row .views-row-inner").length)equal_ht(".three-column-icons-design .views-row .views-row-inner",0)});if($(".about-us-read-more").length){$(".about-us-read-more").click(function(event){event.preventDefault();$(this).hide();$(".about-us-read-more-content").fadeIn()});$(".about-us-read-less").click(function(event){event.preventDefault();$(".about-us-read-more-content").fadeOut();$(".about-us-read-more").fadeIn();var window_focus=$(".about-hcl-technologies").position();
$(window).scrollTop(window_focus.top)})}if(!screencheck(767)){if($("#prime-ers .section-latest-thinking.prime-ers .datasheet p").length)equal_ht("#prime-ers .section-latest-thinking.prime-ers .datasheet p",0);if($(".our-customers .publication-img img").length)equal_ht(".our-customers .publication-img img",0);if($(".clinical-research-features .solution-features .solu-feat-col-1 .title").length)equal_ht(".clinical-research-features .solution-features .solu-feat-col-1 .title",0)}$(".automation-orchestration-iassure-layers").not(".slick-initialized").slick({slidesToShow:1,
slidesToScroll:1,infinite:true,arrows:true});(function(){var i=0;$("#horizontalTab ul.resp-tabs-list li").each(function(){$(this).attr("tab-index",i);if(i==0)$(this).addClass("active");i++});i=0;$("#horizontalTab .resp-tabs-container .hybrid-cloud").each(function(){$(this).attr("tab-index",i);if(i==0){$(this).addClass("active");$(this).find("h3").addClass("active")}i++});$("#horizontalTab .resp-tabs-container .hybrid-cloud h3").on("click",function(){$(this).toggleClass("active");$(this).parent(".hybrid-cloud").find(".hybrid-cloud-inner").slideToggle();
$("#horizontalTab .resp-tabs-container .hybrid-cloud").removeClass("active");$(this).parent(".hybrid-cloud").addClass("active");$("#horizontalTab ul.resp-tabs-list li").removeClass("active");$('#horizontalTab ul.resp-tabs-list li[tab-index="'+$(this).parent(".hybrid-cloud").attr("tab-index")+'"]').addClass("active")});$("#horizontalTab ul.resp-tabs-list li").on("click",function(){$("#horizontalTab ul.resp-tabs-list li").removeClass("active");$(this).addClass("active");$("#horizontalTab .resp-tabs-container .hybrid-cloud").removeClass("active");
$('#horizontalTab .resp-tabs-container .hybrid-cloud[tab-index="'+$(this).attr("tab-index")+'"]').addClass("active");$("#horizontalTab .resp-tabs-container .hybrid-cloud").find("h3").removeClass("active");$('#horizontalTab .resp-tabs-container .hybrid-cloud[tab-index="'+$(this).attr("tab-index")+'"]').find("h3").addClass("active")})})();if($(".automation-orchestration-iassure-leadership").length)$(".automation-orchestration-iassure-leadership").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,
dots:false,arrows:true});$(".i-assure-block .engage").click(function(){$(".i-engage").show();$(".i-visualize").hide();$(".i-orchestrate").hide();$(".i-prevent").hide();$(".i-sense").hide()});$(".i-assure-block .ivisualize").click(function(){$(".i-visualize").show();$(".i-engage").hide();$(".i-orchestrate").hide();$(".i-prevent").hide();$(".i-sense").hide()});$(".i-assure-block .orchestrate").click(function(){$(".i-orchestrate").show();$(".i-visualize").hide();$(".i-prevent").hide();$(".i-sense").hide();
$(".i-engage").hide()});$(".i-assure-block .prevent").click(function(){$(".i-prevent").show();$(".i-visualize").hide();$(".i-orchestrate").hide();$(".i-sense").hide();$(".i-engage").hide()});$(".i-assure-block .sense").click(function(){$(".i-sense").show();$(".i-prevent").hide();$(".i-visualize").hide();$(".i-orchestrate").hide();$(".i-engage").hide()});$(".i-assure-block a").each(function(e){if($(this).attr("href")=="#")$(this).click(function(e){e.preventDefault()})});$(".i-assure-block .accordion:eq(0)> h3").click(function(){$(this).next().slideToggle("fast");
$(this).toggleClass("active")});if($(".clinical-research .banner-info .banner-cta-no-link").length)$(".clinical-research .banner-info .banner-cta-no-link").click(function(e){if($(".node-type-special-page-revamp .configurable-form-section .schedule-demo").length)$(".node-type-special-page-revamp .configurable-form-section .schedule-demo").click()});if($(".open-contact-form .banner-info .banner-cta-no-link").length)$(".open-contact-form .banner-info .banner-cta-no-link").click(function(e){if($(".node-type-special-page-revamp .configurable-form-section .schedule-demo").length)$(".node-type-special-page-revamp .configurable-form-section .schedule-demo").click()});
if($(".our_offering_section.feb-five-tabs-section.form-builder-customer-value .tab_container").length)if(!screencheck(767)){equal_ht("#tab1 li h5",0);$(".three_tab_overlay ul.tabs li").on("click",function(){var tab_id=$(this).attr("rel");equal_ht("#"+tab_id+" li h5",0)});$(".three_tab_overlay .tab_container h3.tab_drawer_heading").on("click",function(){var tab_id=$(this).attr("rel");equal_ht("#"+tab_id+" li h5",0)})}if($("body.internet-things-iot .special-page-sections .our_sol_sec.list-equal-height"))if(!screencheck(639)){equal_ht(".sol_bx ul",
0);equal_ht(".our_sol_bx ul",0)}if($(".hcl-test-one-our-solutions .solution h5"))if(!screencheck(768))equal_ht(".hcl-test-one-our-solutions .solution h5",0);if($(".hcl-test-one-benefits .benefits h5"))if(!screencheck(768))equal_ht(".hcl-test-one-benefits .benefits h5",0);if(!screencheck(1215))if($(".azure-tabber .three_tab_overlay .tab_container .left-section .content-box").length)equal_ht(".azure-tabber .three_tab_overlay .tab_container .left-section .content-box",0);if($(".home-screen-popup .panelists").length)if(!screencheck(1023))equal_ht(".home-screen-popup .panelists .panelist-name",
0);$(document).ready(function(){$(".close-popup").click(function(){$(".overlay-ca, .home-screen-popup").hide()})});if($(".htea-capabilities-section .htea-capabilities").length)$(window).on("load resize",function(){if(!screencheck(480)){equal_ht(".htea-capabilities-section .htea-capabilities .htea-capabilities-title h2",0);equal_ht(".htea-capabilities-section .htea-capabilities .htea-capabilities-description p",0)}});if($(".intel-access-section .intel-access").length){$(".intel-access-resource-block").css("display",
"block");$(".intel-access-gallary-block").css("display","none");$(".intel-access-section .intel-access .intel-access-top .tabs a").click(function(){if($(".intel-access-section .intel-access .intel-access-top .tabs a").hasClass("display-active")){$(".intel-access-section .intel-access .intel-access-top .tabs a").removeClass("display-active");$(this).addClass("display-active");if($(".intel-access-section .intel-access .intel-access-top .tabs .first-tab").hasClass("display-active")){$(".intel-access-resource-block").css("display",
"block");$(".intel-access-gallary-block").css("display","none")}else{$(".intel-access-resource-block").css("display","none");$(".intel-access-gallary-block").css("display","block")}}});$(window).on("load resize",function(){if(!screencheck(480)){equal_ht(".intel-access-section .intel-access .intel-access-resource-title h2",0);equal_ht(".intel-access-section .intel-access .intel-access-gallary-title h2",0);equal_ht(".intel-access-section .intel-access .intel-access-common",0)}})}if($(".ca-hcl-partnership .section2 .block h3").length){$(window).on("load",
function(){if(!screencheck(991))equal_ht(".ca-hcl-partnership .section2 .block h3",0)});$(window).resize(function(){if(!screencheck(991))equal_ht(".ca-hcl-partnership .section2 .block h3",0)})}if($(".women-lead-chapter .women-lead-box-height").length)if(!screencheck(1024))equal_ht(".women-lead-chapter .women-lead-box-height",0);$(".women-lead-australia-meet-mentors .right .leader-slider").slick({slidesToShow:3,slidesToScroll:1,infinite:true,speed:300,arrows:true,dots:false,responsive:[{breakpoint:767,
settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});$(".women-lead-australia-chapter1 .chapter-slide").slick({slidesToShow:1,slidesToScroll:1,infinite:true,speed:300,arrows:false,dots:true,autoplay:true});$(".women-lead-australia-meet-mentors .right .leader-slider .slick-next").click(function(){$(".women-lead-australia-meet-mentors .right .leader-slider .slick-prev").addClass("show")});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;
if(!screencheck(639)){equal_ht(".women-lead-australia-three-block .block h3",0);equal_ht(".women-lead-australia-three-block .block p",0)}});$(".women-lead-overview-section .text-wrapper a.view-more-videos").click(function(e){e.preventDefault();$(".women-lead-overview-section .text-wrapper .show-more-content").slideDown();$(".women-lead-overview-section .text-wrapper a.view-more-videos").hide();$(".women-lead-overview-section .text-wrapper a.read-less").show()});$(".women-lead-overview-section .text-wrapper a.read-less").click(function(e){e.preventDefault();
$(".women-lead-overview-section .text-wrapper .show-more-content").slideUp();$(".women-lead-overview-section .text-wrapper a.read-less").hide();$(".women-lead-overview-section .text-wrapper a.view-more-videos").show()});$(".women-lead-australia-executive-coach a.view-more-videos").click(function(e){e.preventDefault();$(".women-lead-australia-executive-coach .show-more-content").slideDown();$(".women-lead-australia-executive-coach a.view-more-videos").hide();$(".women-lead-australia-executive-coach a.read-less").show()});
$(".women-lead-australia-executive-coach a.read-less").click(function(e){e.preventDefault();$(".women-lead-australia-executive-coach .show-more-content").slideUp();$(".women-lead-australia-executive-coach a.read-less").hide();$(".women-lead-australia-executive-coach a.view-more-videos").show()});if($(".oracle-partners-inner").length)$(".oracle-partners-inner").not(".slick-initialized").slick({slidesToShow:4,slidesToScroll:1,dots:false,arrows:true,autoplay:true,autoplaySpeed:5E3,responsive:[{breakpoint:991,
settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:767,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".oracle-our-approach .content").length){var equal_ht=Drupal.behaviors.library.equalheight;$(window).on("load",function(){if(!screencheck(767))equal_ht(".oracle-our-approach .content",0)});$(window).resize(function(){if(!screencheck(767))equal_ht(".oracle-our-approach .content",0)})}if($(".women-lead-australia").length){$(".gdpr-disclaimer-text").parents(".webform-component").addClass("gdpr-webform-component-block");
$(".women-lead-australia .gdpr-disclaimer-text").insertAfter(".form-actions")}var smooth_scroll_to=function(element,target,duration){target=Math.round(target);duration=Math.round(duration);if(duration<0)return Promise.reject("bad duration");if(duration===0){element.scrollTop=target;return Promise.resolve()}var start_time=Date.now();var end_time=start_time+duration;var start_top=element.scrollTop;var distance=target-start_top;var smooth_step=function(start,end,point){if(point<=start)return 0;if(point>=
end)return 1;var x=(point-start)/(end-start);return x*x*(3-2*x)};return new Promise(function(resolve,reject){var previous_top=element.scrollTop;var scroll_frame=function(){if(element.scrollTop!=previous_top){reject("interrupted");return}var now=Date.now();var point=smooth_step(start_time,end_time,now);var frameTop=Math.round(start_top+distance*point);element.scrollTop=frameTop;if(now>=end_time){resolve();return}if(element.scrollTop===previous_top&&element.scrollTop!==frameTop){resolve();return}previous_top=
element.scrollTop;setTimeout(scroll_frame,0)};setTimeout(scroll_frame,0)})};$(document).ready(function(){if($("#verticalTab").length)$("#verticalTab").easyResponsiveTabs({type:"default",width:"auto",fit:true,closed:"accordion",tabidentify:"hor_1",activate:function(event){var $tab=$(this);var $info=$("#nested-tabInfo");var $name=$("span",$info);$name.text($tab.text());$info.show()}});if($("#verticalTab1").length)$("#verticalTab1").easyResponsiveTabs({type:"default",width:"auto",fit:true,closed:"accordion",
tabidentify:"hor_1",activate:function(event){var $tab=$(this);var $info=$("#nested-tabInfo");var $name=$("span",$info);$name.text($tab.text());$info.show()}})});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;equal_ht(".dpo .Horizontal .paraHeight",0);equal_ht(".dpo .Horizontal .paraHeight1",0)});if($(".dpo .dpo-mutili-banner").length)$(".dpo .dpo-mutili-banner").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:true,arrow:false,autoplay:true});
if($(".dpo .client-success .block .slick-wrap").length)$(".dpo .client-success .block .slick-wrap").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:true,arrow:false,autoplay:true});if($(".covid-blogs .view-covid-19-blogs-view .views-exposed-form .views-exposed-widgets .views-exposed-widget .views-widget").length){$(".covid-blogs .slider-section").not(".slick-initialized").slick({autoplay:false,dots:false,accessibility:false,draggable:false});$(".form-type-bef-link:nth-child(1) a").click(function(){$(".slider-section").slick("slickGoTo",
0);if(!screencheck(992))window.scrollTo({top:0,behavior:"smooth"})});$(".form-type-bef-link:nth-child(2) a").click(function(){$(".slider-section").slick("slickGoTo",1);if(!screencheck(992))window.scrollTo({top:0,behavior:"smooth"})});$(".form-type-bef-link:nth-child(3) a").click(function(){$(".slider-section").slick("slickGoTo",2);if(!screencheck(992))window.scrollTo({top:0,behavior:"smooth"})});$(".form-type-bef-link:nth-child(4) a").click(function(){$(".slider-section").slick("slickGoTo",3);if(!screencheck(992))window.scrollTo({top:0,
behavior:"smooth"})})}if(!screencheck(767))if($(".covid-blogs .covid-blogs-wrapper .covid-blogs-content-wrapper").length)equal_ht(".covid-blogs .covid-blogs-wrapper .covid-blogs-content-wrapper .desc",0);if($(".exacto .client-success .block .slick-wrap").length)$(".exacto .client-success .block .slick-wrap").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:true,arrow:false,autoplay:true});if($(".exacto .mainBanner").length)$(".exacto .mainBanner").not(".slick-initialized").slick({slidesToShow:1,
slidesToScroll:1,dots:true,arrow:false,autoplay:true});if($(".exacto .insights .block-wrapper .block .slide-wrap").length)$(".exacto .insights .block-wrapper .block .slide-wrap").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:true,arrow:false,autoplay:true});$(window).resize(function(event){var equal_ht=Drupal.behaviors.library.equalheight;equal_ht(".cloud_wrapper li span",0);equal_ht(".We-offer .col-1 p",0)});if($("body.cloud-concept.node-type-special-page-revamp").length)if(window.location.hash==
"#operate-optimize"||window.location.hash=="#sla-service-catalog"){var link=window.location.hash;if($(".application-block-prime-home "+link).length){$(".application-block-prime-home "+link).next(".more-info-container").show();$(".application-block-prime-home "+link+" .col-container").addClass("open");var scrollAmount=$(link).offset().top-$(".fixed-nav").outerHeight();$("html, body").animate({scrollTop:scrollAmount},200)}}if($(".google-cloud-banner .slides").length)if($(".play-pause-wrapper-global .Slick-Navigation").length){$(".google-cloud-banner .slides").not(".slick-initialized").slick({slidesToShow:1,
slidesToScroll:1,dots:true,appendDots:$(".Slick-Navigation"),arrows:false,autoplay:true});if($(".play-pause-wrapper-global .Slick-Navigation .slick-dots").length){var slick_wrapper=$(".play-pause-wrapper-global .Slick-Navigation .slick-dots");$("#slick-slide00",slick_wrapper).attr("aria-label","HCL Microsoft Business Unit");$("#slick-slide00 button",slick_wrapper).attr("aria-label","HCL Microsoft Business Unit");$("#slick-slide01",slick_wrapper).attr("aria-label","HCL Microsoft Business Unit: Takuya Hirano");
$("#slick-slide01 button",slick_wrapper).attr("aria-label","HCL Microsoft Business Unit: Takuya Hirano");$("#slick-slide02",slick_wrapper).attr("aria-label","Kalyan Kumar");$("#slick-slide02 button",slick_wrapper).attr("aria-label","Kalyan Kumar");$("#slick-slide03",slick_wrapper).attr("aria-label","Judson Althoff");$("#slick-slide03 button",slick_wrapper).attr("aria-label","Judson Althoff")}}else $(".google-cloud-banner .slides").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:true,
arrows:false,autoplay:true});jQuery(function(){if(jQuery("body.bca-2019").length>0){var toggleClass=function(elem,className){var newClass=" "+elem.className.replace(/[\t\r\n]/g," ")+" ";if(hasClass(elem,className)){while(newClass.indexOf(" "+className+" ")>=0)newClass=newClass.replace(" "+className+" "," ");elem.className=newClass.replace(/^\s+|\s+$/g,"")}else elem.className+=" "+className};var removeClass=function(elem,className){var newClass=" "+elem.className.replace(/[\t\r\n]/g," ")+" ";if(hasClass(elem,
className)){while(newClass.indexOf(" "+className+" ")>=0)newClass=newClass.replace(" "+className+" "," ");elem.className=newClass.replace(/^\s+|\s+$/g,"")}};var addClass=function(elem,className){if(!hasClass(elem,className))elem.className+=" "+className};var hasClass=function(elem,className){return(new RegExp(" "+className+" ")).test(" "+elem.className+" ")};if($(".bcatestimonial .slide-wrap").length)$(".bcatestimonial .slide-wrap").not(".slick-initialized").slick({dots:false});window.twttr=function(d,
s,id){var t,js,fjs=d.getElementsByTagName(s)[0];if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);return window.twttr||(t={_e:[],ready:function(f){t._e.push(f)}})}(document,"script","twitter-wjs");$(document).on("click",function(){$(".collapse").collapse("hide")});$(document).ready(function(){$("a.thumb").click(function(event){event.preventDefault();var content=$(".modal-body");content.empty();var title=
$(this).attr("title");$(".modal-title").html(title);content.html($(this).html());$(".modal-profile").modal({show:true})})});$("#gallerySlide").on("slide.bs.carousel",function(e){var $e=$(e.relatedTarget);var idx=$e.index();var itemsPerSlide=1;var totalItems=$(".carousel-item").length;if(idx>=totalItems-(itemsPerSlide-1)){var it=itemsPerSlide-(totalItems-idx);for(var i=0;i<it;i++)if(e.direction=="left")$(".carousel-item").eq(i).appendTo(".carousel-inner");else $(".carousel-item").eq(0).appendTo(".carousel-inner")}});
$("#gallerySlide").carousel({interval:2E3});$("#galleryCarousel").carousel({interval:5E3});$(document).ready(function(){$(".q1").hover(function(){$("#quotes1").slideDown(500)},function(){$("#quotes1").slideUp(500)});$(".q2").hover(function(){$("#quotes2").slideDown(500)},function(){$("#quotes2").slideUp(500)});$(".q3").hover(function(){$("#quotes3").slideDown(500)},function(){$("#quotes3").slideUp(500)});$(".q4").hover(function(){$("#quotes4").slideDown(500)},function(){$("#quotes4").slideUp(500)});
$(".q5").hover(function(){$("#quotes5").slideDown(500)},function(){$("#quotes5").slideUp(500)});$(".q6").hover(function(){$("#quotes6").slideDown(500)},function(){$("#quotes6").slideUp(500)})});var theToggle=document.getElementById("toggle");$("#blogCarousel").carousel({interval:5E3});theToggle.onclick=function(){toggleClass(this,"on");return false};$(".page-section-1").attr("id","Testimonial");$(".page-section-2").attr("id","flant2")}});$("#bcamenu li:nth-child(1) a").once().click(function(){$("html, body").animate({scrollTop:$("#bca").offset().top},
1500)});$("#bcamenu li:nth-child(2) a").once().click(function(){$("html, body").animate({scrollTop:$("#Testimonial").offset().top},1500)});$("#bcamenu li:nth-child(3) a").once().click(function(){$("html, body").animate({scrollTop:$("#flant2").offset().top},1500)});$(window).resize(function(){if($(".fusionoffice2 #success-stories .enterprise-soln-services .service-box").length)if(!screencheck(480))equal_ht(".fusionoffice2 #success-stories .enterprise-soln-services .service-box .service-title",0)});
var equal_ht=Drupal.behaviors.library.equalheight;equal_ht(".new-fusionoffice-2 .enterprise-soln-services .service-body",0);$(window).on("load",function(){equal_ht(".page-fusion-office-clone .fusion1-page-trends-box .title",0);equal_ht(".page-fusion-office-clone .fusion1-page-trends-box .content-wrapper",0)});$(window).resize(function(){equal_ht(".page-fusion-office-clone .fusion1-page-trends-box .title",0);equal_ht(".page-fusion-office-clone .fusion1-page-trends-box .content-wrapper",0);equal_ht(".new-fusionoffice-2 .enterprise-soln-services .service-body",
0)});if($(".oracle-our-approach .content").length){$(window).on("load",function(){equal_ht(".accessibility-new-page .acaas-six-divs-content .wrap",0)});$(window).resize(function(){equal_ht(".accessibility-new-page .acaas-six-divs-content .wrap",0);equal_ht(".accessibility-blog-page .accessibility-as-a-service-blog .accessibility-as-a-service-blog-content h6",0)})}if($(".accessibility-blog-page .accessibility-as-a-service-blog .accessibility-as-a-service-blog-content .wrap").length)$(window).resize(function(){equal_ht(".accessibility-blog-page .accessibility-as-a-service-blog .accessibility-as-a-service-blog-content .wrap",
0)});if($(".accessibility-home-page-news .news-content-wrapper").length)$(".accessibility-home-page-news .news-content-wrapper").not(".slick-initialized").slick({slidesToShow:3,slidesToScroll:1,dots:true,autoplay:true,responsive:[{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".accessibility-blog-tab .left").length)$(".accessibility-blog-tab .left").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,autoplay:true,
asNavFor:".accessibility-blog-tab .right"});if($(".accessibility-blog-tab .right").length)$(".accessibility-blog-tab .right").not(".slick-initialized").slick({slidesToShow:3,slidesToScroll:1,dots:false,vertical:true,verticalSwiping:true,autoplay:true,asNavFor:".accessibility-blog-tab .left",centerMode:false,focusOnSelect:true,responsive:[{breakpoint:992,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".payment-io-banner-wrapper").length)$(".payment-io-banner-wrapper").not(".slick-initialized").slick({slidesToShow:1,
slidesToScroll:1,dots:true,autoplay:true});$(window).resize(function(){if($(".payments .enterprise-soln-services .services-container .service-box .service-image .service-body").length)if(!screencheck(520))equal_ht(".payments .enterprise-soln-services .services-container .service-box .service-image .service-body",0)});$(".careers-in-northern-ireland-fed .html-section .northern-ireland-webform-collapse").once().click(function(event){event.preventDefault();$(".careers-in-northern-ireland-fed #job-application-form").toggle()});
$(window).resize(function(){if($(".fusionoffice2 #business-situation .iot-works-innerpages .business-section-content .number-heading").length)if(!screencheck(520))equal_ht(".fusionoffice2 #business-situation .iot-works-innerpages .business-section-content .number-heading",0)});if($(".new-fusionoffice-2 .open-banking-solution-wrapper").length)if(!screencheck(1023))$(".new-fusionoffice-2 .open-banking-solution-wrapper").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:true,autoplay:true});
$(".open-banking-solution-wrapper .three_tab_overlay2 .tab_container .tab_content#tab1").addClass("active");$(".open-banking-solution-wrapper .three_tab_overlay2 .tabs li:nth-child(1)").addClass("active");if($(window).width()>=1024){$(".open-banking-solution-wrapper .three_tab_overlay3 .tab_container .tab_content#tab4").addClass("active");$(".open-banking-solution-wrapper .three_tab_overlay3 .tabs li:nth-child(1)").addClass("active")}$(".open-banking-solution-wrapper .three_tab_overlay3 ul.tabs li").click(function(){$(".open-banking-solution-wrapper .three_tab_overlay3 .tab_container .tab_content").removeClass("active");
var activetab=$(this).attr("rel");$("#"+activetab).addClass("active");$(".open-banking-solution-wrapper .three_tab_overlay3 ul.tabs li").removeClass("active");$(this).addClass("active")});$(".open-banking-solution-wrapper .three_tab_overlay2 ul.tabs li").click(function(){$(".open-banking-solution-wrapper .three_tab_overlay2 .tab_container .tab_content").removeClass("active");var activetab=$(this).attr("rel");$("#"+activetab).addClass("active");$(".open-banking-solution-wrapper .three_tab_overlay2 ul.tabs li").removeClass("active");
$(this).addClass("active")});if($(window).width()<=1023)$(".open-banking-solution-wrapper .three_tab_overlay3 .tab_container h3.tab_drawer_heading, .open-banking-solution-wrapper .three_tab_overlay2 .tab_container h3.tab_drawer_heading").click(function(){$(".open-banking-solution-wrapper .three_tab_overlay3 .tab_container .tab_content, .open-banking-solution-wrapper .three_tab_overlay2 .tab_container .tab_content").removeClass("active");$(".open-banking-solution-wrapper .three_tab_overlay3 .tab_container h3.tab_drawer_heading, .open-banking-solution-wrapper .three_tab_overlay2 .tab_container h3.tab_drawer_heading").removeClass("d_active");
$(this).addClass("d_active");$(this).next().addClass("active")});if($(".covid-take-care .faq-slider").length)$(".covid-take-care .faq-slider").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,autoplay:true,dots:true,arrows:false,pauseOnFocus:false,autoplaySpeed:5E3});if($(".covid-take-care").length){$("body.covid-take-care .nav-tabs a").click(function(){$(this).tab("show");return false});$("body.covid-take-care .panel-heading").unbind("click").click(function(){var accordion=$(this).next(".panel-outer");
if($(accordion).hasClass("show")){$(this).removeClass("active");$(accordion).slideUp("normal").removeClass("show");return false}else{$(this).parents(".panel-group").find(".panel-heading").removeClass("active");$(this).parents(".panel-group").find(".panel-outer").slideUp("normal").removeClass("show");$(this).addClass("active");$(accordion).slideDown("normal").addClass("show");$(accordion).children(".panel-collapse").addClass("heightauto")}var $panel=$(this).closest(".panel-group");var $open=$(this).closest(".panel-group").find(".panel-outers");
var additionalOffset=0;$("html,body").animate({scrollTop:$panel.offset().top-(additionalOffset+100)},500);$(".covid-take-care .slide .speaker-slider1").slick("refresh")});var windowWidth=$(window).width();if(windowWidth>992)$(".covid-take-care .more-on-topic .topic-slide-wrap").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,autoplay:false,dots:true,arrows:false});$(".covid-take-care #speaker-tab-1 .panel-heading a").once().click(function(){$(".covid-take-care #speaker-tab-3 .more-on-topic .topic-slide-wrap").slick("unslick")});
$(".covid-take-care #speaker-tab-1 .panel-heading a").on("click",".slick-slider .delete",{},function(){$(".covid-take-care #speaker-tab-3 .more-on-topic .slick-slide").remove()});$(".covid-take-care #speaker-tab-3 .panel-heading a").once().click(function(){setTimeout(function(){$(".covid-take-care #speaker-tab-3 .more-on-topic .topic-slide-wrap").slick({slidesToShow:1,slidesToScroll:1,autoplay:false,dots:true,arrows:false})},3E3)});$(".covid-take-care #speaker-tab-1 .more-on-topic .block").once().click(function(){var more_topic_tab1=
$(this).html();var left_display_tab1=$(this).parents(".main-slide-block").children(".wrapper").html();$(this).parents(".main-slide-block").children(".wrapper").empty();$(this).parents(".main-slide-block").children(".wrapper").html(more_topic_tab1);$(this).empty();$(this).html(left_display_tab1);left_display_tab1=""});$(".covid-take-care #speaker-tab-2 .more-on-topic .block").once().click(function(){var more_topic_tab2=$(this).html();var left_display_tab2=$(this).parents(".main-slide-block").children(".wrapper").html();
$(this).parents(".main-slide-block").children(".wrapper").empty();$(this).parents(".main-slide-block").children(".wrapper").html(more_topic_tab2);$(this).empty();$(this).html(left_display_tab2);left_display_tab2=""});$(".covid-take-care #speaker-tab-3 .more-on-topic .block").once().click(function(){var more_topic_tab3=$(this).html();var left_display_tab3=$(this).parents(".main-slide-block").children(".wrapper").html();$(this).parents(".main-slide-block").children(".wrapper").empty();$(this).parents(".main-slide-block").children(".wrapper").html(more_topic_tab3);
$(this).empty();$(this).html(left_display_tab3);left_display_tab3=""});$(".covid-take-care #speaker-tab-1 .slide .speaker-slider1").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,arrows:false,autoplay:false,asNavFor:".covid-take-care #speaker-tab-1 .slide .slick-control-image"});$(".covid-take-care #speaker-tab-1 .slide .slick-control-image").not(".slick-initialized").slick({slidesToShow:3,slidesToScroll:1,asNavFor:".covid-take-care #speaker-tab-1 .slide .speaker-slider1",dots:false,
arrows:true,autoplay:false,focusOnSelect:true});$(".covid-take-care #speaker-tab-2 .slide .speaker-slider1").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,arrows:false,autoplay:false,asNavFor:".covid-take-care #speaker-tab-2 .slide .slick-control-image"});$(".covid-take-care #speaker-tab-2 .slide .slick-control-image").not(".slick-initialized").slick({slidesToShow:3,slidesToScroll:1,asNavFor:".covid-take-care #speaker-tab-2 .slide .speaker-slider1",dots:false,arrows:true,autoplay:false,
focusOnSelect:true});$(".covid-take-care #speaker-tab-3 .slide .speaker-slider1").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,arrows:false,autoplay:false,asNavFor:".covid-take-care #speaker-tab-3 .slide .slick-control-image"});$(".covid-take-care #speaker-tab-3 .slide .slick-control-image").not(".slick-initialized").slick({slidesToShow:3,slidesToScroll:1,asNavFor:".covid-take-care #speaker-tab-3 .slide .speaker-slider1",dots:false,arrows:true,autoplay:false,focusOnSelect:true});
$(".covid-take-care #speaker-tab-1 .more-on-topic .block").click(function(){$("html, body").animate({scrollTop:$(this).parents("#speaker-tab-1").offset().top-100},500)});$(".covid-take-care #speaker-tab-2 .more-on-topic .block").click(function(){$("html, body").animate({scrollTop:$(this).parents("#speaker-tab-2").offset().top-100},500)});$(".covid-take-care #speaker-tab-3 .more-on-topic .block").click(function(){$("html, body").animate({scrollTop:$(this).parents("#speaker-tab-3").offset().top-100},
500)});if($(".covid-take-care .sub-carousel-arrow").length)$(".covid-take-care .sub-carousel-arrow").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:false,arrows:true});if($(".hm-sec-6-slider-covid").length)$(".hm-sec-6-slider-covid").not(".slick-initialized").slick({dots:true,arrows:false,slidesToShow:2,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300,responsive:[{breakpoint:1024,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:1,
slidesToScroll:1}}]})}if($(".hcl-foundation-knowledge-center .knowledge-center-box-inner").length)$(".hcl-foundation-knowledge-center .knowledge-center-box-inner > ul").mCustomScrollbar({});if($(".hcl-foundation-awards-section .awards-slider").length)$(".hcl-foundation-awards-section .awards-slider").not(".slick-initialized").slick({dots:false,arrows:true,slidesToShow:3,slidesToScroll:1,autoplay:false,autoplaySpeed:5E3,infinite:true,speed:500,centerMode:true,responsive:[{breakpoint:767,settings:{slidesToShow:1}}]});
if($(".hcl-foundation-gallery-section .tab-content").length){if($(".hcl-foundation-gallery-section .tab-content .samuday").length)$(".hcl-foundation-gallery-section .samuday").magnificPopup({delegate:"a",type:"image",gallery:{enabled:true}});if($(".hcl-foundation-gallery-section .tab-content .grant").length)$(".hcl-foundation-gallery-section .grant").magnificPopup({delegate:"a",type:"image",gallery:{enabled:true}});if($(".hcl-foundation-gallery-section .tab-content .uday").length)$(".hcl-foundation-gallery-section .uday").magnificPopup({delegate:"a",
type:"image",gallery:{enabled:true}});if($(".hcl-foundation-gallery-section .tab-content .power").length)$(".hcl-foundation-gallery-section .power").magnificPopup({delegate:"a",type:"image",gallery:{enabled:true}});if($(".hcl-foundation-gallery-section .tab-content .clean-noida").length)$(".hcl-foundation-gallery-section .clean-noida").magnificPopup({delegate:"a",type:"image",gallery:{enabled:true}})}$(".hcl-foundation-what-we-do-section .nav-tabs a").click(function(){$(this).tab("show");return false});
$(".hcl-foundation-what-we-do-section .panel-heading").unbind("click").click(function(){var accordion=$(this).next(".panel-outer");if($(accordion).hasClass("show")){$(this).removeClass("active");$(accordion).slideUp("normal").removeClass("show");return false}else{$(this).parents(".panel-group").find(".panel-heading").removeClass("active");$(this).parents(".panel-group").find(".panel-outer").slideUp("normal").removeClass("show");$(this).addClass("active");$(accordion).slideDown("normal").addClass("show");
$(accordion).children(".panel-collapse").addClass("heightauto")}var $panel=$(this).closest(".panel-group");var $open=$(this).closest(".panel-group").find(".panel-outers");var additionalOffset=0;$("html,body").animate({scrollTop:$panel.offset().top-(additionalOffset+100)},500)});if($(".social-responsible-business-four-pillar .right-section").length)$(".social-responsible-business-four-pillar .right-section").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,arrows:false,fade:true,dots:true,
asNavFor:".social-responsible-business-four-pillar .left-section .wrap-slide"});if($(".social-responsible-business-four-pillar .application-block-content .left-section .wrap-slide").length)$(".social-responsible-business-four-pillar .application-block-content .left-section .wrap-slide").not(".slick-initialized").slick({slidesToShow:4,slidesToScroll:1,asNavFor:".social-responsible-business-four-pillar .right-section",dots:true,centerMode:true,focusOnSelect:true});if($(".covid-take-care .solution-wrapper .datacenter-slider").length)$(".covid-take-care .solution-wrapper .datacenter-slider").not(".slick-initialized").slick({dots:false,
arrows:true,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:1E3});$(window).resize(function(){var equal_ht=Drupal.behaviors.library.equalheight;if($(".covid-take-care.node-type-special-page-revamp .page-section-2 .datacenter-slider .swiper-container .col-content-1").length)if(!screencheck(767))equal_ht(".covid-take-care.node-type-special-page-revamp .page-section-2 .datacenter-slider .swiper-container .col-content-1 p",0)});$(document).on("click",".social-responsible-business .social-responsible-business-four-pillar .right-section .application-content .show-more",
function(){$(this).siblings(".show-more-content").show();$(this).html("<p><strong>Show Less</strong></p>").addClass("show-less")});$(document).on("click",".social-responsible-business .social-responsible-business-four-pillar .right-section .application-content .show-less",function(){$(this).siblings(".show-more-content").hide();$(this).html("<p><strong>Show More</strong></p>").removeClass("show-less")});if($(".icex-products .cte-banner-sec-items").length)$(".icex-products .cte-banner-sec-items").not(".slick-initialized").slick({dots:true,
arrows:false});if($(".icex-products .tourslider .block-wrap").length)$(".icex-products .tourslider .block-wrap").not(".slick-initialized").slick({dots:false,arrows:true,slidesToShow:1,slidesToScroll:1,autoplay:true});if($(".icex-products .cte-benefits-sec-item.cte-slick").length)$(".icex-products .cte-benefits-sec-item.cte-slick").not(".slick-initialized").slick({dots:false,arrows:true});if($(".icex-products").length)var $wrapperSlider=$(".icex-products .cte-resource-sec-items .slidwrap"),wrapperSlider=
$wrapperSlider[0];if($(".icex-products .cte-resource-sec-items .slidwrap").length)$(".icex-products .cte-resource-sec-items .slidwrap").not(".slick-initialized").slick({dots:true,arrows:false,slidesToShow:4,slidesToScroll:3,variableWidth:false,responsive:[{breakpoint:1025,settings:{slidesToShow:3,slidesToScroll:3}},{breakpoint:992,settings:{slidesToShow:1,slidesToScroll:1}},{breakpoint:767,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".icex-products .cte-resource-sec-item .inner-slider").length)$(".icex-products .cte-resource-sec-item .inner-slider").on("mousedown touchstart",
function(){wrapperSlider.slick.setOption({swipe:false})});if($(".icex-products .cte-resource-sec-item .inner-slider").length)$(".icex-products .cte-resource-sec-item .inner-slider").not(".slick-initialized").slick({dots:true,arrows:false,slidesToShow:1,slidesToScroll:1,autoplay:true,variableWidth:false,infinite:false});if($(".icex-products .cte-resource-sec-item .inner-slider").length)$(".icex-products .cte-resource-sec-item .inner-slider").on("afterChange",function(event,slick){wrapperSlider.slick.setOption({swipe:true})});
if($(".icex-products .cte-connected-sec-inner .cte-connected-sec-img").length)$(".icex-products .cte-connected-sec-inner .cte-connected-sec-img").not(".slick-initialized").slick({dots:true,arrows:false,slidesToShow:1,slidesToScroll:1,autoplay:true});if($(".icex-products .why-trust .customer .customer-wrapper").length)$(".icex-products .why-trust .customer .customer-wrapper").not(".slick-initialized").slick({dots:false,arrows:true,slidesToShow:5,slidesToScroll:1,autoplay:true,responsive:[{breakpoint:1025,
settings:{slidesToShow:4,slidesToScroll:1}},{breakpoint:768,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});equal_ht(".icex-products .icex-product-tour h3",0);equal_ht(".resource-three-box .right h3",0);equal_ht(".icex-products .cte-resource-sec-item-body ",0);equal_ht(".icex-products .cte-device-sec .cte-device-sec-item-body .wrap ",0);equal_ht(".icex-products .cte-device-sec .cte-device-sec-item-body ul.lst-t-1 ",0);equal_ht(".icex-products .cte-benefits-sec .cte-benefits-sec-item-inr ul.lst-t-1 ",
0);$(window).resize(function(){equal_ht(".resource-three-box .right h3",0);equal_ht(".icex-products .cte-resource-sec-item-body ",0);equal_ht(".icex-products .cte-device-sec .cte-device-sec-item-body .wrap ",0);equal_ht(".icex-products .cte-device-sec .cte-device-sec-item-body ul.lst-t-1 ",0);equal_ht(".icex-products .cte-benefits-sec .cte-benefits-sec-item-inr ul.lst-t-1 ",0)});if($(".icex-products").length!=0){$(".cte-device-sec .cte-device-sec-item-head a").on("click",function(e){$(this).parents(".cte-device-sec-item-inr").children(".popupwrap").show();
$(".cte-device-sec .popupwrap .slide-wrap").slick("setPosition");e.preventDefault()});$(".cte-device-sec .popupwrap span.close").on("click",function(e){$(".cte-device-sec .popupwrap").hide()});$(".icex-products .icex-product-tour img").once().click(function(){$(this).siblings(".popup").addClass("show")});$(".icex-products .content-show-hide .read-more").once().click(function(){$(".icex-products .content-show-hide .icex-checked-list.hide, .icex-products .content-show-hide .read-less").addClass("show");
$(".icex-products .content-show-hide .icex-checked-list.hide, .icex-products .content-show-hide .read-less").removeClass("hide");$(".icex-products .content-show-hide .read-more").addClass("hide")});$(".icex-products .content-show-hide .read-less").once().click(function(){$(".icex-products .content-show-hide .icex-checked-list.show, .icex-products .content-show-hide .read-less").addClass("hide");$(".icex-products .content-show-hide .icex-checked-list.show, .icex-products .content-show-hide .read-less").removeClass("show");
$(".icex-products .content-show-hide .read-more").removeClass("hide")});$(".icex-products .icex-product-tour .popup span").once().click(function(){$(".popup").removeClass("show")});if($(".cte-device-sec .popupwrap .slide-wrap").length)$(".cte-device-sec .popupwrap .slide-wrap").not(".slick-initialized").slick({dots:false,arrows:true})}if($(".icex-products .panel-heading a").length!=0)$(".icex-products .panel-heading a").on("click",function(e){if($(this).parents(".panel").children(".panel-collapse").hasClass("in"))e.stopPropagation()});
$(window).scroll(function(){if($(this).scrollTop()>50){$(".cte-header-sec").addClass("sticky");$(".icex-products .breadcrumb-wrapper").css({"position":"relative","top":"0"})}else{$(".cte-header-sec").removeClass("sticky");$(".icex-products .breadcrumb-wrapper").css({"position":"absolute","top":"60px"})}});if($(".icex-products").length!=0){var onScroll=function(event){var scrollPos=$(document).scrollTop();$(".icex-products .cte-header-sec .nav li .icex-scroll-on-click").each(function(){var currLink=
$(this);var refElement=$(currLink.attr("href"));if(refElement.position().top<=scrollPos&&refElement.position().top+refElement.height()>scrollPos){$(".icex-products .cte-header-sec .nav li .icex-scroll-on-click").removeClass("active");currLink.addClass("active")}else currLink.removeClass("active")})};$(document).on("scroll",onScroll);$(".icex-products .icex-scroll-on-click").on("click",function(event){event.preventDefault();$(".icex-products .cte-header-sec .nav li .icex-scroll-on-click").each(function(){$(this).removeClass("active")});
$(this).addClass("active");var target=this.hash,menu=target;$target=$(target);var link=$(this).attr("href");if($(".fixed-nav").hasClass("fixed"))var explore=$(link).offset().top-30;else var explore=$(link).offset().top-80;$("html, body").animate({scrollTop:explore},500,function(){$(document).on("scroll",onScroll)})})}$(".icex-products .popupclick").once().click(function(){$(this).siblings(".imgpopup").addClass("show")});$(".icex-products .imgpopup span.imgpopup-close").click(function(){$(".imgpopup").removeClass("show")});
$(window).resize(function(){if($(".icex-products .cte-resource-sec .cte-resource-sec-items .cte-resource-sec-item-inr .cte-resource-sec-item-body p").length)if(!screencheck(480))equal_ht(".icex-products .cte-resource-sec .cte-resource-sec-items .cte-resource-sec-item-inr .cte-resource-sec-item-body p",0)});if($(".hcl-exchange").length!=0){(new WOW).init();$(".hcl-exchange .hcl-exchange-banner .content").addClass("anim")}$(".hcl-exchange .hcl-exchange-banner .scroll").click(function(){$("html, body").animate({scrollTop:$("#innovation").offset().top+
2},500)});$(".hcl-exchange .exchange-scroll-on-click").on("click",function(event){event.preventDefault();var link=$(this).attr("href");if($(".fixed-nav").hasClass("fixed"))var explore=$(link).offset().top;else var explore=$(link).offset().top;$("html, body").animate({scrollTop:explore+2},500)});if($(".hcl-exchange .latest-content .latest-content-wrap").length)$(".hcl-exchange .latest-content .latest-content-wrap").not(".slick-initialized").slick({infinite:true,slidesToShow:3,slidesToScroll:1,arrow:true,
dots:false,responsive:[{breakpoint:992,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".hcl-exchange .archive-content .archive-slide-wrap").length)$(".hcl-exchange .archive-content .archive-slide-wrap").not(".slick-initialized").slick({infinite:true,slidesToShow:4,slidesToScroll:2,arrow:true,dots:true,responsive:[{breakpoint:992,settings:{slidesToShow:3,slidesToScroll:1}},{breakpoint:767,settings:{slidesToShow:2,slidesToScroll:1}},{breakpoint:480,
settings:{slidesToShow:1,slidesToScroll:1}}]});if($(".impact-analytics").length){$(".page-title h2").addClass("aos-init").attr("data-aos","fade-down");AOS.init({offset:62,easing:"ease-in-out-sine"});$(".client-success-slider").not(".slick-initialized").slick({dots:true,arrows:false,infinite:true,speed:300,slidesToShow:1,slidesToScroll:1})}$(".erx-new-product .mySolution").on("click",function(){$(".erx-new-product .mySolution").removeClass("active-tab");$(this).addClass("active-tab")});$(".erx-new-product #nts-content").show();
$(".erx-new-product .mySolution:nth-child(1)").on("click",function(){$(".erx-new-product .topTABS .tab-pane").hide();$(".erx-new-product .topTABS .tab-pane:nth-child(1)").show()});$(".erx-new-product .mySolution:nth-child(2)").on("click",function(){$(".erx-new-product .topTABS .tab-pane").hide();$(".erx-new-product .topTABS .tab-pane:nth-child(2)").show()});$(".erx-new-product .mySolution:nth-child(3)").on("click",function(){$(".erx-new-product .topTABS .tab-pane").hide();$(".erx-new-product .topTABS .tab-pane:nth-child(3)").show()});
$(".erx-new-product .mySolution:nth-child(4)").on("click",function(){$(".erx-new-product .topTABS .tab-pane").hide();$(".erx-new-product .topTABS .tab-pane:nth-child(4)").show()});$(".industry-transformation .panel-group").on("show.bs.collapse",function(e){$(e.target).prev().addClass("active").find(".glyphicon").removeClass("glyphicon-plus").addClass("glyphicon-minus")});$(".industry-transformation .panel-group").on("hide.bs.collapse",function(e){$(e.target).prev().removeClass("active").find(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus")});
$(".industry-transformation .panel-group .panel-heading a").once().on("click",function(e){$(this).parents(".panel-heading").removeClass("active");$(".glyphicon").removeClass("glyphicon-minus").addClass("glyphicon-plus");$(".industry-transformation .panel-group .panel-collapse").removeClass("in")});$(".erx-new-product .industry-transformation #page-wrap .carousel-indicators li").once().click(function(e){e.stopPropagation();var goTo=$(this).data("slide-to");$(".erx-new-product .industry-transformation .carousel-inner .item").each(function(index){if($(this).data("id")==
goTo){goTo=index;return false}});$(".industry-transformation #page-wrap .tab-pane .slide").carousel(goTo)});if($(".intello-fi-page .intello-new-normal .service-item").length){$(window).on("load",function(){equal_ht(".intello-fi-page .intello-new-normal .service-item",0);equal_ht(".intello-fi-page .intello-new-normal .service-item .services-title",0)});$(window).resize(function(){equal_ht(".intello-fi-page .intello-new-normal .service-item",0);equal_ht(".intello-fi-page .intello-new-normal .service-item .services-title",
0)})}if($(".intello-fi-page .intello-wifi .service-item").length){$(window).on("load",function(){equal_ht(".intello-fi-page .intello-wifi .service-item",0);equal_ht(".intello-fi-page .intello-wifi .service-item .services-title",0)});$(window).resize(function(){equal_ht(".intello-fi-page .intello-wifi .service-item",0);equal_ht(".intello-fi-page .intello-wifi .service-item .services-title",0)})}if($(".intello-fi-page .intello-product .service-item").length){$(window).on("load",function(){equal_ht(".intello-fi-page .intello-product .service-item",
0);equal_ht(".intello-fi-page .intello-product .service-item .services-title",0)});$(window).resize(function(){equal_ht(".intello-fi-page .intello-product .service-item",0);equal_ht(".intello-fi-page .intello-product .service-item .services-title",0)})}if($(".sap-cloud-platform .succ_story").length)$(".sap-cloud-platform .succ_story").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,dots:false,arrows:true});if($(".sap-cloud-platform .our_partner").length)$(".sap-cloud-platform .our_partner").not(".slick-initialized").slick({dots:false,
arrows:true,infinite:true,speed:300,slidesToShow:5,centerPadding:"20px",slidesToScroll:1,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:true}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2}},{breakpoint:480,settings:{slidesToShow:2,slidesToScroll:1}}]});if($(".sap-cloud-platform .popup-video-box").length)$(".sap-cloud-platform .popup-video-box").magnificPopup({type:"image"});if($(".sap-cloud-platform .succ_story_videos").length)$(".sap-cloud-platform .succ_story_videos").magnificPopup({delegate:".venobox",
type:"image",gallery:{enabled:true}});$(window).resize(function(){if($(".pc-insurance .enterprise-soln-services .service-box").length)if(!screencheck(480))equal_ht(".pc-insurance .enterprise-soln-services .service-box .service-title",0)});if($(".geo-presence-language-switcher").length){$(".geo-presence-language-switcher .fixed-nav .multi-level-menu li:nth-last-child(2)").addClass("disable-menu");$(".geo-presence-language-switcher .fixed-nav .multi-level-menu li:last-child").once().click(function(){$(".geo-presence-language-switcher .english").hide();
$(".geo-presence-language-switcher .german").show();$(".geo-presence-language-switcher .fixed-nav .multi-level-menu li:nth-last-child(2)").removeClass("disable-menu");$(".geo-presence-language-switcher .fixed-nav .multi-level-menu li:last-child").addClass("disable-menu")});$(".geo-presence-language-switcher .fixed-nav .multi-level-menu li:nth-last-child(2)").once().click(function(){$(".geo-presence-language-switcher .english").show();$(".geo-presence-language-switcher .german").hide();$(".geo-presence-language-switcher .fixed-nav .multi-level-menu li:nth-last-child(2)").addClass("disable-menu");
$(".geo-presence-language-switcher .fixed-nav .multi-level-menu li:last-child").removeClass("disable-menu")})}if($(".insurance-bus .h_services").length){var one=$(".h_services").offset().top;one=one-2*$(".fixed-nav").outerHeight()-50;$(window).scroll(function(){var screenPosition=$(document).scrollTop();if(screenPosition>=one){$(".h_services").addClass("active");window.setTimeout(function(){$(".h_services").removeClass("active")},6E3)}})}if($(".energy-utility .panel-heading").length)$(".energy-utility .panel-heading").once().click(function(){var accordion=
$(this).next(".panel-outer");if($(accordion).hasClass("show")){$(this).removeClass("active");$(accordion).slideUp("normal").removeClass("show");return false}else{$(this).parents(".panel-group").find(".panel-heading").removeClass("active");$(this).parents(".panel-group").find(".panel-outer").slideUp("normal").removeClass("show");$(this).addClass("active");$(accordion).slideDown("normal").addClass("show");$(accordion).children(".panel-collapse").addClass("heightauto")}var $panel=$(this).closest(".panel-group");
var $open=$(this).closest(".panel-group").find(".panel-outers");var additionalOffset=0;$("html,body").animate({scrollTop:$panel.offset().top-(additionalOffset+100)},500)});if($(".breast-cancer-awareness").length){if($(".bca-customer-quotes-box").length){$(window).on("load resize",function(){if(!screencheck(767)){var equal_ht=Drupal.behaviors.library.equalheight;equal_ht(".bca-customer-quotes-box .customer-quotes-item .customer-quote",0)}});$(".bca-customer-quotes-box").not(".slick-initialized").slick({dots:true,
slidesToShow:2,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300,responsive:[{breakpoint:767,settings:{slidesToShow:1,slidesToScroll:1}}]})}$(".bca-content .bca-exhibit-pink-wrapper .bca-exhibit-pink-wrapper .bca-exhibit-pink-image").not(".slick-initialized").slick({dots:false,arrows:true,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300});var a=0;$(window).scroll(function(){var oTop=$("#pinkinovation").offset().top-window.innerHeight;if(a==
0&&$(window).scrollTop()>oTop){$(".counter-value").each(function(){var $this=$(this),countTo=$this.attr("data-count");$({countNum:$this.text()}).animate({countNum:countTo},{duration:1E3,easing:"swing",step:function(){$this.text(Math.floor(this.countNum))},complete:function(){$this.text(this.countNum)}})});a=1}});if($(".breast-cancer-awareness .one-hcl-solutions .pinkinovation-blocks").length)if(!screencheck(992))equal_ht(".breast-cancer-awareness .one-hcl-solutions .pinkinovation-blocks",0)}if($(".hcl-sustainanility .our-speaker .strategy-list").length)$(".hcl-sustainanility .our-speaker .strategy-list .inner-text-img .carousel-image").not(".slick-initialized").slick({dots:false,
arrows:true,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:300});$(window).resize(function(event){if($(".services-section-spr").length){if(!screencheck(479)){equal_ht(".services-section-spr .services-title",0);equal_ht(".services-section-spr .views-row p",0);equal_ht(".services-section-spr .solution_new .views-row",20)}if(!screencheck(767))if($("#solution-section-white-layout .views-row").length){equal_ht("#solution-section-white-layout .views-row > div",0);equal_ht("#solution-section-white-layout .views-row .services-title",
5)}}});if($(".portfolio-box-section .application-block-content .left-section .new-wrap-slide").length)$(".portfolio-box-section .application-block-content .left-section .new-wrap-slide").not(".slick-initialized").slick({slidesToShow:8,slidesToScroll:1,asNavFor:".portfolio-box-section .right-section",dots:true,centerMode:true,focusOnSelect:true});if($(".portfolio-box-section .right-section").length)$(".portfolio-box-section .right-section").not(".slick-initialized").slick({slidesToShow:1,slidesToScroll:1,
arrows:false,fade:true,dots:true,asNavFor:".portfolio-box-section .left-section .new-wrap-slide"});$(document).on("click",".portfolio-box-section .right-section .application-content .show-more",function(){$(this).siblings(".show-more-content").show();$(this).html("<p><strong>Show Less</strong></p>").addClass("show-less")});$(document).on("click",".portfolio-box-section .right-section .application-content .show-less",function(){$(this).siblings(".show-more-content").hide();$(this).html("<p><strong>Show More</strong></p>").removeClass("show-less")});
if($(".play-pause-carousel-section").length){$(".play-pause-carousel").not(".slick-initialized").slick({dots:true,arrows:true,slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:5E3,infinite:true,speed:500});$(".pause-carousel").on("click",function(){$(".sap-ecosystem-carousel").slick("slickPause");$(this).hide();$(".play-carousel").show()});$(".play-carousel").on("click",function(){$(".sap-ecosystem-carousel").slick("slickPlay");$(this).hide();$(".pause-carousel").show()})}$(".analyst-secondary-header .navbar-nav > li > a").on("click",
function(){$("html, body").animate({scrollTop:$($(this).attr("href")).offset().top-60},500,"linear");return false});if($(".analyst-secondary-header").length){var $dropdown=$(".analyst-secondary-header .dropdown");var $dropdownToggle=$(".analyst-secondary-header .dropdown-toggle");var $dropdownMenu=$(".analyst-secondary-header .dropdown-menu");var showClass="show";$(window).on("load resize",function(){if(this.matchMedia("(min-width: 768px)").matches)$dropdown.hover(function(){var $this=$(this);$this.addClass(showClass);
$this.find($dropdownToggle).attr("aria-expanded","true");$this.find($dropdownMenu).addClass(showClass)},function(){var $this=$(this);$this.removeClass(showClass);$this.find($dropdownToggle).attr("aria-expanded","false");$this.find($dropdownMenu).removeClass(showClass)});else $dropdown.off("mouseenter mouseleave")})}if($(".analyst-play-pause-wrapper").length){var slick_banner_append_dots_analyst={slidesToShow:1,slidesToScroll:1,autoplay:true,autoplaySpeed:1E4,dots:true,appendDots:$(".Slick-Navigation"),
arrows:true,pauseOnHover:true,pauseOnFocus:false};if(!$("body.remove-banner-slider").length)if($(".analyst-slider-section").length)if($(".analyst-play-pause-wrapper .Slick-Navigation").length){$(".analyst-slider-section").not(".slick-initialized").slick(slick_banner_append_dots_analyst);if($(".node-type-ct-service-line-landing-page").length)$(".analyst-play-pause-wrapper .item:not(.slick-cloned)").each(function(){var slide_desc=$(this).attr("aria-label");var slide_id=$(this).attr("aria-describedby");
$(".analyst-play-pause-wrapper .Slick-Navigation #"+slide_id).attr("aria-label",slide_desc);$(".analyst-play-pause-wrapper .Slick-Navigation #"+slide_id+" button").attr("aria-label",slide_desc);$(".analyst-play-pause-wrapper .Slick-Navigation #"+slide_id+" button").attr("title",slide_desc)})}else $(".analyst-slider-section").not(".slick-initialized").slick(slick_banner);$(document).on("click",".play",function(){$(this).find(".fa").removeClass("fa-play-circle-o").addClass("fa-pause-circle-o");$(this).removeClass("play");
$(this).addClass("pause");$(this).attr("aria-label","pause");$(this).parent(".analyst-play-pause-wrapper").find(".slick-initialized").slick("slickPlay")});$(document).on("click",".pause",function(event){$(this).find(".fa").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");$(this).removeClass("pause");$(this).addClass("play");$(this).attr("aria-label","play");$(this).parent(".analyst-play-pause-wrapper").find(".slick-initialized").slick("slickPause")});$(document).keypress(function(event){var keycode=
event.keyCode?event.keyCode:event.which;if(keycode=="13"){$(this).find(".fa").removeClass("fa-pause-circle-o").addClass("fa-play-circle-o");$(this).removeClass("pause");$(this).addClass("play");$(this).attr("aria-label","play");$(this).parent(".analyst-play-pause-wrapper").find(".slick-initialized").slick("slickPause")}})}$(".analyst-secondary-header .navbar-toggler").unbind("click").click(function(){$(".analyst-menu-outer").slideToggle();$("body").toggleClass("no-overflow")});$(document).ready(function(){if($(".content-hidden-type").length){$(".content-hidden-type").slice(0,
4).show();$("#loadMore").on("click",function(e){e.preventDefault();$(".content-hidden-type:hidden").slice(0,4).slideDown();if($(".content-hidden-type:hidden").length==0)$("#loadMore").hide()})}});$(window).resize(function(){if(screencheck(768)&&$(".analyst-recognitions .business-bx").length)$(".business-bx").find(".analyst-tabs-container").insertAfter(".analyst-tabs-list li.active");else $(".business-bx").find(".analyst-tabs-container").insertAfter(".analyst-tabs-list")});if($(".analyst-tabs-list").length){var Tabpath=
window.location.href;$(".analyst-tabs-list li a").each(function(){if(this.href===Tabpath)$(this).parent("li").addClass("active")})}}};var getUrlParameter_special_pages=function getUrlParameter_special_pages(sParam){var sPageURL=decodeURIComponent(window.location.search.substring(1)),sURLVariables=sPageURL.split("&"),sParameterName,i;for(i=0;i<sURLVariables.length;i++){sParameterName=sURLVariables[i].split("=");if(sParameterName[0]===sParam)return sParameterName[1]===undefined?true:sParameterName[1]}}})(jQuery,
window,document);
jQuery(function(){if(jQuery("body.bca-2019").length>0){var ihh=0;var txt="Thanks for supporting this cause. I have lost a couple of friends to this and my husband lost a male colleague \u2013 it blights men too \u2013 but is not highlighted as much. This cancer is treatable if caught early enough and treatment is undertaken. Mammogram are very painful \u2013 but necessary and better than going through cancer and dying \u2013 not sure these would work for men though.";var speed=10;var typing=function(){if(ihh<
txt.length){document.getElementById("live").innerHTML+=txt.charAt(ihh);ihh++;setTimeout(typing,speed)}else{document.getElementById("live").classList.add("live");document.getElementById("belongTo").classList.add("fade-in");document.getElementById("belongTo").classList.remove("hidden")}};var vhh=0;var txt2="We\u2019re going Pink to support breast cancer awareness! With awareness comes support and with support comes community. We hope our community feels supported as no one is alone in this battle.";
var speed2=10;var typing2=function(){if(vhh<txt2.length){document.getElementById("live2").innerHTML+=txt2.charAt(vhh);vhh++;setTimeout(typing2,speed2)}else{document.getElementById("live2").classList.add("live2");document.getElementById("belongTo2").classList.add("fade-in");document.getElementById("belongTo2").classList.remove("hidden")}};typing();typing2()}});;/**/
(function($,window,document,undefined){Drupal.behaviors.gdpr_sub_unsub={attach:function(context){if($(".section-unsubscribe .unsubscribe-form .webform-client-form").length)$(".section-unsubscribe .unsubscribe-form .webform-client-form .form-item-submitted-preferences .checkbox input").each(function(){this.checked=true});if($("form.webform-client-form.gdpr-complience-form").length){var webform=$("form.webform-client-form.gdpr-complience-form");if($("#webform-component-preferences",webform).length)$("#webform-component-preferences .form-type-checkbox input",
webform).each(function(){this.checked=true});if($("#webform-component-contact-mode",webform).length)$("#webform-component-contact-mode .form-type-checkbox input",webform).each(function(){this.checked=true});if($(".form-item-submitted-preferences",webform).length)$(".form-item-submitted-preferences .checkbox input",webform).each(function(){this.checked=true});if($(".form-item-submitted-contact-mode",webform).length)$(".form-item-submitted-contact-mode .checkbox input",webform).each(function(){this.checked=
true})}$(window).on("load",function(){if(window.location.hash=="#consent-history")setTimeout(function(){$("html, body").animate({scrollTop:$("#consent-history").offset().top-60},2E3)},200);$(".section-unsubscribe .webform-client-form").off("submit").on("submit",function(e){var pattern=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;e.preventDefault();var preferences_error=$(".form-item-submitted-preferences div.error",this).clone();if(!$(".form-item-submitted-preferences >div.error",
this).length)$(".form-item-submitted-preferences",this).prepend(preferences_error);if(!$(".section-unsubscribe .webform-client-form .error").is(":visible")&&!$(".section-unsubscribe .webform-client-form .email-type-error").is(":visible")){$("button.unsubsribe-popup-btn").click();$("form.unsubscribe_confirm_form").unbind("submit").submit(function(event){event.preventDefault();var unsubscribe_confirm=$('form.unsubscribe_confirm_form input[name="unsubscribe_confirm"]:checked').val();if(unsubscribe_confirm==
"Yes"){$(".section-unsubscribe .webform-client-form").off("submit");$(".section-unsubscribe .webform-client-form").submit()}else{$("form.unsubscribe_confirm_form").off("submit");$("form.unsubscribe_confirm_form").submit()}})}});$('#view-history form.gdpr-otp-history-form input[name="otp_email_history"]').focusout(function(event){var otp_email=$(this).val();$('#view-history form.gdpr-view-history-form input[name="view_email_history"]').val(otp_email);var pattern=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
if(!$.trim(otp_email).match(pattern)){if(!$("form.gdpr-otp-history-form .history-email .error").length)$("form.gdpr-otp-history-form .history-email").prepend('<div class="error">Please enter a valid email id.</div>')}else $("form.gdpr-otp-history-form .history-email .error").remove()});$("#view-history form.gdpr-otp-history-form").unbind("submit").submit(function(e){e.preventDefault();var otp_email=$('input[name="otp_email_history"]',this).val();$('#view-history form.gdpr-view-history-form input[name="view_email_history"]').val(otp_email);
var pattern=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;if(!$.trim(otp_email).match(pattern)){if(!$("form.gdpr-otp-history-form .history-email .error").length)$("form.gdpr-otp-history-form .history-email").prepend('<div class="error">Please enter a valid email id.</div>')}else $("form.gdpr-otp-history-form .history-email .error").remove();if($.trim(otp_email).match(pattern)){$("#view-history .user_opt_history").html("");if(!$("form.gdpr-otp-history-form .history-email .email-type-error").is(":visible"))$.ajax({url:"/gdpr/send-otp-mail",
type:"POST",data:{"otp_mail":otp_email,"type":"otp_history"},dataType:"json",success:function(data){if(data.msg=="success"){$("#view-history .otp-result").html("OTP has been sent. Please check your mailbox.");$('form.gdpr-otp-history-form input[name="otp_email_history"]').prop("disabled",true);$("#view-history form.gdpr-view-history-form").show()}if(data.msg=="wrong email")if(!$("form.gdpr-otp-history-form .history-email .error").length)$("form.gdpr-otp-history-form .history-email").prepend('<div class="error">Please enter a valid email id.</div>')}})}});
$("#view-history form.gdpr-view-history-form").unbind("submit").submit(function(e){e.preventDefault();var email_id=$('input[name="view_email_history"]',this).val();var submitted_otp=$('input[name="otp_history"]',this).val();$.ajax({url:"/gdpr/send-otp-mail",type:"POST",data:{"otp":submitted_otp,"type":"history_submit","unsubs_email":email_id},dataType:"json",success:function(data){$("#view-history .otp-result").html("");if(data.msg)if(data.msg=="correct"){$("#view-history form input").prop("disabled",
true);$("#view-history .user_opt_history").html(data.history)}else if(data.msg=="expired")$("#view-history .user_opt_history").html('<div class="error">Your OTP has been expired. Resend OTP.</div>');else $("#view-history .user_opt_history").html("<div class='error'>Your OTP didn't match. Please enter correct OTP</div>")}})});$(".section-subscribe .webform-client-form").unbind("submit").on("submit",function(e){var email=$(".form-item-submitted-email-id input",this).val();if(!$(".section-subscribe .webform-client-form .error").is(":visible")&&
!$(".section-subscribe .webform-client-form .email-type-error").is(":visible")&&!$(".section-subscribe .webform-client-form .prefrence-error").is(":visible")&&!$(".section-subscribe .webform-client-form .contact-mode-error").is(":visible")&&!$(".section-subscribe .webform-client-form .phone-error").is(":visible")){e.preventDefault();var pattern=/^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;if($.trim(email).match(pattern))$.ajax({url:"/gdpr/send-otp-mail",
type:"POST",data:{"otp_mail":email,"type":"subscribe_email_chk"},dataType:"json",success:function(data){if(data.msg=="wrong email"){if(!$(".section-subscribe .webform-client-form .form-item-submitted-email-id .email-type-error").length)$(".section-subscribe .webform-client-form .form-item-submitted-email-id").prepend("<div class='email-type-error' style='color: #EB0000;'>Please enter a valid email address.</div>")}else{$(".section-subscribe .webform-client-form").off("submit");$(".section-subscribe .webform-client-form").submit()}}})}})});
if($("body.node-type-jobs-campaign").length==0)if(!$("body.node-type-power20").length)if($(".sliding-banner-wrapper").length){var error_box=$(".messages.error.alert-danger").clone();if($(".messages.error.alert-danger").length){$(".messages.error.alert-danger").remove();$(".sliding-banner-wrapper").after(error_box)}}if($(".gdpr-complience-form .gdpr-disclaimer-text").length){var webform_markup=$(".gdpr-complience-form .gdpr-disclaimer-text").clone();$(".gdpr-complience-form .gdpr-disclaimer-text").remove();
$(".gdpr-complience-form.webform-client-form > div").append(webform_markup)}}}})(jQuery,window,document);;/**/
(function($,Drupal,window,document,undefined){if(Drupal.ajax!==undefined)Drupal.ajax.prototype.commands.webinarAjaxFormSubmit=function(ajax,response,status){$(".dsc").css("display","none");if($(".webinar-video").html().length>0)$(".webinar-video").css("display","block");else $(".dsc").css("display","block");$("html, body").animate({scrollTop:$(".topic-intro").offset().top},1E3)};$(document).ready(function(){var alphanumeric_validation='.webform-client-form input[name="submitted[first_name]"]';alphanumeric_validation+=
', .webform-client-form input[name="submitted[middle_name]"]';alphanumeric_validation+=', .webform-client-form input[name="submitted[last_name]"]';alphanumeric_validation+=', .webform-client-form input[name="submitted[full_name]"]';alphanumeric_validation+=', .webform-client-form input[name="submitted[name]"]';alphanumeric_validation+=", .node-type-special-event-campaign-revamp .membership-card-number-form #coalition-membership-form input";if($(".webform-client-form-219225").length==0){$(alphanumeric_validation).focusout(function(event){parent_form=
$(this).parents("form");parent_item=$(this).parents(".form-item");str=$(this).val();regex=new RegExp("^[A-Za-z0-9 ]+$");if(str)if(!regex.test(str))if(parent_item.find("div.error").length>0){parent_item.find("div.error").addClass("show-phone-error");parent_item.find("div.error").text("Only alphanumeric allowed")}else parent_item.prepend('<div class="error" style="display: block;">Only alphanumeric allowed</div>');else parent_item.find("div.error").remove();else if(parent_item.find("div.error").length)parent_item.find("div.error").remove()});
$(alphanumeric_validation).keyup(function(event){parent_form=$(this).parents("form");parent_item=$(this).parents(".form-item");str=$(this).val();regex=new RegExp("^[A-Za-z0-9 ]+$");if(str)if(!regex.test(str))if(parent_item.find("div.error").length>0){parent_item.find("div.error").addClass("show-phone-error");parent_item.find("div.error").text("Only alphanumeric allowed")}else parent_item.prepend('<div class="error" style="display: block;">Only alphanumeric allowed</div>');else parent_item.find("div.error").remove();
else if(parent_item.find("div.error").length)parent_item.find("div.error").remove()})}if($(".webform-client-form-219225").length>0){$("#webform-client-form-219225--2 .required").each(function(){var labelText=$(this).siblings("label").text();labelText=labelText.substring(0,labelText.length-1);$(this).attr("data-parsley-required-message",labelText+" \u30d5\u30a3\u30fc\u30eb\u30c9\u306f\u5fc5\u9808\u3067\u3059\u3002")});$("#webform-client-form-219225--2 .required").attr("required","");$("#webform-client-form-219225--2 #edit-submitted-privacy-policy--2-1").attr("required",
"").attr("data-parsley-required-message","\u30d7\u30e9\u30a4\u30d0\u30b7\u30fc\u30dd\u30ea\u30b7\u30fc\u306e\u30d5\u30a3\u30fc\u30eb\u30c9\u306f\u5fc5\u9808\u3067\u3059\u3002");$("#webform-client-form-219225--2 #edit-submitted-email-id--2").attr("data-parsley-official-email","").attr("data-parsley-official-email-message","\u3042\u306a\u305f\u306e\u516c\u5f0f\u306e\u96fb\u5b50\u30e1\u30fc\u30ebID\u3092\u4f7f\u7528\u3057\u3066\u304f\u3060\u3055\u3044\u3002");$("#webform-client-form-219225--2").parsley();
window.Parsley.addValidator("officialEmail",{validateString:function(value){var public_emails=Drupal.settings.hcl_webform_submissions.public_emails;var current_email_domain=get_current_email_domain(value);return $.inArray(current_email_domain,public_emails)==-1}});Parsley.addMessages("ja",{defaultMessage:"\u3053\u306e\u5024\u306f\u7121\u52b9\u3067\u3059\u3002",type:{email:"\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u306e\u5f62\u5f0f\u304c\u7121\u52b9\u3067\u3059\u3002",url:"\u3053\u306e\u5024\u306f\u6709\u52b9\u306aURL\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002",
number:"\u3053\u306e\u5024\u306f\u6709\u52b9\u306a\u6570\u5024\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002",integer:"\u3053\u306e\u5024\u306f\u6709\u52b9\u306a\u6574\u6570\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002",digits:"\u3053\u306e\u5024\u306f\u6570\u5b57\u3067\u3042\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059\u3002",alphanum:"\u3053\u306e\u5024\u306f\u82f1\u6570\u5b57\u3067\u306a\u3051\u308c\u3070\u306a\u308a\u307e\u305b\u3093\u3002"},required:"\u3053\u306e\u5024\u306f\u5fc5\u9808\u3067\u3059\u3002"});
Parsley.setLocale("ja")}$("#admin-demandbase-test #edit-industry-ip").focusout(function(){overrideIP=$(this).attr("value");resource_send_industry(overrideIP)});function resource_send_industry(overrideIP){var myKey="72a12fc7396be0847b6287edc78566ce00a09b85";var db_client=new DemandbaseClient(myKey);db_client.ip(overrideIP,function(result){industry=result.sub_industry;email_type_validation(industry)})}function get_current_email_domain(email){if(email!=="undefined")if(email){email=email.toLowerCase();
var current_email_domain=email.split("@").slice(1);current_email_domain=current_email_domain.toString();return current_email_domain}}var myKey="72a12fc7396be0847b6287edc78566ce00a09b85";var db_client=new DemandbaseClient(myKey);var overrideIP="";db_client.ip(overrideIP,function(result){country=result.registry_country;country_id=result.registry_country_code;if($("input#edit-submitted-country").val()==""){$("input#edit-submitted-country").val(country);$("input#edit-submitted-country").parents(".form-item.webform-component").hide()}if($('input[name="submitted[country]"]').val()==
""){$('input[name="submitted[country]"]').val(country);$('input[name="submitted[country]"]').parents(".form-item.webform-component").hide()}company=result.company_name});if($(".public-email-val").length>0){var myKey="72a12fc7396be0847b6287edc78566ce00a09b85";var db_client=new DemandbaseClient(myKey);var overrideIP="";var industry=undefined;db_client.ip(overrideIP,function(result){industry=result.sub_industry});email_type_validation(industry)}function email_type_validation(industry){if(industry!==
undefined){if($('input[name="submitted[industry]"]').val()==""){$('input[name="submitted[industry]"]').val(industry);$('input[name="submitted[industry]"]').parents(".form-item.webform-component").hide()}}else{$(".public-email-val:not(.webform-client-form-219225) .email, .public-email-val.webform-client-form-3468 .form-item-submitted-email-address input").focusout(function(){if(industry==undefined){var email=$(this).val();current_email_domain=get_current_email_domain(email);if(typeof Drupal.settings.hcl_webform_submissions!==
"undefined"&&typeof Drupal.settings.hcl_webform_submissions.public_emails!=="undefined"){var public_emails=Drupal.settings.hcl_webform_submissions.public_emails;if($.inArray(current_email_domain,public_emails)!==-1){if($(".public-email-val .email-type-error").length==0)$(".public-email-val .webform-component-email, .public-email-val .form-type-webform-email").prepend('<div for="edit-submitted-email-id" generated="true" class="email-type-error" style="color: #EB0000;">Please use your official Email Id.</div>')}else if($(".public-email-val .email-type-error").length!=
0)$(".public-email-val .email-type-error").remove()}}}).focusin(function(){if(industry==undefined){var email=$(".public-email-val .email").val();current_email_domain=get_current_email_domain(email);if(typeof Drupal.settings.hcl_webform_submissions!=="undefined"&&typeof Drupal.settings.hcl_webform_submissions.public_emails!=="undefined"){var public_emails=Drupal.settings.hcl_webform_submissions.public_emails;if($.inArray(current_email_domain,public_emails)!==-1){if($(".public-email-val .email-type-error").length==
0)$(".public-email-val .webform-component-email, .public-email-val .form-type-webform-email").prepend('<div for="edit-submitted-email-id" generated="true" class="email-type-error" style="color: #EB0000;">Please use your official Email Id.</div>')}else if($(".public-email-val .email-type-error").length!=0)$(".public-email-val .email-type-error").remove()}}});$(".public-email-val:not(.webform-client-form-219225)").on("submit",function(){if(industry==undefined){var email=$(".public-email-val .email").val();
if(!email)var email=$(".public-email-val.webform-client-form-3468 .form-item-submitted-email-address input").val();current_email_domain=get_current_email_domain(email);if(typeof Drupal.settings.hcl_webform_submissions!=="undefined"&&typeof Drupal.settings.hcl_webform_submissions.public_emails!=="undefined"){var public_emails=Drupal.settings.hcl_webform_submissions.public_emails;if($.inArray(current_email_domain,public_emails)!==-1){if($(".public-email-val  .email-type-error").length==0)$(".public-email-val .webform-component-email, .public-email-val .form-type-webform-email").prepend('<div for="edit-submitted-email-id" generated="true" class="email-type-error" style="color: #EB0000;">Please use your official Email Id.</div>');
return false}}}})}}var form_id="#webform-client-form-3468";if($(form_id+'input[name="submitted[first_name]"]').length>0)setInterval(function(){if($(form_id+'input[name="submitted[first_name]"]').val()){var last_name=$(form_id+'input[name="submitted[last_name]"]').val();var first_name=$(form_id+'input[name="submitted[first_name]"]').val();$(form_id+'input[name="submitted[last_name]"]').val("");$(form_id+'input[name="submitted[first_name]"]').val("");var name=first_name+" "+last_name;$(form_id+'input[name="submitted[full_name]"]').val(name)}},
100);if($(form_id+'input[name="submitted[last_name]"]').length>0)setInterval(function(){if($(form_id+'input[name="submitted[last_name]"]').val()){var last_name=$(form_id+'input[name="submitted[last_name]"]').val();var first_name=$(form_id+'input[name="submitted[first_name]"]').val();$(form_id+'input[name="submitted[last_name]"]').val("");$(form_id+'input[name="submitted[first_name]"]').val("");var name=first_name+" "+last_name;$(form_id+'input[name="submitted[full_name]"]').val(name)}},100);$("#webform-client-form-3479").submit(function(){var organization=
$(this).find('[name="submitted[organization]"]').val();var email_id=$(this).find('[name="submitted[email_id]"]').val();var string_match="creditpointe";if(email_id.toLowerCase().indexOf(string_match)>=0){var error_message='<div for="edit-submitted-email-id" generated="true" class="error">The value in Business Email Id is not a valid email address.</div>';$(this).find("#webform-component-email-id").prepend(error_message);return false}if(organization.toLowerCase().indexOf(string_match)>=0){var error_message=
'<div for="edit-submitted-organization" generated="true" class="error">The value in organization is not a valid organization.</div>';$(this).find("#webform-component-organization").prepend(error_message);return false}});if($("body.node-type-jobs-campaign").length||$("body.node-type-job-posting").length||$("body.node-type-job-posting-revamp").length||$("body.node-type-geo-recruitment").length||$("#section-straighttalk-release-form").length||$("body.cybersecurity-become-a-knight").length||$(".page-node-224962").length||
$(".webform-client-form-243605").length||$(".usa-hiring-job-apply:not(.virtual-career-fair) .event-campaign-register-section .webform-client-form").length||$(".usa-job-training .event-campaign-register-section .webform-client-form").length);else if($("form.webform-client-form").length)if($("form.webform-client-form .form-actions .form-submit.ajax-processed").length==0)$("form.webform-client-form:not(.webform-client-form-210660)").on("submit",function(){if(!$(".form-item .error",this).is(":visible")&&
!$(".email-type-error",this).is(":visible"))$(".form-actions .form-submit",this).attr("disabled",true)});if($(".usa-hiring-job-apply:not(.virtual-career-fair) .event-campaign-register-section .webform-client-form").length||$(".usa-job-training .event-campaign-register-section .webform-client-form").length)if($("form.webform-client-form .form-actions .form-submit.ajax-processed").length==0)$("form.webform-client-form:not(.webform-client-form-210660)").on("submit",function(){if(!$(".form-item .error",
this).is(":visible")&&!$(".email-type-error",this).is(":visible"))$(".form-actions .form-submit",this).addClass("button-dis")});phone_validation=".webform-client-form .form-item-submitted-mobile-no input";phone_validation+=', .webform-client-form input[name="submitted[phone]"]';phone_validation+=', .webform-client-form input[name="submitted[mobile-number]"]';phone_validation+=', .webform-client-form input[name="submitted[phone-no]"]';if($(".webform-client-form-219225").length==0){$(phone_validation).focusout(function(event){parent_form=
$(this).parents("form");parent_item=$(this).parents(".form-item");str=$(this).val();regex=new RegExp("^[0-9-()+ ]+$");if(str)if(!regex.test(str))if(parent_item.find("div.error").length>0){parent_item.find("div.error").addClass("show-phone-error");parent_item.find("div.error").text("Please enter a valid phone number")}else parent_item.prepend('<div class="error" style="display: block;">Please enter a valid phone number</div>');else{parent_form.find(".form-submit").prop("disabled",false);parent_item.find("div.error").remove()}else if(parent_item.find("div.error").length)parent_item.find("div.error").remove()});
$(phone_validation).keyup(function(event){parent_form=$(this).parents("form");parent_item=$(this).parents(".form-item");str=$(this).val();regex=new RegExp("^[0-9-()+ ]+$");if(str)if(!regex.test(str))if(parent_item.find("div.error").length>0){parent_item.find("div.error").addClass("show-phone-error");parent_item.find("div.error").text("Please enter a valid phone number")}else parent_item.prepend('<div class="error" style="display: block;">Please enter a valid phone number</div>');else parent_item.find("div.error").remove();
else if(parent_item.find("div.error").length)parent_item.find("div.error").remove()});$(".webform-client-form .form-actions .form-submit").on("click",function(event){parent_form=$(this).parents("form");var alphanumeric=['input[name="submitted[first_name]"]','input[name="submitted[last_name]"]','input[name="submitted[full_name]"]','input[name="submitted[name]"]'];var phone=['input[name="submitted[mobile-no]"]','input[name="submitted[phone]"]','input[name="submitted[mobile-number]"]','input[name="submitted[phone-no]"]'];
$.each(alphanumeric,function(index,value){regex=new RegExp("^[A-Za-z0-9 ]+$");if($(value,parent_form).length){str=$(value,parent_form).val();if(str)if(!regex.test(str))event.preventDefault()}});$.each(phone,function(p_index,p_value){phone_regex=new RegExp("^[0-9-()+ ]+$");if($(p_value,parent_form).length){phone_str=$(p_value,parent_form).val();if(phone_str)if(!phone_regex.test(phone_str))event.preventDefault()}})})}})})(jQuery,Drupal,this,this.document);;/**/
(function($,Drupal,window,document,undefined){$(document).ready(function(){overrideIP="";demandbase_populate(overrideIP);function demandbase_populate(overrideIP){var form_key=["industry","revenue_range","isp","company_name","web_site","sub_industry","fortune_1000","forbes_2000","audience","marketing_alias","employee_count","annual_sales","primary_sic","demandbase_sid","city","state","country","zip","audience_segment","b2b","b2c","primary_naics","stock_ticker","traffic","latitude","longitude","street_address",
"information_level"];var myKey="72a12fc7396be0847b6287edc78566ce00a09b85";var db_client=new DemandbaseClient(myKey);db_client.ip(overrideIP,function(result){var geography=result.registry_country||"";$.each(form_key,function(index,value){var demandbase_value=result[value];set_demandbase_fields_value(value,demandbase_value)})})}function set_demandbase_fields_value(form_key,data){if(data)if($('input[name="submitted['+form_key+']"]').val()=="NONE"||$('input[name="submitted['+form_key+']"]').val()==""){$('input[name="submitted['+
form_key+']"]').val(data);$('input[name="submitted['+form_key+']"]').parents(".form-item.webform-component").hide()}}$("#admin-demandbase-test #edit-industry-ip").focusout(function(){overrideIP=$(this).attr("value");demandbase_populate(overrideIP)})})})(jQuery,Drupal,this,this.document);;/**/
(function($){Drupal.behaviors.webform_conditional=Drupal.behaviors.webform_conditional||{};Drupal.behaviors.webform_conditional.attach=function(){Drupal.webform_conditional.wrappers=new Object;Drupal.webform_conditional.components=new Object;$.each(Drupal.settings,function(key,info){if(key.substring(0,20)=="webform_conditional_"){$.each(info.fields,function(triggerField_key,triggerField_info){var formItemWrapper=Drupal.webform_conditional.getWrapper(triggerField_info);if(formItemWrapper.length>0)Drupal.webform_conditional.addOnChange(triggerField_key,
triggerField_info,key)});$.each(info.fields,function(triggerField_key,triggerField_info){var formItemWrapper=Drupal.webform_conditional.getWrapper(triggerField_info);if(formItemWrapper.length>0){var field_name=Drupal.webform_conditional.escapeId(triggerField_key);var components=Drupal.webform_conditional.getComponentsByName(field_name,key);if(components.attr("type")=="radio"||components.attr("type")=="checkbox")$(components[0]).triggerHandler("click");else components.triggerHandler("change")}})}});
return};Drupal.webform_conditional=Drupal.webform_conditional||{};Drupal.webform_conditional.getWrapper=function(fieldInfo){if(Drupal.webform_conditional.wrappers[fieldInfo["css_id"]])return Drupal.webform_conditional.wrappers[fieldInfo["css_id"]];return Drupal.webform_conditional.wrappers[fieldInfo["css_id"]]=$("#"+fieldInfo["css_id"])};Drupal.webform_conditional.addOnChange=function(triggerField_key,triggerField_info,key){var monitor_field_name=Drupal.webform_conditional.escapeId(triggerField_key);
var changeFunction=function(){Drupal.webform_conditional.setVisibility(triggerField_key,triggerField_info,key)};$.each(triggerField_info["dependent_fields"],function(dependent_field_key,dependent_field_info){var formItemWrapper=Drupal.webform_conditional.getWrapper(dependent_field_info);if(formItemWrapper.length>0)formItemWrapper.css("display","none")});var components=Drupal.webform_conditional.getComponentsByName(monitor_field_name,key);if(components.attr("type")=="radio"||components.attr("type")==
"checkbox")components.click(changeFunction);else components.change(changeFunction)};Drupal.webform_conditional.setVisibility=function(triggerField_key,triggerField_info,key,monitorField,monitorInfo){var monitor_field_name=Drupal.webform_conditional.escapeId(triggerField_key);var currentValues=Drupal.webform_conditional.getFieldValue(monitor_field_name);var monitor_visible=true;if(monitorField!==undefined)monitor_visible=Drupal.webform_conditional.getWrapper(monitorInfo).data("wfc_visible");$.each(triggerField_info["dependent_fields"],
function(dependentField,dependentInfo){if(dependentInfo["operator"]=="="&&!Drupal.webform_conditional.Matches(currentValues,dependentInfo["monitor_field_value"])||dependentInfo["operator"]=="!="&&Drupal.webform_conditional.Matches(currentValues,dependentInfo["monitor_field_value"])||!monitor_visible)Drupal.webform_conditional.getWrapper(dependentInfo).hide().data("wfc_visible",false);else Drupal.webform_conditional.getWrapper(dependentInfo).show().data("wfc_visible",true);Drupal.webform_conditional.TriggerDependents(dependentField,
dependentInfo,key)})};Drupal.webform_conditional.getComponentsByName=function(field_name,key){if(Drupal.webform_conditional.components[field_name])return Drupal.webform_conditional.components[field_name];var css_field_name="["+field_name+"]";settings=Drupal.settings[key];var nid=settings.nid;if(nid instanceof Array)nid=settings.nid[0];return Drupal.webform_conditional.components[field_name]=$("#webform-client-form-"+nid+" *[name*='"+css_field_name+"']")};Drupal.webform_conditional.TriggerDependents=
function(monitorField,monitorInfo,key){settings=Drupal.settings[key];$.each(settings.fields,function(triggerField_key,triggerField_info){if(triggerField_key==monitorField)Drupal.webform_conditional.setVisibility(triggerField_key,triggerField_info,key,monitorField,monitorInfo)})};Drupal.webform_conditional.getFieldValue=function(field_name){field_name="["+field_name+"]";var selected=[];var vals=[];if($('form input[name*="'+field_name+'"]:checked').length>=1)selected=$('form input[name*="'+field_name+
'"]:checked');else if($('form select[name*="'+field_name+'"] option:selected').length>=1)selected=$('form select[name*="'+field_name+'"] option:selected');if(selected.length==0)return vals;selected.each(function(i){vals[i]=$(this).val()});return vals};Drupal.webform_conditional.Matches=function(currentValues,triggerValues){var found=false;$.each(triggerValues,function(index,value){if(jQuery.inArray(value,currentValues)>-1){found=true;return false}});return found};Drupal.webform_conditional.escapeId=
function(myid){if(typeof myid=="undefined")return;return myid.replace(/(:|\.)/g,"\\$1")}})(jQuery);;/**/
/**
 * jQuery Validation Plugin 1.11.0pre
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright (c) 2012 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */

(function($) {

$.extend($.fn, {
	// http://docs.jquery.com/Plugins/Validation/validate
	validate: function( options ) {

		// if nothing is selected, return nothing; can't chain anyway
		if (!this.length) {
			if (options && options.debug && window.console) {
				console.warn( "nothing selected, can't validate, returning nothing" );
			}
			return;
		}

		// check if a validator for this form was already created
		var validator = $.data(this[0], 'validator');
		if ( validator ) {
			return validator;
		}

		// Add novalidate tag if HTML5.
		this.attr('novalidate', 'novalidate');

		validator = new $.validator( options, this[0] );
		$.data(this[0], 'validator', validator);

		if ( validator.settings.onsubmit ) {

			this.validateDelegate( ":submit", "click", function(ev) {
				if ( validator.settings.submitHandler ) {
					validator.submitButton = ev.target;
				}
				// allow suppressing validation by adding a cancel class to the submit button
				if ( $(ev.target).hasClass('cancel') ) {
					validator.cancelSubmit = true;
				}
			});

			// validate the form on submit
			this.submit( function( event ) {
				if ( validator.settings.debug ) {
					// prevent form submit to be able to see console output
					event.preventDefault();
				}
				function handle() {
					var hidden;
					if ( validator.settings.submitHandler ) {
						if (validator.submitButton) {
							// insert a hidden input as a replacement for the missing submit button
							hidden = $("<input type='hidden'/>").attr("name", validator.submitButton.name).val(validator.submitButton.value).appendTo(validator.currentForm);
						}
						validator.settings.submitHandler.call( validator, validator.currentForm, event );
						if (validator.submitButton) {
							// and clean up afterwards; thanks to no-block-scope, hidden can be referenced
							hidden.remove();
						}
						return false;
					}
					return true;
				}

				// prevent submit for invalid forms or custom submit handlers
				if ( validator.cancelSubmit ) {
					validator.cancelSubmit = false;
					return handle();
				}
				if ( validator.form() ) {
					if ( validator.pendingRequest ) {
						validator.formSubmitted = true;
						return false;
					}
					return handle();
				} else {
					validator.focusInvalid();
					return false;
				}
			});
		}

		return validator;
	},
	// http://docs.jquery.com/Plugins/Validation/valid
	valid: function() {
		if ( $(this[0]).is('form')) {
			return this.validate().form();
		} else {
			var valid = true;
			var validator = $(this[0].form).validate();
			this.each(function() {
				valid &= validator.element(this);
			});
			return valid;
		}
	},
	// attributes: space seperated list of attributes to retrieve and remove
	removeAttrs: function(attributes) {
		var result = {},
			$element = this;
		$.each(attributes.split(/\s/), function(index, value) {
			result[value] = $element.attr(value);
			$element.removeAttr(value);
		});
		return result;
	},
	// http://docs.jquery.com/Plugins/Validation/rules
	rules: function(command, argument) {
		var element = this[0];

		if (command) {
			var settings = $.data(element.form, 'validator').settings;
			var staticRules = settings.rules;
			var existingRules = $.validator.staticRules(element);
			switch(command) {
			case "add":
				$.extend(existingRules, $.validator.normalizeRule(argument));
				staticRules[element.name] = existingRules;
				if (argument.messages) {
					settings.messages[element.name] = $.extend( settings.messages[element.name], argument.messages );
				}
				break;
			case "remove":
				if (!argument) {
					delete staticRules[element.name];
					return existingRules;
				}
				var filtered = {};
				$.each(argument.split(/\s/), function(index, method) {
					filtered[method] = existingRules[method];
					delete existingRules[method];
				});
				return filtered;
			}
		}

		var data = $.validator.normalizeRules(
		$.extend(
			{},
			$.validator.classRules(element),
			$.validator.attributeRules(element),
			$.validator.dataRules(element),
			$.validator.staticRules(element)
		), element);

		// make sure required is at front
		if (data.required) {
			var param = data.required;
			delete data.required;
			data = $.extend({required: param}, data);
		}

		return data;
	}
});

// Custom selectors
$.extend($.expr[":"], {
	// http://docs.jquery.com/Plugins/Validation/blank
	blank: function(a) {return !$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/filled
	filled: function(a) {return !!$.trim("" + a.value);},
	// http://docs.jquery.com/Plugins/Validation/unchecked
	unchecked: function(a) {return !a.checked;}
});

// constructor for validator
$.validator = function( options, form ) {
	this.settings = $.extend( true, {}, $.validator.defaults, options );
	this.currentForm = form;
	this.init();
};

$.validator.format = function(source, params) {
	if ( arguments.length === 1 ) {
		return function() {
			var args = $.makeArray(arguments);
			args.unshift(source);
			return $.validator.format.apply( this, args );
		};
	}
	if ( arguments.length > 2 && params.constructor !== Array  ) {
		params = $.makeArray(arguments).slice(1);
	}
	if ( params.constructor !== Array ) {
		params = [ params ];
	}
	$.each(params, function(i, n) {
		source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
	});
	return source;
};

$.extend($.validator, {

	defaults: {
		messages: {},
		groups: {},
		rules: {},
		errorClass: "error",
		validClass: "valid",
		errorElement: "label",
		focusInvalid: true,
		errorContainer: $( [] ),
		errorLabelContainer: $( [] ),
		onsubmit: true,
		ignore: ":hidden",
		ignoreTitle: false,
		onfocusin: function(element, event) {
			this.lastActive = element;

			// hide error label and remove error class on focus if enabled
			if ( this.settings.focusCleanup && !this.blockFocusCleanup ) {
				if ( this.settings.unhighlight ) {
					this.settings.unhighlight.call( this, element, this.settings.errorClass, this.settings.validClass );
				}
				this.addWrapper(this.errorsFor(element)).hide();
			}
		},
		onfocusout: function(element, event) {
			if ( !this.checkable(element) && (element.name in this.submitted || !this.optional(element)) ) {
				this.element(element);
			}
		},
		onkeyup: function(element, event) {
			if ( event.which === 9 && this.elementValue(element) === '' ) {
				return;
			} else if ( element.name in this.submitted || element === this.lastElement ) {
				this.element(element);
			}
		},
		onclick: function(element, event) {
			// click on selects, radiobuttons and checkboxes
			if ( element.name in this.submitted ) {
				this.element(element);
			}
			// or option elements, check parent select in that case
			else if (element.parentNode.name in this.submitted) {
				this.element(element.parentNode);
			}
		},
		highlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).addClass(errorClass).removeClass(validClass);
			} else {
				$(element).addClass(errorClass).removeClass(validClass);
			}
		},
		unhighlight: function(element, errorClass, validClass) {
			if (element.type === 'radio') {
				this.findByName(element.name).removeClass(errorClass).addClass(validClass);
			} else {
				$(element).removeClass(errorClass).addClass(validClass);
			}
		}
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/setDefaults
	setDefaults: function(settings) {
		$.extend( $.validator.defaults, settings );
	},

	messages: {
		required: "This field is required.",
		remote: "Please fix this field.",
		email: "Please enter a valid email address.",
		url: "Please enter a valid URL.",
		date: "Please enter a valid date.",
		dateISO: "Please enter a valid date (ISO).",
		number: "Please enter a valid number.",
		digits: "Please enter only digits.",
		creditcard: "Please enter a valid credit card number.",
		equalTo: "Please enter the same value again.",
		maxlength: $.validator.format("Please enter no more than {0} characters."),
		minlength: $.validator.format("Please enter at least {0} characters."),
		rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
		range: $.validator.format("Please enter a value between {0} and {1}."),
		max: $.validator.format("Please enter a value less than or equal to {0}."),
		min: $.validator.format("Please enter a value greater than or equal to {0}.")
	},

	autoCreateRanges: false,

	prototype: {

		init: function() {
			this.labelContainer = $(this.settings.errorLabelContainer);
			this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
			this.containers = $(this.settings.errorContainer).add( this.settings.errorLabelContainer );
			this.submitted = {};
			this.valueCache = {};
			this.pendingRequest = 0;
			this.pending = {};
			this.invalid = {};
			this.reset();

			var groups = (this.groups = {});
			$.each(this.settings.groups, function(key, value) {
				if (typeof value === "string") {
					value = value.split(/\s/);
				}
				$.each(value, function(index, name) {
					groups[name] = key;
				});
			});
			var rules = this.settings.rules;
			$.each(rules, function(key, value) {
				rules[key] = $.validator.normalizeRule(value);
			});

			function delegate(event) {
				var validator = $.data(this[0].form, "validator"),
					eventType = "on" + event.type.replace(/^validate/, "");
				if (validator.settings[eventType]) {
          validator.settings['name_event'] = eventType;
					validator.settings[eventType].call(validator, this[0], event);
				}
			}
			$(this.currentForm)
				.validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
					"[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
					"[type='email'], [type='datetime'], [type='date'], [type='month'], " +
					"[type='week'], [type='time'], [type='datetime-local'], " +
					"[type='range'], [type='color'] ",
					"focusin focusout keyup", delegate)
				.validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", delegate);

			if (this.settings.invalidHandler) {
				$(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/form
		form: function() {
			this.checkForm();
			$.extend(this.submitted, this.errorMap);
			this.invalid = $.extend({}, this.errorMap);
			if (!this.valid()) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
			}
			this.showErrors();
			return this.valid();
		},

		checkForm: function() {
			this.prepareForm();
			for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
				this.check( elements[i] );
			}
			return this.valid();
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/element
		element: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );
			this.lastElement = element;
			this.prepareElement( element );
			this.currentElements = $(element);
			var result = this.check( element ) !== false;
			if (result) {
				delete this.invalid[element.name];
			} else {
				this.invalid[element.name] = true;
			}
			if ( !this.numberOfInvalids() ) {
				// Hide error containers on last error
				this.toHide = this.toHide.add( this.containers );
			}
			this.showErrors();
			return result;
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/showErrors
		showErrors: function(errors) {
			if(errors) {
				// add items to error list and map
				$.extend( this.errorMap, errors );
				this.errorList = [];
				for ( var name in errors ) {
					this.errorList.push({
						message: errors[name],
						element: this.findByName(name)[0]
					});
				}
				// remove items from success list
				this.successList = $.grep( this.successList, function(element) {
					return !(element.name in errors);
				});
			}
			if (this.settings.showErrors) {
				this.settings.showErrors.call( this, this.errorMap, this.errorList );
			} else {
				this.defaultShowErrors();
			}
		},

		// http://docs.jquery.com/Plugins/Validation/Validator/resetForm
		resetForm: function() {
			if ( $.fn.resetForm ) {
				$( this.currentForm ).resetForm();
			}
			this.submitted = {};
			this.lastElement = null;
			this.prepareForm();
			this.hideErrors();
			this.elements().removeClass( this.settings.errorClass ).removeData( "previousValue" );
		},

		numberOfInvalids: function() {
			return this.objectLength(this.invalid);
		},

		objectLength: function( obj ) {
			var count = 0;
			for ( var i in obj ) {
				count++;
			}
			return count;
		},

		hideErrors: function() {
			this.addWrapper( this.toHide ).hide();
		},

		valid: function() {
			return this.size() === 0;
		},

		size: function() {
			return this.errorList.length;
		},

		focusInvalid: function() {
			if( this.settings.focusInvalid ) {
				try {
					$(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
					.filter(":visible")
					.focus()
					// manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
					.trigger("focusin");
				} catch(e) {
					// ignore IE throwing errors when focusing hidden elements
				}
			}
		},

		findLastActive: function() {
			var lastActive = this.lastActive;
			return lastActive && $.grep(this.errorList, function(n) {
				return n.element.name === lastActive.name;
			}).length === 1 && lastActive;
		},

		elements: function() {
			var validator = this,
				rulesCache = {};

			// select all valid inputs inside the form (no submit or reset buttons)
			return $(this.currentForm)
			.find("input, select, textarea")
			.not(":submit, :reset, :image, [disabled]")
			.not( this.settings.ignore )
			.filter(function() {
				if ( !this.name && validator.settings.debug && window.console ) {
					console.error( "%o has no name assigned", this);
				}

				// select only the first element for each name, and only those with rules specified
				if ( this.name in rulesCache || !validator.objectLength($(this).rules()) ) {
					return false;
				}

				rulesCache[this.name] = true;
				return true;
			});
		},

		clean: function( selector ) {
			return $( selector )[0];
		},

		errors: function() {
			var errorClass = this.settings.errorClass.replace(' ', '.');
			return $( this.settings.errorElement + "." + errorClass, this.errorContext );
		},

		reset: function() {
			this.successList = [];
			this.errorList = [];
			this.errorMap = {};
			this.toShow = $([]);
			this.toHide = $([]);
			this.currentElements = $([]);
		},

		prepareForm: function() {
			this.reset();
			this.toHide = this.errors().add( this.containers );
		},

		prepareElement: function( element ) {
			this.reset();
			this.toHide = this.errorsFor(element);
		},

		elementValue: function( element ) {
			var type = $(element).attr('type'),
				val = $(element).val();

			if ( type === 'radio' || type === 'checkbox' ) {
				return $('input[name="' + $(element).attr('name') + '"]:checked').val();
			}

			if ( typeof val === 'string' ) {
				return val.replace(/\r/g, "");
			}
			return val;
		},

		check: function( element ) {
			element = this.validationTargetFor( this.clean( element ) );

			var rules = $(element).rules();
			var dependencyMismatch = false;
			var val = this.elementValue(element);
			var result;

			for (var method in rules ) {
				var rule = { method: method, parameters: rules[method] };
				try {

					result = $.validator.methods[method].call( this, val, element, rule.parameters );

					// if a method indicates that the field is optional and therefore valid,
					// don't mark it as valid when there are no other rules
					if ( result === "dependency-mismatch" ) {
						dependencyMismatch = true;
						continue;
					}
					dependencyMismatch = false;

					if ( result === "pending" ) {
						this.toHide = this.toHide.not( this.errorsFor(element) );
						return;
					}

					if( !result ) {
						this.formatAndAdd( element, rule );
						return false;
					}
				} catch(e) {
					if ( this.settings.debug && window.console ) {
						console.log("exception occured when checking element " + element.id + ", check the '" + rule.method + "' method", e);
					}
					throw e;
				}
			}
			if (dependencyMismatch) {
				return;
			}
			if ( this.objectLength(rules) ) {
				this.successList.push(element);
			}
			return true;
		},

		// return the custom message for the given element and validation method
		// specified in the element's HTML5 data attribute
		customDataMessage: function(element, method) {
			return $(element).data('msg-' + method.toLowerCase()) || (element.attributes && $(element).attr('data-msg-' + method.toLowerCase()));
		},

		// return the custom message for the given element name and validation method
		customMessage: function( name, method ) {
			var m = this.settings.messages[name];
			return m && (m.constructor === String ? m : m[method]);
		},

		// return the first defined argument, allowing empty strings
		findDefined: function() {
			for(var i = 0; i < arguments.length; i++) {
				if (arguments[i] !== undefined) {
					return arguments[i];
				}
			}
			return undefined;
		},

		defaultMessage: function( element, method) {
			return this.findDefined(
				this.customMessage( element.name, method ),
				this.customDataMessage( element, method ),
				// title is never undefined, so handle empty string as undefined
				!this.settings.ignoreTitle && element.title || undefined,
				$.validator.messages[method],
				"<strong>Warning: No message defined for " + element.name + "</strong>"
			);
		},

		formatAndAdd: function( element, rule ) {
			var message = this.defaultMessage( element, rule.method ),
				theregex = /\$?\{(\d+)\}/g;
			if ( typeof message === "function" ) {
				message = message.call(this, rule.parameters, element);
			} else if (theregex.test(message)) {
				message = $.validator.format(message.replace(theregex, '{$1}'), rule.parameters);
			}
			this.errorList.push({
				message: message,
				element: element
			});

			this.errorMap[element.name] = message;
			this.submitted[element.name] = message;
		},

		addWrapper: function(toToggle) {
			if ( this.settings.wrapper ) {
				toToggle = toToggle.add( toToggle.parent( this.settings.wrapper ) );
			}
			return toToggle;
		},

		defaultShowErrors: function() {
			var i, elements;
			for ( i = 0; this.errorList[i]; i++ ) {
				var error = this.errorList[i];
				if ( this.settings.highlight ) {
					this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
				}
				this.showLabel( error.element, error.message );
			}
			if( this.errorList.length ) {
				this.toShow = this.toShow.add( this.containers );
			}
			if (this.settings.success) {
				for ( i = 0; this.successList[i]; i++ ) {
					this.showLabel( this.successList[i] );
				}
			}
			if (this.settings.unhighlight) {
				for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
					this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
				}
			}
			this.toHide = this.toHide.not( this.toShow );
			this.hideErrors();
			this.addWrapper( this.toShow ).show();
		},

		validElements: function() {
			return this.currentElements.not(this.invalidElements());
		},

		invalidElements: function() {
			return $(this.errorList).map(function() {
				return this.element;
			});
		},

		showLabel: function(element, message) {
			var label = this.errorsFor( element );
			if ( label.length ) {
				// refresh error/success class
				label.removeClass( this.settings.validClass ).addClass( this.settings.errorClass );

				// check if we have a generated label, replace the message then
				if ( label.attr("generated") ) {
					label.html(message);
				}
			} else {
				// create label
				label = $("<" + this.settings.errorElement + "/>")
					.attr({"for":  this.idOrName(element), generated: true})
					.addClass(this.settings.errorClass)
					.html(message || "");
				if ( this.settings.wrapper ) {
					// make sure the element is visible, even in IE
					// actually showing the wrapped element is handled elsewhere
					label = label.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
				}
				if ( !this.labelContainer.append(label).length ) {
					if ( this.settings.errorPlacement ) {
						this.settings.errorPlacement(label, $(element) );
					} else {
						label.insertAfter(element);
					}
				}
			}
			if ( !message && this.settings.success ) {
				label.text("");
				if ( typeof this.settings.success === "string" ) {
					label.addClass( this.settings.success );
				} else {
					this.settings.success( label, element );
				}
			}
			this.toShow = this.toShow.add(label);
		},

		errorsFor: function(element) {
			var name = this.idOrName(element);
			return this.errors().filter(function() {
				return $(this).attr('for') === name;
			});
		},

		idOrName: function(element) {
			return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
		},

		validationTargetFor: function(element) {
			// if radio/checkbox, validate first element in group instead
			if (this.checkable(element)) {
				element = this.findByName( element.name ).not(this.settings.ignore)[0];
			}
			return element;
		},

		checkable: function( element ) {
			return (/radio|checkbox/i).test(element.type);
		},

		findByName: function( name ) {
			return $(this.currentForm).find('[name="' + name + '"]');
		},

		getLength: function(value, element) {
			switch( element.nodeName.toLowerCase() ) {
			case 'select':
				return $("option:selected", element).length;
			case 'input':
				if( this.checkable( element) ) {
					return this.findByName(element.name).filter(':checked').length;
				}
			}
			return value.length;
		},

		depend: function(param, element) {
			return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
		},

		dependTypes: {
			"boolean": function(param, element) {
				return param;
			},
			"string": function(param, element) {
				return !!$(param, element.form).length;
			},
			"function": function(param, element) {
				return param(element);
			}
		},

		optional: function(element) {
			var val = this.elementValue(element);
			return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
		},

		startRequest: function(element) {
			if (!this.pending[element.name]) {
				this.pendingRequest++;
				this.pending[element.name] = true;
			}
		},

		stopRequest: function(element, valid) {
			this.pendingRequest--;
			// sometimes synchronization fails, make sure pendingRequest is never < 0
			if (this.pendingRequest < 0) {
				this.pendingRequest = 0;
			}
			delete this.pending[element.name];
			if ( valid && this.pendingRequest === 0 && this.formSubmitted && this.form() ) {
				$(this.currentForm).submit();
				this.formSubmitted = false;
			} else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
				$(this.currentForm).triggerHandler("invalid-form", [this]);
				this.formSubmitted = false;
			}
		},

		previousValue: function(element) {
			return $.data(element, "previousValue") || $.data(element, "previousValue", {
				old: null,
				valid: true,
				message: this.defaultMessage( element, "remote" )
			});
		}

	},

	classRuleSettings: {
		required: {required: true},
		email: {email: true},
		url: {url: true},
		date: {date: true},
		dateISO: {dateISO: true},
		number: {number: true},
		digits: {digits: true},
		creditcard: {creditcard: true}
	},

	addClassRules: function(className, rules) {
		if ( className.constructor === String ) {
			this.classRuleSettings[className] = rules;
		} else {
			$.extend(this.classRuleSettings, className);
		}
	},

	classRules: function(element) {
		var rules = {};
		var classes = $(element).attr('class');
		if ( classes ) {
			$.each(classes.split(' '), function() {
				if (this in $.validator.classRuleSettings) {
					$.extend(rules, $.validator.classRuleSettings[this]);
				}
			});
		}
		return rules;
	},

	attributeRules: function(element) {
		var rules = {};
		var $element = $(element);

		for (var method in $.validator.methods) {
			var value;

			// support for <input required> in both html5 and older browsers
			if (method === 'required') {
				value = $element.get(0).getAttribute(method);
				// Some browsers return an empty string for the required attribute
				// and non-HTML5 browsers might have required="" markup
				if (value === "") {
					value = true;
				}
				// force non-HTML5 browsers to return bool
				value = !!value;
			} else {
				value = $element.attr(method);
			}

			if (value) {
				rules[method] = value;
			} else if ($element[0].getAttribute("type") === method) {
				rules[method] = true;
			}
		}

		// maxlength may be returned as -1, 2147483647 (IE) and 524288 (safari) for text inputs
		if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
			delete rules.maxlength;
		}

		return rules;
	},

	dataRules: function(element) {
		var method, value,
			rules = {}, $element = $(element);
		for (method in $.validator.methods) {
			value = $element.data('rule-' + method.toLowerCase());
			if (value !== undefined) {
				rules[method] = value;
			}
		}
		return rules;
	},

	staticRules: function(element) {
		var rules = {};
		var validator = $.data(element.form, 'validator');
		if (validator.settings.rules) {
			rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
		}
		return rules;
	},

	normalizeRules: function(rules, element) {
		// handle dependency check
		$.each(rules, function(prop, val) {
			// ignore rule when param is explicitly false, eg. required:false
			if (val === false) {
				delete rules[prop];
				return;
			}
			if (val.param || val.depends) {
				var keepRule = true;
				switch (typeof val.depends) {
				case "string":
					keepRule = !!$(val.depends, element.form).length;
					break;
				case "function":
					keepRule = val.depends.call(element, element);
					break;
				}
				if (keepRule) {
					rules[prop] = val.param !== undefined ? val.param : true;
				} else {
					delete rules[prop];
				}
			}
		});

		// evaluate parameters
		$.each(rules, function(rule, parameter) {
			rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
		});

		// clean number parameters
		$.each(['minlength', 'maxlength', 'min', 'max'], function() {
			if (rules[this]) {
				rules[this] = Number(rules[this]);
			}
		});
		$.each(['rangelength', 'range'], function() {
			var parts;
			if (rules[this]) {
				if ($.isArray(rules[this])) {
					rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
				} else if (typeof rules[this] === 'string') {
					parts = rules[this].split(/[\s,]+/);
					rules[this] = [Number(parts[0]), Number(parts[1])];
				}
			}
		});

		if ($.validator.autoCreateRanges) {
			// auto-create ranges
			if (rules.min && rules.max) {
				rules.range = [rules.min, rules.max];
				delete rules.min;
				delete rules.max;
			}
			if (rules.minlength && rules.maxlength) {
				rules.rangelength = [rules.minlength, rules.maxlength];
				delete rules.minlength;
				delete rules.maxlength;
			}
		}

		return rules;
	},

	// Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
	normalizeRule: function(data) {
		if( typeof data === "string" ) {
			var transformed = {};
			$.each(data.split(/\s/), function() {
				transformed[this] = true;
			});
			data = transformed;
		}
		return data;
	},

	// http://docs.jquery.com/Plugins/Validation/Validator/addMethod
	addMethod: function(name, method, message) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
	},

	methods: {

		// http://docs.jquery.com/Plugins/Validation/Methods/required
		required: function(value, element, param) {
			// check if dependency is met
			if ( !this.depend(param, element) ) {
				return "dependency-mismatch";
			}
			if ( element.nodeName.toLowerCase() === "select" ) {
				// could be an array for select-multiple or a string, both are fine this way
				var val = $(element).val();
				return val && val.length > 0;
			}
			if ( this.checkable(element) ) {
				return this.getLength(value, element) > 0;
			}
			return $.trim(value).length > 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/remote
		remote: function(value, element, param) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}

			var previous = this.previousValue(element);
			if (!this.settings.messages[element.name] ) {
				this.settings.messages[element.name] = {};
			}
			previous.originalMessage = this.settings.messages[element.name].remote;
			this.settings.messages[element.name].remote = previous.message;

			param = typeof param === "string" && {url:param} || param;

			if ( previous.old === value ) {
				return previous.valid;
			}

			previous.old = value;
			var validator = this;
			this.startRequest(element);
			var data = {};
			data[element.name] = value;
			$.ajax($.extend(true, {
				url: param,
				mode: "abort",
				port: "validate" + element.name,
				dataType: "json",
				data: data,
				success: function(response) {
					validator.settings.messages[element.name].remote = previous.originalMessage;
					var valid = response === true || response === "true";
					if ( valid ) {
						var submitted = validator.formSubmitted;
						validator.prepareElement(element);
						validator.formSubmitted = submitted;
						validator.successList.push(element);
						delete validator.invalid[element.name];
						validator.showErrors();
					} else {
						var errors = {};
						var message = response || validator.defaultMessage( element, "remote" );
						errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
						validator.invalid[element.name] = true;
						validator.showErrors(errors);
					}
					previous.valid = valid;
					validator.stopRequest(element, valid);
				}
			}, param));
			return "pending";
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/minlength
		minlength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/maxlength
		maxlength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || length <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/rangelength
		rangelength: function(value, element, param) {
			var length = $.isArray( value ) ? value.length : this.getLength($.trim(value), element);
			return this.optional(element) || ( length >= param[0] && length <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/min
		min: function( value, element, param ) {
			return this.optional(element) || value >= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/max
		max: function( value, element, param ) {
			return this.optional(element) || value <= param;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/range
		range: function( value, element, param ) {
			return this.optional(element) || ( value >= param[0] && value <= param[1] );
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/email
		email: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
			return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/url
		url: function(value, element) {
			// contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
			return this.optional(element) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/date
		date: function(value, element) {
			return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/dateISO
		dateISO: function(value, element) {
			return this.optional(element) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/number
		number: function(value, element) {
			return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/digits
		digits: function(value, element) {
			return this.optional(element) || /^\d+$/.test(value);
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/creditcard
		// based on http://en.wikipedia.org/wiki/Luhn
		creditcard: function(value, element) {
			if ( this.optional(element) ) {
				return "dependency-mismatch";
			}
			// accept only spaces, digits and dashes
			if (/[^0-9 \-]+/.test(value)) {
				return false;
			}
			var nCheck = 0,
				nDigit = 0,
				bEven = false;

			value = value.replace(/\D/g, "");

			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n);
				nDigit = parseInt(cDigit, 10);
				if (bEven) {
					if ((nDigit *= 2) > 9) {
						nDigit -= 9;
					}
				}
				nCheck += nDigit;
				bEven = !bEven;
			}

			return (nCheck % 10) === 0;
		},

		// http://docs.jquery.com/Plugins/Validation/Methods/equalTo
		equalTo: function(value, element, param) {
			// bind to the blur event of the target in order to revalidate whenever the target field is updated
			// TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
			var target = $(param);
			if (this.settings.onfocusout) {
				target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
					$(element).valid();
				});
			}
			return value === target.val();
		}

	}

});

// deprecated, use $.validator.format instead
$.format = $.validator.format;

}(jQuery));

// ajax mode: abort
// usage: $.ajax({ mode: "abort"[, port: "uniqueport"]});
// if mode:"abort" is used, the previous request on that port (port can be undefined) is aborted via XMLHttpRequest.abort()
(function($) {
	var pendingRequests = {};
	// Use a prefilter if available (1.5+)
	if ( $.ajaxPrefilter ) {
		$.ajaxPrefilter(function(settings, _, xhr) {
			var port = settings.port;
			if (settings.mode === "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				pendingRequests[port] = xhr;
			}
		});
	} else {
		// Proxy ajax
		var ajax = $.ajax;
		$.ajax = function(settings) {
			var mode = ( "mode" in settings ? settings : $.ajaxSettings ).mode,
				port = ( "port" in settings ? settings : $.ajaxSettings ).port;
			if (mode === "abort") {
				if ( pendingRequests[port] ) {
					pendingRequests[port].abort();
				}
				return (pendingRequests[port] = ajax.apply(this, arguments));
			}
			return ajax.apply(this, arguments);
		};
	}
}(jQuery));

// provides delegate(type: String, delegate: Selector, handler: Callback) plugin for easier event delegation
// handler is only called when $(event.target).is(delegate), in the scope of the jquery-object for event.target
(function($) {
	$.extend($.fn, {
		validateDelegate: function(delegate, type, handler) {
			return this.bind(type, function(event) {
				var target = $(event.target);
				if (target.is(delegate)) {
					return handler.apply(target, arguments);
				}
			});
		}
	});
}(jQuery));
;/**/
/**
 * @file
 * Provides JavaScript additions to the managed file field type.
 *
 * This file provides progress bar support (if available), popup windows for
 * file previews, and disabling of other file fields during Ajax uploads (which
 * prevents separate file fields from accidentally uploading files).
 */

(function ($) {

/**
 * Attach behaviors to managed file element upload fields.
 */
Drupal.behaviors.fileValidateAutoAttach = {
  attach: function (context, settings) {
    if (settings.file && settings.file.elements) {
      $.each(settings.file.elements, function(selector) {
        var extensions = settings.file.elements[selector];
        $(selector, context).bind('change', {extensions: extensions}, Drupal.file.validateExtension);
      });
    }
  },
  detach: function (context, settings) {
    if (settings.file && settings.file.elements) {
      $.each(settings.file.elements, function(selector) {
        $(selector, context).unbind('change', Drupal.file.validateExtension);
      });
    }
  }
};

/**
 * Attach behaviors to the file upload and remove buttons.
 */
Drupal.behaviors.fileButtons = {
  attach: function (context) {
    $('input.form-submit', context).bind('mousedown', Drupal.file.disableFields);
    $('div.form-managed-file input.form-submit', context).bind('mousedown', Drupal.file.progressBar);
  },
  detach: function (context) {
    $('input.form-submit', context).unbind('mousedown', Drupal.file.disableFields);
    $('div.form-managed-file input.form-submit', context).unbind('mousedown', Drupal.file.progressBar);
  }
};

/**
 * Attach behaviors to links within managed file elements.
 */
Drupal.behaviors.filePreviewLinks = {
  attach: function (context) {
    $('div.form-managed-file .file a, .file-widget .file a', context).bind('click',Drupal.file.openInNewWindow);
  },
  detach: function (context){
    $('div.form-managed-file .file a, .file-widget .file a', context).unbind('click', Drupal.file.openInNewWindow);
  }
};

/**
 * File upload utility functions.
 */
Drupal.file = Drupal.file || {
  /**
   * Client-side file input validation of file extensions.
   */
  validateExtension: function (event) {
    // Remove any previous errors.
    $('.file-upload-js-error').remove();

    // Add client side validation for the input[type=file].
    var extensionPattern = event.data.extensions.replace(/,\s*/g, '|');
    if (extensionPattern.length > 1 && this.value.length > 0) {
      var acceptableMatch = new RegExp('\\.(' + extensionPattern + ')$', 'gi');
      if (!acceptableMatch.test(this.value)) {
        var error = Drupal.t("The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.", {
          // According to the specifications of HTML5, a file upload control
          // should not reveal the real local path to the file that a user
          // has selected. Some web browsers implement this restriction by
          // replacing the local path with "C:\fakepath\", which can cause
          // confusion by leaving the user thinking perhaps Drupal could not
          // find the file because it messed up the file path. To avoid this
          // confusion, therefore, we strip out the bogus fakepath string.
          '%filename': this.value.replace('C:\\fakepath\\', ''),
          '%extensions': extensionPattern.replace(/\|/g, ', ')
        });
        $(this).closest('div.form-managed-file').prepend('<div class="messages error file-upload-js-error" aria-live="polite">' + error + '</div>');
        this.value = '';
        return false;
      }
    }
  },
  /**
   * Prevent file uploads when using buttons not intended to upload.
   */
  disableFields: function (event){
    var clickedButton = this;

    // Only disable upload fields for Ajax buttons.
    if (!$(clickedButton).hasClass('ajax-processed')) {
      return;
    }

    // Check if we're working with an "Upload" button.
    var $enabledFields = [];
    if ($(this).closest('div.form-managed-file').length > 0) {
      $enabledFields = $(this).closest('div.form-managed-file').find('input.form-file');
    }

    // Temporarily disable upload fields other than the one we're currently
    // working with. Filter out fields that are already disabled so that they
    // do not get enabled when we re-enable these fields at the end of behavior
    // processing. Re-enable in a setTimeout set to a relatively short amount
    // of time (1 second). All the other mousedown handlers (like Drupal's Ajax
    // behaviors) are excuted before any timeout functions are called, so we
    // don't have to worry about the fields being re-enabled too soon.
    // @todo If the previous sentence is true, why not set the timeout to 0?
    var $fieldsToTemporarilyDisable = $('div.form-managed-file input.form-file').not($enabledFields).not(':disabled');
    $fieldsToTemporarilyDisable.attr('disabled', 'disabled');
    setTimeout(function (){
      $fieldsToTemporarilyDisable.attr('disabled', false);
    }, 1000);
  },
  /**
   * Add progress bar support if possible.
   */
  progressBar: function (event) {
    var clickedButton = this;
    var $progressId = $(clickedButton).closest('div.form-managed-file').find('input.file-progress');
    if ($progressId.length) {
      var originalName = $progressId.attr('name');

      // Replace the name with the required identifier.
      $progressId.attr('name', originalName.match(/APC_UPLOAD_PROGRESS|UPLOAD_IDENTIFIER/)[0]);

      // Restore the original name after the upload begins.
      setTimeout(function () {
        $progressId.attr('name', originalName);
      }, 1000);
    }
    // Show the progress bar if the upload takes longer than half a second.
    setTimeout(function () {
      $(clickedButton).closest('div.form-managed-file').find('div.ajax-progress-bar').slideDown();
    }, 500);
  },
  /**
   * Open links to files within forms in a new window.
   */
  openInNewWindow: function (event) {
    $(this).attr('target', '_blank');
    window.open(this.href, 'filePreview', 'toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=500,height=550');
    return false;
  }
};

})(jQuery);
;/**/
(function($){Drupal.antibot={};Drupal.behaviors.antibot={attach:function(context){Drupal.settings.antibot.human=false;$("body").mousemove(function(){Drupal.antibot.unlockForms()});$("body").bind("touchmove",function(){Drupal.antibot.unlockForms()});$("body").keydown(function(e){if(e.keyCode==9||e.keyCode==13)Drupal.antibot.unlockForms()})}};Drupal.antibot.unlockForms=function(){if(!Drupal.settings.antibot.human){for(var id in Drupal.settings.antibot.forms){$("form#"+id).attr("action",Drupal.settings.antibot.forms[id].action);
if(Drupal.settings.antibot.forms[id].key)$("form#"+id).find('input[name="antibot_key"]').val(Drupal.settings.antibot.forms[id].key)}Drupal.settings.antibot.human=true}}})(jQuery);;/**/

/**
 * JavaScript behaviors for the front-end display of webforms.
 */

(function ($) {

Drupal.behaviors.webform = Drupal.behaviors.webform || {};

Drupal.behaviors.webform.attach = function(context) {
  // Calendar datepicker behavior.
  Drupal.webform.datepicker(context);
};

Drupal.webform = Drupal.webform || {};

Drupal.webform.datepicker = function(context) {
  $('div.webform-datepicker').each(function() {
    var $webformDatepicker = $(this);
    var $calendar = $webformDatepicker.find('input.webform-calendar');

    // Ensure the page we're on actually contains a datepicker.
    if ($calendar.length == 0) {
      return;
    }

    var startDate = $calendar[0].className.replace(/.*webform-calendar-start-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
    var endDate = $calendar[0].className.replace(/.*webform-calendar-end-(\d{4}-\d{2}-\d{2}).*/, '$1').split('-');
    var firstDay = $calendar[0].className.replace(/.*webform-calendar-day-(\d).*/, '$1');
    // Convert date strings into actual Date objects.
    startDate = new Date(startDate[0], startDate[1] - 1, startDate[2]);
    endDate = new Date(endDate[0], endDate[1] - 1, endDate[2]);

    // Ensure that start comes before end for datepicker.
    if (startDate > endDate) {
      var laterDate = startDate;
      startDate = endDate;
      endDate = laterDate;
    }

    var startYear = startDate.getFullYear();
    var endYear = endDate.getFullYear();

    // Set up the jQuery datepicker element.
    $calendar.datepicker({
      dateFormat: 'yy-mm-dd',
      yearRange: startYear + ':' + endYear,
      firstDay: parseInt(firstDay),
      minDate: startDate,
      maxDate: endDate,
      changeMonth: true,
      changeYear: true,
      onSelect: function(dateText, inst) {
        var date = dateText.split('-');
        $webformDatepicker.find('select.year, input.year').val(+date[0]).trigger('change');
        $webformDatepicker.find('select.month').val(+date[1]).trigger('change');
        $webformDatepicker.find('select.day').val(+date[2]).trigger('change');
      },
      beforeShow: function(input, inst) {
        // Get the select list values.
        var year = $webformDatepicker.find('select.year, input.year').val();
        var month = $webformDatepicker.find('select.month').val();
        var day = $webformDatepicker.find('select.day').val();

        // If empty, default to the current year/month/day in the popup.
        var today = new Date();
        year = year ? year : today.getFullYear();
        month = month ? month : today.getMonth() + 1;
        day = day ? day : today.getDate();

        // Make sure that the default year fits in the available options.
        year = (year < startYear || year > endYear) ? startYear : year;

        // jQuery UI Datepicker will read the input field and base its date off
        // of that, even though in our case the input field is a button.
        $(input).val(year + '-' + month + '-' + day);
      }
    });

    // Prevent the calendar button from submitting the form.
    $calendar.click(function(event) {
      $(this).focus();
      event.preventDefault();
    });
  });
}

})(jQuery);
;/**/

(function($) {

/**
 * Drupal FieldGroup object.
 */
Drupal.FieldGroup = Drupal.FieldGroup || {};
Drupal.FieldGroup.Effects = Drupal.FieldGroup.Effects || {};
Drupal.FieldGroup.groupWithfocus = null;

Drupal.FieldGroup.setGroupWithfocus = function(element) {
  element.css({display: 'block'});
  Drupal.FieldGroup.groupWithfocus = element;
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processFieldset = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.fieldset', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $('legend span.fieldset-legend', $(this)).eq(0).append(' ').append($('.form-required').eq(0).clone());
        }
        if ($('.error', $(this)).length) {
          $('legend span.fieldset-legend', $(this)).eq(0).addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processAccordion = {
  execute: function (context, settings, type) {
    $('div.field-group-accordion-wrapper', context).once('fieldgroup-effects', function () {
      var wrapper = $(this);

      // Get the index to set active.
      var active_index = false;
      wrapper.find('.accordion-item').each(function(i) {
        if ($(this).hasClass('field-group-accordion-active')) {
          active_index = i;
        }
      });

      wrapper.accordion({
        heightStyle: "content",
        active: active_index,
        collapsible: true,
        changestart: function(event, ui) {
          if ($(this).hasClass('effect-none')) {
            ui.options.animated = false;
          }
          else {
            ui.options.animated = 'slide';
          }
        }
      });

      if (type == 'form') {

        var $firstErrorItem = false;

        // Add required fields mark to any element containing required fields
        wrapper.find('div.field-group-accordion-item').each(function(i) {

          if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
            $('h3.ui-accordion-header a').eq(i).append(' ').append($('.form-required').eq(0).clone());
          }
          if ($('.error', $(this)).length) {
            // Save first error item, for focussing it.
            if (!$firstErrorItem) {
              $firstErrorItem = $(this).parent().accordion("activate" , i);
            }
            $('h3.ui-accordion-header').eq(i).addClass('error');
          }
        });

        // Save first error item, for focussing it.
        if (!$firstErrorItem) {
          $('.ui-accordion-content-active', $firstErrorItem).css({height: 'auto', width: 'auto', display: 'block'});
        }

      }
    });
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processHtabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {
      // Add required fields mark to any element containing required fields
      $('fieldset.horizontal-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('horizontalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('horizontalTab').link.parent().addClass('error');
          Drupal.FieldGroup.setGroupWithfocus($(this));
          $(this).data('horizontalTab').focus();
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 */
Drupal.FieldGroup.Effects.processTabs = {
  execute: function (context, settings, type) {
    if (type == 'form') {

      var errorFocussed = false;

      // Add required fields mark to any fieldsets containing required fields
      $('fieldset.vertical-tabs-pane', context).once('fieldgroup-effects', function(i) {
        if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
          $(this).data('verticalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');
        }
        if ($('.error', $(this)).length) {
          $(this).data('verticalTab').link.parent().addClass('error');
          // Focus the first tab with error.
          if (!errorFocussed) {
            Drupal.FieldGroup.setGroupWithfocus($(this));
            $(this).data('verticalTab').focus();
            errorFocussed = true;
          }
        }
      });
    }
  }
}

/**
 * Implements Drupal.FieldGroup.processHook().
 *
 * TODO clean this up meaning check if this is really
 *      necessary.
 */
Drupal.FieldGroup.Effects.processDiv = {
  execute: function (context, settings, type) {

    $('div.collapsible', context).once('fieldgroup-effects', function() {
      var $wrapper = $(this);

      // Turn the legend into a clickable link, but retain span.field-group-format-toggler
      // for CSS positioning.

      var $toggler = $('span.field-group-format-toggler:first', $wrapper);
      var $link = $('<a class="field-group-format-title" href="#"></a>');
      $link.prepend($toggler.contents());

      // Add required field markers if needed
      if ($(this).is('.required-fields') && $(this).find('.form-required').length > 0) {
        $link.append(' ').append($('.form-required').eq(0).clone());
      }

      $link.appendTo($toggler);

      // .wrapInner() does not retain bound events.
      $link.click(function () {
        var wrapper = $wrapper.get(0);
        // Don't animate multiple times.
        if (!wrapper.animating) {
          wrapper.animating = true;
          var speed = $wrapper.hasClass('speed-fast') ? 300 : 1000;
          if ($wrapper.hasClass('effect-none') && $wrapper.hasClass('speed-none')) {
            $('> .field-group-format-wrapper', wrapper).toggle();
          }
          else if ($wrapper.hasClass('effect-blind')) {
            $('> .field-group-format-wrapper', wrapper).toggle('blind', {}, speed);
          }
          else {
            $('> .field-group-format-wrapper', wrapper).toggle(speed);
          }
          wrapper.animating = false;
        }
        $wrapper.toggleClass('collapsed');
        return false;
      });

    });
  }
};

/**
 * Behaviors.
 */
Drupal.behaviors.fieldGroup = {
  attach: function (context, settings) {
    settings.field_group = settings.field_group || Drupal.settings.field_group;
    if (settings.field_group == undefined) {
      return;
    }

    // Execute all of them.
    $.each(Drupal.FieldGroup.Effects, function (func) {
      // We check for a wrapper function in Drupal.field_group as
      // alternative for dynamic string function calls.
      var type = func.toLowerCase().replace("process", "");
      if (settings.field_group[type] != undefined && $.isFunction(this.execute)) {
        this.execute(context, settings, settings.field_group[type]);
      }
    });

    // Fixes css for fieldgroups under vertical tabs.
    $('.fieldset-wrapper .fieldset > legend').css({display: 'block'});
    $('.vertical-tabs fieldset.fieldset').addClass('default-fallback');

    // Add a new ID to each fieldset.
    $('.group-wrapper .horizontal-tabs-panes > fieldset', context).once('group-wrapper-panes-processed', function() {
      // Tats bad, but we have to keep the actual id to prevent layouts to break.
      var fieldgroupID = 'field_group-' + $(this).attr('id');
      $(this).attr('id', fieldgroupID);
    });
    // Set the hash in url to remember last userselection.
    $('.group-wrapper ul li').once('group-wrapper-ul-processed', function() {
      var fieldGroupNavigationListIndex = $(this).index();
      $(this).children('a').click(function() {
        var fieldset = $('.group-wrapper fieldset').get(fieldGroupNavigationListIndex);
        // Grab the first id, holding the wanted hashurl.
        var hashUrl = $(fieldset).attr('id').replace(/^field_group-/, '').split(' ')[0];
        window.location.hash = hashUrl;
      });
    });

  }
};

})(jQuery);
;/**/
(function($,Drupal,window,document,undefined){$(document).ready(function(){url_query_arr={};if($.cookie("utm_values")!=null)url_query_arr=JSON.parse($.cookie("utm_values"));url_query_str=window.location.href.split("?")[1];if(url_query_str){url_query=url_query_str.split("&");url_query_arr_curr={};$.each(url_query,function(index,value){url_query_temp=value.split("=");if(url_query_temp[0].indexOf("utm_")>=0)url_query_arr_curr[url_query_temp[0]]=url_query_temp[1]});if(!$.isEmptyObject(url_query_arr_curr))url_query_arr=
url_query_arr_curr}if(!$.isEmptyObject(url_query_arr)){$.cookie("utm_values",JSON.stringify(url_query_arr),{expires:null,path:"/"});$.each(url_query_arr,function(index,value){$('input[name="submitted['+index+']"]').val(value)})}var penultimate_page=null;var host=window.location.hostname;if(document.referrer!=""&&document.referrer.indexOf(host)>0)$.cookie("hcltech_penultimate_page",document.referrer,{path:"/"});if($.cookie("hcltech_penultimate_page")!=null){penultimate_page=$.cookie("hcltech_penultimate_page");
$('.webform-client-form:not(.webform-client-form-3468) input[name="submitted[penultimate_page]"]').val(penultimate_page)}})})(jQuery,Drupal,this,this.document);;/**/
