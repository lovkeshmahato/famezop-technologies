import {
  Code, Layers, Sparkles, Smartphone, Globe, PenTool, ShoppingCart, Building2,
  Cloud, Shield, CheckCircle, RefreshCw, Link2, Database, Users, Rocket, Puzzle,
  HeartPulse, GraduationCap, Landmark, ShoppingBag, Factory, HardHat, Truck,
  HandHeart, Hotel, Building, Car, RadioTower, ShieldCheck, Clapperboard, Sprout,
  type LucideIcon,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  code: Code,
  layers: Layers,
  sparkles: Sparkles,
  smartphone: Smartphone,
  globe: Globe,
  "pen-tool": PenTool,
  "shopping-cart": ShoppingCart,
  "building-2": Building2,
  cloud: Cloud,
  shield: Shield,
  "check-circle": CheckCircle,
  "refresh-cw": RefreshCw,
  "link-2": Link2,
  database: Database,
  users: Users,
  rocket: Rocket,
  puzzle: Puzzle,
  "heart-pulse": HeartPulse,
  "graduation-cap": GraduationCap,
  landmark: Landmark,
  "shopping-bag": ShoppingBag,
  factory: Factory,
  "hard-hat": HardHat,
  truck: Truck,
  "hand-heart": HandHeart,
  hotel: Hotel,
  building: Building,
  car: Car,
  "radio-tower": RadioTower,
  "shield-check": ShieldCheck,
  clapperboard: Clapperboard,
  sprout: Sprout,
};

export function getIcon(key: string): LucideIcon {
  return iconMap[key] || Code;
}
