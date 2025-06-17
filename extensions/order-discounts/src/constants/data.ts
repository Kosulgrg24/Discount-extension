export const quantityPercentageThresholds = [
  { threshold: 50, discount: 0.3 }, // 30% discount for 50 or more items
  { threshold: 35, discount: 0.25 }, // 25% discount for 35 or more items
  { threshold: 25, discount: 0.2 }, // 20% discount for 25 or more items
  { threshold: 10, discount: 0.1 }, // 10% discount for 10 or more items
];

export const amountPercentageThresholds = [
  { threshold: 1000, discount: 0.3 }, // 30% discount for $1000 or more
  { threshold: 750, discount: 0.25 }, // 25% discount for $750 or more
  { threshold: 500, discount: 0.2 }, // 20% discount for $500 or more
  { threshold: 250, discount: 0.1 }, // 10% discount for $250 or more
];

export const amountFixedThresholds = [
  { threshold: 1000, discount: 30 }, // $30 discount for $1000 or more
  { threshold: 750, discount: 25 }, // $25 discount for $750 or more
  { threshold: 500, discount: 20 }, // $20 discount for $500 or more
  { threshold: 250, discount: 10 }, // $10 discount for $250 or more
];
export const quantityFixedThresholds = [
  { threshold: 50, discount: 30 }, // $30 discount for 50 or more items
  { threshold: 35, discount: 25 }, // $25 discount for 35 or more items
  { threshold: 25, discount: 20 }, // $20 discount for 25 or more items
  { threshold: 10, discount: 10 }, // $10 discount for 10 or more items
];
