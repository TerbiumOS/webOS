/*global UVServiceWorker,__uv$config*/
/*
 * Stock service worker script.
 * Users can provide their own sw.js if they need to extend the functionality of the service worker.
 * Ideally, this will be registered under the scope in uv.config.js so it will not need to be modified.
 * However, if a user changes the location of uv.bundle.js/uv.config.js or sw.js is not relative to them, they will need to modify this script locally.
 */
try {
    importScripts('/libcurl/index.js');
    importScripts('/baremux/bare.js');
    importScripts('/uv/uv.bundle.js');
    importScripts('/uv/uv.config.js');
    importScripts('/uv/uv.sw.js');
    
    const sw = new UVServiceWorker();
    
    self.addEventListener('fetch', (event) => {
      event.respondWith(sw.fetch(event));
    });
    
    sw.on('request', (event) => {
      event.data.headers['user-agent'] =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 HyperTabs/1.4.0';
    });
  } catch (e) {
    console.error(e);
  }