/**
 * Root Finding Methods API - JavaScript implementation for local development
 * This mirrors the Python implementation for use with Next.js dev server
 */

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { method, functionType, tolerance = 1e-6, maxIterations = 100, a, b, x0, x1, plotXMin = 0, plotXMax = 3 } = req.body;

  let result;

  try {
    switch (method) {
      case 'bisection':
        result = bisection(functionType, parseFloat(a), parseFloat(b), parseFloat(tolerance), parseInt(maxIterations));
        break;
      case 'newton':
        result = newtonRaphson(functionType, parseFloat(x0), parseFloat(tolerance), parseInt(maxIterations));
        break;
      case 'secant':
        result = secant(functionType, parseFloat(x0), parseFloat(x1), parseFloat(tolerance), parseInt(maxIterations));
        break;
      default:
        return res.status(400).json({ success: false, error: 'Unknown method' });
    }

    // Add function plot points
    result.functionPoints = generateFunctionPoints(functionType, parseFloat(plotXMin), parseFloat(plotXMax));

    return res.status(200).json(result);
  } catch (error) {
    return res.status(200).json({ success: false, error: error.message });
  }
}

// Evaluate test functions
function evaluateFunction(funcType, x) {
  switch (funcType) {
    case 'polynomial':
      // f(x) = x³ - x - 2
      return Math.pow(x, 3) - x - 2;
    case 'exponential':
      // f(x) = e^x - 3x
      return Math.exp(x) - 3 * x;
    case 'trigonometric':
      // f(x) = cos(x) - x
      return Math.cos(x) - x;
    default:
      throw new Error(`Unknown function type: ${funcType}`);
  }
}

// Evaluate derivatives
function evaluateDerivative(funcType, x) {
  switch (funcType) {
    case 'polynomial':
      // f'(x) = 3x² - 1
      return 3 * Math.pow(x, 2) - 1;
    case 'exponential':
      // f'(x) = e^x - 3
      return Math.exp(x) - 3;
    case 'trigonometric':
      // f'(x) = -sin(x) - 1
      return -Math.sin(x) - 1;
    default:
      throw new Error(`Unknown function type: ${funcType}`);
  }
}

// Bisection Method
function bisection(funcType, a, b, tol, maxIter) {
  const f = (x) => evaluateFunction(funcType, x);

  if (f(a) * f(b) > 0) {
    return {
      success: false,
      error: 'f(a) and f(b) must have opposite signs. The interval must contain a root.',
    };
  }

  const errors = [];
  const iterationsData = [];

  for (let n = 0; n < maxIter; n++) {
    const c = (a + b) / 2;
    const fc = f(c);
    const error = Math.abs(b - a) / 2;

    errors.push(error);
    iterationsData.push({
      iteration: n + 1,
      a: a,
      b: b,
      c: c,
      f_c: fc,
      error: error,
    });

    if (error < tol || Math.abs(fc) < tol) {
      return {
        success: true,
        root: c,
        iterations: n + 1,
        f_root: fc,
        errors: errors,
        iterations_data: iterationsData,
      };
    }

    if (f(a) * fc < 0) {
      b = c;
    } else {
      a = c;
    }
  }

  const c = (a + b) / 2;
  return {
    success: true,
    root: c,
    iterations: maxIter,
    f_root: f(c),
    errors: errors,
    iterations_data: iterationsData,
    warning: 'Maximum iterations reached',
  };
}

// Newton-Raphson Method
function newtonRaphson(funcType, x0, tol, maxIter) {
  const f = (x) => evaluateFunction(funcType, x);
  const df = (x) => evaluateDerivative(funcType, x);

  let x = x0;
  const errors = [];
  const iterationsData = [];

  for (let n = 0; n < maxIter; n++) {
    const fx = f(x);
    const dfx = df(x);

    if (Math.abs(dfx) < 1e-12) {
      return {
        success: false,
        error: `Derivative too close to zero at x = ${x}. Method may diverge.`,
      };
    }

    const xNew = x - fx / dfx;
    const error = Math.abs(xNew - x);

    errors.push(error);
    iterationsData.push({
      iteration: n + 1,
      x: x,
      f_x: fx,
      df_x: dfx,
      x_new: xNew,
      error: error,
    });

    if (error < tol || Math.abs(fx) < tol) {
      return {
        success: true,
        root: xNew,
        iterations: n + 1,
        f_root: f(xNew),
        errors: errors,
        iterations_data: iterationsData,
      };
    }

    x = xNew;
  }

  return {
    success: true,
    root: x,
    iterations: maxIter,
    f_root: f(x),
    errors: errors,
    iterations_data: iterationsData,
    warning: 'Maximum iterations reached',
  };
}

// Secant Method
function secant(funcType, x0, x1, tol, maxIter) {
  const f = (x) => evaluateFunction(funcType, x);

  const errors = [];
  const iterationsData = [];

  for (let n = 0; n < maxIter; n++) {
    const fx0 = f(x0);
    const fx1 = f(x1);

    if (Math.abs(fx1 - fx0) < 1e-12) {
      return {
        success: false,
        error: `Function values too close. Division by zero risk at x0=${x0}, x1=${x1}.`,
      };
    }

    const x2 = x1 - (fx1 * (x1 - x0)) / (fx1 - fx0);
    const error = Math.abs(x2 - x1);

    errors.push(error);
    iterationsData.push({
      iteration: n + 1,
      x0: x0,
      x1: x1,
      f_x0: fx0,
      f_x1: fx1,
      x2: x2,
      error: error,
    });

    if (error < tol || Math.abs(fx1) < tol) {
      return {
        success: true,
        root: x2,
        iterations: n + 1,
        f_root: f(x2),
        errors: errors,
        iterations_data: iterationsData,
      };
    }

    x0 = x1;
    x1 = x2;
  }

  return {
    success: true,
    root: x1,
    iterations: maxIter,
    f_root: f(x1),
    errors: errors,
    iterations_data: iterationsData,
    warning: 'Maximum iterations reached',
  };
}

// Generate function points for plotting
function generateFunctionPoints(funcType, xMin, xMax, numPoints = 200) {
  const points = [];
  const step = (xMax - xMin) / numPoints;

  for (let i = 0; i <= numPoints; i++) {
    const x = xMin + i * step;
    try {
      const y = evaluateFunction(funcType, x);
      if (!isNaN(y) && isFinite(y)) {
        points.push({ x, y });
      }
    } catch {
      // Skip invalid points
    }
  }

  return points;
}
