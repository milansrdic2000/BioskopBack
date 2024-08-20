import { format, parse } from "date-fns";

export function formatDate(date: Date | undefined): string {
  if (!date) return "";
  return format(date.toDateString(), "yyyy-MM-dd");
}
export function formatDateTime(date: Date | undefined): string {
  if (!date) return "";
  return format(date, "yyyy-MM-dd HH:mm:ss");
}
export function parseDate(date: string | undefined): Date | null {
  if (!date) return null;
  return parse(date, "dd-MMM-yyyy", new Date());
}
