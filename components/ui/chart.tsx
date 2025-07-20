import {
  RadarChart as RechartsRadarChart,
  PolarGrid as RechartsPolarGrid,
  PolarAngleAxis as RechartsPolarAngleAxis,
  PolarRadiusAxis as RechartsPolarRadiusAxis,
  Radar as RechartsRadar,
  ResponsiveContainer as RechartsResponsiveContainer,
  Tooltip as RechartsTooltip,
  /* NEW ── line-chart primitives */
  LineChart as RechartsLineChart,
  Line as RechartsLine,
  /* NEW ── pie-chart primitives */
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell as RechartsCell,
} from "recharts"

import {
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Legend as RechartsLegend,
} from "recharts"

export const RadarChart = RechartsRadarChart
export const PolarGrid = RechartsPolarGrid
export const PolarAngleAxis = RechartsPolarAngleAxis
export const PolarRadiusAxis = RechartsPolarRadiusAxis
export const Radar = RechartsRadar
export const ResponsiveContainer = RechartsResponsiveContainer
export const Tooltip = RechartsTooltip

export const BarChart = RechartsBarChart
export const Bar = RechartsBar
export const XAxis = RechartsXAxis
export const YAxis = RechartsYAxis
export const CartesianGrid = RechartsCartesianGrid
export const Legend = RechartsLegend

// NEW ────────────────────────────────────────────────────────────────
//  Simple line-chart re-exports so other pages (e.g. /about) compile
export const LineChart = RechartsLineChart
export const Line = RechartsLine
// ────────────────────────────────────────────────────────────────────

// Pie-chart re-exports
export const PieChart = RechartsPieChart
export const Pie = RechartsPie
export const Cell = RechartsCell
