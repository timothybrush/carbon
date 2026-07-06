import { Client } from "@buape/carbon"
import {
	GatewayForwarderPlugin,
	GatewayIntents
} from "@buape/carbon/gateway-forwarder"

new Client(
	{
		baseUrl: process.env.BASE_URL,
		token: process.env.DISCORD_BOT_TOKEN,
		disableDeployRoute: true,
		disableEventsRoute: true,
		disableInteractionsRoute: true
	},
	{},
	[
		new GatewayForwarderPlugin({
			intents:
				GatewayIntents.Guilds |
				GatewayIntents.GuildMessages |
				GatewayIntents.MessageContent,
			webhookUrl: `${process.env.BASE_URL}/events`,
			privateKey: process.env.FORWARDER_PRIVATE_KEY
		})
	]
)

console.log(
	`Carbon forwarder initialized and ready to forward events to ${process.env.BASE_URL}/events`
)

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BASE_URL: string
			DISCORD_BOT_TOKEN: string
			FORWARDER_PUBLIC_KEY: string
			FORWARDER_PRIVATE_KEY: string
		}
	}
}
