import getTodayDay from '../getTodayDay.js';
import getTodayClasses from './getTodayClasses.js';
import Header from '../components/header.js';

Header();
window.onload = () => {
    const pageHeading = document.querySelector('#pageHeading');
    pageHeading.textContent += getTodayDay().dayName;
    getTodayClasses();
};