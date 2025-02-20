import { Preset } from "@/types";

export const formulas: Preset[] = [
    {
        id: "1",
        name: "Magnitude (Pythagorean Theorem)",
        calculators: [
            {
                id: "1",
                latex: "c=\\sqrt{a^2+b^2}",
            },
        ],
    },
    {
        id: "2",
        name: "Kinetic Energy",
        calculators: [
            { id: "8hb95e14b4eg8", latex: "KE=\\frac{1}{2}mv^2" },
        ],
    },
    {
        id: "3",
        name: "Potential Energy",
        calculators: [
            {
                id: "1",
                latex: "PE = mgh",
            },
        ],
    },
    {
        id: "4",
        name: "Work",
        calculators: [
            {
                id: "1",
                latex: "W = Fd",
            },
        ],
    },
];
