import { countries } from '../assets/data';

export function getCountry() {
  const newCountries = countries.filter((item) => item.label !== 'United States');
  newCountries.sort((a, b) => {
    const A = a.label.toUpperCase();
    const B = b.label.toUpperCase();
    if (A < B) {
      return -1;
    }
    if (A > B) {
      return 1;
    }
    return 0;
  });
  return [...countries.filter((item) => item.label === 'United States'), ...newCountries];
}
