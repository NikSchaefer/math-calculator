import { Preset } from "@/types";

export const formulas: Preset[] = [
    {
        id: "1",
        name: "Pythagorean Theorem",
        description:
            "The Pythagorean theorem is a fundamental concept in geometry, stating that in a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides.",
        categories: ["Physics", "Math", "Geometry"],
        inputVariables: ["a", "b"],
        calculators: [
            {
                id: "7ak92m14n3pq5",
                latex: "c=\\sqrt{a^2+b^2}",
                preview: "c = sqrt(a² + b²)",
            },
        ],
    },
    {
        id: "2",
        name: "Kinetic Energy",
        description:
            "Kinetic energy is the energy possessed by an object due to its motion. It is directly proportional to the square of the object's velocity and is given by the formula KE = (1/2)mv², where m is the mass of the object and v is its velocity.",
        categories: ["Physics", "Math", "Energy"],
        inputVariables: ["m", "v"],
        calculators: [
            {
                id: "8hb95e14b4eg8",
                latex: "KE=\\frac{1}{2}mv^2",
                preview: "energy = 1/2 * mass * velocity^2",
            },
        ],
    },
    {
        id: "3",
        name: "Potential Energy",
        description:
            "Potential energy is the energy possessed by an object due to its position or configuration. It is given by the formula PE = mgh, where m is the mass of the object, g is the acceleration due to gravity, and h is the height of the object.",
        categories: ["Physics", "Math", "Energy"],
        inputVariables: ["m", "g", "h"],
        calculators: [
            {
                id: "3cp45r17s8vw2",
                latex: "PE = mgh",
                preview: "energy = mass * gravity * height",
            },
        ],
    },
    {
        id: "4",
        name: "Work",
        description:
            "Work is the energy transferred to or from an object by a force acting on the object. It is given by the formula W = Fd, where F is the force applied to the object and d is the displacement of the object.",
        categories: ["Physics", "Math", "Energy"],
        inputVariables: ["F", "d"],
        calculators: [
            {
                id: "4567890123456",
                latex: "W = Fd",
                preview: "work = force * distance",
            },
        ],
    },
    {
        id: "5",
        name: "Ohm's Law",
        description:
            "Ohm's law is a fundamental concept in electronics, stating that the current through a conductor between two points is directly proportional to the voltage across the two points and inversely proportional to the resistance of the conductor.",
        categories: ["Physics", "Math", "Electronics"],
        inputVariables: ["I", "R"],
        calculators: [
            {
                id: "23y94739",
                latex: "V=IR",
                preview: "voltage = current * resistance",
            },
        ],
    },
    {
        id: "6",
        name: "Power (Electrical)",
        description:
            "Power is the rate at which work is done or energy is transferred. It is given by the formula P = VI, where V is the voltage across the conductor and I is the current through the conductor.",
        categories: ["Physics", "Math", "Electronics"],
        inputVariables: ["V", "I"],
        calculators: [
            {
                id: "2379479734",
                latex: "P=VI",
                preview: "power = voltage * current",
            },
        ],
    },
    {
        id: "7",
        name: "Force (Newton's Second Law)",
        description:
            "Newton's second law of motion states that the force acting on an object is directly proportional to the acceleration of the object and inversely proportional to its mass.",
        categories: ["Physics", "Math", "Force"],
        inputVariables: ["m", "a"],
        calculators: [
            {
                id: "19u230u23",
                latex: "F=ma",
                preview: "force = mass * acceleration",
            },
        ],
    },
    {
        id: "8",
        name: "Density",
        description:
            "Density is the mass per unit volume of a substance. It is given by the formula ρ = m/V, where m is the mass of the substance and V is its volume.",
        categories: ["Physics", "Math", "Density"],
        inputVariables: ["m", "V"],
        calculators: [
            {
                id: "j02u3jho32",
                latex: "\\rho=\\frac{m}{V}",
                preview: "density = mass / volume",
            },
        ],
    },
    {
        id: "9",
        name: "Pressure",
        description:
            "Pressure is the force applied per unit area. It is given by the formula P = F/A, where F is the force applied to the surface and A is the area of the surface.",
        categories: ["Physics", "Math", "Pressure"],
        inputVariables: ["F", "A"],
        calculators: [
            {
                id: "23uy4923uho",
                latex: "P=\\frac{F}{A}",
                preview: "pressure = force / area",
            },
        ],
    },
    {
        id: "10",
        name: "Ideal Gas Law",
        description:
            "The ideal gas law is a fundamental concept in thermodynamics, stating that the pressure of a gas is directly proportional to the product of the number of moles of the gas and its temperature and inversely proportional to its volume.",
        categories: ["Physics", "Math", "Gas"],
        inputVariables: ["P", "V", "n", "R", "T"],
        calculators: [
            {
                id: "as234u234u",
                latex: "PV=nRT",
                preview:
                    "pressure * volume = number of moles * gas constant * temperature",
            },
        ],
    },
    {
        id: "11",
        name: "Time Complexity (Big O)",
        description:
            "Time complexity is a measure of the amount of time an algorithm takes to complete. It is given by the formula T(n) = O(f(n)), where f(n) is the time complexity of the algorithm.",
        categories: ["Physics", "Math", "Time Complexity"],
        inputVariables: ["n"],
        calculators: [
            {
                id: "j3o;jfl;sdf",
                latex: "T(n)=O(f(n))",
                preview: "time complexity = O(f(n))",
            },
        ],
    },
    {
        id: "12",
        name: "Wavelength-Frequency Relationship",
        description:
            "The wavelength-frequency relationship is a fundamental concept in physics, stating that the speed of light is directly proportional to the product of the wavelength and frequency of the light.",
        categories: ["Physics", "Math", "Wave"],
        inputVariables: ["c", "λ", "f"],
        calculators: [
            {
                id: "asd;23283008;flj",
                latex: "c=\\lambda f",
                preview: "speed of light = wavelength * frequency",
            },
        ],
    },
    {
        id: "13",
        name: "Einstein's Mass-Energy Equivalence",
        description:
            "Einstein's mass-energy equivalence is a fundamental concept in physics, stating that the energy of an object is directly proportional to its mass.",
        categories: ["Physics", "Math", "Energy"],
        inputVariables: ["m"],
        calculators: [
            {
                id: "23982398uj23",
                latex: "E=mc^2",
                preview: "energy = mass * speed of light^2",
            },
        ],
    },
    {
        id: "14",
        name: "Capacitance",
        description:
            "Capacitance is the ability of a material to store electrical charge. It is given by the formula C = Q/V, where Q is the charge stored on the material and V is the voltage across the material.",
        categories: ["Physics", "Math", "Electronics"],
        inputVariables: ["Q", "V"],
        calculators: [
            {
                id: "232jh32j3",
                latex: "C=\\frac{Q}{V}",
                preview: "capacitance = charge / voltage",
            },
        ],
    },
    {
        id: "15",
        name: "Acceleration",
        description:
            "Acceleration is the rate at which velocity changes. It is given by the formula a = (vf - vi)/t, where vf is the final velocity, vi is the initial velocity, and t is the time.",
        categories: ["Physics", "Math", "Kinematics"],
        inputVariables: ["vf", "vi", "t"],
        calculators: [
            {
                id: "23j4io3h3o4hu34",
                latex: "a=\\frac{v_f-v_i}{t}",
                preview: "acceleration = △velocity / time",
            },
        ],
    },
    {
        id: "16",
        name: "Displacement (Kinematics)",
        description:
            "Displacement is the distance between two points. It is given by the formula s = ut + (1/2)at², where u is the initial velocity, t is the time, and a is the acceleration.",
        categories: ["Physics", "Math", "Kinematics"],
        inputVariables: ["u", "t", "a"],
        calculators: [
            {
                id: "23jl3k4jl3j4",
                latex: "s = ut + \\frac{1}{2}at^2",
                preview:
                    "displacement = initial velocity * time + 1/2 * acceleration * time^2",
            },
        ],
    },
    {
        id: "17",
        name: "Final Velocity (Kinematics)",
        description:
            "Final velocity is the velocity of an object at a given time. It is given by the formula v = u + at, where u is the initial velocity, t is the time, and a is the acceleration.",
        categories: ["Physics", "Math", "Kinematics"],
        inputVariables: ["u", "t", "a"],
        calculators: [
            {
                id: "12o3i23232332",
                latex: "v = u + at",
                preview:
                    "final velocity = initial velocity + acceleration * time",
            },
        ],
    },
    {
        id: "18",
        name: "Displacement-Velocity (Kinematics)",
        description:
            "Displacement is the distance between two points. It is given by the formula s = (u+v)t/2, where u is the initial velocity, v is the final velocity, and t is the time.",
        categories: ["Physics", "Math", "Kinematics"],
        inputVariables: ["u", "v", "t"],
        calculators: [
            {
                id: "12123ou2391093u2u320",
                latex: "s = \\frac{(u+v)t}{2}",
                preview:
                    "displacement = (initial velocity + final velocity) * time / 2",
            },
        ],
    },
    {
        id: "19",
        name: "Velocity-Time (Kinematics)",
        description:
            "Velocity is the rate at which displacement changes. It is given by the formula v = u + at, where u is the initial velocity, t is the time, and a is the acceleration.",
        categories: ["Physics", "Math", "Kinematics"],
        inputVariables: ["u", "a", "x"],
        calculators: [
            {
                id: "9xk73t25y4zq6",
                latex: "v^2 = u^2 + 2ax",
                preview:
                    "final velocity^2 = initial velocity^2 + 2 * acceleration * displacement",
            },
        ],
    },
    {
        id: "20",
        name: "Centripetal Acceleration",
        description:
            "Centripetal acceleration is the acceleration of an object moving in a circular path. It is given by the formula a_c = v²/r, where v is the velocity of the object and r is the radius of the circular path.",
        categories: ["Physics", "Math", "Kinematics"],
        inputVariables: ["v", "r"],
        calculators: [
            {
                id: "234234234234234",
                latex: "a_c = \\frac{v^2}{r}",
                preview: "centripetal acceleration = velocity^2 / radius",
            },
        ],
    },
    {
        id: "21",
        name: "Force of Friction",
        description:
            "The force of friction is the force that opposes the motion of an object. It is given by the formula F_f = \\mu_k N, where \\mu_k is the coefficient of kinetic friction and N is the normal force.",
        categories: ["Physics", "Math", "Friction"],
        inputVariables: ["μk", "N"],
        calculators: [
            {
                id: "234234234234234",
                latex: "F_f = \\mu_k N",
                preview: "friction = coefficient of friction * normal force",
            },
        ],
    },
    {
        id: "22",
        name: "Euler's Formula",
        description:
            "Euler's formula is a fundamental concept in complex analysis, stating that the exponential of a complex number is equal to the sum of the exponential of the real part and the exponential of the imaginary part.",
        categories: ["Signals", "Processing", "Complex Analysis"],
        inputVariables: ["θ"],
        calculators: [
            {
                id: "234234234234234",
                latex: "e^{i\\theta} = \\cos\\theta + i\\sin\\theta",
                preview: "e^iθ = cos(θ) + i*sin(θ)",
            },
        ],
    },
    {
        id: "23",
        name: "Euler's Identity",
        description:
            "Euler's identity is a fundamental concept in complex analysis, stating that the exponential of a complex number is equal to the sum of the exponential of the real part and the exponential of the imaginary part.",
        categories: ["Signals", "Processing", "Complex Analysis"],
        inputVariables: ["θ"],
        calculators: [
            {
                id: "234234234234234",
                latex: "E^{i\\pi} + 1 = 0",
                preview: "e^iπ + 1 = 0",
            },
        ],
    },
    {
        id: "24",
        name: "Simple Harmonic Motion",
        description:
            "Simple harmonic motion describes oscillatory motion where the restoring force is proportional to displacement. The equation describes position as a function of time.",
        categories: ["Physics", "Math", "Oscillations"],
        inputVariables: ["A", "ω", "t", "φ"],
        calculators: [
            {
                id: "shm123456789",
                latex: "x = A\\cos(\\omega t + \\phi)",
                preview:
                    "position = amplitude * cos(angular frequency * time + phase)",
            },
        ],
    },
    {
        id: "25",
        name: "Gravitational Force",
        description:
            "Newton's law of universal gravitation states that the gravitational force between two masses is proportional to their masses and inversely proportional to the square of the distance between them.",
        categories: ["Physics", "Math", "Gravity"],
        inputVariables: ["m1", "m2", "r"],
        calculators: [
            {
                id: "grav987654321",
                latex: "F_g = G\\frac{m_1m_2}{r^2}",
                preview:
                    "force = gravitational constant * (mass1 * mass2) / distance²",
            },
        ],
    },
    {
        id: "26",
        name: "Resonant Frequency",
        description:
            "The resonant frequency of an LC circuit is the frequency at which the circuit naturally oscillates. It depends on the inductance and capacitance values.",
        categories: ["Physics", "Electronics", "Resonance"],
        inputVariables: ["L", "C"],
        calculators: [
            {
                id: "res456789123",
                latex: "f = \\frac{1}{2\\pi\\sqrt{LC}}",
                preview:
                    "frequency = 1 / (2π * sqrt(inductance * capacitance))",
            },
        ],
    },
    {
        id: "27",
        name: "Doppler Effect",
        description:
            "The Doppler effect describes the change in frequency of a wave for an observer moving relative to its source. This formula gives the observed frequency.",
        categories: ["Physics", "Waves", "Sound"],
        inputVariables: ["f_source", "v", "v_observer", "v_source"],
        calculators: [
            {
                id: "dop789123456",
                latex: "f_{observed} = f_{source}\\frac{v \\pm v_{observer}}{v \\mp v_{source}}",
                preview:
                    "observed frequency = source frequency * (wave speed ± observer speed)/(wave speed ∓ source speed)",
            },
        ],
    },
    {
        id: "28",
        name: "Heat Transfer",
        description:
            "The rate of heat transfer through conduction is proportional to the temperature difference and the thermal conductivity of the material.",
        categories: ["Physics", "Thermodynamics", "Heat"],
        inputVariables: ["k", "A", "dT", "dx"],
        calculators: [
            {
                id: "heat123789456",
                latex: "Q = -k A \\frac{dT}{dx}",
                preview:
                    "heat transfer = -thermal conductivity * area * temperature gradient",
            },
        ],
    },
];
