import {
  FaBasketShopping, FaBookOpen, FaBriefcase, FaBuildingColumns, FaBus,
  FaGamepad, FaGift, FaHeartPulse, FaHouse, FaMoneyBillTrendUp,
  FaReceipt, FaSackDollar, FaStore, FaTags, FaUtensils
} from "react-icons/fa6";

export const expenseCategories = [
  { name: "Food", icon: FaUtensils, color: "#ef8d53" },
  { name: "Games", icon: FaGamepad, color: "#7b6ee8" },
  { name: "Travel", icon: FaBus, color: "#e5b557" },
  { name: "Shopping", icon: FaBasketShopping, color: "#d66fa3" },
  { name: "Bills", icon: FaReceipt, color: "#5795d7" },
  { name: "Rent", icon: FaHouse, color: "#3ba47c" },
  { name: "Health", icon: FaHeartPulse, color: "#e45f5f" },
  { name: "Education", icon: FaBookOpen, color: "#4f83cc" },
  { name: "Gifts", icon: FaGift, color: "#b56dd1" },
  { name: "Other", icon: FaTags, color: "#7d8b84" }
];

export const incomeCategories = [
  { name: "Salary", icon: FaSackDollar, color: "#0d8b61" },
  { name: "Freelance", icon: FaBriefcase, color: "#5795d7" },
  { name: "Business", icon: FaStore, color: "#e5a73f" },
  { name: "Investments", icon: FaMoneyBillTrendUp, color: "#7b6ee8" },
  { name: "Bank interest", icon: FaBuildingColumns, color: "#4f83cc" },
  { name: "Other", icon: FaTags, color: "#7d8b84" }
];

export const allCategories = [...expenseCategories, ...incomeCategories];

export function getCategory(name) {
  return allCategories.find(category => category.name === name) || { name: name || "Other", icon: FaTags, color: "#7d8b84" };
}

export function CategoryIcon({ name, className = "" }) {
  const category = getCategory(name);
  const Icon = category.icon;
  return <span className={`category-react-icon ${className}`} style={{ background: `${category.color}1c`, color: category.color }}><Icon /></span>;
}
