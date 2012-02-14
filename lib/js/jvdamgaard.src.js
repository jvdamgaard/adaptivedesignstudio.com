/* trigger when page is ready */
jQuery(document).ready(function (){

	init_input_default_values()	;
	
});

//Show default value in inputboxes
//Style "default" class for data-default
function init_input_default_values() {
	jQuery("input:text, textarea").each(function() {
		
		if (jQuery(this).val() == "") {
			jQuery(this).val(jQuery(this).data("default"));
			jQuery(this).addClass("default");
		}
		jQuery(this).focus(function(){
				if (jQuery(this).val() == jQuery(this).data("default")) {
					jQuery(this).val("");
					jQuery(this).removeClass("default");
				}
			});
		jQuery(this).blur(function(){
				if (jQuery(this).val() == "") {
					jQuery(this).val(jQuery(this).data("default"));
					jQuery(this).addClass("default");
				}
			});
	});
	jQuery("form").submit(function() {
		jQuery("input:text, textarea").each(function() {
			if (jQuery(this).val() == jQuery(this).data("default")) {
				jQuery(this).val("");
			}
			});
		});
}

//Validate form
function validate_form(selector) {
	var validated = true;
	jQuery(selector+' input:text, '+selector+' textarea').each(function() {
		
			// Revalidate when chages is made to object
			jQuery(this).unbind('input');
			jQuery(this).bind('input', function() {
					validate_form(selector);
				});
		
			jQuery(this).removeClass('error');
			
			var input = jQuery(this).val();
			var val = jQuery(this).data('validate');
			if (!val) {
				val = '';
			}
			var def = jQuery(this).data('default');
			
			//Resets input with default value
			if (input == def) {
				input = '';
			}
			
			//If input is required or has been set then test validation
			if ( (val.indexOf('required') != -1) || (input != '') ) {
				
				var error = false;
				
				//Input missing
				if (input == '') {
					error = true;
				} else {
					if (val.indexOf('email') != -1) {
						error = !validate_email(input);
					}
					else if (val.indexOf('tlf') != -1) {
						error = !validate_tlf(input);
					}
					else if (val.indexOf('integer') != -1) {
						error = !validate_integer(input);
					}
					else if (val.indexOf('float') != -1) {
						error = !validate_float(input);
					}
				}
				if (error) {
					jQuery(this).addClass('error');
					validated = !error;
				} else {
					jQuery(this).addClass('valid');
				}
					
			}
		});
	
	if(typeof window['validateCallback'] === 'function') {
		validateCallback(validated);
	}
	
	return validated;
	
}
// Validates e-mail
function validate_email(val) {
	// Old: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
	return /^[a-zA-Z0-9.!#$%&amp;'*+-/=?\^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);
}

// Validates 8-digit phonenumber (danish)
function validate_tlf(val) {
	return /^[0-9\ +]+$/i.test(val);
}

// Validates integer with a comma as seperator (danish)
function  validate_float(val) {
	return /^[0-9]+(\,[0-9]+)?$/.test(val);
}

// Validates float
function validate_integer(val) {
	return /^ *[0-9]+ *$/.test(val);
}

// Prevent form with class "donotsubmit" to be submitted
jQuery(".donotsubmit").submit(function (e) {
	e.preventDefault();
	return false;
});