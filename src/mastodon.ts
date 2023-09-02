import { createRestAPIClient } from "https://esm.sh/masto@6.2.0?bundle";
import { config } from "./config.ts";
import { BreakInfo } from "./util/calculateBreakInfo.ts";

function createClient() {
    const client = createRestAPIClient({
        url: config.MASTODON_HOST,
        accessToken: config.MASTODON_TOKEN,
    });

    return client;
}
const zwnbsp = String.fromCharCode(parseInt("0xFEFF", 16));

function extractEmojiFromDisplayName(displayName: string) {
    return displayName.split(zwnbsp).slice(1);
}

function joinEmoji(emoji: string[]) {
    return `${emoji.join(zwnbsp)}`;
}

function joinNameAndEmoji(name: string, emoji: string[]) {
    return `${name} ${zwnbsp}${joinEmoji(emoji)}`;
}

export async function updateNameBreakInfoInName(breakInfo: BreakInfo) {
    const client = createClient();
    const { displayName: currentDisplayName } = await client.v1.accounts
        .verifyCredentials();
    const emoji = extractEmojiFromDisplayName(currentDisplayName);

    if (
        breakInfo.humanReadableRemainingTime === null
    ) {
        const displayName = joinNameAndEmoji(`夏休み 終了`, emoji);
        await client.v1.accounts.updateCredentials({ displayName });
        return;
    }

    const displayName = joinNameAndEmoji(
        [
            `夏休み`,
            `残${breakInfo.humanReadableRemainingTime}`,
            `(${(100 - breakInfo.elapsedPercentage).toFixed(0)}%)`,
        ].join(" "),
        emoji,
    );
    await client.v1.accounts.updateCredentials({ displayName });
}
