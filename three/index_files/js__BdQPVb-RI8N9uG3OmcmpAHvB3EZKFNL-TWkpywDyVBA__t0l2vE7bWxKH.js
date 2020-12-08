
(function (Drupal, $) {
  Drupal.behaviors.cvChosen = {
    attach: function () {
      $(document).bind('clientsideValidationAlterOptions', function (e, options, form_id) {
        if (!Drupal.settings.clientsideValidation.forms[form_id].includeHidden) {
          // Do not validate hidden fields. Fix chosen instances.
          $('#' + form_id).find('select.chosen-processed').each(function () {
            var $select = $(this);
            // jQuery validate binds to the click event for selects, not the
            // change event.
            $select.bind('change', function() {
              $(this).trigger('click');
            })
            var chosen = $select.data('chosen');
            if(!chosen.container.is(':hidden')) {
              options.ignore = fixIgnore(options.ignore, $select.attr('id'));
            }
          });
        }
      });

      var fixIgnore = function (ignore, id) {
        var ignores = ignore.split(',');
        for (var i = 0; i < ignores.length; i++) {
          ignores[i] += ':not(#' + id + ')';
        }
        return ignores.join(',');
      };
    }
  };
})(Drupal, jQuery);


;/**/
/*jshint strict:true, browser:true, curly:true, eqeqeq:true, expr:true, forin:true, latedef:true, newcap:true, noarg:true, trailing: true, undef:true, unused:true */
/*global Drupal: true, jQuery: true, XRegExp:true*/
/**
 * File:        clientside_validation.js
 * Version:     7.x-1.x
 * Description: Add clientside validation rules
 * Author:      Attiks
 * Language:    Javascript
 * Project:     clientside_validation
 * @module clientside_validation
 */


(/** @lends Drupal */function ($) {
  /**
   * Drupal.behaviors.clientsideValidation.
   *
   * Attach clientside validation to the page or rebind the rules in case of AJAX calls.
   * @extends Drupal.behaviors
   * @fires clientsideValidationInitialized
   */
  "use strict";
  Drupal.behaviors.clientsideValidation = {
    attach: function (context) {
      if (!Drupal.myClientsideValidation) {
        if (Drupal.settings.clientsideValidation) {
          Drupal.myClientsideValidation = new Drupal.clientsideValidation();
        }
      }
      else {
        if (typeof(Drupal.settings.clientsideValidation.forms) === 'undefined') {
          return;
        }
        var update = false;
        $.each(Drupal.settings.clientsideValidation.forms, function (f) {
          if ($(context).find('#' + f).length || $(context).is('#' + f)) {
            update = true;
          }
        });
        //update settings
        if (update) {
          Drupal.myClientsideValidation.data = Drupal.settings.clientsideValidation;
          Drupal.myClientsideValidation.forms = Drupal.myClientsideValidation.data.forms;
          Drupal.myClientsideValidation.groups = Drupal.myClientsideValidation.data.groups;
          Drupal.myClientsideValidation.bindForms();
        }
      }

      /**
       * Let other modules know we are ready.
       * @event clientsideValidationInitialized
       * @name clientsideValidationInitialized
       * @memberof Drupal.clientsideValidation
       */
      $.event.trigger('clientsideValidationInitialized');
    }
  };

  /**
   * Drupal.clientsideValidation.
   * This module adds clientside validation for all forms and webforms using jquery.validate
   * Don't forget to read the README
   *
   * @class Drupal.clientsideValidation
   * @see https://github.com/jzaefferer/jquery-validation
   * @fires clientsideValidationAddCustomRules
   */
  Drupal.clientsideValidation = function() {
    var self = this;
    if (typeof window.time !== 'undefined') {
      // activate by setting clientside_validation_add_js_timing
      self.time = window.time;
    }
    else {
      self.time = {
        start: function() {},
        stop: function() {},
        report: function() {}
      };
    }
    self.time.start('1. clientsideValidation');

    /**
     * prefix to use
     * @memberof Drupal.clientsideValidation
     * @type string
     * @readonly
     * @private
     */
    this.prefix = 'clientsidevalidation-';

    /**
     * local copy of settings
     * @memberof Drupal.clientsideValidation
     * @type array
     * @readonly
     * @private
     */
    this.data = $.extend(true, {}, Drupal.settings.clientsideValidation);

    /**
     * local reference of all defined forms
     * @memberof Drupal.clientsideValidation
     * @type array
     * @readonly
     */
    this.forms = this.data.forms;

    /**
     * list of all defined validators
     * @memberof Drupal.clientsideValidation
     * @type array
     * @readonly
     */
    this.validators = {};

    /**
     * groups used for radios/checkboxes
     * @memberof Drupal.clientsideValidation
     * @type array
     * @readonly
     * @private
     */
    this.groups = this.data.groups;

    // disable class and attribute rules defined by jquery.validate
    $.validator.classRules = function() {
      return {};
    };
    $.validator.attributeRules = function() {
      return {};
    };

    /**
     * add extra rules not defined in jquery.validate
     * @see jquery.validate
     */
    this.addExtraRules();

    /**
     * bind all rules to all forms
     * @see Drupal.clientsideValidation.prototype.bindForms
     */
    this.bindForms();
    self.time.stop('1. clientsideValidation');
    self.time.report();
  };

  /**
   * findVerticalTab helper.
   * @memberof Drupal.clientsideValidation
   * @private
   */
  Drupal.clientsideValidation.prototype.findVerticalTab = function(element) {
    element = $(element);

    // Check for the vertical tabs fieldset and the verticalTab data
    var fieldset = element.parents('fieldset.vertical-tabs-pane');
    if ((fieldset.length > 0) && (typeof(fieldset.data('verticalTab')) !== 'undefined')) {
      var tab = $(fieldset.data('verticalTab').item[0]).find('a');
      if (tab.length) {
        return tab;
      }
    }

    // Return null by default
    return null;
  };

  /**
   * findHorizontalTab helper.
   * @memberof Drupal.clientsideValidation
   * @private
   */
  Drupal.clientsideValidation.prototype.findHorizontalTab = function(element) {
    element = $(element);

    // Check for the vertical tabs fieldset and the verticalTab data
    var fieldset = element.parents('fieldset.horizontal-tabs-pane');
    if ((fieldset.length > 0) && (typeof(fieldset.data('horizontalTab')) !== 'undefined')) {
      var tab = $(fieldset.data('horizontalTab').item[0]).find('a');
      if (tab.length) {
        return tab;
      }
    }

    // Return null by default
    return null;
  };

  /**
   * Bind all forms.
   * @memberof Drupal.clientsideValidation
   * @public
   */
  Drupal.clientsideValidation.prototype.bindForms = function(){
    var self = this;
    var groupkey;
    if (typeof(self.forms) === 'undefined') {
      return;
    }
    self.time.start('2. bindForms');
    // unset invalid forms
    $.each (self.forms, function (f) {
      if ($('#' + f).length < 1) {
        delete self.forms[f];
      }
    });
    $.each (self.forms, function(f) {
      var errorel = self.prefix + f + '-errors';
      // Remove any existing validation stuff
      if (self.validators[f]) {
        // Doesn't work :: $('#' + f).rules('remove');
        var form = $('#' + f).get(0);
        if (typeof(form) !== 'undefined') {
          $.removeData(form, 'validator');
        }
      }

      if('checkboxrules' in self.forms[f]){
        self.time.start('checkboxrules_groups');
        groupkey = "";
        $.each (self.forms[f].checkboxrules, function(r) {
          groupkey = r + '_group';
          self.groups[f][groupkey] = [];
          $.each(this, function(){
            $(this[2]).find('input[type=checkbox]').each(function(){
              self.groups[f][groupkey].push($(this).attr('name'));
            });
          });
        });
        self.time.stop('checkboxrules_groups');
      }

      if('daterangerules' in self.forms[f]){
        self.time.start('daterangerules');
        groupkey = "";
        $.each (self.forms[f].daterangerules, function(r) {
          groupkey = r + '_group';
          self.groups[f][groupkey] = [];
          $.each(this, function(){
            $('#' + f + ' #' + r + ' :input').not('input[type=image]').each(function(){
              self.groups[f][groupkey].push($(this).attr('name'));
            });
          });
        });
        self.time.stop('daterangerules');
      }

      if('dateminrules' in self.forms[f]){
        self.time.start('dateminrules');
        groupkey = "";
        $.each (self.forms[f].dateminrules, function(r) {
          groupkey = r + '_group';
          self.groups[f][groupkey] = [];
          $.each(this, function(){
            $('#' + f + ' #' + r + ' :input').not('input[type=image]').each(function(){
              self.groups[f][groupkey].push($(this).attr('name'));
            });
          });
        });
        self.time.stop('dateminrules');
      }

      if('datemaxrules' in self.forms[f]){
        self.time.start('datemaxrules');
        groupkey = "";
        $.each (self.forms[f].datemaxrules, function(r) {
          groupkey = r + '_group';
          self.groups[f][groupkey] = [];
          $.each(this, function(){
            $('#' + f + ' #' + r + ' :input').not('input[type=image]').each(function(){
              self.groups[f][groupkey].push($(this).attr('name'));
            });
          });
        });
        self.time.stop('datemaxrules');
      }


      // Add basic settings
      // todo: find cleaner fix
      // ugly fix for nodes in colorbox
      if(typeof $('#' + f).validate === 'function') {
        var validate_options = {
          errorClass: 'error',
          groups: self.groups[f],
          errorElement: self.forms[f].general.errorElement,
          unhighlight: function(element, errorClass, validClass) {
            var tab;

            // If this is a pending element skip handling.
            if (typeof this.pending[element.name] != 'undefined') {
              return;
            }

            // Default behavior
            $(element).removeClass(errorClass).addClass(validClass);

            // Sort the classes out for the tabs - we only want to remove the
            // highlight if there are no inputs with errors...
            var fieldset = $(element).parents('fieldset.vertical-tabs-pane');
            if (fieldset.length && fieldset.find('.' + errorClass).not('label').length === 0) {
              tab = self.findVerticalTab(element);
              if (tab) {
                tab.removeClass(errorClass).addClass(validClass);
              }
            }

            // Same for horizontal tabs
            fieldset = $(element).parents('fieldset.horizontal-tabs-pane');
            if (fieldset.length && fieldset.find('.' + errorClass).not('label').length === 0) {
              tab = self.findHorizontalTab(element);
              if (tab) {
                tab.removeClass(errorClass).addClass(validClass);
              }
            }

            /**
             * Let other modules know this / which / an element is valid.
             * @event clientsideValidationValid
             * @name clientsideValidationValid
             * @memberof Drupal.clientsideValidation
             */
            $(element).trigger('clientsideValidationValid');
            $.event.trigger('clientsideValidationValid', [element]);
          },
          highlight: function(element, errorClass, validClass) {
            // Default behavior
            $(element).addClass(errorClass).removeClass(validClass);

            // Sort the classes out for the tabs
            var tab = self.findVerticalTab(element);
            if (tab) {
              tab.addClass(errorClass).removeClass(validClass);
            }
            tab = self.findHorizontalTab(element);
            if (tab) {
              tab.addClass(errorClass).removeClass(validClass);
            }

            /**
             * Let other modules know this / which / an element is invalid.
             * @event clientsideValidationInvalid
             * @name clientsideValidationInvalid
             * @memberof Drupal.clientsideValidation
             */
            $(element).trigger('clientsideValidationInvalid');
            $.event.trigger('clientsideValidationInvalid', [element]);
          },
          invalidHandler: function(form, validator) {
            var tab;
            if (validator.errorList.length > 0) {
              // Check if any of the errors are in the selected tab
              var errors_in_selected = false;
              for (var i = 0; i < validator.errorList.length; i++) {
                tab = self.findVerticalTab(validator.errorList[i].element);
                if (tab && tab.parent().hasClass('selected')) {
                  errors_in_selected = true;
                  break;
                }
              }

              // Only focus the first tab with errors if the selected tab doesn't have
              // errors itself. We shouldn't hide a tab that contains errors!
              if (!errors_in_selected) {
                tab = self.findVerticalTab(validator.errorList[0].element);
                if (tab) {
                  tab.click();
                }
              }

              // Same for vertical tabs
              // Check if any of the errors are in the selected tab
              errors_in_selected = false;
              for (i = 0; i < validator.errorList.length; i++) {
                tab = self.findHorizontalTab(validator.errorList[i].element);
                if (tab && tab.parent().hasClass('selected')) {
                  errors_in_selected = true;
                  break;
                }
              }

              // Only focus the first tab with errors if the selected tab doesn't have
              // errors itself. We shouldn't hide a tab that contains errors!
              if (!errors_in_selected) {
                tab = self.findHorizontalTab(validator.errorList[0].element);
                if (tab) {
                  tab.click();
                }
              }
              if (self.forms[f].general.scrollTo) {
                if (!$('html, body').hasClass('cv-scrolling')) {
                  var x;
                  if ($("#" + errorel).length) {
                    $("#" + errorel).show();
                    x = $("#" + errorel).offset().top - $("#" + errorel).height() - 100; // provides buffer in viewport
                  }
                  else {
                    var first_element = $(validator.errorList[0].element);
                    var hidden_element = first_element.is(":hidden");
                    if (hidden_element) {
                      var original_visibility = first_element.css('visibility');
                      var original_position = first_element.css('position');
                      first_element.css('visibility', 'hidden');
                      first_element.css('position', 'absolute');
                      first_element.show();
                    }
                    x = first_element.offset().top - first_element.height() - 100;
                    if (hidden_element) {
                      first_element.hide();
                      first_element.css('position', original_position);
                      first_element.css('visibility', original_visibility);
                    }
                  }
                  $('html, body').addClass('cv-scrolling').animate(
                    {scrollTop: x},
                    {
                      duration: self.forms[f].general.scrollSpeed,
                      complete: function () {
                        $('html, body').removeClass('cv-scrolling')
                      }
                    }
                  );
                  $('.wysiwyg-toggle-wrapper a').each(function() {
                    $(this).click();
                    $(this).click();
                  });
                }
              }

              /**
               * Notify that the form contains errors.
               * @event clientsideValidationFormHasErrors
               * @name clientsideValidationFormHasErrors
               * @memberof Drupal.clientsideValidation
               */
              $.event.trigger('clientsideValidationFormHasErrors', [form.target]);
            }
          }
        };

        switch (parseInt(self.forms[f].errorPlacement, 10)) {
          case 0: // CLIENTSIDE_VALIDATION_JQUERY_SELECTOR
            if ($(self.forms[f].errorJquerySelector).length) {
              if (!$(self.forms[f].errorJquerySelector + ' #' + errorel).length) {
                $('<div id="' + errorel + '" class="messages error clientside-error"><ul></ul></div>').prependTo(self.forms[f].errorJquerySelector).hide();
              }
            }
            else if (!$('#' + errorel).length) {
              $('<div id="' + errorel + '" class="messages error clientside-error"><ul></ul></div>').insertBefore('#' + f).hide();
            }
            validate_options.errorContainer = '#' + errorel;
            validate_options.errorLabelContainer = '#' + errorel + ' ul';
            validate_options.wrapper = 'li';
            break;
          case 1: // CLIENTSIDE_VALIDATION_TOP_OF_FORM
            if (!$('#' + errorel).length) {
              $('<div id="' + errorel + '" class="messages error clientside-error"><ul></ul></div>').insertBefore('#' + f).hide();
            }
            validate_options.errorContainer = '#' + errorel;
            validate_options.errorLabelContainer = '#' + errorel + ' ul';
            validate_options.wrapper = 'li';
            break;
          case 2: // CLIENTSIDE_VALIDATION_BEFORE_LABEL
            validate_options.errorPlacement = function(error, element) {
              var parents;
              if (element.is(":radio")) {
                parents = element.parents(".form-type-checkbox-tree");
                if(parents.length) {
                  error.insertBefore(parents.find("label").first());
                }
                else {
                  parents = element.parents('.form-radios').prev('label');
                  if (!parents.length) {
                    parents = 'label[for="'+ element.attr('id') +'"]';
                  }
                  error.insertBefore(parents);
                }
              }
              else if (element.is(":checkbox")) {
                parents = element.parents(".form-type-checkbox-tree");
                if(parents.length) {
                  error.insertBefore(parents.find("label").first());
                }
                else {
                  parents = element.parents('.form-radios').prev('label');
                  if (!parents.length) {
                    parents = 'label[for="'+ element.attr('id') +'"]';
                  }
                  error.insertBefore(parents);
                }
              }
              else {
                error.insertBefore('label[for="'+ element.attr('id') +'"]');
              }
            };
            break;
          case 3: // CLIENTSIDE_VALIDATION_AFTER_LABEL
            validate_options.errorPlacement = function(error, element) {
              var parents;
              if (element.is(":radio")) {
                parents = element.parents(".form-type-checkbox-tree");
                if(parents.length) {
                  error.insertAfter(parents.find("label").first());
                }
                else {
                  parents = element.parents('.form-radios').prev('label');
                  if (!parents.length) {
                    parents = 'label[for="'+ element.attr('id') +'"]';
                  }
                  error.insertAfter(parents);
                }
              }
              else if (element.is(":checkbox")) {
                parents = element.parents(".form-type-checkbox-tree");
                if(parents.length) {
                  error.insertAfter(parents.find("label").first());
                }
                else {
                  parents = element.parents('.form-checkboxes').prev('label');
                  if (!parents.length) {
                    parents = 'label[for="'+ element.attr('id') +'"]';
                  }
                  error.insertAfter(parents);
                }
              }
              else {
                error.insertAfter('label[for="'+ element.attr('id') +'"]');
              }
            };
            break;
          case 4: // CLIENTSIDE_VALIDATION_BEFORE_INPUT
            validate_options.errorPlacement = function(error, element) {
              error.insertBefore(element);
            };
            break;
          case 5: // CLIENTSIDE_VALIDATION_AFTER_INPUT
            validate_options.errorPlacement = function(error, element) {
              var parents;
              if (element.is(":radio")) {
                parents = element.parents(".form-type-checkbox-tree");
                if(parents.length) {
                  error.insertAfter(parents);
                }
                else {
                  parents = element.parents('.form-radios');
                  if (!parents.length) {
                    parents = element;
                  }
                  error.insertAfter(parents);
                }
              }
              else if (element.is(":checkbox")) {
                parents = element.parents(".form-type-checkbox-tree");
                if(parents.length) {
                  error.insertAfter(parents);
                }
                else {
                  parents = element.parents('.form-checkboxes');
                  if (!parents.length) {
                    parents = element;
                  }
                  error.insertAfter(parents);
                }
              }
              else if (element.next('div.grippie').length) {
                error.insertAfter(element.next('div.grippie'));
              } else {
                error.insertAfter(element);
              }
            };
            break;
          case 6: // CLIENTSIDE_VALIDATION_TOP_OF_FIRST_FORM
            if ($('div.messages--error').length) {
              if ($('div.messages--error').attr('id').length) {
                errorel = $('div.messages--error').attr('id');
              }
              else {
                $('div.messages--error').attr('id', errorel);
              }
            }
            else if ($('div.messages.error').length) {
              if ($('div.messages.error').attr('id').length) {
                errorel = $('div.messages.error').attr('id');
              }
              else {
                $('div.messages.error').attr('id', errorel);
              }
            }
            else if (!$('#' + errorel).length) {
              $('<div id="' + errorel + '" class="messages error clientside-error"><ul></ul></div>').insertBefore('#' + f).hide();
            }
            validate_options.errorContainer = '#' + errorel;
            validate_options.errorLabelContainer = '#' + errorel + ' ul';
            validate_options.wrapper = 'li';
            break;
          case 7: // CLIENTSIDE_VALIDATION_CUSTOM_ERROR_FUNCTION
            validate_options.errorPlacement = function (error, element) {
              var func = self.forms[f].customErrorFunction;
              Drupal.myClientsideValidation[func](error, element);
            };
            break;
        }

        if (!self.forms[f].includeHidden) {
          validate_options.ignore = ':input:hidden';
        }
        else {
          validate_options.ignore = '';
        }
        if(self.forms[f].general.validateTabs) {
          if($('.vertical-tabs-pane input').length) {
            validate_options.ignore += ' :not(.vertical-tabs-pane :input, .horizontal-tabs-pane :input)';
          }
        }
        else {
          validate_options.ignore += (validate_options.ignore === '') ? '.horizontal-tab-hidden :input' : ', .horizontal-tab-hidden :input';
        }
        //Since we can only give boolean false to onsubmit, onfocusout and onkeyup, we need
        //a lot of if's (boolean true can not be passed to these properties).
        if (!Boolean(parseInt(self.forms[f].general.validateOnSubmit, 10))) {
          validate_options.onsubmit = false;
        }
        if (!Boolean(parseInt(self.forms[f].general.validateOnBlur, 10))) {
          validate_options.onfocusout = false;
        }
        if (Boolean(parseInt(self.forms[f].general.validateOnBlurAlways, 10))) {
          validate_options.onfocusout = function(element) {
            if ( !this.checkable(element) ) {
              this.element(element);
            }
          };
        }
        if (!Boolean(parseInt(self.forms[f].general.validateOnKeyUp, 10))) {
          validate_options.onkeyup = false;
        }
        // Only apply this setting if errorplacement is set to the top of the form
        if (parseInt(self.forms[f].general.showMessages, 10) > 0 && parseInt(self.forms[f].errorPlacement, 10) === 1) {
          var showMessages = parseInt(self.forms[f].general.showMessages, 10);
          // Show only last message
          if (showMessages === 2) {
            validate_options.showErrors = function() {
              var allErrors = this.errors();
              var i;
              this.toHide = allErrors;
              $(':input.' + this.settings.errorClass).removeClass(this.settings.errorClass);
              for ( i = this.errorList.length -1; this.errorList[i]; i++ ) {
                var error = this.errorList[i];
                this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
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
                var elements;
                for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
                  this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
                }
              }
              this.toHide = this.toHide.not( this.toShow );
              this.hideErrors();
              this.addWrapper( this.toShow ).show();
            };
          }
          // Show only first message
          else if(showMessages === 1) {
            validate_options.showErrors = function() {
              var allErrors = this.errors();
              var i;
              var elements;
              if (this.settings.unhighlight) {
                var firstErrorElement = this.clean($(allErrors[0]).attr('for'));
                //for attr points to name or id
                if (typeof firstErrorElement === 'undefined') {
                  firstErrorElement = this.clean('#' + $(allErrors[0]).attr('for'));
                }
                for (i = 0, elements = this.elements().not($(firstErrorElement)); elements[i]; i++) {
                  this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
                }
              }

              for ( i = 0; this.errorList[i] && i<1; i++ ) {
                var error = this.errorList[i];
                this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
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
              allErrors = this.errors();
              allErrors.splice(0,1);
              this.toHide = allErrors;
              this.hideErrors();
            };
          }
        }
        /**
         * Let other modules alter the validation options for this form.
         * @event clientsideValidationAlterOptions
         * @name clientsideValidationAlterOptions
         * @memberof Drupal.clientsideValidation
         */
        $.event.trigger('clientsideValidationAlterOptions', [validate_options, f]);
        self.validators[f] = $('#' + f).validate(validate_options);

        // Disable HTML5 validation
        if (!Boolean(parseInt(self.forms[f].general.disableHtml5Validation, 10))) {
          $('#' + f).removeAttr('novalidate');
        }
        else {
          $('#' + f).attr('novalidate', 'novalidate');
        }
        // Bind all rules
        self.bindRules(f);

      }
    });
  self.time.stop('2. bindForms');
  };

  /**
   * Bind all rules.
   * @memberof Drupal.clientsideValidation
   */
  Drupal.clientsideValidation.prototype.bindRules = function(formid){
    var self = this;
    self.time.start('3. bindRules');
    var $form = $('#' + formid);
    var hideErrordiv = function(){
      //wait just one milisecond until the error div is updated
      window.setTimeout(function(){
        var visibles = 0;
        // @TODO: check settings
        $(".clientside-error ul li").each(function(){
          if($(this).is(':visible')){
            visibles++;
          }
          else {
            $(this).remove();
          }
        });
        if(visibles < 1){
          $(".clientside-error").hide();
        }
      }, 1);
    };
    if('checkboxrules' in self.forms[formid]){
      self.time.start('checkboxrules');
      $.each (self.forms[formid].checkboxrules, function(r) {
        var $checkboxes = $form.find(this.checkboxgroupminmax[2]).find('input[type="checkbox"]');
        if ($checkboxes.length) {
          var identifier = 'require-one-' + this.checkboxgroupminmax[2].substring(1);
          var min = this.checkboxgroupminmax[0];
          var message = this.messages.checkboxgroupminmax;
          $checkboxes.addClass(identifier);
          $checkboxes.each(function(){
            var $checkbox = $(this);
            var newrule = {
              require_from_group: [min, '.' + identifier]
            };
            $checkbox.rules("add", newrule);
            $checkbox.change(hideErrordiv);

            if (typeof self.validators[formid].settings.messages[$checkbox.attr('name')] === 'undefined') {
              self.validators[formid].settings.messages[$checkbox.attr('name')] = {};
            }
            $.extend(self.validators[formid].settings.messages[$checkbox.attr('name')], {
              require_from_group: message
            });
          });

          if (typeof self.validators[formid].settings.messages['.' + identifier] === 'undefined') {
            self.validators[formid].settings.messages['.' + identifier] = {};
          }
          $.extend(self.validators[formid].settings.messages['.' + identifier], {
            require_from_group: message
          });
        }
      });
      self.time.stop('checkboxrules');
    }
    if('daterangerules' in self.forms[formid]){
      self.time.start('daterangerules');
      $.each (self.forms[formid].daterangerules, function(r) {
        $form.find('#' + r).find('input, select').not('input[type=image]').each(function(){
          // Make sure we are working with the copy of rules object.
          var rule = $.extend(true, {}, self.forms[formid].daterangerules[r]);
          if (typeof self.validators[formid].settings.messages[r] === 'undefined') {
            self.validators[formid].settings.messages[r] = {};
          }
          $.extend(self.validators[formid].settings.messages[r], rule.messages);
          delete rule.messages;
          $(this).rules("add", rule);
          $(this).blur(hideErrordiv);
        });
      });
      self.time.stop('daterangerules');
    }

    if('dateminrules' in self.forms[formid]){
      self.time.start('dateminrules');
      $.each (self.forms[formid].dateminrules, function(r) {
        $form.find('#' + r).find('input, select').not('input[type=image]').each(function(){
          // Make sure we are working with the copy of rules object.
          var rule = $.extend(true, {}, self.forms[formid].dateminrules[r]);
          if (typeof self.validators[formid].settings.messages[r] === 'undefined') {
            self.validators[formid].settings.messages[r] = {};
          }
          $.extend(self.validators[formid].settings.messages[r], rule.messages);
          delete rule.messages;
          $(this).rules("add", rule);
          $(this).blur(hideErrordiv);
        });
      });
      self.time.stop('dateminrules');
    }

    if('datemaxrules' in self.forms[formid]){
      self.time.start('datemaxrules');
      $.each (self.forms[formid].datemaxrules, function(r) {
        $form.find('#' + r).find('input, select').not('input[type=image]').each(function(){
          // Make sure we are working with the copy of rules object.
          var rule = $.extend(true, {}, self.forms[formid].datemaxrules[r]);
          if (typeof self.validators[formid].settings.messages[r] === 'undefined') {
            self.validators[formid].settings.messages[r] = {};
          }
          $.extend(self.validators[formid].settings.messages[r], rule.messages);
          delete rule.messages;
          $(this).rules("add", rule);
          $(this).blur(hideErrordiv);
        });
      });
      self.time.stop('datemaxrules');
    }

    if ('rules' in self.forms[formid]) {
      self.time.start('rules');
      // Make sure we are working with the copy of rules object.
      var rules = $.extend(true, {}, self.forms[formid].rules);
      // :input can be slow, see http://jsperf.com/input-vs-input/2
      $form.find('input, textarea, select').each(function(idx, elem) {
        var rule = rules[elem.name];
        if (rule) {
          var $elem = $(elem);
          if (typeof self.validators[formid].settings.messages[elem.name] === 'undefined') {
            self.validators[formid].settings.messages[elem.name] = {};
          }
          $.extend(self.validators[formid].settings.messages[elem.name], rule.messages);
          delete rule.messages;
          $elem.rules("add",rule);
          $elem.change(hideErrordiv);
        }
      });
      self.time.stop('rules');
    }
    self.time.stop('3. bindRules');
  };

  /**
   * Add extra rules.
   * @memberof Drupal.clientsideValidation
  */
  Drupal.clientsideValidation.prototype.addExtraRules = function(){
    var self = this;

    $.validator.addMethod("numberDE", function(value, element) {
      return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d+)?$/.test(value);
    });

    $.validator.addMethod("min_comma", function(value, element, param) {
      var real_val = Number(value.replace(',', '.'));
      return this.optional(element) || real_val >= param;
    });

    $.validator.addMethod("max_comma", function(value, element, param) {
      var real_val = Number(value.replace(',', '.'));
      return this.optional(element) || real_val <= param;
    });

    $.validator.addMethod("range_comma", function(value, element, param) {
      var real_val = Number(value.replace(',', '.'));
      return this.optional(element) || (real_val >= param[0] && real_val <= param[1]);
    });

    // Min a and maximum b checkboxes from a group
    $.validator.addMethod("checkboxgroupminmax", function(value, element, param) {
      var amountChecked = $(param[2]).find('input:checked').length;
      return (amountChecked >= param[0] && amountChecked <= param[1]);
    }, $.format('Minimum {0}, maximum {1}'));

    // Allow integers, same as digits but including a leading '-'
    $.validator.addMethod("digits_negative", function(value, element) {
      return this.optional(element) || /^-?\d+$/.test(value);
    }, $.format('Please enter only digits.'));

    // One of the values
    $.validator.addMethod("oneOf", function(value, element, param) {
      for (var p in param.values) {
        if (param.values[p] === value && param.caseSensitive) {
          return !param.negate;
        }
        else if (param.values[p].toLowerCase() === value.toLowerCase() && !param.caseSensitive) {
          return !param.negate;
        }
      }
      return param.negate;
    }, $.format(''));

    $.validator.addMethod("specificVals", function(value, element, param){
      for (var i in value) {
        if(param.indexOf(value[i]) === -1) {
            return false;
        }
      }
      return true;
    });

    $.validator.addMethod("blacklist", function(value, element, param) {
      if (typeof(value) !== 'object') {
        value = value.split(' ');
      }
      for (var i in value) {
        if(param.values.indexOf(value[i]) !== -1) {
            return param.negate;
        }
      }
      return !param.negate;
    });

    // Default regular expression support
    var ajaxPCREfn = function(value, element, param) {
      var result = false;
      $.ajax({
        'url': Drupal.settings.basePath + 'clientside_validation/ajax',
        'type': "POST",
        'data': {
          'value': value,
          'param': param
        },
        'dataType': 'json',
        'async': false,
        'success': function(res){
          result = res;
        }
      });
      if (result.result === false) {
        if (result.message.length) {
          $.extend($.validator.messages, {
            "regexMatchPCRE": result.message
          });
        }
      }
      return result.result;
    };

    // Regular expression support using XRegExp
    var xregexPCREfn = function(value, element, param) {
      if (window.XRegExp && XRegExp.version ) {
        try {
          var result = true;
          for (var i = 0; i < param.expressions.length; i++) {
            var reg = param.expressions[i];
            var delim = reg.lastIndexOf(reg.charAt(0));
            // Only allow supported modifiers
            var modraw = reg.substr(delim + 1) || '';
            var mod = '';
            if (mod !== '') {
              for (var l = 0; l < 6; l++) {
                if (modraw.indexOf('gimnsx'[l]) !== -1) {
                  mod += 'gimnsx'[l];
                }
              }
            }
            reg = reg.substring(1, delim);
            if (!(new XRegExp(reg, mod).test(value))) {
              result = false;
              if (param.messages[i].length) {
                $.extend($.validator.messages, {
                  "regexMatchPCRE": param.messages[i]
                });
              }
            }
          }
          return result;
        }
        catch (e) {
          return ajaxPCREfn(value, element, param);
        }
      }
      else {
        return ajaxPCREfn(value, element, param);
      }
    };

    // Decide which one to use
    if (self.data.general.usexregxp) {
      $.validator.addMethod("regexMatchPCRE", xregexPCREfn, $.format('The value does not match the expected format.'));
    }
    else {
      $.validator.addMethod("regexMatchPCRE", ajaxPCREfn, $.format('The value does not match the expected format.'));
    }

    // Unique values
    $.validator.addMethod("notEqualTo", function(value, element, param) {
      var ret = true;
      $.each(param, function (index, selector){
        var $target = $(selector);
        $target.unbind(".validate-notEqualTo").bind("blur.validate-notEqualTo", function() {
          $(element).valid();
        });
        ret = ret && ($target.val() !== value);
      });
      return ret;
    }, $.format('Please don\'t enter the same value again.'));

    $.validator.addMethod("regexMatch", function(value, element, param) {
      if (this.optional(element) && value === '') {
        return this.optional(element);
      }
      else {
        var modifier = param.regex[1];
        var valid_modifiers = ['i', 'g', 'm'];
        if ($.inArray(modifier, valid_modifiers) === -1) {
          modifier = '';
        }
        var regexp = new RegExp(param.regex[0], modifier);
        if(regexp.test(value)){
          return !param.negate;
        }
        return param.negate;
      }

    }, $.format('The value does not match the expected format.'));

    $.validator.addMethod("captcha", function (value, element, param) {
      var result = false;
      var sid = $(element).closest('.captcha').find('input[name=captcha_sid]').val();
      $.ajax({
        'url': Drupal.settings.basePath + 'clientside_validation/captcha',
        'type': "POST",
        'data': {
          'value': value,
          'param': [sid, param]
        },
        'dataType': 'json',
        'async': false,
        'success': function(res){
          result = res;
        }
      });
      if (result.result === false) {
        if (typeof result.message !== 'undefined' && result.message.length) {
          $.extend($.validator.messages, {
            "captcha": result.message
          });
        }
      }
      return result.result;
    }, $.format('Wrong answer.'));

    $.validator.addMethod("rangewords", function(value, element, param) {
      return this.optional(element) || (param[0] <= $.trim(value).split(/\s+/).length && value.split(/\s+/).length <= param[1]);
    }, $.format('The value must be between {0} and {1} words long'));

    $.validator.addMethod("minwords", function(value, element, param) {
      return this.optional(element) || param <= $.trim(value).split(/\s+/).length;
    }, $.format('The value must be more than {0} words long'));

    $.validator.addMethod("maxwords", function(value, element, param) {
      return this.optional(element) || $.trim(value).split(/\s+/).length <= param;
    }, $.format('The value must be fewer than {0} words long'));

    $.validator.addMethod("plaintext", function(value, element, param){
      var result = param.negate ? (value !== strip_tags(value, param.tags)) : (value === strip_tags(value, param.tags));
      return this.optional(element) || result;
    }, $.format('The value must be plaintext'));

    $.validator.addMethod("selectMinlength", function(value, element, param) {
      var result = $(element).find('option:selected').length >= param.min;
      if (param.negate) {
        result = !result;
      }
      return this.optional(element) || result;
    }, $.format('You must select at least {0} values'));

    $.validator.addMethod("selectMaxlength", function(value, element, param) {
      var result = $(element).find('option:selected').length <= param.max;
      if (param.negate) {
        result = !result;
      }
      return this.optional(element) || result;
    }, $.format('You must select a maximum of {0} values'));

    $.validator.addMethod("selectRangelength", function(value, element, param) {
      var result = ($(element).find('option:selected').length >= param.range[0] && $(element).find('option:selected').length <= param.range[1]);
      if (param.negate) {
        result = !result;
      }
      return this.optional(element) || result;
    }, $.format('You must select at between {0} and {1} values'));

    $.validator.addMethod("datemin", function(value, element, param) {
      //Assume [month], [day], and [year] ??
      var dayelem, monthelem, yearelem, name, $form, element_name;
      $form = $(element).closest('form');
      element_name = $(element).attr('name');
      if (element_name.indexOf('[day]') > 0) {
        dayelem = $(element);
        name = dayelem.attr('name').replace('[day]', '');
        monthelem = $form.find("[name='" + name + "[month]']");
        yearelem = $form.find("[name='" + name + "[year]']");
      }
      else if (element_name.indexOf('[month]') > 0) {
        monthelem = $(element);
        name = monthelem.attr('name').replace('[month]', '');
        dayelem = $form.find("[name='" + name + "[day]']");
        yearelem = $form.find("[name='" + name + "[year]']");
      }
      else if ($(element).attr('name').indexOf('[year]') > 0) {
        yearelem = $(element);
        name = yearelem.attr('name').replace('[year]', '');
        dayelem = $form.find("[name='" + name + "[day]']");
        monthelem = $form.find("[name='" + name + "[month]']");
      }

      if (parseInt(yearelem.val(), 10) < parseInt(param[0], 10)) {
        return false;
      }
      else if (parseInt(yearelem.val(), 10) === parseInt(param[0], 10)){
        if (parseInt(monthelem.val(), 10) < parseInt(param[1], 10)){
          return false;
        }
        else if (parseInt(monthelem.val(), 10) === parseInt(param[1], 10)){
          if(parseInt(dayelem.val(), 10) < parseInt(param[2], 10)) {
            return false;
          }
        }
      }
      yearelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      monthelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      dayelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      return true;
    });

    $.validator.addMethod("datemax", function(value, element, param) {
      //Assume [month], [day], and [year] ??
      var dayelem, monthelem, yearelem, name, $form, element_name;
      $form = $(element).closest('form');
      element_name = $(element).attr('name');
      if (element_name.indexOf('[day]') > 0) {
        dayelem = $(element);
        name = dayelem.attr('name').replace('[day]', '');
        monthelem = $form.find("[name='" + name + "[month]']");
        yearelem = $form.find("[name='" + name + "[year]']");
      }
      else if (element_name.indexOf('[month]') > 0) {
        monthelem = $(element);
        name = monthelem.attr('name').replace('[month]', '');
        dayelem = $form.find("[name='" + name + "[day]']");
        yearelem = $form.find("[name='" + name + "[year]']");
      }
      else if (element_name.indexOf('[year]') > 0) {
        yearelem = $(element);
        name = yearelem.attr('name').replace('[year]', '');
        dayelem = $form.find("[name='" + name + "[day]']");
        monthelem = $form.find("[name='" + name + "[month]']");

      }

      if (parseInt(yearelem.val(), 10) > parseInt(param[0], 10)) {
        return false;
      }
      else if (parseInt(yearelem.val(), 10) === parseInt(param[0], 10)){
        if (parseInt(monthelem.val(), 10) > parseInt(param[1], 10)){
          return false;
        }
        else if (parseInt(monthelem.val(), 10) === parseInt(param[1], 10)){
          if(parseInt(dayelem.val(), 10) > parseInt(param[2], 10)) {
            return false;
          }
        }
      }
      yearelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      monthelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      dayelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      return true;
    });

    $.validator.addMethod("daterange", function(value, element, param) {
      //Assume [month], [day], and [year] ??
      var dayelem, monthelem, yearelem, name, $form, element_name;
      $form = $(element).closest('form');
      element_name = $(element).attr('name');
      if (element_name.indexOf('[day]') > 0) {
        dayelem = $(element);
        name = dayelem.attr('name').replace('[day]', '');
        monthelem = $form.find("[name='" + name + "[month]']");
        yearelem = $form.find("[name='" + name + "[year]']");
      }
      else if (element_name.indexOf('[month]') > 0) {
        monthelem = $(element);
        name = monthelem.attr('name').replace('[month]', '');
        dayelem = $form.find("[name='" + name + "[day]']");
        yearelem = $form.find("[name='" + name + "[year]']");
      }
      else if (element_name.indexOf('[year]') > 0) {
        yearelem = $(element);
        name = yearelem.attr('name').replace('[year]', '');
        dayelem = $form.find("[name='" + name + "[day]']");
        monthelem = $form.find("[name='" + name + "[month]']");
      }

      if (parseInt(yearelem.val(), 10) < parseInt(param[0][0], 10)) {
        return false;
      }
      else if (parseInt(yearelem.val(), 10) === parseInt(param[0][0], 10)){
        if (parseInt(monthelem.val(), 10) < parseInt(param[0][1], 10)){
          return false;
        }
        else if (parseInt(monthelem.val(), 10) === parseInt(param[0][1], 10)){
          if(parseInt(dayelem.val(), 10) < parseInt(param[0][2], 10)) {
            return false;
          }
        }
      }

      if (parseInt(yearelem.val(), 10) > parseInt(param[1][0], 10)) {
        return false;
      }
      else if (parseInt(yearelem.val(), 10) === parseInt(param[1][0], 10)){
        if (parseInt(monthelem.val(), 10) > parseInt(param[1][1], 10)){
          return false;
        }
        else if (parseInt(monthelem.val(), 10) === parseInt(param[1][1], 10)){
          if(parseInt(dayelem.val(), 10) > parseInt(param[1][2], 10)) {
            return false;
          }
        }
      }
      yearelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      monthelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      dayelem.once('daterange', function() {
        $(this).change(function(){$(this).trigger('focusout').trigger('blur');});
      }).removeClass('error');
      return true;
    });

    $.validator.addMethod("dateFormat", function(value, element, param) {
      try{
        var parts = value.split(param.splitter);
        var expectedpartscount = 0;
        var day = parseInt(parts[param.daypos], 10);

        var month = parseInt(parts[param.monthpos], 10);
        if (isNaN(month)) {
          var date_parts = param.format.split(param.splitter);
          var full_idx = date_parts.indexOf("F");
          var abbr_idx = date_parts.indexOf("M");
          var mopos = Math.max(full_idx, abbr_idx);
          if (parseInt(mopos) > -1) {
            param.monthpos = mopos;
            date = new Date(parts[param.monthpos] + " 1, 2000");
            month = date.getMonth();
          }
          else {
            if (typeof Drupal.settings.clientsideValidation.general.months[parts[param.monthpos]] !== 'undefined') {
              month = Drupal.settings.clientsideValidation.general.months[parts[param.monthpos]];
            }
            else {
              month = new Date(parts[param.monthpos] + " 1, 2000");
              month = month.getMonth();
            }
          }
        }
        else {
          month--;
        }

        var year = parseInt(parts[param.yearpos], 10);
        var date = new Date();
        var result = true;
        if (param.daypos !== false && parts[param.daypos].toString().length !== parts[param.daypos].length){
          result = false;
        }
        if (param.monthpos !== false && parts[param.monthpos].toString().length !== parts[param.monthpos].length){
          result = false;
        }
        if (param.yearpos !== false && parts[param.yearpos].toString().length !== parts[param.yearpos].length){
          result = false;
        }
        if (param.yearpos !== false){
          expectedpartscount++;
          date.setFullYear(year);
          if (year !== date.getFullYear()) {
            result = false;
          }
        }
        if (param.monthpos !== false) {
          expectedpartscount++;
          date.setMonth(month, 1);
          if (month !== date.getMonth()) {
            result = false;
          }
        }
        if (param.daypos !== false) {
          expectedpartscount++;
          date.setDate(day);
          if (day !== date.getDate()) {
            result = false;
          }
        }
        if (expectedpartscount !== parts.length) {
          result = false;
        }
        return this.optional(element) || result;
      } catch(e) {
        return this.optional(element) || false;
      }
    }, $.format('The date is not in a valid format'));

    // Require one of several
    $.validator.addMethod("requireOneOf", function(value, element, param) {
      var ret = false;
      if (value === "") {
        $.each(param, function(index, name) {
          // @TODO: limit to current form
          if (!ret && $("[name='" + name + "']").val().length) {
            ret = true;
          }
        });
      }
      else {
        $(element).removeClass("error");
        ret = true;
      }
      $(element).blur(function () {
        $.each(param, function(index, name) {
          // @TODO: limit to current form
          $("[name='" + name + "']").valid();
        });
      });
      return ret;
    }, $.format('Please fill in at least one of the fields'));

    // Support for Drupal urls.
    $.validator.addMethod("drupalURL", function(value, element) {
      var result = false;
      if (this.settings['name_event'] == 'onkeyup') {
        return true;
      }
      if ($.validator.methods.url.call(this, value, element)) {
        return true;
      }
      $.ajax({
        'url': Drupal.settings.basePath + 'clientside_validation/drupalURL',
        'type': "POST",
        'data': {
          'value': value
        },
        'dataType': 'json',
        'async': false,
        'success': function(res){
          result = res;
        }
      });
      return result.result;
    }, $.format('Please fill in a valid url'));

    // Support for phone
    $.validator.addMethod("phone", function(value, element, param) {
      var country_code = param;
      var result = false;
      $.ajax({
        'url': Drupal.settings.basePath + 'clientside_validation/phone',
        'type': "POST",
        'data': {
          'value': value,
          'country_code': country_code
        },
        'dataType': 'json',
        'async': false,
        'success': function(res){
          result = res;
        }
      });
      return this.optional(element) || result.result;

    }, $.format('Please fill in a valid phone number'));

    // EAN code
    $.validator.addMethod("validEAN", function(value, element) {
      if (this.optional(element) && value === '') {
        return this.optional(element);
      }
      else {
        if (value.length > 13) {
          return false;
        }
        else if (value.length !== 13) {
          value = '0000000000000'.substr(0, 13 - value.length).concat(value);
        }
        if (value === '0000000000000') {
          return false;
        }
        if (isNaN(parseInt(value, 10)) || parseInt(value, 10) === 0) {
          return false;
        }
        var runningTotal = 0;
        for (var c = 0; c < 12; c++) {
          if (c % 2 === 0) {
            runningTotal += 3 * parseInt(value.substr(c, 1), 10);
          }
          else {
            runningTotal += parseInt(value.substr(c, 1), 10);
          }
        }
        var rem = runningTotal % 10;
        if (rem !== 0) {
          rem = 10 - rem;
        }

        return rem === parseInt(value.substr(12, 1), 10);

      }
    }, $.format('Not a valid EAN number.'));

    $.validator.addMethod("require_from_group", function(value, element, options) {
      var $fields = $(options[1], element.form),
        $fieldsFirst = $fields.eq(0),
        validator = $fieldsFirst.data("valid_req_grp") ? $fieldsFirst.data("valid_req_grp") : $.extend({}, this),
        isValid = $fields.filter(function() {
          return validator.elementValue(this);
        }).length >= options[0];

      // Store the cloned validator for future validation
      $fieldsFirst.data("valid_req_grp", validator);

      // If element isn't being validated, run each require_from_group field's validation rules
      if (!$(element).data("being_validated")) {
        $fields.data("being_validated", true);
        $fields.each(function() {
          validator.element(this);
        });
        $fields.data("being_validated", false);
      }
      return isValid;
    }, $.validator.format("Please fill at least {0} of these fields."));


    // Enhances the provided "remote" method by adding our own success and
    // progress handling.
    $.validator.methods.original_remote = $.validator.methods.remote;
    $.validator.methods.remote = function(value, element, param) {
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
        progress: {
          type: 'throbber',
          message: Drupal.t('Please wait...')
        },
        data: data,
        // We provide our own success handling to ensure the pending array is
        // cleaned before executing showErrors(). That way handling highlight
        // unhighlight is easier for pending elements (avoid) flickering.
        // However we still need the original success handler of Drupal.ajax to
        // do the progress handling.
        success: function(response) {
          // Remove element from pending list as we now know what state it has.
          delete validator.pending[element.name];
          validator.settings.messages[element.name].remote = previous.originalMessage;
          var valid = response === true || response === "true";
          if ( valid ) {
            var submitted = validator.formSubmitted;
            // Don't invoke this because this will avoid that the highlight /
            // unhighlight handlers are called.
            // validator.prepareElement(element);
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
        },
        beforeSend: function () {
          // Disable the element that received the change to prevent user interface
          // interaction while the Ajax request is in progress. ajax.ajaxing prevents
          // the element from triggering a new request, but does not prevent the user
          // from changing its value.
          $(element).addClass('progress-disabled').attr('disabled', true);

          // Insert progressbar or throbber.
          if (this.progress.type == 'bar') {
            var progressBar = new Drupal.progressBar('ajax-progress-' + element.id, eval(this.progress.update_callback), this.progress.method, eval(this.progress.error_callback));
            if (this.progress.message) {
              progressBar.setProgress(-1, this.progress.message);
            }
            if (this.progress.url) {
              progressBar.startMonitoring(this.progress.url, this.progress.interval || 1500);
            }
            this.progress.element = $(progressBar.element).addClass('ajax-progress ajax-progress-bar');
            this.progress.object = progressBar;
            $(element).after(this.progress.element);
          }
          else if (this.progress.type == 'throbber') {
            this.progress.element = $('<div class="ajax-progress ajax-progress-throbber"><div class="throbber">&nbsp;</div></div>');
            if (this.progress.message) {
              $('.throbber', this.progress.element).after('<div class="message">' + this.progress.message + '</div>');
            }
            $(element).after(this.progress.element);
          }
        },
        complete: function() {
          // Remove the progress element.
          if (this.progress.element) {
            $(this.progress.element).remove();
          }
          if (this.progress.object) {
            this.progress.object.stopMonitoring();
          }
          $(element).removeClass('progress-disabled').removeAttr('disabled');
        }
      }, param));
      return "pending";
    };


    /**
     * Allow other modules to add more rules.
     * @event clientsideValidationAddCustomRules
     * @name clientsideValidationAddCustomRules
     * @memberof Drupal.clientsideValidation
     */
    $.event.trigger('clientsideValidationAddCustomRules');


    /**
     * strip illegal tags
     * @memberof Drupal.clientsideValidation
     * @private
     */
    function strip_tags (input, allowed) {
      allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
      var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
          commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
      return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
    }
  };

  Drupal.behaviors.ZZZClientsideValidation = {
    attach: function () {
      function changeAjax(ajax_el) {
        var origBeforeSubmit = Drupal.ajax[ajax_el].options.beforeSubmit;
        Drupal.ajax[ajax_el].options.beforeSubmit = function (form_values, element, options) {
          var ret = origBeforeSubmit(form_values, element, options);
          // If this function didn't return anything, just set the return value to true.
          // If it did return something, allow it to prevent submit if necessary.
          if (typeof ret === 'undefined') {
            ret = true;
          }
          var id = element.is('form') ? element.attr('id') : element.closest('form').attr('id');
          if (id && Drupal.myClientsideValidation.validators[id] && Drupal.myClientsideValidation.validators[id].form) {
            Drupal.myClientsideValidation.validators[id].onsubmit = false;
            ret = ret && Drupal.myClientsideValidation.validators[id].form();
            if (!ret) {
              Drupal.ajax[ajax_el].ajaxing = false;
            }
          }
          return ret;
        };
      }
      // Set validation for ctools modal forms
      for (var ajax_el in Drupal.ajax) {
        if (Drupal.ajax.hasOwnProperty(ajax_el) && typeof Drupal.ajax[ajax_el] !== 'undefined') {
          var $ajax_el = $(Drupal.ajax[ajax_el].element);
          var ajax_form = $ajax_el.is('form') ? $ajax_el.attr('id') : $ajax_el.closest('form').attr('id');
          var change_ajax = true;
          if (ajax_form != null && typeof Drupal.myClientsideValidation.forms[ajax_form] !== 'undefined') {
            change_ajax = Boolean(parseInt(Drupal.myClientsideValidation.forms[ajax_form].general.validateBeforeAjax, 10));
          }
          if (!$ajax_el.hasClass('cancel') && change_ajax) {
            changeAjax(ajax_el);
          }
        }
      }
    }
  };

  /**
   * Integrate with the states handling.
   *
   * Prvides the condtions:
   *  * clientside_validation: Value is valid.
   *  * clientside_validated: Value was validated actually.
   */
  if (typeof Drupal.states != 'undefined') {
    Drupal.states.Trigger.states.clientside_validation = function (element) {
      element
        .bind('clientsideValidationValid', function () {
          element.trigger({type: 'state:clientside_validation', value: true});
          element.trigger({type: 'state:clientside_validated', value: true});
        })
        .bind('clientsideValidationInvalid', function () {
          element.trigger({type: 'state:clientside_validation', value: false});
          element.trigger({type: 'state:clientside_validated', value: true});
        })
        .bind('change keyup', function () {
          element.trigger({type: 'state:clientside_validated', value: false});
        });

      Drupal.states.postponed.push($.proxy(function () {
        element.trigger({type: 'state:clientside_validation', value: true});
        element.trigger({type: 'state:clientside_validated', value: false});
      }, window));
    };
  }
})(jQuery);
;/**/
/*
 Bootstrap v3.3.7 (http://getbootstrap.com)
 Copyright 2011-2016 Twitter, Inc.
 Licensed under the MIT license
*/
if(typeof jQuery==="undefined")throw new Error("Bootstrap's JavaScript requires jQuery");+function($){var version=$.fn.jquery.split(" ")[0].split(".");if(version[0]<2&&version[1]<9||version[0]==1&&version[1]==9&&version[2]<1||version[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");}(jQuery);
+function($){function transitionEnd(){var el=document.createElement("bootstrap");var transEndEventNames={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var name in transEndEventNames)if(el.style[name]!==undefined)return{end:transEndEventNames[name]};return false}$.fn.emulateTransitionEnd=function(duration){var called=false;var $el=this;$(this).one("bsTransitionEnd",function(){called=true});var callback=
function(){if(!called)$($el).trigger($.support.transition.end)};setTimeout(callback,duration);return this};$(function(){$.support.transition=transitionEnd();if(!$.support.transition)return;$.event.special.bsTransitionEnd={bindType:$.support.transition.end,delegateType:$.support.transition.end,handle:function(e){if($(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}}})}(jQuery);
+function($){var dismiss='[data-dismiss="alert"]';var Alert=function(el){$(el).on("click",dismiss,this.close)};Alert.VERSION="3.3.7";Alert.TRANSITION_DURATION=150;Alert.prototype.close=function(e){var $this=$(this);var selector=$this.attr("data-target");if(!selector){selector=$this.attr("href");selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,"")}var $parent=$(selector==="#"?[]:selector);if(e)e.preventDefault();if(!$parent.length)$parent=$this.closest(".alert");$parent.trigger(e=$.Event("close.bs.alert"));
if(e.isDefaultPrevented())return;$parent.removeClass("in");function removeElement(){$parent.detach().trigger("closed.bs.alert").remove()}$.support.transition&&$parent.hasClass("fade")?$parent.one("bsTransitionEnd",removeElement).emulateTransitionEnd(Alert.TRANSITION_DURATION):removeElement()};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.alert");if(!data)$this.data("bs.alert",data=new Alert(this));if(typeof option=="string")data[option].call($this)})}
var old=$.fn.alert;$.fn.alert=Plugin;$.fn.alert.Constructor=Alert;$.fn.alert.noConflict=function(){$.fn.alert=old;return this};$(document).on("click.bs.alert.data-api",dismiss,Alert.prototype.close)}(jQuery);
+function($){var Button=function(element,options){this.$element=$(element);this.options=$.extend({},Button.DEFAULTS,options);this.isLoading=false};Button.VERSION="3.3.7";Button.DEFAULTS={loadingText:"loading..."};Button.prototype.setState=function(state){var d="disabled";var $el=this.$element;var val=$el.is("input")?"val":"html";var data=$el.data();state+="Text";if(data.resetText==null)$el.data("resetText",$el[val]());setTimeout($.proxy(function(){$el[val](data[state]==null?this.options[state]:data[state]);
if(state=="loadingText"){this.isLoading=true;$el.addClass(d).attr(d,d).prop(d,true)}else if(this.isLoading){this.isLoading=false;$el.removeClass(d).removeAttr(d).prop(d,false)}},this),0)};Button.prototype.toggle=function(){var changed=true;var $parent=this.$element.closest('[data-toggle="buttons"]');if($parent.length){var $input=this.$element.find("input");if($input.prop("type")=="radio"){if($input.prop("checked"))changed=false;$parent.find(".active").removeClass("active");this.$element.addClass("active")}else if($input.prop("type")==
"checkbox"){if($input.prop("checked")!==this.$element.hasClass("active"))changed=false;this.$element.toggleClass("active")}$input.prop("checked",this.$element.hasClass("active"));if(changed)$input.trigger("change")}else{this.$element.attr("aria-pressed",!this.$element.hasClass("active"));this.$element.toggleClass("active")}};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.button");var options=typeof option=="object"&&option;if(!data)$this.data("bs.button",
data=new Button(this,options));if(option=="toggle")data.toggle();else if(option)data.setState(option)})}var old=$.fn.button;$.fn.button=Plugin;$.fn.button.Constructor=Button;$.fn.button.noConflict=function(){$.fn.button=old;return this};$(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(e){var $btn=$(e.target).closest(".btn");Plugin.call($btn,"toggle");if(!$(e.target).is('input[type="radio"], input[type="checkbox"]')){e.preventDefault();if($btn.is("input,button"))$btn.trigger("focus");
else $btn.find("input:visible,button:visible").first().trigger("focus")}}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){$(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery);
+function($){var Carousel=function(element,options){this.$element=$(element);this.$indicators=this.$element.find(".carousel-indicators");this.options=options;this.paused=null;this.sliding=null;this.interval=null;this.$active=null;this.$items=null;this.options.keyboard&&this.$element.on("keydown.bs.carousel",$.proxy(this.keydown,this));this.options.pause=="hover"&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",$.proxy(this.pause,this)).on("mouseleave.bs.carousel",
$.proxy(this.cycle,this))};Carousel.VERSION="3.3.7";Carousel.TRANSITION_DURATION=600;Carousel.DEFAULTS={interval:5E3,pause:"hover",wrap:true,keyboard:true};Carousel.prototype.keydown=function(e){if(/input|textarea/i.test(e.target.tagName))return;switch(e.which){case 37:this.prev();break;case 39:this.next();break;default:return}e.preventDefault()};Carousel.prototype.cycle=function(e){e||(this.paused=false);this.interval&&clearInterval(this.interval);this.options.interval&&!this.paused&&(this.interval=
setInterval($.proxy(this.next,this),this.options.interval));return this};Carousel.prototype.getItemIndex=function(item){this.$items=item.parent().children(".item");return this.$items.index(item||this.$active)};Carousel.prototype.getItemForDirection=function(direction,active){var activeIndex=this.getItemIndex(active);var willWrap=direction=="prev"&&activeIndex===0||direction=="next"&&activeIndex==this.$items.length-1;if(willWrap&&!this.options.wrap)return active;var delta=direction=="prev"?-1:1;var itemIndex=
(activeIndex+delta)%this.$items.length;return this.$items.eq(itemIndex)};Carousel.prototype.to=function(pos){var that=this;var activeIndex=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(pos>this.$items.length-1||pos<0)return;if(this.sliding)return this.$element.one("slid.bs.carousel",function(){that.to(pos)});if(activeIndex==pos)return this.pause().cycle();return this.slide(pos>activeIndex?"next":"prev",this.$items.eq(pos))};Carousel.prototype.pause=function(e){e||(this.paused=
true);if(this.$element.find(".next, .prev").length&&$.support.transition){this.$element.trigger($.support.transition.end);this.cycle(true)}this.interval=clearInterval(this.interval);return this};Carousel.prototype.next=function(){if(this.sliding)return;return this.slide("next")};Carousel.prototype.prev=function(){if(this.sliding)return;return this.slide("prev")};Carousel.prototype.slide=function(type,next){var $active=this.$element.find(".item.active");var $next=next||this.getItemForDirection(type,
$active);var isCycling=this.interval;var direction=type=="next"?"left":"right";var that=this;if($next.hasClass("active"))return this.sliding=false;var relatedTarget=$next[0];var slideEvent=$.Event("slide.bs.carousel",{relatedTarget:relatedTarget,direction:direction});this.$element.trigger(slideEvent);if(slideEvent.isDefaultPrevented())return;this.sliding=true;isCycling&&this.pause();if(this.$indicators.length){this.$indicators.find(".active").removeClass("active");var $nextIndicator=$(this.$indicators.children()[this.getItemIndex($next)]);
$nextIndicator&&$nextIndicator.addClass("active")}var slidEvent=$.Event("slid.bs.carousel",{relatedTarget:relatedTarget,direction:direction});if($.support.transition&&this.$element.hasClass("slide")){$next.addClass(type);$next[0].offsetWidth;$active.addClass(direction);$next.addClass(direction);$active.one("bsTransitionEnd",function(){$next.removeClass([type,direction].join(" ")).addClass("active");$active.removeClass(["active",direction].join(" "));that.sliding=false;setTimeout(function(){that.$element.trigger(slidEvent)},
0)}).emulateTransitionEnd(Carousel.TRANSITION_DURATION)}else{$active.removeClass("active");$next.addClass("active");this.sliding=false;this.$element.trigger(slidEvent)}isCycling&&this.cycle();return this};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.carousel");var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=="object"&&option);var action=typeof option=="string"?option:options.slide;if(!data)$this.data("bs.carousel",data=new Carousel(this,
options));if(typeof option=="number")data.to(option);else if(action)data[action]();else if(options.interval)data.pause().cycle()})}var old=$.fn.carousel;$.fn.carousel=Plugin;$.fn.carousel.Constructor=Carousel;$.fn.carousel.noConflict=function(){$.fn.carousel=old;return this};var clickHandler=function(e){var href;var $this=$(this);var $target=$($this.attr("data-target")||(href=$this.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,""));if(!$target.hasClass("carousel"))return;var options=$.extend({},$target.data(),
$this.data());var slideIndex=$this.attr("data-slide-to");if(slideIndex)options.interval=false;Plugin.call($target,options);if(slideIndex)$target.data("bs.carousel").to(slideIndex);e.preventDefault()};$(document).on("click.bs.carousel.data-api","[data-slide]",clickHandler).on("click.bs.carousel.data-api","[data-slide-to]",clickHandler);$(window).on("load",function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this);Plugin.call($carousel,$carousel.data())})})}(jQuery);
+function($){var Collapse=function(element,options){this.$element=$(element);this.options=$.extend({},Collapse.DEFAULTS,options);this.$trigger=$('[data-toggle="collapse"][href="#'+element.id+'"],'+'[data-toggle="collapse"][data-target="#'+element.id+'"]');this.transitioning=null;if(this.options.parent)this.$parent=this.getParent();else this.addAriaAndCollapsedClass(this.$element,this.$trigger);if(this.options.toggle)this.toggle()};Collapse.VERSION="3.3.7";Collapse.TRANSITION_DURATION=350;Collapse.DEFAULTS=
{toggle:true};Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass("width");return hasWidth?"width":"height"};Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass("in"))return;var activesData;var actives=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(actives&&actives.length){activesData=actives.data("bs.collapse");if(activesData&&activesData.transitioning)return}var startEvent=$.Event("show.bs.collapse");this.$element.trigger(startEvent);
if(startEvent.isDefaultPrevented())return;if(actives&&actives.length){Plugin.call(actives,"hide");activesData||actives.data("bs.collapse",null)}var dimension=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded",true);this.$trigger.removeClass("collapsed").attr("aria-expanded",true);this.transitioning=1;var complete=function(){this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");this.transitioning=0;this.$element.trigger("shown.bs.collapse")};
if(!$.support.transition)return complete.call(this);var scrollSize=$.camelCase(["scroll",dimension].join("-"));this.$element.one("bsTransitionEnd",$.proxy(complete,this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])};Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass("in"))return;var startEvent=$.Event("hide.bs.collapse");this.$element.trigger(startEvent);if(startEvent.isDefaultPrevented())return;var dimension=this.dimension();
this.$element[dimension](this.$element[dimension]())[0].offsetHeight;this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",false);this.$trigger.addClass("collapsed").attr("aria-expanded",false);this.transitioning=1;var complete=function(){this.transitioning=0;this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!$.support.transition)return complete.call(this);this.$element[dimension](0).one("bsTransitionEnd",$.proxy(complete,
this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)};Collapse.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()};Collapse.prototype.getParent=function(){return $(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each($.proxy(function(i,element){var $element=$(element);this.addAriaAndCollapsedClass(getTargetFromTrigger($element),$element)},this)).end()};Collapse.prototype.addAriaAndCollapsedClass=function($element,$trigger){var isOpen=
$element.hasClass("in");$element.attr("aria-expanded",isOpen);$trigger.toggleClass("collapsed",!isOpen).attr("aria-expanded",isOpen)};function getTargetFromTrigger($trigger){var href;var target=$trigger.attr("data-target")||(href=$trigger.attr("href"))&&href.replace(/.*(?=#[^\s]+$)/,"");return $(target)}function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.collapse");var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=="object"&&option);if(!data&&
options.toggle&&/show|hide/.test(option))options.toggle=false;if(!data)$this.data("bs.collapse",data=new Collapse(this,options));if(typeof option=="string")data[option]()})}var old=$.fn.collapse;$.fn.collapse=Plugin;$.fn.collapse.Constructor=Collapse;$.fn.collapse.noConflict=function(){$.fn.collapse=old;return this};$(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(e){var $this=$(this);if(!$this.attr("data-target"))e.preventDefault();var $target=getTargetFromTrigger($this);
var data=$target.data("bs.collapse");var option=data?"toggle":$this.data();Plugin.call($target,option)})}(jQuery);
+function($){var backdrop=".dropdown-backdrop";var toggle='[data-toggle="dropdown"]';var Dropdown=function(element){$(element).on("click.bs.dropdown",this.toggle)};Dropdown.VERSION="3.3.7";function getParent($this){var selector=$this.attr("data-target");if(!selector){selector=$this.attr("href");selector=selector&&/#[A-Za-z]/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,"")}var $parent=selector&&$(selector);return $parent&&$parent.length?$parent:$this.parent()}function clearMenus(e){if(e&&e.which===
3)return;$(backdrop).remove();$(toggle).each(function(){var $this=$(this);var $parent=getParent($this);var relatedTarget={relatedTarget:this};if(!$parent.hasClass("open"))return;if(e&&e.type=="click"&&/input|textarea/i.test(e.target.tagName)&&$.contains($parent[0],e.target))return;$parent.trigger(e=$.Event("hide.bs.dropdown",relatedTarget));if(e.isDefaultPrevented())return;$this.attr("aria-expanded","false");$parent.removeClass("open").trigger($.Event("hidden.bs.dropdown",relatedTarget))})}Dropdown.prototype.toggle=
function(e){var $this=$(this);if($this.is(".disabled, :disabled"))return;var $parent=getParent($this);var isActive=$parent.hasClass("open");clearMenus();if(!isActive){if("ontouchstart"in document.documentElement&&!$parent.closest(".navbar-nav").length)$(document.createElement("div")).addClass("dropdown-backdrop").insertAfter($(this)).on("click",clearMenus);var relatedTarget={relatedTarget:this};$parent.trigger(e=$.Event("show.bs.dropdown",relatedTarget));if(e.isDefaultPrevented())return;$this.trigger("focus").attr("aria-expanded",
"true");$parent.toggleClass("open").trigger($.Event("shown.bs.dropdown",relatedTarget))}return false};Dropdown.prototype.keydown=function(e){if(!/(38|40|27|32)/.test(e.which)||/input|textarea/i.test(e.target.tagName))return;var $this=$(this);e.preventDefault();e.stopPropagation();if($this.is(".disabled, :disabled"))return;var $parent=getParent($this);var isActive=$parent.hasClass("open");if(!isActive&&e.which!=27||isActive&&e.which==27){if(e.which==27)$parent.find(toggle).trigger("focus");return $this.trigger("click")}var desc=
" li:not(.disabled):visible a";var $items=$parent.find(".dropdown-menu"+desc);if(!$items.length)return;var index=$items.index(e.target);if(e.which==38&&index>0)index--;if(e.which==40&&index<$items.length-1)index++;if(!~index)index=0;$items.eq(index).trigger("focus")};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.dropdown");if(!data)$this.data("bs.dropdown",data=new Dropdown(this));if(typeof option=="string")data[option].call($this)})}var old=$.fn.dropdown;
$.fn.dropdown=Plugin;$.fn.dropdown.Constructor=Dropdown;$.fn.dropdown.noConflict=function(){$.fn.dropdown=old;return this};$(document).on("click.bs.dropdown.data-api",clearMenus).on("click.bs.dropdown.data-api",".dropdown form",function(e){e.stopPropagation()}).on("click.bs.dropdown.data-api",toggle,Dropdown.prototype.toggle).on("keydown.bs.dropdown.data-api",toggle,Dropdown.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",Dropdown.prototype.keydown)}(jQuery);
+function($){var Modal=function(element,options){this.options=options;this.$body=$(document.body);this.$element=$(element);this.$dialog=this.$element.find(".modal-dialog");this.$backdrop=null;this.isShown=null;this.originalBodyPad=null;this.scrollbarWidth=0;this.ignoreBackdropClick=false;if(this.options.remote)this.$element.find(".modal-content").load(this.options.remote,$.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};Modal.VERSION="3.3.7";Modal.TRANSITION_DURATION=300;Modal.BACKDROP_TRANSITION_DURATION=
150;Modal.DEFAULTS={backdrop:true,keyboard:true,show:true};Modal.prototype.toggle=function(_relatedTarget){return this.isShown?this.hide():this.show(_relatedTarget)};Modal.prototype.show=function(_relatedTarget){var that=this;var e=$.Event("show.bs.modal",{relatedTarget:_relatedTarget});this.$element.trigger(e);if(this.isShown||e.isDefaultPrevented())return;this.isShown=true;this.checkScrollbar();this.setScrollbar();this.$body.addClass("modal-open");this.escape();this.resize();this.$element.on("click.dismiss.bs.modal",
'[data-dismiss="modal"]',$.proxy(this.hide,this));this.$dialog.on("mousedown.dismiss.bs.modal",function(){that.$element.one("mouseup.dismiss.bs.modal",function(e){if($(e.target).is(that.$element))that.ignoreBackdropClick=true})});this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass("fade");if(!that.$element.parent().length)that.$element.appendTo(that.$body);that.$element.show().scrollTop(0);that.adjustDialog();if(transition)that.$element[0].offsetWidth;that.$element.addClass("in");
that.enforceFocus();var e=$.Event("shown.bs.modal",{relatedTarget:_relatedTarget});transition?that.$dialog.one("bsTransitionEnd",function(){that.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(Modal.TRANSITION_DURATION):that.$element.trigger("focus").trigger(e)})};Modal.prototype.hide=function(e){if(e)e.preventDefault();e=$.Event("hide.bs.modal");this.$element.trigger(e);if(!this.isShown||e.isDefaultPrevented())return;this.isShown=false;this.escape();this.resize();$(document).off("focusin.bs.modal");
this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");this.$dialog.off("mousedown.dismiss.bs.modal");$.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",$.proxy(this.hideModal,this)).emulateTransitionEnd(Modal.TRANSITION_DURATION):this.hideModal()};Modal.prototype.enforceFocus=function(){$(document).off("focusin.bs.modal").on("focusin.bs.modal",$.proxy(function(e){if(document!==e.target&&this.$element[0]!==e.target&&!this.$element.has(e.target).length)this.$element.trigger("focus")},
this))};Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard)this.$element.on("keydown.dismiss.bs.modal",$.proxy(function(e){e.which==27&&this.hide()},this));else if(!this.isShown)this.$element.off("keydown.dismiss.bs.modal")};Modal.prototype.resize=function(){if(this.isShown)$(window).on("resize.bs.modal",$.proxy(this.handleUpdate,this));else $(window).off("resize.bs.modal")};Modal.prototype.hideModal=function(){var that=this;this.$element.hide();this.backdrop(function(){that.$body.removeClass("modal-open");
that.resetAdjustments();that.resetScrollbar();that.$element.trigger("hidden.bs.modal")})};Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove();this.$backdrop=null};Modal.prototype.backdrop=function(callback){var that=this;var animate=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate;this.$backdrop=$(document.createElement("div")).addClass("modal-backdrop "+animate).appendTo(this.$body);this.$element.on("click.dismiss.bs.modal",
$.proxy(function(e){if(this.ignoreBackdropClick){this.ignoreBackdropClick=false;return}if(e.target!==e.currentTarget)return;this.options.backdrop=="static"?this.$element[0].focus():this.hide()},this));if(doAnimate)this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in");if(!callback)return;doAnimate?this.$backdrop.one("bsTransitionEnd",callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var callbackRemove=
function(){that.removeBackdrop();callback&&callback()};$.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION):callbackRemove()}else if(callback)callback()};Modal.prototype.handleUpdate=function(){this.adjustDialog()};Modal.prototype.adjustDialog=function(){var modalIsOverflowing=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&
modalIsOverflowing?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!modalIsOverflowing?this.scrollbarWidth:""})};Modal.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})};Modal.prototype.checkScrollbar=function(){var fullWindowWidth=window.innerWidth;if(!fullWindowWidth){var documentElementRect=document.documentElement.getBoundingClientRect();fullWindowWidth=documentElementRect.right-Math.abs(documentElementRect.left)}this.bodyIsOverflowing=document.body.clientWidth<
fullWindowWidth;this.scrollbarWidth=this.measureScrollbar()};Modal.prototype.setScrollbar=function(){var bodyPad=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";if(this.bodyIsOverflowing)this.$body.css("padding-right",bodyPad+this.scrollbarWidth)};Modal.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)};Modal.prototype.measureScrollbar=function(){var scrollDiv=document.createElement("div");scrollDiv.className=
"modal-scrollbar-measure";this.$body.append(scrollDiv);var scrollbarWidth=scrollDiv.offsetWidth-scrollDiv.clientWidth;this.$body[0].removeChild(scrollDiv);return scrollbarWidth};function Plugin(option,_relatedTarget){return this.each(function(){var $this=$(this);var data=$this.data("bs.modal");var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=="object"&&option);if(!data)$this.data("bs.modal",data=new Modal(this,options));if(typeof option=="string")data[option](_relatedTarget);else if(options.show)data.show(_relatedTarget)})}
var old=$.fn.modal;$.fn.modal=Plugin;$.fn.modal.Constructor=Modal;$.fn.modal.noConflict=function(){$.fn.modal=old;return this};$(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(e){var $this=$(this);var href=$this.attr("href");var $target=$($this.attr("data-target")||href&&href.replace(/.*(?=#[^\s]+$)/,""));var option=$target.data("bs.modal")?"toggle":$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data());if($this.is("a"))e.preventDefault();$target.one("show.bs.modal",
function(showEvent){if(showEvent.isDefaultPrevented())return;$target.one("hidden.bs.modal",function(){$this.is(":visible")&&$this.trigger("focus")})});Plugin.call($target,option,this)})}(jQuery);
+function($){var Tooltip=function(element,options){this.type=null;this.options=null;this.enabled=null;this.timeout=null;this.hoverState=null;this.$element=null;this.inState=null;this.init("tooltip",element,options)};Tooltip.VERSION="3.3.7";Tooltip.TRANSITION_DURATION=150;Tooltip.DEFAULTS={animation:true,placement:"top",selector:false,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:false,
container:false,viewport:{selector:"body",padding:0}};Tooltip.prototype.init=function(type,element,options){this.enabled=true;this.type=type;this.$element=$(element);this.options=this.getOptions(options);this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport);this.inState={click:false,hover:false,focus:false};if(this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+
this.type+" on the window.document object!");var triggers=this.options.trigger.split(" ");for(var i=triggers.length;i--;){var trigger=triggers[i];if(trigger=="click")this.$element.on("click."+this.type,this.options.selector,$.proxy(this.toggle,this));else if(trigger!="manual"){var eventIn=trigger=="hover"?"mouseenter":"focusin";var eventOut=trigger=="hover"?"mouseleave":"focusout";this.$element.on(eventIn+"."+this.type,this.options.selector,$.proxy(this.enter,this));this.$element.on(eventOut+"."+
this.type,this.options.selector,$.proxy(this.leave,this))}}this.options.selector?this._options=$.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()};Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS};Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options);if(options.delay&&typeof options.delay=="number")options.delay={show:options.delay,hide:options.delay};return options};Tooltip.prototype.getDelegateOptions=
function(){var options={};var defaults=this.getDefaults();this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value});return options};Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data("bs."+this.type);if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions());$(obj.currentTarget).data("bs."+this.type,self)}if(obj instanceof $.Event)self.inState[obj.type=="focusin"?"focus":"hover"]=
true;if(self.tip().hasClass("in")||self.hoverState=="in"){self.hoverState="in";return}clearTimeout(self.timeout);self.hoverState="in";if(!self.options.delay||!self.options.delay.show)return self.show();self.timeout=setTimeout(function(){if(self.hoverState=="in")self.show()},self.options.delay.show)};Tooltip.prototype.isInStateTrue=function(){for(var key in this.inState)if(this.inState[key])return true;return false};Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:
$(obj.currentTarget).data("bs."+this.type);if(!self){self=new this.constructor(obj.currentTarget,this.getDelegateOptions());$(obj.currentTarget).data("bs."+this.type,self)}if(obj instanceof $.Event)self.inState[obj.type=="focusout"?"focus":"hover"]=false;if(self.isInStateTrue())return;clearTimeout(self.timeout);self.hoverState="out";if(!self.options.delay||!self.options.delay.hide)return self.hide();self.timeout=setTimeout(function(){if(self.hoverState=="out")self.hide()},self.options.delay.hide)};
Tooltip.prototype.show=function(){var e=$.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!inDom)return;var that=this;var $tip=this.tip();var tipId=this.getUID(this.type);this.setContent();$tip.attr("id",tipId);this.$element.attr("aria-describedby",tipId);if(this.options.animation)$tip.addClass("fade");var placement=typeof this.options.placement==
"function"?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement;var autoToken=/\s?auto?\s?/i;var autoPlace=autoToken.test(placement);if(autoPlace)placement=placement.replace(autoToken,"")||"top";$tip.detach().css({top:0,left:0,display:"block"}).addClass(placement).data("bs."+this.type,this);this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element);this.$element.trigger("inserted.bs."+this.type);var pos=this.getPosition();var actualWidth=
$tip[0].offsetWidth;var actualHeight=$tip[0].offsetHeight;if(autoPlace){var orgPlacement=placement;var viewportDim=this.getPosition(this.$viewport);placement=placement=="bottom"&&pos.bottom+actualHeight>viewportDim.bottom?"top":placement=="top"&&pos.top-actualHeight<viewportDim.top?"bottom":placement=="right"&&pos.right+actualWidth>viewportDim.width?"left":placement=="left"&&pos.left-actualWidth<viewportDim.left?"right":placement;$tip.removeClass(orgPlacement).addClass(placement)}var calculatedOffset=
this.getCalculatedOffset(placement,pos,actualWidth,actualHeight);this.applyPlacement(calculatedOffset,placement);var complete=function(){var prevHoverState=that.hoverState;that.$element.trigger("shown.bs."+that.type);that.hoverState=null;if(prevHoverState=="out")that.leave(that)};$.support.transition&&this.$tip.hasClass("fade")?$tip.one("bsTransitionEnd",complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}};Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip();
var width=$tip[0].offsetWidth;var height=$tip[0].offsetHeight;var marginTop=parseInt($tip.css("margin-top"),10);var marginLeft=parseInt($tip.css("margin-left"),10);if(isNaN(marginTop))marginTop=0;if(isNaN(marginLeft))marginLeft=0;offset.top+=marginTop;offset.left+=marginLeft;$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0);$tip.addClass("in");var actualWidth=$tip[0].offsetWidth;var actualHeight=$tip[0].offsetHeight;
if(placement=="top"&&actualHeight!=height)offset.top=offset.top+height-actualHeight;var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight);if(delta.left)offset.left+=delta.left;else offset.top+=delta.top;var isVertical=/top|bottom/.test(placement);var arrowDelta=isVertical?delta.left*2-width+actualWidth:delta.top*2-height+actualHeight;var arrowOffsetPosition=isVertical?"offsetWidth":"offsetHeight";$tip.offset(offset);this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],
isVertical)};Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?"left":"top",50*(1-delta/dimension)+"%").css(isVertical?"top":"left","")};Tooltip.prototype.setContent=function(){var $tip=this.tip();var title=this.getTitle();$tip.find(".tooltip-inner")[this.options.html?"html":"text"](title);$tip.removeClass("fade in top bottom left right")};Tooltip.prototype.hide=function(callback){var that=this;var $tip=$(this.$tip);var e=$.Event("hide.bs."+this.type);
function complete(){if(that.hoverState!="in")$tip.detach();if(that.$element)that.$element.removeAttr("aria-describedby").trigger("hidden.bs."+that.type);callback&&callback()}this.$element.trigger(e);if(e.isDefaultPrevented())return;$tip.removeClass("in");$.support.transition&&$tip.hasClass("fade")?$tip.one("bsTransitionEnd",complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete();this.hoverState=null;return this};Tooltip.prototype.fixTitle=function(){var $e=this.$element;if($e.attr("title")||
typeof $e.attr("data-original-title")!="string")$e.attr("data-original-title",$e.attr("title")||"").attr("title","")};Tooltip.prototype.hasContent=function(){return this.getTitle()};Tooltip.prototype.getPosition=function($element){$element=$element||this.$element;var el=$element[0];var isBody=el.tagName=="BODY";var elRect=el.getBoundingClientRect();if(elRect.width==null)elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top});var isSvg=window.SVGElement&&el instanceof
window.SVGElement;var elOffset=isBody?{top:0,left:0}:isSvg?null:$element.offset();var scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()};var outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null;return $.extend({},elRect,scroll,outerDims,elOffset)};Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=="bottom"?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:
placement=="top"?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=="left"?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}};Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0};if(!this.$viewport)return delta;var viewportPadding=this.options.viewport&&this.options.viewport.padding||0;var viewportDimensions=this.getPosition(this.$viewport);
if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll;var bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight;if(topEdgeOffset<viewportDimensions.top)delta.top=viewportDimensions.top-topEdgeOffset;else if(bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height)delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset}else{var leftEdgeOffset=pos.left-viewportPadding;var rightEdgeOffset=pos.left+viewportPadding+
actualWidth;if(leftEdgeOffset<viewportDimensions.left)delta.left=viewportDimensions.left-leftEdgeOffset;else if(rightEdgeOffset>viewportDimensions.right)delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset}return delta};Tooltip.prototype.getTitle=function(){var title;var $e=this.$element;var o=this.options;title=$e.attr("data-original-title")||(typeof o.title=="function"?o.title.call($e[0]):o.title);return title};Tooltip.prototype.getUID=function(prefix){do prefix+=~~(Math.random()*
1E6);while(document.getElementById(prefix));return prefix};Tooltip.prototype.tip=function(){if(!this.$tip){this.$tip=$(this.options.template);if(this.$tip.length!=1)throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");}return this.$tip};Tooltip.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")};Tooltip.prototype.enable=function(){this.enabled=true};Tooltip.prototype.disable=function(){this.enabled=false};Tooltip.prototype.toggleEnabled=
function(){this.enabled=!this.enabled};Tooltip.prototype.toggle=function(e){var self=this;if(e){self=$(e.currentTarget).data("bs."+this.type);if(!self){self=new this.constructor(e.currentTarget,this.getDelegateOptions());$(e.currentTarget).data("bs."+this.type,self)}}if(e){self.inState.click=!self.inState.click;if(self.isInStateTrue())self.enter(self);else self.leave(self)}else self.tip().hasClass("in")?self.leave(self):self.enter(self)};Tooltip.prototype.destroy=function(){var that=this;clearTimeout(this.timeout);
this.hide(function(){that.$element.off("."+that.type).removeData("bs."+that.type);if(that.$tip)that.$tip.detach();that.$tip=null;that.$arrow=null;that.$viewport=null;that.$element=null})};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.tooltip");var options=typeof option=="object"&&option;if(!data&&/destroy|hide/.test(option))return;if(!data)$this.data("bs.tooltip",data=new Tooltip(this,options));if(typeof option=="string")data[option]()})}var old=$.fn.tooltip;
$.fn.tooltip=Plugin;$.fn.tooltip.Constructor=Tooltip;$.fn.tooltip.noConflict=function(){$.fn.tooltip=old;return this}}(jQuery);
+function($){var Popover=function(element,options){this.init("popover",element,options)};if(!$.fn.tooltip)throw new Error("Popover requires tooltip.js");Popover.VERSION="3.3.7";Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'});Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype);Popover.prototype.constructor=
Popover;Popover.prototype.getDefaults=function(){return Popover.DEFAULTS};Popover.prototype.setContent=function(){var $tip=this.tip();var title=this.getTitle();var content=this.getContent();$tip.find(".popover-title")[this.options.html?"html":"text"](title);$tip.find(".popover-content").children().detach().end()[this.options.html?typeof content=="string"?"html":"append":"text"](content);$tip.removeClass("fade top bottom left right in");if(!$tip.find(".popover-title").html())$tip.find(".popover-title").hide()};
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()};Popover.prototype.getContent=function(){var $e=this.$element;var o=this.options;return $e.attr("data-content")||(typeof o.content=="function"?o.content.call($e[0]):o.content)};Popover.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.popover");var options=typeof option=="object"&&option;
if(!data&&/destroy|hide/.test(option))return;if(!data)$this.data("bs.popover",data=new Popover(this,options));if(typeof option=="string")data[option]()})}var old=$.fn.popover;$.fn.popover=Plugin;$.fn.popover.Constructor=Popover;$.fn.popover.noConflict=function(){$.fn.popover=old;return this}}(jQuery);
+function($){function ScrollSpy(element,options){this.$body=$(document.body);this.$scrollElement=$(element).is(document.body)?$(window):$(element);this.options=$.extend({},ScrollSpy.DEFAULTS,options);this.selector=(this.options.target||"")+" .nav li > a";this.offsets=[];this.targets=[];this.activeTarget=null;this.scrollHeight=0;this.$scrollElement.on("scroll.bs.scrollspy",$.proxy(this.process,this));this.refresh();this.process()}ScrollSpy.VERSION="3.3.7";ScrollSpy.DEFAULTS={offset:10};ScrollSpy.prototype.getScrollHeight=
function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)};ScrollSpy.prototype.refresh=function(){var that=this;var offsetMethod="offset";var offsetBase=0;this.offsets=[];this.targets=[];this.scrollHeight=this.getScrollHeight();if(!$.isWindow(this.$scrollElement[0])){offsetMethod="position";offsetBase=this.$scrollElement.scrollTop()}this.$body.find(this.selector).map(function(){var $el=$(this);var href=$el.data("target")||$el.attr("href");
var $href=/^#./.test(href)&&$(href);return $href&&$href.length&&$href.is(":visible")&&[[$href[offsetMethod]().top+offsetBase,href]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){that.offsets.push(this[0]);that.targets.push(this[1])})};ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset;var scrollHeight=this.getScrollHeight();var maxScroll=this.options.offset+scrollHeight-this.$scrollElement.height();var offsets=this.offsets;var targets=
this.targets;var activeTarget=this.activeTarget;var i;if(this.scrollHeight!=scrollHeight)this.refresh();if(scrollTop>=maxScroll)return activeTarget!=(i=targets[targets.length-1])&&this.activate(i);if(activeTarget&&scrollTop<offsets[0]){this.activeTarget=null;return this.clear()}for(i=offsets.length;i--;)activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(offsets[i+1]===undefined||scrollTop<offsets[i+1])&&this.activate(targets[i])};ScrollSpy.prototype.activate=function(target){this.activeTarget=target;
this.clear();var selector=this.selector+'[data-target="'+target+'"],'+this.selector+'[href="'+target+'"]';var active=$(selector).parents("li").addClass("active");if(active.parent(".dropdown-menu").length)active=active.closest("li.dropdown").addClass("active");active.trigger("activate.bs.scrollspy")};ScrollSpy.prototype.clear=function(){$(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};function Plugin(option){return this.each(function(){var $this=$(this);var data=
$this.data("bs.scrollspy");var options=typeof option=="object"&&option;if(!data)$this.data("bs.scrollspy",data=new ScrollSpy(this,options));if(typeof option=="string")data[option]()})}var old=$.fn.scrollspy;$.fn.scrollspy=Plugin;$.fn.scrollspy.Constructor=ScrollSpy;$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old;return this};$(window).on("load.bs.scrollspy.data-api",function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this);Plugin.call($spy,$spy.data())})})}(jQuery);
+function($){var Tab=function(element){this.element=$(element)};Tab.VERSION="3.3.7";Tab.TRANSITION_DURATION=150;Tab.prototype.show=function(){var $this=this.element;var $ul=$this.closest("ul:not(.dropdown-menu)");var selector=$this.data("target");if(!selector){selector=$this.attr("href");selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,"")}if($this.parent("li").hasClass("active"))return;var $previous=$ul.find(".active:last a");var hideEvent=$.Event("hide.bs.tab",{relatedTarget:$this[0]});var showEvent=
$.Event("show.bs.tab",{relatedTarget:$previous[0]});$previous.trigger(hideEvent);$this.trigger(showEvent);if(showEvent.isDefaultPrevented()||hideEvent.isDefaultPrevented())return;var $target=$(selector);this.activate($this.closest("li"),$ul);this.activate($target,$target.parent(),function(){$previous.trigger({type:"hidden.bs.tab",relatedTarget:$this[0]});$this.trigger({type:"shown.bs.tab",relatedTarget:$previous[0]})})};Tab.prototype.activate=function(element,container,callback){var $active=container.find("> .active");
var transition=callback&&$.support.transition&&($active.length&&$active.hasClass("fade")||!!container.find("> .fade").length);function next(){$active.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",false);element.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",true);if(transition){element[0].offsetWidth;element.addClass("in")}else element.removeClass("fade");if(element.parent(".dropdown-menu").length)element.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",
true);callback&&callback()}$active.length&&transition?$active.one("bsTransitionEnd",next).emulateTransitionEnd(Tab.TRANSITION_DURATION):next();$active.removeClass("in")};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.tab");if(!data)$this.data("bs.tab",data=new Tab(this));if(typeof option=="string")data[option]()})}var old=$.fn.tab;$.fn.tab=Plugin;$.fn.tab.Constructor=Tab;$.fn.tab.noConflict=function(){$.fn.tab=old;return this};var clickHandler=function(e){e.preventDefault();
Plugin.call($(this),"show")};$(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',clickHandler).on("click.bs.tab.data-api",'[data-toggle="pill"]',clickHandler)}(jQuery);
+function($){var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options);this.$target=$(this.options.target).on("scroll.bs.affix.data-api",$.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",$.proxy(this.checkPositionWithEventLoop,this));this.$element=$(element);this.affixed=null;this.unpin=null;this.pinnedOffset=null;this.checkPosition()};Affix.VERSION="3.3.7";Affix.RESET="affix affix-top affix-bottom";Affix.DEFAULTS={offset:0,target:window};Affix.prototype.getState=
function(scrollHeight,height,offsetTop,offsetBottom){var scrollTop=this.$target.scrollTop();var position=this.$element.offset();var targetHeight=this.$target.height();if(offsetTop!=null&&this.affixed=="top")return scrollTop<offsetTop?"top":false;if(this.affixed=="bottom"){if(offsetTop!=null)return scrollTop+this.unpin<=position.top?false:"bottom";return scrollTop+targetHeight<=scrollHeight-offsetBottom?false:"bottom"}var initializing=this.affixed==null;var colliderTop=initializing?scrollTop:position.top;
var colliderHeight=initializing?targetHeight:height;if(offsetTop!=null&&scrollTop<=offsetTop)return"top";if(offsetBottom!=null&&colliderTop+colliderHeight>=scrollHeight-offsetBottom)return"bottom";return false};Affix.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(Affix.RESET).addClass("affix");var scrollTop=this.$target.scrollTop();var position=this.$element.offset();return this.pinnedOffset=position.top-scrollTop};Affix.prototype.checkPositionWithEventLoop=
function(){setTimeout($.proxy(this.checkPosition,this),1)};Affix.prototype.checkPosition=function(){if(!this.$element.is(":visible"))return;var height=this.$element.height();var offset=this.options.offset;var offsetTop=offset.top;var offsetBottom=offset.bottom;var scrollHeight=Math.max($(document).height(),$(document.body).height());if(typeof offset!="object")offsetBottom=offsetTop=offset;if(typeof offsetTop=="function")offsetTop=offset.top(this.$element);if(typeof offsetBottom=="function")offsetBottom=
offset.bottom(this.$element);var affix=this.getState(scrollHeight,height,offsetTop,offsetBottom);if(this.affixed!=affix){if(this.unpin!=null)this.$element.css("top","");var affixType="affix"+(affix?"-"+affix:"");var e=$.Event(affixType+".bs.affix");this.$element.trigger(e);if(e.isDefaultPrevented())return;this.affixed=affix;this.unpin=affix=="bottom"?this.getPinnedOffset():null;this.$element.removeClass(Affix.RESET).addClass(affixType).trigger(affixType.replace("affix","affixed")+".bs.affix")}if(affix==
"bottom")this.$element.offset({top:scrollHeight-height-offsetBottom})};function Plugin(option){return this.each(function(){var $this=$(this);var data=$this.data("bs.affix");var options=typeof option=="object"&&option;if(!data)$this.data("bs.affix",data=new Affix(this,options));if(typeof option=="string")data[option]()})}var old=$.fn.affix;$.fn.affix=Plugin;$.fn.affix.Constructor=Affix;$.fn.affix.noConflict=function(){$.fn.affix=old;return this};$(window).on("load",function(){$('[data-spy="affix"]').each(function(){var $spy=
$(this);var data=$spy.data();data.offset=data.offset||{};if(data.offsetBottom!=null)data.offset.bottom=data.offsetBottom;if(data.offsetTop!=null)data.offset.top=data.offsetTop;Plugin.call($spy,data)})})}(jQuery);;/**/
