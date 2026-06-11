export const money = value => `Rs ${Number(value || 0).toLocaleString("en-IN")}`;

export const dateText = value => value
  ? new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
  : "No due date";

export const initials = name => name
  .split(" ")
  .map(word => word[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();
