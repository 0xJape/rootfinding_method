const functions = [
  {
    id: 'polynomial',
    name: 'Polynomial',
    formula: 'f(x) = x³ - x - 2',
    derivative: "f'(x) = 3x² - 1",
    root: '≈ 1.5214',
    description: 'Classic cubic polynomial',
  },
  {
    id: 'exponential',
    name: 'Exponential',
    formula: 'f(x) = eˣ - 3x',
    derivative: "f'(x) = eˣ - 3",
    root: '≈ 1.5121',
    description: 'Exponential function',
  },
  {
    id: 'trigonometric',
    name: 'Trigonometric',
    formula: 'f(x) = cos(x) - x',
    derivative: "f'(x) = -sin(x) - 1",
    root: '≈ 0.7391',
    description: 'Transcendental equation',
  },
];

export default function FunctionSelector({ selected, onSelect }) {
  return (
    <div className="space-y-3">
      {functions.map((func) => (
        <button
          key={func.id}
          onClick={() => onSelect(func.id)}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
            selected === func.id
              ? 'bg-slate-100 border-slate-500 ring-2 ring-slate-200'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="font-semibold text-slate-800">{func.name}</p>
              <p className="font-mono text-sm text-slate-700 mt-1 bg-white px-2 py-1 rounded inline-block">
                {func.formula}
              </p>
              <p className="text-xs text-slate-500 mt-2">{func.description}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Root</span>
              <p className="font-mono text-sm font-semibold text-slate-700">{func.root}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
