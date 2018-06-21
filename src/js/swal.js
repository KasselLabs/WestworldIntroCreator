import 'sweetalert2/dist/sweetalert2.min.css';
import Swal from 'sweetalert2';

const MySwal = Swal.mixin({
  customClass: 'westworld-sweetalert',
});

export default MySwal;
