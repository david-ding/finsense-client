import dayjs from "dayjs";

export function formatDate(date: Date | string | number, format: string = "DD/MM/YYYY HH:mm:ss"): string {
  return dayjs(date).format(format);
}
