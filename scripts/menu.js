"use strict";function closeMenu(){var e=document.getElementById("menu-nav");if(e){var n=document.getElementById("menu-button");e.classList.contains("open")&&(e.classList.remove("open"),n&&n.classList.remove("menu-button-open"))}}function toggleMenu(){var e=document.getElementById("menu-nav");if(e){var n=document.getElementById("menu-button");e.classList.contains("open")?(e.classList.remove("open"),n&&n.classList.remove("menu-button-open")):(e.classList.add("open"),n&&n.classList.add("menu-button-open"))}}function onWindowResize(){closeMenu()}function onMenuBtnClick(e){toggleMenu(),e.stopPropagation()}function setCurrentNav(e){var n=document.getElementById("menu-nav"),t=n.querySelector("a[id="+e+"]"),o=n.querySelectorAll(".menu-nav-link");Array.prototype.forEach.call(o,function(e,n){e.classList.remove("menu-nav-link-current")}),t.classList.add("menu-nav-link-current")}function onNavItemClick(e){if((closeMenu(),window.scrollBy&&"A"===e.target.tagName.toUpperCase())&&0<=e.target.href.indexOf("#")){e.preventDefault();var n=e.target.href.substr(e.target.href.indexOf("#")+1),t=window.location.href.lastIndexOf("#");t?window.history.pushState({currentMenuLink:e.target.id},document.title,window.location.href.substr(0,t)+"#"+n):window.history.pushState({currentMenuLink:e.target.id},document.title,window.location.href+"#"+n),setCurrentNav(e.target.id),e.target.classList.add("menu-nav-link-current");var o=document.querySelectorAll("a[name="+n+"]")[0];window.scrollBy({top:o.offsetTop-window.pageYOffset,left:0,behavior:"smooth"})}e.stopPropagation()}function onPopState(){var e=window.history.state;e.currentMenuLink&&setCurrentNav(e.currentMenuLink)}function findMenuNavLink(n){var e=document.querySelectorAll("a.menu-nav-link");return Array.prototype.find.call(e,function(e){return e.href.substr(e.href.lastIndexOf("#")+1)===n})}function updateCurrentNav(){var e=document.querySelectorAll("a.anchor"),n=Array.prototype.map.call(e,function(e,n,t){var o=n+1<t.length?t[n+1].offsetTop:document.documentElement.scrollHeight,a=Math.min(o,window.pageYOffset+window.innerHeight),r=e.offsetTop;return{visiblePageHeight:a-Math.max(r,window.pageYOffset),anchor:e}}).sort(function(e,n){return e.visiblePageHeight<n.visiblePageHeight})[0];if(n&&n.anchor){var t=findMenuNavLink(n.anchor.name);t&&setCurrentNav(t.id)}}function onScroll(){updateCurrentNav()}function onNavBgdClick(e){closeMenu(),e.stopPropagation()}function onNavBgdTouchMove(e){e.preventDefault()}!function(e){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?e():document.addEventListener("DOMContentLoaded",e)}(function(){var e=document.getElementById("menu-button");e&&e.addEventListener("click",onMenuBtnClick),window.addEventListener("resize",onWindowResize);var n=document.getElementById("menu-nav");if(n){n.addEventListener("click",onNavBgdClick),n.addEventListener("touchmove",onNavBgdTouchMove,!1);var t=n.querySelectorAll(".menu-nav-link");Array.prototype.forEach.call(t,function(e,n){e.addEventListener("click",onNavItemClick)})}window.addEventListener("popstate",onPopState),window.addEventListener("scroll",onScroll),0===window.pageYOffset&&updateCurrentNav()});