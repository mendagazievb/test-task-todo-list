import moment from 'moment';

const CURRENT_DATE = moment().format("D MMM YYYY").split(' ');
const DATES = {
  day: CURRENT_DATE[0],
  month: CURRENT_DATE[1],
  year: CURRENT_DATE[2],
  dayOfWeek: moment().format('dddd')
};

export default DATES;