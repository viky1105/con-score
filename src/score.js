export function calculateScore(token) {
  if (!token) return 0;

  let score = 50;

  if (token.liquidity > 100000)
    score += 20;

  if (token.mc > 500000)
    score += 10;

  if (token.v24hUSD > 100000)
    score += 10;

  return Math.min(score, 100);
}