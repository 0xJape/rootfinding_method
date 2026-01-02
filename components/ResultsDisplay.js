const methodNames = {
  bisection: 'Bisection Method',
  newton: 'Newton-Raphson Method',
  secant: 'Secant Method',
};

const functionFormulas = {
  polynomial: 'f(x) = x³ - x - 2',
  exponential: 'f(x) = eˣ - 3x',
  trigonometric: 'f(x) = cos(x) - x',
};

export default function ResultsDisplay({ results, method, functionType }) {
  if (!results) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">Results</h3>
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          ✓ Converged
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Root */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
          <p className="text-sm text-blue-600 font-medium mb-1">Root Found</p>
          <p className="text-2xl font-bold text-blue-900 font-mono">
            {results.root?.toFixed(10)}
          </p>
        </div>

        {/* Iterations */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4">
          <p className="text-sm text-amber-600 font-medium mb-1">Iterations</p>
          <p className="text-2xl font-bold text-amber-900">
            {results.iterations}
          </p>
        </div>

        {/* f(root) */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
          <p className="text-sm text-green-600 font-medium mb-1">f(root)</p>
          <p className="text-lg font-bold text-green-900 font-mono">
            {results.f_root?.toExponential(4)}
          </p>
        </div>

        {/* Final Error */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
          <p className="text-sm text-purple-600 font-medium mb-1">Final Error</p>
          <p className="text-lg font-bold text-purple-900 font-mono">
            {results.errors?.[results.errors.length - 1]?.toExponential(4)}
          </p>
        </div>
      </div>

      {/* Method and Function Info */}
      <div className="flex flex-wrap gap-3 text-sm">
        <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-700">
          <strong>Method:</strong> {methodNames[method]}
        </span>
        <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-700 font-mono">
          {functionFormulas[functionType]}
        </span>
      </div>

      {results.warning && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm">
          ⚠️ {results.warning}
        </div>
      )}
    </div>
  );
}
