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

// Emulateparamsin svg
var svgns = "http://www.w3.org/2000/svg";
var xlinkns = "http://www.w3.org/1999/xlink";

GetParams();

function GetParams()
{
  var uids = [];

  var paramArray = [];
  if ( document.defaultView.frameElement )
  {
     var params = document.defaultView.frameElement.getElementsByTagName("param");

     for ( var i = 0, iLen = params.length; iLen > i; i++ )
     {
        var eachParam = params[ i ];
        var name = eachParam.getAttribute( "name" );
        var value = eachParam.getAttribute( "value" );
        
        paramArray[ name ] = value;
     }
  }

  var href = document.defaultView.location.href;
  if ( -1 != href.indexOf("?") )
  {
    var paramList = href.split("?")[1].split(/&|;/);
    for ( var p = 0, pLen = paramList.length; pLen > p; p++ )
    {
       var eachParam = paramList[ p ];
       var valList = eachParam.split("=");
       var name = unescape(valList[0]);
       var value = unescape(valList[1]);

       paramArray[ name ] = value;
     }
  }

  SetElementValues( paramArray, uids );
}


function GetValue( attrStr, params )
{
  // parse attribute value for parameter reference and fallback value 
  var paramSplit = attrStr.split(")");
  var paramName = paramSplit[0].replace("param(","");
  var defaultVal = null;
  if (paramSplit[1])
  {
    defaultVal = paramSplit[1].replace(/^\s\s*/, "").replace(/\s\s*$/, "");
  }
  
  var newVal = params[ paramName ];
  if ( !newVal )
  {
    newVal = defaultVal;  
  }

  return newVal;
}


function SetElementValues( params, uids  )
{
  var useEls =[];
  var elList = document.documentElement.getElementsByTagName( "*" );
  for ( var i = 0, iLen = elList.length; iLen > i; i++ )
  {
    var eachEl = elList[ i ];
    if ( "use" != eachEl.localName )
    {
      SetParamValues( eachEl, params );
    }
    else
    {
      var shadow = EmulateShadowTree( eachEl, params, uids, i );
      if ( shadow )
      {
        useEls.push( [ eachEl, shadow ] );
      }
    }
  }
    
  for ( var u = 0, uLen = useEls.length; uLen > u; u++ )
  {
    var useEl = useEls[ u ][0];
    var shadow = useEls[ u ][1];
    useEl.setAttribute("display", "none");
    if (useEl.nextSibling)
    {
      useEl.parentNode.insertBefore(shadow, useEl.nextSibling);
    }
    else
    {
      useEl.parentNode.appendChild(shadow);
    }
  }
}


function SetParamValues( el, params, isShadow )
{
  for ( var a = 0, aLen = el.attributes.length; aLen > a; a++ )
  {
    var attr = el.attributes[ a ];
    if (attr)
    {
      var attrVal = attr.value;
    
      if ( -1 != attrVal.indexOf( "param(" ) )
      {
        //alert("attr: " + attr.localName + "\nvalue: " + attrVal)
        if ( "params" == attr.localName )
        {
          // alert("attr.name: " + attr.name + "\nattrVal: " + attrVal + "\nisShadow: " + isShadow)
          if (isShadow)
          {
            //alert(attrVal)
            var paramSplit = attrVal.split(";");
            for ( var p = 0, pLen = paramSplit.length; pLen > p; p++ )
            {
              var eachPair = paramSplit[ p ];
              // alert("eachPair: " + eachPair)
              var pairSplit = eachPair.split(":");
              var newAttr = pairSplit[0];

              var newVal = GetValue( pairSplit[1], params );

              var attrns = null;
              if ( "href" == newAttr || "xlink:href" == newAttr )
              {
                attrns = xlinkns;
              }
              el.setAttributeNS( attrns, newAttr, newVal);
            }
          }
        }
        else
        {
          var newVal = GetValue( attrVal, params );
        
          if ( null != newVal && "" != newVal )
          {
            if ( "content-value" == attr.localName )
            {
              el.replaceChild( document.createTextNode( newVal ), el.firstChild );
            }
            else
            {
              el.setAttributeNS( attr.namespaceURI, attr.name, newVal);
              //alert("attr.name: " + attr.name + "\nattrVal: " + newVal)

              // note replacement values in params metadata attribute 
              var paramAttrVal = el.getAttribute( "params" );
              if ( paramAttrVal )
              {
                el.setAttribute( "params", paramAttrVal + ";" + attr.name + ":" + attrVal);
                //alert(paramAttrVal)
              }
              else
              {
                el.setAttribute( "params", attr.name + ":" + attrVal);
              }
            }
          }
        }
      }
    }
  }
}


// au37k
//emulate modifying shadow tree by duplicating element are replacing over use element
function EmulateShadowTree( el, params, uids, idnum )
{
  //alert("EmulateShadowTree")
  shadowParams = params;
  var hasParam = false;
  var cn = el.childNodes;
  for ( var c = 0, cLen = cn.length; cLen > c; c++ )
  {
    var eachChild = cn[ c ];
    //alert(eachChild + ": " + eachChild.nodeType)
    if ( 1 == eachChild.nodeType && "param" == eachChild.localName)
    {
      var name = eachChild.getAttribute( "name" );
      var val = eachChild.getAttribute( "value" );
      shadowParams[ name ] = val;
      hasParam = true; 
      // alert("name: " + name + "\nvalue: " + val)
    }
  }

  var parametersAttrVal = el.getAttribute( "parameters" );
  if( parametersAttrVal )
  {
    // alert(parametersAttrVal)
    var paramSplit = parametersAttrVal.split(";");
    for ( var p = 0, pLen = paramSplit.length; pLen > p; p++ )
    {
      var eachPair = paramSplit[ p ];
      //alert("eachPair: " + eachPair)
      var pairSplit = eachPair.split(":");
      shadowParams[ pairSplit[0] ] = pairSplit[1];
      hasParam = true;
    }     
  }

  if ( hasParam )
  {
    //alert("hasParam")
    var idref = el.getAttributeNS( xlinkns, "href").replace("#", "");
    var refEl = document.getElementById( idref );

    //emulate modifying shadow tree by duplicating element are replacing over use element
    var newEl = refEl.cloneNode(true);

    // alert("EmulateShadowTree:\n\nnewEl:" + newEl + "\nshadowParams: " + shadowParams )
    SetParamValues( newEl, shadowParams, true );

    var wrapper = document.createElementNS( svgns, "g");
    var shadow = document.createElementNS( svgns, "g");
    for ( var ua = 0, uaLen = el.attributes.length; uaLen > ua; ua++ )
    {
      var attr = el.attributes[ ua ];
      if ( "content-value" != attr.localName && "params" != attr.localName && "parameters" != attr.localName 
            && "href" != attr.localName && "x" != attr.localName && "y" != attr.localName )
      {
        //copy use element attributes to replacement image
        shadow.setAttribute( attr.name, attr.value);
      }
    }

    var x = el.getAttribute("x");
    var y = el.getAttribute("y");
    wrapper.setAttribute( "transform", "translate(" + x + "," + y + ")");

    shadow.appendChild(newEl);
    wrapper.appendChild(shadow);


    var shadowEls = newEl.getElementsByTagName( "*" );
    for ( var e = 0, eLen = shadowEls.length; eLen > e; e++ )
    {
      var eachEl = shadowEls[ e ];
      SetParamValues( eachEl, shadowParams, true );

      for ( var a = 0, aLen = eachEl.attributes.length; aLen > a; a++ )
      {
        var attr = eachEl.attributes[ a ];
        var attrVal = attr.value;
        //alert("attr: " + attr.localName + "\nvalue: " + attrVal)
        if ( "id" == attr.localName )
        {
          //change id to unique id
          eachEl.setAttribute( attr.name, attrVal + "__" + idnum);
          uids[attrVal] = attrVal + "__" + idnum;
        }

        //alert( attrVal )
        if ( -1 != attrVal.indexOf("url(#") )
        {
          //alert( attrVal )
          for ( uid in uids )
          {
            //alert( uid + ": " + uids[uid] )
            if ( -1 != attrVal.indexOf( "url(#" + uid + ")" ) )
            {
              eachEl.setAttributeNS( attr.namespaceURI, attr.name, "url(#" + uids[uid] + ")" );
            }
          }
        }
      }
    }
    
    return wrapper;
  }
  return null;
}
