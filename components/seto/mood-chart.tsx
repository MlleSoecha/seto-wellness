'use client'

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

interface MoodEntry {
  date: string
  score: number
  phase: 'pre' | 'post'
}

interface MoodChartProps {
  data: MoodEntry[]
}

const moodLabels: Record<number, string> = {
  1: 'Très difficile',
  2: 'Difficile',
  3: 'Neutre',
  4: 'Bien',
  5: 'Très bien',
}

const moodColors: Record<number, string> = {
  1: '#E85555',
  2: '#E8843A',
  3: '#C4A842',
  4: '#5BAD72',
  5: '#3B9ED8',
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  const score = payload[0]?.value
  return (
    <div className="bg-[#1A2D45] border border-[#243B55] rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="text-[#8BA3BC] mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: moodColors[Math.round(p.value)] ?? '#E87040' }}>
          {p.name === 'pre' ? 'Avant' : 'Après'}: {moodLabels[Math.round(p.value)] ?? p.value}
        </p>
      ))}
    </div>
  )
}

export default function MoodChart({ data }: MoodChartProps) {
  // Group by date, separate pre/post
  const grouped: Record<string, { date: string; pre?: number; post?: number }> = {}
  for (const entry of data) {
    if (!grouped[entry.date]) grouped[entry.date] = { date: entry.date }
    grouped[entry.date][entry.phase] = entry.score
  }
  const chartData = Object.values(grouped).slice(-14)

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-40 text-[#5C7A9A] text-sm">
        Aucune donnée encore — commencez une session pour voir votre tendance.
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="preGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8BA3BC" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8BA3BC" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="postGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#E87040" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#E87040" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={{ fill: '#5C7A9A', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={d => d.slice(5)} // MM-DD
        />
        <YAxis
          domain={[1, 5]}
          ticks={[1, 2, 3, 4, 5]}
          tick={{ fill: '#5C7A9A', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={3} stroke="#243B55" strokeDasharray="4 4" />
        <Area
          type="monotone"
          dataKey="pre"
          name="pre"
          stroke="#8BA3BC"
          strokeWidth={2}
          fill="url(#preGrad)"
          dot={{ fill: '#8BA3BC', r: 3, strokeWidth: 0 }}
          connectNulls
        />
        <Area
          type="monotone"
          dataKey="post"
          name="post"
          stroke="#E87040"
          strokeWidth={2}
          fill="url(#postGrad)"
          dot={{ fill: '#E87040', r: 3, strokeWidth: 0 }}
          connectNulls
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
