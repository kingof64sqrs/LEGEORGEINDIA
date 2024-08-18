shopify.extend('WebPixel::Render', function(api) {
    var analytics = api.analytics,
        browser = api.browser,
        init = api.init;
    var e = api._pixelInfo ? api._pixelInfo.runtimeContext : null,
        n = api._pixelInfo ? api._pixelInfo.type : null;
    analytics.subscribe("all_standard_events", (function(i) {
        var l, o;
        l = i.name, o = i, browser.localStorage.getItem("shopify-pixel-mode").then((function(i) {
            "debug" === i && console.log(`[shopify-pixel][${n}][${e}] ${l}`, o)
        })).catch((function() {}))
    }));
});