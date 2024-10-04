export type BreakInfo = {
    /**
     * 休みの名前
     */
    name: string;
    /**
     * 残り時間（ミリ秒）
     */
    remainingTime: number;
    /**
     * 残り時間（人間が読める形式）
     * 時間単位で表示する
     * @example 2時間
     */
    humanReadableRemainingTime: string | null;
    /**
     * 休みの経過割合（パーセンテージ）
     * 0〜100の数値
     */
    elapsedPercentage: number;
};

export function calculateBreakInfo({
    start,
    end,
    currentDate,
    name,
}: {
    start: Date;
    end: Date;
    currentDate?: Date;
    name: string;
}): BreakInfo {
    const currentTime = currentDate || new Date();

    // 現在時刻が開始時刻より前、または終了時刻より後の場合は特別なケース

    // 休みが始まっていない
    if (currentTime < start) {
        return {
            name,
            remainingTime: end.getTime() - start.getTime(),
            elapsedPercentage: 0,
            humanReadableRemainingTime: null,
        };
    }

    // 休みがすでに終わっている
    if (currentTime > end) {
        return {
            name,
            remainingTime: 0,
            elapsedPercentage: 100,
            humanReadableRemainingTime: null,
        };
    }

    const totalBreakTime = end.getTime() - start.getTime();
    const elapsedBreakTime = currentTime.getTime() - start.getTime();
    const remainingTime = end.getTime() - currentTime.getTime();

    return {
        name,
        remainingTime,
        elapsedPercentage: (elapsedBreakTime / totalBreakTime) * 100,
        humanReadableRemainingTime: (remainingTime / 3600000).toFixed(0) +
            `時間`,
    };
}
