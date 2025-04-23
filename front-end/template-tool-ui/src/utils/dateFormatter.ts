export function mysqlDatetimeToDate(mysqlDatetime: string | number[]): Date {

  if (Array.isArray(mysqlDatetime)) {
    // Input is already an array of components [year, month, day, hours, minutes, seconds]
    const [year, month, day, hours = 0, minutes = 0, seconds = 0] = mysqlDatetime;
    return new Date(year, month - 1, day, hours, minutes, seconds); // Month is 0-based
  }

  if (typeof mysqlDatetime === 'string') {
    // if valid ISO 8601 string, parse it directly
    if (!isNaN(Date.parse(mysqlDatetime))) {
      return new Date(mysqlDatetime); // Directly create a Date object
    }
    // else
    // MySQL datetime format: "YYYY-MM-DD HH:MM:SS"
    const [datePart, timePart] = mysqlDatetime.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds); // Month is 0-based
  }

  throw new Error("Invalid MySQL datetime format");
}