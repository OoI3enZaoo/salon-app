<template>
  <div>


    <div class='intro'>It's a form.</div>
    <div class='creditCardContainer'>
      <div class='creditCard'>
        <div class='cardTitle'>Credit Card</div>
        <input id='creditCardNumber' maxlength='12' placeholder='1111 2222 3333 4444'>
        <input id='expirationDate' maxlength='4' placeholder='02/17'>
        <input id='customerName' maxlength='18' placeholder='John Doe'>
      </div>
      <div class='creditCard back'>
        <div class='stripe'></div>
        <div class='signature'>Your Signature</div>
        <input id='ccv' maxlength='3' placeholder='123'>
      </div>
    </div>



</div>
</template>
<style >
@import url(https://fonts.googleapis.com/css?family=Mr+Dafoe);
@import url(https://fonts.googleapis.com/css?family=Share+Tech+Mono);
input {
  font-family: Share Tech Mono,sans-serif;
}

html {

  background: -webkit-gradient(linear, left top, left bottom, from(#44c765), to(#32a64f));
  background: -moz-linear-gradient(top, #44c765, #32a64f);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#44c765', endColorstr='#32a64f');
  /* Nova+Mono|Share+Tech+Mono|Anonymous+Pro */
  font-family: sans-serif;
  min-height: 100%;
}

.intro {
  width: 400px;
  text-align: center;
  margin: 20px auto;
  color: #efefef;
  text-shadow: 1px 1px 2px #267f3d;
}

.creditCardContainer {
  max-width: 800px;
  margin: 20px auto;
}

.creditCard {
  width: 350px;
  height: 175px;
  border-radius: 20px;
  background: #369;
  margin: 20px 2%;
  background: -webkit-gradient(linear, left top, left bottom, from(#4485C7), to(#326ca6));
  background: -moz-linear-gradient(top, #4485C7, #326ca6);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#4485C7', endColorstr='#326ca6');
  border: solid 3px #326ca6;
  box-shadow: 0 0 10px #267f3d;
  float: left;
}

.cardTitle {
  color: #dbdbdb;
  padding: 40px 0 0 30px;
}

#creditCardNumber {
  padding: 0;
  font-size: 24px;
  text-align: center;
  border: none;
  letter-spacing: 2px;
  background: transparent;
  color: #efefef;
  width: 100%;
}
#creditCardNumber::-webkit-input-placeholder {
  color: #efefef;
  opacity: 0.2;
  letter-spacing: 2px;
}

#customerName {
  background: transparent;
  border: none;
  border-bottom: slid 1px #efefef;
  margin: 0 30px;
  font-size: 15px;
  color: #BFBFBF;
  outline: none;
}
#customerName::-webkit-input-placeholder {
  color: #BFBFBF;
  opacity: 0.5;
  letter-spacing: 2px;
}

#expirationDate {
  background: transparent;
  border: none;
  margin: 30px 0 0 30px;
  font-size: 15px;
  color: #BFBFBF;
}
#expirationDate::-webkit-input-placeholder {
  color: #BFBFBF;
  opacity: 0.5;
  letter-spacing: 2px;
}

.stripe {
  background: #111;
  height: 30px;
  margin-top: 25px;
}

.signature {
  margin: 20px 0 20px 20px;
  background: #2F5E8F;
  width: 220px;
  display: inline-block;
  padding: 6px 12px;
  font-size: 24px;
  font-family: "Mr Dafoe";
  color: #222;
}

#ccv {
  background: #efefef;
  border: solid 1px #efefef;
  font-size: 18px;
  padding: 12px;
  width: 40px;
  display: inline-block;
  position: relative;
  left: -5px;
  top: -1px;
}

</style>
<script>
/*
	Masked Input plugin for jQuery
	Copyright (c) 2007-2013 Josh Bush (digitalbush.com)
	Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
	Version: 1.3.1
*/
(function(e){function t(){var e=document.createElement("input"),t="onpaste";return e.setAttribute(t,""),"function"==typeof e[t]?"paste":"input"}var n,a=t()+".mask",r=navigator.userAgent,i=/iphone/i.test(r),o=/android/i.test(r);e.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},e.fn.extend({caret:function(e,t){var n;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof e?(t="number"==typeof t?t:e,this.each(function(){this.setSelectionRange?this.setSelectionRange(e,t):this.createTextRange&&(n=this.createTextRange(),n.collapse(!0),n.moveEnd("character",t),n.moveStart("character",e),n.select())})):(this[0].setSelectionRange?(e=this[0].selectionStart,t=this[0].selectionEnd):document.selection&&document.selection.createRange&&(n=document.selection.createRange(),e=0-n.duplicate().moveStart("character",-1e5),t=e+n.text.length),{begin:e,end:t})},unmask:function(){return this.trigger("unmask")},mask:function(t,r){var c,l,s,u,f,h;return!t&&this.length>0?(c=e(this[0]),c.data(e.mask.dataName)()):(r=e.extend({placeholder:e.mask.placeholder,completed:null},r),l=e.mask.definitions,s=[],u=h=t.length,f=null,e.each(t.split(""),function(e,t){"?"==t?(h--,u=e):l[t]?(s.push(RegExp(l[t])),null===f&&(f=s.length-1)):s.push(null)}),this.trigger("unmask").each(function(){function c(e){for(;h>++e&&!s[e];);return e}function d(e){for(;--e>=0&&!s[e];);return e}function m(e,t){var n,a;if(!(0>e)){for(n=e,a=c(t);h>n;n++)if(s[n]){if(!(h>a&&s[n].test(R[a])))break;R[n]=R[a],R[a]=r.placeholder,a=c(a)}b(),x.caret(Math.max(f,e))}}function p(e){var t,n,a,i;for(t=e,n=r.placeholder;h>t;t++)if(s[t]){if(a=c(t),i=R[t],R[t]=n,!(h>a&&s[a].test(i)))break;n=i}}function g(e){var t,n,a,r=e.which;8===r||46===r||i&&127===r?(t=x.caret(),n=t.begin,a=t.end,0===a-n&&(n=46!==r?d(n):a=c(n-1),a=46===r?c(a):a),k(n,a),m(n,a-1),e.preventDefault()):27==r&&(x.val(S),x.caret(0,y()),e.preventDefault())}function v(t){var n,a,i,l=t.which,u=x.caret();t.ctrlKey||t.altKey||t.metaKey||32>l||l&&(0!==u.end-u.begin&&(k(u.begin,u.end),m(u.begin,u.end-1)),n=c(u.begin-1),h>n&&(a=String.fromCharCode(l),s[n].test(a)&&(p(n),R[n]=a,b(),i=c(n),o?setTimeout(e.proxy(e.fn.caret,x,i),0):x.caret(i),r.completed&&i>=h&&r.completed.call(x))),t.preventDefault())}function k(e,t){var n;for(n=e;t>n&&h>n;n++)s[n]&&(R[n]=r.placeholder)}function b(){x.val(R.join(""))}function y(e){var t,n,a=x.val(),i=-1;for(t=0,pos=0;h>t;t++)if(s[t]){for(R[t]=r.placeholder;pos++<a.length;)if(n=a.charAt(pos-1),s[t].test(n)){R[t]=n,i=t;break}if(pos>a.length)break}else R[t]===a.charAt(pos)&&t!==u&&(pos++,i=t);return e?b():u>i+1?(x.val(""),k(0,h)):(b(),x.val(x.val().substring(0,i+1))),u?t:f}var x=e(this),R=e.map(t.split(""),function(e){return"?"!=e?l[e]?r.placeholder:e:void 0}),S=x.val();x.data(e.mask.dataName,function(){return e.map(R,function(e,t){return s[t]&&e!=r.placeholder?e:null}).join("")}),x.attr("readonly")||x.one("unmask",function(){x.unbind(".mask").removeData(e.mask.dataName)}).bind("focus.mask",function(){clearTimeout(n);var e;S=x.val(),e=y(),n=setTimeout(function(){b(),e==t.length?x.caret(0,e):x.caret(e)},10)}).bind("blur.mask",function(){y(),x.val()!=S&&x.change()}).bind("keydown.mask",g).bind("keypress.mask",v).bind(a,function(){setTimeout(function(){var e=y(!0);x.caret(e),r.completed&&e==x.val().length&&r.completed.call(x)},0)}),y()}))}})})(jQuery);

//Set the masking styles using the masked input plugin
jQuery(function($){
  //Set the mask style for the credit card number
  $("#creditCardNumber").mask("9999 9999 9999 9999");
  //Set the mask style for the expiration date
  $("#expirationDate").mask("99 / 99");
});

//Update the signature as it is typed
$("input").keyup(function() {
  //Get the value for the customer name input on the front of the card
  $customerName = $("#customerName").val();
  //If the customer name input is blank, add a default signature
  //otherwise, update the signature with the value of the name input
  if( $customerName.length > 0 ) {
    //Set the signature to the name input value
    $(".signature").html($customerName);
  } else {
    //Set the signature to the default value
    $(".signature").html("Your Signature");
  }
});

//Add support for credit card type (brand) detection, update the credit card input mask stlye if cc uses a different layout than the standard 4x4
export default {
  name: "",
  data: () => ({

  })
}
</script>
