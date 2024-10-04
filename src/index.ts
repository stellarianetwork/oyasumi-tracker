import { config } from "./config.ts";
import { updateNameBreakInfoInName } from "./mastodon.ts";
import { calculateBreakInfo } from "./util/calculateBreakInfo.ts";

const breakInfo = calculateBreakInfo({
    name: config.OYASUMI_NAME,
    start: config.OYASUMI_START,
    end: config.OYASUMI_END,
});
console.log(breakInfo);

await updateNameBreakInfoInName(breakInfo);

Deno.exit(0);
