export default (dateFrom: string, dateTo: string): any => {
  // Rebuild query for dates
  if (dateFrom && dateTo) {
    return `date-from=${dateFrom}&date-to=${dateTo}`;
  }
  if (dateFrom) {
    return `date-from=${dateFrom}`;
  }
  if (dateTo) {
    return `date-to=${dateTo}`;
  }

  return '';
};
