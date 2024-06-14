"use strict";
// main.ts
document.addEventListener('DOMContentLoaded', () => {
    const homeButton = document.getElementById('homeButton');
    const aboutButton = document.getElementById('aboutButton');
    const homeView = document.getElementById('home');
    const aboutView = document.getElementById('about');
    aboutButton.addEventListener('click', () => {
        homeView.classList.remove('active');
        aboutView.classList.add('active');
    });
    homeButton.addEventListener('click', () => {
        aboutView.classList.remove('active');
        homeView.classList.add('active');
    });
});
