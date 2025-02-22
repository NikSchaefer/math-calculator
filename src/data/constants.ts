import { Variable } from "@/types";

export const constantsAsArray: Variable[] = [
    { id: "Gravitational Acceleration", name: "g", value: 9.81 },
    { id: "Avogadro's Number", name: "N_A", value: 6.02214076e23 },
    { id: "Speed of Light", name: "c", value: 299792458 },
    { id: "Planck's Constant", name: "h", value: 6.62607015e-34 },
    { id: "Boltzmann Constant", name: "k_B", value: 1.380649e-23 },
    { id: "Electron Charge", name: "e", value: 1.602176634e-19 },
    { id: "Electron Mass", name: "m_e", value: 9.1093837015e-31 },
    { id: "Proton Mass", name: "m_p", value: 1.67262192369e-27 },
    { id: "Neutron Mass", name: "m_n", value: 1.67492749804e-27 },
    { id: "Vacuum Permittivity", name: "ε_0", value: 8.8541878128e-12 },
    { id: "Vacuum Permeability", name: "μ_0", value: 1.25663706212e-6 },
    { id: "Universal Gas Constant", name: "R", value: 8.31446261815324 },
    { id: "Stefan-Boltzmann Constant", name: "σ", value: 5.670374419e-8 },
    { id: "Fine Structure Constant", name: "α", value: 7.297352569e-3 },
    { id: "Rydberg Constant", name: "R_∞", value: 10973731.56816 },
    { id: "Atomic Mass Unit", name: "u", value: 1.6605390666e-27 },
    { id: "faraday", name: "F", value: 96485.33212 },
    { id: "Ideal Gas Volume", name: "V_m", value: 0.022413996 },
    { id: "Standard Atmosphere", name: "atm", value: 101325 },
    { id: "Golden Ratio", name: "φ", value: 1.618033988749895 },
    { id: "Speed of Sound in Air", name: "v_s", value: 343 },
    { id: "Earth Radius", name: "R_⊕", value: 6.371e6 },
];

export const constants = Object.fromEntries(
    constantsAsArray.map((c) => [c.name, c.value])
);
