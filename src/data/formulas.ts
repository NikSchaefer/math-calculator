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
  {
    name: "Normalized Digital Frequency",
    description:
      "Calculates the normalized frequency (f) from the actual frequency (F) and sampling frequency (fs).\n\n**Formula:** f = F/fs\n\n**Units:** f is dimensionless (cycles/sample), F and fs are in Hertz (Hz).\n\n**Why it works:** Normalized frequency represents how many cycles a signal completes per sample, making it independent of the actual sampling rate.\n\n**Example:** With a 1000 Hz signal and 44100 Hz sampling rate, the normalized frequency is f = 1000/44100 ≈ 0.023 cycles/sample.",
    categories: ["signals", "electronics"],
    inputVariables: ["F", "fs"],
    calculators: [
      {
        latex: "f = \\frac{F}{f_s}",
        preview: "frequency = frequency_actual / frequency_sample",
      },
    ],
  },
  {
    name: "Nyquist Frequency",
    description:
      "Calculates the Nyquist frequency (fn), which is the highest frequency that can be accurately represented in a digital system.\n\n**Formula:** fn = fs/2\n\n**Units:** Both fn and fs are in Hertz (Hz).\n\n**Why it works:** According to the Nyquist-Shannon sampling theorem, a signal must be sampled at more than twice its highest frequency component to avoid aliasing.\n\n**Example:** For a system sampling at 44100 Hz, the Nyquist frequency is fn = 44100/2 = 22050 Hz.",
    categories: ["signals", "electronics"],
    inputVariables: ["f_s"],
    calculators: [
      {
        latex: "f_n = \\frac{f_s}{2}",
        preview: "frequency = frequency_sample / 2",
      },
    ],
  },
  {
    name: "Angular Frequency",
    description:
      "Converts normalized frequency (f) to angular frequency (ω) in the digital domain.\n\n**Formula:** ω = 2πf\n\n**Units:** ω is in radians per sample, f is in cycles per sample (dimensionless).\n\n**Why it works:** Angular frequency represents the rate of change of phase angle in radians, with one complete cycle being 2π radians.\n\n**Example:** A normalized frequency of 0.25 cycles/sample corresponds to ω = 2π(0.25) = π/2 radians/sample.",
    categories: ["signals", "electronics"],
    inputVariables: ["f"],
    calculators: [
      {
        latex: "\\omega = 2\\pi f",
        preview: "angular_frequency = 2π * frequency",
      },
    ],
  },
  {
    name: "Sampling Period",
    description:
      "Calculates the sampling period (Ts) from the sampling frequency (fs).\n\n**Formula:** Ts = 1/fs\n\n**Units:** Ts is in seconds (s), fs is in Hertz (Hz).\n\n**Why it works:** The sampling period is the time interval between consecutive samples in a digital system.\n\n**Example:** For a sampling frequency of 44100 Hz, the sampling period is Ts = 1/44100 ≈ 22.7 microseconds.",
    categories: ["signals", "electronics"],
    inputVariables: ["f_s"],
    calculators: [
      {
        latex: "T_s = \\frac{1}{f_s}",
        preview: "sampling_period = 1 / frequency_sample",
      },
    ],
  },
  {
    name: "Aliasing Condition",
    description:
      "Determines whether aliasing will occur by comparing the signal frequency (F) to the Nyquist frequency (fs/2).\n\n**Formula:** Aliasing occurs when F > fs/2\n\n**Units:** Both F and fs are in Hertz (Hz).\n\n**Why it works:** When a signal's frequency exceeds the Nyquist frequency (half the sampling rate), it creates false lower-frequency components in the sampled signal. This is because the sampling rate is too low to capture the signal's true oscillations.\n\n**Example:** For a system sampling at 44100 Hz:\n- A 20000 Hz signal: 20000 < 44100/2 (22050 Hz) → No aliasing\n- A 30000 Hz signal: 30000 > 44100/2 (22050 Hz) → Aliasing occurs, appears as 14100 Hz signal\n\nThe aliased frequency can be calculated as: |fs - F| for F > fs/2",
    categories: ["signals", "electronics"],
    inputVariables: ["F", "f_s"],
    calculators: [
      {
        latex: "F > \\frac{f_s}{2}",
        preview: "frequency_actual > frequency_sample / 2",
      },
      {
        latex: "f_{aliased} = |f_s - F|",
        preview: "frequency_aliased = |frequency_sample - frequency_actual|",
      },
    ],
  },
];
