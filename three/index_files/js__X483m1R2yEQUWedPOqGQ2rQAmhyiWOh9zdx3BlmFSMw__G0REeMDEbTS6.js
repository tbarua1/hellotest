/*jslint browser: true */ /*global jQuery: true */

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

// TODO JsDoc

/**
 * Create a cookie with the given key and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String key The key of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given key.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String key The key of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function (key, value, options) {

    // key and value given, set cookie...
    if (arguments.length > 1 && (value === null || typeof value !== "object")) {
        options = jQuery.extend({}, options);

        if (value === null) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? String(value) : encodeURIComponent(String(value)),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
;/**/
/*!
 * jQuery Form Plugin
 * version: 4.2.1
 * Requires jQuery v1.7 or later
 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup
 * Project repository: https://github.com/jquery-form/form
 * Dual licensed under the MIT and LGPLv3 licenses.
 * https://github.com/jquery-form/form#license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";function b(b){var c=b.data;b.isDefaultPrevented()||(b.preventDefault(),a(b.target).closest("form").ajaxSubmit(c))}function c(b){var c=b.target,d=a(c);if(!d.is("[type=submit],[type=image]")){var e=d.closest("[type=submit]");if(0===e.length)return;c=e[0]}var f=c.form;if(f.clk=c,"image"===c.type)if(void 0!==b.offsetX)f.clk_x=b.offsetX,f.clk_y=b.offsetY;else if("function"==typeof a.fn.offset){var g=d.offset();f.clk_x=b.pageX-g.left,f.clk_y=b.pageY-g.top}else f.clk_x=b.pageX-c.offsetLeft,f.clk_y=b.pageY-c.offsetTop;setTimeout(function(){f.clk=f.clk_x=f.clk_y=null},100)}function d(){if(a.fn.ajaxSubmit.debug){var b="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(b):window.opera&&window.opera.postError&&window.opera.postError(b)}}var e={};e.fileapi=void 0!==a('<input type="file">').get(0).files,e.formdata=void 0!==window.FormData;var f=!!a.fn.prop;a.fn.attr2=function(){if(!f)return this.attr.apply(this,arguments);var a=this.prop.apply(this,arguments);return a&&a.jquery||"string"==typeof a?a:this.attr.apply(this,arguments)},a.fn.ajaxSubmit=function(b,c,g,h){function i(c){var d,e,f=a.param(c,b.traditional).split("&"),g=f.length,h=[];for(d=0;d<g;d++)f[d]=f[d].replace(/\+/g," "),e=f[d].split("="),h.push([decodeURIComponent(e[0]),decodeURIComponent(e[1])]);return h}function j(c){for(var d=new FormData,e=0;e<c.length;e++)d.append(c[e].name,c[e].value);if(b.extraData){var f=i(b.extraData);for(e=0;e<f.length;e++)f[e]&&d.append(f[e][0],f[e][1])}b.data=null;var g=a.extend(!0,{},a.ajaxSettings,b,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});b.uploadProgress&&(g.xhr=function(){var c=a.ajaxSettings.xhr();return c.upload&&c.upload.addEventListener("progress",function(a){var c=0,d=a.loaded||a.position,e=a.total;a.lengthComputable&&(c=Math.ceil(d/e*100)),b.uploadProgress(a,d,e,c)},!1),c}),g.data=null;var h=g.beforeSend;return g.beforeSend=function(a,c){b.formData?c.data=b.formData:c.data=d,h&&h.call(this,a,c)},a.ajax(g)}function k(c){function e(a){var b=null;try{a.contentWindow&&(b=a.contentWindow.document)}catch(a){d("cannot get iframe.contentWindow document: "+a)}if(b)return b;try{b=a.contentDocument?a.contentDocument:a.document}catch(c){d("cannot get iframe.contentDocument: "+c),b=a.document}return b}function g(){function b(){try{var a=e(q).readyState;d("state = "+a),a&&"uninitialized"===a.toLowerCase()&&setTimeout(b,50)}catch(a){d("Server abort: ",a," (",a.name,")"),h(2),w&&clearTimeout(w),w=void 0}}var c=o.attr2("target"),f=o.attr2("action"),g=o.attr("enctype")||o.attr("encoding")||"multipart/form-data";x.setAttribute("target",n),l&&!/post/i.test(l)||x.setAttribute("method","POST"),f!==k.url&&x.setAttribute("action",k.url),k.skipEncodingOverride||l&&!/post/i.test(l)||o.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),k.timeout&&(w=setTimeout(function(){v=!0,h(1)},k.timeout));var i=[];try{if(k.extraData)for(var j in k.extraData)k.extraData.hasOwnProperty(j)&&(a.isPlainObject(k.extraData[j])&&k.extraData[j].hasOwnProperty("name")&&k.extraData[j].hasOwnProperty("value")?i.push(a('<input type="hidden" name="'+k.extraData[j].name+'">',z).val(k.extraData[j].value).appendTo(x)[0]):i.push(a('<input type="hidden" name="'+j+'">',z).val(k.extraData[j]).appendTo(x)[0]));k.iframeTarget||p.appendTo(A),q.attachEvent?q.attachEvent("onload",h):q.addEventListener("load",h,!1),setTimeout(b,15);try{x.submit()}catch(a){var m=document.createElement("form").submit;m.apply(x)}}finally{x.setAttribute("action",f),x.setAttribute("enctype",g),c?x.setAttribute("target",c):o.removeAttr("target"),a(i).remove()}}function h(b){if(!r.aborted&&!F){if(E=e(q),E||(d("cannot access response document"),b=2),1===b&&r)return r.abort("timeout"),void y.reject(r,"timeout");if(2===b&&r)return r.abort("server abort"),void y.reject(r,"error","server abort");if(E&&E.location.href!==k.iframeSrc||v){q.detachEvent?q.detachEvent("onload",h):q.removeEventListener("load",h,!1);var c,f="success";try{if(v)throw"timeout";var g="xml"===k.dataType||E.XMLDocument||a.isXMLDoc(E);if(d("isXml="+g),!g&&window.opera&&(null===E.body||!E.body.innerHTML)&&--G)return d("requeing onLoad callback, DOM not available"),void setTimeout(h,250);var i=E.body?E.body:E.documentElement;r.responseText=i?i.innerHTML:null,r.responseXML=E.XMLDocument?E.XMLDocument:E,g&&(k.dataType="xml"),r.getResponseHeader=function(a){return{"content-type":k.dataType}[a.toLowerCase()]},i&&(r.status=Number(i.getAttribute("status"))||r.status,r.statusText=i.getAttribute("statusText")||r.statusText);var j=(k.dataType||"").toLowerCase(),l=/(json|script|text)/.test(j);if(l||k.textarea){var n=E.getElementsByTagName("textarea")[0];if(n)r.responseText=n.value,r.status=Number(n.getAttribute("status"))||r.status,r.statusText=n.getAttribute("statusText")||r.statusText;else if(l){var o=E.getElementsByTagName("pre")[0],s=E.getElementsByTagName("body")[0];o?r.responseText=o.textContent?o.textContent:o.innerText:s&&(r.responseText=s.textContent?s.textContent:s.innerText)}}else"xml"===j&&!r.responseXML&&r.responseText&&(r.responseXML=H(r.responseText));try{D=J(r,j,k)}catch(a){f="parsererror",r.error=c=a||f}}catch(a){d("error caught: ",a),f="error",r.error=c=a||f}r.aborted&&(d("upload aborted"),f=null),r.status&&(f=r.status>=200&&r.status<300||304===r.status?"success":"error"),"success"===f?(k.success&&k.success.call(k.context,D,"success",r),y.resolve(r.responseText,"success",r),m&&a.event.trigger("ajaxSuccess",[r,k])):f&&(void 0===c&&(c=r.statusText),k.error&&k.error.call(k.context,r,f,c),y.reject(r,"error",c),m&&a.event.trigger("ajaxError",[r,k,c])),m&&a.event.trigger("ajaxComplete",[r,k]),m&&!--a.active&&a.event.trigger("ajaxStop"),k.complete&&k.complete.call(k.context,r,f),F=!0,k.timeout&&clearTimeout(w),setTimeout(function(){k.iframeTarget?p.attr("src",k.iframeSrc):p.remove(),r.responseXML=null},100)}}}var i,j,k,m,n,p,q,r,t,u,v,w,x=o[0],y=a.Deferred();if(y.abort=function(a){r.abort(a)},c)for(j=0;j<s.length;j++)i=a(s[j]),f?i.prop("disabled",!1):i.removeAttr("disabled");k=a.extend(!0,{},a.ajaxSettings,b),k.context=k.context||k,n="jqFormIO"+(new Date).getTime();var z=x.ownerDocument,A=o.closest("body");if(k.iframeTarget?(p=a(k.iframeTarget,z),u=p.attr2("name"),u?n=u:p.attr2("name",n)):(p=a('<iframe name="'+n+'" src="'+k.iframeSrc+'" />',z),p.css({position:"absolute",top:"-1000px",left:"-1000px"})),q=p[0],r={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(b){var c="timeout"===b?"timeout":"aborted";d("aborting upload... "+c),this.aborted=1;try{q.contentWindow.document.execCommand&&q.contentWindow.document.execCommand("Stop")}catch(a){}p.attr("src",k.iframeSrc),r.error=c,k.error&&k.error.call(k.context,r,c,b),m&&a.event.trigger("ajaxError",[r,k,c]),k.complete&&k.complete.call(k.context,r,c)}},m=k.global,m&&0==a.active++&&a.event.trigger("ajaxStart"),m&&a.event.trigger("ajaxSend",[r,k]),k.beforeSend&&k.beforeSend.call(k.context,r,k)===!1)return k.global&&a.active--,y.reject(),y;if(r.aborted)return y.reject(),y;(t=x.clk)&&(u=t.name)&&!t.disabled&&(k.extraData=k.extraData||{},k.extraData[u]=t.value,"image"===t.type&&(k.extraData[u+".x"]=x.clk_x,k.extraData[u+".y"]=x.clk_y));var B=a("meta[name=csrf-token]").attr("content"),C=a("meta[name=csrf-param]").attr("content");C&&B&&(k.extraData=k.extraData||{},k.extraData[C]=B),k.forceSync?g():setTimeout(g,10);var D,E,F,G=50,H=a.parseXML||function(a,b){return window.ActiveXObject?(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)):b=(new DOMParser).parseFromString(a,"text/xml"),b&&b.documentElement&&"parsererror"!==b.documentElement.nodeName?b:null},I=a.parseJSON||function(a){return window.eval("("+a+")")},J=function(b,c,d){var e=b.getResponseHeader("content-type")||"",f=("xml"===c||!c)&&e.indexOf("xml")>=0,g=f?b.responseXML:b.responseText;return f&&"parsererror"===g.documentElement.nodeName&&a.error&&a.error("parsererror"),d&&d.dataFilter&&(g=d.dataFilter(g,c)),"string"==typeof g&&(("json"===c||!c)&&e.indexOf("json")>=0?g=I(g):("script"===c||!c)&&e.indexOf("javascript")>=0&&a.globalEval(g)),g};return y}if(!this.length)return d("ajaxSubmit: skipping submit process - no element selected"),this;var l,m,n,o=this;"function"==typeof b?b={success:b}:"string"==typeof b||b===!1&&arguments.length>0?(b={url:b,data:c,dataType:g},"function"==typeof h&&(b.success=h)):void 0===b&&(b={}),l=b.method||b.type||this.attr2("method"),m=b.url||this.attr2("action"),n="string"==typeof m?a.trim(m):"",n=n||window.location.href||"",n&&(n=(n.match(/^([^#]+)/)||[])[1]),b=a.extend(!0,{url:n,success:a.ajaxSettings.success,type:l||a.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},b);var p={};if(this.trigger("form-pre-serialize",[this,b,p]),p.veto)return d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(b.beforeSerialize&&b.beforeSerialize(this,b)===!1)return d("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var q=b.traditional;void 0===q&&(q=a.ajaxSettings.traditional);var r,s=[],t=this.formToArray(b.semantic,s,b.filtering);if(b.data){var u=a.isFunction(b.data)?b.data(t):b.data;b.extraData=u,r=a.param(u,q)}if(b.beforeSubmit&&b.beforeSubmit(t,this,b)===!1)return d("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[t,this,b,p]),p.veto)return d("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var v=a.param(t,q);r&&(v=v?v+"&"+r:r),"GET"===b.type.toUpperCase()?(b.url+=(b.url.indexOf("?")>=0?"&":"?")+v,b.data=null):b.data=v;var w=[];if(b.resetForm&&w.push(function(){o.resetForm()}),b.clearForm&&w.push(function(){o.clearForm(b.includeHidden)}),!b.dataType&&b.target){var x=b.success||function(){};w.push(function(c,d,e){var f=arguments,g=b.replaceTarget?"replaceWith":"html";a(b.target)[g](c).each(function(){x.apply(this,f)})})}else b.success&&(a.isArray(b.success)?a.merge(w,b.success):w.push(b.success));if(b.success=function(a,c,d){for(var e=b.context||this,f=0,g=w.length;f<g;f++)w[f].apply(e,[a,c,d||o,o])},b.error){var y=b.error;b.error=function(a,c,d){var e=b.context||this;y.apply(e,[a,c,d,o])}}if(b.complete){var z=b.complete;b.complete=function(a,c){var d=b.context||this;z.apply(d,[a,c,o])}}var A=a("input[type=file]:enabled",this).filter(function(){return""!==a(this).val()}),B=A.length>0,C="multipart/form-data",D=o.attr("enctype")===C||o.attr("encoding")===C,E=e.fileapi&&e.formdata;d("fileAPI :"+E);var F,G=(B||D)&&!E;b.iframe!==!1&&(b.iframe||G)?b.closeKeepAlive?a.get(b.closeKeepAlive,function(){F=k(t)}):F=k(t):F=(B||D)&&E?j(t):a.ajax(b),o.removeData("jqxhr").data("jqxhr",F);for(var H=0;H<s.length;H++)s[H]=null;return this.trigger("form-submit-notify",[this,b]),this},a.fn.ajaxForm=function(e,f,g,h){if(("string"==typeof e||e===!1&&arguments.length>0)&&(e={url:e,data:f,dataType:g},"function"==typeof h&&(e.success=h)),e=e||{},e.delegation=e.delegation&&a.isFunction(a.fn.on),!e.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!a.isReady&&i.s?(d("DOM not ready, queuing ajaxForm"),a(function(){a(i.s,i.c).ajaxForm(e)}),this):(d("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)")),this)}return e.delegation?(a(document).off("submit.form-plugin",this.selector,b).off("click.form-plugin",this.selector,c).on("submit.form-plugin",this.selector,e,b).on("click.form-plugin",this.selector,e,c),this):this.ajaxFormUnbind().on("submit.form-plugin",e,b).on("click.form-plugin",e,c)},a.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},a.fn.formToArray=function(b,c,d){var f=[];if(0===this.length)return f;var g,h=this[0],i=this.attr("id"),j=b||void 0===h.elements?h.getElementsByTagName("*"):h.elements;if(j&&(j=a.makeArray(j)),i&&(b||/(Edge|Trident)\//.test(navigator.userAgent))&&(g=a(':input[form="'+i+'"]').get(),g.length&&(j=(j||[]).concat(g))),!j||!j.length)return f;a.isFunction(d)&&(j=a.map(j,d));var k,l,m,n,o,p,q;for(k=0,p=j.length;k<p;k++)if(o=j[k],(m=o.name)&&!o.disabled)if(b&&h.clk&&"image"===o.type)h.clk===o&&(f.push({name:m,value:a(o).val(),type:o.type}),f.push({name:m+".x",value:h.clk_x},{name:m+".y",value:h.clk_y}));else if((n=a.fieldValue(o,!0))&&n.constructor===Array)for(c&&c.push(o),l=0,q=n.length;l<q;l++)f.push({name:m,value:n[l]});else if(e.fileapi&&"file"===o.type){c&&c.push(o);var r=o.files;if(r.length)for(l=0;l<r.length;l++)f.push({name:m,value:r[l],type:o.type});else f.push({name:m,value:"",type:o.type})}else null!==n&&void 0!==n&&(c&&c.push(o),f.push({name:m,value:n,type:o.type,required:o.required}));if(!b&&h.clk){var s=a(h.clk),t=s[0];m=t.name,m&&!t.disabled&&"image"===t.type&&(f.push({name:m,value:s.val()}),f.push({name:m+".x",value:h.clk_x},{name:m+".y",value:h.clk_y}))}return f},a.fn.formSerialize=function(b){return a.param(this.formToArray(b))},a.fn.fieldSerialize=function(b){var c=[];return this.each(function(){var d=this.name;if(d){var e=a.fieldValue(this,b);if(e&&e.constructor===Array)for(var f=0,g=e.length;f<g;f++)c.push({name:d,value:e[f]});else null!==e&&void 0!==e&&c.push({name:this.name,value:e})}}),a.param(c)},a.fn.fieldValue=function(b){for(var c=[],d=0,e=this.length;d<e;d++){var f=this[d],g=a.fieldValue(f,b);null===g||void 0===g||g.constructor===Array&&!g.length||(g.constructor===Array?a.merge(c,g):c.push(g))}return c},a.fieldValue=function(b,c){var d=b.name,e=b.type,f=b.tagName.toLowerCase();if(void 0===c&&(c=!0),c&&(!d||b.disabled||"reset"===e||"button"===e||("checkbox"===e||"radio"===e)&&!b.checked||("submit"===e||"image"===e)&&b.form&&b.form.clk!==b||"select"===f&&b.selectedIndex===-1))return null;if("select"===f){var g=b.selectedIndex;if(g<0)return null;for(var h=[],i=b.options,j="select-one"===e,k=j?g+1:i.length,l=j?g:0;l<k;l++){var m=i[l];if(m.selected&&!m.disabled){var n=m.value;if(n||(n=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),j)return n;h.push(n)}}return h}return a(b).val().replace(/\r?\n/g,"\r\n")},a.fn.clearForm=function(b){return this.each(function(){a("input,select,textarea",this).clearFields(b)})},a.fn.clearFields=a.fn.clearInputs=function(b){var c=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var d=this.type,e=this.tagName.toLowerCase();c.test(d)||"textarea"===e?this.value="":"checkbox"===d||"radio"===d?this.checked=!1:"select"===e?this.selectedIndex=-1:"file"===d?/MSIE/.test(navigator.userAgent)?a(this).replaceWith(a(this).clone(!0)):a(this).val(""):b&&(b===!0&&/hidden/.test(d)||"string"==typeof b&&a(this).is(b))&&(this.value="")})},a.fn.resetForm=function(){return this.each(function(){var b=a(this),c=this.tagName.toLowerCase();switch(c){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var d=b.parents("select");return d.length&&d[0].multiple?"option"===c?this.selected=this.defaultSelected:b.find("option").resetForm():d.resetForm(),!0;case"select":return b.find("option").each(function(a){if(this.selected=this.defaultSelected,this.defaultSelected&&!b[0].multiple)return b[0].selectedIndex=a,!1}),!0;case"label":var e=a(b.attr("for")),f=b.find("input,select,textarea");return e[0]&&f.unshift(e[0]),f.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return b.find("form,input,label,select,textarea").resetForm(),!0}})},a.fn.enable=function(a){return void 0===a&&(a=!0),this.each(function(){this.disabled=!a})},a.fn.selected=function(b){return void 0===b&&(b=!0),this.each(function(){var c=this.type;if("checkbox"===c||"radio"===c)this.checked=b;else if("option"===this.tagName.toLowerCase()){var d=a(this).parent("select");b&&d[0]&&"select-one"===d[0].type&&d.find("option").selected(!1),this.selected=b}})},a.fn.ajaxSubmit.debug=!1});
;/**/
(function($){Drupal.ajax=Drupal.ajax||{};Drupal.settings.urlIsAjaxTrusted=Drupal.settings.urlIsAjaxTrusted||{};Drupal.behaviors.AJAX={attach:function(context,settings){for(var base in settings.ajax)if(!$("#"+base+".ajax-processed").length){var element_settings=settings.ajax[base];if(typeof element_settings.selector=="undefined")element_settings.selector="#"+base;$(element_settings.selector).each(function(){element_settings.element=this;Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings)});
$("#"+base).addClass("ajax-processed")}$(".use-ajax:not(.ajax-processed)").addClass("ajax-processed").each(function(){var element_settings={};element_settings.progress={"type":"throbber"};if($(this).attr("href")){element_settings.url=$(this).attr("href");element_settings.event="click"}var base=$(this).attr("id");Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings)});$(".use-ajax-submit:not(.ajax-processed)").addClass("ajax-processed").each(function(){var element_settings={};element_settings.url=
$(this.form).attr("action");element_settings.setClick=true;element_settings.event="click";element_settings.progress={"type":"throbber"};var base=$(this).attr("id");Drupal.ajax[base]=new Drupal.ajax(base,this,element_settings)})}};Drupal.ajax=function(base,element,element_settings){var defaults={url:"system/ajax",event:"mousedown",keypress:true,selector:"#"+base,effect:"none",speed:"none",method:"replaceWith",progress:{type:"throbber",message:Drupal.t("Please wait...")},submit:{"js":true}};$.extend(this,
defaults,element_settings);this.element=element;this.element_settings=element_settings;this.url=element_settings.url.replace(/\/nojs(\/|$|\?|&|#)/g,"/ajax$1");if(Drupal.settings.urlIsAjaxTrusted[element_settings.url])Drupal.settings.urlIsAjaxTrusted[this.url]=true;this.wrapper="#"+element_settings.wrapper;if(this.element.form)this.form=$(this.element.form);var ajax=this;ajax.options={url:ajax.url,data:ajax.submit,beforeSerialize:function(element_settings,options){return ajax.beforeSerialize(element_settings,
options)},beforeSubmit:function(form_values,element_settings,options){ajax.ajaxing=true;return ajax.beforeSubmit(form_values,element_settings,options)},beforeSend:function(xmlhttprequest,options){ajax.ajaxing=true;return ajax.beforeSend(xmlhttprequest,options)},success:function(response,status,xmlhttprequest){if(typeof response=="string")response=$.parseJSON(response);if(response!==null&&!Drupal.settings.urlIsAjaxTrusted[ajax.url])if(xmlhttprequest.getResponseHeader("X-Drupal-Ajax-Token")!=="1"){var customMessage=
Drupal.t("The response failed verification so will not be processed.");return ajax.error(xmlhttprequest,ajax.url,customMessage)}return ajax.success(response,status)},complete:function(xmlhttprequest,status){ajax.ajaxing=false;if(status=="error"||status=="parsererror")return ajax.error(xmlhttprequest,ajax.url)},dataType:"json",type:"POST"};$(ajax.element).bind(element_settings.event,function(event){if(!Drupal.settings.urlIsAjaxTrusted[ajax.url]&&!Drupal.urlIsLocal(ajax.url))throw new Error(Drupal.t("The callback URL is not local and not trusted: !url",
{"!url":ajax.url}));return ajax.eventResponse(this,event)});if(element_settings.keypress)$(ajax.element).keypress(function(event){return ajax.keypressResponse(this,event)});if(element_settings.prevent)$(ajax.element).bind(element_settings.prevent,false)};Drupal.ajax.prototype.keypressResponse=function(element,event){var ajax=this;if(event.which==13||event.which==32&&element.type!="text"&&element.type!="textarea"){$(ajax.element_settings.element).trigger(ajax.element_settings.event);return false}};
Drupal.ajax.prototype.eventResponse=function(element,event){var ajax=this;if(ajax.ajaxing)return false;try{if(ajax.form){if(ajax.setClick)element.form.clk=element;ajax.form.ajaxSubmit(ajax.options)}else{ajax.beforeSerialize(ajax.element,ajax.options);$.ajax(ajax.options)}}catch(e){ajax.ajaxing=false;alert("An error occurred while attempting to process "+ajax.options.url+": "+e.message)}if(typeof element.type!="undefined"&&(element.type=="checkbox"||element.type=="radio"))return true;else return false};
Drupal.ajax.prototype.beforeSerialize=function(element,options){if(this.form){var settings=this.settings||Drupal.settings;Drupal.detachBehaviors(this.form,settings,"serialize")}options.data["ajax_html_ids[]"]=[];$("[id]").each(function(){options.data["ajax_html_ids[]"].push(this.id)});options.data["ajax_page_state[theme]"]=Drupal.settings.ajaxPageState.theme;options.data["ajax_page_state[theme_token]"]=Drupal.settings.ajaxPageState.theme_token;for(var key in Drupal.settings.ajaxPageState.css)options.data["ajax_page_state[css]["+
key+"]"]=1;for(var key in Drupal.settings.ajaxPageState.js)options.data["ajax_page_state[js]["+key+"]"]=1};Drupal.ajax.prototype.beforeSubmit=function(form_values,element,options){};Drupal.ajax.prototype.beforeSend=function(xmlhttprequest,options){if(this.form){options.extraData=options.extraData||{};options.extraData.ajax_iframe_upload="1";var v=$.fieldValue(this.element);if(v!==null)options.extraData[this.element.name]=Drupal.checkPlain(v)}$(this.element).addClass("progress-disabled").attr("disabled",
true);if(this.progress.type=="bar"){var progressBar=new Drupal.progressBar("ajax-progress-"+this.element.id,eval(this.progress.update_callback),this.progress.method,eval(this.progress.error_callback));if(this.progress.message)progressBar.setProgress(-1,this.progress.message);if(this.progress.url)progressBar.startMonitoring(this.progress.url,this.progress.interval||1500);this.progress.element=$(progressBar.element).addClass("ajax-progress ajax-progress-bar");this.progress.object=progressBar;$(this.element).after(this.progress.element)}else if(this.progress.type==
"throbber"){this.progress.element=$('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');if(this.progress.message)$(".throbber",this.progress.element).after('<div class="message">'+this.progress.message+"</div>");$(this.element).after(this.progress.element)}};Drupal.ajax.prototype.success=function(response,status){if(this.progress.element)$(this.progress.element).remove();if(this.progress.object)this.progress.object.stopMonitoring();$(this.element).removeClass("progress-disabled").removeAttr("disabled");
Drupal.freezeHeight();for(var i in response)if(response.hasOwnProperty(i)&&response[i]["command"]&&this.commands[response[i]["command"]])this.commands[response[i]["command"]](this,response[i],status);if(this.form){var settings=this.settings||Drupal.settings;Drupal.attachBehaviors(this.form,settings)}Drupal.unfreezeHeight();this.settings=null};Drupal.ajax.prototype.getEffect=function(response){var type=response.effect||this.effect;var speed=response.speed||this.speed;var effect={};if(type=="none"){effect.showEffect=
"show";effect.hideEffect="hide";effect.showSpeed=""}else if(type=="fade"){effect.showEffect="fadeIn";effect.hideEffect="fadeOut";effect.showSpeed=speed}else{effect.showEffect=type+"Toggle";effect.hideEffect=type+"Toggle";effect.showSpeed=speed}return effect};Drupal.ajax.prototype.error=function(xmlhttprequest,uri,customMessage){Drupal.displayAjaxError(Drupal.ajaxError(xmlhttprequest,uri,customMessage));if(this.progress.element)$(this.progress.element).remove();if(this.progress.object)this.progress.object.stopMonitoring();
$(this.wrapper).show();$(this.element).removeClass("progress-disabled").removeAttr("disabled");if(this.form){var settings=this.settings||Drupal.settings;Drupal.attachBehaviors(this.form,settings)}};Drupal.ajax.prototype.commands={insert:function(ajax,response,status){var wrapper=response.selector?$(response.selector):$(ajax.wrapper);var method=response.method||ajax.method;var effect=ajax.getEffect(response);var new_content_wrapped=$("<div></div>").html(response.data);var new_content=new_content_wrapped.contents();
if(new_content.length!=1||new_content.get(0).nodeType!=1)new_content=new_content_wrapped;switch(method){case "html":case "replaceWith":case "replaceAll":case "empty":case "remove":var settings=response.settings||ajax.settings||Drupal.settings;Drupal.detachBehaviors(wrapper,settings)}wrapper[method](new_content);if(effect.showEffect!="show")new_content.hide();if($(".ajax-new-content",new_content).length>0){$(".ajax-new-content",new_content).hide();new_content.show();$(".ajax-new-content",new_content)[effect.showEffect](effect.showSpeed)}else if(effect.showEffect!=
"show")new_content[effect.showEffect](effect.showSpeed);if(new_content.parents("html").length>0){var settings=response.settings||ajax.settings||Drupal.settings;Drupal.attachBehaviors(new_content,settings)}},remove:function(ajax,response,status){var settings=response.settings||ajax.settings||Drupal.settings;Drupal.detachBehaviors($(response.selector),settings);$(response.selector).remove()},changed:function(ajax,response,status){if(!$(response.selector).hasClass("ajax-changed")){$(response.selector).addClass("ajax-changed");
if(response.asterisk)$(response.selector).find(response.asterisk).append(' <span class="ajax-changed">*</span> ')}},alert:function(ajax,response,status){alert(response.text,response.title)},css:function(ajax,response,status){$(response.selector).css(response.argument)},settings:function(ajax,response,status){if(response.merge)$.extend(true,Drupal.settings,response.settings);else ajax.settings=response.settings},data:function(ajax,response,status){$(response.selector).data(response.name,response.value)},
invoke:function(ajax,response,status){var $element=$(response.selector);$element[response.method].apply($element,response.arguments)},restripe:function(ajax,response,status){$("> tbody > tr:visible, > tr:visible",$(response.selector)).removeClass("odd even").filter(":even").addClass("odd").end().filter(":odd").addClass("even")},add_css:function(ajax,response,status){$("head").prepend(response.data);var match,importMatch=/^@import url\("(.*)"\);$/igm;if(document.styleSheets[0].addImport&&importMatch.test(response.data)){importMatch.lastIndex=
0;while(match=importMatch.exec(response.data))document.styleSheets[0].addImport(match[1])}},updateBuildId:function(ajax,response,status){$('input[name="form_build_id"][value="'+response["old"]+'"]').val(response["new"])}}})(jQuery);;/**/
(function (D) {
  var beforeSerialize = D.ajax.prototype.beforeSerialize;
  D.ajax.prototype.beforeSerialize = function (element, options) {
    beforeSerialize.call(this, element, options);
    options.data['ajax_page_state[jquery_version]'] = D.settings.ajaxPageState.jquery_version;
  }
})(Drupal);
;/**/
jQuery(document).ready(function(){var groupClasses=new Array;jQuery(".search-result.solr-grouped").each(function(index,item){item=jQuery(item);currentGroupClass=item.attr("class").substr(item.attr("class").lastIndexOf("solr-group-"));if(jQuery.inArray(currentGroupClass,groupClasses)<0)groupClasses.push(currentGroupClass)});jQuery.each(groupClasses,function(index,item){currentGroup=jQuery(".search-result.solr-grouped."+item);currentGroup.wrapAll('<li id="'+item+'-all" />');currentGroup.wrapAll('<ol class="apachesolr_search-results-grouped search-results-grouped">');
jQuery("#"+item+"-all").prepend("<span>Group: "+item.replace("solr-group-","")+"</span>")})});;/**/
// $Id$

/**
 * @file
 * OM Maximenu script
 *
 * @author: Daniel Honrade http://drupal.org/user/351112
 *
 */
 
jQuery(document).ready(function($){  
	//back to top scroll function. Any link with a hash (#) will scroll to that id on the page
	$('.om-maximenu li.om-leaf a').addClass('om-autoscroll');

	$('a.om-autoscroll[href*="#"]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
			  var targetOffset = $target.offset().top;
				  //targetOffset = targetOffset - 90;
				$('html,body').animate({scrollTop: targetOffset - 0}, 500);
				return false;
			}
		}
	});
	// stay open
	$('.om-maximenu-open input').each(function() {
		//alert($(this).attr('checked'));
		// jQuery 1.7 has changed it's value checking for checkbox to checked instead of true
	  if(($(this).attr('checked') == true) || ($(this).attr('checked') == 'checked')) {
	    $(this).parent().parent().addClass('open');
	    $(this).parent().parent().parent().addClass('open');
	    $(this).parent().parent().removeClass('closed');
	  }
	  else {
	    $(this).parent().parent().removeClass('open');
	    $(this).parent().parent().parent().removeClass('open');
	    $(this).parent().parent().addClass('closed');
	  }
	});
	$('.om-maximenu-open input').click(function() {
		//alert($(this).attr('checked'));
	  if(($(this).attr('checked') == true) || ($(this).attr('checked') == 'checked')) {
	    $(this).parent().parent().addClass('open');
	    $(this).parent().parent().parent().addClass('open');
	    $(this).parent().parent().removeClass('closed');
	  }
	  else {
	    $(this).parent().parent().removeClass('open');
	    $(this).parent().parent().parent().removeClass('open');			
	    $(this).parent().parent().addClass('closed');
	  }
	});		
	// image hover replacement
  $('.om-maximenu img.om-hover').hover(function () {
    var src = $(this).attr('src');
    var altsrc = src.replace(/([^.]+)(\.[^.]+$)/, '$1_hover$2');
    $(this).attr({ src: altsrc, altsrc: src });
  },function () {
    var src = $(this).attr('src');
    var altsrc = src.replace(/_hover/, '');
    $(this).attr({ src: altsrc, altsrc: src });
  });	
});	 
;/**/
(function($){Drupal.extlink=Drupal.extlink||{};Drupal.extlink.attach=function(context,settings){if(!settings.hasOwnProperty("extlink"))return;var pattern=/^(([^\/:]+?\.)*)([^\.:]{4,})((\.[a-z]{1,4})*)(:[0-9]{1,5})?$/;var host=window.location.host.replace(pattern,"$3$4");var subdomain=window.location.host.replace(pattern,"$1");var subdomains;if(settings.extlink.extSubdomains)subdomains="([^/]*\\.)?";else if(subdomain=="www."||subdomain=="")subdomains="(www\\.)?";else subdomains=subdomain.replace(".",
"\\.");var internal_link=new RegExp("^https?://"+subdomains+host,"i");var extInclude=false;if(settings.extlink.extInclude)extInclude=new RegExp(settings.extlink.extInclude.replace(/\\/,"\\"),"i");var extExclude=false;if(settings.extlink.extExclude)extExclude=new RegExp(settings.extlink.extExclude.replace(/\\/,"\\"),"i");var extCssExclude=false;if(settings.extlink.extCssExclude)extCssExclude=settings.extlink.extCssExclude;var extCssExplicit=false;if(settings.extlink.extCssExplicit)extCssExplicit=settings.extlink.extCssExplicit;
var external_links=new Array;var mailto_links=new Array;$("a:not(."+settings.extlink.extClass+", ."+settings.extlink.mailtoClass+"), area:not(."+settings.extlink.extClass+", ."+settings.extlink.mailtoClass+")",context).each(function(el){try{var url=this.href.toLowerCase();if(url.indexOf("http")==0&&(!url.match(internal_link)&&!(extExclude&&url.match(extExclude))||extInclude&&url.match(extInclude))&&!(extCssExclude&&$(this).parents(extCssExclude).length>0)&&!(extCssExplicit&&$(this).parents(extCssExplicit).length<
1))external_links.push(this);else if(this.tagName!="AREA"&&url.indexOf("mailto:")==0&&!(extCssExclude&&$(this).parents(extCssExclude).length>0)&&!(extCssExplicit&&$(this).parents(extCssExplicit).length<1))mailto_links.push(this)}catch(error){return false}});if(settings.extlink.extClass)Drupal.extlink.applyClassAndSpan(external_links,settings.extlink.extClass);if(settings.extlink.mailtoClass)Drupal.extlink.applyClassAndSpan(mailto_links,settings.extlink.mailtoClass);if(settings.extlink.extTarget)$(external_links).attr("target",
settings.extlink.extTarget);Drupal.extlink=Drupal.extlink||{};Drupal.extlink.popupClickHandler=Drupal.extlink.popupClickHandler||function(){if(settings.extlink.extAlert)return confirm(settings.extlink.extAlertText)};$(external_links).click(function(e){return Drupal.extlink.popupClickHandler(e)})};Drupal.extlink.applyClassAndSpan=function(links,class_name){var $links_to_process;if(Drupal.settings.extlink.extImgClass)$links_to_process=$(links);else{var links_with_images=$(links).find("img").parents("a");
$links_to_process=$(links).not(links_with_images)}$links_to_process.addClass(class_name);var i;var length=$links_to_process.length;for(i=0;i<length;i++){var $link=$($links_to_process[i]);if($link.css("display")=="inline"||$link.css("display")=="inline-block")if(class_name==Drupal.settings.extlink.mailtoClass)$link.append('<span class="'+class_name+'"><span class="element-invisible"> '+Drupal.settings.extlink.mailtoLabel+"</span></span>");else $link.append('<span class="'+class_name+'"><span class="element-invisible"> '+
Drupal.settings.extlink.extLabel+"</span></span>")}};Drupal.behaviors.extlink=Drupal.behaviors.extlink||{};Drupal.behaviors.extlink.attach=function(context,settings){if(typeof extlinkAttach==="function")extlinkAttach(context);else Drupal.extlink.attach(context,settings)}})(jQuery);;/**/
Drupal.apachesolr_autocomplete={processOne:function(key,settings,context){jQuery(".apachesolr-autocomplete[data-apachesolr-autocomplete-id='"+key+"']",context).apachesolr_autocomplete(settings.path,{inputClass:"",loadingClass:"throbbing",selectFirst:false,matchContains:false,matchSubset:false,max:50,scroll:true,scrollHeight:360,dataType:"json",parse:function(data){return jQuery.map(data,function(item){return{data:item,value:item.display,result:item.key}})},formatItem:function(item){return item.display}}).result(function(item,
element){jQuery(this).closest("form").submit()}).addClass("form-autocomplete")}};Drupal.behaviors.apachesolr_autocomplete={attach:function(context){if(!Drupal.settings.apachesolr_autocomplete||!Drupal.settings.apachesolr_autocomplete.forms)return;jQuery.each(Drupal.settings.apachesolr_autocomplete.forms,function(key,settings){Drupal.apachesolr_autocomplete.processOne(key,settings,context)})}};;/**/
/*
 * jQuery Autocomplete plugin 1.1
 *
 * Copyright (c) 2009 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

;(function($) {

$.fn.extend({
	apachesolr_autocomplete: function(urlOrData, options) {
		var isUrl = typeof urlOrData == "string";
		options = $.extend({}, $.Autocompleter.defaults, {
			url: isUrl ? urlOrData : null,
			data: isUrl ? null : urlOrData,
			delay: isUrl ? $.Autocompleter.defaults.delay : 10,
			max: options && !options.scroll ? 10 : 150
		}, options);

		// if highlight is set to false, replace it with a do-nothing function
		options.highlight = options.highlight || function(value) { return value; };

		// if the formatMatch option is not specified, then use formatItem for backwards compatibility
		options.formatMatch = options.formatMatch || options.formatItem;
		return this.each(function() {
			new $.Autocompleter(this, options);
		});
	},
	result: function(handler) {
		return this.bind("result", handler);
	},
	search: function(handler) {
		return this.trigger("search", [handler]);
	},
	flushCache: function() {
		return this.trigger("flushCache");
	},
	setOptions: function(options){
		return this.trigger("setOptions", [options]);
	},
	unautocomplete: function() {
		return this.trigger("unautocomplete");
	}
});

$.Autocompleter = function(input, options) {

	var KEY = {
		UP: 38,
		DOWN: 40,
		DEL: 46,
		TAB: 9,
		RETURN: 13,
		ESC: 27,
		COMMA: 188,
		PAGEUP: 33,
		PAGEDOWN: 34,
		BACKSPACE: 8
	};

	// Create $ object for input element
	var $input = $(input).attr("autocomplete", "off").addClass(options.inputClass);

	var timeout;
	var previousValue = "";
	var cache = $.Autocompleter.Cache(options);
	var hasFocus = 0;
	var lastKeyPressCode;
	var config = {
		mouseDownOnSelect: false
	};
	var select = $.Autocompleter.Select(options, input, selectCurrent, config);

	var blockSubmit;

	// prevent form submit in opera when selecting with return key
	navigator.userAgent.indexOf('Opera') > -1 && $(input.form).bind("submit.autocomplete", function() {
		if (blockSubmit) {
			blockSubmit = false;
			return false;
		}
	});

	// only opera doesn't trigger keydown multiple times while pressed, others don't work with keypress at all
	$input.bind((navigator.userAgent.indexOf('Opera') > -1 ? "keypress" : "keydown") + ".autocomplete", function(event) {
		// a keypress means the input has focus
		// avoids issue where input had focus before the autocomplete was applied
		hasFocus = 1;
		// track last key pressed
		lastKeyPressCode = event.keyCode;
		switch(event.keyCode) {

			case KEY.UP:
				event.preventDefault();
				if ( select.visible() ) {
					select.prev();
				} else {
					onChange(0, true);
				}
				break;

			case KEY.DOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.next();
				} else {
					onChange(0, true);
				}
				break;

			case KEY.PAGEUP:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageUp();
				} else {
					onChange(0, true);
				}
				break;

			case KEY.PAGEDOWN:
				event.preventDefault();
				if ( select.visible() ) {
					select.pageDown();
				} else {
					onChange(0, true);
				}
				break;

			// matches also semicolon
			case options.multiple && $.trim(options.multipleSeparator) == "," && KEY.COMMA:
			case KEY.TAB:
			case KEY.RETURN:
				if( selectCurrent() ) {
					// stop default to prevent a form submit, Opera needs special handling
					event.preventDefault();
					blockSubmit = true;
					return false;
				}
				break;

			case KEY.ESC:
				select.hide();
				break;

			default:
				clearTimeout(timeout);
				timeout = setTimeout(onChange, options.delay);
				break;
		}
	}).focus(function(){
		// track whether the field has focus, we shouldn't process any
		// results if the field no longer has focus
		hasFocus++;
	}).blur(function() {
		hasFocus = 0;
		if (!config.mouseDownOnSelect) {
			hideResults();
		}
	}).click(function() {
		// show select when clicking in a focused field
		if ( hasFocus++ > 1 && !select.visible() ) {
			onChange(0, true);
		}
	}).bind("search", function() {
		// TODO why not just specifying both arguments?
		var fn = (arguments.length > 1) ? arguments[1] : null;
		function findValueCallback(q, data) {
			var result;
			if( data && data.length ) {
				for (var i=0; i < data.length; i++) {
					if( data[i].result.toLowerCase() == q.toLowerCase() ) {
						result = data[i];
						break;
					}
				}
			}
			if( typeof fn == "function" ) fn(result);
			else $input.trigger("result", result && [result.data, result.value]);
		}
		$.each(trimWords($input.val()), function(i, value) {
			request(value, findValueCallback, findValueCallback);
		});
	}).bind("flushCache", function() {
		cache.flush();
	}).bind("setOptions", function() {
		$.extend(options, arguments[1]);
		// if we've updated the data, repopulate
		if ( "data" in arguments[1] )
			cache.populate();
	}).bind("unautocomplete", function() {
		select.unbind();
		$input.unbind();
		$(input.form).unbind(".autocomplete");
	});


	function selectCurrent() {
		var selected = select.selected();
		if( !selected )
			return false;

		var v = selected.result;
		previousValue = v;

		if ( options.multiple ) {
			var words = trimWords($input.val());
			if ( words.length > 1 ) {
				var seperator = options.multipleSeparator.length;
				var cursorAt = $(input).selection().start;
				var wordAt, progress = 0;
				$.each(words, function(i, word) {
					progress += word.length;
					if (cursorAt <= progress) {
						wordAt = i;
						return false;
					}
					progress += seperator;
				});
				words[wordAt] = v;
				// TODO this should set the cursor to the right position, but it gets overriden somewhere
				//$.Autocompleter.Selection(input, progress + seperator, progress + seperator);
				v = words.join( options.multipleSeparator );
			}
			v += options.multipleSeparator;
		}

		$input.val(v);
		hideResultsNow();
		$input.trigger("result", [selected.data, selected.value]);
		return true;
	}

	function onChange(crap, skipPrevCheck) {
		if( lastKeyPressCode == KEY.DEL ) {
			select.hide();
			return;
		}

		var currentValue = $input.val();

		if ( !skipPrevCheck && currentValue == previousValue )
			return;

		previousValue = currentValue;

		currentValue = lastWord(currentValue);
		if ( currentValue.length >= options.minChars) {
			$input.addClass(options.loadingClass);
			if (!options.matchCase)
				currentValue = currentValue.toLowerCase();
			request(currentValue, receiveData, hideResultsNow);
		} else {
			stopLoading();
			select.hide();
		}
	};

	function trimWords(value) {
		if (!value)
			return [""];
		if (!options.multiple)
			return [$.trim(value)];
		return $.map(value.split(options.multipleSeparator), function(word) {
			return $.trim(value).length ? $.trim(word) : null;
		});
	}

	function lastWord(value) {
		if ( !options.multiple )
			return value;
		var words = trimWords(value);
		if (words.length == 1)
			return words[0];
		var cursorAt = $(input).selection().start;
		if (cursorAt == value.length) {
			words = trimWords(value)
		} else {
			words = trimWords(value.replace(value.substring(cursorAt), ""));
		}
		return words[words.length - 1];
	}

	// fills in the input box w/the first match (assumed to be the best match)
	// q: the term entered
	// sValue: the first matching result
	function autoFill(q, sValue){
		// autofill in the complete box w/the first match as long as the user hasn't entered in more data
		// if the last user key pressed was backspace, don't autofill
		if( options.autoFill && (lastWord($input.val()).toLowerCase() == q.toLowerCase()) && lastKeyPressCode != KEY.BACKSPACE ) {
			// fill in the value (keep the case the user has typed)
			$input.val($input.val() + sValue.substring(lastWord(previousValue).length));
			// select the portion of the value not typed by the user (so the next character will erase)
			$(input).selection(previousValue.length, previousValue.length + sValue.length);
		}
	};

	function hideResults() {
		clearTimeout(timeout);
		timeout = setTimeout(hideResultsNow, 200);
	};

	function hideResultsNow() {
		var wasVisible = select.visible();
		select.hide();
		clearTimeout(timeout);
		stopLoading();
		if (options.mustMatch) {
			// call search and run callback
			$input.search(
				function (result){
					// if no value found, clear the input box
					if( !result ) {
						if (options.multiple) {
							var words = trimWords($input.val()).slice(0, -1);
							$input.val( words.join(options.multipleSeparator) + (words.length ? options.multipleSeparator : "") );
						}
						else {
							$input.val( "" );
							$input.trigger("result", null);
						}
					}
				}
			);
		}
	};

	function receiveData(q, data) {
		if ( data && data.length && hasFocus ) {
			stopLoading();
			select.display(data, q);
			autoFill(q, data[0].value);
			select.show();
		} else {
			hideResultsNow();
		}
	};

	function request(term, success, failure) {
		if (!options.matchCase)
			term = term.toLowerCase();
		var data = cache.load(term);
		// recieve the cached data
		if (data && data.length) {
			success(term, data);
		// if an AJAX url has been supplied, try loading the data now
		} else if( (typeof options.url == "string") && (options.url.length > 0) ){

			var extraParams = { };
			$.each(options.extraParams, function(key, param) {
				extraParams[key] = typeof param == "function" ? param() : param;
			});

			$.ajax({
				// try to leverage ajaxQueue plugin to abort previous requests
				mode: "abort",
				// limit abortion to this input
				port: "autocomplete" + input.name,
				dataType: options.dataType,
				url: options.url,
				data: $.extend({
					query: lastWord(term),
					limit: options.max
				}, extraParams),
				success: function(data) {
					var parsed = options.parse && options.parse(data) || parse(data);
					cache.add(term, parsed);
					success(term, parsed);
				}
			});
		} else {
			// if we have a failure, we need to empty the list -- this prevents the the [TAB] key from selecting the last successful match
			select.emptyList();
			failure(term);
		}
	};

	function parse(data) {
		var parsed = [];
		var rows = data.split("\n");
		for (var i=0; i < rows.length; i++) {
			var row = $.trim(rows[i]);
			if (row) {
				row = row.split("|");
				parsed[parsed.length] = {
					data: row,
					value: row[0],
					result: options.formatResult && options.formatResult(row, row[0]) || row[0]
				};
			}
		}
		return parsed;
	};

	function stopLoading() {
		$input.removeClass(options.loadingClass);
	};

};

$.Autocompleter.defaults = {
	inputClass: "ac_input",
	resultsClass: "ac_results",
	loadingClass: "ac_loading",
	minChars: 1,
	delay: 400,
	matchCase: false,
	matchSubset: true,
	matchContains: false,
	cacheLength: 10,
	max: 100,
	mustMatch: false,
	extraParams: {},
	selectFirst: true,
	formatItem: function(row) { return row[0]; },
	formatMatch: null,
	autoFill: false,
	width: 0,
	multiple: false,
	multipleSeparator: ", ",
	highlight: function(value, term) {
		return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<strong>$1</strong>");
	},
    scroll: true,
    scrollHeight: 180
};

$.Autocompleter.Cache = function(options) {

	var data = {};
	var length = 0;

	function matchSubset(s, sub) {
		if (!options.matchCase)
			s = s.toLowerCase();
		var i = s.indexOf(sub);
		if (options.matchContains == "word"){
			i = s.toLowerCase().search("\\b" + sub.toLowerCase());
		}
		if (i == -1) return false;
		return i == 0 || options.matchContains;
	};

	function add(q, value) {
		if (length > options.cacheLength){
			flush();
		}
		if (!data[q]){
			length++;
		}
		data[q] = value;
	}

	function populate(){
		if( !options.data ) return false;
		// track the matches
		var stMatchSets = {},
			nullData = 0;

		// no url was specified, we need to adjust the cache length to make sure it fits the local data store
		if( !options.url ) options.cacheLength = 1;

		// track all options for minChars = 0
		stMatchSets[""] = [];

		// loop through the array and create a lookup structure
		for ( var i = 0, ol = options.data.length; i < ol; i++ ) {
			var rawValue = options.data[i];
			// if rawValue is a string, make an array otherwise just reference the array
			rawValue = (typeof rawValue == "string") ? [rawValue] : rawValue;

			var value = options.formatMatch(rawValue, i+1, options.data.length);
			if ( value === false )
				continue;

			var firstChar = value.charAt(0).toLowerCase();
			// if no lookup array for this character exists, look it up now
			if( !stMatchSets[firstChar] )
				stMatchSets[firstChar] = [];

			// if the match is a string
			var row = {
				value: value,
				data: rawValue,
				result: options.formatResult && options.formatResult(rawValue) || value
			};

			// push the current match into the set list
			stMatchSets[firstChar].push(row);

			// keep track of minChars zero items
			if ( nullData++ < options.max ) {
				stMatchSets[""].push(row);
			}
		};

		// add the data items to the cache
		$.each(stMatchSets, function(i, value) {
			// increase the cache size
			options.cacheLength++;
			// add to the cache
			add(i, value);
		});
	}

	// populate any existing data
	setTimeout(populate, 25);

	function flush(){
		data = {};
		length = 0;
	}

	return {
		flush: flush,
		add: add,
		populate: populate,
		load: function(q) {
			if (!options.cacheLength || !length)
				return null;
			/*
			 * if dealing w/local data and matchContains than we must make sure
			 * to loop through all the data collections looking for matches
			 */
			if( !options.url && options.matchContains ){
				// track all matches
				var csub = [];
				// loop through all the data grids for matches
				for( var k in data ){
					// don't search through the stMatchSets[""] (minChars: 0) cache
					// this prevents duplicates
					if( k.length > 0 ){
						var c = data[k];
						$.each(c, function(i, x) {
							// if we've got a match, add it to the array
							if (matchSubset(x.value, q)) {
								csub.push(x);
							}
						});
					}
				}
				return csub;
			} else
			// if the exact item exists, use it
			if (data[q]){
				return data[q];
			} else
			if (options.matchSubset) {
				for (var i = q.length - 1; i >= options.minChars; i--) {
					var c = data[q.substr(0, i)];
					if (c) {
						var csub = [];
						$.each(c, function(i, x) {
							if (matchSubset(x.value, q)) {
								csub[csub.length] = x;
							}
						});
						return csub;
					}
				}
			}
			return null;
		}
	};
};

$.Autocompleter.Select = function (options, input, select, config) {
	var CLASSES = {
		ACTIVE: "ac_over"
	};

	var listItems,
		active = -1,
		data,
		term = "",
		needsInit = true,
		element,
		list;

	// Create results
	function init() {
		if (!needsInit)
			return;
			if ($("body").hasClass("page-search") || $("body").hasClass("hcl-tech")) {
				element = $("<div/>")
				.hide()
				.addClass(options.resultsClass)
				.css("position", "absolute")
				.appendTo(document.body);
			}
			else {
				element = $("<div/>")
				.hide()
				.addClass(options.resultsClass)
				.css("position", "absolute")
				.insertAfter("#search-combobox input");
				// .appendTo("#search-combobox");
			}

		list = $("<ul/>").attr('role', 'listbox').attr('id', 'search-listbox').appendTo(element).mouseover( function(event) {
			if(target(event).nodeName && target(event).nodeName.toUpperCase() == 'LI') {
	            active = $("li", list).removeClass(CLASSES.ACTIVE).index(target(event));
			    $(target(event)).addClass(CLASSES.ACTIVE);
					if ($('.top_search_form .search-form-block-content-wrapper input.custom-search-box').length) {
						var item_id = $(target(event)).attr('id');
						$('.top_search_form .search-form-block-content-wrapper input.custom-search-box').attr('aria-activedescendant', item_id);
					}
	        }
		}).click(function(event) {
			$(target(event)).addClass(CLASSES.ACTIVE);
			if ($('.top_search_form .search-form-block-content-wrapper input.custom-search-box').length) {
				var item_id = $(target(event)).attr('id');
				$('.top_search_form .search-form-block-content-wrapper input.custom-search-box').attr('aria-activedescendant', item_id);
			}
			select();
			// TODO provide option to avoid setting focus again after selection? useful for cleanup-on-focus
			input.focus();
			return false;
		}).mousedown(function() {
			config.mouseDownOnSelect = true;
		}).mouseup(function() {
			config.mouseDownOnSelect = false;
		});

		if( options.width > 0 )
			element.css("width", options.width);

		needsInit = false;
	}

	function target(event) {
		var element = event.target;
		while(element && element.tagName != "LI")
			element = element.parentNode;
		// more fun with IE, sometimes event.target is empty, just ignore it then
		if(!element)
			return [];
		return element;
	}

	function moveSelect(step) {
		listItems.slice(active, active + 1).removeClass(CLASSES.ACTIVE);
		movePosition(step);
        var activeItem = listItems.slice(active, active + 1).addClass(CLASSES.ACTIVE);
				if ($('.top_search_form .search-form-block-content-wrapper input.custom-search-box').length) {
					var item_id = listItems.slice(active, active + 1).attr('id');
					$('.top_search_form .search-form-block-content-wrapper input.custom-search-box').attr('aria-activedescendant', item_id);
				}
        if(options.scroll) {
            var offset = 0;
            listItems.slice(0, active).each(function() {
				offset += this.offsetHeight;
			});
            if((offset + activeItem[0].offsetHeight - list.scrollTop()) > list[0].clientHeight) {
                list.scrollTop(offset + activeItem[0].offsetHeight - list.innerHeight());
            } else if(offset < list.scrollTop()) {
                list.scrollTop(offset);
            }
        }
	};

	function movePosition(step) {
		active += step;
		if (active < 0) {
			active = listItems.length - 1;
		} else if (active >= listItems.length) {
			active = 0;
		}
	}

	function limitNumberOfItems(available) {
		return options.max && options.max < available
			? options.max
			: available;
	}

	function fillList() {
		list.empty();
		var max = limitNumberOfItems(data.length);
		for (var i=0; i < max; i++) {
			var data_aria_label = '';
			var data_item = data[i].value;
			data_aria_label = $(data_item).attr('data-label');

			if (!data[i])
				continue;
			var formatted = options.formatItem(data[i].data, i+1, max, data[i].value, term);
			if ( formatted === false )
				continue;
			// if ($("body").hasClass('page-node-264291')) {
				var li = $("<li/>").html(data_aria_label).addClass(i%2 == 0 ? "ac_even" : "ac_odd").attr('role', 'option').attr('aria-label', data_aria_label).attr('id', 'result-item-' + i).appendTo(list)[0];
			// }
			// else {
			// 	var li = $("<li/>").html( options.highlight(formatted, term) ).addClass(i%2 == 0 ? "ac_even" : "ac_odd").attr('role', 'option').attr('aria-label', data_aria_label).attr('id', 'result-item-' + i).appendTo(list)[0];
			// }
			$.data(li, "ac_data", data[i]);
		}	`																																										`
		listItems = list.find("li");
		if ( options.selectFirst ) {
			listItems.slice(0, 1).addClass(CLASSES.ACTIVE);
			active = 0;
		}
		// apply bgiframe if available
		if ( $.fn.bgiframe )
			list.bgiframe();
	}

	return {
		display: function(d, q) {
			init();
			data = d;
			term = q;
			fillList();
		},
		next: function() {
			moveSelect(1);
		},
		prev: function() {
			moveSelect(-1);
		},
		pageUp: function() {
			if (active != 0 && active - 8 < 0) {
				moveSelect( -active );
			} else {
				moveSelect(-8);
			}
		},
		pageDown: function() {
			if (active != listItems.length - 1 && active + 8 > listItems.length) {
				moveSelect( listItems.length - 1 - active );
			} else {
				moveSelect(8);
			}
		},
		hide: function() {
			element && element.hide();
			listItems && listItems.removeClass(CLASSES.ACTIVE);
			active = -1;
		},
		visible : function() {
			return element && element.is(":visible");
		},
		current: function() {
			return this.visible() && (listItems.filter("." + CLASSES.ACTIVE)[0] || options.selectFirst && listItems[0]);
		},
		show: function() {
			var offset = $(input).offset();
			element.css({
				width: typeof options.width == "string" || options.width > 0 ? options.width : $(input).outerWidth(),
				top: offset.top + input.offsetHeight,
				left: offset.left
			}).show();
            if(options.scroll) {
                list.scrollTop(0);
                list.css({
					maxHeight: options.scrollHeight,
					overflow: 'auto'
				});

                if((navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) && typeof document.body.style.maxHeight === "undefined") {
					var listHeight = 0;
					listItems.each(function() {
						listHeight += this.offsetHeight;
					});
					var scrollbarsVisible = listHeight > options.scrollHeight;
                    list.css('height', scrollbarsVisible ? options.scrollHeight : listHeight );
					if (!scrollbarsVisible) {
						// IE doesn't recalculate width when scrollbar disappears
						listItems.width( list.width() - parseInt(listItems.css("padding-left")) - parseInt(listItems.css("padding-right")) );
					}
                }

            }
		},
		selected: function() {
			var selected = listItems && listItems.filter("." + CLASSES.ACTIVE).removeClass(CLASSES.ACTIVE);
			return selected && selected.length && $.data(selected[0], "ac_data");
		},
		emptyList: function (){
			list && list.empty();
		},
		unbind: function() {
			element && element.remove();
		}
	};
};

$.fn.selection = function(start, end) {
	if (start !== undefined) {
		return this.each(function() {
			if( this.createTextRange ){
				var selRange = this.createTextRange();
				if (end === undefined || start == end) {
					selRange.move("character", start);
					selRange.select();
				} else {
					selRange.collapse(true);
					selRange.moveStart("character", start);
					selRange.moveEnd("character", end);
					selRange.select();
				}
			} else if( this.setSelectionRange ){
				this.setSelectionRange(start, end);
			} else if( this.selectionStart ){
				this.selectionStart = start;
				this.selectionEnd = end;
			}
		});
	}
	var field = this[0];
	if ( field.createTextRange ) {
		var range = document.selection.createRange(),
			orig = field.value,
			teststring = "<->",
			textLength = range.text.length;
		range.text = teststring;
		var caretAt = field.value.indexOf(teststring);
		field.value = orig;
		this.selection(caretAt, caretAt + textLength);
		return {
			start: caretAt,
			end: caretAt + textLength
		}
	} else if( field.selectionStart !== undefined ){
		return {
			start: field.selectionStart,
			end: field.selectionEnd
		}
	}
};

})(jQuery);
;/**/
/**
* @file
* Javascript, modifications of DOM.
*
* Manipulates links to include jquery load funciton
*/

(function ($) {
  Drupal.behaviors.jquery_ajax_load = {
    attach: function (context, settings) {
      jQuery.ajaxSetup ({
      // Disable caching of AJAX responses
        cache: false
      });

      var trigger = Drupal.settings.jquery_ajax_load.trigger;
      var target = Drupal.settings.jquery_ajax_load.target;
      // Puede ser más de un valor, hay que usar foreach()
      $(trigger).once(function() {
        var html_string = $(this).attr( 'href' );
        // Hay que validar si la ruta trae la URL del sitio
        $(this).attr( 'href' , target );
        var data_target = $(this).attr( 'data-target' );
        if (typeof data_target === 'undefined' ) {
          data_target = target;
        }
        else {
          data_target = '#' + data_target;
        }
        $(this).click(function(evt) {
          evt.preventDefault();
          jquery_ajax_load_load($(this), data_target, html_string);
        });
      });
      $(trigger).removeClass(trigger);
    }
  };

// Handles link calls
  function jquery_ajax_load_load(el, target, url) {
    var module_path = Drupal.settings.jquery_ajax_load.module_path;
    var toggle = Drupal.settings.jquery_ajax_load.toggle;
    var base_path = Drupal.settings.jquery_ajax_load.base_path;
    var animation = Drupal.settings.jquery_ajax_load.animation;
    if( toggle && $(el).hasClass( "jquery_ajax_load_open" ) ) {
      $(el).removeClass( "jquery_ajax_load_open" );
      if ( animation ) {
        $(target).hide('slow', function() {
          $(target).empty();
        });
      }
      else {
        $(target).empty();
      }
    }
    else {
      var loading_html = '';
      loading_html = '<div class="jquery-ajax-load-loading">';
      loading_html +=Drupal.t('Loading');
      loading_html += '... <img src="/';
      loading_html += module_path;
      loading_html += '/jquery_ajax_load_loading.gif">';
      loading_html += '</div>';
      $(target).html(loading_html);
      $(target).load(base_path + 'jquery_ajax_load/get' + url, function( response, status, xhr ) {
        if ( status == "error" ) {
          var msg = "Sorry but there was an error: ";
          $(target).html( msg + xhr.status + " " + xhr.statusText );
        }
        else {
          if ( animation ) {
            $(target).hide();
            $(target).show('slow')
          }
          Drupal.attachBehaviors(target);
        }
      });
      $(el).addClass( "jquery_ajax_load_open" );
    }
  }
}(jQuery));
;/**/
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Drupal.progressBar = function (id, updateCallback, method, errorCallback) {
  var pb = this;
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress-wrapper" aria-live="polite"></div>');
  this.element.html('<div id ="' + id + '" class="progress progress-striped active">' +
                    '<div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">' +
                    '<div class="percentage sr-only"></div>' +
                    '</div></div>' +
                    '</div><div class="percentage pull-right"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Drupal.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.progress-bar', this.element).css('width', percentage + '%');
    $('div.progress-bar', this.element).attr('aria-valuenow', percentage);
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Drupal.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Drupal.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Drupal.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Drupal.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="alert alert-block alert-error"><a class="close" data-dismiss="alert" href="#">&times;</a><h4>Error message</h4></div>').append(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;/**/
/**
 * @file
 *
 * Implement a modal form.
 *
 * @see modal.inc for documentation.
 *
 * This javascript relies on the CTools ajax responder.
 */

(function ($) {
  // Make sure our objects are defined.
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.Modal = Drupal.CTools.Modal || {};

  /**
   * Display the modal
   *
   * @todo -- document the settings.
   */
  Drupal.CTools.Modal.show = function(choice) {
    var opts = {};

    if (choice && typeof choice == 'string' && Drupal.settings[choice]) {
      // This notation guarantees we are actually copying it.
      $.extend(true, opts, Drupal.settings[choice]);
    }
    else if (choice) {
      $.extend(true, opts, choice);
    }

    var defaults = {
      modalTheme: 'CToolsModalDialog',
      throbberTheme: 'CToolsModalThrobber',
      animation: 'show',
      animationSpeed: 'fast',
      modalSize: {
        type: 'scale',
        width: .8,
        height: .8,
        addWidth: 0,
        addHeight: 0,
        // How much to remove from the inner content to make space for the
        // theming.
        contentRight: 25,
        contentBottom: 45
      },
      modalOptions: {
        opacity: .55,
        background: '#fff'
      },
      modalClass: 'default'
    };

    var settings = {};
    $.extend(true, settings, defaults, Drupal.settings.CToolsModal, opts);

    if (Drupal.CTools.Modal.currentSettings && Drupal.CTools.Modal.currentSettings != settings) {
      Drupal.CTools.Modal.modal.remove();
      Drupal.CTools.Modal.modal = null;
    }

    Drupal.CTools.Modal.currentSettings = settings;

    var resize = function(e) {
      // When creating the modal, it actually exists only in a theoretical
      // place that is not in the DOM. But once the modal exists, it is in the
      // DOM so the context must be set appropriately.
      var context = e ? document : Drupal.CTools.Modal.modal;

      if (Drupal.CTools.Modal.currentSettings.modalSize.type == 'scale') {
        var width = $(window).width() * Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = $(window).height() * Drupal.CTools.Modal.currentSettings.modalSize.height;
      }
      else {
        var width = Drupal.CTools.Modal.currentSettings.modalSize.width;
        var height = Drupal.CTools.Modal.currentSettings.modalSize.height;
      }

      // Use the additionol pixels for creating the width and height.
      $('div.ctools-modal-content', context).css({
        'width': width + Drupal.CTools.Modal.currentSettings.modalSize.addWidth + 'px',
        'height': height + Drupal.CTools.Modal.currentSettings.modalSize.addHeight + 'px'
      });
      $('div.ctools-modal-content .modal-content', context).css({
        'width': (width - Drupal.CTools.Modal.currentSettings.modalSize.contentRight) + 'px',
        'height': (height - Drupal.CTools.Modal.currentSettings.modalSize.contentBottom) + 'px'
      });
    }

    if (!Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.modal = $(Drupal.theme(settings.modalTheme));
      if (settings.modalSize.type == 'scale') {
        $(window).bind('resize', resize);
      }
    }

    resize();

    $('span.modal-title', Drupal.CTools.Modal.modal).html(Drupal.CTools.Modal.currentSettings.loadingText);
    Drupal.CTools.Modal.modalContent(Drupal.CTools.Modal.modal, settings.modalOptions, settings.animation, settings.animationSpeed, settings.modalClass);
    $('#modalContent .modal-content').html(Drupal.theme(settings.throbberTheme)).addClass('ctools-modal-loading');

    // Position autocomplete results based on the scroll position of the modal.
    $('#modalContent .modal-content').delegate('input.form-autocomplete', 'keyup', function() {
      $('#autocomplete').css('top', $(this).position().top + $(this).outerHeight() + $(this).offsetParent().filter('#modal-content').scrollTop());
    });
  };

  /**
   * Hide the modal
   */
  Drupal.CTools.Modal.dismiss = function() {
    if (Drupal.CTools.Modal.modal) {
      Drupal.CTools.Modal.unmodalContent(Drupal.CTools.Modal.modal);
    }
  };

  /**
   * Provide the HTML to create the modal dialog.
   */
  Drupal.theme.prototype.CToolsModalDialog = function () {
    var html = ''
    html += '<div id="ctools-modal">'
    html += '  <div class="ctools-modal-content">' // panels-modal-content
    html += '    <div class="modal-header">';
    html += '      <a class="close" href="#">';
    html +=          Drupal.CTools.Modal.currentSettings.closeText + Drupal.CTools.Modal.currentSettings.closeImage;
    html += '      </a>';
    html += '      <span id="modal-title" class="modal-title">&nbsp;</span>';
    html += '    </div>';
    html += '    <div id="modal-content" class="modal-content">';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';

    return html;
  }

  /**
   * Provide the HTML to create the throbber.
   */
  Drupal.theme.prototype.CToolsModalThrobber = function () {
    var html = '';
    html += '<div id="modal-throbber">';
    html += '  <div class="modal-throbber-wrapper">';
    html +=      Drupal.CTools.Modal.currentSettings.throbber;
    html += '  </div>';
    html += '</div>';

    return html;
  };

  /**
   * Figure out what settings string to use to display a modal.
   */
  Drupal.CTools.Modal.getSettings = function (object) {
    var match = $(object).attr('class').match(/ctools-modal-(\S+)/);
    if (match) {
      return match[1];
    }
  }

  /**
   * Click function for modals that can be cached.
   */
  Drupal.CTools.Modal.clickAjaxCacheLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return Drupal.CTools.AJAX.clickAJAXCacheLink.apply(this);
  };

  /**
   * Handler to prepare the modal for the response
   */
  Drupal.CTools.Modal.clickAjaxLink = function () {
    Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(this));
    return false;
  };

  /**
   * Submit responder to do an AJAX submit on all modal forms.
   */
  Drupal.CTools.Modal.submitAjaxForm = function(e) {
    var $form = $(this);
    var url = $form.attr('action');

    setTimeout(function() { Drupal.CTools.AJAX.ajaxSubmit($form, url); }, 1);
    return false;
  }

  /**
   * Bind links that will open modals to the appropriate function.
   */
  Drupal.behaviors.ZZCToolsModal = {
    attach: function(context) {
      // Bind links
      // Note that doing so in this order means that the two classes can be
      // used together safely.
      /*
       * @todo remimplement the warm caching feature
       $('a.ctools-use-modal-cache', context).once('ctools-use-modal', function() {
         $(this).click(Drupal.CTools.Modal.clickAjaxCacheLink);
         Drupal.CTools.AJAX.warmCache.apply(this);
       });
        */

      $('area.ctools-use-modal, a.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        // Create a drupal ajax object
        var element_settings = {};
        if ($this.attr('href')) {
          element_settings.url = $this.attr('href');
          element_settings.event = 'click';
          element_settings.progress = { type: 'throbber' };
        }
        var base = $this.attr('href');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      // Bind buttons
      $('input.ctools-use-modal, button.ctools-use-modal', context).once('ctools-use-modal', function() {
        var $this = $(this);
        $this.click(Drupal.CTools.Modal.clickAjaxLink);
        var button = this;
        var element_settings = {};

        // AJAX submits specified in this manner automatically submit to the
        // normal form action.
        element_settings.url = Drupal.CTools.Modal.findURL(this);
        if (element_settings.url == '') {
          element_settings.url = $(this).closest('form').attr('action');
        }
        element_settings.event = 'click';
        element_settings.setClick = true;

        var base = $this.attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);

        // Make sure changes to settings are reflected in the URL.
        $('.' + $(button).attr('id') + '-url').change(function() {
          Drupal.ajax[base].options.url = Drupal.CTools.Modal.findURL(button);
        });
      });

      // Bind our custom event to the form submit
      $('#modal-content form', context).once('ctools-use-modal', function() {
        var $this = $(this);
        var element_settings = {};

        element_settings.url = $this.attr('action');
        element_settings.event = 'submit';
        element_settings.progress = { 'type': 'throbber' }
        var base = $this.attr('id');

        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
        Drupal.ajax[base].form = $this;

        $('input[type=submit], button', this).click(function(event) {
          Drupal.ajax[base].element = this;
          this.form.clk = this;
          // Stop autocomplete from submitting.
          if (Drupal.autocompleteSubmit && !Drupal.autocompleteSubmit()) {
            return false;
          }
          // An empty event means we were triggered via .click() and
          // in jquery 1.4 this won't trigger a submit.
          // We also have to check jQuery version to prevent
          // IE8 + jQuery 1.4.4 to break on other events
          // bound to the submit button.
          if (jQuery.fn.jquery === '1.4' && typeof event.bubbles === "undefined") {
            $(this.form).trigger('submit');
            return false;
          }
        });
      });

      // Bind a click handler to allow elements with the 'ctools-close-modal'
      // class to close the modal.
      $('.ctools-close-modal', context).once('ctools-close-modal')
        .click(function() {
          Drupal.CTools.Modal.dismiss();
          return false;
        });
    }
  };

  // The following are implementations of AJAX responder commands.

  /**
   * AJAX responder command to place HTML within the modal.
   */
  Drupal.CTools.Modal.modal_display = function(ajax, response, status) {
    if ($('#modalContent').length == 0) {
      Drupal.CTools.Modal.show(Drupal.CTools.Modal.getSettings(ajax.element));
    }
    $('#modal-title').html(response.title);
    // Simulate an actual page load by scrolling to the top after adding the
    // content. This is helpful for allowing users to see error messages at the
    // top of a form, etc.
    $('#modal-content').html(response.output).scrollTop(0);

    // Attach behaviors within a modal dialog.
    var settings = response.settings || ajax.settings || Drupal.settings;
    Drupal.attachBehaviors('#modalContent', settings);

    if ($('#modal-content').hasClass('ctools-modal-loading')) {
      $('#modal-content').removeClass('ctools-modal-loading');
    }
    else {
      // If the modal was already shown, and we are simply replacing its
      // content, then focus on the first focusable element in the modal.
      // (When first showing the modal, focus will be placed on the close
      // button by the show() function called above.)
      $('#modal-content :focusable:first').focus();
    }
  }

  /**
   * AJAX responder command to dismiss the modal.
   */
  Drupal.CTools.Modal.modal_dismiss = function(command) {
    Drupal.CTools.Modal.dismiss();
    $('link.ctools-temporary-css').remove();
  }

  /**
   * Display loading
   */
  //Drupal.CTools.AJAX.commands.modal_loading = function(command) {
  Drupal.CTools.Modal.modal_loading = function(command) {
    Drupal.CTools.Modal.modal_display({
      output: Drupal.theme(Drupal.CTools.Modal.currentSettings.throbberTheme),
      title: Drupal.CTools.Modal.currentSettings.loadingText
    });
  }

  /**
   * Find a URL for an AJAX button.
   *
   * The URL for this gadget will be composed of the values of items by
   * taking the ID of this item and adding -url and looking for that
   * class. They need to be in the form in order since we will
   * concat them all together using '/'.
   */
  Drupal.CTools.Modal.findURL = function(item) {
    var url = '';
    var url_class = '.' + $(item).attr('id') + '-url';
    $(url_class).each(
      function() {
        var $this = $(this);
        if (url && $this.val()) {
          url += '/';
        }
        url += $this.val();
      });
    return url;
  };


  /**
   * modalContent
   * @param content string to display in the content box
   * @param css obj of css attributes
   * @param animation (fadeIn, slideDown, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   * @param modalClass class added to div#modalContent
   */
  Drupal.CTools.Modal.modalContent = function(content, css, animation, speed, modalClass) {
    // If our animation isn't set, make it just show/pop
    if (!animation) {
      animation = 'show';
    }
    else {
      // If our animation isn't "fadeIn" or "slideDown" then it always is show
      if (animation != 'fadeIn' && animation != 'slideDown') {
        animation = 'show';
      }
    }

    if (!speed) {
      speed = 'fast';
    }

    // Build our base attributes and allow them to be overriden
    css = jQuery.extend({
      position: 'absolute',
      left: '0px',
      margin: '0px',
      background: '#000',
      opacity: '.55'
    }, css);

    // Add opacity handling for IE.
    css.filter = 'alpha(opacity=' + (100 * css.opacity) + ')';
    content.hide();

    // If we already have modalContent, remove it.
    if ($('#modalBackdrop').length) $('#modalBackdrop').remove();
    if ($('#modalContent').length) $('#modalContent').remove();

    // position code lifted from http://www.quirksmode.org/viewport/compatibility.html
    if (self.pageYOffset) { // all except Explorer
    var wt = self.pageYOffset;
    } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
      var wt = document.documentElement.scrollTop;
    } else if (document.body) { // all other Explorers
      var wt = document.body.scrollTop;
    }

    // Get our dimensions

    // Get the docHeight and (ugly hack) add 50 pixels to make sure we dont have a *visible* border below our div
    var docHeight = $(document).height() + 50;
    var docWidth = $(document).width();
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    if( docHeight < winHeight ) docHeight = winHeight;

    // Create our divs
    $('body').append('<div id="modalBackdrop" class="backdrop-' + modalClass + '" style="z-index: 1000; display: none;"></div><div id="modalContent" class="modal-' + modalClass + '" style="z-index: 1001; position: absolute;">' + $(content).html() + '</div>');

    // Get a list of the tabbable elements in the modal content.
    var getTabbableElements = function () {
      var tabbableElements = $('#modalContent :tabbable'),
          radioButtons = tabbableElements.filter('input[type="radio"]');

      // The list of tabbable elements from jQuery is *almost* right. The
      // exception is with groups of radio buttons. The list from jQuery will
      // include all radio buttons, when in fact, only the selected radio button
      // is tabbable, and if no radio buttons in a group are selected, then only
      // the first is tabbable.
      if (radioButtons.length > 0) {
        // First, build up an index of which groups have an item selected or not.
        var anySelected = {};
        radioButtons.each(function () {
          var name = this.name;

          if (typeof anySelected[name] === 'undefined') {
            anySelected[name] = radioButtons.filter('input[name="' + name + '"]:checked').length !== 0;
          }
        });

        // Next filter out the radio buttons that aren't really tabbable.
        var found = {};
        tabbableElements = tabbableElements.filter(function () {
          var keep = true;

          if (this.type == 'radio') {
            if (anySelected[this.name]) {
              // Only keep the selected one.
              keep = this.checked;
            }
            else {
              // Only keep the first one.
              if (found[this.name]) {
                keep = false;
              }
              found[this.name] = true;
            }
          }

          return keep;
        });
      }

      return tabbableElements.get();
    };

    // Keyboard and focus event handler ensures only modal elements gain focus.
    modalEventHandler = function( event ) {
      target = null;
      if ( event ) { //Mozilla
        target = event.target;
      } else { //IE
        event = window.event;
        target = event.srcElement;
      }

      var parents = $(target).parents().get();
      for (var i = 0; i < parents.length; ++i) {
        var position = $(parents[i]).css('position');
        if (position == 'absolute' || position == 'fixed') {
          return true;
        }
      }

      if ($(target).is('#modalContent, body') || $(target).filter('*:visible').parents('#modalContent').length) {
        // Allow the event only if target is a visible child node
        // of #modalContent.
        return true;
      }
      else {
        getTabbableElements()[0].focus();
      }

      event.preventDefault();
    };
    $('body').bind( 'focus', modalEventHandler );
    $('body').bind( 'keypress', modalEventHandler );

    // Keypress handler Ensures you can only TAB to elements within the modal.
    // Based on the psuedo-code from WAI-ARIA 1.0 Authoring Practices section
    // 3.3.1 "Trapping Focus".
    modalTabTrapHandler = function (evt) {
      // We only care about the TAB key.
      if (evt.which != 9) {
        return true;
      }

      var tabbableElements = getTabbableElements(),
          firstTabbableElement = tabbableElements[0],
          lastTabbableElement = tabbableElements[tabbableElements.length - 1],
          singleTabbableElement = firstTabbableElement == lastTabbableElement,
          node = evt.target;

      // If this is the first element and the user wants to go backwards, then
      // jump to the last element.
      if (node == firstTabbableElement && evt.shiftKey) {
        if (!singleTabbableElement) {
          lastTabbableElement.focus();
        }
        return false;
      }
      // If this is the last element and the user wants to go forwards, then
      // jump to the first element.
      else if (node == lastTabbableElement && !evt.shiftKey) {
        if (!singleTabbableElement) {
          firstTabbableElement.focus();
        }
        return false;
      }
      // If this element isn't in the dialog at all, then jump to the first
      // or last element to get the user into the game.
      else if ($.inArray(node, tabbableElements) == -1) {
        // Make sure the node isn't in another modal (ie. WYSIWYG modal).
        var parents = $(node).parents().get();
        for (var i = 0; i < parents.length; ++i) {
          var position = $(parents[i]).css('position');
          if (position == 'absolute' || position == 'fixed') {
            return true;
          }
        }

        if (evt.shiftKey) {
          lastTabbableElement.focus();
        }
        else {
          firstTabbableElement.focus();
        }
      }
    };
    $('body').bind('keydown', modalTabTrapHandler);

    // Create our content div, get the dimensions, and hide it
    var modalContent = $('#modalContent').css('top','-1000px');
    var mdcTop = wt + ( winHeight / 2 ) - (  modalContent.outerHeight() / 2);
    var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);
    $('#modalBackdrop').css(css).css('top', 0).css('height', docHeight + 'px').css('width', docWidth + 'px').show();
    modalContent.css({top: mdcTop + 'px', left: mdcLeft + 'px'}).hide()[animation](speed);

    // Bind a click for closing the modalContent
    modalContentClose = function(){close(); return false;};
    $('.close').bind('click', modalContentClose);

    // Bind a keypress on escape for closing the modalContent
    modalEventEscapeCloseHandler = function(event) {
      if (event.keyCode == 27) {
        close();
        return false;
      }
    };

    $(document).bind('keydown', modalEventEscapeCloseHandler);

    // Per WAI-ARIA 1.0 Authoring Practices, initial focus should be on the
    // close button, but we should save the original focus to restore it after
    // the dialog is closed.
    var oldFocus = document.activeElement;
    $('.close').focus();

    // Close the open modal content and backdrop
    function close() {
      // Unbind the events
      $(window).unbind('resize',  modalContentResize);
      $('body').unbind( 'focus', modalEventHandler);
      $('body').unbind( 'keypress', modalEventHandler );
      $('body').unbind( 'keydown', modalTabTrapHandler );
      $('.close').unbind('click', modalContentClose);
      $('body').unbind('keypress', modalEventEscapeCloseHandler);
      $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

      // Set our animation parameters and use them
      if ( animation == 'fadeIn' ) animation = 'fadeOut';
      if ( animation == 'slideDown' ) animation = 'slideUp';
      if ( animation == 'show' ) animation = 'hide';

      // Close the content
      modalContent.hide()[animation](speed);

      // Remove the content
      $('#modalContent').remove();
      $('#modalBackdrop').remove();

      // Restore focus to where it was before opening the dialog
      $(oldFocus).focus();
    };

    // Move and resize the modalBackdrop and modalContent on window resize.
    modalContentResize = function(){

      // Reset the backdrop height/width to get accurate document size.
      $('#modalBackdrop').css('height', '').css('width', '');

      // Position code lifted from:
      // http://www.quirksmode.org/viewport/compatibility.html
      if (self.pageYOffset) { // all except Explorer
      var wt = self.pageYOffset;
      } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
        var wt = document.documentElement.scrollTop;
      } else if (document.body) { // all other Explorers
        var wt = document.body.scrollTop;
      }

      // Get our heights
      var docHeight = $(document).height();
      var docWidth = $(document).width();
      var winHeight = $(window).height();
      var winWidth = $(window).width();
      if( docHeight < winHeight ) docHeight = winHeight;

      // Get where we should move content to
      var modalContent = $('#modalContent');
      var mdcTop = wt + ( winHeight / 2 ) - ( modalContent.outerHeight() / 2);
      var mdcLeft = ( winWidth / 2 ) - ( modalContent.outerWidth() / 2);

      // Apply the changes
      $('#modalBackdrop').css('height', docHeight + 'px').css('width', docWidth + 'px').show();
      modalContent.css('top', mdcTop + 'px').css('left', mdcLeft + 'px').show();
    };
    $(window).bind('resize', modalContentResize);
  };

  /**
   * unmodalContent
   * @param content (The jQuery object to remove)
   * @param animation (fadeOut, slideUp, show)
   * @param speed (valid animation speeds slow, medium, fast or # in ms)
   */
  Drupal.CTools.Modal.unmodalContent = function(content, animation, speed)
  {
    // If our animation isn't set, make it just show/pop
    if (!animation) { var animation = 'show'; } else {
      // If our animation isn't "fade" then it always is show
      if (( animation != 'fadeOut' ) && ( animation != 'slideUp')) animation = 'show';
    }
    // Set a speed if we dont have one
    if ( !speed ) var speed = 'fast';

    // Unbind the events we bound
    $(window).unbind('resize', modalContentResize);
    $('body').unbind('focus', modalEventHandler);
    $('body').unbind('keypress', modalEventHandler);
    $('body').unbind( 'keydown', modalTabTrapHandler );
    $('.close').unbind('click', modalContentClose);
    $('body').unbind('keypress', modalEventEscapeCloseHandler);
    $(document).trigger('CToolsDetachBehaviors', $('#modalContent'));

    // jQuery magic loop through the instances and run the animations or removal.
    content.each(function(){
      if ( animation == 'fade' ) {
        $('#modalContent').fadeOut(speed, function() {
          $('#modalBackdrop').fadeOut(speed, function() {
            $(this).remove();
          });
          $(this).remove();
        });
      } else {
        if ( animation == 'slide' ) {
          $('#modalContent').slideUp(speed,function() {
            $('#modalBackdrop').slideUp(speed, function() {
              $(this).remove();
            });
            $(this).remove();
          });
        } else {
          $('#modalContent').remove();
          $('#modalBackdrop').remove();
        }
      }
    });
  };

$(function() {
  Drupal.ajax.prototype.commands.modal_display = Drupal.CTools.Modal.modal_display;
  Drupal.ajax.prototype.commands.modal_dismiss = Drupal.CTools.Modal.modal_dismiss;
});

})(jQuery);
;/**/
/**
* Provide the HTML to create the modal dialog.
*/
Drupal.theme.prototype.ModalFormsPopup = function () {
  var html = '';

  html += '<div id="ctools-modal" class="popups-box">';
  html += '  <div class="ctools-modal-content modal-forms-modal-content">';
  html += '    <div class="popups-container">';
  html += '      <div class="modal-header popups-title">';
  html += '        <span id="modal-title" class="modal-title"></span>';
  html += '        <span class="popups-close close">' + Drupal.CTools.Modal.currentSettings.closeText + '</span>';
  html += '        <div class="clear-block"></div>';
  html += '      </div>';
  html += '      <div class="modal-scroll"><div id="modal-content" class="modal-content popups-body"></div></div>';
  html += '    </div>';
  html += '  </div>';
  html += '</div>';

  return html;
}
;/**/
(function($){Drupal.behaviors.custom_search={attach:function(context){if(!Drupal.settings.custom_search.solr)$("form.search-form",context).submit(function(){var $this=$(this);var box=$this.find("input.custom-search-box");if(box.val()!=undefined&&box.val()==""){$this.find("input.custom-search-box").addClass("error");return false}if($this.find("#edit-keys").parents("div.element-invisible").attr("class")=="element-invisible"){$this.find("#edit-keys").val($this.find("#edit-or").val());$this.find("#edit-or").val("")}return true});
$("form.search-form").attr("target",Drupal.settings.custom_search.form_target);$("form.search-form input.custom-search-box",context).bind("click focus",function(e){var $parentForm=$(this).parents("form");var popup=$parentForm.find("fieldset.custom_search-popup");if(popup.find("input,select").length&&!popup.hasClass("opened"))popup.fadeIn().addClass("opened");e.stopPropagation()});$(document).bind("click focus",function(){$("fieldset.custom_search-popup").hide().removeClass("opened")});$(".custom-search-selector input:checkbox",
context).each(function(){var el=$(this);if(el.val()=="c-all")el.change(function(){$(this).parents(".custom-search-selector").find("input:checkbox[value!=c-all]").attr("checked",false)});else if(el.val().substr(0,2)=="c-")el.change(function(){$(".custom-search-selector input:checkbox").each(function(){if($(this).val().substr(0,2)=="o-")$(this).attr("checked",false)});$(this).parents(".custom-search-selector").find("input:checkbox[value=c-all]").attr("checked",false)});else el.change(function(){$(this).parents(".custom-search-selector").find("input:checkbox[value!="+
el.val()+"]").attr("checked",false)})});var popup=$("fieldset.custom_search-popup:not(.custom_search-processed)",context).addClass("custom_search-processed");popup.click(function(e){e.stopPropagation()});popup.append('<a class="custom_search-popup-close" href="#">'+Drupal.t("Close")+"</a>");$("a.custom_search-popup-close").click(function(e){$("fieldset.custom_search-popup.opened").hide().removeClass("opened");e.preventDefault()})}}})(jQuery);;/**/
(function($){Drupal.behaviors.hcl_search_feature_global={attach:function(context){selected_section_options=new Array;$(".form-item-search-section select option").each(function(){selected_section_option=$(this).text().toLowerCase();selected_section_option=selected_section_option.replace(" ","-");selected_section_options.push(selected_section_option)});$(".form-item-search-section select").each(function(){hcl_search_feature_set_section_filter_active_class($(this))});$(".form-item-search-section select").change(function(){hcl_search_feature_set_section_filter_active_class($(this))});
function hcl_search_feature_set_section_filter_active_class(select_element){form_section_element=select_element.parent(".form-item-search-section");selected_section=form_section_element.find(".chosen-single span").text();form_section_element.find(".chosen-single").attr("title",selected_section);selected_section=selected_section.toLowerCase();selected_section=selected_section.replace(" ","-");form_section_element.find(".chosen-single").removeClass(selected_section_options.join(" "));form_section_element.find(".chosen-single").addClass(selected_section)}
$(".dummy-select-selected").click(function(){current_element=$(this);current_element.parents(".dummy-select").toggleClass("collapsed");$.each(current_element.siblings(".dummy-select-dropdown").find("div"),function(index,val){})});$(".dummy-select-selected").keypress(function(e){current_element=$(this);if(e.which==13){e.preventDefault();current_element.parents(".dummy-select").toggleClass("collapsed");$.each(current_element.siblings(".dummy-select-dropdown").find("div"),function(index,val){})}});$(".dummy-select-dropdown div").click(function(){dummy_dropdown_option($(this))});
$(".dummy-select-dropdown div").keypress(function(e){current_element=$(this);if(e.which==13){e.preventDefault();dummy_dropdown_option(current_element)}});$("*").click(function(e){if(!$(e.target).is(".dummy-select *")){$(".dummy-select:not(.collapsed)").addClass("collapsed");$(".dummy-select-dropdown div").removeAttr("tabindex")}});function dummy_dropdown_option(selected_element){selected_text=selected_element.text();selected_val=selected_element.attr("class");selected_element.parent().siblings(".dummy-select-selected").removeClass(selected_section_options.join(" "));
selected_element.parent().siblings(".dummy-select-selected").addClass(selected_val);selected_element.parent().siblings(".dummy-select-selected").text(selected_text);selected_element.parents(".dummy-select").siblings("select").val(selected_val).change();current_element.parents(".dummy-select").toggleClass("collapsed");$(".dummy-select-dropdown div").removeAttr("tabindex")}}}})(jQuery);;/**/
(function($){Drupal.behaviors.feature_question_answer={attach:function(context){qa_related_blocks_height_adjust();$("#quicktabs-topic_list_qa ul a").click(function(){windowCurrentWidth=$(window).width();if(windowCurrentWidth<=768)$(window).scrollTo($("#quicktabs-container-topic_list_qa").offset().top)});$(window).resize(function(){qa_related_blocks_height_adjust()});function qa_related_blocks_height_adjust(){$(".group-qa-related-content .field").height("auto");related_click_height=0;$(".group-qa-related-content .field").each(function(){if(related_click_height<
$(this).outerHeight())related_click_height=$(this).outerHeight()});$(".group-qa-related-content .field").height(related_click_height)}}}})(jQuery);;/**/
/**
 * @file
 * Javascript required for a simple collapsible div.
 *
 * Creating a collapsible div with this doesn't take too much. There are
 * three classes necessary:
 *
 * - ctools-collapsible-container: This is the overall container that will be
 *   collapsible. This must be a div.
 * - ctools-collapsible-handle: This is the title area, and is what will be
 *   visible when it is collapsed. This can be any block element, such as div
 *   or h2.
 * - ctools-collapsible-content: This is the ocntent area and will only be
 *   visible when expanded. This must be a div.
 *
 * Adding 'ctools-collapsible-remember' to the container class will cause the
 * state of the container to be stored in a cookie, and remembered from page
 * load to page load. This will only work if the container has a unique ID, so
 * very carefully add IDs to your containers.
 *
 * If the class 'ctools-no-container' is placed on the container, the container
 * will be the handle. The content will be found by appending '-content' to the
 * id of the handle. The ctools-collapsible-handle and
 * ctools-collapsible-content classes will not be required in that case, and no
 * restrictions on what of data the container is are placed. Like
 * ctools-collapsible-remember this requires an id to eist.
 *
 * The content will be 'open' unless the container class has 'ctools-collapsed'
 * as a class, which will cause the container to draw collapsed.
 */

(function ($) {
  // All CTools tools begin with this if they need to use the CTools namespace.
  if (!Drupal.CTools) {
    Drupal.CTools = {};
  }

  /**
   * Object to store state.
   *
   * This object will remember the state of collapsible containers. The first
   * time a state is requested, it will check the cookie and set up the variable.
   * If a state has been changed, when the window is unloaded the state will be
   * saved.
   */
  Drupal.CTools.Collapsible = {
    state: {},
    stateLoaded: false,
    stateChanged: false,
    cookieString: 'ctools-collapsible-state=',

    /**
     * Get the current collapsed state of a container.
     *
     * If set to 1, the container is open. If set to -1, the container is
     * collapsed. If unset the state is unknown, and the default state should
     * be used.
     */
    getState: function (id) {
      if (!this.stateLoaded) {
        this.loadCookie();
      }

      return this.state[id];
    },

    /**
     * Set the collapsed state of a container for subsequent page loads.
     *
     * Set the state to 1 for open, -1 for collapsed.
     */
    setState: function (id, state) {
      if (!this.stateLoaded) {
        this.loadCookie();
      }

      this.state[id] = state;

      if (!this.stateChanged) {
        this.stateChanged = true;
        $(window).unload(this.unload);
      }
    },

    /**
     * Check the cookie and load the state variable.
     */
    loadCookie: function () {
      // If there is a previous instance of this cookie
      if (document.cookie.length > 0) {
        // Get the number of characters that have the list of values
        // from our string index.
        offset = document.cookie.indexOf(this.cookieString);

        // If its positive, there is a list!
        if (offset != -1) {
          offset += this.cookieString.length;
          var end = document.cookie.indexOf(';', offset);
          if (end == -1) {
            end = document.cookie.length;
          }

          // Get a list of all values that are saved on our string
          var cookie = unescape(document.cookie.substring(offset, end));

          if (cookie != '') {
            var cookieList = cookie.split(',');
            for (var i = 0; i < cookieList.length; i++) {
              var info = cookieList[i].split(':');
              this.state[info[0]] = info[1];
            }
          }
        }
      }

      this.stateLoaded = true;
    },

    /**
     * Turn the state variable into a string and store it in the cookie.
     */
    storeCookie: function () {
      var cookie = '';

      // Get a list of IDs, saparated by comma
      for (i in this.state) {
        if (cookie != '') {
          cookie += ',';
        }
        cookie += i + ':' + this.state[i];
      }

      // Save this values on the cookie
      document.cookie = this.cookieString + escape(cookie) + ';path=/';
    },

    /**
     * Respond to the unload event by storing the current state.
     */
    unload: function() {
      Drupal.CTools.Collapsible.storeCookie();
    }
  };

  // Set up an array for callbacks.
  Drupal.CTools.CollapsibleCallbacks = [];
  Drupal.CTools.CollapsibleCallbacksAfterToggle = [];

  /**
   * Bind collapsible behavior to a given container.
   */
  Drupal.CTools.bindCollapsible = function () {
    var $container = $(this);

    // Allow the specification of the 'no container' class, which means the
    // handle and the container can be completely independent.
    if ($container.hasClass('ctools-no-container') && $container.attr('id')) {
      // In this case, the container *is* the handle and the content is found
      // by adding '-content' to the id. Obviously, an id is required.
      var handle = $container;
      var content = $('#' + $container.attr('id') + '-content');
    }
    else {
      var handle = $container.children('.ctools-collapsible-handle');
      var content = $container.children('div.ctools-collapsible-content');
    }

    if (content.length) {
      // Create the toggle item and place it in front of the toggle.
      var toggle = $('<span class="ctools-toggle"></span>');
      handle.before(toggle);

      // If the remember class is set, check to see if we have a remembered
      // state stored.
      if ($container.hasClass('ctools-collapsible-remember') && $container.attr('id')) {
        var state = Drupal.CTools.Collapsible.getState($container.attr('id'));
        if (state == 1) {
          $container.removeClass('ctools-collapsed');
        }
        else if (state == -1) {
          $container.addClass('ctools-collapsed');
        }
      }

      // If we should start collapsed, do so:
      if ($container.hasClass('ctools-collapsed')) {
        toggle.toggleClass('ctools-toggle-collapsed');
        content.hide();
      }

      var afterToggle = function () {
        if (Drupal.CTools.CollapsibleCallbacksAfterToggle) {
          for (i in Drupal.CTools.CollapsibleCallbacksAfterToggle) {
            Drupal.CTools.CollapsibleCallbacksAfterToggle[i]($container, handle, content, toggle);
          }
        }
      }

      var clickMe = function () {
        if (Drupal.CTools.CollapsibleCallbacks) {
          for (i in Drupal.CTools.CollapsibleCallbacks) {
            Drupal.CTools.CollapsibleCallbacks[i]($container, handle, content, toggle);
          }
        }

        // If the container is a table element slideToggle does not do what
        // we want, so use toggle() instead.
        if ($container.is('table')) {
          content.toggle(0, afterToggle);
        }
        else {
          content.slideToggle(100, afterToggle);
        }

        $container.toggleClass('ctools-collapsed');
        toggle.toggleClass('ctools-toggle-collapsed');

        // If we're supposed to remember the state of this class, do so.
        if ($container.hasClass('ctools-collapsible-remember') && $container.attr('id')) {
          var state = toggle.hasClass('ctools-toggle-collapsed') ? -1 : 1;
          Drupal.CTools.Collapsible.setState($container.attr('id'), state);
        }

        return false;
      }

      // Let both the toggle and the handle be clickable.
      toggle.click(clickMe);
      handle.click(clickMe);
    }
  };

  /**
   * Support Drupal's 'behaviors' system for binding.
   */
  Drupal.behaviors.CToolsCollapsible = {
    attach: function(context) {
      $('.ctools-collapsible-container', context).once('ctools-collapsible', Drupal.CTools.bindCollapsible);
    }
  }
})(jQuery);
;/**/
/*
 ### jQuery Multiple File Upload Plugin v1.47 - 2010-03-26 ###
 * Home: http://www.fyneworks.com/jquery/multiple-file-upload/
 * Code: http://code.google.com/p/jquery-multifile-plugin/
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 ###
*/

/*# AVOID COLLISIONS #*/
;if(window.jQuery) (function($){
/*# AVOID COLLISIONS #*/
 
	// plugin initialization
	$.fn.MultiFile = function(options){
		if(this.length==0) return this; // quick fail
		
		// Handle API methods
		if(typeof arguments[0]=='string'){
			// Perform API methods on individual elements
			if(this.length>1){
				var args = arguments;
				return this.each(function(){
					$.fn.MultiFile.apply($(this), args);
    });
			};
			// Invoke API method handler
			$.fn.MultiFile[arguments[0]].apply(this, $.makeArray(arguments).slice(1) || []);
			// Quick exit...
			return this;
		};
		
		// Initialize options for this call
		var options = $.extend(
			{}/* new object */,
			$.fn.MultiFile.options/* default options */,
			options || {} /* just-in-time options */
		);
		
		// Empty Element Fix!!!
		// this code will automatically intercept native form submissions
		// and disable empty file elements
		$('form')
		.not('MultiFile-intercepted')
		.addClass('MultiFile-intercepted')
		.submit($.fn.MultiFile.disableEmpty);
		
		//### http://plugins.jquery.com/node/1363
		// utility method to integrate this plugin with others...
		if($.fn.MultiFile.options.autoIntercept){
			$.fn.MultiFile.intercept( $.fn.MultiFile.options.autoIntercept /* array of methods to intercept */ );
			$.fn.MultiFile.options.autoIntercept = null; /* only run this once */
		};
		
		// loop through each matched element
		this
		 .not('.MultiFile-applied')
			.addClass('MultiFile-applied')
		.each(function(){
			//#####################################################################
			// MAIN PLUGIN FUNCTIONALITY - START
			//#####################################################################
			
       // BUG 1251 FIX: http://plugins.jquery.com/project/comments/add/1251
       // variable group_count would repeat itself on multiple calls to the plugin.
       // this would cause a conflict with multiple elements
       // changes scope of variable to global so id will be unique over n calls
       window.MultiFile = (window.MultiFile || 0) + 1;
       var group_count = window.MultiFile;
       
       // Copy parent attributes - Thanks to Jonas Wagner
       // we will use this one to create new input elements
       var MultiFile = {e:this, E:$(this), clone:$(this).clone()};
       
       //===
       
       //# USE CONFIGURATION
       if(typeof options=='number') options = {max:options};
       var o = $.extend({},
        $.fn.MultiFile.options,
        options || {},
   					($.metadata? MultiFile.E.metadata(): ($.meta?MultiFile.E.data():null)) || {}, /* metadata options */
								{} /* internals */
       );
       // limit number of files that can be selected?
       if(!(o.max>0) /*IsNull(MultiFile.max)*/){
        o.max = MultiFile.E.attr('maxlength');
        if(!(o.max>0) /*IsNull(MultiFile.max)*/){
         o.max = (String(MultiFile.e.className.match(/\b(max|limit)\-([0-9]+)\b/gi) || ['']).match(/[0-9]+/gi) || [''])[0];
         if(!(o.max>0)) o.max = -1;
         else           o.max = String(o.max).match(/[0-9]+/gi)[0];
        }
       };
       o.max = new Number(o.max);
       // limit extensions?
       o.accept = o.accept || MultiFile.E.attr('accept') || '';
       if(!o.accept){
        o.accept = (MultiFile.e.className.match(/\b(accept\-[\w\|]+)\b/gi)) || '';
        o.accept = new String(o.accept).replace(/^(accept|ext)\-/i,'');
       };
       
       //===
       
       // APPLY CONFIGURATION
							$.extend(MultiFile, o || {});
       MultiFile.STRING = $.extend({},$.fn.MultiFile.options.STRING,MultiFile.STRING);
       
       //===
       
       //#########################################
       // PRIVATE PROPERTIES/METHODS
       $.extend(MultiFile, {
        n: 0, // How many elements are currently selected?
        slaves: [], files: [],
        instanceKey: MultiFile.e.id || 'MultiFile'+String(group_count), // Instance Key?
        generateID: function(z){ return MultiFile.instanceKey + (z>0 ?'_F'+String(z):''); },
        trigger: function(event, element){
         var handler = MultiFile[event], value = $(element).attr('value');
         if(handler){
          var returnValue = handler(element, value, MultiFile);
          if( returnValue!=null ) return returnValue;
         }
         return true;
        }
       });
       
       //===
       
       // Setup dynamic regular expression for extension validation
       // - thanks to John-Paul Bader: http://smyck.de/2006/08/11/javascript-dynamic-regular-expresions/
       if(String(MultiFile.accept).length>1){
								MultiFile.accept = MultiFile.accept.replace(/\W+/g,'|').replace(/^\W|\W$/g,'');
        MultiFile.rxAccept = new RegExp('\\.('+(MultiFile.accept?MultiFile.accept:'')+')$','gi');
       };
       
       //===
       
       // Create wrapper to hold our file list
       MultiFile.wrapID = MultiFile.instanceKey+'_wrap'; // Wrapper ID?
       MultiFile.E.wrap('<div class="MultiFile-wrap" id="'+MultiFile.wrapID+'"></div>');
       MultiFile.wrapper = $('#'+MultiFile.wrapID+'');
       
       //===
       
       // MultiFile MUST have a name - default: file1[], file2[], file3[]
       MultiFile.e.name = MultiFile.e.name || 'file'+ group_count +'[]';
       
       //===
       
							if(!MultiFile.list){
								// Create a wrapper for the list
								// * OPERA BUG: NO_MODIFICATION_ALLOWED_ERR ('list' is a read-only property)
								// this change allows us to keep the files in the order they were selected
								MultiFile.wrapper.append( '<div class="MultiFile-list" id="'+MultiFile.wrapID+'_list"></div>' );
								MultiFile.list = $('#'+MultiFile.wrapID+'_list');
							};
       MultiFile.list = $(MultiFile.list);
							
       //===
       
       // Bind a new element
       MultiFile.addSlave = function( slave, slave_count ){
								//if(window.console) console.log('MultiFile.addSlave',slave_count);
								
        // Keep track of how many elements have been displayed
        MultiFile.n++;
        // Add reference to master element
        slave.MultiFile = MultiFile;
								
								// BUG FIX: http://plugins.jquery.com/node/1495
								// Clear identifying properties from clones
								if(slave_count>0) slave.id = slave.name = '';
								
        // Define element's ID and name (upload components need this!)
        //slave.id = slave.id || MultiFile.generateID(slave_count);
								if(slave_count>0) slave.id = MultiFile.generateID(slave_count);
								//FIX for: http://code.google.com/p/jquery-multifile-plugin/issues/detail?id=23
        
        // 2008-Apr-29: New customizable naming convention (see url below)
        // http://groups.google.com/group/jquery-dev/browse_frm/thread/765c73e41b34f924#
        slave.name = String(MultiFile.namePattern
         /*master name*/.replace(/\$name/gi,$(MultiFile.clone).attr('name'))
         /*master id  */.replace(/\$id/gi,  $(MultiFile.clone).attr('id'))
         /*group count*/.replace(/\$g/gi,   group_count)//(group_count>0?group_count:''))
         /*slave count*/.replace(/\$i/gi,   slave_count)//(slave_count>0?slave_count:''))
        );
        
        // If we've reached maximum number, disable input slave
        if( (MultiFile.max > 0) && ((MultiFile.n-1) > (MultiFile.max)) )//{ // MultiFile.n Starts at 1, so subtract 1 to find true count
         slave.disabled = true;
        //};
        
        // Remember most recent slave
        MultiFile.current = MultiFile.slaves[slave_count] = slave;
        
								// We'll use jQuery from now on
								slave = $(slave);
        
        // Clear value
        slave.val('').attr('value','')[0].value = '';
        
								// Stop plugin initializing on slaves
								slave.addClass('MultiFile-applied');
								
        // Triggered when a file is selected
        slave.change(function(){
          //if(window.console) console.log('MultiFile.slave.change',slave_count);
 								 
          // Lose focus to stop IE7 firing onchange again
          $(this).blur();
          
          //# Trigger Event! onFileSelect
          if(!MultiFile.trigger('onFileSelect', this, MultiFile)) return false;
          //# End Event!
          
          //# Retrive value of selected file from element
          var ERROR = '', v = String(this.value || ''/*.attr('value)*/);
          
          // check extension
          if(MultiFile.accept && v && !v.match(MultiFile.rxAccept))//{
            ERROR = MultiFile.STRING.denied.replace('$ext', String(v.match(/\.\w{1,4}$/gi)));
           //}
          //};
          
          // Disallow duplicates
										for(var f in MultiFile.slaves)//{
           if(MultiFile.slaves[f] && MultiFile.slaves[f]!=this)//{
  										//console.log(MultiFile.slaves[f],MultiFile.slaves[f].value);
            if(MultiFile.slaves[f].value==v)//{
             ERROR = MultiFile.STRING.duplicate.replace('$file', v.match(/[^\/\\]+$/gi));
            //};
           //};
          //};
          
          // Create a new file input element
          var newEle = $(MultiFile.clone).clone();// Copy parent attributes - Thanks to Jonas Wagner
          //# Let's remember which input we've generated so
          // we can disable the empty ones before submission
          // See: http://plugins.jquery.com/node/1495
          newEle.addClass('MultiFile');
          
          // Handle error
          if(ERROR!=''){
            // Handle error
            MultiFile.error(ERROR);
												
            // 2007-06-24: BUG FIX - Thanks to Adrian Wr�bel <adrian [dot] wrobel [at] gmail.com>
            // Ditch the trouble maker and add a fresh new element
            MultiFile.n--;
            MultiFile.addSlave(newEle[0], slave_count);
            slave.parent().prepend(newEle);
            slave.remove();
            return false;
          };
          
          // Hide this element (NB: display:none is evil!)
          $(this).css({ position:'absolute', top: '-3000px' });
          
          // Add new element to the form
          slave.after(newEle);
          
          // Update list
          MultiFile.addToList( this, slave_count );
          
          // Bind functionality
          MultiFile.addSlave( newEle[0], slave_count+1 );
          
          //# Trigger Event! afterFileSelect
          if(!MultiFile.trigger('afterFileSelect', this, MultiFile)) return false;
          //# End Event!
          
        }); // slave.change()
								
								// Save control to element
								$(slave).data('MultiFile', MultiFile);
								
       };// MultiFile.addSlave
       // Bind a new element
       
       
       
       // Add a new file to the list
       MultiFile.addToList = function( slave, slave_count ){
        //if(window.console) console.log('MultiFile.addToList',slave_count);
								
        //# Trigger Event! onFileAppend
        if(!MultiFile.trigger('onFileAppend', slave, MultiFile)) return false;
        //# End Event!
        
        // Create label elements
        var
         r = $('<div class="MultiFile-label"></div>'),
         v = String(slave.value || ''/*.attr('value)*/),
         a = $('<span class="MultiFile-title" title="'+MultiFile.STRING.selected.replace('$file', v)+'">'+MultiFile.STRING.file.replace('$file', v.match(/[^\/\\]+$/gi)[0])+'</span>'),
         b = $('<a class="MultiFile-remove" href="#'+MultiFile.wrapID+'">'+MultiFile.STRING.remove+'</a>');
        
        // Insert label
        MultiFile.list.append(
         r.append(b, ' ', a)
        );
        
        b
								.click(function(){
         
          //# Trigger Event! onFileRemove
          if(!MultiFile.trigger('onFileRemove', slave, MultiFile)) return false;
          //# End Event!
          
          MultiFile.n--;
          MultiFile.current.disabled = false;
          
          // Remove element, remove label, point to current
										MultiFile.slaves[slave_count] = null;
										$(slave).remove();
										$(this).parent().remove();
										
          // Show most current element again (move into view) and clear selection
          $(MultiFile.current).css({ position:'', top: '' });
										$(MultiFile.current).reset().val('').attr('value', '')[0].value = '';
          
          //# Trigger Event! afterFileRemove
          if(!MultiFile.trigger('afterFileRemove', slave, MultiFile)) return false;
          //# End Event!
										
          return false;
        });
        
        //# Trigger Event! afterFileAppend
        if(!MultiFile.trigger('afterFileAppend', slave, MultiFile)) return false;
        //# End Event!
        
       }; // MultiFile.addToList
       // Add element to selected files list
       
       
       
       // Bind functionality to the first element
       if(!MultiFile.MultiFile) MultiFile.addSlave(MultiFile.e, 0);
       
       // Increment control count
       //MultiFile.I++; // using window.MultiFile
       MultiFile.n++;
							
							// Save control to element
							MultiFile.E.data('MultiFile', MultiFile);
							

			//#####################################################################
			// MAIN PLUGIN FUNCTIONALITY - END
			//#####################################################################
		}); // each element
	};
	
	/*--------------------------------------------------------*/
	
	/*
		### Core functionality and API ###
	*/
	$.extend($.fn.MultiFile, {
  /**
   * This method removes all selected files
   *
   * Returns a jQuery collection of all affected elements.
   *
   * @name reset
   * @type jQuery
   * @cat Plugins/MultiFile
   * @author Diego A. (http://www.fyneworks.com/)
   *
   * @example $.fn.MultiFile.reset();
   */
  reset: function(){
			var settings = $(this).data('MultiFile');
			//if(settings) settings.wrapper.find('a.MultiFile-remove').click();
			if(settings) settings.list.find('a.MultiFile-remove').click();
   return $(this);
  },
  
  
  /**
   * This utility makes it easy to disable all 'empty' file elements in the document before submitting a form.
   * It marks the affected elements so they can be easily re-enabled after the form submission or validation.
   *
   * Returns a jQuery collection of all affected elements.
   *
   * @name disableEmpty
   * @type jQuery
   * @cat Plugins/MultiFile
   * @author Diego A. (http://www.fyneworks.com/)
   *
   * @example $.fn.MultiFile.disableEmpty();
   * @param String class (optional) A string specifying a class to be applied to all affected elements - Default: 'mfD'.
   */
  disableEmpty: function(klass){ klass = (typeof(klass)=='string'?klass:'')||'mfD';
   var o = [];
   $('input:file.MultiFile').each(function(){ if($(this).val()=='') o[o.length] = this; });
   return $(o).each(function(){ this.disabled = true }).addClass(klass);
  },
  
  
		/**
			* This method re-enables 'empty' file elements that were disabled (and marked) with the $.fn.MultiFile.disableEmpty method.
			*
			* Returns a jQuery collection of all affected elements.
			*
			* @name reEnableEmpty
			* @type jQuery
			* @cat Plugins/MultiFile
			* @author Diego A. (http://www.fyneworks.com/)
			*
			* @example $.fn.MultiFile.reEnableEmpty();
			* @param String klass (optional) A string specifying the class that was used to mark affected elements - Default: 'mfD'.
			*/
  reEnableEmpty: function(klass){ klass = (typeof(klass)=='string'?klass:'')||'mfD';
   return $('input:file.'+klass).removeClass(klass).each(function(){ this.disabled = false });
  },
  
  
		/**
			* This method will intercept other jQuery plugins and disable empty file input elements prior to form submission
			*
	
			* @name intercept
			* @cat Plugins/MultiFile
			* @author Diego A. (http://www.fyneworks.com/)
			*
			* @example $.fn.MultiFile.intercept();
			* @param Array methods (optional) Array of method names to be intercepted
			*/
  intercepted: {},
  intercept: function(methods, context, args){
   var method, value; args = args || [];
   if(args.constructor.toString().indexOf("Array")<0) args = [ args ];
   if(typeof(methods)=='function'){
    $.fn.MultiFile.disableEmpty();
    value = methods.apply(context || window, args);
				//SEE-http://code.google.com/p/jquery-multifile-plugin/issues/detail?id=27
				setTimeout(function(){ $.fn.MultiFile.reEnableEmpty() },1000);
    return value;
   };
   if(methods.constructor.toString().indexOf("Array")<0) methods = [methods];
   for(var i=0;i<methods.length;i++){
    method = methods[i]+''; // make sure that we have a STRING
    if(method) (function(method){ // make sure that method is ISOLATED for the interception
     $.fn.MultiFile.intercepted[method] = $.fn[method] || function(){};
     $.fn[method] = function(){
      $.fn.MultiFile.disableEmpty();
      value = $.fn.MultiFile.intercepted[method].apply(this, arguments);
						//SEE-http://code.google.com/p/jquery-multifile-plugin/issues/detail?id=27
      setTimeout(function(){ $.fn.MultiFile.reEnableEmpty() },1000);
      return value;
     }; // interception
    })(method); // MAKE SURE THAT method IS ISOLATED for the interception
   };// for each method
  } // $.fn.MultiFile.intercept
		
 });
	
	/*--------------------------------------------------------*/
	
	/*
		### Default Settings ###
		eg.: You can override default control like this:
		$.fn.MultiFile.options.accept = 'gif|jpg';
	*/
	$.fn.MultiFile.options = { //$.extend($.fn.MultiFile, { options: {
		accept: '', // accepted file extensions
		max: -1,    // maximum number of selectable files
		
		// name to use for newly created elements
		namePattern: '$name', // same name by default (which creates an array)
		
		// STRING: collection lets you show messages in different languages
		STRING: {
			remove:'x',
			denied:'You cannot select a $ext file.\nTry again...',
			file:'$file',
			selected:'File selected: $file',
			duplicate:'This file has already been selected:\n$file'
		},
		
		// name of methods that should be automcatically intercepted so the plugin can disable
		// extra file elements that are empty before execution and automatically re-enable them afterwards
  autoIntercept: [ 'submit', 'ajaxSubmit', 'ajaxForm', 'validate', 'valid' /* array of methods to intercept */ ],
		
		// error handling function
		error: function(s){
			/*
			ERROR! blockUI is not currently working in IE
			if($.blockUI){
				$.blockUI({
					message: s.replace(/\n/gi,'<br/>'),
					css: { 
						border:'none', padding:'15px', size:'12.0pt',
						backgroundColor:'#900', color:'#fff',
						opacity:'.8','-webkit-border-radius': '10px','-moz-border-radius': '10px'
					}
				});
				window.setTimeout($.unblockUI, 2000);
			}
			else//{// save a byte!
			*/
			 alert(s);
			//}// save a byte!
		}
 }; //} });
	
	/*--------------------------------------------------------*/
	
	/*
		### Additional Methods ###
		Required functionality outside the plugin's scope
	*/
	
	// Native input reset method - because this alone doesn't always work: $(element).val('').attr('value', '')[0].value = '';
	$.fn.reset = function(){ return this.each(function(){ try{ this.reset(); }catch(e){} }); };
	
	/*--------------------------------------------------------*/
	
	/*
		### Default implementation ###
		The plugin will attach itself to file inputs
		with the class 'multi' when the page loads
	*/
	$(function(){
  //$("input:file.multi").MultiFile();
  $("input[type=file].multi").MultiFile();
 });
	
	
	
/*# AVOID COLLISIONS #*/
})(jQuery);
/*# AVOID COLLISIONS #*/
;/**/
(function($){Drupal.behaviors.webform_multifile={attach:function(context){$("input[type=file].multi").once(function(){var field=$(this);field.attr("name",field.attr("name")+"[]")});if(typeof MultiFile_fields!=="undefined")for(var i=0;i<MultiFile_fields.length;i++)$("input[type=file].multi."+MultiFile_fields[i].id).MultiFile(MultiFile_fields[i].properties)}}})(jQuery);;/**/
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;/**/
