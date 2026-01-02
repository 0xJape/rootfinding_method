const algorithmInfo = {
  bisection: {
    title: 'Bisection Method',
    convergence: 'Linear',
    convergenceClass: 'convergence-linear',
    formula: 'c = (a + b) / 2',
    description: 'Repeatedly bisects the interval and selects the subinterval where the sign change occurs.',
    pros: ['Always converges (guaranteed)', 'Simple implementation', 'Robust and reliable'],
    cons: ['Slow convergence', 'Requires bracketing interval', 'Cannot find multiple roots'],
    complexity: 'O(log₂((b-a)/ε))',
  },
  newton: {
    title: 'Newton-Raphson Method',
    convergence: 'Quadratic',
    convergenceClass: 'convergence-quadratic',
    formula: "xₙ₊₁ = xₙ - f(xₙ)/f'(xₙ)",
    description: 'Uses tangent line approximation to iteratively approach the root.',
    pros: ['Very fast convergence', 'Quadratic near root', 'Efficient for smooth functions'],
    cons: ['Requires derivative', 'May diverge', 'Sensitive to initial guess'],
    complexity: 'O(log(log(1/ε)))',
  },
  secant: {
    title: 'Secant Method',
    convergence: 'Superlinear (φ ≈ 1.618)',
    convergenceClass: 'convergence-superlinear',
    formula: 'xₙ₊₁ = xₙ - f(xₙ)(xₙ - xₙ₋₁)/(f(xₙ) - f(xₙ₋₁))',
    description: 'Approximates derivative using finite differences from two previous points.',
    pros: ['No derivative needed', 'Faster than bisection', 'Good balance of speed/robustness'],
    cons: ['May diverge', 'Slower than Newton-Raphson', 'Needs two initial guesses'],
    complexity: 'O(log(1/ε)/log(φ))',
  },
};

export default function AlgorithmInfo({ method }) {
  const info = algorithmInfo[method];
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-3">{info.title}</h3>
      
      <div className="space-y-4">
        {/* Convergence Badge */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Convergence Rate:</span>
          <span className={`convergence-badge ${info.convergenceClass}`}>
            {info.convergence}
          </span>
        </div>

        {/* Formula */}
        <div>
          <span className="text-sm text-slate-500">Update Formula:</span>
          <div className="math-formula mt-1 text-sm">
            {info.formula}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600">{info.description}</p>

        {/* Pros & Cons */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-green-700 mb-2">✓ Pros</p>
            <ul className="text-xs text-slate-600 space-y-1">
              {info.pros.map((pro, i) => (
                <li key={i}>• {pro}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-red-700 mb-2">✗ Cons</p>
            <ul className="text-xs text-slate-600 space-y-1">
              {info.cons.map((con, i) => (
                <li key={i}>• {con}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Complexity */}
        <div className="pt-3 border-t border-slate-100">
          <span className="text-xs text-slate-400">Complexity: </span>
          <span className="text-xs font-mono text-slate-600">{info.complexity}</span>
        </div>
      </div>
    </div>
  );
}
