/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import queryString from 'query-string';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function encodeQueryString(object: any) {
  return queryString.stringify(object);
}

export function createMarkup(html: string | Node) {
  return {
    __html: DOMPurify.sanitize(html),
  };
}

// TODO fix any
export function getTableSorter(sorter: any) {
  let sortBy;
  let sortDirection;

  if (sorter.order) {
    sortBy = sorter.field;
    sortDirection = sorter.order.slice(0, -3); // remove 'end' [ascend, descend]
  }

  return { sortBy: sortBy, sortDirection: sortDirection };
}

export function numberFormat(
  value: number | undefined | null,
  decimalPlace?: number,
) {
  if (value === undefined || value === null) {
    return '-';
  }

  decimalPlace = decimalPlace ?? 2;
  let valueStr = value.toFixed(decimalPlace);
  valueStr = valueStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return valueStr;
}

export function dateFormat(
  date: Date | string | undefined,
  format?: 'date' | 'dateTime',
) {
  format ??= 'date';
  const formatDate = 'DD/MM/YYYY';
  const formatDateTime = 'DD/MM/YYYY HH:mm:ss';
  const displayFormat = format === 'date' ? formatDate : formatDateTime;
  // const DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSZ';

  if (date === undefined || date === null) {
    return '-';
  }
  if (typeof date === 'string') {
    const newDate = dayjs(date);
    return newDate.format(displayFormat);
  } else {
    let timeStyle: any;
    switch (format) {
      case 'date':
        timeStyle = undefined;
        break;
      case 'dateTime':
        timeStyle = 'short';
        break;
    }

    date = new Date(date);
    const dateStr = date.toLocaleString('en-GB', {
      // let dateStr = date.toLocaleString("en-GB", {
      // timeZone: "UTC",
      dateStyle: 'short',
      // timeStyle: format === "date" ? undefined : "short",
      timeStyle: timeStyle,
    });

    //remove comma
    return dateStr.replace(',', ' ');
  }
}
