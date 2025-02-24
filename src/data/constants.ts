import { PresetVariable } from "@/types";

export const constantsAsArray: PresetVariable[] = [
    {
        name: "Acceleration due to gravity",
        variable: "g",
        value: 9.80665,
        description:
            "The acceleration experienced by an object falling freely near the Earth's surface.  This is a standard value, and may vary slightly depending on location. Units are meters per second squared (m/s²).",
    },
    {
        name: "Avogadro's number",
        variable: "N_A",
        value: 6.02214076e23,
        description:
            "The number of constituent particles (atoms, molecules, ions, etc.) that are contained in one mole of a substance. It's a fundamental constant in chemistry. Units are per mole (mol⁻¹).",
    },
    {
        name: "Planck's constant",
        variable: "h_P",
        value: 6.62607015e-34,
        description:
            "A fundamental constant in quantum mechanics that relates the energy of a photon to its frequency. Units are Joule-seconds (J⋅s).",
    },
    {
        name: "Speed of light in vacuum",
        variable: "c_{light}",
        value: 299792458,
        description:
            "The speed at which light travels in a vacuum. It's a universal constant in physics. Units are meters per second (m/s).",
    },
    {
        name: "Boltzmann constant",
        variable: "k_B",
        value: 1.380649e-23,
        description:
            "Relates the average kinetic energy of particles in a gas to the absolute temperature. It's a fundamental constant in thermodynamics and statistical mechanics. Units are Joules per Kelvin (J/K).",
    },
    {
        name: "Elementary charge",
        variable: "q_e",
        value: 1.602176634e-19,
        description:
            "The magnitude of the electric charge carried by a single proton or electron. It's a fundamental constant in physics. Units are Coulombs (C).",
    },
    {
        name: "Permittivity of free space",
        variable: "ε_0",
        value: 8.854187817e-12,
        description:
            "A constant that relates the electric field to electric displacement in a vacuum. It's a fundamental constant in electromagnetism. Units are Farads per meter (F/m).",
    },
    {
        name: "Permeability of free space",
        variable: "μ_0",
        value: 4 * Math.PI * 1e-7, // 4π × 10⁻⁷
        description:
            "A constant that relates the magnetic field to magnetic flux density in a vacuum. It's a fundamental constant in electromagnetism. Units are Henrys per meter (H/m) or Tesla-meters per ampere (T⋅m/A).",
    },
    {
        name: "Gas constant",
        variable: "R",
        value: 8.314462618,
        description:
            "The ideal gas constant, relating the pressure, volume, temperature, and number of moles of an ideal gas. Units are Joules per mole-Kelvin (J/(mol⋅K)).",
    },
    {
        name: "Atomic mass unit",
        variable: "m_{amu}",
        value: 1.6605390666e-27,
        description:
            "A standard unit of mass used to express the mass of atoms and molecules. One atomic mass unit is approximately equal to the mass of one proton or neutron. Units are kilograms (kg).",
    },
    {
        name: "Rydberg constant",
        variable: "R_y",
        value: 1.0973731568e7,
        description:
            "A fundamental constant in atomic physics that relates to the atomic spectra of hydrogen. Units are per meter (m⁻¹).",
    },
    {
        name: "Fine-structure constant",
        variable: "α",
        value: 7.2973525664e-3,
        description:
            "A dimensionless physical constant that characterizes the strength of the electromagnetic interaction. It's related to the elementary charge, speed of light, and Planck's constant. It is dimensionless.",
    },
    {
        name: "Bohr radius",
        variable: "a_0",
        value: 5.291772109e-11,
        description:
            "The approximate radius of the electron's orbit in the ground state of the hydrogen atom. Units are meters (m).",
    },
    {
        name: "Electron mass",
        variable: "m_e",
        value: 9.1093837015e-31,
        description: "The mass of an electron. Units are kilograms (kg).",
    },
    {
        name: "Proton mass",
        variable: "m_p",
        value: 1.67262192369e-27,
        description: "The mass of a proton. Units are kilograms (kg).",
    },
    {
        name: "Neutron mass",
        variable: "m_n",
        value: 1.674927495e-27,
        description: "The mass of a neutron. Units are kilograms (kg).",
    },
    {
        name: "Magnetic constant",
        variable: "μ",
        value: 4 * Math.PI * 1e-7, // Same as μ_0
        description:
            "Relates the magnetic field to its sources. Units are Henrys per meter (H/m) or Tesla-meters per ampere (T⋅m/A).",
    },
    {
        name: "Atmospheric pressure (standard)",
        variable: "P_atm",
        value: 101325,
        description:
            "The standard atmospheric pressure at sea level. Units are Pascals (Pa).",
    },
    {
        name: "Molar mass of carbon-12",
        variable: "M_C12",
        value: 0.012,
        description:
            "The mass of one mole of carbon-12 atoms. Units are kilograms per mole (kg/mol).",
    },
    {
        name: "Faraday constant",
        variable: "F_A",
        value: 96485.33212,
        description:
            "The amount of electric charge carried by one mole of electrons. Units are Coulombs per mole (C/mol).",
    },
    {
        name: "Speed of sound in air (at 20°C)",
        variable: "v_s",
        value: 343,
        description:
            "The speed of sound in air at approximately 20°C.  This value can vary slightly with temperature and air pressure. Units are meters per second (m/s).",
    },
    {
        name: "Golden ratio",
        variable: "φ", // or phi
        value: 1.6180339887,
        description:
            "An irrational mathematical constant approximately equal to 1.6180339887. It appears in many areas of mathematics, nature, and art. It is dimensionless.",
    },
];

export const constants = Object.fromEntries(
    constantsAsArray.map((c) => [c.variable, c.value])
);
