export function truncatedAddress(
  address: string | null | undefined,
  head = 5,
  tail = 4,
) {
  if (address && address.startsWith('0x')) {
    return (
      address.substring(0, head) +
      '...' +
      address.substring(address.length - tail)
    );
  }

  return address;
}
