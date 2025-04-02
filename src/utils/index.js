export function randomInRange(ranges, fixed = 1) {
    // 计算总权重
    const totalWeight = ranges.reduce((sum, { weight }) => sum + weight, 0);

    // 生成一个 0 到 totalWeight 之间的随机数
    let random = Math.random() * totalWeight;

    for (const { min, max, weight } of ranges) {
        if (random < weight) {
            return parseFloat((Math.random() * (max - min) + min).toFixed(fixed));
        }
        random -= weight;
    }
}
