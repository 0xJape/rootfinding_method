const methods = [
  {
    id: 'bisection',
    name: 'Bisection',
    description: 'Guaranteed convergence, linear rate',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
      </svg>
    ),
    color: 'blue',
  },
  {
    id: 'newton',
    name: 'Newton-Raphson',
    description: 'Fastest, quadratic convergence',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'red',
  },
  {
    id: 'secant',
    name: 'Secant',
    description: 'No derivative needed, superlinear',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4v16" />
      </svg>
    ),
    color: 'green',
  },
];

const colorClasses = {
  blue: 'bg-blue-50 border-blue-200 text-blue-600',
  red: 'bg-red-50 border-red-200 text-red-600',
  green: 'bg-green-50 border-green-200 text-green-600',
};

const selectedClasses = {
  blue: 'bg-blue-100 border-blue-500 ring-2 ring-blue-200',
  red: 'bg-red-100 border-red-500 ring-2 ring-red-200',
  green: 'bg-green-100 border-green-500 ring-2 ring-green-200',
};

export default function MethodSelector({ selected, onSelect }) {
  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <button
          key={method.id}
          onClick={() => onSelect(method.id)}
          className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
            selected === method.id
              ? selectedClasses[method.color]
              : `${colorClasses[method.color]} hover:border-opacity-70`
          }`}
        >
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${selected === method.id ? 'bg-white/50' : 'bg-white'}`}>
              {method.icon}
            </div>
            <div className="ml-3">
              <p className="font-semibold text-slate-800">{method.name}</p>
              <p className="text-sm text-slate-500">{method.description}</p>
            </div>
            {selected === method.id && (
              <svg className="w-5 h-5 ml-auto text-current" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
