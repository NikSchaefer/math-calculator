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
    name: "Coulombs constant",
    variable: "k_e",
    value: 8.9875517923e9,
    description:
      "A proportionality constant in Coulomb's law, which describes the electrostatic force between two charged particles. Units are Newton square meters per square Coulomb (N⋅m²/C²).",
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
    variable: "R_g",
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
];

export const constants = Object.fromEntries(
  constantsAsArray.map((c) => [c.variable, c.value]),
);
