import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

Swal.setDefaults({
  customClass: 'westworld-sweetalert',
});

const MySwal = withReactContent(Swal);

export default MySwal;
