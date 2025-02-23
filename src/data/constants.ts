import { Variable } from "@/types";

export const constantsAsArray: Variable[] = [
    {
        id: "Gravitational Acceleration",
        name: "g",
        value: 9.81,
        description:
            "The acceleration due to gravity on Earth's surface (in m/s²). Example: A falling apple accelerates at 9.81 m/s².",
    },
    {
        id: "Avogadro's Number",
        name: "N_A",
        value: 6.02214076e23,
        description:
            "Number of particles in one mole of a substance. Example: 1 mole of water (18g) contains 6.02214076e23 water molecules.",
    },
    {
        id: "Speed of Light",
        name: "c",
        value: 299792458,
        description:
            "The speed at which light travels in a vacuum (in m/s). Example: Light takes about 8 minutes to travel from the Sun to Earth.",
    },
    {
        id: "Planck's Constant",
        name: "h",
        value: 6.62607015e-34,
        description:
            "Fundamental constant relating energy of a photon to its frequency (in J⋅s). Example: A green light photon (540nm) has energy E = h × f ≈ 3.68 × 10⁻¹⁹ J.",
    },
    {
        id: "Boltzmann Constant",
        name: "k_B",
        value: 1.380649e-23,
        description:
            "Relates temperature to particle energy (in J/K). Example: At room temperature (300K), average molecular kinetic energy is (3/2)k_B T ≈ 6.21 × 10⁻²¹ J.",
    },
    {
        id: "Electron Charge",
        name: "e_c",
        value: 1.602176634e-19,
        description:
            "The magnitude of electric charge carried by an electron (in Coulombs). Example: Current of 1 ampere means 6.242 × 10¹⁸ electrons passing per second.",
    },
    {
        id: "Electron Mass",
        name: "m_e",
        value: 9.1093837015e-31,
        description:
            "Mass of an electron at rest (in kg). Example: The mass-energy of an electron is m_e c² ≈ 8.187 × 10⁻¹⁴ Joules.",
    },
    {
        id: "Proton Mass",
        name: "m_p",
        value: 1.67262192369e-27,
        description:
            "Mass of a proton at rest (in kg). Example: A proton is about 1836 times heavier than an electron.",
    },
    {
        id: "Neutron Mass",
        name: "m_n",
        value: 1.67492749804e-27,
        description:
            "Mass of a neutron at rest (in kg). Example: A neutron is slightly heavier than a proton by about 0.14%.",
    },
    {
        id: "Vacuum Permittivity",
        name: "ε_0",
        value: 8.8541878128e-12,
        description:
            "Permittivity of free space (in F/m). Example: It determines the speed of light in a vacuum.",
    },
    {
        id: "Vacuum Permeability",
        name: "μ_0",
        value: 1.25663706212e-6,
        description:
            "Magnetic constant (in N/A²). Example: It determines the permeability of free space.",
    },
    {
        id: "Universal Gas Constant",
        name: "R",
        value: 8.31446261815324,
        description:
            "Gas constant (in J/(mol⋅K)). Example: It relates pressure, volume, and temperature of an ideal gas.",
    },
    {
        id: "Stefan-Boltzmann Constant",
        name: "σ",
        value: 5.670374419e-8,
        description:
            "Stefan-Boltzmann constant (in W/(m²⋅K⁴)). Example: It describes the power radiated from a black body.",
    },
    {
        id: "Fine Structure Constant",
        name: "α",
        value: 7.297352569e-3,
        description:
            "Fine-structure constant (dimensionless). Example: It determines the strength of the electromagnetic force.",
    },
    {
        id: "Rydberg Constant",
        name: "R_∞",
        value: 10973731.56816,
        description:
            "Rydberg constant (in m⁻¹). Example: It is used to calculate the wavelengths of spectral lines.",
    },
    {
        id: "Atomic Mass Unit",
        name: "u",
        value: 1.6605390666e-27,
        description:
            "Atomic mass unit (in kg). Example: It is used to express the mass of atoms and molecules.",
    },
    {
        id: "faraday",
        name: "F",
        value: 96485.33212,
        description:
            "Faraday constant (in C/mol). Example: It relates the charge of a mole of electrons to the current.",
    },
    {
        id: "Ideal Gas Volume",
        name: "V_m",
        value: 0.022413996,
        description:
            "Molar volume of an ideal gas at STP (in m³/mol). Example: It is used to calculate the volume of a gas.",
    },
    {
        id: "Standard Atmosphere",
        name: "atm",
        value: 101325,
        description:
            "Standard atmosphere (in Pa). Example: It is the pressure at sea level.",
    },
    {
        id: "Golden Ratio",
        name: "φ",
        value: 1.618033988749895,
        description:
            "Golden ratio (dimensionless). Example: It is used in art and architecture for aesthetically pleasing designs.",
    },
    {
        id: "Speed of Sound in Air",
        name: "v_s",
        value: 343,
        description:
            "Speed of sound in air at 20°C (in m/s). Example: It is the speed at which sound waves propagate.",
    },
    {
        id: "Earth Radius",
        name: "R_⊕",
        value: 6.371e6,
        description:
            "Mean radius of Earth (in m). Example: It is used to calculate the surface area and volume of Earth.",
    },
];

export const constants = Object.fromEntries(
    constantsAsArray.map((c) => [c.name, c.value])
);
