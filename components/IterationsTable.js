import { useState } from 'react';

export default function IterationsTable({ data, method }) {
  const [expanded, setExpanded] = useState(false);
  
  if (!data || data.length === 0) return null;

  const displayData = expanded ? data : data.slice(0, 10);
  const hasMore = data.length > 10;

  const getColumns = () => {
    switch (method) {
      case 'bisection':
        return ['iteration', 'a', 'b', 'c', 'f_c', 'error'];
      case 'newton':
        return ['iteration', 'x', 'f_x', 'df_x', 'x_new', 'error'];
      case 'secant':
        return ['iteration', 'x0', 'x1', 'f_x1', 'x2', 'error'];
      default:
        return [];
    }
  };

  const getColumnLabels = () => {
    switch (method) {
      case 'bisection':
        return { iteration: 'n', a: 'a', b: 'b', c: 'c (midpoint)', f_c: 'f(c)', error: 'Error' };
      case 'newton':
        return { iteration: 'n', x: 'xₙ', f_x: 'f(xₙ)', df_x: "f'(xₙ)", x_new: 'xₙ₊₁', error: 'Error' };
      case 'secant':
        return { iteration: 'n', x0: 'xₙ₋₁', x1: 'xₙ', f_x1: 'f(xₙ)', x2: 'xₙ₊₁', error: 'Error' };
      default:
        return {};
    }
  };

  const columns = getColumns();
  const labels = getColumnLabels();

  const formatValue = (col, value) => {
    if (col === 'iteration') return value;
    if (col === 'error') return value?.toExponential(4);
    return typeof value === 'number' ? value.toFixed(8) : value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="results-table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} className="whitespace-nowrap">{labels[col]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, idx) => (
            <tr key={idx} className={idx === displayData.length - 1 ? 'bg-green-50' : ''}>
              {columns.map(col => (
                <td key={col} className="font-mono text-xs whitespace-nowrap">
                  {formatValue(col, row[col])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          {expanded ? (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Show less
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Show all {data.length} iterations
            </>
          )}
        </button>
      )}
    </div>
  );
}
