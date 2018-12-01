import moment from 'moment';

const CURRENT_DATE = moment().format("D MMM YYYY").split(' ');

export const DATES = {
  day: CURRENT_DATE[0],
  month: CURRENT_DATE[1],
  year: CURRENT_DATE[2],
  dayOfWeek: moment().format('dddd')
};

export const fallbackCopyTextToClipboard = (text) => {
  let textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
    this.$emit('copy');
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
};