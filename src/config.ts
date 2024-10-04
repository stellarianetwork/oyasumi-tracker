import "https://deno.land/std@0.188.0/dotenv/load.ts";

function checkKeys<T>(o: { [K in keyof T]: T[K] | null | undefined }): {
    [K in keyof T]: NonNullable<T[K]>;
} {
    const newObj: Partial<{ [K in keyof T]: NonNullable<T[K]> }> = {};
    for (const key in o) {
        const value = o[key];
        if (value === null || value === undefined) {
            throw new Error(`Environment variable ${key} is not set`);
        }
        newObj[key] = value;
    }
    return newObj as { [K in keyof T]: NonNullable<T[K]> };
}

const configKeyValue = checkKeys({
    OYASUMI_NAME: Deno.env.get("OYASUMI_NAME"),
    OYASUMI_START: Deno.env.get("OYASUMI_START"),
    OYASUMI_END: Deno.env.get("OYASUMI_END"),
    MASTODON_HOST: Deno.env.get("MASTODON_HOST"),
    MASTODON_TOKEN: Deno.env.get("MASTODON_TOKEN"),
});

export const config = {
    ...configKeyValue,
    OYASUMI_START: new Date(configKeyValue.OYASUMI_START),
    OYASUMI_END: new Date(configKeyValue.OYASUMI_END),
} as const;
