import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const methodColors = {
  bisection: '#3b82f6',
  newton: '#ef4444',
  secant: '#22c55e',
};

export default function ConvergenceChart({ errors, method }) {
  if (!errors || errors.length === 0) return null;

  const data = errors.map((error, index) => ({
    iteration: index + 1,
    error: error,
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis 
          dataKey="iteration" 
          label={{ value: 'Iteration', position: 'bottom', offset: 0 }}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          scale="log"
          domain={['auto', 'auto']}
          tickFormatter={(value) => value.toExponential(0)}
          label={{ value: 'Error (log)', angle: -90, position: 'insideLeft', offset: 10 }}
          tick={{ fontSize: 11 }}
        />
        <Tooltip 
          formatter={(value) => [value.toExponential(6), 'Error']}
          labelFormatter={(label) => `Iteration ${label}`}
          contentStyle={{ 
            backgroundColor: 'white', 
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
        />
        <Line 
          type="monotone" 
          dataKey="error" 
          stroke={methodColors[method]} 
          strokeWidth={2}
          dot={{ fill: methodColors[method], strokeWidth: 0, r: 3 }}
          activeDot={{ r: 5, fill: methodColors[method] }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
