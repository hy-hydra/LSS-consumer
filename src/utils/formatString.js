export function hideEmail(string) {
  const atIndex = string.lastIndexOf('@');
  const username = string.substring(0, atIndex);
  const hiddenUsername = `****${username.slice(-2)}`;
  const domain = string.substring(atIndex);
  const result = hiddenUsername + domain;

  return result;
}

export function hideCardNumber(string) {
  const result = `****${string.slice(-4)}`;

  return result;
}

export function getOrderStatusColor(string) {
  switch (string) {
    case 'pending':
      return 'default';

    case 'confirmed':
      return 'info';

    case 'onway':
      return 'warning';

    case 'delivered':
      return 'success';

    case 'cancelled':
      return 'error';

    default:
      return 'primary';
  }
}

export function makeVariantsSelectionTitle(length) {
  if (length > 9) return `${length}`;
  if (length === 1) return `0${length}`;
  return `0${length}`;
}
