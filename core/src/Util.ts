export class Util {
  static itemDateToDate(date: Date | string): Date {
    if (typeof date === 'string') {
      return new Date(date);
    }
    return date;
  }

  static itemDateToString(date: Date | string): string {
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString();
  }
}
