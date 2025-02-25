import { Preset } from "@/types";

export const formulas: Preset[] = [
    {
        name: "Pythagorean Theorem",
        description:
            "Calculates the length of the hypotenuse (c) of a right triangle given the lengths of the other two sides (a and b). \n\n**Formula:** c² = a² + b² or c = √(a² + b²)\n\n**Units:** a, b, and c should all be in the same unit of length (e.g., meters, feet, inches). The theorem doesn't inherently specify a unit, but consistency is crucial.\n\n**Why it works:** This theorem is a fundamental concept in Euclidean geometry relating the sides of a right triangle. It's based on the relationship between the areas of squares built on the sides of the triangle.\n\n**Example:** If a = 3 and b = 4, then c = √(3² + 4²) = √(9 + 16) = √25 = 5.",
        categories: ["math", "geometry"],
        inputVariables: ["a", "b"],
        calculators: [
            {
                latex: "c=\\sqrt{a^2+b^2}",
                preview: "c = sqrt(a² + b²)",
            },
        ],
    },
    {
        name: "Area of a Circle",
        description:
            "Calculates the area (A) of a circle given its radius (r).\n\n**Formula:** A = πr²\n\n**Units:** r should be in a unit of length (e.g., meters, feet). A will be in the square of that unit (e.g., square meters, square feet).\n\n**Why it works:** This formula is derived from geometric principles and the definition of π (the ratio of a circle's circumference to its diameter).\n\n**Example:** If r = 5 meters, then A = π * (5 m)² ≈ 78.54 m².",
        categories: ["math", "geometry"],
        inputVariables: ["r"],
        calculators: [
            {
                latex: "A=\\pi r^2",
                preview: "A = πr²",
            },
        ],
    },
    {
        name: "Area of a Rectangle",
        description:
            "Calculates the area (A) of a rectangle given its length (l) and width (w).\n\n**Formula:** A = lw\n\n**Units:** l and w should be in the same unit of length. A will be in the square of that unit.\n\n**Why it works:**  The area of a rectangle represents the space it occupies and is found by multiplying its length and width.\n\n**Example:** If l = 5 and w = 3, then A = 5 * 3 = 15.",
        categories: ["math", "geometry"],
        inputVariables: ["l", "w"],
        calculators: [
            {
                latex: "A=lw",
                preview: "A = lw",
            },
        ],
    },
    {
        name: "Volume of a Sphere",
        description:
            "Calculates the volume (V) of a sphere given its radius (r).\n\n**Formula:** V = (4/3)πr³\n\n**Units:** r should be in a unit of length. V will be in the cube of that unit.\n\n**Why it works:** This formula is derived using calculus and represents the 3-dimensional space enclosed by the sphere.\n\n**Example:** If r = 2, then V = (4/3)π * 2³ ≈ 33.51.",
        categories: ["math", "geometry"],
        inputVariables: ["r"],
        calculators: [
            {
                latex: "V=\\frac{4}{3}\\pi r^3",
                preview: "V = (4/3)πr³",
            },
        ],
    },
    {
        name: "Slope of a Line",
        description:
            "Calculates the slope (m) of a line given two points (x₁, y₁) and (x₂, y₂).\n\n**Formula:** m = (y₂ - y₁) / (x₂ - x₁)\n\n**Units:** The slope is a dimensionless quantity.\n\n**Why it works:** The slope represents the rate of change of the y-value with respect to the x-value. It indicates the steepness and direction of the line.\n\n**Example:** If (x₁, y₁) = (1, 2) and (x₂, y₂) = (4, 6), then m = (6 - 2) / (4 - 1) = 4/3.",
        categories: ["math", "algebra"],
        inputVariables: ["x_1", "y_1", "x_2", "y_2"],
        calculators: [
            {
                latex: "m=\\frac{y_2-y_1}{x_2-x_1}",
                preview: "m = (y₂ - y₁) / (x₂ - x₁)",
            },
        ],
    },
    {
        name: "Quadratic Formula",
        description:
            "Solves for x in a quadratic equation of the form ax² + bx + c = 0.\n\n**Formula:** x = (-b ± √(b² - 4ac)) / 2a\n\n**Units:** x will have the same units as implied by the coefficients a, b, and c.\n\n**Why it works:** This formula is derived by completing the square and provides the solutions (roots) of any quadratic equation.\n\n**Example:** For the equation 2x² + 5x - 3 = 0, a = 2, b = 5, and c = -3.  x = (-5 ± √(5² - 4*2*(-3))) / (2*2) = (-5 ± √49) / 4. Thus x = 1/2 or x = -3.",
        categories: ["math", "algebra"],
        inputVariables: ["a", "b", "c"],
        calculators: [
            {
                latex: "x=\\frac{-b+\\sqrt{b^2-4ac}}{2a}",
                preview: "x = (-b ± sqrt(b² - 4ac)) / 2a",
            },
        ],
    },
    {
        name: "Mean",
        description:
            "Calculates the arithmetic mean (average) of a set of numbers.\n\n**Formula:** Mean = (Sum of all numbers) / (Number of numbers)\n\n**Units:** The mean will have the same units as the numbers in the set.\n\n**Why it works:** The mean is a measure of central tendency, representing the typical value of a dataset.\n\n**Example:** For the numbers 2, 4, 6, 8, 10, the mean is (2+4+6+8+10)/5 = 6.",
        categories: ["math", "statistics"],
        inputVariables: ["A"],
        calculators: [
            {
                latex: "m = \\operatorname{mean}(A)",
                preview: "mean = (Sum of all numbers) / (Number of numbers)",
            },
        ],
    },
    {
        name: "Standard Deviation",
        description:
            "Calculates the standard deviation of a sample, a measure of the spread or dispersion of a set of numbers.\n\n**Formula:** s = sqrt[ Σ(xᵢ - x̄)² / (n - 1) ] where xᵢ are individual values, x̄ is the sample mean, and n is the sample size.\n\n**Units:** The standard deviation has the same units as the data values.\n\n**Why it works:** The standard deviation quantifies how much the individual data points typically deviate from the mean. A higher standard deviation indicates greater variability.\n\n**Example:** For the numbers 2, 4, 6, 8, 10 (sample), the standard deviation is approximately 3.16.",
        categories: ["math", "statistics"],
        inputVariables: ["A"],
        calculators: [
            {
                latex: "s = \\operatorname{std}(A)",
                preview: "s = sqrt[ Σ(xᵢ - x̄)² / (n - 1) ]",
            },
        ],
    },
    {
        name: "Derivative (Power Rule)",
        description:
            "Calculates the derivative of a function of the form f(x) = xⁿ.\n\n**Formula:** f'(x) = nxⁿ⁻¹\n\n**Units:** The derivative's units depend on the original function. If f(x) represents distance over time, f'(x) would be velocity (distance/time).\n\n**Why it works:** This rule is a fundamental concept in calculus, derived from the definition of the derivative as a limit. It describes the instantaneous rate of change of the function.\n\n**Example:** If f(x) = x³, then f'(x) = 3x².",
        categories: ["math", "calculus"],
        inputVariables: ["n"],
        calculators: [
            {
                latex: "f'(x) = nx^{n-1}",
                preview: "f'(x) = nxⁿ⁻¹",
            },
        ],
    },
    {
        name: "Integral (Power Rule)",
        description:
            "Calculates the indefinite integral of a function of the form f(x) = xⁿ (where n ≠ -1).\n\n**Formula:** ∫xⁿ dx = (xⁿ⁺¹) / (n + 1) + C (where C is the constant of integration)\n\n**Units:** The integral's units depend on the original function. It represents the accumulation of the original function.\n\n**Why it works:** The integral is the inverse operation of the derivative. This rule is derived from the power rule of differentiation.\n\n**Example:** ∫x² dx = (x³/3) + C",
        categories: ["math", "calculus"],
        inputVariables: ["n"],
        calculators: [
            {
                latex: "\\int x^n dx = \\frac{x^{n+1}}{n+1} + C",
                preview: "∫xⁿ dx = (xⁿ⁺¹) / (n + 1) + C",
            },
        ],
    },
    {
        name: "Dot Product",
        description:
            "Calculates the dot product of two vectors **a** = (a₁, a₂, ..., aₙ) and **b** = (b₁, b₂, ..., bₙ).\n\n**Formula:** **a** ⋅ **b** = a₁b₁ + a₂b₂ + ... + aₙbₙ\n\n**Units:** The dot product is a scalar (a single number) and is dimensionless.\n\n**Why it works:** The dot product is a fundamental operation in linear algebra. It can be used to find the angle between two vectors or to project one vector onto another.\n\n**Example:** If **a** = (2, 3) and **b** = (1, -2), then **a** ⋅ **b** = (2*1) + (3*-2) = -4.",
        categories: ["math", "linear algebra"],
        inputVariables: ["a", "b"], // Could also be a1, a2, b1, b2, etc.
        calculators: [
            {
                latex: "\\mathbf{a} \\cdot \\mathbf{b} = \\sum_{i=1}^{n} a_i b_i",
                preview: "a ⋅ b = a₁b₁ + a₂b₂ + ... + aₙbₙ",
            },
        ],
    },
    {
        name: "Matrix Multiplication",
        description:
            "Calculates the product of two matrices A (m x n) and B (n x p), resulting in a matrix C (m x p).\n\n**Formula:**  Cᵢⱼ = Σₖ AᵢₖBₖⱼ (summation from k=1 to n)\n\n**Units:** The resulting matrix C will have units derived from the units of A and B (if they represent physical quantities).\n\n**Why it works:** Matrix multiplication is a fundamental operation in linear algebra, used in various applications like transformations, systems of equations, and computer graphics.\n\n**Example:**  Multiplying a 2x2 matrix by another 2x2 matrix results in another 2x2 matrix. The calculation involves summing products of elements from the rows of the first matrix and the columns of the second matrix.",
        categories: ["math", "linear algebra"],
        inputVariables: ["A", "B"], // Could also be individual matrix elements
        calculators: [
            {
                latex: "C_{ij} = \\sum_{k=1}^{n} A_{ik}B_{kj}",
                preview: "Cᵢⱼ = Σₖ AᵢₖBₖⱼ",
            },
        ],
    },
    {
        name: "Probability of an Event",
        description:
            "Calculates the probability of an event occurring.\n\n**Formula:** P(event) = (Number of favorable outcomes) / (Total number of possible outcomes)\n\n**Units:** Probability is a dimensionless quantity, expressed as a number between 0 and 1 (or as a percentage between 0% and 100%).\n\n**Why it works:** This is the basic definition of probability in classical probability theory, assuming all outcomes are equally likely.\n\n**Example:** The probability of rolling a 3 on a fair six-sided die is 1/6.",
        categories: ["math", "statistics"],
        inputVariables: ["P_{favorable}", "P_{total}"],
        calculators: [
            {
                latex: "P = \\frac{P_{favorable}}{P_{total}}",
                preview:
                    "P(event) = (Number of favorable outcomes) / (Total number of possible outcomes)",
            },
        ],
    },
    {
        name: "Trigonometric Functions (Sine)",
        description:
            "Calculates the sine of an angle (θ).\n\n**Formula:** sin(θ) = (Opposite side) / (Hypotenuse)\n\n**Units:** θ is typically in radians or degrees. sin(θ) is dimensionless.\n\n**Why it works:** Sine is a fundamental trigonometric function relating the angle of a right triangle to the ratio of the side opposite the angle to the hypotenuse.\n\n**Example:** In a right triangle with hypotenuse 5 and opposite side 3, sin(θ) = 3/5 = 0.6.",
        categories: ["math", "pre-calculus", "trigonometry"],
        inputVariables: ["θ"],
        calculators: [
            {
                latex: "\\sin(\\theta) = \\frac{O}{H}",
                preview: "sin(θ) = (Opposite side) / (Hypotenuse)",
            },
        ],
    },
    {
        name: "Trigonometric Functions (Cosine)",
        description:
            "Calculates the cosine of an angle (θ).\n\n**Formula:** cos(θ) = (Adjacent side) / (Hypotenuse)\n\n**Units:** θ is typically in radians or degrees. cos(θ) is dimensionless.\n\n**Why it works:** Cosine is a fundamental trigonometric function relating the angle of a right triangle to the ratio of the side adjacent to the angle to the hypotenuse.\n\n**Example:** In a right triangle with hypotenuse 5 and adjacent side 4, cos(θ) = 4/5 = 0.8.",
        categories: ["math", "pre-calculus", "trigonometry"],
        inputVariables: ["θ"],
        calculators: [
            {
                latex: "\\cos(\\theta) = \\frac{A}{H}",
                preview: "cos(θ) = (Adjacent side) / (Hypotenuse)",
            },
        ],
    },
    {
        name: "Trigonometric Functions (Tangent)",
        description:
            "Calculates the tangent of an angle (θ).\n\n**Formula:** tan(θ) = (Opposite side) / (Adjacent side) = sin(θ) / cos(θ)\n\n**Units:** θ is typically in radians or degrees. tan(θ) is dimensionless.\n\n**Why it works:** Tangent is a fundamental trigonometric function relating the angle of a right triangle to the ratio of the side opposite the angle to the side adjacent to the angle.\n\n**Example:** In a right triangle with opposite side 3 and adjacent side 4, tan(θ) = 3/4 = 0.75.",
        categories: ["math", "pre-calculus", "trigonometry"],
        inputVariables: ["θ"],
        calculators: [
            {
                latex: "\\tan(\\theta) = \\frac{O}{A} = \\frac{\\sin(\\theta)}{\\cos(\\theta)}",
                preview:
                    "tan(θ) = (Opposite side) / (Adjacent side) = sin(θ) / cos(θ)",
            },
        ],
    },
    {
        name: "Exponential Growth",
        description:
            "Models the growth of a quantity that increases proportionally to its current value.\n\n**Formula:** A = P(1 + r)ᵗ\n\n**Units:** A and P have the same units (e.g., population, money). r is a rate (e.g., percentage growth) and t is time. The units of t determine the units of r (e.g., if t is in years, r is an annual growth rate).\n\n**Why it works:** Exponential growth occurs when the growth rate is constant and proportional to the current size of the quantity. It's often used to model populations, investments, and other phenomena that grow rapidly.\n\n**Example:** A population of 100 grows at a rate of 5% per year. After 10 years, the population will be A = 100(1 + 0.05)¹⁰ ≈ 163.",
        categories: ["math", "algebra"],
        inputVariables: ["P", "r", "t"],
        calculators: [
            {
                latex: "A = P(1 + r)^t",
                preview: "A = P(1 + r)ᵗ",
            },
        ],
    },
    {
        name: "Exponential Decay",
        description:
            "Models the decay of a quantity that decreases proportionally to its current value.\n\n**Formula:** A = P(1 - r)ᵗ\n\n**Units:** A and P have the same units. r is a decay rate and t is time. The units of t determine the units of r.\n\n**Why it works:** Exponential decay occurs when the decay rate is constant and proportional to the current size of the quantity. It's used to model radioactive decay, drug metabolism, and other phenomena that decrease over time.\n\n**Example:** A sample of 100 grams of a radioactive substance decays at a rate of 10% per year. After 5 years, the remaining amount will be A = 100(1 - 0.1)⁵ ≈ 59 grams.",
        categories: ["math", "algebra"],
        inputVariables: ["P", "r", "t"],
        calculators: [
            {
                latex: "A = P(1 - r)^t",
                preview: "A = P(1 - r)ᵗ",
            },
        ],
    },
    {
        name: "Logarithm (Base 10)",
        description:
            "Calculates the base-10 logarithm of a number.\n\n**Formula:** y = log₁₀(x)  which means 10ʸ = x\n\n**Units:** Logarithms are dimensionless.\n\n**Why it works:** Logarithms are the inverse of exponentiation. They are used to solve for exponents and have applications in various fields, including science and engineering.\n\n**Example:** log₁₀(100) = 2 because 10² = 100.",
        categories: ["math", "pre-calculus"],
        inputVariables: ["x"],
        calculators: [
            {
                latex: "y = \\log(x)",
                preview: "y = log₁₀(x)",
            },
        ],
    },
    {
        name: "Natural Logarithm (Base e)",
        description:
            "Calculates the natural logarithm (base e) of a number.\n\n**Formula:** y = ln(x) which means eʸ = x (where e ≈ 2.71828)\n\n**Units:** Natural logarithms are dimensionless.\n\n**Why it works:** The natural logarithm is a logarithm with base e, an important mathematical constant. It has numerous applications in calculus, physics, and other fields.\n\n**Example:** ln(e) = 1 because e¹ = e.",
        categories: ["math", "pre-calculus", "calculus"],
        inputVariables: ["x"],
        calculators: [
            {
                latex: "y = \\ln(x)",
                preview: "y = ln(x)",
            },
        ],
    },
    {
        name: "Newton's Second Law",
        description:
            "Relates the force (F) acting on an object to its mass (m) and acceleration (a).\n\n**Formula:** F = ma\n\n**Units:** F is typically in Newtons (N), m is in kilograms (kg), and a is in meters per second squared (m/s²).\n\n**Why it works:** This is a fundamental law of classical mechanics. It states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass.\n\n**Example:** If m = 2 kg and a = 3 m/s², then F = (2 kg) * (3 m/s²) = 6 N.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["m", "a"],
        calculators: [
            {
                latex: "F=ma",
                preview: "F = ma",
            },
        ],
    },
    {
        name: "Kinetic Energy",
        description:
            "Calculates the kinetic energy (KE) of an object given its mass (m) and velocity (v).\n\n**Formula:** KE = (1/2)mv²\n\n**Units:** KE is typically in Joules (J), m is in kilograms (kg), and v is in meters per second (m/s).\n\n**Why it works:** Kinetic energy is the energy an object possesses due to its motion. This formula quantifies that energy.\n\n**Example:** If m = 10 kg and v = 5 m/s, then KE = (1/2) * (10 kg) * (5 m/s)² = 125 J.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["m", "v"],
        calculators: [
            {
                latex: "K = \\frac{1}{2}mv^2",
                preview: "Kinetic energy = (1/2)mv²",
            },
        ],
    },
    {
        name: "Potential Energy (Gravitational)",
        description:
            "Calculates the gravitational potential energy (PE) of an object given its mass (m), the acceleration due to gravity (g), and its height (h) above a reference point.\n\n**Formula:** PE = mgh\n\n**Units:** PE is typically in Joules (J), m is in kilograms (kg), g is approximately 9.8 m/s², and h is in meters (m).\n\n**Why it works:** Gravitational potential energy is the energy an object possesses due to its position in a gravitational field.\n\n**Example:** A 2 kg object is lifted 3 meters above the ground. Its potential energy is PE = (2 kg) * (9.8 m/s²) * (3 m) = 58.8 J.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["m", "g", "h"],
        calculators: [
            {
                latex: "U = mgh",
                preview: "Potential energy = mass * gravity * height",
            },
        ],
    },
    {
        name: "Ohm's Law",
        description:
            "Relates the voltage (V), current (I), and resistance (R) in an electrical circuit.\n\n**Formula:** V = IR\n\n**Units:** V is in volts (V), I is in amperes (A), and R is in ohms (Ω).\n\n**Why it works:** This law describes the linear relationship between voltage, current, and resistance in many electrical circuits.\n\n**Example:** If I = 2 A and R = 5 Ω, then V = (2 A) * (5 Ω) = 10 V.",
        categories: ["physics", "electromagnetism"],
        inputVariables: ["I", "R"],
        calculators: [
            {
                latex: "V=IR",
                preview: "V = IR",
            },
        ],
    },
    {
        name: "Power (Electrical)",
        description:
            "Calculates the power (P) dissipated by a resistor in an electrical circuit.\n\n**Formula:** P = IV = I²R = V²/R\n\n**Units:** P is in watts (W), I is in amperes (A), V is in volts (V), and R is in ohms (Ω).\n\n**Why it works:** Power is the rate at which energy is transferred or used. In an electrical circuit, it represents the rate at which electrical energy is converted into other forms of energy (e.g., heat).\n\n**Example:** A 12V circuit with a 4Ω resistor dissipates P = (12V)² / (4Ω) = 36 W of power.",
        categories: ["physics", "electromagnetism"],
        inputVariables: ["I", "V", "R"], // You might choose to only use two at a time in a calculator
        calculators: [
            {
                latex: "P=IV",
                preview: "P = IV",
            },
            {
                latex: "P=I^2R",
                preview: "P = I²R",
            },
            {
                latex: "P=\\frac{V^2}{R}",
                preview: "P = V²/R",
            },
        ],
    },
    {
        name: "Ohm's Law (Rearranged for Current)",
        description:
            "Calculates the current (I) in an electrical circuit given the voltage (V) and resistance (R).\n\n**Formula:** I = V/R\n\n**Units:** I is in amperes (A), V is in volts (V), and R is in ohms (Ω).\n\n**Why it works:** This is a rearrangement of Ohm's Law, useful for directly calculating the current.\n\n**Example:** A 12V circuit with a 4Ω resistor has a current of I = 12V / 4Ω = 3 A.",
        categories: ["physics", "electromagnetism"],
        inputVariables: ["V", "R"],
        calculators: [
            {
                latex: "I=\\frac{V}{R}",
                preview: "I = V/R",
            },
        ],
    },
    {
        name: "Ohm's Law (Rearranged for Resistance)",
        description:
            "Calculates the resistance (R) in an electrical circuit given the voltage (V) and current (I).\n\n**Formula:** R = V/I\n\n**Units:** R is in ohms (Ω), V is in volts (V), and I is in amperes (A).\n\n**Why it works:** This is a rearrangement of Ohm's Law, useful for directly calculating the resistance.\n\n**Example:** A circuit with a voltage of 12V and a current of 3A has a resistance of R = 12V / 3A = 4Ω.",
        categories: ["physics", "electromagnetism"],
        inputVariables: ["V", "I"],
        calculators: [
            {
                latex: "R=\\frac{V}{I}",
                preview: "R = V/I",
            },
        ],
    },
    {
        name: "First Law of Thermodynamics",
        description:
            "States that energy cannot be created or destroyed, only transferred between systems.  It relates the change in internal energy (ΔU) of a system to the heat added to the system (Q) and the work done by the system (W).\n\n**Formula:** ΔU = Q - W\n\n**Units:** ΔU, Q, and W are typically in Joules (J).\n\n**Why it works:** This is a fundamental law of physics, expressing the conservation of energy.\n\n**Example:** If 100 J of heat is added to a system and the system does 20 J of work, the change in internal energy is ΔU = 100 J - 20 J = 80 J.",
        categories: ["physics", "thermodynamics"],
        inputVariables: ["Q", "W"],
        calculators: [
            {
                latex: "U = Q - W",
                preview: "zU = Q - W",
            },
        ],
    },
    {
        name: "Work (Mechanical)",
        description:
            "Calculates the work (W) done on an object by a force (F) over a displacement (d).\n\n**Formula:** W = Fdcos(θ), where θ is the angle between the force and the displacement.\n\n**Units:** W is typically in Joules (J), F is in Newtons (N), and d is in meters (m).\n\n**Why it works:** Work is the transfer of energy when a force causes displacement. The cos(θ) term accounts for the component of the force in the direction of motion.\n\n**Example:** A force of 10 N is applied to an object, moving it 2 meters in the same direction as the force. The work done is W = (10 N) * (2 m) * cos(0°) = 20 J.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["F", "d", "θ"],
        calculators: [
            {
                latex: "W = Fd\\cos(\\theta)",
                preview: "W = Fdcos(θ)",
            },
        ],
    },
    {
        name: "Impulse",
        description:
            "Calculates the impulse (J) experienced by an object due to a force (F) acting over a time interval (Δt).\n\n**Formula:** J = FΔt\n\n**Units:** J is typically in Newton-seconds (N⋅s), F is in Newtons (N), and Δt is in seconds (s).\n\n**Why it works:** Impulse is the change in momentum of an object. It's related to the average force acting on the object and the time for which it acts.\n\n**Example:** A force of 50 N is applied to an object for 0.1 seconds. The impulse is J = (50 N) * (0.1 s) = 5 N⋅s.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["F", "t"],
        calculators: [
            {
                latex: "J = F t",
                preview: "J = FΔt",
            },
        ],
    },
    {
        name: "Momentum",
        description:
            "Calculates the momentum (p) of an object given its mass (m) and velocity (v).\n\n**Formula:** p = mv\n\n**Units:** p is typically in kilogram-meters per second (kg⋅m/s), m is in kilograms (kg), and v is in meters per second (m/s).\n\n**Why it works:** Momentum is a measure of an object's mass in motion. It's a vector quantity, with direction the same as the velocity.\n\n**Example:** A 2 kg object is moving at 3 m/s. Its momentum is p = (2 kg) * (3 m/s) = 6 kg⋅m/s.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["m", "v"],
        calculators: [
            {
                latex: "p = mv",
                preview: "p = mv",
            },
        ],
    },
    {
        name: "Newton's Law of Universal Gravitation",
        description:
            "Calculates the gravitational force (F) between two objects with masses m₁ and m₂ separated by a distance r.\n\n**Formula:** F = G(m₁m₂)/r², where G is the gravitational constant (approximately 6.674 x 10⁻¹¹ N⋅m²/kg²).\n\n**Units:** F is in Newtons (N), m₁ and m₂ are in kilograms (kg), and r is in meters (m).\n\n**Why it works:** This law describes the attractive force between any two objects with mass. The force is proportional to the product of the masses and inversely proportional to the square of the distance between them.\n\n**Example:** The gravitational force between two 1 kg masses separated by 1 meter is F = (6.674 x 10⁻¹¹ N⋅m²/kg²) * (1 kg * 1 kg) / (1 m)² ≈ 6.674 x 10⁻¹¹ N.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["m_1", "m_2", "r"],
        calculators: [
            {
                latex: "F = G\\frac{m_1m_2}{r^2}",
                preview: "F = G(m₁m₂)/r²",
            },
        ],
    },
    {
        name: "Centripetal Force",
        description:
            "Calculates the centripetal force (F) required to keep an object of mass (m) moving in a circle of radius (r) at a speed (v).\n\n**Formula:** F = mv²/r\n\n**Units:** F is in Newtons (N), m is in kilograms (kg), v is in meters per second (m/s), and r is in meters (m).\n\n**Why it works:** Centripetal force is the net force acting on an object moving in a circular path, directed towards the center of the circle. It's what keeps the object from flying off in a straight line.\n\n**Example:** A 2 kg object is moving in a circle of radius 1 meter at a speed of 4 m/s. The centripetal force is F = (2 kg) * (4 m/s)² / (1 m) = 32 N.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["m", "v", "r"],
        calculators: [
            {
                latex: "F = \\frac{mv^2}{r}",
                preview: "F = mv²/r",
            },
        ],
    },
    {
        name: "Period of a Pendulum",
        description:
            "Calculates the period (T) of a simple pendulum given its length (L) and the acceleration due to gravity (g).\n\n**Formula:** T = 2π√(L/g)\n\n**Units:** T is in seconds (s), L is in meters (m), and g is approximately 9.8 m/s².\n\n**Why it works:** The period of a pendulum is the time it takes for one complete swing.  This formula shows it depends on the length and the gravitational acceleration.\n\n**Example:** A pendulum with a length of 1 meter has a period of T = 2π√(1 m / 9.8 m/s²) ≈ 2 seconds.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["L"], // g is assumed constant
        calculators: [
            {
                latex: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
                preview: "T = 2π√(L/g)",
            },
        ],
    },
    {
        name: "Displacement",
        description:
            "Calculates the change in position (Δx) of an object.\n\n**Formula:** Δx = x₂ - x₁, where x₁ is the initial position and x₂ is the final position.\n\n**Units:** Δx is typically in meters (m).\n\n**Why it works:** Displacement is a vector quantity representing the shortest distance between two points. It's the change in position, not the total distance traveled.\n\n**Example:** An object moves from x₁ = 2 m to x₂ = 5 m. Its displacement is Δx = 5 m - 2 m = 3 m.",
        categories: ["physics", "kinematics"],
        inputVariables: ["x_1", "x_2"],
        calculators: [
            {
                latex: "\\Delta x = x_2 - x_1",
                preview: "Δx = x₂ - x₁",
            },
        ],
    },
    {
        name: "Average Velocity",
        description:
            "Calculates the average velocity (v̄) of an object over a time interval (Δt).\n\n**Formula:** v̄ = Δx / Δt\n\n**Units:** v̄ is typically in meters per second (m/s), Δx is in meters (m), and Δt is in seconds (s).\n\n**Why it works:** Average velocity is the total displacement divided by the total time taken. It's a vector quantity.\n\n**Example:** An object moves 3 meters in 2 seconds. Its average velocity is v̄ = 3 m / 2 s = 1.5 m/s.",
        categories: ["physics", "kinematics"],
        inputVariables: ["x", "t"],
        calculators: [
            {
                latex: "v = \\frac{x}{t}",
                preview: "v̄ = Δx / Δt",
            },
        ],
    },
    {
        name: "Average Acceleration",
        description:
            "Calculates the average acceleration (ā) of an object over a time interval (Δt).\n\n**Formula:** ā = Δv / Δt, where Δv is the change in velocity.\n\n**Units:** ā is typically in meters per second squared (m/s²), Δv is in meters per second (m/s), and Δt is in seconds (s).\n\n**Why it works:** Average acceleration is the change in velocity divided by the total time taken. It's a vector quantity.\n\n**Example:** An object's velocity changes from 2 m/s to 5 m/s in 1 second. Its average acceleration is ā = (5 m/s - 2 m/s) / 1 s = 3 m/s².",
        categories: ["physics", "kinematics"],
        inputVariables: ["Δv", "Δt"],
        calculators: [
            {
                latex: "a = \\frac{v}{t}",
                preview: "ā = Δv / Δt",
            },
        ],
    },
    {
        name: "Kinematic Equation 1",
        description:
            "Relates final velocity (v), initial velocity (v₀), acceleration (a), and time (t).\n\n**Formula:** v = v₀ + at\n\n**Units:** v and v₀ are typically in m/s, a is in m/s², and t is in s.\n\n**Why it works:** This equation is derived from the definition of acceleration and is useful when you know the initial velocity, acceleration, and time, and you want to find the final velocity.\n\n**Example:** An object starts at 2 m/s and accelerates at 3 m/s² for 4 seconds. Its final velocity is v = 2 m/s + (3 m/s²)(4 s) = 14 m/s.",
        categories: ["physics", "kinematics"],
        inputVariables: ["v_0", "a", "t"],
        calculators: [
            {
                latex: "v = v_0 + at",
                preview: "v = v₀ + at",
            },
        ],
    },
    {
        name: "Kinematic Equation 2",
        description:
            "Relates displacement (Δx), initial velocity (v₀), acceleration (a), and time (t).\n\n**Formula:** Δx = v₀t + (1/2)at²\n\n**Units:** Δx is typically in m, v₀ is in m/s, a is in m/s², and t is in s.\n\n**Why it works:** This equation is useful when you know the initial velocity, acceleration, and time, and you want to find the displacement.\n\n**Example:** An object starts at 2 m/s and accelerates at 3 m/s² for 4 seconds. Its displacement is Δx = (2 m/s)(4 s) + (1/2)(3 m/s²)(4 s)² = 32 m.",
        categories: ["physics", "kinematics"],
        inputVariables: ["v_0", "a", "t"],
        calculators: [
            {
                latex: "x = v_0t + \\frac{1}{2}at^2",
                preview: "Δx = v₀t + (1/2)at²",
            },
        ],
    },
    {
        name: "Kinematic Equation 3",
        description:
            "Relates final velocity (v), initial velocity (v₀), acceleration (a), and displacement (Δx).\n\n**Formula:** v² = v₀² + 2aΔx\n\n**Units:** v and v₀ are typically in m/s, a is in m/s², and Δx is in m.\n\n**Why it works:** This equation is useful when you know the initial velocity, acceleration, and displacement, and you want to find the final velocity (or vice-versa), without knowing the time.\n\n**Example:** An object starts at 2 m/s and accelerates at 3 m/s² over a displacement of 4 meters. Its final velocity is v² = (2 m/s)² + 2(3 m/s²)(4 m) = 28 m²/s², so v ≈ 5.29 m/s.",
        categories: ["physics", "kinematics"],
        inputVariables: ["v_0", "a", "x"],
        calculators: [
            {
                latex: "v^2 = v_0^2 + 2a x",
                preview: "v² = v₀² + 2aΔx",
            },
        ],
    },
    {
        name: "Force of Friction (Static)",
        description:
            "Calculates the maximum static friction force (fₛ) between two surfaces.\n\n**Formula:** fₛ ≤ μₛN, where μₛ is the coefficient of static friction and N is the normal force.\n\n**Units:** fₛ and N are typically in Newtons (N). μₛ is dimensionless.\n\n**Why it works:** Static friction prevents objects from starting to move. The maximum static friction force is proportional to the normal force between the surfaces.\n\n**Example:** A 10 kg block is on a surface with a coefficient of static friction μₛ = 0.5. The normal force is equal to the weight of the block (N = mg = (10 kg)(9.8 m/s²) = 98 N). The maximum static friction force is fₛ ≤ (0.5)(98 N) = 49 N.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["\\mu_s", "N"],
        calculators: [
            {
                latex: "f_s \\le \\mu_s N",
                preview: "fₛ ≤ μₛN",
            },
        ],
    },
    {
        name: "Force of Friction (Kinetic)",
        description:
            "Calculates the kinetic friction force (fₖ) between two surfaces when they are in relative motion.\n\n**Formula:** fₖ = μₖN, where μₖ is the coefficient of kinetic friction and N is the normal force.\n\n**Units:** fₖ and N are typically in Newtons (N). μₖ is dimensionless.\n\n**Why it works:** Kinetic friction opposes the relative motion between two surfaces. The kinetic friction force is proportional to the normal force.\n\n**Example:** A 10 kg block is sliding on a surface with a coefficient of kinetic friction μₖ = 0.3. The normal force is equal to the weight of the block (N = mg = (10 kg)(9.8 m/s²) = 98 N). The kinetic friction force is fₖ = (0.3)(98 N) = 29.4 N.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["\\mu_k", "N"],
        calculators: [
            {
                latex: "f_k = \\mu_k N",
                preview: "fₖ = μₖN",
            },
        ],
    },
    {
        name: "Hooke's Law",
        description:
            "Calculates the force (F) exerted by a spring when it is stretched or compressed by a displacement (x) from its equilibrium position.\n\n**Formula:** F = -kx, where k is the spring constant.\n\n**Units:** F is typically in Newtons (N), k is in Newtons per meter (N/m), and x is in meters (m).\n\n**Why it works:** Hooke's Law describes the linear relationship between the force exerted by an ideal spring and its displacement. The negative sign indicates that the force is a restoring force, acting opposite to the displacement.\n\n**Example:** A spring with a spring constant k = 100 N/m is stretched 0.1 meters. The force exerted by the spring is F = -(100 N/m)(0.1 m) = -10 N (the force is in the opposite direction of the stretch).",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["k", "x"],
        calculators: [
            {
                latex: "F = -kx",
                preview: "F = -kx",
            },
        ],
    },
    {
        name: "Elastic Potential Energy",
        description:
            "Calculates the potential energy (PE) stored in a spring when it is stretched or compressed by a displacement (x) from its equilibrium position.\n\n**Formula:** PE = (1/2)kx², where k is the spring constant.\n\n**Units:** PE is typically in Joules (J), k is in Newtons per meter (N/m), and x is in meters (m).\n\n**Why it works:** Elastic potential energy is the energy stored in a deformed spring. It's proportional to the square of the displacement.\n\n**Example:** A spring with a spring constant k = 100 N/m is stretched 0.1 meters. The elastic potential energy stored in the spring is PE = (1/2)(100 N/m)(0.1 m)² = 0.5 J.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["k", "x"],
        calculators: [
            {
                latex: "P_{elastic} = \\frac{1}{2}kx^2",
                preview: "PE = (1/2)kx²",
            },
        ],
    },
    {
        name: "Torque",
        description:
            "Calculates the torque (τ) exerted by a force (F) at a distance (r) from the axis of rotation.\n\n**Formula:** τ = rFsin(θ), where θ is the angle between the force vector and the lever arm (r).\n\n**Units:** τ is typically in Newton-meters (N⋅m), r is in meters (m), and F is in Newtons (N).\n\n**Why it works:** Torque is the rotational equivalent of force. It measures the tendency of a force to cause rotation.\n\n**Example:** A force of 10 N is applied at a distance of 0.5 meters from the axis of rotation, at an angle of 90 degrees. The torque is τ = (0.5 m)(10 N)sin(90°) = 5 N⋅m.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["r", "F", "\\theta"],
        calculators: [
            {
                latex: "\\tau = rF\\sin(\\theta)",
                preview: "τ = rFsin(θ)",
            },
        ],
    },
    {
        name: "Angular Momentum",
        description:
            "Calculates the angular momentum (L) of an object with moment of inertia (I) rotating at an angular velocity (ω).\n\n**Formula:** L = Iω\n\n**Units:** L is typically in kilogram-meter squared per second (kg⋅m²/s), I is in kg⋅m², and ω is in radians per second (rad/s).\n\n**Why it works:** Angular momentum is the rotational equivalent of linear momentum. It's a measure of an object's resistance to changes in its rotation.\n\n**Example:** A rotating object has a moment of inertia of 2 kg⋅m² and an angular velocity of 3 rad/s. Its angular momentum is L = (2 kg⋅m²)(3 rad/s) = 6 kg⋅m²/s.",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["I", "\\omega"],
        calculators: [
            {
                latex: "L = I\\omega",
                preview: "L = Iω",
            },
        ],
    },
    {
        name: "Moment of Inertia (Point Mass)",
        description:
            "Calculates the moment of inertia (I) of a point mass (m) rotating at a distance (r) from the axis of rotation.\n\n**Formula:** I = mr²\n\n**Units:** I is typically in kilogram-meter squared (kg⋅m²), m is in kilograms (kg), and r is in meters (m).\n\n**Why it works:** Moment of inertia is the rotational equivalent of mass. It represents an object's resistance to rotational acceleration.\n\n**Example:** A 1 kg mass is rotating at a distance of 0.5 meters from the axis of rotation. Its moment of inertia is I = (1 kg)(0.5 m)² = 0.25 kg⋅m².",
        categories: ["physics", "classical mechanics"],
        inputVariables: ["m", "r"],
        calculators: [
            {
                latex: "I = mr^2",
                preview: "I = mr²",
            },
        ],
    },
    {
        name: "Compound Interest",
        description:
            "Calculates the future value (A) of an investment or loan, given the principal amount (P), interest rate (r), number of times interest is compounded per year (n), and the number of years (t).\n\n**Formula:** A = P(1 + r/n)^(nt)\n\n**Units:** A and P are in the same monetary unit (e.g., dollars, euros). r is an annual interest rate (as a decimal), n is a number (times per year), and t is in years.\n\n**Why it works:** Compound interest means that interest is earned not only on the principal but also on the accumulated interest from previous periods.\n\n**Example:** $1000 is invested at an annual interest rate of 5%, compounded quarterly (n=4) for 10 years.  A = 1000(1 + 0.05/4)^(4*10) ≈ $1647.01.",
        categories: ["finance"],
        inputVariables: ["P", "r", "n", "t"],
        calculators: [
            {
                latex: "A = P(1 + \\frac{r}{n})^{nt}",
                preview: "A = P(1 + r/n)^(nt)",
            },
        ],
    },
    {
        name: "Present Value",
        description:
            "Calculates the present value (PV) of a future sum (FV), given the discount rate (r) and the number of periods (n).\n\n**Formula:** PV = FV / (1 + r)^n\n\n**Units:** PV and FV are in the same monetary unit. r is the discount rate per period (as a decimal), and n is the number of periods.\n\n**Why it works:** Present value is the current worth of a future sum of money, given a specified rate of return. It is used to compare cash flows occurring at different times.\n\n**Example:**  You need $1000 in 5 years. Assuming a discount rate of 6% per year, the present value is PV = 1000 / (1 + 0.06)^5 ≈ $747.26.",
        categories: ["finance"],
        inputVariables: ["F_{value}", "rate", "n"],
        calculators: [
            {
                latex: "P_{value} = \\frac{F_{value}}{(1 + rate)^n}",
                preview: "Present value = Future value / (1 + rate)ⁿ",
            },
        ],
    },
    {
        name: "Future Value",
        description:
            "Calculates the future value (FV) of a present sum (PV), given the interest rate (r) and the number of periods (n).\n\n**Formula:** FV = PV * (1 + r)^n\n\n**Units:** FV and PV are in the same monetary unit. r is the interest rate per period (as a decimal), and n is the number of periods.\n\n**Why it works:** Future value is the value of a current asset at a specified date in the future, based on an assumed rate of growth over time.\n\n**Example:** You invest $500 today at an interest rate of 4% per year for 10 years. The future value is FV = 500 * (1 + 0.04)^10 ≈ $740.12.",
        categories: ["finance"],
        inputVariables: ["P_{value}", "rate", "n"],
        calculators: [
            {
                latex: "F_{value} = P_{value} * (1 + rate)^n",
                preview: "Future value = present value * (1 + rate)ⁿ",
            },
        ],
    },
    {
        name: "Density",
        description:
            "Calculates the density (ρ) of a substance given its mass (m) and volume (V).\n\n**Formula:** ρ = m/V\n\n**Units:** ρ is typically in kilograms per cubic meter (kg/m³) or grams per cubic centimeter (g/cm³), m is in kilograms (kg) or grams (g), and V is in cubic meters (m³) or cubic centimeters (cm³).\n\n**Why it works:** Density is a measure of how much mass is contained in a given volume. It's a property of matter that depends on both the mass of the atoms and their spacing.\n\n**Example:** A substance has a mass of 10 kg and a volume of 2 m³. Its density is ρ = 10 kg / 2 m³ = 5 kg/m³.",
        categories: ["physics", "general"],
        inputVariables: ["m", "V"],
        calculators: [
            {
                latex: "\\rho = \\frac{m}{V}",
                preview: "ρ = m/V",
            },
        ],
    },
];
