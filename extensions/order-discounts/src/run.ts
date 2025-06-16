import { DiscountApplicationStrategy } from "../generated/api";

export function run(input) {
  const cart = input.cart;
  const quantityThresholds = [
    { threshold: 25, discount: 0.2 },
    { threshold: 10, discount: 0.1 },
  ];
  const totalQuantity = cart.lines.reduce(
    (sum, line) => sum + line.quantity,
    0
  );
  const applicableThreshold = quantityThresholds.find(
    (t) => totalQuantity >= t.threshold
  );
  if (!applicableThreshold) {
    return {
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [],
    };
  }
  const discounts = cart.lines.map((line) => ({
    targets: [{ productVariant: { id: line.merchandise.id } }],
    value: { percentage: { value: applicableThreshold.discount * 100 } },
    message: `You've received a ${
      applicableThreshold.discount * 100
    }% discount for buying ${totalQuantity} items!`,
  }));
  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts,
  };
}
