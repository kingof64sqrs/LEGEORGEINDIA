(() => {
    var e = {
            482: function(e, t, r) {
                var i, n, o;
                ! function(a, s) {
                    "use strict";
                    n = [r(550)], void 0 === (o = "function" == typeof(i = function(e) {
                        var t = /(^|@)\S+:\d+/,
                            r = /^\s*at .*(\S+:\d+|\(native\))/m,
                            i = /^(eval@)?(\[native code])?$/;
                        return {
                            parse: function(e) {
                                if (void 0 !== e.stacktrace || void 0 !== e["opera#sourceloc"]) return this.parseOpera(e);
                                if (e.stack && e.stack.match(r)) return this.parseV8OrIE(e);
                                if (e.stack) return this.parseFFOrSafari(e);
                                throw new Error("Cannot parse given Error object")
                            },
                            extractLocation: function(e) {
                                if (-1 === e.indexOf(":")) return [e];
                                var t = /(.+?)(?::(\d+))?(?::(\d+))?$/.exec(e.replace(/[()]/g, ""));
                                return [t[1], t[2] || void 0, t[3] || void 0]
                            },
                            parseV8OrIE: function(t) {
                                return t.stack.split("\n").filter((function(e) {
                                    return !!e.match(r)
                                }), this).map((function(t) {
                                    t.indexOf("(eval ") > -1 && (t = t.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(,.*$)/g, ""));
                                    var r = t.replace(/^\s+/, "").replace(/\(eval code/g, "(").replace(/^.*?\s+/, ""),
                                        i = r.match(/ (\(.+\)$)/);
                                    r = i ? r.replace(i[0], "") : r;
                                    var n = this.extractLocation(i ? i[1] : r),
                                        o = i && r || void 0,
                                        a = ["eval", "<anonymous>"].indexOf(n[0]) > -1 ? void 0 : n[0];
                                    return new e({
                                        functionName: o,
                                        fileName: a,
                                        lineNumber: n[1],
                                        columnNumber: n[2],
                                        source: t
                                    })
                                }), this)
                            },
                            parseFFOrSafari: function(t) {
                                return t.stack.split("\n").filter((function(e) {
                                    return !e.match(i)
                                }), this).map((function(t) {
                                    if (t.indexOf(" > eval") > -1 && (t = t.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1")), -1 === t.indexOf("@") && -1 === t.indexOf(":")) return new e({
                                        functionName: t
                                    });
                                    var r = /((.*".+"[^@]*)?[^@]*)(?:@)/,
                                        i = t.match(r),
                                        n = i && i[1] ? i[1] : void 0,
                                        o = this.extractLocation(t.replace(r, ""));
                                    return new e({
                                        functionName: n,
                                        fileName: o[0],
                                        lineNumber: o[1],
                                        columnNumber: o[2],
                                        source: t
                                    })
                                }), this)
                            },
                            parseOpera: function(e) {
                                return !e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? this.parseOpera9(e) : e.stack ? this.parseOpera11(e) : this.parseOpera10(e)
                            },
                            parseOpera9: function(t) {
                                for (var r = /Line (\d+).*script (?:in )?(\S+)/i, i = t.message.split("\n"), n = [], o = 2, a = i.length; o < a; o += 2) {
                                    var s = r.exec(i[o]);
                                    s && n.push(new e({
                                        fileName: s[2],
                                        lineNumber: s[1],
                                        source: i[o]
                                    }))
                                }
                                return n
                            },
                            parseOpera10: function(t) {
                                for (var r = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, i = t.stacktrace.split("\n"), n = [], o = 0, a = i.length; o < a; o += 2) {
                                    var s = r.exec(i[o]);
                                    s && n.push(new e({
                                        functionName: s[3] || void 0,
                                        fileName: s[2],
                                        lineNumber: s[1],
                                        source: i[o]
                                    }))
                                }
                                return n
                            },
                            parseOpera11: function(r) {
                                return r.stack.split("\n").filter((function(e) {
                                    return !!e.match(t) && !e.match(/^Error created at/)
                                }), this).map((function(t) {
                                    var r, i = t.split("@"),
                                        n = this.extractLocation(i.pop()),
                                        o = i.shift() || "",
                                        a = o.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
                                    o.match(/\(([^)]*)\)/) && (r = o.replace(/^[^(]+\(([^)]*)\)$/, "$1"));
                                    var s = void 0 === r || "[arguments not available]" === r ? void 0 : r.split(",");
                                    return new e({
                                        functionName: a,
                                        args: s,
                                        fileName: n[0],
                                        lineNumber: n[1],
                                        columnNumber: n[2],
                                        source: t
                                    })
                                }), this)
                            }
                        }
                    }) ? i.apply(t, n) : i) || (e.exports = o)
                }()
            },
            550: function(e, t) {
                var r, i, n;
                ! function(o, a) {
                    "use strict";
                    i = [], void 0 === (n = "function" == typeof(r = function() {
                        function e(e) {
                            return e.charAt(0).toUpperCase() + e.substring(1)
                        }

                        function t(e) {
                            return function() {
                                return this[e]
                            }
                        }
                        var r = ["isConstructor", "isEval", "isNative", "isToplevel"],
                            i = ["columnNumber", "lineNumber"],
                            n = ["fileName", "functionName", "source"],
                            o = r.concat(i, n, ["args"], ["evalOrigin"]);

                        function a(t) {
                            if (t)
                                for (var r = 0; r < o.length; r++) void 0 !== t[o[r]] && this["set" + e(o[r])](t[o[r]])
                        }
                        a.prototype = {
                            getArgs: function() {
                                return this.args
                            },
                            setArgs: function(e) {
                                if ("[object Array]" !== Object.prototype.toString.call(e)) throw new TypeError("Args must be an Array");
                                this.args = e
                            },
                            getEvalOrigin: function() {
                                return this.evalOrigin
                            },
                            setEvalOrigin: function(e) {
                                if (e instanceof a) this.evalOrigin = e;
                                else {
                                    if (!(e instanceof Object)) throw new TypeError("Eval Origin must be an Object or StackFrame");
                                    this.evalOrigin = new a(e)
                                }
                            },
                            toString: function() {
                                var e = this.getFileName() || "",
                                    t = this.getLineNumber() || "",
                                    r = this.getColumnNumber() || "",
                                    i = this.getFunctionName() || "";
                                return this.getIsEval() ? e ? "[eval] (" + e + ":" + t + ":" + r + ")" : "[eval]:" + t + ":" + r : i ? i + " (" + e + ":" + t + ":" + r + ")" : e + ":" + t + ":" + r
                            }
                        }, a.fromString = function(e) {
                            var t = e.indexOf("("),
                                r = e.lastIndexOf(")"),
                                i = e.substring(0, t),
                                n = e.substring(t + 1, r).split(","),
                                o = e.substring(r + 1);
                            if (0 === o.indexOf("@")) var s = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(o, ""),
                                c = s[1],
                                l = s[2],
                                u = s[3];
                            return new a({
                                functionName: i,
                                args: n || void 0,
                                fileName: c,
                                lineNumber: l || void 0,
                                columnNumber: u || void 0
                            })
                        };
                        for (var s = 0; s < r.length; s++) a.prototype["get" + e(r[s])] = t(r[s]), a.prototype["set" + e(r[s])] = function(e) {
                            return function(t) {
                                this[e] = Boolean(t)
                            }
                        }(r[s]);
                        for (var c = 0; c < i.length; c++) a.prototype["get" + e(i[c])] = t(i[c]), a.prototype["set" + e(i[c])] = function(e) {
                            return function(t) {
                                if (r = t, isNaN(parseFloat(r)) || !isFinite(r)) throw new TypeError(e + " must be a Number");
                                var r;
                                this[e] = Number(t)
                            }
                        }(i[c]);
                        for (var l = 0; l < n.length; l++) a.prototype["get" + e(n[l])] = t(n[l]), a.prototype["set" + e(n[l])] = function(e) {
                            return function(t) {
                                this[e] = String(t)
                            }
                        }(n[l]);
                        return a
                    }) ? r.apply(t, i) : r) || (e.exports = n)
                }()
            },
            47: function(e, t, r) {
                var i;
                ! function(n, o) {
                    "use strict";
                    var a = "function",
                        s = "undefined",
                        c = "object",
                        l = "string",
                        u = "major",
                        d = "model",
                        b = "name",
                        f = "type",
                        p = "vendor",
                        m = "version",
                        w = "architecture",
                        h = "console",
                        g = "mobile",
                        v = "tablet",
                        y = "smarttv",
                        x = "wearable",
                        k = "embedded",
                        S = "Amazon",
                        O = "Apple",
                        E = "ASUS",
                        R = "BlackBerry",
                        N = "Browser",
                        A = "Chrome",
                        T = "Firefox",
                        I = "Google",
                        L = "Huawei",
                        P = "LG",
                        C = "Microsoft",
                        j = "Motorola",
                        M = "Opera",
                        _ = "Samsung",
                        B = "Sharp",
                        U = "Sony",
                        D = "Xiaomi",
                        F = "Zebra",
                        W = "Facebook",
                        q = "Chromium OS",
                        $ = "Mac OS",
                        z = function(e) {
                            for (var t = {}, r = 0; r < e.length; r++) t[e[r].toUpperCase()] = e[r];
                            return t
                        },
                        V = function(e, t) {
                            return typeof e === l && -1 !== G(t).indexOf(G(e))
                        },
                        G = function(e) {
                            return e.toLowerCase()
                        },
                        H = function(e, t) {
                            if (typeof e === l) return e = e.replace(/^\s\s*/, ""), typeof t === s ? e : e.substring(0, 500)
                        },
                        X = function(e, t) {
                            for (var r, i, n, s, l, u, d = 0; d < t.length && !l;) {
                                var b = t[d],
                                    f = t[d + 1];
                                for (r = i = 0; r < b.length && !l && b[r];)
                                    if (l = b[r++].exec(e))
                                        for (n = 0; n < f.length; n++) u = l[++i], typeof(s = f[n]) === c && s.length > 0 ? 2 === s.length ? typeof s[1] == a ? this[s[0]] = s[1].call(this, u) : this[s[0]] = s[1] : 3 === s.length ? typeof s[1] !== a || s[1].exec && s[1].test ? this[s[0]] = u ? u.replace(s[1], s[2]) : o : this[s[0]] = u ? s[1].call(this, u, s[2]) : o : 4 === s.length && (this[s[0]] = u ? s[3].call(this, u.replace(s[1], s[2])) : o) : this[s] = u || o;
                                d += 2
                            }
                        },
                        Y = function(e, t) {
                            for (var r in t)
                                if (typeof t[r] === c && t[r].length > 0) {
                                    for (var i = 0; i < t[r].length; i++)
                                        if (V(t[r][i], e)) return "?" === r ? o : r
                                } else if (V(t[r], e)) return "?" === r ? o : r;
                            return e
                        },
                        K = {
                            ME: "4.90",
                            "NT 3.11": "NT3.51",
                            "NT 4.0": "NT4.0",
                            2e3: "NT 5.0",
                            XP: ["NT 5.1", "NT 5.2"],
                            Vista: "NT 6.0",
                            7: "NT 6.1",
                            8: "NT 6.2",
                            8.1: "NT 6.3",
                            10: ["NT 6.4", "NT 10.0"],
                            RT: "ARM"
                        },
                        Z = {
                            browser: [
                                [/\b(?:crmo|crios)\/([\w\.]+)/i],
                                [m, [b, "Chrome"]],
                                [/edg(?:e|ios|a)?\/([\w\.]+)/i],
                                [m, [b, "Edge"]],
                                [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],
                                [b, m],
                                [/opios[\/ ]+([\w\.]+)/i],
                                [m, [b, M + " Mini"]],
                                [/\bopr\/([\w\.]+)/i],
                                [m, [b, M]],
                                [/\bb[ai]*d(?:uhd|[ub]*[aekoprswx]{5,6})[\/ ]?([\w\.]+)/i],
                                [m, [b, "Baidu"]],
                                [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant|iemobile|slim)\s?(?:browser)?[\/ ]?([\w\.]*)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i],
                                [b, m],
                                [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],
                                [m, [b, "UC" + N]],
                                [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i, /micromessenger\/([\w\.]+)/i],
                                [m, [b, "WeChat"]],
                                [/konqueror\/([\w\.]+)/i],
                                [m, [b, "Konqueror"]],
                                [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],
                                [m, [b, "IE"]],
                                [/ya(?:search)?browser\/([\w\.]+)/i],
                                [m, [b, "Yandex"]],
                                [/slbrowser\/([\w\.]+)/i],
                                [m, [b, "Smart Lenovo " + N]],
                                [/(avast|avg)\/([\w\.]+)/i],
                                [
                                    [b, /(.+)/, "$1 Secure " + N], m
                                ],
                                [/\bfocus\/([\w\.]+)/i],
                                [m, [b, T + " Focus"]],
                                [/\bopt\/([\w\.]+)/i],
                                [m, [b, M + " Touch"]],
                                [/coc_coc\w+\/([\w\.]+)/i],
                                [m, [b, "Coc Coc"]],
                                [/dolfin\/([\w\.]+)/i],
                                [m, [b, "Dolphin"]],
                                [/coast\/([\w\.]+)/i],
                                [m, [b, M + " Coast"]],
                                [/miuibrowser\/([\w\.]+)/i],
                                [m, [b, "MIUI " + N]],
                                [/fxios\/([-\w\.]+)/i],
                                [m, [b, T]],
                                [/\bqihu|(qi?ho?o?|360)browser/i],
                                [
                                    [b, "360 " + N]
                                ],
                                [/(oculus|sailfish|huawei|vivo)browser\/([\w\.]+)/i],
                                [
                                    [b, /(.+)/, "$1 " + N], m
                                ],
                                [/samsungbrowser\/([\w\.]+)/i],
                                [m, [b, _ + " Internet"]],
                                [/(comodo_dragon)\/([\w\.]+)/i],
                                [
                                    [b, /_/g, " "], m
                                ],
                                [/metasr[\/ ]?([\d\.]+)/i],
                                [m, [b, "Sogou Explorer"]],
                                [/(sogou)mo\w+\/([\d\.]+)/i],
                                [
                                    [b, "Sogou Mobile"], m
                                ],
                                [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|2345Explorer)[\/ ]?([\w\.]+)/i],
                                [b, m],
                                [/(lbbrowser)/i, /\[(linkedin)app\]/i],
                                [b],
                                [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],
                                [
                                    [b, W], m
                                ],
                                [/(Klarna)\/([\w\.]+)/i, /(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(alipay)client\/([\w\.]+)/i, /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],
                                [b, m],
                                [/\bgsa\/([\w\.]+) .*safari\//i],
                                [m, [b, "GSA"]],
                                [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],
                                [m, [b, "TikTok"]],
                                [/headlesschrome(?:\/([\w\.]+)| )/i],
                                [m, [b, A + " Headless"]],
                                [/ wv\).+(chrome)\/([\w\.]+)/i],
                                [
                                    [b, A + " WebView"], m
                                ],
                                [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],
                                [m, [b, "Android " + N]],
                                [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],
                                [b, m],
                                [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],
                                [m, [b, "Mobile Safari"]],
                                [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],
                                [m, b],
                                [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],
                                [b, [m, Y, {
                                    "1.0": "/8",
                                    1.2: "/1",
                                    1.3: "/3",
                                    "2.0": "/412",
                                    "2.0.2": "/416",
                                    "2.0.3": "/417",
                                    "2.0.4": "/419",
                                    "?": "/"
                                }]],
                                [/(webkit|khtml)\/([\w\.]+)/i],
                                [b, m],
                                [/(navigator|netscape\d?)\/([-\w\.]+)/i],
                                [
                                    [b, "Netscape"], m
                                ],
                                [/mobile vr; rv:([\w\.]+)\).+firefox/i],
                                [m, [b, T + " Reality"]],
                                [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i],
                                [b, m],
                                [/(cobalt)\/([\w\.]+)/i],
                                [b, [m, /master.|lts./, ""]]
                            ],
                            cpu: [
                                [/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],
                                [
                                    [w, "amd64"]
                                ],
                                [/(ia32(?=;))/i],
                                [
                                    [w, G]
                                ],
                                [/((?:i[346]|x)86)[;\)]/i],
                                [
                                    [w, "ia32"]
                                ],
                                [/\b(aarch64|arm(v?8e?l?|_?64))\b/i],
                                [
                                    [w, "arm64"]
                                ],
                                [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],
                                [
                                    [w, "armhf"]
                                ],
                                [/windows (ce|mobile); ppc;/i],
                                [
                                    [w, "arm"]
                                ],
                                [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],
                                [
                                    [w, /ower/, "", G]
                                ],
                                [/(sun4\w)[;\)]/i],
                                [
                                    [w, "sparc"]
                                ],
                                [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],
                                [
                                    [w, G]
                                ]
                            ],
                            device: [
                                [/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],
                                [d, [p, _],
                                    [f, v]
                                ],
                                [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i],
                                [d, [p, _],
                                    [f, g]
                                ],
                                [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],
                                [d, [p, O],
                                    [f, g]
                                ],
                                [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i],
                                [d, [p, O],
                                    [f, v]
                                ],
                                [/(macintosh);/i],
                                [d, [p, O]],
                                [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],
                                [d, [p, B],
                                    [f, g]
                                ],
                                [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],
                                [d, [p, L],
                                    [f, v]
                                ],
                                [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],
                                [d, [p, L],
                                    [f, g]
                                ],
                                [/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /oid[^\)]+; (m?[12][0-389][01]\w{3,6}[c-y])( bui|; wv|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],
                                [
                                    [d, /_/g, " "],
                                    [p, D],
                                    [f, g]
                                ],
                                [/oid[^\)]+; (2\d{4}(283|rpbf)[cgl])( bui|\))/i, /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],
                                [
                                    [d, /_/g, " "],
                                    [p, D],
                                    [f, v]
                                ],
                                [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],
                                [d, [p, "OPPO"],
                                    [f, g]
                                ],
                                [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i],
                                [d, [p, "Vivo"],
                                    [f, g]
                                ],
                                [/\b(rmx[1-3]\d{3})(?: bui|;|\))/i],
                                [d, [p, "Realme"],
                                    [f, g]
                                ],
                                [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],
                                [d, [p, j],
                                    [f, g]
                                ],
                                [/\b(mz60\d|xoom[2 ]{0,2}) build\//i],
                                [d, [p, j],
                                    [f, v]
                                ],
                                [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],
                                [d, [p, P],
                                    [f, v]
                                ],
                                [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i],
                                [d, [p, P],
                                    [f, g]
                                ],
                                [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],
                                [d, [p, "Lenovo"],
                                    [f, v]
                                ],
                                [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i],
                                [
                                    [d, /_/g, " "],
                                    [p, "Nokia"],
                                    [f, g]
                                ],
                                [/(pixel c)\b/i],
                                [d, [p, I],
                                    [f, v]
                                ],
                                [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],
                                [d, [p, I],
                                    [f, g]
                                ],
                                [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],
                                [d, [p, U],
                                    [f, g]
                                ],
                                [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i],
                                [
                                    [d, "Xperia Tablet"],
                                    [p, U],
                                    [f, v]
                                ],
                                [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],
                                [d, [p, "OnePlus"],
                                    [f, g]
                                ],
                                [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i],
                                [d, [p, S],
                                    [f, v]
                                ],
                                [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],
                                [
                                    [d, /(.+)/g, "Fire Phone $1"],
                                    [p, S],
                                    [f, g]
                                ],
                                [/(playbook);[-\w\),; ]+(rim)/i],
                                [d, p, [f, v]],
                                [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i],
                                [d, [p, R],
                                    [f, g]
                                ],
                                [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],
                                [d, [p, E],
                                    [f, v]
                                ],
                                [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],
                                [d, [p, E],
                                    [f, g]
                                ],
                                [/(nexus 9)/i],
                                [d, [p, "HTC"],
                                    [f, v]
                                ],
                                [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],
                                [p, [d, /_/g, " "],
                                    [f, g]
                                ],
                                [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],
                                [d, [p, "Acer"],
                                    [f, v]
                                ],
                                [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i],
                                [d, [p, "Meizu"],
                                    [f, g]
                                ],
                                [/; ((?:power )?armor(?:[\w ]{0,8}))(?: bui|\))/i],
                                [d, [p, "Ulefone"],
                                    [f, g]
                                ],
                                [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i],
                                [p, d, [f, g]],
                                [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i],
                                [p, d, [f, v]],
                                [/(surface duo)/i],
                                [d, [p, C],
                                    [f, v]
                                ],
                                [/droid [\d\.]+; (fp\du?)(?: b|\))/i],
                                [d, [p, "Fairphone"],
                                    [f, g]
                                ],
                                [/(u304aa)/i],
                                [d, [p, "AT&T"],
                                    [f, g]
                                ],
                                [/\bsie-(\w*)/i],
                                [d, [p, "Siemens"],
                                    [f, g]
                                ],
                                [/\b(rct\w+) b/i],
                                [d, [p, "RCA"],
                                    [f, v]
                                ],
                                [/\b(venue[\d ]{2,7}) b/i],
                                [d, [p, "Dell"],
                                    [f, v]
                                ],
                                [/\b(q(?:mv|ta)\w+) b/i],
                                [d, [p, "Verizon"],
                                    [f, v]
                                ],
                                [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],
                                [d, [p, "Barnes & Noble"],
                                    [f, v]
                                ],
                                [/\b(tm\d{3}\w+) b/i],
                                [d, [p, "NuVision"],
                                    [f, v]
                                ],
                                [/\b(k88) b/i],
                                [d, [p, "ZTE"],
                                    [f, v]
                                ],
                                [/\b(nx\d{3}j) b/i],
                                [d, [p, "ZTE"],
                                    [f, g]
                                ],
                                [/\b(gen\d{3}) b.+49h/i],
                                [d, [p, "Swiss"],
                                    [f, g]
                                ],
                                [/\b(zur\d{3}) b/i],
                                [d, [p, "Swiss"],
                                    [f, v]
                                ],
                                [/\b((zeki)?tb.*\b) b/i],
                                [d, [p, "Zeki"],
                                    [f, v]
                                ],
                                [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i],
                                [
                                    [p, "Dragon Touch"], d, [f, v]
                                ],
                                [/\b(ns-?\w{0,9}) b/i],
                                [d, [p, "Insignia"],
                                    [f, v]
                                ],
                                [/\b((nxa|next)-?\w{0,9}) b/i],
                                [d, [p, "NextBook"],
                                    [f, v]
                                ],
                                [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],
                                [
                                    [p, "Voice"], d, [f, g]
                                ],
                                [/\b(lvtel\-)?(v1[12]) b/i],
                                [
                                    [p, "LvTel"], d, [f, g]
                                ],
                                [/\b(ph-1) /i],
                                [d, [p, "Essential"],
                                    [f, g]
                                ],
                                [/\b(v(100md|700na|7011|917g).*\b) b/i],
                                [d, [p, "Envizen"],
                                    [f, v]
                                ],
                                [/\b(trio[-\w\. ]+) b/i],
                                [d, [p, "MachSpeed"],
                                    [f, v]
                                ],
                                [/\btu_(1491) b/i],
                                [d, [p, "Rotor"],
                                    [f, v]
                                ],
                                [/(shield[\w ]+) b/i],
                                [d, [p, "Nvidia"],
                                    [f, v]
                                ],
                                [/(sprint) (\w+)/i],
                                [p, d, [f, g]],
                                [/(kin\.[onetw]{3})/i],
                                [
                                    [d, /\./g, " "],
                                    [p, C],
                                    [f, g]
                                ],
                                [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],
                                [d, [p, F],
                                    [f, v]
                                ],
                                [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],
                                [d, [p, F],
                                    [f, g]
                                ],
                                [/smart-tv.+(samsung)/i],
                                [p, [f, y]],
                                [/hbbtv.+maple;(\d+)/i],
                                [
                                    [d, /^/, "SmartTV"],
                                    [p, _],
                                    [f, y]
                                ],
                                [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],
                                [
                                    [p, P],
                                    [f, y]
                                ],
                                [/(apple) ?tv/i],
                                [p, [d, O + " TV"],
                                    [f, y]
                                ],
                                [/crkey/i],
                                [
                                    [d, A + "cast"],
                                    [p, I],
                                    [f, y]
                                ],
                                [/droid.+aft(\w+)( bui|\))/i],
                                [d, [p, S],
                                    [f, y]
                                ],
                                [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i],
                                [d, [p, B],
                                    [f, y]
                                ],
                                [/(bravia[\w ]+)( bui|\))/i],
                                [d, [p, U],
                                    [f, y]
                                ],
                                [/(mitv-\w{5}) bui/i],
                                [d, [p, D],
                                    [f, y]
                                ],
                                [/Hbbtv.*(technisat) (.*);/i],
                                [p, d, [f, y]],
                                [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],
                                [
                                    [p, H],
                                    [d, H],
                                    [f, y]
                                ],
                                [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],
                                [
                                    [f, y]
                                ],
                                [/(ouya)/i, /(nintendo) ([wids3utch]+)/i],
                                [p, d, [f, h]],
                                [/droid.+; (shield) bui/i],
                                [d, [p, "Nvidia"],
                                    [f, h]
                                ],
                                [/(playstation [345portablevi]+)/i],
                                [d, [p, U],
                                    [f, h]
                                ],
                                [/\b(xbox(?: one)?(?!; xbox))[\); ]/i],
                                [d, [p, C],
                                    [f, h]
                                ],
                                [/((pebble))app/i],
                                [p, d, [f, x]],
                                [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],
                                [d, [p, O],
                                    [f, x]
                                ],
                                [/droid.+; (glass) \d/i],
                                [d, [p, I],
                                    [f, x]
                                ],
                                [/droid.+; (wt63?0{2,3})\)/i],
                                [d, [p, F],
                                    [f, x]
                                ],
                                [/(quest( 2| pro)?)/i],
                                [d, [p, W],
                                    [f, x]
                                ],
                                [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],
                                [p, [f, k]],
                                [/(aeobc)\b/i],
                                [d, [p, S],
                                    [f, k]
                                ],
                                [/droid .+?; ([^;]+?)(?: bui|; wv\)|\) applew).+? mobile safari/i],
                                [d, [f, g]],
                                [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],
                                [d, [f, v]],
                                [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],
                                [
                                    [f, v]
                                ],
                                [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],
                                [
                                    [f, g]
                                ],
                                [/(android[-\w\. ]{0,9});.+buil/i],
                                [d, [p, "Generic"]]
                            ],
                            engine: [
                                [/windows.+ edge\/([\w\.]+)/i],
                                [m, [b, "EdgeHTML"]],
                                [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],
                                [m, [b, "Blink"]],
                                [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i],
                                [b, m],
                                [/rv\:([\w\.]{1,9})\b.+(gecko)/i],
                                [m, b]
                            ],
                            os: [
                                [/microsoft (windows) (vista|xp)/i],
                                [b, m],
                                [/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i],
                                [b, [m, Y, K]],
                                [/windows nt 6\.2; (arm)/i, /windows[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i, /(?:win(?=3|9|n)|win 9x )([nt\d\.]+)/i],
                                [
                                    [m, Y, K],
                                    [b, "Windows"]
                                ],
                                [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i, /cfnetwork\/.+darwin/i],
                                [
                                    [m, /_/g, "."],
                                    [b, "iOS"]
                                ],
                                [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i],
                                [
                                    [b, $],
                                    [m, /_/g, "."]
                                ],
                                [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],
                                [m, b],
                                [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i],
                                [b, m],
                                [/\(bb(10);/i],
                                [m, [b, R]],
                                [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],
                                [m, [b, "Symbian"]],
                                [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],
                                [m, [b, T + " OS"]],
                                [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],
                                [m, [b, "webOS"]],
                                [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],
                                [m, [b, "watchOS"]],
                                [/crkey\/([\d\.]+)/i],
                                [m, [b, A + "cast"]],
                                [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],
                                [
                                    [b, q], m
                                ],
                                [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i],
                                [b, m],
                                [/(sunos) ?([\w\.\d]*)/i],
                                [
                                    [b, "Solaris"], m
                                ],
                                [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i],
                                [b, m]
                            ]
                        },
                        J = function(e, t) {
                            if (typeof e === c && (t = e, e = o), !(this instanceof J)) return new J(e, t).getResult();
                            var r = typeof n !== s && n.navigator ? n.navigator : o,
                                i = e || (r && r.userAgent ? r.userAgent : ""),
                                h = r && r.userAgentData ? r.userAgentData : o,
                                y = t ? function(e, t) {
                                    var r = {};
                                    for (var i in e) t[i] && t[i].length % 2 == 0 ? r[i] = t[i].concat(e[i]) : r[i] = e[i];
                                    return r
                                }(Z, t) : Z,
                                x = r && r.userAgent == i;
                            return this.getBrowser = function() {
                                var e, t = {};
                                return t[b] = o, t[m] = o, X.call(t, i, y.browser), t[u] = typeof(e = t[m]) === l ? e.replace(/[^\d\.]/g, "").split(".")[0] : o, x && r && r.brave && typeof r.brave.isBrave == a && (t[b] = "Brave"), t
                            }, this.getCPU = function() {
                                var e = {};
                                return e[w] = o, X.call(e, i, y.cpu), e
                            }, this.getDevice = function() {
                                var e = {};
                                return e[p] = o, e[d] = o, e[f] = o, X.call(e, i, y.device), x && !e[f] && h && h.mobile && (e[f] = g), x && "Macintosh" == e[d] && r && typeof r.standalone !== s && r.maxTouchPoints && r.maxTouchPoints > 2 && (e[d] = "iPad", e[f] = v), e
                            }, this.getEngine = function() {
                                var e = {};
                                return e[b] = o, e[m] = o, X.call(e, i, y.engine), e
                            }, this.getOS = function() {
                                var e = {};
                                return e[b] = o, e[m] = o, X.call(e, i, y.os), x && !e[b] && h && "Unknown" != h.platform && (e[b] = h.platform.replace(/chrome os/i, q).replace(/macos/i, $)), e
                            }, this.getResult = function() {
                                return {
                                    ua: this.getUA(),
                                    browser: this.getBrowser(),
                                    engine: this.getEngine(),
                                    os: this.getOS(),
                                    device: this.getDevice(),
                                    cpu: this.getCPU()
                                }
                            }, this.getUA = function() {
                                return i
                            }, this.setUA = function(e) {
                                return i = typeof e === l && e.length > 500 ? H(e, 500) : e, this
                            }, this.setUA(i), this
                        };
                    J.VERSION = "1.0.37", J.BROWSER = z([b, m, u]), J.CPU = z([w]), J.DEVICE = z([d, p, f, h, g, y, v, x, k]), J.ENGINE = J.OS = z([b, m]), typeof t !== s ? (e.exports && (t = e.exports = J), t.UAParser = J) : r.amdO ? (i = function() {
                        return J
                    }.call(t, r, t, e)) === o || (e.exports = i) : typeof n !== s && (n.UAParser = J);
                    var Q = typeof n !== s && (n.jQuery || n.Zepto);
                    if (Q && !Q.ua) {
                        var ee = new J;
                        Q.ua = ee.getResult(), Q.ua.get = function() {
                            return ee.getUA()
                        }, Q.ua.set = function(e) {
                            ee.setUA(e);
                            var t = ee.getResult();
                            for (var r in t) Q.ua[r] = t[r]
                        }
                    }
                }("object" == typeof window ? window : this)
            }
        },
        t = {};

    function r(i) {
        var n = t[i];
        if (void 0 !== n) return n.exports;
        var o = t[i] = {
            exports: {}
        };
        return e[i].call(o.exports, o, o.exports, r), o.exports
    }
    r.amdO = {}, r.n = e => {
        var t = e && e.__esModule ? () => e.default : () => e;
        return r.d(t, {
            a: t
        }), t
    }, r.d = (e, t) => {
        for (var i in t) r.o(t, i) && !r.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
        })
    }, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), (() => {
        "use strict";
        const e = Symbol.for("RemoteUi::Retain"),
            t = Symbol.for("RemoteUi::Release"),
            i = Symbol.for("RemoteUi::RetainedBy");
        class n {
            constructor() {
                this.memoryManaged = new Set
            }
            add(t) {
                this.memoryManaged.add(t), t[i].add(this), t[e]()
            }
            release() {
                for (const e of this.memoryManaged) e[i].delete(this), e[t]();
                this.memoryManaged.clear()
            }
        }

        function o(r) {
            return Boolean(r && r[e] && r[t])
        }

        function a(e, {
            deep: t = !0
        } = {}) {
            return s(e, t, new Map)
        }

        function s(t, r, i) {
            const n = i.get(t);
            if (null != n) return n;
            const a = o(t);
            if (a && t[e](), i.set(t, a), r) {
                if (Array.isArray(t)) {
                    const e = t.reduce(((e, t) => s(t, r, i) || e), a);
                    return i.set(t, e), e
                }
                if (c(t)) {
                    const e = Object.keys(t).reduce(((e, n) => s(t[n], r, i) || e), a);
                    return i.set(t, e), e
                }
            }
            return i.set(t, a), a
        }

        function c(e) {
            if (null == e || "object" != typeof e) return !1;
            const t = Object.getPrototypeOf(e);
            return null == t || t === Object.prototype
        }
        const l = "remote-ui::ready",
            u = "_@f";

        function d(r) {
            const a = new Map,
                s = new Map,
                l = new Map;
            return {
                encode: function e(t, i = new Map) {
                    if (null == t) return [t];
                    const n = i.get(t);
                    if (n) return n;
                    if ("object" == typeof t) {
                        if (Array.isArray(t)) {
                            i.set(t, [void 0]);
                            const r = [],
                                n = [t.map((t => {
                                    const [n, o = []] = e(t, i);
                                    return r.push(...o), n
                                })), r];
                            return i.set(t, n), n
                        }
                        if (c(t)) {
                            i.set(t, [void 0]);
                            const r = [],
                                n = [Object.keys(t).reduce(((n, o) => {
                                    const [a, s = []] = e(t[o], i);
                                    return r.push(...s), { ...n,
                                        [o]: a
                                    }
                                }), {}), r];
                            return i.set(t, n), n
                        }
                    }
                    if ("function" == typeof t) {
                        if (a.has(t)) {
                            const e = a.get(t),
                                r = [{
                                    [u]: e
                                }];
                            return i.set(t, r), r
                        }
                        const e = r.uuid();
                        a.set(t, e), s.set(e, t);
                        const n = [{
                            [u]: e
                        }];
                        return i.set(t, n), n
                    }
                    const o = [t];
                    return i.set(t, o), o
                },
                decode: d,
                async call(e, t) {
                    const r = new n,
                        a = s.get(e);
                    if (null == a) throw new Error("You attempted to call a function that was already released.");
                    try {
                        const e = o(a) ? [r, ...a[i]] : [r];
                        return await a(...d(t, e))
                    } finally {
                        r.release()
                    }
                },
                release(e) {
                    const t = s.get(e);
                    t && (s.delete(e), a.delete(t))
                },
                terminate() {
                    a.clear(), s.clear(), l.clear()
                }
            };

            function d(n, o) {
                if ("object" == typeof n) {
                    if (null == n) return n;
                    if (Array.isArray(n)) return n.map((e => d(e, o)));
                    if (u in n) {
                        const a = n[u];
                        if (l.has(a)) return l.get(a);
                        let s = 0,
                            c = !1;
                        const d = () => {
                                s -= 1, 0 === s && (c = !0, l.delete(a), r.release(a))
                            },
                            b = () => {
                                s += 1
                            },
                            f = new Set(o),
                            p = (...e) => {
                                if (c) throw new Error("You attempted to call a function that was already released.");
                                if (!l.has(a)) throw new Error("You attempted to call a function that was already revoked.");
                                return r.call(a, e)
                            };
                        Object.defineProperties(p, {
                            [t]: {
                                value: d,
                                writable: !1
                            },
                            [e]: {
                                value: b,
                                writable: !1
                            },
                            [i]: {
                                value: f,
                                writable: !1
                            }
                        });
                        for (const e of f) e.add(p);
                        return l.set(a, p), p
                    }
                    if (c(n)) return Object.keys(n).reduce(((e, t) => ({ ...e,
                        [t]: d(n[t], o)
                    })), {})
                }
                return n
            }
        }

        function b() {
            return `${f()}-${f()}-${f()}-${f()}`
        }

        function f() {
            return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)
        }
        const p = "production",
            m = "0.0.475",
            w = "82c6a06ewf1f3532dpf3117147mbf87ca39",
            h = "s82c6a06ewf1f3532dpf3117147mbf87ca39m.js";
        var g = r(482),
            v = r.n(g);
        class y extends Error {
            constructor(...e) {
                super(...e), this.message = "Excessive Stacktrace: May indicate infinite loop forming"
            }
        }
        var x = r(47);
        Error;
        const k = {
                production: "https://notify.bugsnag.com",
                test: "https://localhost"
            },
            S = {
                severity: "error",
                context: "",
                unhandled: !0,
                library: "sandbox"
            },
            O = (e, t) => {
                try {
                    var r;
                    if (null != t && null != (r = t.options) && r.sampleRate && ! function(e) {
                            if (e <= 0 || e > 100) throw new Error("Invalid sampling percent");
                            return 100 * Math.random() <= e
                        }(t.options.sampleRate)) return;
                    const a = { ...S,
                        ...t
                    };
                    let s = {
                        errorClass: null == e ? void 0 : e.name,
                        message: null == e ? void 0 : e.message,
                        stacktrace: [],
                        type: "browserjs"
                    };
                    try {
                        s = function(e) {
                            if ("string" != typeof((null == (t = e) ? void 0 : t.stack) || (null == t ? void 0 : t.stacktrace) || (null == t ? void 0 : t["opera#sourceloc"])) || t.stack === `${t.name}: ${t.message}`) throw new Error("Error incompatible with error-stack-parser");
                            var t;
                            const r = v().parse(e).reduce(((e, t) => {
                                const r = function({
                                    functionName: e,
                                    lineNumber: t,
                                    columnNumber: r
                                }) {
                                    const i = /^global code$/i.test((n = e) || "") ? "global code" : n;
                                    var n;
                                    return {
                                        file: `https://cdn.shopify.com/cdn/wpm/${h}`,
                                        method: i,
                                        lineNumber: t,
                                        columnNumber: r
                                    }
                                }(t);
                                try {
                                    return "{}" === JSON.stringify(r) ? e : e.concat(r)
                                } catch (i) {
                                    return e
                                }
                            }), []);
                            return {
                                errorClass: null == e ? void 0 : e.name,
                                message: null == e ? void 0 : e.message,
                                stacktrace: r,
                                type: "browserjs"
                            }
                        }(e)
                    } catch (n) {
                        try {
                            s = function(e, t) {
                                let r = "";
                                const i = {
                                    lineNumber: "1",
                                    columnNumber: "1",
                                    method: t.context,
                                    file: `https://cdn.shopify.com/cdn/wpm/${h}`
                                };
                                if (e.stackTrace || e.stack || e.description) {
                                    r = e.stack.split("\n")[0];
                                    const t = e.stack.match(/([0-9]+):([0-9]+)/);
                                    if (t && t.length > 2 && (i.lineNumber = t[1], i.columnNumber = t[2], parseInt(i.lineNumber, 10) > 1e5)) throw new y
                                }
                                return {
                                    errorClass: (null == e ? void 0 : e.name) || r,
                                    message: (null == e ? void 0 : e.message) || r,
                                    stacktrace: [i],
                                    type: "browserjs"
                                }
                            }(e, a)
                        } catch (o) {
                            if (o instanceof y) return
                        }
                    }
                    const c = function(t, {
                            userAgent: r,
                            context: i,
                            severity: n,
                            unhandled: o,
                            library: a,
                            hashVersionSandbox: s,
                            sandboxUrl: c,
                            pixelId: l,
                            pixelType: u,
                            runtimeContext: d,
                            shopId: b,
                            initConfig: f,
                            notes: h
                        }) {
                            var g, v;
                            const {
                                device: y,
                                os: k,
                                browser: S,
                                engine: O
                            } = function(t) {
                                try {
                                    return new x.UAParser(t).getResult()
                                } catch (e) {
                                    return {
                                        ua: "",
                                        browser: {
                                            name: "",
                                            version: "",
                                            major: ""
                                        },
                                        engine: {
                                            name: "",
                                            version: ""
                                        },
                                        os: {
                                            name: "",
                                            version: ""
                                        },
                                        device: {
                                            model: "",
                                            type: "",
                                            vendor: ""
                                        },
                                        cpu: {
                                            architecture: ""
                                        }
                                    }
                                }
                            }(r || (null == (g = self.navigator) ? void 0 : g.userAgent));
                            return {
                                payloadVersion: 5,
                                notifier: {
                                    name: "web-pixel-manager",
                                    version: m,
                                    url: "-"
                                },
                                events: [{
                                    exceptions: [t],
                                    context: i,
                                    severity: n,
                                    unhandled: o,
                                    app: {
                                        version: m
                                    },
                                    device: {
                                        manufacturer: y.vendor,
                                        model: y.model,
                                        osName: k.name,
                                        osVersion: k.version,
                                        browserName: S.name,
                                        browserVersion: S.version
                                    },
                                    metaData: {
                                        app: {
                                            library: a,
                                            browserTarget: "modern",
                                            env: p,
                                            hashVersion: w,
                                            hashVersionSandbox: s || "N/A",
                                            sandboxUrl: c || "N/A"
                                        },
                                        device: {
                                            userAgent: r || (null == (v = self.navigator) ? void 0 : v.userAgent),
                                            renderingEngineName: O.name,
                                            renderingEngineVersion: O.version
                                        },
                                        request: {
                                            shopId: b,
                                            shopUrl: self.location.href,
                                            pixelId: l,
                                            pixelType: u,
                                            runtimeContext: d
                                        },
                                        "Additional Notes": {
                                            initConfig: JSON.stringify(f),
                                            notes: h
                                        }
                                    }
                                }]
                            }
                        }(s, a),
                        l = k[p];
                    var i;
                    if (!l) return void(null == (i = console) || i.log(`[${p}]`, "Bugsnag notify:", c));
                    fetch(l, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Bugsnag-Api-Key": "bcbc9f6762da195561967577c2d74ff8",
                            "Bugsnag-Payload-Version": "5"
                        },
                        body: JSON.stringify(c)
                    }).catch((() => {}))
                } catch (a) {}
            };
        async function E(e, t = "") {
            const r = new self.Blob([t], {
                type: "text/plain"
            });
            try {
                return await self.fetch(e, {
                    method: "POST",
                    keepalive: !0,
                    body: r
                }), !0
            } catch {
                return !1
            }
        }

        function R(e, t, r, i = !0) {
            try {
                const n = { ...i ? Object.getOwnPropertyDescriptor(e, t) : {},
                    ...r
                };
                return Object.defineProperty(e, t, n)
            } catch (n) {
                return e
            }
        }
        class N {
            constructor(e) {
                this.maxSize = e, this.cache = new Map
            }
            get(e) {
                if (!this.cache.has(e)) return;
                const t = this.cache.get(e);
                return this.cache.delete(e), this.cache.set(e, t), t
            }
            has(e) {
                return this.cache.has(e)
            }
            set(e, t) {
                if (this.cache.size >= this.maxSize) {
                    const e = this.cache.keys().next().value;
                    this.cache.delete(e)
                }
                return this.cache.set(e, t), this
            }
            delete(e) {
                return this.cache.delete(e)
            }
            clear() {
                this.cache.clear()
            }
        }
        const A = e => "number" == typeof e ? new N(e) : new Map,
            T = (...e) => JSON.stringify(e);

        function I(e, {
            cache: t,
            cacheKey: r = T
        } = {}) {
            function i(...t) {
                const n = i.cache,
                    o = r.apply(this, t);
                if (n.has(o)) return n.get(o); {
                    const r = e(...t);
                    return n.set(o, r), r
                }
            }
            return i.cache = null != t ? t : A(), i
        }
        const L = I(((e = "") => {
                const t = e.indexOf("=");
                return -1 === t ? [e.trim(), void 0] : [e.slice(0, t).trim(), e.slice(t + 1).trim()]
            }), {
                cache: A(100),
                cacheKey: (e = "") => e
            }),
            P = I(((e = "") => e.split(";").reduce(((e, t) => {
                const [r, i] = L(t);
                if (r) try {
                    e[decodeURIComponent(r)] = decodeURIComponent(null != i ? i : "")
                } catch {
                    e[r] = null != i ? i : ""
                }
                return e
            }), Object.create(null))), {
                cache: A(50),
                cacheKey: (e = "") => e
            });

        function C(e, t) {
            const r = new Map(Object.keys(e).map((t => {
                var r;
                return [t, null != (r = e[t]) ? r : ""]
            })));
            return {
                getItem: e => r.get(e) || null,
                setItem(e, i) {
                    t.setItem(e, i), r.set(e, i)
                },
                removeItem(e) {
                    t.removeItem(e), r.delete(e)
                },
                clear() {
                    t.clear(), r.clear()
                },
                get length() {
                    return r.size
                },
                key(e) {
                    var t;
                    return null != (t = Array.from(r.keys()).find(((t, r) => r === e))) ? t : null
                }
            }
        }

        function j(e) {
            (function({
                webPixelApi: e,
                cookie: t,
                cookieRestrictedDomains: r
            }) {
                const i = function(e) {
                    let t = e;
                    return {
                        update: async function(e, r) {
                            try {
                                t = r(), t = await e()
                            } catch (i) {
                                console.error(i)
                            }
                            return t
                        },
                        getRemote: async function(e) {
                            try {
                                t = await e()
                            } catch (r) {
                                console.error(r)
                            }
                            return t
                        },
                        getValue: () => t
                    }
                }(t);
                R(document, "cookie", {
                    get: function() {
                        return i.getRemote(e.browser.cookie.get), i.getValue()
                    },
                    set: function(t) {
                        const n = t.split(";").map((e => e.trim())).find((e => e.startsWith("domain="))),
                            o = (null == n ? void 0 : n.split("=")[1]) || "";
                        if (!(r.filter((e => new RegExp(`^\\.?${e}$`).test(o))).length > 0)) {
                            const r = i.getValue();
                            i.update((() => e.browser.cookie.set(t)), (() => function(e, t) {
                                const [r = ""] = t.split(";"), [i, n = ""] = L(r);
                                if (!i) return e;
                                const o = { ...P(e)
                                };
                                return o[i] = n, Object.keys(o).map((e => o[e] ? `${e}=${o[e]}` : e)).join("; ")
                            }(r, t)))
                        }
                    },
                    configurable: !1,
                    enumerable: !1
                })
            })(e),
            function({
                origin: e
            }) {
                R(window, "origin", {
                    get: () => e,
                    configurable: !1
                })
            }(e),
            function({
                referrer: e
            }) {
                R(document, "referrer", {
                    get: () => e,
                    configurable: !1
                })
            }(e),
            function({
                webPixelApi: e,
                localStorageItems: t
            }) {
                const r = C(t, e.browser.localStorage);
                R(window, "localStorage", {
                    get: () => r,
                    configurable: !1,
                    enumerable: !1
                })
            }(e),
            function({
                webPixelApi: e,
                sessionStorageItems: t
            }) {
                const r = C(t, e.browser.sessionStorage);
                R(window, "sessionStorage", {
                    get: () => r,
                    configurable: !1,
                    enumerable: !1
                })
            }(e)
        }
        const M = new URL(self.location.href);
        class _ extends Error {
            constructor(...e) {
                super(...e), this.name = "InsecureUrlError"
            }
        }
        class B extends Error {
            constructor(...e) {
                super(...e), this.name = "RestrictedUrlError"
            }
        }

        function U(e) {
            const t = new URL(e);
            if ("https:" !== t.protocol) throw new _(`URL must be secure (HTTPS): ${t.href}`);
            if (/^\/api\/.+\/graphql\.json$/.test(t.pathname)) return t;
            const r = M.host.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");
            if (new RegExp(`^${M.protocol}//(.*@)?${r}`, "i").test(t.href)) throw new B(`Requests are not allowed to the same origin: ${t.href}`);
            return t
        }
        const D = Function.prototype.call.bind(XMLHttpRequest.prototype.open),
            F = ["constructor", "hasOwnProperty", "toString", "toLocaleString", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "__proto__", "apply", "call", "bind"];

        function W(e, t) {
            if (Object.prototype.hasOwnProperty.call(e, t)) return e;
            const r = Object.getPrototypeOf(e);
            return r ? W(r, t) : void 0
        }

        function q(e, t, r) {
            try {
                const i = W(e, t);
                if (!i) throw new Error(`No explicit target found for ${t}.`);
                let n = function(e, t) {
                    try {
                        return e[t]
                    } catch (n) {
                        var r, i;
                        const o = Object.getOwnPropertyDescriptor(e, t);
                        if (!o) throw n;
                        return null != (r = null != (i = o.get) ? i : o.set) ? r : o.value
                    }
                }(i, t);
                if (Array.isArray(r)) {
                    const [i, o] = r;
                    "function" == typeof n && (n = e[t]), $(n, function(e) {
                        const t = new Set;
                        let r = e;
                        for (; r;) Object.getOwnPropertyNames(r).forEach((e => {
                            F.includes(e) || t.add(e)
                        })), r = Object.getPrototypeOf(r);
                        return Array.from(t)
                    }(n).reduce(((e, t) => {
                        var r;
                        return e[t] = null != (r = o[t]) ? r : i, e
                    }), {}))
                } else n = !0 === r ? void 0 : r;
                R(i, t, {
                    value: n
                }, !1);
                const o = Object.getPrototypeOf(i);
                o && t in o && q(o, t, r)
            } catch (i) {}
        }

        function $(e, t) {
            Object.keys(t).filter((r => !1 !== t[r] && r in e)).forEach((r => {
                q(e, r, t[r])
            }))
        }
        const z = {},
            V = {
                BarcodeDetector: !0,
                BroadcastChannel: !0,
                Cache: !0,
                caches: !0,
                CustomEvent: !0,
                FormData: !0,
                ImageData: !0,
                NetworkInformation: !0,
                ServiceWorkerRegistration: !0,
                WebSocket: !0,
                Browser: !0,
                WorkerBrowser: !0,
                MessageChannel: !0,
                MessagePort: !0,
                indexedDB: !0,
                IDBCursor: !0,
                IDBCursorWithValue: !0,
                IDBDatabase: !0,
                IDBFactory: !0,
                IDBIndex: !0,
                IDBKeyRange: !0,
                IDBObjectStore: !0,
                IDBOpenDBRequest: !0,
                IDBRequest: !0,
                IDBTransaction: !0,
                IDBVersionChangeEvent: !0,
                Navigator: !0,
                navigator: [!0, {
                    userAgentData: !1
                }],
                Notification: !0,
                NotificationEvent: !0,
                EventSource: !0,
                WebGL2RenderingContext: !0,
                WebGLActiveInfo: !0,
                WebGLBuffer: !0,
                WebGLFramebuffer: !0,
                WebGLProgram: !0,
                WebGLQuery: !0,
                WebGLRenderbuffer: !0,
                WebGLRenderingContext: !0,
                WebGLSampler: !0,
                WebGLShader: !0,
                WebGLShaderPrecisionFormat: !0,
                WebGLSync: !0,
                WebGLTexture: !0,
                WebGLTransformFeedback: !0,
                WebGLUniformLocation: !0,
                WebGLVertexArrayObject: !0,
                Path2D: !0,
                Worker: !0,
                WorkerLocation: !0,
                WorkerNavigator: !0,
                ServiceWorker: !0,
                ServiceWorkerContainer: !0,
                XMLHttpRequestEventTarget: !0,
                XMLHttpRequestUpload: !0,
                PushSubscriptionOptions: !0,
                PushSubscription: !0,
                PushManager: !0,
                Permissions: !0,
                PermissionStatus: !0,
                PeriodicSyncManager: !0,
                PaymentInstruments: !0,
                NavigatorUAData: !0,
                BackgroundFetchRegistration: !0,
                BackgroundFetchRecord: !0,
                BackgroundFetchManager: !0,
                WritableStreamDefaultWriter: !0,
                WritableStreamDefaultController: !0,
                WritableStream: !0,
                ReadableStreamDefaultReader: !0,
                ReadableStreamDefaultController: !0,
                ReadableStreamBYOBRequest: !0,
                ReadableStreamBYOBReader: !0,
                ReadableStream: !0,
                ReadableByteStreamController: !0,
                RTCEncodedVideoFrame: !0,
                RTCEncodedAudioFrame: !0,
                RTCDataChannel: !0,
                RTCTransformEvent: !0,
                RTCRtpScriptTransformer: !0,
                OffscreenCanvasRenderingContext2D: !0,
                OffscreenCanvas: !0,
                FontFace: !0,
                FontFaceSet: !0,
                FileReaderSync: !0,
                FileReader: !0,
                FileList: !0,
                File: !0,
                FileSystemDirectoryHandle: !0,
                FileSystemFileHandle: !0,
                FileSystemHandle: !0,
                FileSystemWritableFileStream: !0,
                FileSystemSyncAccessHandle: !0,
                webkitRequestFileSystem: !0,
                webkitRequestFileSystemSync: !0,
                webkitResolveLocalFileSystemSyncURL: !0,
                webkitResolveLocalFileSystemURL: !0,
                DOMStringList: !0,
                DOMRectReadOnly: !0,
                DOMRect: !0,
                DOMQuad: !0,
                DOMPointReadOnly: !0,
                DOMPoint: !0,
                DOMMatrixReadOnly: !0,
                DOMMatrix: !0,
                DOMException: !0,
                CompressionStream: !0,
                Atomics: !0,
                WebAssembly: !0,
                AudioData: !0,
                EncodedAudioChunk: !0,
                EncodedVideoChunk: !0,
                ImageTrack: !0,
                ImageTrackList: !0,
                VideoColorSpace: !0,
                VideoFrame: !0,
                AudioDecoder: !0,
                AudioEncoder: !0,
                ImageDecoder: !0,
                VideoDecoder: !0,
                VideoEncoder: !0,
                AudioTrackConfiguration: !0,
                VideoTrackConfiguration: !0,
                Lock: !0,
                LockManager: !0,
                WebTransport: !0,
                WebTransportBidirectionalStream: !0,
                WebTransportDatagramDuplexStream: !0,
                WebTransportError: !0,
                Serial: !0,
                SerialPort: !0,
                USB: !0,
                USBAlternateInterface: !0,
                USBConfiguration: !0,
                USBConnectionEvent: !0,
                USBDevice: !0,
                USBEndpoint: !0,
                USBInTransferResult: !0,
                USBInterface: !0,
                USBIsochronousInTransferPacket: !0,
                USBIsochronousInTransferResult: !0,
                USBIsochronousOutTransferPacket: !0,
                USBIsochronousOutTransferResult: !0,
                USBOutTransferResult: !0,
                URL: [!1, {
                    createObjectURL: !0
                }]
            };
        class G extends Error {
            constructor(...e) {
                super(...e), this.message = "Invalid Extension Point"
            }
        }
        class H extends Error {
            constructor(...e) {
                super(...e), this.name = "SandboxAlreadyInitializedError", this.message = "Sandbox already initialized."
            }
        }
        const X = function() {
            try {
                return self instanceof DedicatedWorkerGlobalScope
            } catch (e) {
                return !1
            }
        }();
        let Y;
        Object.defineProperty(self, "webPixelsManager", {
            value: {
                createShopifyExtend: () => ({
                    extend: async (e, t) => {
                        if ("WebPixel::Render" !== e) throw new G;
                        Y = t
                    }
                })
            },
            enumerable: !0,
            writable: !1
        });
        let K = !1;
        const Z = async e => {
            var t;
            const {
                pageTitle: r,
                webPixelConfig: i,
                shopId: n,
                webPixelApi: o,
                internalApi: s
            } = e, c = o.init.context;
            if (K) {
                const e = new H;
                throw O(e, {
                    pixelId: i.id,
                    pixelType: i.type,
                    runtimeContext: i.runtimeContext,
                    shopId: n,
                    context: "v0/createSandbox/alreadyInitialized",
                    userAgent: c.navigator.userAgent || self.navigator.userAgent,
                    hashVersionSandbox: w,
                    sandboxUrl: M.href || "unknown"
                }), e
            }
            K = !0, a(o), a(s);
            try {
                X && (o.browser.sendBeacon = E), X || (j(e), self.document.title = r)
            } catch (l) {
                throw O(l, {
                    pixelId: i.id,
                    pixelType: i.type,
                    runtimeContext: i.runtimeContext,
                    shopId: n,
                    context: "v0/createSandbox/createRestrictedEnvironment",
                    userAgent: c.navigator.userAgent || self.navigator.userAgent,
                    hashVersionSandbox: w,
                    sandboxUrl: M.href || "unknown"
                }), l
            }
            if ("function" == typeof self.initWebPixel) try {
                self.initWebPixel()
            } catch (l) {}
            return await (null == (t = Y) ? void 0 : t.call(o, o)), {
                status: "success",
                hashVersion: w,
                sandboxUrl: M.href || "unknown"
            }
        };
        ! function() {
            const e = X ? "worker" : "iframe";
            try {
                (function(e, {
                    uuid: t = b,
                    createEncoder: r = d,
                    callable: i
                } = {}) {
                    let o = !1,
                        a = e;
                    const s = new Map,
                        c = new Map,
                        l = function(e, t) {
                            let r;
                            if (null == t) {
                                if ("function" != typeof Proxy) throw new Error("You must pass an array of callable methods in environments without Proxies.");
                                const t = new Map;
                                r = new Proxy({}, {
                                    get(r, i) {
                                        if (t.has(i)) return t.get(i);
                                        const n = e(i);
                                        return t.set(i, n), n
                                    }
                                })
                            } else {
                                r = {};
                                for (const i of t) Object.defineProperty(r, i, {
                                    value: e(i),
                                    writable: !1,
                                    configurable: !0,
                                    enumerable: !0
                                })
                            }
                            return r
                        }(m, i),
                        u = r({
                            uuid: t,
                            release(e) {
                                f(3, [e])
                            },
                            call(e, r, i) {
                                const n = t(),
                                    o = w(n, i),
                                    [a, s] = u.encode(r);
                                return f(5, [n, e, a], s), o
                            }
                        });
                    return a.addEventListener("message", p), {
                        call: l,
                        replace(e) {
                            const t = a;
                            a = e, t.removeEventListener("message", p), e.addEventListener("message", p)
                        },
                        expose(e) {
                            for (const t of Object.keys(e)) {
                                const r = e[t];
                                "function" == typeof r ? s.set(t, r) : s.delete(t)
                            }
                        },
                        callable(...e) {
                            if (null != i)
                                for (const t of e) Object.defineProperty(l, t, {
                                    value: m(t),
                                    writable: !1,
                                    configurable: !0,
                                    enumerable: !0
                                })
                        },
                        terminate() {
                            f(2, void 0), h(), a.terminate && a.terminate()
                        }
                    };

                    function f(e, t, r) {
                        o || a.postMessage(t ? [e, t] : [e], r)
                    }
                    async function p(e) {
                        const {
                            data: t
                        } = e;
                        if (null != t && Array.isArray(t)) switch (t[0]) {
                            case 2:
                                h();
                                break;
                            case 0:
                                {
                                    const e = new n,
                                        [i, o, a] = t[1],
                                        c = s.get(o);
                                    try {
                                        if (null == c) throw new Error(`No '${o}' method is exposed on this endpoint`);
                                        const [t, r] = u.encode(await c(...u.decode(a, [e])));
                                        f(1, [i, void 0, t], r)
                                    } catch (r) {
                                        const {
                                            name: e,
                                            message: t,
                                            stack: n
                                        } = r;
                                        throw f(1, [i, {
                                            name: e,
                                            message: t,
                                            stack: n
                                        }]), r
                                    } finally {
                                        e.release()
                                    }
                                    break
                                }
                            case 1:
                                {
                                    const [e] = t[1];c.get(e)(...t[1]),
                                    c.delete(e);
                                    break
                                }
                            case 3:
                                {
                                    const [e] = t[1];u.release(e);
                                    break
                                }
                            case 6:
                                {
                                    const [e] = t[1];c.get(e)(...t[1]),
                                    c.delete(e);
                                    break
                                }
                            case 5:
                                {
                                    const [e, i, n] = t[1];
                                    try {
                                        const t = await u.call(i, n),
                                            [r, o] = u.encode(t);
                                        f(6, [e, void 0, r], o)
                                    } catch (r) {
                                        const {
                                            name: t,
                                            message: i,
                                            stack: n
                                        } = r;
                                        throw f(6, [e, {
                                            name: t,
                                            message: i,
                                            stack: n
                                        }]), r
                                    }
                                    break
                                }
                        }
                    }

                    function m(e) {
                        return (...r) => {
                            if (o) return Promise.reject(new Error("You attempted to call a function on a terminated web worker."));
                            if ("string" != typeof e && "number" != typeof e) return Promise.reject(new Error(`Can’t call a symbol method on a remote endpoint: ${e.toString()}`));
                            const i = t(),
                                n = w(i),
                                [a, s] = u.encode(r);
                            return f(0, [i, e, a], s), n
                        }
                    }

                    function w(e, t) {
                        return new Promise(((r, i) => {
                            c.set(e, ((e, n, o) => {
                                if (null == n) r(o && u.decode(o, t));
                                else {
                                    const e = new Error;
                                    Object.assign(e, n), i(e)
                                }
                            }))
                        }))
                    }

                    function h() {
                        var e;
                        o = !0, s.clear(), c.clear(), null === (e = u.terminate) || void 0 === e || e.call(u), a.removeEventListener("message", p)
                    }
                })(X ? self : function({
                    targetOrigin: e = "*"
                } = {}) {
                    if ("undefined" == typeof self || null == self.parent) throw new Error("This does not appear to be a child iframe, because there is no parent window.");
                    const {
                        parent: t
                    } = self, r = () => t.postMessage(l, e);
                    window.addEventListener("message", (e => {
                        e.source === t && "complete" === document.readyState && e.data === l && r()
                    })), "complete" === document.readyState ? r() : document.addEventListener("readystatechange", (() => {
                        "complete" === document.readyState && r()
                    }));
                    const i = new WeakMap;
                    return {
                        postMessage(r, i) {
                            t.postMessage(r, e, i)
                        },
                        addEventListener(e, r) {
                            const n = e => {
                                e.source === t && r(e)
                            };
                            i.set(r, n), self.addEventListener(e, n)
                        },
                        removeEventListener(e, t) {
                            const r = i.get(t);
                            null != r && (i.delete(t), self.removeEventListener(e, r))
                        }
                    }
                }(), {
                    callable: []
                }).expose({
                    initialize: Z
                })
            } catch (t) {
                O(t, {
                    context: `v0/createSandbox/${e}`
                })
            }! function(e, t = self) {
                const r = { ...e ? V : z,
                    fetch: (i = t.fetch, (e, t) => {
                        const r = new Request(e);
                        return U(r.url), i(r, t)
                    }),
                    XMLHttpRequest: (XMLHttpRequest.prototype.open = function(e, t, r = !0, i, n) {
                        return D(this, e, U(t), r, i, n)
                    }, XMLHttpRequest)
                };
                var i;
                e || (r.addEventListener = function(e) {
                    let t = !1;
                    return (r, i, n) => (t || (console.warn("In a sandboxed environment, addEventListener may not behave as expected."), t = !0), e(r, i, n))
                }(t.addEventListener)), $(t, r), Object.freeze(String.prototype), Object.freeze(Request.prototype), Object.freeze(URL.prototype), Object.freeze(RegExp.prototype), R(self, "String", {
                    writable: !1,
                    configurable: !1
                }), R(self, "Request", {
                    writable: !1,
                    configurable: !1
                }), R(self, "URL", {
                    writable: !1,
                    configurable: !1
                }), R(self, "RegExp", {
                    writable: !1,
                    configurable: !1
                })
            }(X)
        }()
    })()
})();
globalThis.shopify = self.webPixelsManager.createShopifyExtend('336232769', 'app');
importScripts('/wpm/strict/app/web-pixel-336232769@2a1c0c86594b1a801ecf957b06e8d8fd.js');