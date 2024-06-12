// The name of the cache your app uses.
const CACHE_NAME = "my-app-cache";
const PRE_CACHED_RESOURCES = [];//"/", "styles.css", "app.js", "/offline"];

self.addEventListener("install", event => {
  console.log(event);
  async function preCacheResources() {
    // Open the app's cache.
    const cache = await caches.open(CACHE_NAME);
    // Cache all static resources.
    //cache.addAll(PRE_CACHED_RESOURCES);
  }
  event.waitUntil(preCacheResources());
  console.log("Installed!");
});
self.addEventListener("activate", event => {
    console.log("WORKER: activate event in progress.");
    console.log("To uninstall service worker:");
    console.log(`navigator.serviceWorker.getRegistrations().then(r => {
    for (const registration of r) {
        console.log("unreg",r);
        registration.unregister();
    } 
})`);
});
self.addEventListener("fetch", event => {
      console.log("fetch",event);
  async function navigateOrDisplayOfflinePage() {
    try {
      console.log("req",event.request);
      const networkResponse = await fetch(event.request);
      return networkResponse;
    } catch (error) {
      const cache = await caches.open(CACHE_NAME);
      const cachedResponse = await cache.match("/offline");
      return cachedResponse;
    }
  }
  // Only call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === 'navigate') {
    event.respondWith(navigateOrDisplayOfflinePage());
  }
});