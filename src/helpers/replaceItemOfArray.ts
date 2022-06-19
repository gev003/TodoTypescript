export default function replaceItemOfArray(
  array: any[],
  index: number,
  newItem: any
) {
  return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
}
