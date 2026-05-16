/**
 * Format a number as Indian Rupees
 * e.g. 15999 → "₹15,999"
 */
export const formatINR = (amount) =>
  `₹${Math.round(amount).toLocaleString('en-IN')}`;
