const EMPTY = '...';

function fixNumType(num: number | string) {
  if (typeof num === 'undefined') return EMPTY;

  if (typeof num === 'string') {
    num = parseFloat(num);

    if (isNaN(num)) return EMPTY;
  }

  return num;
}

/**
 * optimization technique to avoid rebuilding new Intl.NumberFormat
 */
function getINF(
  defaultInf: Intl.NumberFormat,
  options?: Intl.NumberFormatOptions,
) {
  if (!options) return defaultInf;

  const { locale, ...defaultOptions } = defaultInf.resolvedOptions();

  return new Intl.NumberFormat(locale, {
    ...defaultOptions,
    ...options,
  });
}

const tokenINF = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  maximumFractionDigits: 4,
  minimumFractionDigits: 0,
});

/**
 * Returns comma separated string of number
 * with token symbol as suffix
 * eg. 123456789 => 1,234,567,89 ETH
 */

export function printToken(
  num: number | string,
  symbol: string,
  options?: Intl.NumberFormatOptions,
) {
  num = fixNumType(num);
  if (typeof num === 'string') return EMPTY;

  const inf = getINF(tokenINF, options);

  return inf.format(num) + ' ' + symbol;
}
