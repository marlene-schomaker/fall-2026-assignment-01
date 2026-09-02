export function getInventoryValue(
  inventory: Array<[string, number, number]>,
): number {
  return inventory.reduce((totalValue, [_, quantity, pricePerUnit]) => {
    if (quantity > 5) {
      return totalValue + (quantity * pricePerUnit);
    }
    return totalValue;
  }, 0);
}
