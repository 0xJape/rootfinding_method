import { useEffect } from 'react';

const defaultParams = {
  polynomial: { a: 1, b: 2, x0: 1.5, x1: 2 },
  exponential: { a: 1, b: 2, x0: 1.5, x1: 2 },
  trigonometric: { a: 0, b: 1, x0: 0.5, x1: 1 },
};

export default function ParameterInputs({ method, functionType, params, onChange }) {
  // Update default values when function changes
  useEffect(() => {
    const defaults = defaultParams[functionType];
    onChange(prev => ({
      ...prev,
      a: defaults.a,
      b: defaults.b,
      x0: defaults.x0,
      x1: defaults.x1,
    }));
  }, [functionType]);

  const handleChange = (key, value) => {
    onChange(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  return (
    <div className="space-y-4">
      {/* Method-specific parameters */}
      {method === 'bisection' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Interval a
            </label>
            <input
              type="number"
              step="0.1"
              value={params.a}
              onChange={(e) => handleChange('a', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Interval b
            </label>
            <input
              type="number"
              step="0.1"
              value={params.b}
              onChange={(e) => handleChange('b', e.target.value)}
            />
          </div>
        </div>
      )}

      {method === 'newton' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Initial Guess (x₀)
          </label>
          <input
            type="number"
            step="0.1"
            value={params.x0}
            onChange={(e) => handleChange('x0', e.target.value)}
          />
        </div>
      )}

      {method === 'secant' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Initial x₀
            </label>
            <input
              type="number"
              step="0.1"
              value={params.x0}
              onChange={(e) => handleChange('x0', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Initial x₁
            </label>
            <input
              type="number"
              step="0.1"
              value={params.x1}
              onChange={(e) => handleChange('x1', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Common parameters */}
      <div className="pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Tolerance
            </label>
            <select
              value={params.tolerance}
              onChange={(e) => handleChange('tolerance', e.target.value)}
            >
              <option value={1e-4}>10⁻⁴</option>
              <option value={1e-6}>10⁻⁶</option>
              <option value={1e-8}>10⁻⁸</option>
              <option value={1e-10}>10⁻¹⁰</option>
              <option value={1e-12}>10⁻¹²</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Max Iterations
            </label>
            <select
              value={params.maxIterations}
              onChange={(e) => handleChange('maxIterations', e.target.value)}
            >
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
              <option value={500}>500</option>
            </select>
          </div>
        </div>
      </div>

      {/* Help text */}
      <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600">
        {method === 'bisection' && (
          <p>💡 Ensure f(a) and f(b) have opposite signs for the interval to contain a root.</p>
        )}
        {method === 'newton' && (
          <p>💡 Choose an initial guess close to the expected root for faster convergence.</p>
        )}
        {method === 'secant' && (
          <p>💡 Two distinct initial guesses are needed. They should bracket the root ideally.</p>
        )}
      </div>
    </div>
  );
}
