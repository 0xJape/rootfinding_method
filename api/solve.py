"""
Python API for Root Finding Methods - Vercel Serverless Function
This endpoint handles all root-finding calculations using the original Python algorithms.
"""

from http.server import BaseHTTPRequestHandler
import json
import math


class RootFindingMethods:
    """Collection of numerical methods for finding roots of equations."""
    
    @staticmethod
    def evaluate_function(func_type: str, x: float) -> float:
        """Evaluate the selected test function at x."""
        if func_type == "polynomial":
            # f(x) = x³ - x - 2
            return x**3 - x - 2
        elif func_type == "exponential":
            # f(x) = e^x - 3x
            return math.exp(x) - 3 * x
        elif func_type == "trigonometric":
            # f(x) = cos(x) - x
            return math.cos(x) - x
        elif func_type == "custom":
            # Will be handled separately with safe evaluation
            return 0
        else:
            raise ValueError(f"Unknown function type: {func_type}")
    
    @staticmethod
    def evaluate_derivative(func_type: str, x: float) -> float:
        """Evaluate the derivative of selected test function at x."""
        if func_type == "polynomial":
            # f'(x) = 3x² - 1
            return 3 * x**2 - 1
        elif func_type == "exponential":
            # f'(x) = e^x - 3
            return math.exp(x) - 3
        elif func_type == "trigonometric":
            # f'(x) = -sin(x) - 1
            return -math.sin(x) - 1
        else:
            raise ValueError(f"Unknown function type: {func_type}")
    
    @staticmethod
    def bisection(func_type: str, a: float, b: float, tol: float = 1e-6, max_iter: int = 100):
        """
        Bisection method for finding roots.
        Returns: dict with root, errors, iterations, and convergence data
        """
        f = lambda x: RootFindingMethods.evaluate_function(func_type, x)
        
        if f(a) * f(b) > 0:
            return {
                "success": False,
                "error": "f(a) and f(b) must have opposite signs. The interval must contain a root."
            }
        
        errors = []
        iterations_data = []
        
        for n in range(max_iter):
            c = (a + b) / 2.0
            fc = f(c)
            error = abs(b - a) / 2.0
            
            errors.append(error)
            iterations_data.append({
                "iteration": n + 1,
                "a": a,
                "b": b,
                "c": c,
                "f_c": fc,
                "error": error
            })
            
            if error < tol or abs(fc) < tol:
                return {
                    "success": True,
                    "root": c,
                    "iterations": n + 1,
                    "f_root": fc,
                    "errors": errors,
                    "iterations_data": iterations_data
                }
            
            if f(a) * fc < 0:
                b = c
            else:
                a = c
        
        c = (a + b) / 2.0
        return {
            "success": True,
            "root": c,
            "iterations": max_iter,
            "f_root": f(c),
            "errors": errors,
            "iterations_data": iterations_data,
            "warning": "Maximum iterations reached"
        }
    
    @staticmethod
    def newton_raphson(func_type: str, x0: float, tol: float = 1e-6, max_iter: int = 100):
        """
        Newton-Raphson method for finding roots.
        Returns: dict with root, errors, iterations, and convergence data
        """
        f = lambda x: RootFindingMethods.evaluate_function(func_type, x)
        df = lambda x: RootFindingMethods.evaluate_derivative(func_type, x)
        
        x = x0
        errors = []
        iterations_data = []
        
        for n in range(max_iter):
            fx = f(x)
            dfx = df(x)
            
            if abs(dfx) < 1e-12:
                return {
                    "success": False,
                    "error": f"Derivative too close to zero at x = {x}. Method may diverge."
                }
            
            x_new = x - fx / dfx
            error = abs(x_new - x)
            
            errors.append(error)
            iterations_data.append({
                "iteration": n + 1,
                "x": x,
                "f_x": fx,
                "df_x": dfx,
                "x_new": x_new,
                "error": error
            })
            
            if error < tol or abs(fx) < tol:
                return {
                    "success": True,
                    "root": x_new,
                    "iterations": n + 1,
                    "f_root": f(x_new),
                    "errors": errors,
                    "iterations_data": iterations_data
                }
            
            x = x_new
        
        return {
            "success": True,
            "root": x,
            "iterations": max_iter,
            "f_root": f(x),
            "errors": errors,
            "iterations_data": iterations_data,
            "warning": "Maximum iterations reached"
        }
    
    @staticmethod
    def secant(func_type: str, x0: float, x1: float, tol: float = 1e-6, max_iter: int = 100):
        """
        Secant method for finding roots.
        Returns: dict with root, errors, iterations, and convergence data
        """
        f = lambda x: RootFindingMethods.evaluate_function(func_type, x)
        
        errors = []
        iterations_data = []
        
        for n in range(max_iter):
            fx0 = f(x0)
            fx1 = f(x1)
            
            if abs(fx1 - fx0) < 1e-12:
                return {
                    "success": False,
                    "error": f"Function values too close. Division by zero risk at x0={x0}, x1={x1}."
                }
            
            x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0)
            error = abs(x2 - x1)
            
            errors.append(error)
            iterations_data.append({
                "iteration": n + 1,
                "x0": x0,
                "x1": x1,
                "f_x0": fx0,
                "f_x1": fx1,
                "x2": x2,
                "error": error
            })
            
            if error < tol or abs(fx1) < tol:
                return {
                    "success": True,
                    "root": x2,
                    "iterations": n + 1,
                    "f_root": f(x2),
                    "errors": errors,
                    "iterations_data": iterations_data
                }
            
            x0, x1 = x1, x2
        
        return {
            "success": True,
            "root": x1,
            "iterations": max_iter,
            "f_root": f(x1),
            "errors": errors,
            "iterations_data": iterations_data,
            "warning": "Maximum iterations reached"
        }


def generate_function_points(func_type: str, x_min: float, x_max: float, num_points: int = 200):
    """Generate points for plotting the function."""
    points = []
    step = (x_max - x_min) / num_points
    
    for i in range(num_points + 1):
        x = x_min + i * step
        try:
            y = RootFindingMethods.evaluate_function(func_type, x)
            if not math.isnan(y) and not math.isinf(y):
                points.append({"x": x, "y": y})
        except:
            pass
    
    return points


class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))
        
        method = data.get('method', 'bisection')
        func_type = data.get('functionType', 'polynomial')
        tol = float(data.get('tolerance', 1e-6))
        max_iter = int(data.get('maxIterations', 100))
        
        result = {}
        
        try:
            if method == 'bisection':
                a = float(data.get('a', 1))
                b = float(data.get('b', 2))
                result = RootFindingMethods.bisection(func_type, a, b, tol, max_iter)
            
            elif method == 'newton':
                x0 = float(data.get('x0', 1.5))
                result = RootFindingMethods.newton_raphson(func_type, x0, tol, max_iter)
            
            elif method == 'secant':
                x0 = float(data.get('x0', 1))
                x1 = float(data.get('x1', 2))
                result = RootFindingMethods.secant(func_type, x0, x1, tol, max_iter)
            
            # Add function plot points
            x_min = float(data.get('plotXMin', -1))
            x_max = float(data.get('plotXMax', 3))
            result['functionPoints'] = generate_function_points(func_type, x_min, x_max)
            
        except Exception as e:
            result = {"success": False, "error": str(e)}
        
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(result).encode())
        return
