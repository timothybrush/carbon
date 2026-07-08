type ExecutionContext = {
	waitUntil(promise: Promise<unknown>): void
}

export default {
	async fetch(req: Request, env: unknown, ctx: ExecutionContext) {
		Reflect.set(globalThis, "process", { env })
		const mod = await import("./index.js")
		return mod.default.fetch(req, ctx)
	}
}
