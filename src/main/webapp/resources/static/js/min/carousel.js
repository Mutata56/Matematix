"use strict";let counter=1,wasSelected=!1,elements=document.getElementsByClassName("manual-btn");setInterval(function(){wasSelected||(document.getElementById(`radio`+counter).checked=!0,5<++counter&&(counter=1))},5e3);const func=function(e){let t=e.getAttribute("for");var n=t.charAt(t.length-1);return function(){wasSelected=!0,counter=n,setInterval(function(){wasSelected=!1},6e4)}};for(let e=0;e<elements.length;e++)elements[e].addEventListener(`click`,func(elements[e]));