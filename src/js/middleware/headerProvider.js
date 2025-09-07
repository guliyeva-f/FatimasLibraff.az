import { getHeader, getOverlay } from '../components/header.js';

// bu js fayli bir nece html faylindaki headerContainer, overlay id`li divlere content menimsedir

const headerContainer = document.getElementById('headerContainer');
const overlay = document.getElementById('overlay');

if (headerContainer) headerContainer.innerHTML = getHeader();
else console.warn('Header container tapılmadı!');

if (overlay) overlay.innerHTML = getOverlay();
else console.warn('Overlay container tapılmadı!');