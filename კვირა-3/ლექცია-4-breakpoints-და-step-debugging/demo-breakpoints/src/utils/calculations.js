// ===================================================================
// Shopping Cart Calculations — Contains intentional bugs for practice
// ===================================================================

const TAX_RATE = 0.18;

/**
 * Calculate subtotal from cart items
 */
export function calculateSubtotal(items) {
  console.log("📊 calculateSubtotal() — Entry", { itemCount: items.length });

  const subtotal = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  console.log("📊 calculateSubtotal() — Exit", { subtotal });
  return subtotal;
}

/**
 * Apply discount based on code
 * Valid codes: SAVE10 (10%), SAVE20 (20%), HALF (50%)
 */
export function applyDiscount(subtotal, code) {
  console.log("💰 applyDiscount() — Entry", { subtotal, code });

  if (!code) {
    console.log("💰 applyDiscount() — Exit", { discount: 0 });
    return 0;
  }

  let discountPercent = 0;

  switch (code.toUpperCase()) {
    case "SAVE10":
      discountPercent = 10;
      break;
    case "SAVE20":
      discountPercent = 20;
      break;
    case "HALF":
      discountPercent = 50;
      break;
    default:
      console.log("💰 applyDiscount() — Invalid code");
      return 0;
  }

  // BUG #1: discountPercent is 20 (not 0.20), so this multiplies by 20 instead of 0.20
  const discount = subtotal * discountPercent;

  console.log("💰 applyDiscount() — Exit", { discountPercent, discount });
  return Math.max(0, discount);
}

/**
 * Calculate tax amount
 */
export function calculateTax(amount, rate = TAX_RATE) {
  console.log("🧾 calculateTax() — Entry", { amount, rate });

  const tax = amount * rate;
  // BUG #5: parseInt truncates decimals — 17.28 becomes 17
  const roundedTax = Math.round(tax * 100) / 100;

  console.log("🧾 calculateTax() — Exit", { tax, roundedTax });
  return roundedTax;
}

/**
 * Calculate final total
 */
export function calculateTotal(subtotal, discount, tax) {
  console.log("💵 calculateTotal() — Entry", { subtotal, discount, tax });

  const total = subtotal - discount + tax;

  console.log("💵 calculateTotal() — Exit", { total });
  return total;
}
