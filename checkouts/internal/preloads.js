(function() {
    var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
    var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/runtime.latest.en.449460d1e783d9a499e3.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/6721.latest.en.3df8209083289e7d749d.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/6276.latest.en.a91148d59ab9163c723b.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/7623.latest.en.d3dbd54ce6ce8588a9a8.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.0888806750b160e4fbce.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/9033.latest.en.255b8a9d0304673e30f6.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/3502.latest.en.9ed854e0783852147f46.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/1519.latest.en.31d9fdc0eefc437489a1.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/4415.latest.en.2fc115343ebf1c779871.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/4760.latest.en.e1e7d93e32b09a2e6ebd.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/737.latest.en.365132fd46cf3a946f07.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/4253.latest.en.505636d0965d67dd30c0.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/3337.latest.en.640b48a106dd2e36b0a6.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/OnePage.latest.en.2e84484134d192308aba.js"];
    var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/6721.latest.en.5e47e00c5eff4e2cef27.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/app.latest.en.7030762cc777f3a6277f.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/6268.latest.en.1d7ba5c5498e967a4d84.css"];
    var fontPreconnectUrls = [];
    var fontPrefetchUrls = [];
    var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0816/1814/1505/files/Realitees_logo_x320.png?v=1692862557"];

    function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
    }

    function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
            var res = resources[index++];
            if (res) preconnect(res, next);
        })();
    }

    function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
            link.rel = 'prefetch';
            link.fetchPriority = 'low';
            link.as = as;
            if (as === 'font') link.type = 'font/woff2';
            link.href = url;
            link.crossOrigin = '';
            link.onload = link.onerror = callback;
            document.head.appendChild(link);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onloadend = callback;
            xhr.send();
        }
    }

    function prefetchAssets() {
        var resources = [].concat(
            scripts.map(function(url) {
                return [url, 'script'];
            }),
            styles.map(function(url) {
                return [url, 'style'];
            }),
            fontPrefetchUrls.map(function(url) {
                return [url, 'font'];
            }),
            imgPrefetchUrls.map(function(url) {
                return [url, 'image'];
            })
        );
        var index = 0;
        (function next() {
            var res = resources[index++];
            if (res) prefetch(res[0], res[1], next);
        })();
    }

    function onLoaded() {
        preconnectAssets();
        prefetchAssets();
    }

    if (document.readyState === 'complete') {
        onLoaded();
    } else {
        addEventListener('load', onLoaded);
    }
})();