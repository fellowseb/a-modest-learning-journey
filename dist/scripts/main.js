"use strict";function closeMenu(){var e=document.getElementById("menu-nav");if(e){var n=document.getElementById("menu-button");e.classList.contains("open")&&(e.classList.remove("open"),n&&n.classList.remove("menu-button-open"))}}function toggleMenu(){var e=document.getElementById("menu-nav");if(e){var n=document.getElementById("menu-button");e.classList.contains("open")?(e.classList.remove("open"),n&&n.classList.remove("menu-button-open")):(e.classList.add("open"),n&&n.classList.add("menu-button-open"))}}function onWindowResize(){closeMenu()}function onMenuBtnClick(e){toggleMenu(),e.stopPropagation()}function onNavItemClick(e){closeMenu(),e.stopPropagation()}function onNavBgdClick(e){closeMenu(),e.stopPropagation()}function onNavBgdTouchMove(e){e.preventDefault()}!function(e){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?e():document.addEventListener("DOMContentLoaded",e)}(function(){var e=document.getElementById("menu-button");e&&e.addEventListener("click",onMenuBtnClick),window.addEventListener("resize",onWindowResize);var n=document.getElementById("menu-nav");if(n){n.addEventListener("click",onNavBgdClick),n.addEventListener("touchmove",onNavBgdTouchMove,!1);var t=n.querySelectorAll(".menu-nav-link");Array.prototype.forEach.call(t,function(e,n){e.addEventListener("click",onNavItemClick)})}});