(() => {
    var A = "WebPixel::Render";
    var g = function(e) {
        return shopify.extend(A, e)
    };
    var u = "https://pixel-api.socialhead.io",
        I = "/api/store/conversions-api",
        p = "payment_info_submitted",
        m = "checkout_completed",
        O = [p, m];

    function P() {
        var t = function() {
            return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
        };
        return t() + t() + "" + t() + t() + t() + t() + t() + t()
    }

    function h(t) {
        return W(t).padEnd(32, "0").slice(0, 32)
    }

    function W(t) {
        let e = T(t),
            r = T(e.toString()),
            o = T(r.toString());
        return S(e) + S(r) + S(o)
    }

    function T(t) {
        let e = 0;
        for (let r = 0; r < t.length; r++) {
            let o = t.charCodeAt(r);
            e = (e << 5) - e + o, e = e & e
        }
        return e >>> 0
    }

    function S(t) {
        return t.toString(16).padStart(8, "0")
    }
    var C = {},
        b = "",
        q = {},
        Q = P(),
        Z = t => {
            let e = [],
                r = [],
                o = [],
                n = 0,
                a = "",
                i = 0;
            t.lineItems.forEach(l => {
                e.push(l.variant.id), r.push(l.variant.product.id), i += l.quantity, o.push({
                    id: l.variant.id,
                    quantity: l.quantity
                })
            }), a = t.currencyCode, n = parseFloat(t.totalPrice.amount), V("AddPaymentInfo", Q, {
                content_ids: e,
                variant_id: e,
                product_id: r,
                contents: o,
                currency: a,
                value: n
            })
        },
        $ = t => {
            var v, N, w;
            let e = [],
                r = [],
                o = "",
                n = 0,
                a = [],
                i = 0,
                _ = "product_group",
                l = "",
                y = h(t.order.id);
            t.lineItems.forEach((d, X) => {
                e.push(d.variant.id), r.push(d.variant.product.id), n += d.quantity, X < t.lineItems.length - 1 ? o += d.title + "," : o += d.title, a.push({
                    id: d.variant.id,
                    quantity: d.quantity
                })
            }), l = t.currencyCode, i = parseFloat(t.totalPrice.amount);
            let s = t.billingAddress || {},
                f = t.email || "",
                c = s.city || "",
                U = s.phone || "",
                L = s.country || "",
                K = s.firstName || "",
                j = s.lastName || "",
                z = s.zip || "",
                Y = s.state ? s.state : s.province || "",
                G = {
                    content_ids: e,
                    variant_id: e,
                    product_id: r,
                    content_name: o,
                    content_type: _,
                    contents: a,
                    currency: l,
                    num_items: n,
                    value: i
                },
                J = {
                    em: f,
                    ct: c,
                    ph: U,
                    country: L,
                    fn: K,
                    ln: j,
                    zp: z,
                    st: Y,
                    external_id: ((v = t.order) == null ? void 0 : v.id) || ((w = (N = t.order) == null ? void 0 : N.customer) == null ? void 0 : w.id)
                };
            V("Purchase", y, G, J)
        },
        V = (t, e, r, o) => {
            let n = {
                shop: b,
                event_name: t,
                event_time: new Date().getTime(),
                event_id: e,
                action_source: "website",
                custom_data: r,
                event_source_url: C.context.window.location.href,
                social_type: "facebook",
                is_web_worker: !0
            };
            t == "Purchase" && o && (n.user_data = o), q.sendBeacon(u + I, JSON.stringify(n))
        };

    function F(t, e, r) {
        try {
            switch (C = e, b = r, q = t, e.name) {
                case p:
                    Z(e.data.checkout);
                    break;
                case m:
                    $(e.data.checkout);
                    break
            }
        } catch (o) {
            console.log(o)
        }
    }
    var x = {},
        H = "",
        k = {},
        D = P(),
        tt = t => {
            let e = [],
                r = [],
                o = 0,
                n = "";
            t.lineItems.forEach(i => {
                e.push({
                    content_id: i.variant.id,
                    quantity: i.quantity
                }), r.push({
                    content_id: i.variant.product.id,
                    quantity: i.quantity
                })
            }), n = t.currencyCode, o = parseFloat(t.totalPrice.amount), E("AddPaymentInfo", D, {
                contents: e,
                product_id: r,
                currency: n,
                value: o
            })
        },
        et = t => {
            var y, s, f;
            let e = [],
                r = [],
                o = h(t.order.id),
                n = t.currencyCode,
                a = parseFloat(t.totalPrice.amount);
            t.lineItems.forEach(c => {
                e.push({
                    content_id: c.variant.id,
                    quantity: c.quantity
                }), r.push({
                    content_id: c.variant.product.id,
                    quantity: c.quantity
                })
            });
            let i = {
                    contents: e,
                    product_id: r,
                    currency: n,
                    value: a
                },
                _ = t.billingAddress || {},
                l = {
                    email: t.email,
                    phone_number: _.phone,
                    external_id: ((s = (y = t.order) == null ? void 0 : y.customer) == null ? void 0 : s.id) || ((f = t.order) == null ? void 0 : f.id)
                };
            E("PlaceAnOrder", o, i, l), E("Purchase", o, i, l), E("CompletePayment", o, i, l)
        },
        E = (t, e, r, o) => {
            let n = {
                shop: H,
                event: t,
                timestamp: new Date().toISOString(),
                event_id: e,
                properties: r,
                event_source_url: x.context.window.location.href,
                social_type: "tiktok",
                context: {
                    page: {
                        url: x.context.window.location.href,
                        referrer: x.context.window.location.origin
                    }
                },
                is_web_worker: !0
            };
            o && (n.context.user = o), k.sendBeacon(u + I, JSON.stringify(n))
        };

    function M(t, e, r) {
        try {
            switch (x = e, H = r, k = t, e.name) {
                case p:
                    tt(e.data.checkout);
                    break;
                case m:
                    et(e.data.checkout);
                    break
            }
        } catch (o) {
            console.log(o)
        }
    }
    var B = !1,
        R = !1;
    g(({
        analytics: t,
        browser: e,
        settings: r,
        init: o
    }) => {
        t.subscribe("all_standard_events", n => {
            O.includes(n.name) && fetch(u + "/api/store/pixel?shop=" + r.rawDomain).then(a => a.json()).then(a => {
                a.data && a.data.length > 0 ? (a.data.forEach(i => {
                    i.social_type === "facebook" && (B = !0), i.social_type === "tiktok" && (R = !0)
                }), B && F(e, n, r.rawDomain), R && M(e, n, r.rawDomain)) : console.log("empty pixels")
            }).catch(a => {
                console.log(a)
            })
        }), console.log("web pixel loaded.")
    });
})();