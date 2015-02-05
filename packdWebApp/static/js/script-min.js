function distance(e,t,n,r){var i=6371;var s=(r-t).toRad();var o=(n-e).toRad();var u=Math.sin(s/2)*Math.sin(s/2)+Math.cos(t.toRad())*Math.cos(r.toRad())*Math.sin(o/2)*Math.sin(o/2);var a=2*Math.atan2(Math.sqrt(u),Math.sqrt(1-u));var f=i*a;return f}function applyColors(e){var t="rgba(50, 120, 222,";if(e=="Not Crowded"){t="rgba(52, 152, 219,"}else if(e=="Mildly Crowded"){t="rgba(41, 128, 185,"}else if(e=="Very Crowded"){t="rgba(155, 89, 182,"}else if(e=="Extreme"){t="rgba(44, 62, 80,"}$("#title_container").css("background-color",t+" 0.7)");$("#data_container").css("background-color",t+"1)");$("body").css("background-color",t+"1)")}function checkLoadFactor(e,t,n){var r=e.child("Size").val();if(r>LOAD_FACTOR){fireRef.update({Locked:true});refactor(e)}else{var i=e.child("-JgOwwFlFThZOqBMUnP0").child(t).child(n).child("current_average").child("measure").val();applyColors(i);if(i==null){$("#data").text(closedMessage);return}else if(USE_PERCENTS){$("#percentage").text(strings_to_percents[i])}if(i=="Mildly Crowded"){$("#data").text("Fairly Empty")}else if(i="Not Crowded"){$("#data").text("Almost Empty")}else{$("#data").text(i)}}}function refactor(e){var t=e.child("-JgOwwFlFThZOqBMUnP0").val();for(var n in t){for(var r in t[n]){var i=t[n][r];var s=getDenom(i);var o=0;for(var u in i){var a=weight(i[u]["measure"]);var f=i[u]["weight"];o+=a*(f/s)}var l=ints_to_strings[Math.round(o)];var c=s;var h="https://packd.firebaseio.com/-JgOwwFlFThZOqBMUnP0/"+n+"/"+r;var p=new Firebase(h);p.set({current_average:{measure:l,weight:c}})}}fireRef.update({Locked:false});fireRef.update({Size:0});var d=e.child("-JgOwwFlFThZOqBMUnP0").child(n).child(r).child("current_average").child("measure").val();if(d==null){$("#data").text(closedMessage);return}else if(USE_PERCENTS){$("#percentage").text(strings_to_percents[d])}$("#data").text(d)}function getDenom(e){var t=0;for(var n in e){var r=e[n];t+=r["weight"]}return t}function weight(e){return strings_to_ints[e]}function setCookie(e,t,n){var r=new Date;r.setTime(r.getTime()+n*24*60*60*1e3);var i="expires="+r.toUTCString();document.cookie=e+"="+t+"; "+i}function getCookie(e){var t=e+"=";var n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=n[r];while(i.charAt(0)==" ")i=i.substring(1);if(i.indexOf(t)==0)return i.substring(t.length,i.length)}return""}function checkCookie(e){var t=getCookie("user_data");if(t!=""){alert("You already voted, thanks!");return true}else{setCookie("user_data",e,1);return false}}var days={0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"};var ints_to_strings={1:"Not Crowded",2:"Mildly Crowded",3:"Very Crowded",4:"Extreme"};var strings_to_ints={"Not Crowded":1,"Mildly Crowded":2,"Very Crowded":3,Extreme:4};var strings_to_percents={"Not Crowded":"0% - 25%","Mildly Crowded":"26% - 65%","Very Crowded":"66% - 89%",Extreme:"89% - 100%"};var allowed_measures=new Set;for(var measure in strings_to_ints){allowed_measures.add(measure)}var fireRef=new Firebase("https://packd.firebaseio.com/");var closedMessage="RSF is Closed";var USE_PERCENTS=true;var RSF_LAT=37.868501;var RSF_LONG=-122.262702;var LOAD_FACTOR=200;var ALLOWED_RADIUS=.05;if(typeof Number.prototype.toRad==="undefined"){Number.prototype.toRad=function(){return this*Math.PI/180}}$(document).ready(function(){function s(e){$(".obscure_window_container").fadeIn(200);$(".obscure_window_text").text(e)}function o(){$(".obscure_window_container").fadeOut(200)}function u(t){if(navigator.geolocation){var n=t.coords.latitude;var s=t.coords.longitude;var u=distance(s,n,RSF_LONG,RSF_LAT);if(u>ALLOWED_RADIUS){alert("You aren't actually at the RSF.");o()}else{var a=null;for(var f=1;f<5;f++){var l="radio"+f;if(document.getElementById(l).checked){a=$("#"+l).val()}}if(!checkCookie(a)){if(!allowed_measures.has(a)){alert("Bad data input.");o()}else{fireRef.once("value",function(e){var t=e.child("Size").val();t+=1;fireRef.update({Size:t})});var c=fireRef.child("-JgOwwFlFThZOqBMUnP0");var h={measure:a,weight:1};c.child(i).child(r).push(h);e=true;alert("Thanks, we got it!");o()}}}}else{alert("Location services not working");o()}}var e=false;var t=new Date;var n=t.getDay();var r=t.getHours()*100;var i=days[n];fireRef.once("value",function(e){var t=null;var n=e.child("Locked").val();if(!n){checkLoadFactor(e,i,r)}else{t=e.child(i).child(r).val();if(t==null){$("#data").text(closedMessage)}else{applyColors(t);if(USE_PERCENTS){var s=strings_to_percents[t];$("#percentage").text(percentage)}if(t=="Mildly Crowded"){$("#data").text("Fairly Empty")}else{$("#data").text(t)}}}},function(e){var t="Either the RSF is closed, or something went wrong.";$("#data").text(t)});$("#send_data_submit").click(function(){if(!e){s("Calculating your location...");navigator.geolocation.getCurrentPosition(u)}else{alert("Thanks, we got it!")}})})