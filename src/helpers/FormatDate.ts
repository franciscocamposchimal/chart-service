import * as moment from 'moment';
import 'moment-timezone';

export function formatDateToday(): string {
  moment.locale('es');
  const today = moment();
  return today.tz('America/Merida').format('DD/MM/YYYY HH:mm');
}
