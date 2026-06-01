import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { getAnalytics } from '../lib/appwrite';

const DOSHA_COLORS = { Vata: '#7B9E87', Pitta: '#C8773A', Kapha: '#5B7FA6' };

function StatCard({ label, value, sub, color }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6">
      <p className="text-xs tracking-widest uppercase opacity-40 mb-2">{label}</p>
      <p className="font-display text-4xl font-light mb-1" style={{ color: color || '#C9A84C' }}>{value}</p>
      {sub && <p className="text-xs opacity-40">{sub}</p>}
    </motion.div>
  );
}

export default function Analytics() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalytics().then(setData);
  }, []);

  if (!data) return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-8 h-8 rounded-full border-t-2" style={{ borderColor: '#C9A84C' }} />
    </div>
  );

  const pieData = Object.entries(data.distribution).map(([name, value]) => ({ name, value }));
  const barData = Object.entries(data.distribution).map(([name, value]) => ({ name, value }));

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-10">
          <p className="text-xs tracking-[0.4em] uppercase opacity-40 mb-2">Admin · Hidden Route</p>
          <h1 className="font-display text-5xl font-light mb-2" style={{ color: '#C9A84C' }}>Analytics</h1>
          <p className="text-sm opacity-40 font-light">Assessment data &amp; prediction insights</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total Assessments" value={data.total} sub="All time" />
          <StatCard label="Avg Confidence" value={`${Math.round(data.avgConfidence * 100)}%`} sub="Model accuracy" color="#7B9E87" />
          <StatCard label="Most Common"
            value={Object.entries(data.distribution).sort((a, b) => b[1] - a[1])[0]?.[0]}
            sub="Dominant dosha" color="#C8773A" />
          <StatCard label="Least Common"
            value={Object.entries(data.distribution).sort((a, b) => a[1] - b[1])[0]?.[0]}
            sub="Rare constitution" color="#5B7FA6" />
        </div>

        {/* Charts row */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Dosha Distribution Bar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6">
            <p className="text-xs tracking-widest uppercase opacity-40 mb-4">Dosha Distribution</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} barSize={40}>
                <XAxis dataKey="name" tick={{ fill: 'rgba(245,240,232,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(245,240,232,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: '#1A1510', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12 }}
                  labelStyle={{ color: '#C9A84C' }} itemStyle={{ color: 'rgba(245,240,232,0.7)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {barData.map((entry) => (
                    <Cell key={entry.name} fill={DOSHA_COLORS[entry.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie Chart */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6">
            <p className="text-xs tracking-widest uppercase opacity-40 mb-4">Distribution Share</p>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="60%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                    dataKey="value" paddingAngle={3}>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={DOSHA_COLORS[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ background: '#1A1510', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12 }}
                    labelStyle={{ color: '#C9A84C' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {pieData.map(entry => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: DOSHA_COLORS[entry.name] }} />
                    <div>
                      <p className="text-sm font-medium" style={{ color: DOSHA_COLORS[entry.name] }}>{entry.name}</p>
                      <p className="text-xs opacity-40">{entry.value} assessments</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Trend line */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="glass rounded-2xl p-6">
          <p className="text-xs tracking-widest uppercase opacity-40 mb-4">7-Day Assessment Trend</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={data.trends}>
              <XAxis dataKey="day" tick={{ fill: 'rgba(245,240,232,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(245,240,232,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1A1510', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 12 }}
                labelStyle={{ color: '#C9A84C' }} />
              <Line type="monotone" dataKey="count" stroke="#C9A84C" strokeWidth={2}
                dot={{ fill: '#C9A84C', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <p className="text-center text-xs opacity-20 mt-6">
          Data stored anonymously · No personal information collected
        </p>
      </div>
    </div>
  );
}
