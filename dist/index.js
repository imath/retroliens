parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"XfJI":[function(require,module,exports) {
function r(r){if(Array.isArray(r)){for(var e=0,n=new Array(r.length);e<r.length;e++)n[e]=r[e];return n}}module.exports=r;
},{}],"OMTj":[function(require,module,exports) {
function t(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}module.exports=t;
},{}],"wFNi":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}module.exports=e;
},{}],"Fhqp":[function(require,module,exports) {
var r=require("./arrayWithoutHoles"),e=require("./iterableToArray"),a=require("./nonIterableSpread");function o(o){return r(o)||e(o)||a()}module.exports=o;
},{"./arrayWithoutHoles":"XfJI","./iterableToArray":"OMTj","./nonIterableSpread":"wFNi"}],"fcMS":[function(require,module,exports) {
function n(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")}module.exports=n;
},{}],"P8NW":[function(require,module,exports) {
function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function r(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}module.exports=r;
},{}],"b9XL":[function(require,module,exports) {
function o(t){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?module.exports=o=function(o){return typeof o}:module.exports=o=function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},o(t)}module.exports=o;
},{}],"E7HD":[function(require,module,exports) {
function e(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}module.exports=e;
},{}],"pxk2":[function(require,module,exports) {
var e=require("../helpers/typeof"),r=require("./assertThisInitialized");function t(t,i){return!i||"object"!==e(i)&&"function"!=typeof i?r(t):i}module.exports=t;
},{"../helpers/typeof":"b9XL","./assertThisInitialized":"E7HD"}],"UJE0":[function(require,module,exports) {
function t(e){return module.exports=t=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},t(e)}module.exports=t;
},{}],"AkAO":[function(require,module,exports) {
function t(o,e){return module.exports=t=Object.setPrototypeOf||function(t,o){return t.__proto__=o,t},t(o,e)}module.exports=t;
},{}],"d4H2":[function(require,module,exports) {
var e=require("./setPrototypeOf");function r(r,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(t&&t.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),t&&e(r,t)}module.exports=r;
},{"./setPrototypeOf":"AkAO"}],"eZcy":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=s(require("@babel/runtime/helpers/toConsumableArray")),t=s(require("@babel/runtime/helpers/classCallCheck")),r=s(require("@babel/runtime/helpers/createClass")),n=s(require("@babel/runtime/helpers/possibleConstructorReturn")),a=s(require("@babel/runtime/helpers/getPrototypeOf")),i=s(require("@babel/runtime/helpers/assertThisInitialized")),o=s(require("@babel/runtime/helpers/inherits"));function s(e){return e&&e.__esModule?e:{default:e}}var l=wp.element,c=l.createElement,u=l.Component,p=l.Fragment,d=wp.i18n.__,k=wp.data,b=k.withSelect,f=k.withDispatch,h=wp.components,v=h.Panel,m=h.PanelBody,g=h.PanelRow,y=h.TextControl,C=h.ExternalLink,w=h.Button,q=h.Dashicon,P=h.Snackbar,T=wp.compose.compose,S=wp.url.filterURLForDisplay,_=lodash,R=_.indexOf,x=_.pull,N=_.head,B=function(s){function l(){var e;return(0,t.default)(this,l),(e=(0,n.default)(this,(0,a.default)(l).apply(this,arguments))).state={trackback:"",trackbacks:[],pinged:[],error:null},e.removeNotice=e.removeNotice.bind((0,i.default)(e)),e}return(0,o.default)(l,s),(0,r.default)(l,[{key:"componentDidMount",value:function(){var e=this.props,t=e.trackbacks,r=e.pinged,n={};t&&(n.trackbacks=t),r&&(n.pinged=r),this.setState(n)}},{key:"addTrackback",value:function(t){t.preventDefault();var r=this.state,n=r.trackbacks,a=r.pinged,i=r.trackback,o=this.props.onAddTrackBack,s=n;if(i&&-1===R(n,i)&&-1===R(a,i))return s=[].concat((0,e.default)(s),[i]),this.setState({error:null,trackback:"",trackbacks:s}),o(s);this.setState({trackback:"",error:1})}},{key:"removeTrackback",value:function(t,r){t.preventDefault();var n=this.state.trackbacks,a=this.props.onRemoveTrackBack;return x(n,r),this.setState({trackacks:n}),a([].concat((0,e.default)(n),[[""]]))}},{key:"removeNotice",value:function(){this.setState({error:null})}},{key:"render",value:function(){var e,t,r,n,a=this,i=this.state,o=i.trackback,s=i.trackbacks,l=i.pinged,u=i.error;return s&&s.length&&N(s)&&(e=s.map(function(e,n){if(t=e.replace("wp-trackback.php","").replace("/trackback",""),r=S(t),e&&-1===R(l,e))return c("li",{key:"trackback-"+n},c("a",{href:"#",onClick:function(t){return a.removeTrackback(t,e)}},c(q,{icon:"trash"}))," ",c("a",{href:t},r))}),n=c(v,null,c(m,{title:d("Rétroliens à envoyer","retroliens"),initialOpen:!0,className:"retroliens-sidebar-panel-body manage-retroliens"},c(g,null,c("ul",null,e))))),c(p,null,c(v,null,c(m,{title:d("Envoyer des rétroliens","retroliens"),initialOpen:!0,className:"retroliens-sidebar-panel-body add-retroliens"},c(g,null,c("div",null,c(y,{label:d("URL de destination","retroliens"),value:o,type:"url",onChange:function(e){a.setState({trackback:e})}}),c(w,{isPrimary:!0,isLarge:!0,onClick:function(e){return a.addTrackback(e)}},d("Ajouter","retroliens")),c("p",{className:"description"},c(q,{icon:"info"})," ",d("Un rétrolien est une manière de notifier les anciens systèmes de blog que vous avez fait un lien vers eux. Si vous faites des liens vers des sites WordPress, ils seront notifiés automatiquement à l’aide des pings, sans que vous n’ayez rien à faire.","retroliens"),c("br",null),c(C,{href:"https://wordpress.org/support/article/introduction-to-blogging/#comments",hrefLang:"en"},d("En savoir plus sur les pings (en).","retroliens"))))))),n,u&&c(P,{onRemove:this.removeNotice},d("Ce rétrolien est déjà « à envoyer » ou « envoyé ».","retroliens")))}}]),l}(u),D=T([b(function(e){var t=e("core/editor").getCurrentPost();return{trackbacks:t.to_ping,pinged:t.pinged}}),f(function(e){return{onAddTrackBack:function(t){e("core/editor").editPost({to_ping:t})},onRemoveTrackBack:function(t){e("core/editor").editPost({to_ping:t[0]})}}})])(B),L=D;exports.default=L;
},{"@babel/runtime/helpers/toConsumableArray":"Fhqp","@babel/runtime/helpers/classCallCheck":"fcMS","@babel/runtime/helpers/createClass":"P8NW","@babel/runtime/helpers/possibleConstructorReturn":"pxk2","@babel/runtime/helpers/getPrototypeOf":"UJE0","@babel/runtime/helpers/assertThisInitialized":"E7HD","@babel/runtime/helpers/inherits":"d4H2"}],"gWSW":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=i(require("@babel/runtime/helpers/classCallCheck")),t=i(require("@babel/runtime/helpers/createClass")),r=i(require("@babel/runtime/helpers/possibleConstructorReturn")),n=i(require("@babel/runtime/helpers/getPrototypeOf")),l=i(require("@babel/runtime/helpers/inherits"));function i(e){return e&&e.__esModule?e:{default:e}}var a=wp.element,u=a.createElement,o=a.Component,s=wp.i18n.__,p=wp.data.withSelect,c=wp.components,d=c.Panel,f=c.PanelBody,h=c.PanelRow,b=c.Dashicon,m=wp.compose.compose,y=wp.url.filterURLForDisplay,g=function(i){function a(){var t;return(0,e.default)(this,a),(t=(0,r.default)(this,(0,n.default)(a).apply(this,arguments))).state={pinged:[]},t}return(0,l.default)(a,i),(0,t.default)(a,[{key:"componentDidMount",value:function(){var e=this.props.pinged;e&&this.setState({pinged:e})}},{key:"render",value:function(){var e,t,r,n=this.state.pinged;return n&&n.length?(e=n.map(function(e,n){if(t=e.replace("wp-trackback.php","").replace("/trackback",""),r=y(t),e)return u("li",{key:"pinged-"+n},u(b,{icon:"yes"})," ",u("a",{href:t},r))}),u(d,null,u(f,{title:s("Rétroliens envoyés","retroliens"),initialOpen:!1,className:"retroliens-sidebar-panel-body added-retroliens"},u(h,null,u("ul",null,e))))):null}}]),a}(o),v=m([p(function(e){return{pinged:e("core/editor").getCurrentPost().pinged}})])(g),w=v;exports.default=w;
},{"@babel/runtime/helpers/classCallCheck":"fcMS","@babel/runtime/helpers/createClass":"P8NW","@babel/runtime/helpers/possibleConstructorReturn":"pxk2","@babel/runtime/helpers/getPrototypeOf":"UJE0","@babel/runtime/helpers/inherits":"d4H2"}],"Focm":[function(require,module,exports) {
"use strict";var e=r(require("./components/trackbacks-send")),n=r(require("./components/sent-trackbacks"));function r(e){return e&&e.__esModule?e:{default:e}}var t=wp.element.createElement,i=wp.plugins.registerPlugin,l=wp.editPost.PluginSidebar,s=wp.i18n.__;function u(){return t(l,{name:"retroliens/manage",title:s("Rétroliens","retroliens"),icon:"admin-links"},t(e.default,null),t(n.default,null))}i("retroliens",{render:u});
},{"./components/trackbacks-send":"eZcy","./components/sent-trackbacks":"gWSW"}]},{},["Focm"], null)
//# sourceMappingURL=/index.js.map