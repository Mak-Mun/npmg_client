const c = [
	() => import("..\\..\\..\\src\\routes\\$layout.svelte"),
	() => import("..\\..\\..\\src\\routes\\$error.svelte"),
	() => import("..\\..\\..\\src\\routes\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\doctor\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\ranger\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\admin\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\auth\\$layout.svelte"),
	() => import("..\\..\\..\\src\\routes\\auth\\forgotpassword.svelte"),
	() => import("..\\..\\..\\src\\routes\\auth\\register.svelte"),
	() => import("..\\..\\..\\src\\routes\\auth\\login.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\$layout.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\index.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\kwitizina.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\gorillas.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\settings.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\doctors.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\rangers.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\reports.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\store.svelte"),
	() => import("..\\..\\..\\src\\routes\\user\\tasks.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/doctor/index.svelte
	[/^\/doctor\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/ranger/index.svelte
	[/^\/ranger\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/admin/index.svelte
	[/^\/admin\/?$/, [c[0], c[5]], [c[1]]],

	// src/routes/auth/forgotpassword.svelte
	[/^\/auth\/forgotpassword\/?$/, [c[0], c[6], c[7]], [c[1]]],

	// src/routes/auth/register.svelte
	[/^\/auth\/register\/?$/, [c[0], c[6], c[8]], [c[1]]],

	// src/routes/auth/login.svelte
	[/^\/auth\/login\/?$/, [c[0], c[6], c[9]], [c[1]]],

	// src/routes/user/index.svelte
	[/^\/user\/?$/, [c[0], c[10], c[11]], [c[1]]],

	// src/routes/user/kwitizina.svelte
	[/^\/user\/kwitizina\/?$/, [c[0], c[10], c[12]], [c[1]]],

	// src/routes/user/gorillas.svelte
	[/^\/user\/gorillas\/?$/, [c[0], c[10], c[13]], [c[1]]],

	// src/routes/user/settings.svelte
	[/^\/user\/settings\/?$/, [c[0], c[10], c[14]], [c[1]]],

	// src/routes/user/doctors.svelte
	[/^\/user\/doctors\/?$/, [c[0], c[10], c[15]], [c[1]]],

	// src/routes/user/rangers.svelte
	[/^\/user\/rangers\/?$/, [c[0], c[10], c[16]], [c[1]]],

	// src/routes/user/reports.svelte
	[/^\/user\/reports\/?$/, [c[0], c[10], c[17]], [c[1]]],

	// src/routes/user/store.svelte
	[/^\/user\/store\/?$/, [c[0], c[10], c[18]], [c[1]]],

	// src/routes/user/tasks.svelte
	[/^\/user\/tasks\/?$/, [c[0], c[10], c[19]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];