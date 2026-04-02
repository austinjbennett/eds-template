function getRowValues(row) {
  const values = [...row.querySelectorAll(':scope > div > *')]
    .map((cell) => cell.textContent?.trim())
    .filter((value) => Boolean(value));

  if (values.length) {
    return values;
  }

  const nestedValues = [...row.querySelectorAll(':scope > div > div > *')]
    .map((cell) => cell.textContent?.trim())
    .filter((value) => Boolean(value));

  if (nestedValues.length) {
    return nestedValues;
  }

  const fallbackValue = row.textContent?.trim();
  return fallbackValue ? [fallbackValue] : [];
}

export default function readGroupedBlockProperties(block, groupedFieldKeys) {
  const rows = [...block.querySelectorAll(':scope > div')];

  return groupedFieldKeys.reduce((acc, keys, rowIndex) => {
    const row = rows[rowIndex];
    if (!row) {
      return acc;
    }

    const values = getRowValues(row);

    keys.forEach((key, valueIndex) => {
      const value = values[valueIndex];
      if (value) {
        acc[key] = value;
      }
    });

    return acc;
  }, {});
}
