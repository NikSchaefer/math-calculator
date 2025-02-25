interface FractionDisplayProps {
    numerator: bigint;
    denominator: bigint;
}

export function FractionDisplay({
    numerator,
    denominator,
}: FractionDisplayProps) {
    return (
        <div className="flex p-2 text-base flex-col items-center">
            <span>{numerator}</span>
            <hr className="w-1/2 border-t border-gray-300" />
            <span>{denominator}</span>
        </div>
    );
}
