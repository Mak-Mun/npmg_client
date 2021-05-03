var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var _map;
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop$1() {
}
function safe_not_equal$1(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
const subscriber_queue$1 = [];
function writable$1(value, start = noop$1) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal$1(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue$1.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue$1.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue$1.length; i += 2) {
            subscriber_queue$1[i][0](subscriber_queue$1[i + 1]);
          }
          subscriber_queue$1.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop$1) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop$1;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update: update2, subscribe: subscribe2};
}
const s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error) {
    error.stack = options2.get_stack(error);
  }
  if (branch) {
    branch.forEach(({node, loaded, fetched, uses_credentials}) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable$1($session);
    const props = {
      stores: {
        page: writable$1(null),
        navigating: writable$1(null),
        session
      },
      page,
      components: branch.map(({node}) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = {head: "", html: "", css: ""};
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 ? `<style amp-custom>${Array.from(styles).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"></script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error2) => {
      throw new Error(`Failed to serialize session data: ${error2.message}`);
    })},
				host: ${page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error)},
					nodes: [
						${branch.map(({node}) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		</script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({url, json}) => `<script type="svelte-data" url="${url}">${json}</script>`).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  return {
    status,
    headers,
    body: options2.template({head, body})
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error) {
  if (!error)
    return null;
  let serialized = try_serialize(error);
  if (!serialized) {
    const {name, message, stack} = error;
    serialized = try_serialize({name, message, stack});
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  if (loaded.error) {
    const error = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    const status = loaded.status;
    if (!(error instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return {status: 500, error};
    }
    return {status, error};
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path) {
  const baseparts = path[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path[0] === "/" ? path.slice(1).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
const s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error
}) {
  const {module} = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (/^[a-zA-Z]+:/.test(url)) {
          response = await fetch(url, opts);
        } else {
          const [path, search] = url.split("?");
          const resolved = resolve(request.path, path);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = {...opts.headers};
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            const rendered = await ssr({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                fetched.push({
                  url,
                  json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape$1(body)}}`
                });
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: {...context}
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error;
    }
    loaded = await module.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
const escaped$2 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape$1(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$2) {
      result += escaped$2[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({request, options: options2, state, $session, status, error}) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error
    })
  ];
  try {
    return await render_response({
      request,
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error,
      branch,
      page
    });
  } catch (error2) {
    options2.handle_error(error2);
    return {
      status: 500,
      headers: {},
      body: error2.stack
    };
  }
}
async function respond({request, options: options2, state, $session, route}) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id2) => id2 && options2.load_component(id2)));
  } catch (error2) {
    options2.handle_error(error2);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error2
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.force) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: loaded.loaded.redirect
                }
              };
            }
            if (loaded.loaded.error) {
              ({status, error} = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error = e;
          }
          if (error) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      request,
      options: options2,
      $session,
      page_config,
      status,
      error,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error2) {
    options2.handle_error(error2);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error2
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession({context: request.context});
  if (route) {
    const response = await respond({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler({...request, params});
    if (response) {
      if (typeof response !== "object") {
        return {
          status: 500,
          body: `Invalid response from route ${request.path}; 
						 expected an object, got ${typeof response}`,
          headers: {}
        };
      }
      let {status = 200, body, headers = {}} = response;
      headers = lowercase_keys(headers);
      if (typeof body === "object" && !("content-type" in headers) || headers["content-type"] === "application/json") {
        headers = {...headers, "content-type": "application/json"};
        body = JSON.stringify(body);
      }
      return {status, body, headers};
    }
  }
}
function lowercase_keys(obj) {
  const clone = {};
  for (const key in obj) {
    clone[key.toLowerCase()] = obj[key];
  }
  return clone;
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
class ReadOnlyFormData {
  constructor(map) {
    _map.set(this, void 0);
    __privateSet(this, _map, map);
  }
  get(key) {
    const value = __privateGet(this, _map).get(key);
    return value && value[0];
  }
  getAll(key) {
    return __privateGet(this, _map).get(key);
  }
  has(key) {
    return __privateGet(this, _map).has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield key;
      }
    }
  }
  *values() {
    for (const [, value] of __privateGet(this, _map)) {
      for (let i = 0; i < value.length; i += 1) {
        yield value;
      }
    }
  }
}
_map = new WeakMap();
function parse_body(req) {
  const raw = req.rawBody;
  if (!raw)
    return raw;
  const [type, ...directives] = req.headers["content-type"].split(/;\s*/);
  if (typeof raw === "string") {
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const {data, append} = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const {data, append} = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function ssr(incoming, options2, state = {}) {
  if (incoming.path.endsWith("/") && incoming.path !== "/") {
    const q = incoming.query.toString();
    return {
      status: 301,
      headers: {
        location: incoming.path.slice(0, -1) + (q ? `?${q}` : "")
      }
    };
  }
  const incoming_with_body = {
    ...incoming,
    body: parse_body(incoming)
  };
  const context = await options2.hooks.getContext(incoming_with_body) || {};
  try {
    return await options2.hooks.handle({
      request: {
        ...incoming_with_body,
        params: null,
        context
      },
      render: async (request) => {
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}
function hash(str) {
  let hash2 = 5381, i = str.length;
  while (i)
    hash2 = hash2 * 33 ^ str.charCodeAt(--i);
  return (hash2 >>> 0).toString(36);
}
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store2, ...callbacks) {
  if (store2 == null) {
    return noop;
  }
  const unsub = store2.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
  if (flushing)
    return;
  flushing = true;
  do {
    for (let i = 0; i < dirty_components.length; i += 1) {
      const component = dirty_components[i];
      set_current_component(component);
      update(component.$$);
    }
    set_current_component(null);
    dirty_components.length = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  flushing = false;
  seen_callbacks.clear();
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const escaped = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
const missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
let on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({$$});
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, {$$slots = {}, context = new Map()} = {}) => {
      on_destroy = [];
      const result = {title: "", head: "", css: new Set()};
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape(value)) : `"${value}"`}`}`;
}
var root_svelte_svelte_type_style_lang = "#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}";
const css$f = {
  code: "#svelte-announcer.svelte-1pdgbjn{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\texport let props_3 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n</script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}>\\n\\t\\t\\t\\t\\t{#if components[3]}\\n\\t\\t\\t\\t\\t\\t<svelte:component this={components[3]} {...(props_3 || {})}/>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t</svelte:component>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\tNavigated to {title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>#svelte-announcer{clip:rect(0 0 0 0);-webkit-clip-path:inset(50%);clip-path:inset(50%);height:1px;left:0;overflow:hidden;position:absolute;top:0;white-space:nowrap;width:1px}</style>"],"names":[],"mappings":"AA0DO,gCAAiB,CAAC,KAAK,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,kBAAkB,MAAM,GAAG,CAAC,CAAC,UAAU,MAAM,GAAG,CAAC,CAAC,OAAO,GAAG,CAAC,KAAK,CAAC,CAAC,SAAS,MAAM,CAAC,SAAS,QAAQ,CAAC,IAAI,CAAC,CAAC,YAAY,MAAM,CAAC,MAAM,GAAG,CAAC"}`
};
const Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {stores} = $$props;
  let {page} = $$props;
  let {components} = $$props;
  let {props_0 = null} = $$props;
  let {props_1 = null} = $$props;
  let {props_2 = null} = $$props;
  let {props_3 = null} = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  if ($$props.props_3 === void 0 && $$bindings.props_3 && props_3 !== void 0)
    $$bindings.props_3(props_3);
  $$result.css.add(css$f);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {
        default: () => `${components[3] ? `${validate_component(components[3] || missing_component, "svelte:component").$$render($$result, Object.assign(props_3 || {}), {}, {})}` : ``}`
      })}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1pdgbjn"}">${navigated ? `Navigated to ${escape(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
const template = ({head, body}) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.ico" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n		<link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet" />\n		<link rel="preconnect" href="https://fonts.gstatic.com" />\n		<link rel="preconnect" href="https://fonts.gstatic.com" />\n		<link\n			href="https://fonts.googleapis.com/css2?family=Lato&family=Noto+Sans+JP:wght@300&display=swap"\n			rel="stylesheet"\n		/>\n\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
let options = null;
function init(settings2) {
  set_paths(settings2.paths);
  set_prerendering(settings2.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-3ddde90f.js",
      css: ["/./_app/assets/start-0826e215.css"],
      js: ["/./_app/start-3ddde90f.js", "/./_app/chunks/index-31c2d992.js", "/./_app/chunks/index-c2ea1688.js", "/./_app/chunks/singletons-6b53f818.js"]
    },
    fetched: void 0,
    get_component_path: (id2) => "/./_app/" + entry_lookup[id2],
    get_stack: (error) => String(error),
    handle_error: (error) => {
      console.error(error.stack);
      error.stack = options.get_stack(error);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings2.paths,
    read: settings2.read,
    root: Root,
    router: true,
    ssr: true,
    target: "#svelte",
    template
  };
}
const empty = () => ({});
const manifest = {
  assets: [],
  layout: "src/routes/$layout.svelte",
  error: "src/routes/$error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/doctor\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/doctor/index.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/ranger\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/ranger/index.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/admin\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/admin/index.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/auth\/forgotpassword\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/auth/$layout.svelte", "src/routes/auth/forgotpassword.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/auth\/register\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/auth/$layout.svelte", "src/routes/auth/register.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/auth\/login\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/auth/$layout.svelte", "src/routes/auth/login.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/index.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/kwitizina\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/kwitizina.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/gorillas\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/gorillas.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/settings\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/settings.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/doctors\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/doctors.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/rangers\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/rangers.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/reports\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/reports.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/store\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/store.svelte"],
      b: ["src/routes/$error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/user\/tasks\/?$/,
      params: empty,
      a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/tasks.svelte"],
      b: ["src/routes/$error.svelte"]
    }
  ]
};
const get_hooks = (hooks) => ({
  getContext: hooks.getContext || (() => ({})),
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({request, render: render2}) => render2(request))
});
const module_lookup = {
  "src/routes/$layout.svelte": () => Promise.resolve().then(function() {
    return $layout$5;
  }),
  "src/routes/$error.svelte": () => Promise.resolve().then(function() {
    return $error$1;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$4;
  }),
  "src/routes/doctor/index.svelte": () => Promise.resolve().then(function() {
    return index$3;
  }),
  "src/routes/ranger/index.svelte": () => Promise.resolve().then(function() {
    return index$2;
  }),
  "src/routes/admin/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/auth/$layout.svelte": () => Promise.resolve().then(function() {
    return $layout$3;
  }),
  "src/routes/auth/forgotpassword.svelte": () => Promise.resolve().then(function() {
    return forgotpassword;
  }),
  "src/routes/auth/register.svelte": () => Promise.resolve().then(function() {
    return register;
  }),
  "src/routes/auth/login.svelte": () => Promise.resolve().then(function() {
    return login;
  }),
  "src/routes/user/$layout.svelte": () => Promise.resolve().then(function() {
    return $layout$1;
  }),
  "src/routes/user/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/user/kwitizina.svelte": () => Promise.resolve().then(function() {
    return kwitizina;
  }),
  "src/routes/user/gorillas.svelte": () => Promise.resolve().then(function() {
    return gorillas;
  }),
  "src/routes/user/settings.svelte": () => Promise.resolve().then(function() {
    return settings;
  }),
  "src/routes/user/doctors.svelte": () => Promise.resolve().then(function() {
    return doctors;
  }),
  "src/routes/user/rangers.svelte": () => Promise.resolve().then(function() {
    return rangers;
  }),
  "src/routes/user/reports.svelte": () => Promise.resolve().then(function() {
    return reports;
  }),
  "src/routes/user/store.svelte": () => Promise.resolve().then(function() {
    return store;
  }),
  "src/routes/user/tasks.svelte": () => Promise.resolve().then(function() {
    return tasks;
  })
};
const metadata_lookup = {"src/routes/$layout.svelte": {entry: "/./_app/pages/$layout.svelte-77147f15.js", css: ["/./_app/assets/pages/$layout.svelte-ffb66b6e.css"], js: ["/./_app/pages/$layout.svelte-77147f15.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/$error.svelte": {entry: "/./_app/pages/$error.svelte-8b905f17.js", css: [], js: ["/./_app/pages/$error.svelte-8b905f17.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/index.svelte": {entry: "/./_app/pages/index.svelte-bf446a14.js", css: [], js: ["/./_app/pages/index.svelte-bf446a14.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/doctor/index.svelte": {entry: "/./_app/pages/doctor/index.svelte-5c50ddf0.js", css: [], js: ["/./_app/pages/doctor/index.svelte-5c50ddf0.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/ranger/index.svelte": {entry: "/./_app/pages/ranger/index.svelte-8dada83a.js", css: ["/./_app/assets/pages/ranger/index.svelte-a84417ac.css"], js: ["/./_app/pages/ranger/index.svelte-8dada83a.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/admin/index.svelte": {entry: "/./_app/pages/admin/index.svelte-930fb8e4.js", css: ["/./_app/assets/pages/ranger/index.svelte-a84417ac.css"], js: ["/./_app/pages/admin/index.svelte-930fb8e4.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/auth/$layout.svelte": {entry: "/./_app/pages/auth/$layout.svelte-f820c3f6.js", css: [], js: ["/./_app/pages/auth/$layout.svelte-f820c3f6.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/auth/forgotpassword.svelte": {entry: "/./_app/pages/auth/forgotpassword.svelte-b832cefa.js", css: [], js: ["/./_app/pages/auth/forgotpassword.svelte-b832cefa.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/auth/register.svelte": {entry: "/./_app/pages/auth/register.svelte-b2bd3cd5.js", css: [], js: ["/./_app/pages/auth/register.svelte-b2bd3cd5.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/auth/login.svelte": {entry: "/./_app/pages/auth/login.svelte-6cf9d2e1.js", css: [], js: ["/./_app/pages/auth/login.svelte-6cf9d2e1.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/user/$layout.svelte": {entry: "/./_app/pages/user/$layout.svelte-81b5343b.js", css: ["/./_app/assets/pages/user/$layout.svelte-78e00086.css"], js: ["/./_app/pages/user/$layout.svelte-81b5343b.js", "/./_app/chunks/index-31c2d992.js", "/./_app/chunks/navigation-9e49acea.js", "/./_app/chunks/singletons-6b53f818.js"], styles: null}, "src/routes/user/index.svelte": {entry: "/./_app/pages/user/index.svelte-e4cdb11a.js", css: ["/./_app/assets/pages/ranger/index.svelte-a84417ac.css"], js: ["/./_app/pages/user/index.svelte-e4cdb11a.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/user/kwitizina.svelte": {entry: "/./_app/pages/user/kwitizina.svelte-73e50e94.js", css: ["/./_app/assets/pages/user/kwitizina.svelte-7db769a1.css"], js: ["/./_app/pages/user/kwitizina.svelte-73e50e94.js", "/./_app/chunks/index-31c2d992.js", "/./_app/chunks/index-c2ea1688.js"], styles: null}, "src/routes/user/gorillas.svelte": {entry: "/./_app/pages/user/gorillas.svelte-eccda77c.js", css: ["/./_app/assets/pages/user/gorillas.svelte-88528781.css"], js: ["/./_app/pages/user/gorillas.svelte-eccda77c.js", "/./_app/chunks/index-31c2d992.js", "/./_app/chunks/Search-a46387ee.js"], styles: null}, "src/routes/user/settings.svelte": {entry: "/./_app/pages/user/settings.svelte-84a41692.js", css: ["/./_app/assets/pages/user/settings.svelte-77dd228a.css"], js: ["/./_app/pages/user/settings.svelte-84a41692.js", "/./_app/chunks/index-31c2d992.js", "/./_app/chunks/index-c2ea1688.js"], styles: null}, "src/routes/user/doctors.svelte": {entry: "/./_app/pages/user/doctors.svelte-2c8d885b.js", css: ["/./_app/assets/pages/user/doctors.svelte-0cfb13f2.css", "/./_app/assets/InvitationModal-1a118015.css"], js: ["/./_app/pages/user/doctors.svelte-2c8d885b.js", "/./_app/chunks/index-31c2d992.js", "/./_app/chunks/InvitationModal-13909d8e.js", "/./_app/chunks/Search-a46387ee.js"], styles: null}, "src/routes/user/rangers.svelte": {entry: "/./_app/pages/user/rangers.svelte-236f16f9.js", css: ["/./_app/assets/pages/user/doctors.svelte-0cfb13f2.css", "/./_app/assets/InvitationModal-1a118015.css"], js: ["/./_app/pages/user/rangers.svelte-236f16f9.js", "/./_app/chunks/index-31c2d992.js", "/./_app/chunks/Search-a46387ee.js", "/./_app/chunks/navigation-9e49acea.js", "/./_app/chunks/singletons-6b53f818.js", "/./_app/chunks/InvitationModal-13909d8e.js"], styles: null}, "src/routes/user/reports.svelte": {entry: "/./_app/pages/user/reports.svelte-27cc8612.js", css: ["/./_app/assets/pages/user/reports.svelte-8881f422.css"], js: ["/./_app/pages/user/reports.svelte-27cc8612.js", "/./_app/chunks/index-31c2d992.js", "/./_app/chunks/navigation-9e49acea.js", "/./_app/chunks/singletons-6b53f818.js"], styles: null}, "src/routes/user/store.svelte": {entry: "/./_app/pages/user/store.svelte-6525ce24.js", css: [], js: ["/./_app/pages/user/store.svelte-6525ce24.js", "/./_app/chunks/index-31c2d992.js"], styles: null}, "src/routes/user/tasks.svelte": {entry: "/./_app/pages/user/tasks.svelte-e170c8b8.js", css: [], js: ["/./_app/pages/user/tasks.svelte-e170c8b8.js", "/./_app/chunks/index-31c2d992.js"], styles: null}};
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
init({paths: {base: "", assets: "/."}});
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return ssr({...request, host}, options, {prerender});
}
var app = "/*! tailwindcss v2.1.1 | MIT License | https://tailwindcss.com*/\n/*! modern-normalize v1.0.0 | MIT License | https://github.com/sindresorhus/modern-normalize */:root{-moz-tab-size:4;-o-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;margin:0}hr{color:inherit;height:0}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}button{background-color:transparent;background-image:none}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}fieldset,ol,ul{margin:0;padding:0}ol,ul{list-style:none}html{font-family:Nunito,Nunito Sans,sans-serif;line-height:1.5}body{font-family:inherit;line-height:inherit}*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input:-ms-input-placeholder,textarea:-ms-input-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{color:inherit;line-height:inherit;padding:0}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}*{--tw-shadow:0 0 transparent;--tw-ring-inset:var(--tw-empty,/*!*/ /*!*/);--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,0.5);--tw-ring-offset-shadow:0 0 transparent;--tw-ring-shadow:0 0 transparent}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{bottom:0;left:0;right:0;top:0}.right-0{right:0}.top-4{top:1rem}.bottom-0{bottom:0}.z-10{z-index:10}.float-left{float:left}.m-3{margin:.75rem}.m-2{margin:.5rem}.m-1{margin:.25rem}.mx-3{margin-left:.75rem;margin-right:.75rem}.mx-2{margin-left:.5rem;margin-right:.5rem}.mx-1{margin-left:.25rem;margin-right:.25rem}.mx-5{margin-left:1.25rem;margin-right:1.25rem}.my-4{margin-bottom:1rem;margin-top:1rem}.mx-auto{margin-left:auto;margin-right:auto}.-mx-3{margin-left:-.75rem;margin-right:-.75rem}.mx-4{margin-left:1rem;margin-right:1rem}.my-2{margin-bottom:.5rem;margin-top:.5rem}.mx-6{margin-left:1.5rem;margin-right:1.5rem}.mt-0{margin-top:0}.mt-3{margin-top:.75rem}.mr-3{margin-right:.75rem}.mb-4{margin-bottom:1rem}.ml-3{margin-left:.75rem}.mt-5{margin-top:1.25rem}.mb-3{margin-bottom:.75rem}.mt-4{margin-top:1rem}.mb-6{margin-bottom:1.5rem}.mb-2{margin-bottom:.5rem}.ml-1{margin-left:.25rem}.mb-5{margin-bottom:1.25rem}.mt-2{margin-top:.5rem}.mr-2{margin-right:.5rem}.mr-10{margin-right:2.5rem}.mt-6{margin-top:1.5rem}.mt-1{margin-top:.25rem}.mb-10{margin-bottom:2.5rem}.-mt-3{margin-top:-.75rem}.mb-0{margin-bottom:0}.ml-2{margin-left:.5rem}.mt-10{margin-top:2.5rem}.mb-1{margin-bottom:.25rem}.block{display:block}.inline-block{display:inline-block}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-8{height:2rem}.h-full{height:100%}.h-5{height:1.25rem}.h-24{height:6rem}.h-7{height:1.75rem}.h-3{height:.75rem}.h-screen{height:100vh}.h-20{height:5rem}.h-12{height:3rem}.h-16{height:4rem}.h-6{height:1.5rem}.h-32{height:8rem}.h-10{height:2.5rem}.min-h-screen{min-height:100vh}.w-full{width:100%}.w-1\\/6{width:16.666667%}.w-8{width:2rem}.w-3\\/4{width:75%}.w-1\\/5{width:20%}.w-10\\/12{width:83.333333%}.w-20{width:5rem}.w-5{width:1.25rem}.w-2\\/5{width:40%}.w-36{width:9rem}.w-64{width:16rem}.w-3{width:.75rem}.w-11\\/12{width:91.666667%}.w-56{width:14rem}.w-12{width:3rem}.w-8\\/12{width:66.666667%}.w-4\\/12{width:33.333333%}.w-6{width:1.5rem}.w-16{width:4rem}.w-24{width:6rem}.w-10{width:2.5rem}.w-screen{width:100vw}.flex-shrink-0{flex-shrink:0}.transform{--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;transform:translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.cursor-pointer{cursor:pointer}.appearance-none{-webkit-appearance:none;-moz-appearance:none;appearance:none}.grid-cols-1{grid-template-columns:repeat(1,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-row{flex-direction:row}.flex-row-reverse{flex-direction:row-reverse}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.items-end{align-items:flex-end}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-6{gap:1.5rem}.space-x-3>:not([hidden])~:not([hidden]){--tw-space-x-reverse:0;margin-left:calc(.75rem*(1 - var(--tw-space-x-reverse)));margin-right:calc(.75rem*var(--tw-space-x-reverse))}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse:0;margin-bottom:calc(.5rem*var(--tw-space-y-reverse));margin-top:calc(.5rem*(1 - var(--tw-space-y-reverse)))}.overflow-y-auto{overflow-y:auto}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.rounded-sm{border-radius:.125rem}.rounded-full{border-radius:9999px}.rounded-md{border-radius:.375rem}.rounded-lg{border-radius:.5rem}.rounded-xl{border-radius:.75rem}.border-2{border-width:2px}.border{border-width:1px}.border-0{border-width:0}.border-b-2{border-bottom-width:2px}.border-b{border-bottom-width:1px}.border-transparent{border-color:transparent}.border-gray-300{--tw-border-opacity:1;border-color:rgba(209,213,219,var(--tw-border-opacity))}.border-black{--tw-border-opacity:1;border-color:rgba(0,0,0,var(--tw-border-opacity))}.border-red-500{--tw-border-opacity:1;border-color:rgba(239,68,68,var(--tw-border-opacity))}.border-green-600{--tw-border-opacity:1;border-color:rgba(5,150,105,var(--tw-border-opacity))}.border-green-700{--tw-border-opacity:1;border-color:rgba(4,120,87,var(--tw-border-opacity))}.bg-green-600{--tw-bg-opacity:1;background-color:rgba(5,150,105,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity:1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.bg-gray-500{--tw-bg-opacity:1;background-color:rgba(107,114,128,var(--tw-bg-opacity))}.bg-gray-50{--tw-bg-opacity:1;background-color:rgba(249,250,251,var(--tw-bg-opacity))}.bg-red-600{--tw-bg-opacity:1;background-color:rgba(220,38,38,var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-primaryGreen{--tw-bg-opacity:1;background-color:rgba(0,145,124,var(--tw-bg-opacity))}.bg-gray-300{--tw-bg-opacity:1;background-color:rgba(209,213,219,var(--tw-bg-opacity))}.bg-primaryWhite{--tw-bg-opacity:1;background-color:rgba(252,253,255,var(--tw-bg-opacity))}.bg-gray-100{--tw-bg-opacity:1;background-color:rgba(243,244,246,var(--tw-bg-opacity))}.fill-current{fill:currentColor}.p-2{padding:.5rem}.p-4{padding:1rem}.p-6{padding:1.5rem}.p-1{padding:.25rem}.p-3{padding:.75rem}.py-8{padding-bottom:2rem;padding-top:2rem}.px-4{padding-left:1rem;padding-right:1rem}.px-3{padding-left:.75rem;padding-right:.75rem}.py-1{padding-bottom:.25rem;padding-top:.25rem}.py-2{padding-bottom:.5rem;padding-top:.5rem}.py-3{padding-bottom:.75rem;padding-top:.75rem}.px-2{padding-left:.5rem;padding-right:.5rem}.py-6{padding-bottom:1.5rem;padding-top:1.5rem}.px-10{padding-left:2.5rem;padding-right:2.5rem}.py-4{padding-bottom:1rem;padding-top:1rem}.px-8{padding-left:2rem;padding-right:2rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-0\\.5{padding-left:.125rem;padding-right:.125rem}.px-0{padding-left:0;padding-right:0}.px-40{padding-left:10rem;padding-right:10rem}.pt-3{padding-top:.75rem}.pb-1{padding-bottom:.25rem}.pr-1{padding-right:.25rem}.pl-1{padding-left:.25rem}.pt-4{padding-top:1rem}.pb-20{padding-bottom:5rem}.pl-2{padding-left:.5rem}.text-center{text-align:center}.text-left{text-align:left}.align-bottom{vertical-align:bottom}.font-sourceSans{font-family:Lato,Source Sans Pro,sans-serif}.font-sans{font-family:Nunito,Nunito Sans,sans-serif}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-base{font-size:1rem;line-height:1.5rem}.text-xs{font-size:.75rem;line-height:1rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-2xl{font-size:1.5rem;line-height:2rem}.text-5xl{font-size:3rem;line-height:1}.font-semibold{font-weight:600}.font-medium{font-weight:500}.font-bold{font-weight:700}.font-black{font-weight:900}.uppercase{text-transform:uppercase}.leading-relaxed{line-height:1.625}.tracking-wide{letter-spacing:.025em}.text-white{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-gray-900{--tw-text-opacity:1;color:rgba(17,24,39,var(--tw-text-opacity))}.text-successorColor{--tw-text-opacity:1;color:rgba(240,165,0,var(--tw-text-opacity))}.text-greenAccent{--tw-text-opacity:1;color:rgba(0,145,124,var(--tw-text-opacity))}.text-gray-600{--tw-text-opacity:1;color:rgba(75,85,99,var(--tw-text-opacity))}.text-motherGreen{--tw-text-opacity:1;color:rgba(0,145,124,var(--tw-text-opacity))}.text-green-500{--tw-text-opacity:1;color:rgba(16,185,129,var(--tw-text-opacity))}.text-red-500{--tw-text-opacity:1;color:rgba(239,68,68,var(--tw-text-opacity))}.text-gray-800{--tw-text-opacity:1;color:rgba(31,41,55,var(--tw-text-opacity))}.text-green-600{--tw-text-opacity:1;color:rgba(5,150,105,var(--tw-text-opacity))}.text-gray-500{--tw-text-opacity:1;color:rgba(107,114,128,var(--tw-text-opacity))}.text-gray-700{--tw-text-opacity:1;color:rgba(55,65,81,var(--tw-text-opacity))}.text-blue-500{--tw-text-opacity:1;color:rgba(59,130,246,var(--tw-text-opacity))}.underline{text-decoration:underline}.opacity-75{opacity:.75}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)}.shadow-sm,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.shadow-sm{--tw-shadow:0 1px 2px 0 rgba(0,0,0,0.05)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05)}.shadow,.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.focus-within\\:border-green-500:focus-within{--tw-border-opacity:1;border-color:rgba(16,185,129,var(--tw-border-opacity))}.hover\\:bg-red-700:hover{--tw-bg-opacity:1;background-color:rgba(185,28,28,var(--tw-bg-opacity))}.hover\\:bg-gray-50:hover{--tw-bg-opacity:1;background-color:rgba(249,250,251,var(--tw-bg-opacity))}.hover\\:text-white:hover{--tw-text-opacity:1;color:rgba(255,255,255,var(--tw-text-opacity))}.hover\\:text-motherGreen:hover{--tw-text-opacity:1;color:rgba(0,145,124,var(--tw-text-opacity))}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);box-shadow:var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)}.focus\\:border-green-600:focus{--tw-border-opacity:1;border-color:rgba(5,150,105,var(--tw-border-opacity))}.focus\\:border-green-500:focus{--tw-border-opacity:1;border-color:rgba(16,185,129,var(--tw-border-opacity))}.focus\\:border-gray-300:focus{--tw-border-opacity:1;border-color:rgba(209,213,219,var(--tw-border-opacity))}.focus\\:font-semibold:focus{font-weight:600}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-2:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.focus\\:ring-2:focus,.focus\\:ring:focus{box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow,0 0 transparent)}.focus\\:ring:focus{--tw-ring-offset-shadow:var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow:var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)}.focus\\:ring-red-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgba(239,68,68,var(--tw-ring-opacity))}.focus\\:ring-indigo-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgba(99,102,241,var(--tw-ring-opacity))}.focus\\:ring-green-500:focus{--tw-ring-opacity:1;--tw-ring-color:rgba(16,185,129,var(--tw-ring-opacity))}.focus\\:ring-offset-2:focus{--tw-ring-offset-width:2px}@media (min-width:640px){.sm\\:my-8{margin-bottom:2rem;margin-top:2rem}.sm\\:mx-4{margin-left:1rem;margin-right:1rem}.sm\\:ml-3{margin-left:.75rem}.sm\\:mt-0{margin-top:0}.sm\\:mt-6{margin-top:1.5rem}.sm\\:block{display:block}.sm\\:inline-block{display:inline-block}.sm\\:flex{display:flex}.sm\\:h-screen{height:100vh}.sm\\:w-full{width:100%}.sm\\:w-auto{width:auto}.sm\\:w-5\\/6{width:83.333333%}.sm\\:max-w-lg{max-width:32rem}.sm\\:flex-row-reverse{flex-direction:row-reverse}.sm\\:p-0{padding:0}.sm\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.sm\\:pb-4{padding-bottom:1rem}.sm\\:align-middle{vertical-align:middle}.sm\\:text-sm{font-size:.875rem;line-height:1.25rem}}@media (min-width:768px){.md\\:m-5{margin:1.25rem}.md\\:mx-5{margin-left:1.25rem;margin-right:1.25rem}.md\\:mx-0{margin-left:0;margin-right:0}.md\\:mx-10{margin-left:2.5rem;margin-right:2.5rem}.md\\:mb-5{margin-bottom:1.25rem}.md\\:ml-4{margin-left:1rem}.md\\:ml-40{margin-left:10rem}.md\\:mt-1{margin-top:.25rem}.md\\:mt-0{margin-top:0}.md\\:ml-2{margin-left:.5rem}.md\\:mr-3{margin-right:.75rem}.md\\:-ml-20{margin-left:-5rem}.md\\:ml-5{margin-left:1.25rem}.md\\:mr-10{margin-right:2.5rem}.md\\:flex{display:flex}.md\\:w-4\\/12{width:33.333333%}.md\\:w-6\\/12{width:50%}.md\\:w-7\\/12{width:58.333333%}.md\\:w-full{width:100%}.md\\:w-5\\/12{width:41.666667%}.md\\:w-5\\/6{width:83.333333%}.md\\:w-4\\/5{width:80%}.md\\:w-9\\/12{width:75%}.md\\:w-11\\/12{width:91.666667%}.md\\:w-8\\/12{width:66.666667%}.md\\:px-8{padding-left:2rem;padding-right:2rem}.md\\:py-3{padding-bottom:.75rem;padding-top:.75rem}.md\\:px-10{padding-left:2.5rem;padding-right:2.5rem}.md\\:px-5{padding-left:1.25rem;padding-right:1.25rem}.md\\:py-6{padding-bottom:1.5rem;padding-top:1.5rem}.md\\:px-1{padding-left:.25rem;padding-right:.25rem}.md\\:px-6{padding-left:1.5rem;padding-right:1.5rem}.md\\:pb-0{padding-bottom:0}.md\\:pb-6{padding-bottom:1.5rem}.md\\:pt-3{padding-top:.75rem}.md\\:text-left{text-align:left}.md\\:text-2xl{font-size:1.5rem;line-height:2rem}}@media (min-width:1024px){.lg\\:w-6\\/12{width:50%}.lg\\:w-5\\/12{width:41.666667%}.lg\\:w-11\\/12{width:91.666667%}}";
const $layout$4 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<main>${slots.default ? slots.default({}) : ``}</main>`;
});
var $layout$5 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: $layout$4
});
const $error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {status} = $$props;
  let {error} = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error !== void 0)
    $$bindings.error(error);
  return `${$$result.head += `${$$result.title = `<title>${escape(status)}</title>`, ""}`, ""}

<h1>${escape(status)}</h1>

<p>${escape(error.message)}</p>

${``}`;
});
var $error$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: $error
});
const Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<p>Hello this is home</p>`;
});
var index$4 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Routes
});
const Doctor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>Doctor</h1>`;
});
var index$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Doctor
});
var index_svelte_svelte_type_style_lang$2 = ".attended.svelte-1h36ws9.svelte-1h36ws9{background-color:#b7ffc2}.missed.svelte-1h36ws9.svelte-1h36ws9{background-color:#fc7474}.made.svelte-1h36ws9.svelte-1h36ws9{background-color:#86c5ff}.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full.svelte-1h36ws9.svelte-1h36ws9{color:#f0a500}@media only screen and (max-height:340px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar{width:4px}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-1h36ws9.svelte-1h36ws9::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}";
const css$e = {
  code: ".attended.svelte-1h36ws9.svelte-1h36ws9{background-color:#b7ffc2}.missed.svelte-1h36ws9.svelte-1h36ws9{background-color:#fc7474}.made.svelte-1h36ws9.svelte-1h36ws9{background-color:#86c5ff}.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full.svelte-1h36ws9.svelte-1h36ws9{color:#f0a500}@media only screen and (max-height:340px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar{width:4px}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-1h36ws9.svelte-1h36ws9::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\" lang=\\"ts\\"></script>\\n\\n<script type=\\"ts\\">let integers = [1, 2, 3, 4, 5, 6];\\r\\nlet newReportUrl = 'data:image/jpeg;base64,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';\\r\\n</script>\\n\\n<svelte:head>\\n\\t<title>WELCOME</title>\\n</svelte:head>\\n\\n<div>\\n\\t<div\\n\\t\\tclass=\\"rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-11/12 longer py-6 sm:w-full md:w-full lg:w-11/12\\"\\n\\t>\\n\\t\\t<div class=\\"px:2 m-2 md: bg-primaryGreen rounded-xl p-3 px-5 md:py-6\\">\\n\\t\\t\\t<h1 class=\\"text-white text-2xl font-semibold mb-2 ml-2 md:ml-5\\">Welcome Makuza Verite</h1>\\n\\t\\t\\t<h3 class=\\"text-white text-xl ml-2 md:ml-5\\">Have a nice day !</h3>\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class=\\"w-full md:flex  px-4 sm:w-full md:w-full lg:w-11/12\\">\\n\\t\\t<div class=\\"md:w-8/12 px-5 mt-10\\">\\n\\t\\t\\t<div class=\\"flex w-full justify-between mb-4\\">\\n\\t\\t\\t\\t<h2 class=\\"font-semibold text-xl mx-6\\">Daily Report</h2>\\n\\t\\t\\t\\t<a href=\\"/admin/reports\\"><h3 class=\\"font-semibold full md:mr-10\\">View full</h3></a>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"w-full flex flex-wrap flex-row-reverse\\">\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 w-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl made\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2\\">Gorillas pregnant</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">17</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 nw-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl attended\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2\\">Gorillas Found</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">136</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 w-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl attended missed\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2 \\">Gorillas Lost</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">9</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class=\\"sm:w-full md:w-4/12 lg:w-5/12 px-5 md:px-1 mt-6 md:mt-0\\">\\n\\t\\t\\t<div class=\\"bg-white flex flex-col pt-3 px-3 rounded-lg w-11/12\\">\\n\\t\\t\\t\\t<div class=\\"flex justify-between mb-1\\">\\n\\t\\t\\t\\t\\t<h3 class=\\"font-semibold text-xl mx-4\\">Gorillas List</h3>\\n\\t\\t\\t\\t\\t<a href=\\"/admin/gorillas\\"><h3 class=\\"font-semibold text-sm full mx-4\\">View all</h3></a>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"\\">\\n\\t\\t\\t\\t\\t{#each integers as int}\\n\\t\\t\\t\\t\\t\\t<div class=\\"mb-0 px-3 pb-1 md:px-6 flex cursor-pointer rounded items-center mx-auto\\">\\n\\t\\t\\t\\t\\t\\t\\t<img\\n\\t\\t\\t\\t\\t\\t\\t\\talt=\\"Success Kid\\"\\n\\t\\t\\t\\t\\t\\t\\t\\tsrc={newReportUrl}\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"h-10 w-10 rounded-full cursor-pointer\\"\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex flex-col pl-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"font-semibold text-sm\\">Amahoro</span>\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"text-gray-500 text-sm\\">22 December 2020</span>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>.attended{background-color:#b7ffc2}.missed{background-color:#fc7474}.made{background-color:#86c5ff}.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full{color:#f0a500}@media only screen and (max-height:340px){.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div ::-webkit-scrollbar{width:4px}div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}</style>\\n"],"names":[],"mappings":"AA2EO,uCAAS,CAAC,iBAAiB,OAAO,CAAC,qCAAO,CAAC,iBAAiB,OAAO,CAAC,mCAAK,CAAC,iBAAiB,OAAO,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,mCAAK,CAAC,MAAM,OAAO,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,IAAI,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,IAAI,CAAC,CAAC,kBAAG,gBAAC,mBAAmB,CAAC,MAAM,GAAG,CAAC,kBAAG,gBAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,iCAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC"}`
};
let newReportUrl$2 = "data:image/jpeg;base64,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";
const Ranger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let integers = [1, 2, 3, 4, 5, 6];
  $$result.css.add(css$e);
  return `${$$result.head += `${$$result.title = `<title>WELCOME</title>`, ""}`, ""}

<div class="${"svelte-1h36ws9"}"><div class="${"rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-11/12 longer py-6 sm:w-full md:w-full lg:w-11/12 svelte-1h36ws9"}"><div class="${"px:2 m-2 md: bg-primaryGreen rounded-xl p-3 px-5 md:py-6 svelte-1h36ws9"}"><h1 class="${"text-white text-2xl font-semibold mb-2 ml-2 md:ml-5 svelte-1h36ws9"}">Welcome Makuza Verite</h1>
			<h3 class="${"text-white text-xl ml-2 md:ml-5 svelte-1h36ws9"}">Have a nice day !</h3></div></div>
	<div class="${"w-full md:flex  px-4 sm:w-full md:w-full lg:w-11/12 svelte-1h36ws9"}"><div class="${"md:w-8/12 px-5 mt-10 svelte-1h36ws9"}"><div class="${"flex w-full justify-between mb-4 svelte-1h36ws9"}"><h2 class="${"font-semibold text-xl mx-6 svelte-1h36ws9"}">Daily Report</h2>
				<a href="${"/admin/reports"}" class="${"svelte-1h36ws9"}"><h3 class="${"font-semibold full md:mr-10 svelte-1h36ws9"}">View full</h3></a></div>
			<div class="${"w-full flex flex-wrap flex-row-reverse svelte-1h36ws9"}"><div class="${"mt-4 md:mt-0 w-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl made svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2 svelte-1h36ws9"}">Gorillas pregnant</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">17</h4></div>
				<div class="${"mt-4 md:mt-0 nw-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl attended svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2 svelte-1h36ws9"}">Gorillas Found</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">136</h4></div>
				<div class="${"mt-4 md:mt-0 w-3/10 flex flex-col items-center mx-auto bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl attended missed svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2  svelte-1h36ws9"}">Gorillas Lost</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">9</h4></div></div></div>
		<div class="${"sm:w-full md:w-4/12 lg:w-5/12 px-5 md:px-1 mt-6 md:mt-0 svelte-1h36ws9"}"><div class="${"bg-white flex flex-col pt-3 px-3 rounded-lg w-11/12 svelte-1h36ws9"}"><div class="${"flex justify-between mb-1 svelte-1h36ws9"}"><h3 class="${"font-semibold text-xl mx-4 svelte-1h36ws9"}">Gorillas List</h3>
					<a href="${"/admin/gorillas"}" class="${"svelte-1h36ws9"}"><h3 class="${"font-semibold text-sm full mx-4 svelte-1h36ws9"}">View all</h3></a></div>
				<div class="${" svelte-1h36ws9"}">${each(integers, (int) => `<div class="${"mb-0 px-3 pb-1 md:px-6 flex cursor-pointer rounded items-center mx-auto svelte-1h36ws9"}"><img alt="${"Success Kid"}"${add_attribute("src", newReportUrl$2, 0)} class="${"h-10 w-10 rounded-full cursor-pointer svelte-1h36ws9"}">
							<div class="${"flex flex-col pl-2 svelte-1h36ws9"}"><span class="${"font-semibold text-sm svelte-1h36ws9"}">Amahoro</span>
								<span class="${"text-gray-500 text-sm svelte-1h36ws9"}">22 December 2020</span></div>
						</div>`)}</div></div></div></div>
</div>`;
});
var index$2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Ranger
});
var index_svelte_svelte_type_style_lang$1 = ".attended.svelte-1h36ws9.svelte-1h36ws9{background-color:#b7ffc2}.missed.svelte-1h36ws9.svelte-1h36ws9{background-color:#fc7474}.made.svelte-1h36ws9.svelte-1h36ws9{background-color:#86c5ff}.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full.svelte-1h36ws9.svelte-1h36ws9{color:#f0a500}@media only screen and (max-height:340px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar{width:4px}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-1h36ws9.svelte-1h36ws9::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}";
const css$d = {
  code: ".attended.svelte-1h36ws9.svelte-1h36ws9{background-color:#b7ffc2}.missed.svelte-1h36ws9.svelte-1h36ws9{background-color:#fc7474}.made.svelte-1h36ws9.svelte-1h36ws9{background-color:#86c5ff}.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full.svelte-1h36ws9.svelte-1h36ws9{color:#f0a500}@media only screen and (max-height:340px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar{width:4px}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-1h36ws9.svelte-1h36ws9::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script type=\\"ts\\">let integers = [1, 2, 3, 4, 5, 6];\\r\\nlet newReportUrl = 'data:image/jpeg;base64,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';\\r\\n</script>\\n\\n<div>\\n\\t<div\\n\\t\\tclass=\\"rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-11/12 longer py-6 sm:w-full md:w-full lg:w-11/12\\"\\n\\t>\\n\\t\\t<div class=\\"px:2 m-2 md: bg-primaryGreen rounded-xl p-3 px-5 md:py-6\\">\\n\\t\\t\\t<h1 class=\\"text-white text-2xl font-semibold mb-2 ml-2 md:ml-5\\">Welcome Makuza Verite</h1>\\n\\t\\t\\t<h3 class=\\"text-white text-xl ml-2 md:ml-5\\">Have a nice day !</h3>\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class=\\"w-full md:flex  px-4 sm:w-full md:w-full lg:w-11/12\\">\\n\\t\\t<div class=\\"md:w-8/12 px-5 mt-10\\">\\n\\t\\t\\t<div class=\\"flex w-full justify-between mb-4\\">\\n\\t\\t\\t\\t<h2 class=\\"font-semibold text-xl mx-6\\">Daily Report</h2>\\n\\t\\t\\t\\t<a href=\\"/admin/reports\\"><h3 class=\\"font-semibold full md:mr-10\\">View full</h3></a>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"w-full flex flex-wrap justify-between\\">\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 nw-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl attended\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2\\">Gorillas Found</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">136</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl made\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2\\">Gorillas pregnant</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">17</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl attended missed\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2 \\">Gorillas Lost</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">9</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class=\\"sm:w-full md:w-4/12 lg:w-5/12 px-5 md:px-1 mt-6 md:mt-0\\">\\n\\t\\t\\t<div class=\\"bg-white flex flex-col pt-3 px-3 rounded-lg w-11/12\\">\\n\\t\\t\\t\\t<div class=\\"flex justify-between mb-1\\">\\n\\t\\t\\t\\t\\t<h3 class=\\"font-semibold text-xl mx-4\\">Gorillas List</h3>\\n\\t\\t\\t\\t\\t<a href=\\"/admin/gorillas\\"><h3 class=\\"font-semibold text-sm full mx-4\\">View all</h3></a>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"\\">\\n\\t\\t\\t\\t\\t{#each integers as int}\\n\\t\\t\\t\\t\\t\\t<div class=\\"mb-0 px-3 pb-1 md:px-6 flex cursor-pointer rounded items-center mx-auto\\">\\n\\t\\t\\t\\t\\t\\t\\t<img\\n\\t\\t\\t\\t\\t\\t\\t\\talt=\\"Success Kid\\"\\n\\t\\t\\t\\t\\t\\t\\t\\tsrc={newReportUrl}\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"h-10 w-10 rounded-full cursor-pointer\\"\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex flex-col pl-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"font-semibold text-sm\\">Amahoro</span>\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"text-gray-500 text-sm\\">22 December 2020</span>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>.attended{background-color:#b7ffc2}.missed{background-color:#fc7474}.made{background-color:#86c5ff}.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full{color:#f0a500}@media only screen and (max-height:340px){.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div ::-webkit-scrollbar{width:4px}div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}</style>\\n"],"names":[],"mappings":"AAqEO,uCAAS,CAAC,iBAAiB,OAAO,CAAC,qCAAO,CAAC,iBAAiB,OAAO,CAAC,mCAAK,CAAC,iBAAiB,OAAO,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,mCAAK,CAAC,MAAM,OAAO,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,IAAI,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,IAAI,CAAC,CAAC,kBAAG,gBAAC,mBAAmB,CAAC,MAAM,GAAG,CAAC,kBAAG,gBAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,iCAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC"}`
};
let newReportUrl$1 = "data:image/jpeg;base64,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";
const Admin = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let integers = [1, 2, 3, 4, 5, 6];
  $$result.css.add(css$d);
  return `<div class="${"svelte-1h36ws9"}"><div class="${"rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-11/12 longer py-6 sm:w-full md:w-full lg:w-11/12 svelte-1h36ws9"}"><div class="${"px:2 m-2 md: bg-primaryGreen rounded-xl p-3 px-5 md:py-6 svelte-1h36ws9"}"><h1 class="${"text-white text-2xl font-semibold mb-2 ml-2 md:ml-5 svelte-1h36ws9"}">Welcome Makuza Verite</h1>
			<h3 class="${"text-white text-xl ml-2 md:ml-5 svelte-1h36ws9"}">Have a nice day !</h3></div></div>
	<div class="${"w-full md:flex  px-4 sm:w-full md:w-full lg:w-11/12 svelte-1h36ws9"}"><div class="${"md:w-8/12 px-5 mt-10 svelte-1h36ws9"}"><div class="${"flex w-full justify-between mb-4 svelte-1h36ws9"}"><h2 class="${"font-semibold text-xl mx-6 svelte-1h36ws9"}">Daily Report</h2>
				<a href="${"/admin/reports"}" class="${"svelte-1h36ws9"}"><h3 class="${"font-semibold full md:mr-10 svelte-1h36ws9"}">View full</h3></a></div>
			<div class="${"w-full flex flex-wrap justify-between svelte-1h36ws9"}"><div class="${"mt-4 md:mt-0 nw-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl attended svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2 svelte-1h36ws9"}">Gorillas Found</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">136</h4></div>
				<div class="${"mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl made svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2 svelte-1h36ws9"}">Gorillas pregnant</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">17</h4></div>
				<div class="${"mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl attended missed svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2  svelte-1h36ws9"}">Gorillas Lost</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">9</h4></div></div></div>
		<div class="${"sm:w-full md:w-4/12 lg:w-5/12 px-5 md:px-1 mt-6 md:mt-0 svelte-1h36ws9"}"><div class="${"bg-white flex flex-col pt-3 px-3 rounded-lg w-11/12 svelte-1h36ws9"}"><div class="${"flex justify-between mb-1 svelte-1h36ws9"}"><h3 class="${"font-semibold text-xl mx-4 svelte-1h36ws9"}">Gorillas List</h3>
					<a href="${"/admin/gorillas"}" class="${"svelte-1h36ws9"}"><h3 class="${"font-semibold text-sm full mx-4 svelte-1h36ws9"}">View all</h3></a></div>
				<div class="${" svelte-1h36ws9"}">${each(integers, (int) => `<div class="${"mb-0 px-3 pb-1 md:px-6 flex cursor-pointer rounded items-center mx-auto svelte-1h36ws9"}"><img alt="${"Success Kid"}"${add_attribute("src", newReportUrl$1, 0)} class="${"h-10 w-10 rounded-full cursor-pointer svelte-1h36ws9"}">
							<div class="${"flex flex-col pl-2 svelte-1h36ws9"}"><span class="${"font-semibold text-sm svelte-1h36ws9"}">Amahoro</span>
								<span class="${"text-gray-500 text-sm svelte-1h36ws9"}">22 December 2020</span></div>
						</div>`)}</div></div></div></div>
</div>`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Admin
});
const $layout$2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<section class="${"bg-primaryWhite h-screen w-screen"}"><section class="${"flex  justify-center items-center h-full flex-col"}"><h2 class="${"font-sans text-motherGreen font-black text-5xl text-center mb-10"}">NPMG</h2>
		${slots.default ? slots.default({}) : ``}</section></section>`;
});
var $layout$3 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: $layout$2
});
const Forgotpassword = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Reset password</title>`, ""}`, ""}

<form class="${"grid grid-cols-1 gap-6"}"><label for="${"email"}" class="${"block mb-6"}"><span class="${"text-gray-700"}">Email</span>
		<input type="${"email"}" id="${"email"}" placeholder="${"enter your email here"}" class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}"></label>
	<input type="${"submit"}" value="${"Reset your password"}" class="${"bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-2 "}">

	<div class="${"text-center"}"><span>Remember your account</span>
		<a href="${"/auth/login"}" class="${" text-blue-500"}">Login here? </a></div></form>`;
});
var forgotpassword = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Forgotpassword
});
let firstName;
let lastName;
let phone;
let email;
let password;
let role;
const Register = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `

${$$result.head += `${$$result.title = `<title>Register</title>`, ""}`, ""}





<form class="${"grid grid-cols-1 gap-6"}"><label for="${"First name"}" class="${"block"}"><span class="${"text-gray-700"}">Full name</span>
		<input type="${"text"}" id="${"First name"}" placeholder="${"Boston Rockstack"}" class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}" required${add_attribute("value", firstName, 1)}></label>

	<label for="${"LastName"}" class="${"block"}"><span class="${"text-gray-700"}">Last name</span>
		<input type="${"text"}" id="${"LastName"}" placeholder="${"Boston Rockstack"}" class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}" required${add_attribute("value", lastName, 1)}></label>

	<label for="${"phone"}" class="${"block"}"><span class="${"text-gray-700"}">Phone</span>
		<input type="${"text"}" id="${"phone"}" placeholder="${"2507147115"}" class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}" required${add_attribute("value", phone, 1)}></label>

	<label for="${"email"}" class="${"block"}"><span class="${"text-gray-700"}">Email</span>
		<input type="${"email"}" id="${"email"}" placeholder="${"test@gmail.com"}" class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}" required${add_attribute("value", email, 1)}></label>

	<label for="${"password"}" class="${"block"}"><span class="${"text-gray-700"}">Password</span>
		<input type="${"password"}" id="${"password"}" class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}" required${add_attribute("value", password, 1)}></label>

	<label htmlfor="${"role"}" class="${"block"}"><span>Role</span>
		<select id="${"role"}" class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}" required${add_attribute("value", role, 1)}><option value="${"USER"}">USER</option><option value="${"RANGER"}">RANGER</option><option value="${"DOCTOR"}">DOCTOR</option><option value="${"ADMIN"}">ADMIN</option></select></label>

	<input type="${"submit"}" value="${"Register here"}" class="${"bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-3 "}">

	<div class="${"text-center"}"><span>Have an account</span>
		<a href="${"/auth/login"}" class="${" text-blue-500"}">Login here? </a></div></form>`;
});
var register = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Register
});
const Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email2;
  let password2;
  return `${$$result.head += `${$$result.title = `<title>Login</title>`, ""}`, ""}

<form class="${"grid grid-cols-1 gap-6"}"><label for="${"email"}" class="${"block"}"><span class="${"text-gray-700"}">Email</span>
		<input type="${"email"}" id="${"email"}" required class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}"${add_attribute("value", email2, 1)}></label>

	<label for="${"password"}" class="${"block"}"><span class="${"text-gray-700"}">Password</span>
		<input type="${"password"}" id="${"password"}" class="${"block bg-transparent focus:outline-none border-transparent focus:ring focus:border-green-500 w-full px-0.5 border-0 border-b-2  border-gray-300"}" required${add_attribute("value", password2, 1)}></label>

	<div class="${"flex justify-between mt-4 mb-2"}"><div><label for="${"remember"}" class="${"inline-flex items-center"}"><input type="${"checkbox"}" class="${"border-gray-300 border-2 rounded text-green-600 focus:border-gray-300 focus:ring-green-500 "}" name="${"remberme"}" id="${"remember"}"></label>
			Remember me?
		</div>

		<a href="${"/auth/forgotpassword"}" class="${" text-blue-500"}">Forgot password? </a></div>

	<input type="${"submit"}" value="${"Login here"}" class="${"bg-primaryGreen font-sourceSans rounded-md cursor-pointer text-white px-40 py-3 "}">

	<div class="${"text-center"}"><span>Don&#39;t have an account</span>
		<a href="${"/auth/register"}" class="${" text-blue-500"}">Register here? </a></div></form>`;
});
var login = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Login
});
var Sidebar_svelte_svelte_type_style_lang = ".bg-logout.svelte-vwjy3n{background-color:#f0a500;color:#fff}";
const css$c = {
  code: ".bg-logout.svelte-vwjy3n{background-color:#f0a500;color:#fff}",
  map: `{"version":3,"file":"Sidebar.svelte","sources":["Sidebar.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { goto, prefetch } from '$app/navigation';\\r\\n;\\r\\nexport let list;\\r\\n</script>\\n\\n<div class=\\"flex flex-col w-56 bg-white  overflow-hidden h-screen justify-between\\">\\n\\t<div class=\\"\\">\\n\\t\\t<div class=\\"flex items-center justify-center h-20 shadow-md\\">\\n\\t\\t\\t<a href=\\"/\\">\\n\\t\\t\\t\\t<h1 class=\\"text-3xl uppercase text-red-500 font-sourceSans\\">NPMG</h1>\\n\\t\\t\\t</a>\\n\\t\\t</div>\\n\\t\\t<ul class=\\"flex flex-col py-4\\">\\n\\t\\t\\t{#each list as item}\\n\\t\\t\\t\\t<li>\\n\\t\\t\\t\\t\\t<a\\n\\t\\t\\t\\t\\t\\thref={item.url}\\n\\t\\t\\t\\t\\t\\tclass=\\"flex flex-row items-center h-12 transform  text-gray-800 hover:text-motherGreen\\"\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<span class=\\"inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800\\"\\n\\t\\t\\t\\t\\t\\t\\t><i class=\\"bx bx-home\\" /></span\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t<span class=\\"text-sm font-medium font-sourceSans\\">{item.name}</span>\\n\\t\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t{/each}\\n\\t\\t</ul>\\n\\t</div>\\n\\t<div class=\\"\\">\\n\\t\\t<h1\\n\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\tgoto('/');\\n\\t\\t\\t}}\\n\\t\\t\\tclass=\\"text-red-500 font-semibold bg-logout px-4 py-2 text-center bottom-0 cursor-pointer font-sourceSans\\"\\n\\t\\t>\\n\\t\\t\\t<a href=\\"/auth/login\\">Logout</a>\\n\\t\\t</h1>\\n\\t</div>\\n</div>\\n\\n<style>.bg-logout{background-color:#f0a500;color:#fff}</style>\\n"],"names":[],"mappings":"AAwCO,wBAAU,CAAC,iBAAiB,OAAO,CAAC,MAAM,IAAI,CAAC"}`
};
const Sidebar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let {list} = $$props;
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  $$result.css.add(css$c);
  return `<div class="${"flex flex-col w-56 bg-white  overflow-hidden h-screen justify-between"}"><div class="${""}"><div class="${"flex items-center justify-center h-20 shadow-md"}"><a href="${"/"}"><h1 class="${"text-3xl uppercase text-red-500 font-sourceSans"}">NPMG</h1></a></div>
		<ul class="${"flex flex-col py-4"}">${each(list, (item) => `<li><a${add_attribute("href", item.url, 0)} class="${"flex flex-row items-center h-12 transform  text-gray-800 hover:text-motherGreen"}"><span class="${"inline-flex items-center justify-center h-12 w-12 text-lg text-gray-800"}"><i class="${"bx bx-home"}"></i></span>
						<span class="${"text-sm font-medium font-sourceSans"}">${escape(item.name)}</span></a>
				</li>`)}</ul></div>
	<div class="${""}"><h1 class="${"text-red-500 font-semibold bg-logout px-4 py-2 text-center bottom-0 cursor-pointer font-sourceSans svelte-vwjy3n"}"><a href="${"/auth/login"}">Logout</a></h1></div>
</div>`;
});
const TopNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"flex justify-between bg-white w-full h-16 py-4 px-8 shadow-sm"}"><div class="${"relative text-gray-600"}"><input type="${"search"}" name="${"search"}" placeholder="${"Search"}" class="${"bg-white h-7  w-64 px-3 border py-2 rounded text-xs focus:outline-none"}">
		<button type="${"submit"}" class="${"absolute right-0 top-4 mt-2 mr-2"}"><svg class="${"h-3 w-3 text-black-100 fill-current"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" version="${"1.1"}" id="${"Capa_1"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 56.966 56.966"}" style="${"enable-background:new 0 0 56.966 56.966;"}" xml:space="${"preserve"}" width="${"512px"}" height="${"512px"}"><path d="${"M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"}"></path></svg></button></div>
	<div class="${"flex"}"><p class="${"text-sm font-semibold cursor-pointer mx-4 mb-0 mt-1"}">Help Guide</p>
		<img alt="${""}"${add_attribute("src", "https://6.viki.io/image/d7dcd68efa8d4abc93a7355b3f5089e9.jpeg?s=900x600&e=t", 0)} class="${"h-6 w-6 rounded-full cursor-pointer "}"></div></div>`;
});
class List {
  constructor(url, name) {
    this.url = url;
    this.name = name;
  }
}
var $layout_svelte_svelte_type_style_lang = "main.svelte-13qbx1d{box-sizing:border-box;margin:5px;padding:10px}";
const css$b = {
  code: "main.svelte-13qbx1d{box-sizing:border-box;margin:5px;padding:10px}",
  map: `{"version":3,"file":"$layout.svelte","sources":["$layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Sidebar from '$lib/Sidebar.svelte';\\r\\nimport TopNav from '$lib/TopNav.svelte';\\r\\nimport List from '$lib/types/sidebar_items';\\r\\nlet list = [\\r\\n    new List('/user', 'Dashboard'),\\r\\n    new List('/user/tasks', 'Tasks'),\\r\\n    new List('/user/gorillas', 'Gorillas'),\\r\\n    new List('/user/rangers', 'Rangers'),\\r\\n    new List('/user/doctors', 'Doctors'),\\r\\n    new List('/user/kwitizina', 'Kwitizina'),\\r\\n    new List('/user/reports', 'Reports'),\\r\\n    new List('/user/settings', 'Settings')\\r\\n];\\r\\n</script>\\n\\n<div class=\\"min-h-screen flex flex-row bg-gray-100\\">\\n\\t<Sidebar bind:list />\\n\\t<!-- 0788574971 vet national park -->\\n\\t<div class=\\"flex flex-col w-screen h-screen overflow-y-auto\\">\\n\\t\\t<TopNav />\\n\\t\\t<main class=\\"float-left\\">\\n\\t\\t\\t<slot />\\n\\t\\t</main>\\n\\t</div>\\n</div>\\n\\n<style>main{box-sizing:border-box;margin:5px;padding:10px}</style>\\n"],"names":[],"mappings":"AA0BO,mBAAI,CAAC,WAAW,UAAU,CAAC,OAAO,GAAG,CAAC,QAAQ,IAAI,CAAC"}`
};
const $layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let list = [
    new List("/user", "Dashboard"),
    new List("/user/tasks", "Tasks"),
    new List("/user/gorillas", "Gorillas"),
    new List("/user/rangers", "Rangers"),
    new List("/user/doctors", "Doctors"),
    new List("/user/kwitizina", "Kwitizina"),
    new List("/user/reports", "Reports"),
    new List("/user/settings", "Settings")
  ];
  $$result.css.add(css$b);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `<div class="${"min-h-screen flex flex-row bg-gray-100"}">${validate_component(Sidebar, "Sidebar").$$render($$result, {list}, {
      list: ($$value) => {
        list = $$value;
        $$settled = false;
      }
    }, {})}
	
	<div class="${"flex flex-col w-screen h-screen overflow-y-auto"}">${validate_component(TopNav, "TopNav").$$render($$result, {}, {}, {})}
		<main class="${"float-left svelte-13qbx1d"}">${slots.default ? slots.default({}) : ``}</main></div>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
var $layout$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: $layout
});
var index_svelte_svelte_type_style_lang = ".attended.svelte-1h36ws9.svelte-1h36ws9{background-color:#b7ffc2}.missed.svelte-1h36ws9.svelte-1h36ws9{background-color:#fc7474}.made.svelte-1h36ws9.svelte-1h36ws9{background-color:#86c5ff}.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full.svelte-1h36ws9.svelte-1h36ws9{color:#f0a500}@media only screen and (max-height:340px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar{width:4px}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-1h36ws9.svelte-1h36ws9::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}";
const css$a = {
  code: ".attended.svelte-1h36ws9.svelte-1h36ws9{background-color:#b7ffc2}.missed.svelte-1h36ws9.svelte-1h36ws9{background-color:#fc7474}.made.svelte-1h36ws9.svelte-1h36ws9{background-color:#86c5ff}.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full.svelte-1h36ws9.svelte-1h36ws9{color:#f0a500}@media only screen and (max-height:340px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer.svelte-1h36ws9.svelte-1h36ws9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar{width:4px}div.svelte-1h36ws9 .svelte-1h36ws9::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-1h36ws9.svelte-1h36ws9::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script type=\\"ts\\">let integers = [1, 2, 3, 4, 5, 6];\\r\\nlet newReportUrl = 'data:image/jpeg;base64,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';\\r\\n</script>\\n\\n<svelte:head>\\n\\t<title>WELCOME</title>\\n</svelte:head>\\n\\n<div>\\n\\t<div\\n\\t\\tclass=\\"rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-11/12 longer py-6 sm:w-full md:w-full lg:w-11/12\\"\\n\\t>\\n\\t\\t<div class=\\"px:2 m-2 md: bg-primaryGreen rounded-xl p-3 px-5 md:py-6\\">\\n\\t\\t\\t<h1 class=\\"text-white text-2xl font-semibold mb-2 ml-2 md:ml-5\\">Welcome Makuza Verite</h1>\\n\\t\\t\\t<h3 class=\\"text-white text-xl ml-2 md:ml-5\\">Have a nice day !</h3>\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class=\\"w-full md:flex  px-4 sm:w-full md:w-full lg:w-11/12\\">\\n\\t\\t<div class=\\"md:w-8/12 px-5 mt-10\\">\\n\\t\\t\\t<div class=\\"flex w-full justify-between mb-4\\">\\n\\t\\t\\t\\t<h2 class=\\"font-semibold text-xl mx-6\\">Daily Report</h2>\\n\\t\\t\\t\\t<a href=\\"/admin/reports\\"><h3 class=\\"font-semibold full md:mr-10\\">View full</h3></a>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"w-full flex flex-wrap justify-between\\">\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 nw-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl attended\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2\\">Gorillas Found</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">136</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl made\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2\\">Gorillas pregnant</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">17</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div\\n\\t\\t\\t\\t\\tclass=\\"mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<div class=\\"h-32 w-24 rounded-xl attended missed\\" />\\n\\t\\t\\t\\t\\t<p class=\\"text-xs text-gray-600 mt-2 \\">Gorillas Lost</p>\\n\\t\\t\\t\\t\\t<h4 class=\\"text-2xl font-semibold mt-2\\">9</h4>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t\\t<div class=\\"sm:w-full md:w-4/12 lg:w-5/12 px-5 md:px-1 mt-6 md:mt-0\\">\\n\\t\\t\\t<div class=\\"bg-white flex flex-col pt-3 px-3 rounded-lg w-11/12\\">\\n\\t\\t\\t\\t<div class=\\"flex justify-between mb-1\\">\\n\\t\\t\\t\\t\\t<h3 class=\\"font-semibold text-xl mx-4\\">Gorillas List</h3>\\n\\t\\t\\t\\t\\t<a href=\\"/admin/gorillas\\"><h3 class=\\"font-semibold text-sm full mx-4\\">View all</h3></a>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"\\">\\n\\t\\t\\t\\t\\t{#each integers as int}\\n\\t\\t\\t\\t\\t\\t<div class=\\"mb-0 px-3 pb-1 md:px-6 flex cursor-pointer rounded items-center mx-auto\\">\\n\\t\\t\\t\\t\\t\\t\\t<img\\n\\t\\t\\t\\t\\t\\t\\t\\talt=\\"Success Kid\\"\\n\\t\\t\\t\\t\\t\\t\\t\\tsrc={newReportUrl}\\n\\t\\t\\t\\t\\t\\t\\t\\tclass=\\"h-10 w-10 rounded-full cursor-pointer\\"\\n\\t\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex flex-col pl-2\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"font-semibold text-sm\\">Amahoro</span>\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"text-gray-500 text-sm\\">22 December 2020</span>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>.attended{background-color:#b7ffc2}.missed{background-color:#fc7474}.made{background-color:#86c5ff}.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.full{color:#f0a500}@media only screen and (max-height:340px){.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div ::-webkit-scrollbar{width:4px}div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}</style>\\n"],"names":[],"mappings":"AAyEO,uCAAS,CAAC,iBAAiB,OAAO,CAAC,qCAAO,CAAC,iBAAiB,OAAO,CAAC,mCAAK,CAAC,iBAAiB,OAAO,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,mCAAK,CAAC,MAAM,OAAO,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,IAAI,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,qCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,IAAI,CAAC,CAAC,kBAAG,gBAAC,mBAAmB,CAAC,MAAM,GAAG,CAAC,kBAAG,gBAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,iCAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC"}`
};
let newReportUrl = "data:image/jpeg;base64,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";
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let integers = [1, 2, 3, 4, 5, 6];
  $$result.css.add(css$a);
  return `${$$result.head += `${$$result.title = `<title>WELCOME</title>`, ""}`, ""}

<div class="${"svelte-1h36ws9"}"><div class="${"rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 flex flex-col md:w-11/12 longer py-6 sm:w-full md:w-full lg:w-11/12 svelte-1h36ws9"}"><div class="${"px:2 m-2 md: bg-primaryGreen rounded-xl p-3 px-5 md:py-6 svelte-1h36ws9"}"><h1 class="${"text-white text-2xl font-semibold mb-2 ml-2 md:ml-5 svelte-1h36ws9"}">Welcome Makuza Verite</h1>
			<h3 class="${"text-white text-xl ml-2 md:ml-5 svelte-1h36ws9"}">Have a nice day !</h3></div></div>
	<div class="${"w-full md:flex  px-4 sm:w-full md:w-full lg:w-11/12 svelte-1h36ws9"}"><div class="${"md:w-8/12 px-5 mt-10 svelte-1h36ws9"}"><div class="${"flex w-full justify-between mb-4 svelte-1h36ws9"}"><h2 class="${"font-semibold text-xl mx-6 svelte-1h36ws9"}">Daily Report</h2>
				<a href="${"/admin/reports"}" class="${"svelte-1h36ws9"}"><h3 class="${"font-semibold full md:mr-10 svelte-1h36ws9"}">View full</h3></a></div>
			<div class="${"w-full flex flex-wrap justify-between svelte-1h36ws9"}"><div class="${"mt-4 md:mt-0 nw-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl attended svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2 svelte-1h36ws9"}">Gorillas Found</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">136</h4></div>
				<div class="${"mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl made svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2 svelte-1h36ws9"}">Gorillas pregnant</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">17</h4></div>
				<div class="${"mt-4 md:mt-0 w-3/10 flex flex-col items-center bg-white py-2 md:pb-6 md:pt-3 px-4 rounded-xl mx-2 cursor-pointer svelte-1h36ws9"}"><div class="${"h-32 w-24 rounded-xl attended missed svelte-1h36ws9"}"></div>
					<p class="${"text-xs text-gray-600 mt-2  svelte-1h36ws9"}">Gorillas Lost</p>
					<h4 class="${"text-2xl font-semibold mt-2 svelte-1h36ws9"}">9</h4></div></div></div>
		<div class="${"sm:w-full md:w-4/12 lg:w-5/12 px-5 md:px-1 mt-6 md:mt-0 svelte-1h36ws9"}"><div class="${"bg-white flex flex-col pt-3 px-3 rounded-lg w-11/12 svelte-1h36ws9"}"><div class="${"flex justify-between mb-1 svelte-1h36ws9"}"><h3 class="${"font-semibold text-xl mx-4 svelte-1h36ws9"}">Gorillas List</h3>
					<a href="${"/admin/gorillas"}" class="${"svelte-1h36ws9"}"><h3 class="${"font-semibold text-sm full mx-4 svelte-1h36ws9"}">View all</h3></a></div>
				<div class="${" svelte-1h36ws9"}">${each(integers, (int) => `<div class="${"mb-0 px-3 pb-1 md:px-6 flex cursor-pointer rounded items-center mx-auto svelte-1h36ws9"}"><img alt="${"Success Kid"}"${add_attribute("src", newReportUrl, 0)} class="${"h-10 w-10 rounded-full cursor-pointer svelte-1h36ws9"}">
							<div class="${"flex flex-col pl-2 svelte-1h36ws9"}"><span class="${"font-semibold text-sm svelte-1h36ws9"}">Amahoro</span>
								<span class="${"text-gray-500 text-sm svelte-1h36ws9"}">22 December 2020</span></div>
						</div>`)}</div></div></div></div>
</div>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: User
});
let id = 1;
function getId() {
  return `svelte-tabs-${id++}`;
}
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return {set, update: update2, subscribe: subscribe2};
}
const TABS = {};
function removeAndUpdateSelected(arr, item, selectedStore) {
  const index2 = arr.indexOf(item);
  arr.splice(index2, 1);
  selectedStore.update((selected) => selected === item ? arr[index2] || arr[arr.length - 1] : selected);
}
const Tabs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_selectedTab;
  let {initialSelectedIndex = 0} = $$props;
  const tabs = [];
  const panels = [];
  const controls = writable({});
  const labeledBy = writable({});
  const selectedTab = writable(null);
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => value);
  const selectedPanel = writable(null);
  function registerItem(arr, item, selectedStore) {
    arr.push(item);
    selectedStore.update((selected) => selected || item);
    onDestroy(() => removeAndUpdateSelected(arr, item, selectedStore));
  }
  function selectTab(tab) {
    const index2 = tabs.indexOf(tab);
    selectedTab.set(tab);
    selectedPanel.set(panels[index2]);
  }
  setContext(TABS, {
    registerTab(tab) {
      registerItem(tabs, tab, selectedTab);
    },
    registerTabElement(tabElement) {
    },
    registerPanel(panel) {
      registerItem(panels, panel, selectedPanel);
    },
    selectTab,
    selectedTab,
    selectedPanel,
    controls,
    labeledBy
  });
  onMount(() => {
    selectTab(tabs[initialSelectedIndex]);
  });
  afterUpdate(() => {
    for (let i = 0; i < tabs.length; i++) {
      controls.update((controlsData) => ({
        ...controlsData,
        [tabs[i].id]: panels[i].id
      }));
      labeledBy.update((labeledByData) => ({
        ...labeledByData,
        [panels[i].id]: tabs[i].id
      }));
    }
  });
  if ($$props.initialSelectedIndex === void 0 && $$bindings.initialSelectedIndex && initialSelectedIndex !== void 0)
    $$bindings.initialSelectedIndex(initialSelectedIndex);
  $$unsubscribe_selectedTab();
  return `<div class="${"svelte-tabs"}">${slots.default ? slots.default({}) : ``}</div>`;
});
var Tab_svelte_svelte_type_style_lang = ".svelte-tabs__tab.svelte-dw8jip{border:none;border-bottom:2px solid transparent;color:#000;cursor:pointer;display:inline-block;list-style:none;padding:.5em .75em}.svelte-tabs__tab.svelte-dw8jip:focus{outline:thin dotted}.svelte-tabs__selected.svelte-dw8jip{border-bottom:2px solid #4f81e5;color:#4f81e5}";
const css$9 = {
  code: ".svelte-tabs__tab.svelte-dw8jip{border:none;border-bottom:2px solid transparent;color:#000;cursor:pointer;display:inline-block;list-style:none;padding:.5em .75em}.svelte-tabs__tab.svelte-dw8jip:focus{outline:thin dotted}.svelte-tabs__selected.svelte-dw8jip{border-bottom:2px solid #4f81e5;color:#4f81e5}",
  map: `{"version":3,"file":"Tab.svelte","sources":["Tab.svelte"],"sourcesContent":["<script>\\n  import { getContext, onMount, tick } from 'svelte';\\n\\n  import getId from './id';\\n  import { TABS } from './Tabs.svelte';\\n\\n  let tabEl;\\n\\n  const tab = {\\n    id: getId()\\n  };\\n  const { registerTab, registerTabElement, selectTab, selectedTab, controls } = getContext(TABS);\\n\\n  let isSelected;\\n  $: isSelected = $selectedTab === tab;\\n\\n  registerTab(tab);\\n\\n  onMount(async () => {\\n    await tick();\\n    registerTabElement(tabEl);\\n  });\\n</script>\\n\\n<style>.svelte-tabs__tab{border:none;border-bottom:2px solid transparent;color:#000;cursor:pointer;display:inline-block;list-style:none;padding:.5em .75em}.svelte-tabs__tab:focus{outline:thin dotted}.svelte-tabs__selected{border-bottom:2px solid #4f81e5;color:#4f81e5}</style>\\n\\n<li\\n  bind:this={tabEl}\\n  role=\\"tab\\"\\n  id={tab.id}\\n  aria-controls={$controls[tab.id]}\\n  aria-selected={isSelected}\\n  tabindex=\\"{isSelected ? 0 : -1}\\"\\n  class:svelte-tabs__selected={isSelected}\\n  class=\\"svelte-tabs__tab\\"\\n  on:click={() => selectTab(tab)}>\\n\\t<slot></slot>\\n</li>\\n"],"names":[],"mappings":"AAwBO,+BAAiB,CAAC,OAAO,IAAI,CAAC,cAAc,GAAG,CAAC,KAAK,CAAC,WAAW,CAAC,MAAM,IAAI,CAAC,OAAO,OAAO,CAAC,QAAQ,YAAY,CAAC,WAAW,IAAI,CAAC,QAAQ,IAAI,CAAC,KAAK,CAAC,+BAAiB,MAAM,CAAC,QAAQ,IAAI,CAAC,MAAM,CAAC,oCAAsB,CAAC,cAAc,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,MAAM,OAAO,CAAC"}`
};
const Tab = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $selectedTab, $$unsubscribe_selectedTab;
  let $controls, $$unsubscribe_controls;
  let tabEl;
  const tab = {id: getId()};
  const {registerTab, registerTabElement, selectTab, selectedTab, controls} = getContext(TABS);
  $$unsubscribe_selectedTab = subscribe(selectedTab, (value) => $selectedTab = value);
  $$unsubscribe_controls = subscribe(controls, (value) => $controls = value);
  let isSelected;
  registerTab(tab);
  onMount(async () => {
    await tick();
    registerTabElement(tabEl);
  });
  $$result.css.add(css$9);
  isSelected = $selectedTab === tab;
  $$unsubscribe_selectedTab();
  $$unsubscribe_controls();
  return `<li role="${"tab"}"${add_attribute("id", tab.id, 0)}${add_attribute("aria-controls", $controls[tab.id], 0)}${add_attribute("aria-selected", isSelected, 0)}${add_attribute("tabindex", isSelected ? 0 : -1, 0)} class="${["svelte-tabs__tab svelte-dw8jip", isSelected ? "svelte-tabs__selected" : ""].join(" ").trim()}"${add_attribute("this", tabEl, 1)}>${slots.default ? slots.default({}) : ``}</li>`;
});
var TabList_svelte_svelte_type_style_lang = ".svelte-tabs__tab-list.svelte-10iava4{border-bottom:1px solid #ccc;margin:0;padding:0}";
const css$8 = {
  code: ".svelte-tabs__tab-list.svelte-10iava4{border-bottom:1px solid #ccc;margin:0;padding:0}",
  map: '{"version":3,"file":"TabList.svelte","sources":["TabList.svelte"],"sourcesContent":["<style>.svelte-tabs__tab-list{border-bottom:1px solid #ccc;margin:0;padding:0}</style>\\n\\n<ul role=\\"tablist\\" class=\\"svelte-tabs__tab-list\\">\\n  <slot></slot>\\n</ul>\\n"],"names":[],"mappings":"AAAO,qCAAsB,CAAC,cAAc,GAAG,CAAC,KAAK,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,QAAQ,CAAC,CAAC"}'
};
const TabList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<ul role="${"tablist"}" class="${"svelte-tabs__tab-list svelte-10iava4"}">${slots.default ? slots.default({}) : ``}</ul>`;
});
var TabPanel_svelte_svelte_type_style_lang = ".svelte-tabs__tab-panel.svelte-vl3qcy{margin-top:.5em}";
const css$7 = {
  code: ".svelte-tabs__tab-panel.svelte-vl3qcy{margin-top:.5em}",
  map: `{"version":3,"file":"TabPanel.svelte","sources":["TabPanel.svelte"],"sourcesContent":["<script>\\n  import { getContext } from 'svelte';\\n\\n  import getId from './id';\\n  import { TABS } from './Tabs.svelte';\\n\\n  const panel = {\\n    id: getId()\\n  };\\n  const { registerPanel, selectedPanel, labeledBy } = getContext(TABS);\\n\\n  registerPanel(panel);\\n</script>\\n\\n<style>.svelte-tabs__tab-panel{margin-top:.5em}</style>\\n\\n<div \\n  id={panel.id}\\n  aria-labelledby={$labeledBy[panel.id]}\\n  class=\\"svelte-tabs__tab-panel\\"\\n  role=\\"tabpanel\\">\\n  {#if $selectedPanel === panel}\\n    <slot></slot>\\n  {/if}\\n</div>\\n"],"names":[],"mappings":"AAcO,qCAAuB,CAAC,WAAW,IAAI,CAAC"}`
};
const TabPanel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $labeledBy, $$unsubscribe_labeledBy;
  let $selectedPanel, $$unsubscribe_selectedPanel;
  const panel = {id: getId()};
  const {registerPanel, selectedPanel, labeledBy} = getContext(TABS);
  $$unsubscribe_selectedPanel = subscribe(selectedPanel, (value) => $selectedPanel = value);
  $$unsubscribe_labeledBy = subscribe(labeledBy, (value) => $labeledBy = value);
  registerPanel(panel);
  $$result.css.add(css$7);
  $$unsubscribe_labeledBy();
  $$unsubscribe_selectedPanel();
  return `<div${add_attribute("id", panel.id, 0)}${add_attribute("aria-labelledby", $labeledBy[panel.id], 0)} class="${"svelte-tabs__tab-panel svelte-vl3qcy"}" role="${"tabpanel"}">${$selectedPanel === panel ? `${slots.default ? slots.default({}) : ``}` : ``}</div>`;
});
var Ceremonies_svelte_svelte_type_style_lang = ".unlimited.svelte-1ijg4ko{height:75vh;overflow-y:auto}div.svelte-1ijg4ko::-webkit-scrollbar{display:none;width:4px}div.svelte-1ijg4ko::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(250,5,5,.3)}div.svelte-1ijg4ko::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}@media only screen and (max-height:550px){.unlimited.svelte-1ijg4ko{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-1ijg4ko{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}";
const css$6 = {
  code: ".unlimited.svelte-1ijg4ko{height:75vh;overflow-y:auto}div.svelte-1ijg4ko::-webkit-scrollbar{display:none;width:4px}div.svelte-1ijg4ko::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(250,5,5,.3)}div.svelte-1ijg4ko::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}@media only screen and (max-height:550px){.unlimited.svelte-1ijg4ko{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-1ijg4ko{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}",
  map: '{"version":3,"file":"Ceremonies.svelte","sources":["Ceremonies.svelte"],"sourcesContent":["<script type=\\"ts\\"></script>\\n\\n<div class=\\"flex flex-col w-full unlimited\\">\\n\\t<div class=\\"w-full\\">\\n\\t\\t<div class=\\"bg-green-600 rounded p-2 cursor-pointer\\">\\n\\t\\t\\t<h3 class=\\"text-white\\">New Ceremony</h3>\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class=\\"w-full\\">\\n\\t\\t<table class=\\"w-full justify-between mt-0\\">\\n\\t\\t\\t<thead class=\\"w-full\\">\\n\\t\\t\\t\\t<tr class=\\"justify-between\\">\\n\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Year</th>\\n\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Special Guests</th>\\n\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Gorillas named</th>\\n\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Namers</th>\\n\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Full Date</th>\\n\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Location</th>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</thead>\\n\\t\\t\\t<tbody class=\\"w-full\\">\\n\\t\\t\\t\\t<tr class=\\"mt-3 justify-between bg-white border-b-2 cursor-pointer \\">\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 py-8 w-1/6\\">2020</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6\\">18</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6 text-sm\\">27</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center w-1/6 text-sm\\">27</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6\\">22<sup>nd</sup> September</td>\\n\\t\\t\\t\\t\\t<td class=\\" text-center p-4 w-1/6\\">Kinigi</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr class=\\"mt-3 justify-between bg-white border-b-2 cursor-pointer \\">\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 py-8 w-1/6\\">2019</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6\\">18</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6 text-sm\\">27</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center w-1/6 text-sm\\">27</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6\\">22<sup>nd</sup> September</td>\\n\\t\\t\\t\\t\\t<td class=\\" text-center p-4 w-1/6\\">Kinigi</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr class=\\"mt-3 justify-between bg-white border-b-2 cursor-pointer \\">\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 py-8 w-1/6\\">2018</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6\\">18</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6 text-sm\\">27</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center w-1/6 text-sm\\">27</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6\\">22<sup>nd</sup> September</td>\\n\\t\\t\\t\\t\\t<td class=\\" text-center p-4 w-1/6\\">Kinigi</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t<tr class=\\"mt-3 justify-between bg-white border-b-2 cursor-pointer \\">\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 py-8 w-1/6\\">2017</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6\\">18</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6 text-sm\\">27</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center w-1/6 text-sm\\">27</td>\\n\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/6\\">22<sup>nd</sup> September</td>\\n\\t\\t\\t\\t\\t<td class=\\" text-center p-4 w-1/6\\">Kinigi</td>\\n\\t\\t\\t\\t</tr>\\n\\t\\t\\t</tbody>\\n\\t\\t</table>\\n\\t</div>\\n</div>\\n\\n<style>.unlimited{height:75vh;overflow-y:auto}div::-webkit-scrollbar{display:none;width:4px}div::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(250,5,5,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}@media only screen and (max-height:550px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}</style>\\n"],"names":[],"mappings":"AA0DO,yBAAU,CAAC,OAAO,IAAI,CAAC,WAAW,IAAI,CAAC,kBAAG,mBAAmB,CAAC,QAAQ,IAAI,CAAC,MAAM,GAAG,CAAC,kBAAG,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,kBAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,yBAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,yBAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC"}'
};
const Ceremonies = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$6);
  return `<div class="${"flex flex-col w-full unlimited svelte-1ijg4ko"}"><div class="${"w-full svelte-1ijg4ko"}"><div class="${"bg-green-600 rounded p-2 cursor-pointer svelte-1ijg4ko"}"><h3 class="${"text-white"}">New Ceremony</h3></div></div>
	<div class="${"w-full svelte-1ijg4ko"}"><table class="${"w-full justify-between mt-0"}"><thead class="${"w-full"}"><tr class="${"justify-between"}"><th class="${"p-4 w-1/6"}">Year</th>
					<th class="${"p-4 w-1/6"}">Special Guests</th>
					<th class="${"p-4 w-1/6"}">Gorillas named</th>
					<th class="${"p-4 w-1/6"}">Namers</th>
					<th class="${"p-4 w-1/6"}">Full Date</th>
					<th class="${"p-4 w-1/6"}">Location</th></tr></thead>
			<tbody class="${"w-full"}"><tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer "}"><td class="${"text-center p-4 py-8 w-1/6"}">2020</td>
					<td class="${"text-center p-4 w-1/6"}">18</td>
					<td class="${"text-center p-4 w-1/6 text-sm"}">27</td>
					<td class="${"text-center w-1/6 text-sm"}">27</td>
					<td class="${"text-center p-4 w-1/6"}">22<sup>nd</sup> September</td>
					<td class="${" text-center p-4 w-1/6"}">Kinigi</td></tr>
				<tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer "}"><td class="${"text-center p-4 py-8 w-1/6"}">2019</td>
					<td class="${"text-center p-4 w-1/6"}">18</td>
					<td class="${"text-center p-4 w-1/6 text-sm"}">27</td>
					<td class="${"text-center w-1/6 text-sm"}">27</td>
					<td class="${"text-center p-4 w-1/6"}">22<sup>nd</sup> September</td>
					<td class="${" text-center p-4 w-1/6"}">Kinigi</td></tr>
				<tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer "}"><td class="${"text-center p-4 py-8 w-1/6"}">2018</td>
					<td class="${"text-center p-4 w-1/6"}">18</td>
					<td class="${"text-center p-4 w-1/6 text-sm"}">27</td>
					<td class="${"text-center w-1/6 text-sm"}">27</td>
					<td class="${"text-center p-4 w-1/6"}">22<sup>nd</sup> September</td>
					<td class="${" text-center p-4 w-1/6"}">Kinigi</td></tr>
				<tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer "}"><td class="${"text-center p-4 py-8 w-1/6"}">2017</td>
					<td class="${"text-center p-4 w-1/6"}">18</td>
					<td class="${"text-center p-4 w-1/6 text-sm"}">27</td>
					<td class="${"text-center w-1/6 text-sm"}">27</td>
					<td class="${"text-center p-4 w-1/6"}">22<sup>nd</sup> September</td>
					<td class="${" text-center p-4 w-1/6"}">Kinigi</td></tr></tbody></table></div>
</div>`;
});
var Naming_svelte_svelte_type_style_lang = ".unlimited.svelte-1jmvu5x.svelte-1jmvu5x{height:75vh;overflow-y:auto}div.svelte-1jmvu5x .svelte-1jmvu5x::-webkit-scrollbar{display:none;width:4px}div.svelte-1jmvu5x .svelte-1jmvu5x::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(197,119,119,.3)}div.svelte-1jmvu5x.svelte-1jmvu5x::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}@media only screen and (max-height:550px){.unlimited.svelte-1jmvu5x.svelte-1jmvu5x{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-1jmvu5x.svelte-1jmvu5x{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.svelte-tabs li.svelte-tabs__selected{border-bottom:4px solid #00917c;color:#00917c;font-weight:800}.svelte-tabs li.svelte-tabs__selected:active,.svelte-tabs li.svelte-tabs__selected:focus{outline:2px solid transparent;outline-offset:2px}.svelte-tabs__tab-list{align-items:center!important;border-bottom:0 solid #423!important;display:flex;width:100%!important}.svelte-tabs__tab-list li{align-items:center!important;width:50%}";
const css$5 = {
  code: ".unlimited.svelte-1jmvu5x.svelte-1jmvu5x{height:75vh;overflow-y:auto}div.svelte-1jmvu5x .svelte-1jmvu5x::-webkit-scrollbar{display:none;width:4px}div.svelte-1jmvu5x .svelte-1jmvu5x::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(197,119,119,.3)}div.svelte-1jmvu5x.svelte-1jmvu5x::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}@media only screen and (max-height:550px){.unlimited.svelte-1jmvu5x.svelte-1jmvu5x{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-1jmvu5x.svelte-1jmvu5x{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.svelte-tabs li.svelte-tabs__selected{border-bottom:4px solid #00917c;color:#00917c;font-weight:800}.svelte-tabs li.svelte-tabs__selected:active,.svelte-tabs li.svelte-tabs__selected:focus{outline:2px solid transparent;outline-offset:2px}.svelte-tabs__tab-list{align-items:center!important;border-bottom:0 solid #423!important;display:flex;width:100%!important}.svelte-tabs__tab-list li{align-items:center!important;width:50%}",
  map: `{"version":3,"file":"Naming.svelte","sources":["Naming.svelte"],"sourcesContent":["<script>\\n\\timport { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';\\n\\tlet integers = [1, 2, 3, 4, 5, 6, 7];\\n\\timport Ceremonies from './Ceremonies.svelte';\\n</script>\\n\\n<svelte:head>\\n\\t<title>Kwitizina</title>\\n</svelte:head>\\n<Tabs>\\n\\t<TabList>\\n\\t\\t<Tab>Ceremonies</Tab>\\n\\t\\t<Tab>Namers</Tab>\\n\\t</TabList>\\n\\n\\t<TabPanel>\\n\\t\\t<Ceremonies />\\n\\t</TabPanel>\\n\\n\\t<TabPanel>\\n\\t\\t<div class=\\"bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex md:w-full unlimited\\">\\n\\t\\t\\t<table class=\\"w-full\\">\\n\\t\\t\\t\\t<thead class=\\"w-full\\">\\n\\t\\t\\t\\t\\t<tr class=\\"justify-between\\">\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/5\\" />\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/5\\">Namer</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/5\\">Contacts</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/5\\">Gorillas named</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/5\\">More</th>\\n\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t</thead>\\n\\t\\t\\t\\t<tbody class=\\"w-full\\">\\n\\t\\t\\t\\t\\t{#each integers as int}\\n\\t\\t\\t\\t\\t\\t<tr class=\\"mt-3 justify-between bg-white border-b-2 cursor-pointer \\">\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 py-8 w-1/5\\">{int}</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/5\\">Osita Iheme</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/5 text-sm\\">didiermunezero@gmail.com 078324452343</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center w-1/5 text-sm\\">Cyizere</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/5\\">This is special to this one</td>\\n\\t\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</tbody>\\n\\t\\t\\t</table>\\n\\t\\t</div>\\n\\t</TabPanel>\\n</Tabs>\\n\\n<style>.unlimited{height:75vh;overflow-y:auto}div ::-webkit-scrollbar{display:none;width:4px}div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(197,119,119,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}@media only screen and (max-height:550px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}:global(.svelte-tabs li.svelte-tabs__selected){border-bottom:4px solid #00917c;color:#00917c;font-weight:800}:global(.svelte-tabs li.svelte-tabs__selected:active),:global(.svelte-tabs li.svelte-tabs__selected:focus){outline:2px solid transparent;outline-offset:2px}:global(.svelte-tabs__tab-list){align-items:center!important;border-bottom:0 solid #423!important;display:flex;width:100%!important}:global(.svelte-tabs__tab-list li){align-items:center!important;width:50%}</style>\\n"],"names":[],"mappings":"AA+CO,wCAAU,CAAC,OAAO,IAAI,CAAC,WAAW,IAAI,CAAC,kBAAG,gBAAC,mBAAmB,CAAC,QAAQ,IAAI,CAAC,MAAM,GAAG,CAAC,kBAAG,gBAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,GAAG,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC,CAAC,iCAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,wCAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,wCAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,AAAQ,qCAAqC,AAAC,CAAC,cAAc,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC,MAAM,OAAO,CAAC,YAAY,GAAG,CAAC,AAAQ,4CAA4C,AAAC,CAAC,AAAQ,2CAA2C,AAAC,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,WAAW,CAAC,eAAe,GAAG,CAAC,AAAQ,sBAAsB,AAAC,CAAC,YAAY,MAAM,UAAU,CAAC,cAAc,CAAC,CAAC,KAAK,CAAC,IAAI,UAAU,CAAC,QAAQ,IAAI,CAAC,MAAM,IAAI,UAAU,CAAC,AAAQ,yBAAyB,AAAC,CAAC,YAAY,MAAM,UAAU,CAAC,MAAM,GAAG,CAAC"}`
};
const Naming = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let integers = [1, 2, 3, 4, 5, 6, 7];
  $$result.css.add(css$5);
  return `${$$result.head += `${$$result.title = `<title>Kwitizina</title>`, ""}`, ""}
${validate_component(Tabs, "Tabs").$$render($$result, {}, {}, {
    default: () => `${validate_component(TabList, "TabList").$$render($$result, {}, {}, {
      default: () => `${validate_component(Tab, "Tab").$$render($$result, {}, {}, {default: () => `Ceremonies`})}
		${validate_component(Tab, "Tab").$$render($$result, {}, {}, {default: () => `Namers`})}`
    })}

	${validate_component(TabPanel, "TabPanel").$$render($$result, {}, {}, {
      default: () => `${validate_component(Ceremonies, "Ceremonies").$$render($$result, {}, {}, {})}`
    })}

	${validate_component(TabPanel, "TabPanel").$$render($$result, {}, {}, {
      default: () => `<div class="${"bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 md:flex md:w-full unlimited svelte-1jmvu5x"}"><table class="${"w-full svelte-1jmvu5x"}"><thead class="${"w-full svelte-1jmvu5x"}"><tr class="${"justify-between svelte-1jmvu5x"}"><th class="${"p-4 w-1/5 svelte-1jmvu5x"}"></th>
						<th class="${"p-4 w-1/5 svelte-1jmvu5x"}">Namer</th>
						<th class="${"p-4 w-1/5 svelte-1jmvu5x"}">Contacts</th>
						<th class="${"p-4 w-1/5 svelte-1jmvu5x"}">Gorillas named</th>
						<th class="${"p-4 w-1/5 svelte-1jmvu5x"}">More</th></tr></thead>
				<tbody class="${"w-full svelte-1jmvu5x"}">${each(integers, (int) => `<tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer  svelte-1jmvu5x"}"><td class="${"text-center p-4 py-8 w-1/5 svelte-1jmvu5x"}">${escape(int)}</td>
							<td class="${"text-center p-4 w-1/5 svelte-1jmvu5x"}">Osita Iheme</td>
							<td class="${"text-center p-4 w-1/5 text-sm svelte-1jmvu5x"}">didiermunezero@gmail.com 078324452343</td>
							<td class="${"text-center w-1/5 text-sm svelte-1jmvu5x"}">Cyizere</td>
							<td class="${"text-center p-4 w-1/5 svelte-1jmvu5x"}">This is special to this one</td>
						</tr>`)}</tbody></table></div>`
    })}`
  })}`;
});
const Kwitizina = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Naming, "Naming").$$render($$result, {}, {}, {})}</div>`;
});
var kwitizina = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Kwitizina
});
const Search = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"relative text-gray-600"}"><input type="${"search"}" name="${"search"}" placeholder="${"Search"}" class="${"bg-white h-7  w-64 px-3 border py-2 rounded text-xs focus:outline-none"}">
	<button type="${"submit"}" class="${"absolute right-0 top-4 mt-2 mr-2"}"><svg class="${"h-3 w-3 text-black-100 fill-current"}" xmlns="${"http://www.w3.org/2000/svg"}" xmlns:xlink="${"http://www.w3.org/1999/xlink"}" version="${"1.1"}" id="${"Capa_1"}" x="${"0px"}" y="${"0px"}" viewBox="${"0 0 56.966 56.966"}" style="${"enable-background:new 0 0 56.966 56.966;"}" xml:space="${"preserve"}" width="${"512px"}" height="${"512px"}"><path d="${"M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"}"></path></svg></button></div>`;
});
var Gorillas_svelte_svelte_type_style_lang = ".limitedTable.svelte-15snaab.svelte-15snaab{height:60vh}.unlimited.svelte-15snaab.svelte-15snaab{height:90vh;overflow-y:auto}@media only screen and (max-height:550px){.unlimited.svelte-15snaab.svelte-15snaab{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-15snaab.svelte-15snaab{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green.svelte-15snaab.svelte-15snaab{background-color:#00917c;color:#fff}div.svelte-15snaab .svelte-15snaab::-webkit-scrollbar{display:none;width:4px}div.svelte-15snaab .svelte-15snaab::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-15snaab.svelte-15snaab::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}";
const css$4 = {
  code: ".limitedTable.svelte-15snaab.svelte-15snaab{height:60vh}.unlimited.svelte-15snaab.svelte-15snaab{height:90vh;overflow-y:auto}@media only screen and (max-height:550px){.unlimited.svelte-15snaab.svelte-15snaab{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-15snaab.svelte-15snaab{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green.svelte-15snaab.svelte-15snaab{background-color:#00917c;color:#fff}div.svelte-15snaab .svelte-15snaab::-webkit-scrollbar{display:none;width:4px}div.svelte-15snaab .svelte-15snaab::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-15snaab.svelte-15snaab::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}",
  map: `{"version":3,"file":"Gorillas.svelte","sources":["Gorillas.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Search from './Search.svelte';\\r\\nlet photoUrl = 'https://avatars.githubusercontent.com/u/784056?s=64&v=4';\\r\\nlet integers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];\\r\\n</script>\\n\\n<svelte:head>\\n\\t<title>Gorillas</title>\\n</svelte:head>\\n<div>\\n\\t<div class=\\"w-full md:flex\\">\\n\\t\\t<div class=\\"w-full bg-white rounded pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited\\">\\n\\t\\t\\t<div class=\\"w-full md:flex mb-4 items-center justify-between\\">\\n\\t\\t\\t\\t<div class=\\"md:w-4/12\\">\\n\\t\\t\\t\\t\\t<h3 class=\\"font-semibold px-3 py-1 text-xl\\">Gorillas listing</h3>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"flex justify-between md:w-7/12\\">\\n\\t\\t\\t\\t\\t<Search />\\n\\t\\t\\t\\t\\t<span class=\\"px-3 py-1 font-semibold text-successorColor underline\\"\\n\\t\\t\\t\\t\\t\\t><a href=\\"/admin/families\\">View all families</a></span\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<span class=\\"bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm\\"\\n\\t\\t\\t\\t\\t\\t><a href=\\"/admin/new_gorilla\\">Add New</a></span\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<table class=\\"w-full justify-between mt-0\\">\\n\\t\\t\\t\\t<thead class=\\"w-full\\">\\n\\t\\t\\t\\t\\t<tr class=\\"justify-between\\">\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 text-center w-1/7\\" />\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 text-center w-1/7\\">Name</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 text-center w-1/7\\">Dob</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 text-center w-1/7\\">Mother</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 text-center w-1/7\\">Father</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 text-center w-1/7\\">Namer</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 text-center w-1/7\\">Family</th>\\n\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t</thead>\\n\\t\\t\\t\\t<tbody class=\\"limitedTable overflow-y-auto\\">\\n\\t\\t\\t\\t\\t{#each integers as int}\\n\\t\\t\\t\\t\\t\\t<tr class=\\"mt-3 justify-between bg-white border-b-2 cursor-pointer\\">\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 py-8 w-1/7\\">{int}</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/7\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t><div class=\\"flex items-center\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex-shrink-0 w-8 h-8\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<img class=\\"w-full h-full rounded-full\\" src={photoUrl} alt=\\"\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"ml-3\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\"text-gray-900 whitespace-no-wrap\\">Byishimo</p>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div></td\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/7\\"> 12/2018</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/7\\">Amahoro</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/7\\">Kagabo</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/7\\">Kwizigira</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 w-1/7\\">Gahinga</td>\\n\\t\\t\\t\\t\\t\\t\\t<!-- <td class=\\"p-4 w-1/7 flex\\">\\n                <span class=\\"cursor-pointer font-semibold pr-1 mx-1/2\\"\\n                  ><svg\\n                    xmlns=\\"http://www.w3.org/2000/svg\\"\\n                    width=\\"14\\"\\n                    height=\\"14\\"\\n                    viewBox=\\"0 0 24 24\\"\\n                    fill=\\"#00917C\\"\\n                    ><path\\n                      d=\\"M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z\\"\\n                    /></svg\\n                  ></span\\n                >\\n                <span class=\\"cursor-pointer font-semibold pl-1 mx-1/2\\"\\n                  ><svg\\n                    xmlns=\\"http://www.w3.org/2000/svg\\"\\n                    width=\\"14\\"\\n                    height=\\"14\\"\\n                    viewBox=\\"0 0 24 24\\"\\n                    fill=\\"#E74C3C\\"\\n                    ><path\\n                      d=\\"M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 16.538l-4.592-4.548 4.546-4.587-1.416-1.403-4.545 4.589-4.588-4.543-1.405 1.405 4.593 4.552-4.547 4.592 1.405 1.405 4.555-4.596 4.591 4.55 1.403-1.416z\\"\\n                    /></svg\\n                  ></span\\n                >\\n              </td> -->\\n\\t\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</tbody>\\n\\t\\t\\t</table>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>.limitedTable{height:60vh}.unlimited{height:90vh;overflow-y:auto}@media only screen and (max-height:550px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green{background-color:#00917c;color:#fff}div ::-webkit-scrollbar{display:none;width:4px}div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}</style>\\n"],"names":[],"mappings":"AA0FO,2CAAa,CAAC,OAAO,IAAI,CAAC,wCAAU,CAAC,OAAO,IAAI,CAAC,WAAW,IAAI,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,wCAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,wCAAU,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,uCAAS,CAAC,iBAAiB,OAAO,CAAC,MAAM,IAAI,CAAC,kBAAG,gBAAC,mBAAmB,CAAC,QAAQ,IAAI,CAAC,MAAM,GAAG,CAAC,kBAAG,gBAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,iCAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC"}`
};
let photoUrl$3 = "https://avatars.githubusercontent.com/u/784056?s=64&v=4";
const Gorillas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let integers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  $$result.css.add(css$4);
  return `${$$result.head += `${$$result.title = `<title>Gorillas</title>`, ""}`, ""}
<div class="${"svelte-15snaab"}"><div class="${"w-full md:flex svelte-15snaab"}"><div class="${"w-full bg-white rounded pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited svelte-15snaab"}"><div class="${"w-full md:flex mb-4 items-center justify-between svelte-15snaab"}"><div class="${"md:w-4/12 svelte-15snaab"}"><h3 class="${"font-semibold px-3 py-1 text-xl svelte-15snaab"}">Gorillas listing</h3></div>
				<div class="${"flex justify-between md:w-7/12 svelte-15snaab"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}
					<span class="${"px-3 py-1 font-semibold text-successorColor underline svelte-15snaab"}"><a href="${"/admin/families"}" class="${"svelte-15snaab"}">View all families</a></span>
					<span class="${"bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm svelte-15snaab"}"><a href="${"/admin/new_gorilla"}" class="${"svelte-15snaab"}">Add New</a></span></div></div>
			<table class="${"w-full justify-between mt-0 svelte-15snaab"}"><thead class="${"w-full svelte-15snaab"}"><tr class="${"justify-between svelte-15snaab"}"><th class="${"p-4 text-center w-1/7 svelte-15snaab"}"></th>
						<th class="${"p-4 text-center w-1/7 svelte-15snaab"}">Name</th>
						<th class="${"p-4 text-center w-1/7 svelte-15snaab"}">Dob</th>
						<th class="${"p-4 text-center w-1/7 svelte-15snaab"}">Mother</th>
						<th class="${"p-4 text-center w-1/7 svelte-15snaab"}">Father</th>
						<th class="${"p-4 text-center w-1/7 svelte-15snaab"}">Namer</th>
						<th class="${"p-4 text-center w-1/7 svelte-15snaab"}">Family</th></tr></thead>
				<tbody class="${"limitedTable overflow-y-auto svelte-15snaab"}">${each(integers, (int) => `<tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer svelte-15snaab"}"><td class="${"text-center p-4 py-8 w-1/7 svelte-15snaab"}">${escape(int)}</td>
							<td class="${"text-center p-4 w-1/7 svelte-15snaab"}"><div class="${"flex items-center svelte-15snaab"}"><div class="${"flex-shrink-0 w-8 h-8 svelte-15snaab"}"><img class="${"w-full h-full rounded-full svelte-15snaab"}"${add_attribute("src", photoUrl$3, 0)} alt="${""}"></div>
									<div class="${"ml-3 svelte-15snaab"}"><p class="${"text-gray-900 whitespace-no-wrap svelte-15snaab"}">Byishimo</p></div>
								</div></td>
							<td class="${"text-center p-4 w-1/7 svelte-15snaab"}">12/2018</td>
							<td class="${"text-center p-4 w-1/7 svelte-15snaab"}">Amahoro</td>
							<td class="${"text-center p-4 w-1/7 svelte-15snaab"}">Kagabo</td>
							<td class="${"text-center p-4 w-1/7 svelte-15snaab"}">Kwizigira</td>
							<td class="${"text-center p-4 w-1/7 svelte-15snaab"}">Gahinga</td>
							
						</tr>`)}</tbody></table></div></div>
</div>`;
});
const Gorillas_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Gorillas, "Gorillas").$$render($$result, {}, {}, {})}
</div>`;
});
var gorillas = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Gorillas_1
});
const USER = writable({
  fname: "Didier",
  lname: "Munezero",
  year: "2021",
  type: "ADMIN",
  photo: "https://avatars.githubusercontent.com/u/52195?s=460&u=08bcafa24337a298e1b874279fde515e2fb8f81d&v=4"
});
const updateUser = (user) => {
  USER.set(user);
};
var saved = {
  USER,
  updateUser
};
var Settings_svelte_svelte_type_style_lang = ".bg-green.svelte-6r7bu9.svelte-6r7bu9{background-color:#00917c;color:#fff}.text-red-500.svelte-6r7bu9.svelte-6r7bu9{border:1.5px solid #e74c3c;color:#e74c3c}.text-s-xl.svelte-6r7bu9.svelte-6r7bu9{font-size:17px}.border-green.svelte-6r7bu9.svelte-6r7bu9:focus{border-color:#00917c}.text-green-500.svelte-6r7bu9.svelte-6r7bu9{border:1.5px solid #00917c;color:#00917c}.longer.svelte-6r7bu9.svelte-6r7bu9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.img.svelte-6r7bu9.svelte-6r7bu9{height:120px;width:120px}@media only screen and (max-height:340px){.longer.svelte-6r7bu9.svelte-6r7bu9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer.svelte-6r7bu9.svelte-6r7bu9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div.svelte-6r7bu9 .svelte-6r7bu9::-webkit-scrollbar{width:4px}div.svelte-6r7bu9 .svelte-6r7bu9::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-6r7bu9.svelte-6r7bu9::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}";
const css$3 = {
  code: ".bg-green.svelte-6r7bu9.svelte-6r7bu9{background-color:#00917c;color:#fff}.text-red-500.svelte-6r7bu9.svelte-6r7bu9{border:1.5px solid #e74c3c;color:#e74c3c}.text-s-xl.svelte-6r7bu9.svelte-6r7bu9{font-size:17px}.border-green.svelte-6r7bu9.svelte-6r7bu9:focus{border-color:#00917c}.text-green-500.svelte-6r7bu9.svelte-6r7bu9{border:1.5px solid #00917c;color:#00917c}.longer.svelte-6r7bu9.svelte-6r7bu9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.img.svelte-6r7bu9.svelte-6r7bu9{height:120px;width:120px}@media only screen and (max-height:340px){.longer.svelte-6r7bu9.svelte-6r7bu9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer.svelte-6r7bu9.svelte-6r7bu9{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div.svelte-6r7bu9 .svelte-6r7bu9::-webkit-scrollbar{width:4px}div.svelte-6r7bu9 .svelte-6r7bu9::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-6r7bu9.svelte-6r7bu9::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}",
  map: `{"version":3,"file":"Settings.svelte","sources":["Settings.svelte"],"sourcesContent":["<script lang=\\"ts\\">import saved from '../../store/user';\\r\\nlet user = {\\r\\n    fname: 'Munezero',\\r\\n    lname: 'Didier',\\r\\n    email: 'didiermunezero@gmail.com',\\r\\n    phone: '078324452343',\\r\\n    province: 'North',\\r\\n    district: 'Musanze',\\r\\n    photo: '',\\r\\n    bio: 'Conservation is life',\\r\\n    year: '2021',\\r\\n    type: 'ADMIN'\\r\\n};\\r\\nsaved.USER.subscribe((value) => {\\r\\n    Object.assign(user, value);\\r\\n});\\r\\nfunction handleOnSubmit() {\\r\\n    user.type = 'ADMIN';\\r\\n    saved.addUser(user);\\r\\n}\\r\\nlet avatar, fileinput;\\r\\nconst onFileSelected = (e) => {\\r\\n    let image = e.target.files[0];\\r\\n    let reader = new FileReader();\\r\\n    reader.readAsDataURL(image);\\r\\n    reader.onload = (e) => {\\r\\n        avatar = e.target.result;\\r\\n    };\\r\\n};\\r\\n</script>\\n\\n<svelte:head>\\n\\t<title>Settings</title>\\n</svelte:head>\\n<div>\\n\\t<div\\n\\t\\tclass=\\"bg-white w-full rounded px-4 pt-3 pb-1 md:px-8 md:py-3 md:mr-3 md:flex md:w-5/6 longer\\"\\n\\t>\\n\\t\\t<div class=\\"mr-10 mt-2\\">\\n\\t\\t\\t<ul>\\n\\t\\t\\t\\t<li\\n\\t\\t\\t\\t\\tclass=\\"text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 text-motherGreen\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\tProfile\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t<li class=\\"text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1\\">\\n\\t\\t\\t\\t\\tNotifications\\n\\t\\t\\t\\t</li>\\n\\t\\t\\t\\t<li class=\\"text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1\\">Password</li>\\n\\t\\t\\t\\t<li class=\\"text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1\\">Messages</li>\\n\\t\\t\\t</ul>\\n\\t\\t</div>\\n\\t\\t<form\\n\\t\\t\\tclass=\\"rounded shadow w-full md:w-4/5 h-full md:ml-4 mt-2 flex flex-col\\"\\n\\t\\t\\ton:submit|preventDefault={handleOnSubmit}\\n\\t\\t>\\n\\t\\t\\t<h1 class=\\"text-center font-semibold text-xl md:-ml-20\\">Account</h1>\\n\\t\\t\\t<div class=\\"mt-6 mx-auto items-center\\">\\n\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\tstyle=\\"display:none\\"\\n\\t\\t\\t\\t\\ttype=\\"file\\"\\n\\t\\t\\t\\t\\taccept=\\".jpg, .jpeg, .png\\"\\n\\t\\t\\t\\t\\ton:change={(e) => onFileSelected(e)}\\n\\t\\t\\t\\t\\tbind:this={fileinput}\\n\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{#if avatar}\\n\\t\\t\\t\\t\\t<img class=\\"img rounded-full\\" src={avatar} alt=\\"mun\\" />\\n\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t<img src={user.photo} alt=\\"...\\" class=\\"img rounded-full\\" />\\n\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t<div class=\\"flex mt-1\\">\\n\\t\\t\\t\\t\\t<span\\n\\t\\t\\t\\t\\t\\tclass=\\"text-green-500 p-1 px-2 mx-1 focus:outline-none rounded shadow cursor-pointer\\"\\n\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\tfileinput.click();\\n\\t\\t\\t\\t\\t\\t}}>Upload</span\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t<span\\n\\t\\t\\t\\t\\t\\tclass=\\"border border-red-500 text-red-500 p-1 px-2 mx-1 shadow rounded focus:outline-none cursor-pointer\\"\\n\\t\\t\\t\\t\\t\\ton:click={() => (avatar = null)}>Remove</span\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<div class=\\"mb-10\\">\\n\\t\\t\\t\\t<div class=\\"mt-1 mx-auto flex flex-col w-11/12 md:w-9/12\\">\\n\\t\\t\\t\\t\\t<label for=\\"name\\" class=\\"font-semibold ml-1\\">Add Bio</label>\\n\\t\\t\\t\\t\\t<textarea\\n\\t\\t\\t\\t\\t\\tbind:value={user.bio}\\n\\t\\t\\t\\t\\t\\tclass=\\"autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full border-2 rounded focus:outline-none border-green\\"\\n\\t\\t\\t\\t\\t\\tid=\\"message\\"\\n\\t\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\t\\tplaceholder=\\"Message...\\"\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"mt-1 mx-auto md:flex w-11/12 md:w-9/12\\">\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:mx-0 md:w-6/12\\">\\n\\t\\t\\t\\t\\t\\t<label for=\\"name\\" class=\\"font-semibold ml-1\\">First Name</label>\\n\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\tbind:value={user.fname}\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\t\\t\\tname=\\"fname\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:ml-2 md:w-6/12\\">\\n\\t\\t\\t\\t\\t\\t<label for=\\"name\\" class=\\"font-semibold ml-1\\">Last Name</label>\\n\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\tbind:value={user.lname}\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\t\\t\\tname=\\"lname\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"mt-1 mx-auto md:flex w-11/12 md:w-9/12\\">\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:mx-0 md:w-6/12\\">\\n\\t\\t\\t\\t\\t\\t<label for=\\"name\\" class=\\"font-semibold ml-1\\">Email</label>\\n\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\tbind:value={user.email}\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"email\\"\\n\\t\\t\\t\\t\\t\\t\\tname=\\"email\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:ml-2 md:w-6/12\\">\\n\\t\\t\\t\\t\\t\\t<label for=\\"name\\" class=\\"font-semibold ml-1\\">Phone Number</label>\\n\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\tbind:value={user.phone}\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\t\\t\\tname=\\"phone\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"mt-1 mx-auto md:flex w-11/12 md:w-9/12\\">\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:mx-0 md:w-6/12\\">\\n\\t\\t\\t\\t\\t\\t<label for=\\"name\\" class=\\"font-semibold ml-1\\">Province</label>\\n\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\tbind:value={user.province}\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\t\\t\\tname=\\"province\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:ml-2 md:w-6/12\\">\\n\\t\\t\\t\\t\\t\\t<label for=\\"name\\" class=\\"font-semibold ml-1\\">District</label>\\n\\t\\t\\t\\t\\t\\t<input\\n\\t\\t\\t\\t\\t\\t\\tbind:value={user.district}\\n\\t\\t\\t\\t\\t\\t\\ttype=\\"text\\"\\n\\t\\t\\t\\t\\t\\t\\tname=\\"district\\"\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"mt-1 mx-auto flex w-11/12 md:w-9/12 items-center mt-2\\">\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col w-full\\">\\n\\t\\t\\t\\t\\t\\t<button type=\\"submit\\" class=\\"bg-green py-1 font-semibold rounded focus:outline-none\\"\\n\\t\\t\\t\\t\\t\\t\\t>Save Changes</button\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t</form>\\n\\t</div>\\n</div>\\n\\n<style>.bg-green{background-color:#00917c;color:#fff}.text-red-500{border:1.5px solid #e74c3c;color:#e74c3c}.text-s-xl{font-size:17px}.border-green:focus{border-color:#00917c}.text-green-500{border:1.5px solid #00917c;color:#00917c}.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.img{height:120px;width:120px}@media only screen and (max-height:340px){.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}@media only screen and (max-width:700px){.longer{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:100%}}div ::-webkit-scrollbar{width:4px}div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}</style>\\n"],"names":[],"mappings":"AAsKO,qCAAS,CAAC,iBAAiB,OAAO,CAAC,MAAM,IAAI,CAAC,yCAAa,CAAC,OAAO,KAAK,CAAC,KAAK,CAAC,OAAO,CAAC,MAAM,OAAO,CAAC,sCAAU,CAAC,UAAU,IAAI,CAAC,yCAAa,MAAM,CAAC,aAAa,OAAO,CAAC,2CAAe,CAAC,OAAO,KAAK,CAAC,KAAK,CAAC,OAAO,CAAC,MAAM,OAAO,CAAC,mCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,gCAAI,CAAC,OAAO,KAAK,CAAC,MAAM,KAAK,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,mCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,IAAI,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,mCAAO,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,IAAI,CAAC,CAAC,iBAAG,eAAC,mBAAmB,CAAC,MAAM,GAAG,CAAC,iBAAG,eAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,+BAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC"}`
};
const Settings = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let user = {
    fname: "Munezero",
    lname: "Didier",
    email: "didiermunezero@gmail.com",
    phone: "078324452343",
    province: "North",
    district: "Musanze",
    photo: "",
    bio: "Conservation is life",
    year: "2021",
    type: "ADMIN"
  };
  saved.USER.subscribe((value) => {
    Object.assign(user, value);
  });
  $$result.css.add(css$3);
  return `${$$result.head += `${$$result.title = `<title>Settings</title>`, ""}`, ""}
<div class="${"svelte-6r7bu9"}"><div class="${"bg-white w-full rounded px-4 pt-3 pb-1 md:px-8 md:py-3 md:mr-3 md:flex md:w-5/6 longer svelte-6r7bu9"}"><div class="${"mr-10 mt-2 svelte-6r7bu9"}"><ul class="${"svelte-6r7bu9"}"><li class="${"text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 text-motherGreen svelte-6r7bu9"}">Profile
				</li>
				<li class="${"text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 svelte-6r7bu9"}">Notifications
				</li>
				<li class="${"text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 svelte-6r7bu9"}">Password</li>
				<li class="${"text-s-xl font-semibold hover:text-motherGreen cursor-pointer p-1 svelte-6r7bu9"}">Messages</li></ul></div>
		<form class="${"rounded shadow w-full md:w-4/5 h-full md:ml-4 mt-2 flex flex-col svelte-6r7bu9"}"><h1 class="${"text-center font-semibold text-xl md:-ml-20 svelte-6r7bu9"}">Account</h1>
			<div class="${"mt-6 mx-auto items-center svelte-6r7bu9"}"><input style="${"display:none"}" type="${"file"}" accept="${".jpg, .jpeg, .png"}" class="${"svelte-6r7bu9"}">
				${`<img${add_attribute("src", user.photo, 0)} alt="${"..."}" class="${"img rounded-full svelte-6r7bu9"}">`}
				<div class="${"flex mt-1 svelte-6r7bu9"}"><span class="${"text-green-500 p-1 px-2 mx-1 focus:outline-none rounded shadow cursor-pointer svelte-6r7bu9"}">Upload</span>
					<span class="${"border border-red-500 text-red-500 p-1 px-2 mx-1 shadow rounded focus:outline-none cursor-pointer svelte-6r7bu9"}">Remove</span></div></div>
			<div class="${"mb-10 svelte-6r7bu9"}"><div class="${"mt-1 mx-auto flex flex-col w-11/12 md:w-9/12 svelte-6r7bu9"}"><label for="${"name"}" class="${"font-semibold ml-1 svelte-6r7bu9"}">Add Bio</label>
					<textarea class="${"autoexpand tracking-wide py-2 px-4 mb-3 leading-relaxed appearance-none block w-full border-2 rounded focus:outline-none border-green svelte-6r7bu9"}" id="${"message"}" type="${"text"}" placeholder="${"Message..."}">${user.bio || ""}</textarea></div>
				<div class="${"mt-1 mx-auto md:flex w-11/12 md:w-9/12 svelte-6r7bu9"}"><div class="${"flex flex-col md:mx-0 md:w-6/12 svelte-6r7bu9"}"><label for="${"name"}" class="${"font-semibold ml-1 svelte-6r7bu9"}">First Name</label>
						<input type="${"text"}" name="${"fname"}" class="${"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green svelte-6r7bu9"}"${add_attribute("value", user.fname, 1)}></div>
					<div class="${"flex flex-col md:ml-2 md:w-6/12 svelte-6r7bu9"}"><label for="${"name"}" class="${"font-semibold ml-1 svelte-6r7bu9"}">Last Name</label>
						<input type="${"text"}" name="${"lname"}" class="${"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green svelte-6r7bu9"}"${add_attribute("value", user.lname, 1)}></div></div>
				<div class="${"mt-1 mx-auto md:flex w-11/12 md:w-9/12 svelte-6r7bu9"}"><div class="${"flex flex-col md:mx-0 md:w-6/12 svelte-6r7bu9"}"><label for="${"name"}" class="${"font-semibold ml-1 svelte-6r7bu9"}">Email</label>
						<input type="${"email"}" name="${"email"}" class="${"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green svelte-6r7bu9"}"${add_attribute("value", user.email, 1)}></div>
					<div class="${"flex flex-col md:ml-2 md:w-6/12 svelte-6r7bu9"}"><label for="${"name"}" class="${"font-semibold ml-1 svelte-6r7bu9"}">Phone Number</label>
						<input type="${"text"}" name="${"phone"}" class="${"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green svelte-6r7bu9"}"${add_attribute("value", user.phone, 1)}></div></div>
				<div class="${"mt-1 mx-auto md:flex w-11/12 md:w-9/12 svelte-6r7bu9"}"><div class="${"flex flex-col md:mx-0 md:w-6/12 svelte-6r7bu9"}"><label for="${"name"}" class="${"font-semibold ml-1 svelte-6r7bu9"}">Province</label>
						<input type="${"text"}" name="${"province"}" class="${"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green svelte-6r7bu9"}"${add_attribute("value", user.province, 1)}></div>
					<div class="${"flex flex-col md:ml-2 md:w-6/12 svelte-6r7bu9"}"><label for="${"name"}" class="${"font-semibold ml-1 svelte-6r7bu9"}">District</label>
						<input type="${"text"}" name="${"district"}" class="${"w-full px-3 py-1 text-sm  border-2 rounded focus:outline-none border-green svelte-6r7bu9"}"${add_attribute("value", user.district, 1)}></div></div>
				<div class="${"mt-1 mx-auto flex w-11/12 md:w-9/12 items-center mt-2 svelte-6r7bu9"}"><div class="${"flex flex-col w-full svelte-6r7bu9"}"><button type="${"submit"}" class="${"bg-green py-1 font-semibold rounded focus:outline-none svelte-6r7bu9"}">Save Changes</button></div></div></div></form></div>
</div>`;
});
const Settings_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Settings, "Settings").$$render($$result, {}, {}, {})}
</div>`;
});
var settings = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Settings_1
});
var InvitationModal_svelte_svelte_type_style_lang = ".border-green-new.svelte-2ch0jb{border-color:#00917c}.bg-green.svelte-2ch0jb{background-color:#00917c}.bg-logout.svelte-2ch0jb{background-color:#e74343}.text-green.svelte-2ch0jb{color:#00917c}";
var Doctors_svelte_svelte_type_style_lang = ".unlimited.svelte-3r1hdq.svelte-3r1hdq{height:90vh;overflow-y:auto}.limitedTable.svelte-3r1hdq.svelte-3r1hdq{height:60vh}@media only screen and (max-height:550px){.unlimited.svelte-3r1hdq.svelte-3r1hdq{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-3r1hdq.svelte-3r1hdq{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green.svelte-3r1hdq.svelte-3r1hdq{background-color:#00917c;color:#fff}div.svelte-3r1hdq .svelte-3r1hdq::-webkit-scrollbar{display:none;width:4px}div.svelte-3r1hdq .svelte-3r1hdq::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-3r1hdq.svelte-3r1hdq::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}";
const css$2 = {
  code: ".unlimited.svelte-3r1hdq.svelte-3r1hdq{height:90vh;overflow-y:auto}.limitedTable.svelte-3r1hdq.svelte-3r1hdq{height:60vh}@media only screen and (max-height:550px){.unlimited.svelte-3r1hdq.svelte-3r1hdq{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-3r1hdq.svelte-3r1hdq{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green.svelte-3r1hdq.svelte-3r1hdq{background-color:#00917c;color:#fff}div.svelte-3r1hdq .svelte-3r1hdq::-webkit-scrollbar{display:none;width:4px}div.svelte-3r1hdq .svelte-3r1hdq::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-3r1hdq.svelte-3r1hdq::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}",
  map: `{"version":3,"file":"Doctors.svelte","sources":["Doctors.svelte"],"sourcesContent":["<script lang=\\"ts\\">import InvitationModal from './InvitationModal.svelte';\\r\\nimport Search from './Search.svelte';\\r\\nlet photoUrl = 'https://avatars.githubusercontent.com/u/784056?s=64&v=4';\\r\\nlet integers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];\\r\\nlet isOpen = false;\\r\\nfunction OpenModal() {\\r\\n    isOpen = true;\\r\\n}\\r\\n</script>\\n\\n<svelte:head>\\n\\t<title>Doctors</title>\\n</svelte:head>\\n<div>\\n\\t<div class=\\"w-full md:flex\\">\\n\\t\\t<div class=\\"w-full bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited\\">\\n\\t\\t\\t<div class=\\"w-full md:flex mb-4 items-center justify-between\\">\\n\\t\\t\\t\\t<div class=\\"md:w-4/12\\">\\n\\t\\t\\t\\t\\t<h3 class=\\"font-semibold px-3 py-1 text-xl\\">Ranger listing</h3>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"flex justify-between md:w-6/12\\">\\n\\t\\t\\t\\t\\t<Search />\\n\\t\\t\\t\\t\\t<span\\n\\t\\t\\t\\t\\t\\tclass=\\"bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm\\"\\n\\t\\t\\t\\t\\t\\ton:click={OpenModal}>Invite new</span\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<table class=\\"text-left w-full md:px-10\\">\\n\\t\\t\\t\\t<thead class=\\"w-full\\">\\n\\t\\t\\t\\t\\t<tr class=\\"justify-between\\">\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/10\\" />\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Full name</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Date joined</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Residense</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Group</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Others</th>\\n\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t</thead>\\n\\t\\t\\t\\t<tbody class=\\"limitedTable overflow-y-auto\\">\\n\\t\\t\\t\\t\\t{#each integers as int}\\n\\t\\t\\t\\t\\t\\t<tr class=\\"mt-3 justify-between bg-white border-b-2 cursor-pointer\\">\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 py-8 w-1/10\\">{int}</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t><div class=\\"flex items-center\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex-shrink-0 w-8 h-8\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<img class=\\"w-full h-full rounded-full\\" src={photoUrl} alt=\\"\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"ml-3\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\"text-gray-900 whitespace-no-wrap\\">Mukera Aime</p>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div></td\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\">December 2017</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\">Amahoro</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\">Nkindira</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\">Kwizigira</td>\\n\\t\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</tbody>\\n\\t\\t\\t</table>\\n\\t\\t</div>\\n\\t\\t{#if isOpen}\\n\\t\\t\\t<InvitationModal bind:isOpen />\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style>.unlimited{height:90vh;overflow-y:auto}.limitedTable{height:60vh}@media only screen and (max-height:550px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green{background-color:#00917c;color:#fff}div ::-webkit-scrollbar{display:none;width:4px}div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}</style>\\n"],"names":[],"mappings":"AAoEO,sCAAU,CAAC,OAAO,IAAI,CAAC,WAAW,IAAI,CAAC,yCAAa,CAAC,OAAO,IAAI,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,sCAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,sCAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,qCAAS,CAAC,iBAAiB,OAAO,CAAC,MAAM,IAAI,CAAC,iBAAG,eAAC,mBAAmB,CAAC,QAAQ,IAAI,CAAC,MAAM,GAAG,CAAC,iBAAG,eAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,+BAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC"}`
};
let photoUrl$2 = "https://avatars.githubusercontent.com/u/784056?s=64&v=4";
const Doctors = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let integers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  $$result.css.add(css$2);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>Doctors</title>`, ""}`, ""}
<div class="${"svelte-3r1hdq"}"><div class="${"w-full md:flex svelte-3r1hdq"}"><div class="${"w-full bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited svelte-3r1hdq"}"><div class="${"w-full md:flex mb-4 items-center justify-between svelte-3r1hdq"}"><div class="${"md:w-4/12 svelte-3r1hdq"}"><h3 class="${"font-semibold px-3 py-1 text-xl svelte-3r1hdq"}">Ranger listing</h3></div>
				<div class="${"flex justify-between md:w-6/12 svelte-3r1hdq"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}
					<span class="${"bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm svelte-3r1hdq"}">Invite new</span></div></div>
			<table class="${"text-left w-full md:px-10 svelte-3r1hdq"}"><thead class="${"w-full svelte-3r1hdq"}"><tr class="${"justify-between svelte-3r1hdq"}"><th class="${"p-4 w-1/10 svelte-3r1hdq"}"></th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Full name</th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Date joined</th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Residense</th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Group</th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Others</th></tr></thead>
				<tbody class="${"limitedTable overflow-y-auto svelte-3r1hdq"}">${each(integers, (int) => `<tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer svelte-3r1hdq"}"><td class="${"text-center p-4 py-8 w-1/10 svelte-3r1hdq"}">${escape(int)}</td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}"><div class="${"flex items-center svelte-3r1hdq"}"><div class="${"flex-shrink-0 w-8 h-8 svelte-3r1hdq"}"><img class="${"w-full h-full rounded-full svelte-3r1hdq"}"${add_attribute("src", photoUrl$2, 0)} alt="${""}"></div>
									<div class="${"ml-3 svelte-3r1hdq"}"><p class="${"text-gray-900 whitespace-no-wrap svelte-3r1hdq"}">Mukera Aime</p></div>
								</div></td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}">December 2017</td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}">Amahoro</td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}">Nkindira</td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}">Kwizigira</td>
						</tr>`)}</tbody></table></div>
		${``}</div>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Doctors_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Doctors, "Doctors").$$render($$result, {}, {}, {})}</div>`;
});
var doctors = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Doctors_1
});
var Rangers_svelte_svelte_type_style_lang = ".unlimited.svelte-3r1hdq.svelte-3r1hdq{height:90vh;overflow-y:auto}.limitedTable.svelte-3r1hdq.svelte-3r1hdq{height:60vh}@media only screen and (max-height:550px){.unlimited.svelte-3r1hdq.svelte-3r1hdq{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-3r1hdq.svelte-3r1hdq{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green.svelte-3r1hdq.svelte-3r1hdq{background-color:#00917c;color:#fff}div.svelte-3r1hdq .svelte-3r1hdq::-webkit-scrollbar{display:none;width:4px}div.svelte-3r1hdq .svelte-3r1hdq::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-3r1hdq.svelte-3r1hdq::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}";
const css$1 = {
  code: ".unlimited.svelte-3r1hdq.svelte-3r1hdq{height:90vh;overflow-y:auto}.limitedTable.svelte-3r1hdq.svelte-3r1hdq{height:60vh}@media only screen and (max-height:550px){.unlimited.svelte-3r1hdq.svelte-3r1hdq{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited.svelte-3r1hdq.svelte-3r1hdq{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green.svelte-3r1hdq.svelte-3r1hdq{background-color:#00917c;color:#fff}div.svelte-3r1hdq .svelte-3r1hdq::-webkit-scrollbar{display:none;width:4px}div.svelte-3r1hdq .svelte-3r1hdq::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-3r1hdq.svelte-3r1hdq::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}",
  map: `{"version":3,"file":"Rangers.svelte","sources":["Rangers.svelte"],"sourcesContent":["<script lang=\\"ts\\">import Search from './Search.svelte';\\r\\nimport { goto, prefetch } from '$app/navigation';\\r\\nimport InvitationModal from './InvitationModal.svelte';\\r\\nlet photoUrl = 'https://avatars.githubusercontent.com/u/784056?s=64&v=4';\\r\\nlet integers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];\\r\\nlet isOpen = false;\\r\\nfunction OpenModal() {\\r\\n    isOpen = true;\\r\\n}\\r\\n</script>\\n\\n<svelte:head>\\n\\t<title>Rangers</title>\\n</svelte:head>\\n<div>\\n\\t<div class=\\"w-full md:flex\\">\\n\\t\\t<div class=\\"w-full bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited\\">\\n\\t\\t\\t<div class=\\"w-full md:flex mb-4 items-center justify-between\\">\\n\\t\\t\\t\\t<div class=\\"md:w-4/12\\">\\n\\t\\t\\t\\t\\t<h3 class=\\"font-semibold px-3 py-1 text-xl\\">Ranger listing</h3>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"flex justify-between md:w-6/12\\">\\n\\t\\t\\t\\t\\t<Search />\\n\\t\\t\\t\\t\\t<span\\n\\t\\t\\t\\t\\t\\tclass=\\"bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm\\"\\n\\t\\t\\t\\t\\t\\ton:click={OpenModal}>Invite new</span\\n\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\t\\t\\t<table class=\\"text-left w-full md:px-10\\">\\n\\t\\t\\t\\t<thead class=\\"w-full\\">\\n\\t\\t\\t\\t\\t<tr class=\\"justify-between\\">\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/10\\" />\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Full name</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Date joined</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Residense</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Group</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"p-4 w-1/6\\">Others</th>\\n\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t</thead>\\n\\t\\t\\t\\t<tbody class=\\"limitedTable overflow-y-auto\\">\\n\\t\\t\\t\\t\\t{#each integers as int}\\n\\t\\t\\t\\t\\t\\t<tr\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\tgoto(\`/admin/rangers/ranger/\${int}\`);\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"mt-3 justify-between bg-white border-b-2 cursor-pointer\\"\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center p-4 py-8 w-1/10\\">{int}</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\"\\n\\t\\t\\t\\t\\t\\t\\t\\t><div class=\\"flex items-center\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"flex-shrink-0 w-8 h-8\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<img class=\\"w-full h-full rounded-full\\" src={photoUrl} alt=\\"\\" />\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<div class=\\"ml-3\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t<p class=\\"text-gray-900 whitespace-no-wrap\\">Mukera Aime</p>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t\\t\\t</div></td\\n\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\">December 2017</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\">Amahoro</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\">Nkindira</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"p-4 w-1/6\\">Kwizigira</td>\\n\\t\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</tbody>\\n\\t\\t\\t</table>\\n\\t\\t</div>\\n\\t\\t{#if isOpen}\\n\\t\\t\\t<InvitationModal bind:isOpen />\\n\\t\\t{/if}\\n\\t</div>\\n</div>\\n\\n<style>.unlimited{height:90vh;overflow-y:auto}.limitedTable{height:60vh}@media only screen and (max-height:550px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}@media only screen and (max-width:600px){.unlimited{height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}}.bg-green{background-color:#00917c;color:#fff}div ::-webkit-scrollbar{display:none;width:4px}div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}</style>\\n"],"names":[],"mappings":"AA0EO,sCAAU,CAAC,OAAO,IAAI,CAAC,WAAW,IAAI,CAAC,yCAAa,CAAC,OAAO,IAAI,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,sCAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,WAAW,KAAK,CAAC,CAAC,sCAAU,CAAC,OAAO,mBAAmB,CAAC,OAAO,gBAAgB,CAAC,OAAO,WAAW,CAAC,MAAM,mBAAmB,CAAC,MAAM,gBAAgB,CAAC,MAAM,WAAW,CAAC,CAAC,qCAAS,CAAC,iBAAiB,OAAO,CAAC,MAAM,IAAI,CAAC,iBAAG,eAAC,mBAAmB,CAAC,QAAQ,IAAI,CAAC,MAAM,GAAG,CAAC,iBAAG,eAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,+BAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC"}`
};
let photoUrl$1 = "https://avatars.githubusercontent.com/u/784056?s=64&v=4";
const Rangers = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let integers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `${$$result.head += `${$$result.title = `<title>Rangers</title>`, ""}`, ""}
<div class="${"svelte-3r1hdq"}"><div class="${"w-full md:flex svelte-3r1hdq"}"><div class="${"w-full bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3 unlimited svelte-3r1hdq"}"><div class="${"w-full md:flex mb-4 items-center justify-between svelte-3r1hdq"}"><div class="${"md:w-4/12 svelte-3r1hdq"}"><h3 class="${"font-semibold px-3 py-1 text-xl svelte-3r1hdq"}">Ranger listing</h3></div>
				<div class="${"flex justify-between md:w-6/12 svelte-3r1hdq"}">${validate_component(Search, "Search").$$render($$result, {}, {}, {})}
					<span class="${"bg-green px-3 py-1 font-semibold cursor-pointer rounded-sm svelte-3r1hdq"}">Invite new</span></div></div>
			<table class="${"text-left w-full md:px-10 svelte-3r1hdq"}"><thead class="${"w-full svelte-3r1hdq"}"><tr class="${"justify-between svelte-3r1hdq"}"><th class="${"p-4 w-1/10 svelte-3r1hdq"}"></th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Full name</th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Date joined</th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Residense</th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Group</th>
						<th class="${"p-4 w-1/6 svelte-3r1hdq"}">Others</th></tr></thead>
				<tbody class="${"limitedTable overflow-y-auto svelte-3r1hdq"}">${each(integers, (int) => `<tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer svelte-3r1hdq"}"><td class="${"text-center p-4 py-8 w-1/10 svelte-3r1hdq"}">${escape(int)}</td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}"><div class="${"flex items-center svelte-3r1hdq"}"><div class="${"flex-shrink-0 w-8 h-8 svelte-3r1hdq"}"><img class="${"w-full h-full rounded-full svelte-3r1hdq"}"${add_attribute("src", photoUrl$1, 0)} alt="${""}"></div>
									<div class="${"ml-3 svelte-3r1hdq"}"><p class="${"text-gray-900 whitespace-no-wrap svelte-3r1hdq"}">Mukera Aime</p></div>
								</div></td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}">December 2017</td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}">Amahoro</td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}">Nkindira</td>
							<td class="${"p-4 w-1/6 svelte-3r1hdq"}">Kwizigira</td>
						</tr>`)}</tbody></table></div>
		${``}</div>
</div>`;
  } while (!$$settled);
  return $$rendered;
});
const Rangers_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Rangers, "Rangers").$$render($$result, {}, {}, {})}
</div>`;
});
var rangers = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Rangers_1
});
var Reports_svelte_svelte_type_style_lang = "div.svelte-15rxaag .svelte-15rxaag::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-15rxaag.svelte-15rxaag::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}";
const css = {
  code: "div.svelte-15rxaag .svelte-15rxaag::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div.svelte-15rxaag.svelte-15rxaag::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}",
  map: `{"version":3,"file":"Reports.svelte","sources":["Reports.svelte"],"sourcesContent":["<script lang=\\"ts\\">let integers = [1, 2, 3, 4, 5, 6, 7, 8];\\r\\nimport { goto, prefetch } from '$app/navigation';\\r\\nlet photoUrl = 'https://wallup.net/wp-content/uploads/2017/11/10/74767-mountain-ridges-Dolomites_mountains.jpg';\\r\\n</script>\\n\\n<svelte:head>\\n\\t<title>Reports</title>\\n</svelte:head>\\n<div>\\n\\t<div class=\\"px:2 m-2 md:px-5 md:m-5 md:mt-1 flex justify-between\\">\\n\\t\\t<h1 class=\\"text-xl font-semibold text-center md:text-left\\">REPORT VIEWS</h1>\\n\\t\\t<p\\n\\t\\t\\tclass=\\"bg-primaryGreen px-4 rounded text-white text-xl font-bold cursor-pointer\\"\\n\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\tgoto('ranger/new_report');\\n\\t\\t\\t}}\\n\\t\\t>\\n\\t\\t\\t+\\n\\t\\t</p>\\n\\t</div>\\n\\t<div class=\\"w-full md:flex\\">\\n\\t\\t<div\\n\\t\\t\\tclass=\\"w-full sm:w-full md:5/12 lg:w-6/12 bg-white rounded border px-4 py-3 md:px-8 md:py-3 mr-3\\"\\n\\t\\t>\\n\\t\\t\\t<h1 class=\\"text-center font-semibold font-sourceSans mb-6 text-greenAccent\\">\\n\\t\\t\\t\\tRECENT REPORTS\\n\\t\\t\\t</h1>\\n\\t\\t\\t<table class=\\"text-left w-full md:px-10\\">\\n\\t\\t\\t\\t<thead class=\\"flex w-full\\">\\n\\t\\t\\t\\t\\t<tr class=\\"flex w-full mb-2 items-center justify-between\\">\\n\\t\\t\\t\\t\\t\\t<th class=\\"text-center w-1/5\\" />\\n\\t\\t\\t\\t\\t\\t<th class=\\"text-center w-2/5\\">Gorilla</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"text-center w-2/5\\">Reporter</th>\\n\\t\\t\\t\\t\\t\\t<th class=\\"text-center w-2/5\\">Time</th>\\n\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t</thead>\\n\\t\\t\\t\\t<tbody class=\\"flex flex-col items-center justify-between overflow-y-auto w-full mt-3\\">\\n\\t\\t\\t\\t\\t{#each integers as int}\\n\\t\\t\\t\\t\\t\\t<tr\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"flex w-full mb-2 items-center justify-between cursor-pointer shadow hover:text-motherGreen\\"\\n\\t\\t\\t\\t\\t\\t\\ton:click={() => {\\n\\t\\t\\t\\t\\t\\t\\t\\tgoto(\`/admin/reports/report/\${int}\`);\\n\\t\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center w-1/5 py-3\\">{int}</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center w-2/5\\">Kwitonda</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center w-2/5\\">Mucyo Erneste</td>\\n\\t\\t\\t\\t\\t\\t\\t<td class=\\"text-center w-2/5\\">3 hours ago</td>\\n\\t\\t\\t\\t\\t\\t</tr>\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t<p class=\\"cursor-pointer text-successorColor font-semibold\\">Load More</p>\\n\\t\\t\\t\\t</tbody>\\n\\t\\t\\t</table>\\n\\t\\t</div>\\n\\t\\t<div\\n\\t\\t\\tclass=\\"w-full sm:w-full md:5/12 lg:w-5/12 bg-white rounded border px-4 py-3 mt-4 md:mt-0 md:ml-2\\"\\n\\t\\t>\\n\\t\\t\\t<div class=\\"flex flex-col\\">\\n\\t\\t\\t\\t<h3\\n\\t\\t\\t\\t\\tclass=\\"text-center text-xl cursor-pointer font-semibold font-sourceSans text-greenAccent\\"\\n\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\tComments and Photos\\n\\t\\t\\t\\t</h3>\\n\\t\\t\\t\\t<div class=\\"w-full flex flex-col mx-auto items-center border rounded mb-2\\">\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:w-5/6 cursor-pointer py-2\\">\\n\\t\\t\\t\\t\\t\\t<p class=\\"w-full text-center font-semibold text-sm\\">\\n\\t\\t\\t\\t\\t\\t\\t\\"It doesnt look health in the way it stands it looks like its leg was broken\\"\\n\\t\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-xs text-center\\">Didier on Amahoro report</p>\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-xs text-center\\">3 hours ago</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"w-full flex flex-col mx-auto items-center border rounded mb-2\\">\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:w-5/6 cursor-pointer py-2\\">\\n\\t\\t\\t\\t\\t\\t<img\\n\\t\\t\\t\\t\\t\\t\\talt=\\"Success Kid\\"\\n\\t\\t\\t\\t\\t\\t\\tsrc={photoUrl}\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"h-24 w-36 shadow rounded-sm cursor-pointer\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-xs text-center\\">Didier on Amahoro report</p>\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-xs text-center\\">3 hours ago</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"w-full flex flex-col mx-auto items-center border rounded mb-2\\">\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:w-5/6 cursor-pointer py-2\\">\\n\\t\\t\\t\\t\\t\\t<p class=\\"w-full text-center font-semibold text-sm\\">\\n\\t\\t\\t\\t\\t\\t\\t\\"It doesnt look health in the way it stands it looks like its leg was broken\\"\\n\\t\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-xs text-center\\">Didier on Amahoro report</p>\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-xs text-center\\">3 hours ago</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t<div class=\\"w-full flex flex-col mx-auto items-center border rounded mb-2\\">\\n\\t\\t\\t\\t\\t<div class=\\"flex flex-col md:w-5/6 cursor-pointer py-2\\">\\n\\t\\t\\t\\t\\t\\t<img\\n\\t\\t\\t\\t\\t\\t\\talt=\\"Success Kid\\"\\n\\t\\t\\t\\t\\t\\t\\tsrc={photoUrl}\\n\\t\\t\\t\\t\\t\\t\\tclass=\\"h-24 w-36 shadow rounded-sm cursor-pointer\\"\\n\\t\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-xs text-center\\">Didier on Amahoro report</p>\\n\\t\\t\\t\\t\\t\\t<p class=\\"text-xs text-center\\">3 hours ago</p>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</div>\\n\\n\\t\\t\\t<span class=\\"load-more font-semibold text-sm text-center mx-2 px-10 cursor-pointer\\"\\n\\t\\t\\t\\t>Load more</span\\n\\t\\t\\t>\\n\\t\\t</div>\\n\\t</div>\\n</div>\\n\\n<style>div ::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}div::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}</style>\\n"],"names":[],"mappings":"AAgHO,kBAAG,gBAAC,yBAAyB,CAAC,WAAW,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,EAAE,CAAC,CAAC,iCAAG,yBAAyB,CAAC,iBAAiB,OAAO,CAAC,QAAQ,GAAG,CAAC,KAAK,CAAC,OAAO,CAAC"}`
};
let photoUrl = "https://wallup.net/wp-content/uploads/2017/11/10/74767-mountain-ridges-Dolomites_mountains.jpg";
const Reports = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let integers = [1, 2, 3, 4, 5, 6, 7, 8];
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Reports</title>`, ""}`, ""}
<div class="${"svelte-15rxaag"}"><div class="${"px:2 m-2 md:px-5 md:m-5 md:mt-1 flex justify-between svelte-15rxaag"}"><h1 class="${"text-xl font-semibold text-center md:text-left svelte-15rxaag"}">REPORT VIEWS</h1>
		<p class="${"bg-primaryGreen px-4 rounded text-white text-xl font-bold cursor-pointer svelte-15rxaag"}">+
		</p></div>
	<div class="${"w-full md:flex svelte-15rxaag"}"><div class="${"w-full sm:w-full md:5/12 lg:w-6/12 bg-white rounded border px-4 py-3 md:px-8 md:py-3 mr-3 svelte-15rxaag"}"><h1 class="${"text-center font-semibold font-sourceSans mb-6 text-greenAccent svelte-15rxaag"}">RECENT REPORTS
			</h1>
			<table class="${"text-left w-full md:px-10 svelte-15rxaag"}"><thead class="${"flex w-full svelte-15rxaag"}"><tr class="${"flex w-full mb-2 items-center justify-between svelte-15rxaag"}"><th class="${"text-center w-1/5 svelte-15rxaag"}"></th>
						<th class="${"text-center w-2/5 svelte-15rxaag"}">Gorilla</th>
						<th class="${"text-center w-2/5 svelte-15rxaag"}">Reporter</th>
						<th class="${"text-center w-2/5 svelte-15rxaag"}">Time</th></tr></thead>
				<tbody class="${"flex flex-col items-center justify-between overflow-y-auto w-full mt-3 svelte-15rxaag"}">${each(integers, (int) => `<tr class="${"flex w-full mb-2 items-center justify-between cursor-pointer shadow hover:text-motherGreen svelte-15rxaag"}"><td class="${"text-center w-1/5 py-3 svelte-15rxaag"}">${escape(int)}</td>
							<td class="${"text-center w-2/5 svelte-15rxaag"}">Kwitonda</td>
							<td class="${"text-center w-2/5 svelte-15rxaag"}">Mucyo Erneste</td>
							<td class="${"text-center w-2/5 svelte-15rxaag"}">3 hours ago</td>
						</tr>`)}
					<p class="${"cursor-pointer text-successorColor font-semibold svelte-15rxaag"}">Load More</p></tbody></table></div>
		<div class="${"w-full sm:w-full md:5/12 lg:w-5/12 bg-white rounded border px-4 py-3 mt-4 md:mt-0 md:ml-2 svelte-15rxaag"}"><div class="${"flex flex-col svelte-15rxaag"}"><h3 class="${"text-center text-xl cursor-pointer font-semibold font-sourceSans text-greenAccent svelte-15rxaag"}">Comments and Photos
				</h3>
				<div class="${"w-full flex flex-col mx-auto items-center border rounded mb-2 svelte-15rxaag"}"><div class="${"flex flex-col md:w-5/6 cursor-pointer py-2 svelte-15rxaag"}"><p class="${"w-full text-center font-semibold text-sm svelte-15rxaag"}">&quot;It doesnt look health in the way it stands it looks like its leg was broken&quot;
						</p>
						<p class="${"text-xs text-center svelte-15rxaag"}">Didier on Amahoro report</p>
						<p class="${"text-xs text-center svelte-15rxaag"}">3 hours ago</p></div></div>
				<div class="${"w-full flex flex-col mx-auto items-center border rounded mb-2 svelte-15rxaag"}"><div class="${"flex flex-col md:w-5/6 cursor-pointer py-2 svelte-15rxaag"}"><img alt="${"Success Kid"}"${add_attribute("src", photoUrl, 0)} class="${"h-24 w-36 shadow rounded-sm cursor-pointer svelte-15rxaag"}">
						<p class="${"text-xs text-center svelte-15rxaag"}">Didier on Amahoro report</p>
						<p class="${"text-xs text-center svelte-15rxaag"}">3 hours ago</p></div></div>
				<div class="${"w-full flex flex-col mx-auto items-center border rounded mb-2 svelte-15rxaag"}"><div class="${"flex flex-col md:w-5/6 cursor-pointer py-2 svelte-15rxaag"}"><p class="${"w-full text-center font-semibold text-sm svelte-15rxaag"}">&quot;It doesnt look health in the way it stands it looks like its leg was broken&quot;
						</p>
						<p class="${"text-xs text-center svelte-15rxaag"}">Didier on Amahoro report</p>
						<p class="${"text-xs text-center svelte-15rxaag"}">3 hours ago</p></div></div>
				<div class="${"w-full flex flex-col mx-auto items-center border rounded mb-2 svelte-15rxaag"}"><div class="${"flex flex-col md:w-5/6 cursor-pointer py-2 svelte-15rxaag"}"><img alt="${"Success Kid"}"${add_attribute("src", photoUrl, 0)} class="${"h-24 w-36 shadow rounded-sm cursor-pointer svelte-15rxaag"}">
						<p class="${"text-xs text-center svelte-15rxaag"}">Didier on Amahoro report</p>
						<p class="${"text-xs text-center svelte-15rxaag"}">3 hours ago</p></div></div></div>

			<span class="${"load-more font-semibold text-sm text-center mx-2 px-10 cursor-pointer svelte-15rxaag"}">Load more</span></div></div>
</div>`;
});
const Reports_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Reports, "Reports").$$render($$result, {}, {}, {})}
</div>`;
});
var reports = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Reports_1
});
const Store = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="${"bg-white rounded px-4 pt-3 pb-1 md:px-8 md:py-3 mr-3  md:w-5/6 longer"}"><h1 class="${"font-semibold mb-4 text-2xl"}">Doctor store</h1>
	<p>Under development</p></div>`;
});
var store = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Store
});
const Tasks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>Tasks</title>`, ""}`, ""}
<div class="${"flex flex-col justify-center bg-white p-6"}"><h1 class="${"font-bold w-full text-xl"}">Daily task assignment</h1>
	<div class="${"w-10/12 flex flex-col sm:mx-4 md:mx-10 mt-4"}"><div class="${"w-full flex flex-col"}"><label for="${"date"}">Task Date</label>
			<input type="${"date"}" class="${"px-4 border-b-2 border-black focus:border-green-500 focus:outline-none sm:w-5/6 md:w-4/12"}" name="${"task_date"}"></div>
		<table class="${"w-full justify-between mt-4"}"><thead class="${"w-full"}"><tr class="${"justify-between"}"><th class="${"p-2 text-center w-1/7"}">Numbering</th>
					<th class="${"p-2 text-center w-1/7"}">Group name</th>
					<th class="${"p-2 text-center w-1/7"}">Families and Gorillas</th></tr></thead>
			<tbody class="${"limitedTable overflow-y-auto"}"><tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer"}"><td class="${"text-center p-2 w-1/7"}">1</td>
					<td class="${"text-center p-2 w-1/7"}">Horrible</td>
					<td class="${"text-center p-2 w-1/7"}">Kwitonda</td></tr>
				<tr class="${"mt-3 justify-between bg-white border-b-2 cursor-pointer"}"><td class="${"text-center p-2 w-1/7"}">1</td>
					<td class="${"text-center p-2 w-1/7"}">Horrible</td>
					<td class="${"text-center p-2 w-1/7"}">Kwitonda</td></tr></tbody></table>
		<div class="${"w-full flex"}"><div class="${"w-8/12"}"></div>
			<div class="${"w-4/12 flex"}"><button class="${"text-white p-4 py-2 m-2 bg-green-600 rounded items-center cursor-pointer focus:outline-none"}">+ Add</button>
				<button class="${"text-white p-4 py-2 m-2 bg-green-600 rounded items-center cursor-pointer focus:outline-none"}">Save Tasks</button></div></div></div>
</div>`;
});
const Tasks_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div>${validate_component(Tasks, "Tasks").$$render($$result, {}, {}, {})}</div>`;
});
var tasks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  default: Tasks_1
});
export {init, render};
