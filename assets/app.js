import './bootstrap.js';
/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import './styles/app.css';

console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

document.addEventListener('turbo:submit-start', (event) => {
    const csrfField = event.detail.formSubmission.formElement.querySelector('input[type="hidden"][data-csrf-protection]');

    if (csrfField) {
        event.detail.formSubmission.fetchRequest.headers[csrfField.getAttribute('data-csrf-protection')] = csrfField.value;
    }
});

document.addEventListener('submit', (event) => {
    const csrfField = event.target.querySelector('input[type="hidden"][data-csrf-protection]');

    if (!csrfField) {
        return;
    }

    const csrfHeader = csrfField.getAttribute('data-csrf-protection');

    if (!/^[-a-zA-Z0-9_]+$/.test(csrfHeader)) {
        return
    }

    const csrfToken = btoa(String.fromCharCode.apply(null, (window.crypto || window.msCrypto).getRandomValues(new Uint8Array(18))));
    csrfField.value = csrfToken;
    const cookie = csrfHeader + '=' + csrfToken + '; path=/; samesite=strict';

    document.cookie = window.location.protocol === 'https:' ? '__Host-' + cookie + '; secure' : cookie;
});
