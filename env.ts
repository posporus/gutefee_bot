import "https://deno.land/x/dotenv@v3.2.0/load.ts"

export const
    BOT_TOKEN = Deno.env.get("BOT_TOKEN"),
    GROUP_ID = Deno.env.get("GROUP_ID")