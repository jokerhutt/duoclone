import { format } from "date-fns";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getCurrentMonth = () => monthNames[new Date().getMonth()].toUpperCase();
export const getJoinDate = (ts?: string) => ts ? format(new Date(ts), "MMMM yyyy") : "";