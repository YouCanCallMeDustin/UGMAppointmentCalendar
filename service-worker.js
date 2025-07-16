self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('calendar-app-v1').then(cache => {
            return cache.addAll([
                '/index.html',
                'https://cdn.tailwindcss.com',
                'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js',
                'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js',
                'https://cdn.onesignal.com/sdks/OneSignalSDK.js'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                return caches.match('/index.html');
            });
        })
    );
});