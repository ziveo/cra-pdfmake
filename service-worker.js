if (typeof importScripts === 'function') {
  // eslint-disable-next-line no-undef
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    workbox.core.skipWaiting();

    // Google Analytics
    workbox.googleAnalytics.initialize();

    /* injection point for manifest files.  */
    // eslint-disable-next-line no-restricted-globals
    workbox.precaching.precacheAndRoute([
      { revision: '02bd89d694ad554d1412c80e3c1de94d', url: 'icons/logo128.png' },
      { revision: 'ae97050960b1c9603c4add4c27d36fa5', url: 'icons/logo192.png' },
      { revision: '8c92c1481ff6b6a603fb9467b7b17d99', url: 'icons/logo256.png' },
      { revision: 'c4682a4b5e163750254d55008bf689d2', url: 'icons/logo32.png' },
      { revision: '8a029e3c04bea3fdadd7e5336cbeddfe', url: 'icons/logo36.png' },
      { revision: 'bdc7b9483aa8422b2763dc809443afe3', url: 'icons/logo512.png' },
      { revision: 'af094e6d1efd8aa5ecdf60cd6cc9a6be', url: 'icons/logo57.png' },
      { revision: '0f1ec108bc46136012fe1ede01996d5a', url: 'icons/logo60.png' },
      { revision: 'ae77ac64f30bcb794d116148bd35ee27', url: 'icons/logo64.png' },
      { revision: '6173110a9ead72ba896243f2db8ff2de', url: 'icons/logo72.png' },
      { revision: 'af6b7b624b052593d85b34208744451d', url: 'icons/logo76.png' },
      { revision: 'fa2ca61578215002ffe534b823075e29', url: 'icons/logo96.png' },
      { revision: 'bef8cbbac5df642e7708f369e563021b', url: 'screenshots/screenshot1.png' },
      { revision: '1ee90b90aa9390aa37ff4cf9e06882a3', url: 'static/css/main.92f98776.chunk.css' },
      { revision: 'c83a9d7a8619eec9d29b0efca91676ba', url: 'static/js/2.1628a28d.chunk.js' },
      { revision: '95efb7db094a9414ba61510237c7b05e', url: 'static/js/3.f2c8bf48.chunk.js' },
      { revision: '518e6cb010a3eb99590b29feebe3c8f4', url: 'static/js/4.1198669e.chunk.js' },
      { revision: 'b89d64639b2ed013492c3b1a49b61a50', url: 'static/js/5.36b1f744.chunk.js' },
      { revision: '0dedda03ed7744cc0fb3b7dfd15fc9e6', url: 'static/js/6.1cb9b3f2.chunk.js' },
      { revision: 'c9274e5a455bcdcbce9af267863b633e', url: 'static/js/main.f9863ef4.chunk.js' },
      { revision: '2199c3c4f625c02e097c6a5fe25ac075', url: 'static/js/runtime-main.2d9c8433.js' },
    ]);

    /* custom cache rules */
    workbox.routing.registerRoute(
      new workbox.routing.NavigationRoute(
        new workbox.strategies.NetworkFirst({
          cacheName: 'PRODUCTION',
        })
      )
    );
  } else {
    // console.log('Workbox could not be loaded. No Offline support');
  }
}
