import {
  LayoutDashboard,
  Rocket,
  Sprout,
  Palette,
  Waves,
  Sparkles,
  MessageSquare,
  StickyNote,
  Music,
  Calendar,
  Image,
  Settings,
  LayoutGrid,
  Home,
  BarChart3,
  User,
  Box,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Rocket,
  Sprout,
  Palette,
  Waves,
  Sparkles,
  MessageSquare,
  StickyNote,
  Music,
  Calendar,
  Image,
  Settings,
  LayoutGrid,
  Home,
  BarChart3,
  User,
  Box,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? LayoutGrid;
}
