({144:function(){var e,t=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,c){function s(e){try{i(o.next(e))}catch(e){c(e)}}function l(e){try{i(o.throw(e))}catch(e){c(e)}}function i(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,l)}i((o=o.apply(e,t||[])).next())}))},n=this&&this.__generator||function(e,t){var n,o,r,c,s={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return c={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function l(l){return function(i){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;c&&(c=0,l[0]&&(s=0)),s;)try{if(n=1,o&&(r=2&l[0]?o.return:l[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,l[1])).done)return r;switch(o=0,r&&(l=[2&l[0],r.value]),l[0]){case 0:case 1:r=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,o=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!((r=(r=s.trys).length>0&&r[r.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!r||l[1]>r[0]&&l[1]<r[3])){s.label=l[1];break}if(6===l[0]&&s.label<r[1]){s.label=r[1],r=l;break}if(r&&s.label<r[2]){s.label=r[2],s.ops.push(l);break}r[2]&&s.ops.pop(),s.trys.pop();continue}l=t.call(e,s)}catch(e){l=[6,e],o=0}finally{n=r=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,i])}}},o="",r=0,c=0,s=[];function l(){e.remove(),c=0}function i(){var e=s[r].message,t=s[r].response;if(o)if("Ask a question to your future self"===e){var n=prompt(e);if(n){var c={message:n,response:""};console.log(typeof s),console.log(c),s.push(c)}}else t?confirm('Would you like to change your answer to "'.concat(e,'" from "').concat(t,'"?'))&&(s[r].response=prompt(e)):s[r].response=prompt(e);else o=prompt("What is your name?"),chrome.storage.local.set({username:o});chrome.storage.local.set({glitchPrompts:s}).then((function(){console.log('Response to "'+e+'" is "'+s[r].response+'".')}))}function a(e,t){return Math.floor(Math.random()*(t-e+1))+e}s.push({message:"Ask a question to your future self",response:""}),function(){return t(this,void 0,void 0,(function(){return n(this,(function(e){switch(e.label){case 0:return[4,chrome.storage.local.get(["username"])];case 1:return[2,e.sent().username]}}))}))}().then((function(e){o=e})),function(){return t(this,void 0,void 0,(function(){return n(this,(function(e){switch(e.label){case 0:return[4,chrome.storage.local.get(["glitchPrompts"])];case 1:return[2,e.sent().glitchPrompts]}}))}))}().then((function(t){t&&(s.push.apply(s,t.slice(1)),console.log("fetch prompts completed and merged")),function(){if(0===c){var t=function(e){for(var t=[],n=0;n<e.length;n++){var o=e[n];(r=o).offsetHeight>0&&r.offsetWidth>0&&t.push(o)}var r;return t}(document.getElementsByTagName("*")),n=t[a(0,t.length-1)];r=a(0,s.length-1),console.log(r,"index"),console.log(s.length),console.log(s),e=function(e){var t=e.getBoundingClientRect(),n=document.createElement("div");n.classList.add("glitch"),n.style.top="".concat(t.top+window.scrollY,"px"),n.style.left="".concat(t.left+window.scrollX,"px"),n.style.width="".concat(t.width,"px"),n.style.height="".concat(t.height,"px"),n.style.fontSize="".concat(t.height/1.2,"px"),n.addEventListener("mouseleave",l),n.addEventListener("click",i),document.body.appendChild(n);var r=document.createElement("span");return r.textContent=o?"Hi ".concat(o):"Click Me",n.appendChild(r),n}(n),console.log(e),console.log("Glitch inserted"),c=1}}()}))}})[144]();