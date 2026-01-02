import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const functionTitles = {
  polynomial: 'f(x) = x³ - x - 2',
  exponential: 'f(x) = eˣ - 3x',
  trigonometric: 'f(x) = cos(x) - x',
};

export default function FunctionPlot({ functionPoints, root, functionType }) {
  if (!functionPoints || functionPoints.length === 0) return null;

  return (
    <div>
      <p className="text-sm text-slate-500 mb-2 font-mono">{functionTitles[functionType]}</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={functionPoints} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="x" 
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(v) => v.toFixed(1)}
            label={{ value: 'x', position: 'bottom', offset: 0 }}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            domain={['auto', 'auto']}
            tickFormatter={(v) => v.toFixed(1)}
            label={{ value: 'f(x)', angle: -90, position: 'insideLeft', offset: 10 }}
            tick={{ fontSize: 11 }}
          />
          <Tooltip 
            formatter={(value, name) => [value.toFixed(6), name === 'y' ? 'f(x)' : name]}
            labelFormatter={(label) => `x = ${parseFloat(label).toFixed(4)}`}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}
          />
          {/* Zero line */}
          <ReferenceLine y={0} stroke="#64748b" strokeDasharray="5 5" />
          {/* Root marker */}
          {root && (
            <ReferenceLine 
              x={root} 
              stroke="#ef4444" 
              strokeDasharray="5 5" 
              label={{ value: `Root: ${root.toFixed(4)}`, fill: '#ef4444', fontSize: 11 }}
            />
          )}
          <Line 
            type="monotone" 
            dataKey="y" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
