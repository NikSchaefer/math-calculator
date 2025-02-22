import { Variable } from "@/types";

const constantsAsArray: Variable[] = [
    { id: "gravity", name: "g", value: 9.81 },
    { id: "avogadro", name: "N_A", value: 6.02214076e23 },
    { id: "speedOfLight", name: "c", value: 299792458 },
    { id: "planck", name: "h", value: 6.62607015e-34 },
    { id: "boltzmann", name: "k_B", value: 1.380649e-23 },
    { id: "electronCharge", name: "e", value: 1.602176634e-19 },
    { id: "electronMass", name: "m_e", value: 9.1093837015e-31 },
    { id: "protonMass", name: "m_p", value: 1.67262192369e-27 },
    { id: "neutronMass", name: "m_n", value: 1.67492749804e-27 },
    { id: "vacuumPermittivity", name: "ε_0", value: 8.8541878128e-12 },
    { id: "vacuumPermeability", name: "μ_0", value: 1.25663706212e-6 },
    { id: "universalGas", name: "R", value: 8.31446261815324 },
    { id: "stefanBoltzmann", name: "σ", value: 5.670374419e-8 },
    { id: "fineStructure", name: "α", value: 7.297352569e-3 },
    { id: "rydberg", name: "R_∞", value: 10973731.56816 },
    { id: "atomicMass", name: "u", value: 1.6605390666e-27 },
    { id: "faraday", name: "F", value: 96485.33212 },
    { id: "idealGasVolume", name: "V_m", value: 0.022413996 },
    { id: "standardAtm", name: "atm", value: 101325 },
    { id: "goldenRatio", name: "φ", value: 1.618033988749895 },
    { id: "speedOfSoundAir", name: "v_s", value: 343 },
    { id: "earthRadius", name: "R_⊕", value: 6.371e6 },
];

export const constants = Object.fromEntries(
    constantsAsArray.map((c) => [c.name, c.value])
);
