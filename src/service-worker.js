self.addEventListener('fetch', (event) => {
  // Ensure HTTP Basic Auth doesn't break the PWA by forcing credentials even on
  // same-origin requests.
  const modifiedRequest = new Request(event.request, {credentials: 'same-origin'});

  event.respondWith((async () => {
    return fetch(modifiedRequest);
  })());
});
