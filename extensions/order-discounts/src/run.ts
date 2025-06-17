import { DiscountApplicationStrategy } from "../generated/api";
import {
  quantityPercentageThresholds,
  amountPercentageThresholds,
  amountFixedThresholds,
  quantityFixedThresholds,
} from "./constants/data";

const discountType = "quantitypercentage";
const tagExtraDiscountMap: Record<string, number> = {
  VIP: 0.05,
  Loyal: 0.03,
  New: 0.02,
};
export function run(input) {
  const cart = input.cart;
  const customer = cart.buyerIdentity?.customer;

  const totalQuantity = cart.lines.reduce(
    (sum, line) => sum + line.quantity,
    0
  );
  const totalAmount = cart.lines.reduce(
    (sum, line) => sum + line.cost.totalAmount.amount,
    0
  );

  const thresholds = {
    amountpercentage: amountPercentageThresholds.find(
      (t) => totalAmount >= t.threshold
    ),
    quantitypercentage: quantityPercentageThresholds.find(
      (t) => totalQuantity >= t.threshold
    ),
    amountfixed: amountFixedThresholds.find((t) => totalAmount >= t.threshold),
    quantityfixed: quantityFixedThresholds.find(
      (t) => totalQuantity >= t.threshold
    ),
  };

  const threshold = thresholds[discountType];
  if (!threshold) {
    return {
      discountApplicationStrategy: DiscountApplicationStrategy.First,
      discounts: [],
    };
  }

  let matchedTag: string | null = null;
  if (customer?.vipTag) matchedTag = "VIP";
  else if (customer?.loyalTag) matchedTag = "Loyal";
  else if (customer?.newTag) matchedTag = "New";

  const tagExtraDiscount = matchedTag
    ? tagExtraDiscountMap[matchedTag] || 0
    : 0;

  const totalDiscountPercentage = discountType.includes("percentage")
    ? (threshold.discount + tagExtraDiscount) * 100
    : null;

  const discounts = cart.lines.map((line) => ({
    targets: [{ productVariant: { id: line.merchandise.id } }],
    value: discountType.includes("percentage")
      ? {
          percentage: {
            value: totalDiscountPercentage,
          },
        }
      : {
          fixedAmount: {
            amount: threshold.discount,
            appliesToEachItem: false,
          },
        },
    message: discountType.includes("percentage")
      ? matchedTag
        ? `Base ${threshold.discount * 100}% + extra ${
            tagExtraDiscount * 100
          }% for ${matchedTag} customer!`
        : `Standard ${threshold.discount * 100}% discount applied.`
      : matchedTag
      ? `Base $${threshold.discount} + loyalty bonus for ${matchedTag} customer!`
      : `Standard $${threshold.discount} discount applied.`,
  }));

  return {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts,
  };
}

// import { DiscountApplicationStrategy } from "../generated/api";
// import {
//   quantityPercentageThresholds,
//   amountPercentageThresholds,
//   amountFixedThresholds,
//   quantityFixedThresholds,
// } from "./constants/data";

// const discountType = "quantitypercentage";
// export function run(input) {
//   const cart = input.cart;
//   const totalQuantity = cart.lines.reduce(
//     (sum, line) => sum + line.quantity,
//     0
//   );
//   const totalAmount = cart.lines.reduce(
//     (sum, line) => sum + line.totalAmount.amount,
//     0
//   );

//   const thresholds = {
//     amountpercentage: amountPercentageThresholds.find(
//       (t) => totalAmount >= t.threshold
//     ),
//     quantitypercentage: quantityPercentageThresholds.find(
//       (t) => totalQuantity >= t.threshold
//     ),
//     amountfixed: amountFixedThresholds.find((t) => totalAmount >= t.threshold),
//     quantityfixed: quantityFixedThresholds.find(
//       (t) => totalQuantity >= t.threshold
//     ),
//   };

//   const threshold = thresholds[discountType];
//   if (!threshold) {
//     return {
//       discountApplicationStrategy: DiscountApplicationStrategy.First,
//       discounts: [],
//     };
//   }

//   const discounts = cart.lines.map((line) => ({
//     targets: [{ productVariant: { id: line.merchandise.id } }],
//     value: discountType.includes("percentage")
//       ? {
//           percentage: {
//             value: threshold.discount * 100,
//           },
//         }
//       : {
//           fixedAmount: {
//             amount: threshold.discount,
//             appliesToEachItem: false,
//           },
//         },
//     message: `You've received a ${
//       discountType.includes("percentage")
//         ? threshold.discount * 100 + "%"
//         : "$" + threshold.discount
//     } discount for buying ${
//       discountType.includes("quantity") ? totalQuantity : "$" + totalAmount
//     }!`,
//   }));

//   return {
//     discountApplicationStrategy: DiscountApplicationStrategy.First,
//     discounts,
//   };
// }

// import { DiscountApplicationStrategy } from "../generated/api";
// import {
//   quantityPercentageThresholds,
//   amountPercentageThresholds,
//   amountFixedThresholds,
//   quantityFixedThresholds,
// } from "./constants/data";

// const discountType = "quantitypercentage"; // Can be any of the 4 types
// const tagBasedDiscounts = {
//   VIP: 0.15, // 15% extra
//   Loyal: 0.1, // 10% extra
//   New: 0.05, // 5% extra
// };

// export function run(input) {
//   const cart = input.cart;

//   const totalQuantity = cart.lines.reduce(
//     (sum, line) => sum + line.quantity,
//     0
//   );
//   const totalAmount = cart.lines.reduce(
//     (sum, line) => sum + line.cost.totalAmount.amount,
//     0
//   );

//   const customerTags = input.cart.buyerIdentity?.customer?.hasAnyTag || [];
//   const matchedTag = Object.keys(tagBasedDiscounts).find((tag) =>
//     customerTags.includes(tag)
//   );
//   const tagExtraDiscount = matchedTag ? tagBasedDiscounts[matchedTag] : 0;

//   const thresholds = {
//     amountpercentage: amountPercentageThresholds.find(
//       (t) => totalAmount >= t.threshold
//     ),
//     quantitypercentage: quantityPercentageThresholds.find(
//       (t) => totalQuantity >= t.threshold
//     ),
//     amountfixed: amountFixedThresholds.find((t) => totalAmount >= t.threshold),
//     quantityfixed: quantityFixedThresholds.find(
//       (t) => totalQuantity >= t.threshold
//     ),
//   };

//   const threshold = thresholds[discountType];

//   if (!threshold) {
//     return {
//       discountApplicationStrategy: DiscountApplicationStrategy.First,
//       discounts: [],
//     };
//   }

//   const baseDiscount = threshold.discount;

//   const discounts = cart.lines.map((line) => {
//     let discountValue;

//     if (discountType.includes("percentage")) {
//       const totalPercentage = (baseDiscount + tagExtraDiscount) * 100;
//       discountValue = {
//         percentage: { value: totalPercentage },
//       };
//     } else {
//       discountValue = {
//         fixedAmount: {
//           amount: baseDiscount + tagExtraDiscount, // For fixed discounts, add directly
//           appliesToEachItem: false,
//         },
//       };
//     }

//     return {
//       targets: [{ productVariant: { id: line.merchandise.id } }],
//       value: discountValue,
//       message: matchedTag
//         ? `You've received a ${baseDiscount * 100}% base discount + ${
//             tagExtraDiscount * 100
//           }% extra for being a ${matchedTag} customer!`
//         : `You've received a ${baseDiscount * 100}% discount based on your ${
//             discountType.includes("quantity") ? "quantity" : "amount"
//           }.`,
//     };
//   });

//   return {
//     discountApplicationStrategy: DiscountApplicationStrategy.First,
//     discounts,
//   };
// }
