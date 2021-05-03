import { ssr } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t<link href=\"https://fonts.googleapis.com/css2?family=Nunito&display=swap\" rel=\"stylesheet\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" />\n\t\t<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" />\n\t\t<link\n\t\t\thref=\"https://fonts.googleapis.com/css2?family=Lato&family=Noto+Sans+JP:wght@300&display=swap\"\n\t\t\trel=\"stylesheet\"\n\t\t/>\n\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

// allow paths to be overridden in svelte-kit start
// and in prerendering
export function init(settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-3ddde90f.js",
			css: ["/./_app/assets/start-0826e215.css"],
			js: ["/./_app/start-3ddde90f.js","/./_app/chunks/index-31c2d992.js","/./_app/chunks/index-c2ea1688.js","/./_app/chunks/singletons-6b53f818.js"]
		},
		fetched: undefined,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		router: true,
		ssr: true,
		target: "#svelte",
		template
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [],
	layout: "src/routes/$layout.svelte",
	error: "src/routes/$error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/index.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/doctor\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/doctor/index.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/ranger\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/ranger/index.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/admin\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/admin/index.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/auth\/forgotpassword\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/auth/$layout.svelte", "src/routes/auth/forgotpassword.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/auth\/register\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/auth/$layout.svelte", "src/routes/auth/register.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/auth\/login\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/auth/$layout.svelte", "src/routes/auth/login.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/index.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/kwitizina\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/kwitizina.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/gorillas\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/gorillas.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/settings\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/settings.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/doctors\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/doctors.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/rangers\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/rangers.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/reports\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/reports.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/store\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/store.svelte"],
						b: ["src/routes/$error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/user\/tasks\/?$/,
						params: empty,
						a: ["src/routes/$layout.svelte", "src/routes/user/$layout.svelte", "src/routes/user/tasks.svelte"],
						b: ["src/routes/$error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getContext: hooks.getContext || (() => ({})),
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, render }) => render(request))
});

const module_lookup = {
	"src/routes/$layout.svelte": () => import("..\\..\\src\\routes\\$layout.svelte"),"src/routes/$error.svelte": () => import("..\\..\\src\\routes\\$error.svelte"),"src/routes/index.svelte": () => import("..\\..\\src\\routes\\index.svelte"),"src/routes/doctor/index.svelte": () => import("..\\..\\src\\routes\\doctor\\index.svelte"),"src/routes/ranger/index.svelte": () => import("..\\..\\src\\routes\\ranger\\index.svelte"),"src/routes/admin/index.svelte": () => import("..\\..\\src\\routes\\admin\\index.svelte"),"src/routes/auth/$layout.svelte": () => import("..\\..\\src\\routes\\auth\\$layout.svelte"),"src/routes/auth/forgotpassword.svelte": () => import("..\\..\\src\\routes\\auth\\forgotpassword.svelte"),"src/routes/auth/register.svelte": () => import("..\\..\\src\\routes\\auth\\register.svelte"),"src/routes/auth/login.svelte": () => import("..\\..\\src\\routes\\auth\\login.svelte"),"src/routes/user/$layout.svelte": () => import("..\\..\\src\\routes\\user\\$layout.svelte"),"src/routes/user/index.svelte": () => import("..\\..\\src\\routes\\user\\index.svelte"),"src/routes/user/kwitizina.svelte": () => import("..\\..\\src\\routes\\user\\kwitizina.svelte"),"src/routes/user/gorillas.svelte": () => import("..\\..\\src\\routes\\user\\gorillas.svelte"),"src/routes/user/settings.svelte": () => import("..\\..\\src\\routes\\user\\settings.svelte"),"src/routes/user/doctors.svelte": () => import("..\\..\\src\\routes\\user\\doctors.svelte"),"src/routes/user/rangers.svelte": () => import("..\\..\\src\\routes\\user\\rangers.svelte"),"src/routes/user/reports.svelte": () => import("..\\..\\src\\routes\\user\\reports.svelte"),"src/routes/user/store.svelte": () => import("..\\..\\src\\routes\\user\\store.svelte"),"src/routes/user/tasks.svelte": () => import("..\\..\\src\\routes\\user\\tasks.svelte")
};

const metadata_lookup = {"src/routes/$layout.svelte":{"entry":"/./_app/pages/$layout.svelte-77147f15.js","css":["/./_app/assets/pages/$layout.svelte-ffb66b6e.css"],"js":["/./_app/pages/$layout.svelte-77147f15.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/$error.svelte":{"entry":"/./_app/pages/$error.svelte-8b905f17.js","css":[],"js":["/./_app/pages/$error.svelte-8b905f17.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-bf446a14.js","css":[],"js":["/./_app/pages/index.svelte-bf446a14.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/doctor/index.svelte":{"entry":"/./_app/pages/doctor/index.svelte-5c50ddf0.js","css":[],"js":["/./_app/pages/doctor/index.svelte-5c50ddf0.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/ranger/index.svelte":{"entry":"/./_app/pages/ranger/index.svelte-8dada83a.js","css":["/./_app/assets/pages/ranger/index.svelte-a84417ac.css"],"js":["/./_app/pages/ranger/index.svelte-8dada83a.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/admin/index.svelte":{"entry":"/./_app/pages/admin/index.svelte-930fb8e4.js","css":["/./_app/assets/pages/ranger/index.svelte-a84417ac.css"],"js":["/./_app/pages/admin/index.svelte-930fb8e4.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/auth/$layout.svelte":{"entry":"/./_app/pages/auth/$layout.svelte-f820c3f6.js","css":[],"js":["/./_app/pages/auth/$layout.svelte-f820c3f6.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/auth/forgotpassword.svelte":{"entry":"/./_app/pages/auth/forgotpassword.svelte-b832cefa.js","css":[],"js":["/./_app/pages/auth/forgotpassword.svelte-b832cefa.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/auth/register.svelte":{"entry":"/./_app/pages/auth/register.svelte-b2bd3cd5.js","css":[],"js":["/./_app/pages/auth/register.svelte-b2bd3cd5.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/auth/login.svelte":{"entry":"/./_app/pages/auth/login.svelte-6cf9d2e1.js","css":[],"js":["/./_app/pages/auth/login.svelte-6cf9d2e1.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/user/$layout.svelte":{"entry":"/./_app/pages/user/$layout.svelte-81b5343b.js","css":["/./_app/assets/pages/user/$layout.svelte-78e00086.css"],"js":["/./_app/pages/user/$layout.svelte-81b5343b.js","/./_app/chunks/index-31c2d992.js","/./_app/chunks/navigation-9e49acea.js","/./_app/chunks/singletons-6b53f818.js"],"styles":null},"src/routes/user/index.svelte":{"entry":"/./_app/pages/user/index.svelte-e4cdb11a.js","css":["/./_app/assets/pages/ranger/index.svelte-a84417ac.css"],"js":["/./_app/pages/user/index.svelte-e4cdb11a.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/user/kwitizina.svelte":{"entry":"/./_app/pages/user/kwitizina.svelte-73e50e94.js","css":["/./_app/assets/pages/user/kwitizina.svelte-7db769a1.css"],"js":["/./_app/pages/user/kwitizina.svelte-73e50e94.js","/./_app/chunks/index-31c2d992.js","/./_app/chunks/index-c2ea1688.js"],"styles":null},"src/routes/user/gorillas.svelte":{"entry":"/./_app/pages/user/gorillas.svelte-eccda77c.js","css":["/./_app/assets/pages/user/gorillas.svelte-88528781.css"],"js":["/./_app/pages/user/gorillas.svelte-eccda77c.js","/./_app/chunks/index-31c2d992.js","/./_app/chunks/Search-a46387ee.js"],"styles":null},"src/routes/user/settings.svelte":{"entry":"/./_app/pages/user/settings.svelte-84a41692.js","css":["/./_app/assets/pages/user/settings.svelte-77dd228a.css"],"js":["/./_app/pages/user/settings.svelte-84a41692.js","/./_app/chunks/index-31c2d992.js","/./_app/chunks/index-c2ea1688.js"],"styles":null},"src/routes/user/doctors.svelte":{"entry":"/./_app/pages/user/doctors.svelte-2c8d885b.js","css":["/./_app/assets/pages/user/doctors.svelte-0cfb13f2.css","/./_app/assets/InvitationModal-1a118015.css"],"js":["/./_app/pages/user/doctors.svelte-2c8d885b.js","/./_app/chunks/index-31c2d992.js","/./_app/chunks/InvitationModal-13909d8e.js","/./_app/chunks/Search-a46387ee.js"],"styles":null},"src/routes/user/rangers.svelte":{"entry":"/./_app/pages/user/rangers.svelte-236f16f9.js","css":["/./_app/assets/pages/user/doctors.svelte-0cfb13f2.css","/./_app/assets/InvitationModal-1a118015.css"],"js":["/./_app/pages/user/rangers.svelte-236f16f9.js","/./_app/chunks/index-31c2d992.js","/./_app/chunks/Search-a46387ee.js","/./_app/chunks/navigation-9e49acea.js","/./_app/chunks/singletons-6b53f818.js","/./_app/chunks/InvitationModal-13909d8e.js"],"styles":null},"src/routes/user/reports.svelte":{"entry":"/./_app/pages/user/reports.svelte-27cc8612.js","css":["/./_app/assets/pages/user/reports.svelte-8881f422.css"],"js":["/./_app/pages/user/reports.svelte-27cc8612.js","/./_app/chunks/index-31c2d992.js","/./_app/chunks/navigation-9e49acea.js","/./_app/chunks/singletons-6b53f818.js"],"styles":null},"src/routes/user/store.svelte":{"entry":"/./_app/pages/user/store.svelte-6525ce24.js","css":[],"js":["/./_app/pages/user/store.svelte-6525ce24.js","/./_app/chunks/index-31c2d992.js"],"styles":null},"src/routes/user/tasks.svelte":{"entry":"/./_app/pages/user/tasks.svelte-e170c8b8.js","css":[],"js":["/./_app/pages/user/tasks.svelte-e170c8b8.js","/./_app/chunks/index-31c2d992.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

init({ paths: {"base":"","assets":"/."} });

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return ssr({ ...request, host }, options, { prerender });
}