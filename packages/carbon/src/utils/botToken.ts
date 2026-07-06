const botTokenPrefixPattern = /^Bot\s+/i
const snowflakePattern = /^\d{17,20}$/

export function deriveClientIdFromBotToken(token: string): string {
	const encodedId = token.replace(botTokenPrefixPattern, "").split(".")[0]
	if (!encodedId) {
		throw new Error("Missing client ID and bot token does not contain one")
	}

	const clientId = decodeBase64Url(encodedId)
	if (!snowflakePattern.test(clientId)) {
		throw new Error("Missing client ID and bot token does not contain one")
	}

	return clientId
}

function decodeBase64Url(value: string): string {
	const normalized = value.replace(/-/g, "+").replace(/_/g, "/")
	const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=")

	if (typeof atob === "function") {
		return atob(padded)
	}

	if (typeof Buffer !== "undefined") {
		return Buffer.from(padded, "base64").toString("utf8")
	}

	throw new Error("No base64 decoder available")
}
