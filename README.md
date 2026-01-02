# CVE 154 Root Finding Methods - Web Application

Interactive web application for visualizing and comparing root-finding numerical methods.

## 🚀 Live Demo

Deploy this project to Vercel to see it live!

## 📋 Features

- **Three Numerical Methods**: Bisection, Newton-Raphson, and Secant
- **Interactive UI**: Select functions, adjust parameters in real-time
- **Visualizations**: Function plots and convergence charts
- **Comparison Mode**: Compare all three methods side-by-side
- **Detailed Iteration Tables**: See step-by-step calculations
- **Python Backend**: Actual calculations done in Python (Vercel serverless functions)

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Charts**: Recharts
- **Backend**: Python (Vercel Serverless Functions)
- **Deployment**: Vercel

## 📦 Installation

### Local Development

1. Navigate to the web directory:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📁 Project Structure

```
web/
├── api/
│   └── solve.py          # Python serverless function (root-finding algorithms)
├── components/
│   ├── Header.js
│   ├── MethodSelector.js
│   ├── FunctionSelector.js
│   ├── ParameterInputs.js
│   ├── ResultsDisplay.js
│   ├── ConvergenceChart.js
│   ├── FunctionPlot.js
│   ├── IterationsTable.js
│   └── AlgorithmInfo.js
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js          # Main application page
├── styles/
│   └── globals.css       # Tailwind CSS styles
├── package.json
├── vercel.json           # Vercel configuration
└── README.md
```

## 🧮 Test Functions

| Function | Formula | Root |
|----------|---------|------|
| Polynomial | f(x) = x³ - x - 2 | ≈ 1.5214 |
| Exponential | f(x) = eˣ - 3x | ≈ 1.5121 |
| Trigonometric | f(x) = cos(x) - x | ≈ 0.7391 |

## 📊 Algorithm Comparison

| Method | Convergence | Pros | Cons |
|--------|-------------|------|------|
| Bisection | Linear O(n) | Always converges | Slow |
| Newton-Raphson | Quadratic O(n²) | Very fast | Needs derivative |
| Secant | Superlinear O(φⁿ) | No derivative | May diverge |

## 🎓 Course Information

- **Course**: CVE 154 - Numerical Methods
- **Project**: Root Finding Algorithms
- **Author**: Sweet Heart A. Torrado
- **Block**: B15.2
- **Date**: December 2025

## 📝 License

Educational use only - CVE 154 Term Project
