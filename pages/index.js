import { useState } from 'react';
import Head from 'next/head';
import MethodSelector from '../components/MethodSelector';
import FunctionSelector from '../components/FunctionSelector';
import ParameterInputs from '../components/ParameterInputs';
import ResultsDisplay from '../components/ResultsDisplay';
import ConvergenceChart from '../components/ConvergenceChart';
import FunctionPlot from '../components/FunctionPlot';
import IterationsTable from '../components/IterationsTable';
import AlgorithmInfo from '../components/AlgorithmInfo';
import Header from '../components/Header';

export default function Home() {
  const [method, setMethod] = useState('bisection');
  const [functionType, setFunctionType] = useState('polynomial');
  const [params, setParams] = useState({
    a: 1,
    b: 2,
    x0: 1.5,
    x1: 2,
    tolerance: 1e-6,
    maxIterations: 100,
  });
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSolve = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const requestBody = {
        method,
        functionType,
        tolerance: params.tolerance,
        maxIterations: params.maxIterations,
        a: params.a,
        b: params.b,
        x0: params.x0,
        x1: params.x1,
        plotXMin: functionType === 'trigonometric' ? -1 : 0,
        plotXMax: functionType === 'trigonometric' ? 2 : 3,
      };

      const response = await fetch('/api/solve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data);
      } else {
        setError(data.error || 'An error occurred');
        setResults(null);
      }
    } catch (err) {
      setError('Failed to connect to the solver. Please try again.');
      setResults(null);
    }
    
    setLoading(false);
  };

  const handleCompareAll = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const methods = ['bisection', 'newton', 'secant'];
      const allResults = {};
      
      for (const m of methods) {
        const requestBody = {
          method: m,
          functionType,
          tolerance: params.tolerance,
          maxIterations: params.maxIterations,
          a: params.a,
          b: params.b,
          x0: params.x0,
          x1: params.x1,
          plotXMin: functionType === 'trigonometric' ? -1 : 0,
          plotXMax: functionType === 'trigonometric' ? 2 : 3,
        };

        const response = await fetch('/api/solve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        allResults[m] = data;
      }
      
      setResults({ comparison: true, methods: allResults });
    } catch (err) {
      setError('Failed to compare methods. Please try again.');
    }
    
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Root Finding Methods | CVE 154 Project</title>
      </Head>

      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Introduction Section */}
          <section className="mb-8 bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">
              Interactive Root Finding Calculator
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Explore three fundamental numerical methods for finding roots of equations: 
              <strong> Bisection</strong>, <strong>Newton-Raphson</strong>, and <strong>Secant</strong> methods. 
              Select a test function, configure parameters, and visualize the convergence behavior in real-time.
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Controls */}
            <div className="lg:col-span-1 space-y-6">
              {/* Method Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">1</span>
                  Select Method
                </h3>
                <MethodSelector selected={method} onSelect={setMethod} />
              </div>

              {/* Function Selection */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">2</span>
                  Select Function
                </h3>
                <FunctionSelector selected={functionType} onSelect={setFunctionType} />
              </div>

              {/* Parameter Inputs */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">3</span>
                  Set Parameters
                </h3>
                <ParameterInputs 
                  method={method}
                  functionType={functionType}
                  params={params} 
                  onChange={setParams} 
                />
              </div>

              {/* Solve Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleSolve}
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Computing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Find Root
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleCompareAll}
                  disabled={loading}
                  className="btn-secondary w-full"
                >
                  Compare All Methods
                </button>
              </div>

              {/* Algorithm Info */}
              <AlgorithmInfo method={method} />
            </div>

            {/* Right Panel - Results */}
            <div className="lg:col-span-2 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start">
                  <svg className="w-5 h-5 text-red-500 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-red-800">Error</h4>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {results && !results.comparison && (
                <>
                  <ResultsDisplay results={results} method={method} functionType={functionType} />
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Function Plot</h3>
                      <FunctionPlot 
                        functionPoints={results.functionPoints} 
                        root={results.root}
                        functionType={functionType}
                      />
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-4">Convergence Analysis</h3>
                      <ConvergenceChart errors={results.errors} method={method} />
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Iteration Details</h3>
                    <IterationsTable data={results.iterations_data} method={method} />
                  </div>
                </>
              )}

              {results && results.comparison && (
                <ComparisonResults results={results.methods} functionType={functionType} />
              )}

              {!results && !error && (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                  <svg className="w-16 h-16 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-xl font-semibold text-slate-600 mb-2">Ready to Calculate</h3>
                  <p className="text-slate-500">Select a method and function, then click "Find Root" to see results.</p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-slate-400">
              CVE 154 Term Project - Root Finding Numerical Methods
            </p>
            <p className="text-slate-500 text-sm mt-2">
              December 2025 | Block B15.2
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

// Comparison Results Component
function ComparisonResults({ results, functionType }) {
  const methods = ['bisection', 'newton', 'secant'];
  const methodNames = {
    bisection: 'Bisection',
    newton: 'Newton-Raphson',
    secant: 'Secant'
  };
  const methodColors = {
    bisection: '#3b82f6',
    newton: '#ef4444',
    secant: '#22c55e'
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {methods.map(m => (
          <div key={m} className="bg-white rounded-2xl shadow-lg p-6 border-t-4" style={{ borderTopColor: methodColors[m] }}>
            <h4 className="font-semibold text-slate-800 mb-3">{methodNames[m]}</h4>
            {results[m]?.success ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Root:</span>
                  <span className="font-mono font-semibold">{results[m].root?.toFixed(10)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Iterations:</span>
                  <span className="font-semibold">{results[m].iterations}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">f(root):</span>
                  <span className="font-mono text-xs">{results[m].f_root?.toExponential(2)}</span>
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-sm">{results[m]?.error || 'Failed'}</p>
            )}
          </div>
        ))}
      </div>

      {/* Combined Convergence Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Convergence Comparison</h3>
        <ComparisonChart results={results} />
      </div>
    </div>
  );
}

// Combined chart for comparison
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ComparisonChart({ results }) {
  // Prepare data for comparison chart
  const maxLen = Math.max(
    results.bisection?.errors?.length || 0,
    results.newton?.errors?.length || 0,
    results.secant?.errors?.length || 0
  );
  
  const data = [];
  for (let i = 0; i < maxLen; i++) {
    data.push({
      iteration: i + 1,
      bisection: results.bisection?.errors?.[i],
      newton: results.newton?.errors?.[i],
      secant: results.secant?.errors?.[i],
    });
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey="iteration" label={{ value: 'Iteration', position: 'bottom', offset: -5 }} />
        <YAxis 
          scale="log" 
          domain={['auto', 'auto']}
          label={{ value: 'Error (log scale)', angle: -90, position: 'insideLeft' }}
          tickFormatter={(v) => v?.toExponential(0)}
        />
        <Tooltip 
          formatter={(value) => value?.toExponential(4)}
          labelFormatter={(label) => `Iteration ${label}`}
        />
        <Legend />
        <Line type="monotone" dataKey="bisection" stroke="#3b82f6" name="Bisection" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="newton" stroke="#ef4444" name="Newton-Raphson" dot={false} strokeWidth={2} />
        <Line type="monotone" dataKey="secant" stroke="#22c55e" name="Secant" dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
