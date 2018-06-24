import Swal from './swal';

const showErrorAlert = ({ text, ...config }) => (
  Swal({
    titleText: 'ERROR',
    showCancelButton: true,
    cancelButtonText: 'OK',
    cancelButtonAriaLabel: 'OK',
    confirmButtonText: 'REPORT',
    confirmButtonAriaLabel: 'REPORT',
    imageUrl: 'https://media.giphy.com/media/fxIk0cODMTZrchdLzm/giphy.gif',
    imageAlt: 'A GIF with Bernard from Westworld breaking a computer screen.',
    html: `${text} <br/> Sorry for the inconvience! We have been notified,
 but you can click on the button below to fill out a report with more information.`,
    ...config,
  }).then((result) => {
    if (result.value) {
      // report button
      Raven.lastEventId();
      Raven.showReportDialog();
    }
    return result;
  })
);

export default showErrorAlert;
