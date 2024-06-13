import PropTypes from 'prop-types';
// redux
import { useSelector } from '../../redux/store';
// components
import Label from '../label';

const CustomLabel = ({ color, type }) => {
  // const { product, isLoading, checkout } = useSelector((state) => state.product);
  const { checkout } = useSelector((state) => state.product);

  let count;

  switch (type) {
    case 'myBag':
      count = checkout.totalItems;
      break;
    case 'notification':
      count = 2;
      break;
    default:
      break;
  }

  return (
    count > 0 && (
      <Label variant="soft" color={color} sx={{ borderRadius: 2 }}>
        {count}
      </Label>
    )
  );
};

CustomLabel.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string,
};

export default CustomLabel;
