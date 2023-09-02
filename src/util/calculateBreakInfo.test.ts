import { assertEquals } from "https://deno.land/std@0.188.0/testing/asserts.ts";

import { calculateBreakInfo } from "./calculateBreakInfo.ts";

Deno.test(
    "calculateBreakInfo returns correct values when current date is before start date",
    () => {
        const start = new Date("2023-09-01T00:00:00");
        const end = new Date("2023-09-01T09:00:00");
        const currentDate = new Date("2023-08-01T00:00:00");

        const breakInfo = calculateBreakInfo(start, end, currentDate);

        assertEquals(breakInfo.remainingTime, end.getTime() - start.getTime());
        assertEquals(breakInfo.elapsedPercentage, 0);
        assertEquals(breakInfo.humanReadableRemainingTime, null);
    },
);

Deno.test(
    "calculateBreakInfo returns correct values when current date is after end date",
    () => {
        const start = new Date("2023-09-01T00:00:00");
        const end = new Date("2023-09-01T09:00:00");
        const currentDate = new Date("2023-10-01T00:00:00");

        const breakInfo = calculateBreakInfo(start, end, currentDate);

        assertEquals(breakInfo.remainingTime, 0);
        assertEquals(breakInfo.elapsedPercentage, 100);
        assertEquals(breakInfo.humanReadableRemainingTime, null);
    },
);

Deno.test(
    "calculateBreakInfo returns correct values when current date is between start date and end date",
    () => {
        const start = new Date("2023-09-01T00:00:00");
        const end = new Date("2023-09-01T10:00:00");
        const currentDate = new Date("2023-09-01T05:00:00");

        const breakInfo = calculateBreakInfo(start, end, currentDate);

        assertEquals(
            breakInfo.remainingTime,
            end.getTime() - currentDate.getTime(),
        );
        assertEquals(breakInfo.elapsedPercentage, 50);
        assertEquals(breakInfo.humanReadableRemainingTime, "5時間");
    },
);
