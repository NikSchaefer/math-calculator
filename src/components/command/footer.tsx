const DefaultFooter = ({
    setShowInfo,
}: {
    setShowInfo: (show: boolean) => void;
}) => {
    return (
        <div className="flex gap-2 border-t items-center justify-end mt-4 p-3">
            <button
                className="flex items-center gap-2 text-xs"
                onClick={() => setShowInfo(true)}
            >
                Learn More
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-lg pb-1">↵</span>
                </kbd>
            </button>
            <div className="h-3 w-px bg-slate-300" />
            <button className="flex items-center text-xs text-muted-foreground">
                Use Formula
                <kbd className="ml-2 mr-0.5 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-base">⌘</span>
                </kbd>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-lg pb-1">↵</span>
                </kbd>
            </button>
        </div>
    );
};

const InfoFooter = ({
    onUseItem,
    setShowInfo,
}: {
    onUseItem: () => void;
    setShowInfo: (show: boolean) => void;
}) => {
    return (
        <div className="flex gap-2 border-t items-center justify-end mt-4 p-3">
            <button
                className="flex items-center gap-2 text-xs focus:outline-none"
                autoFocus
                onClick={onUseItem}
            >
                Use Formula
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-lg pb-1">↵</span>
                </kbd>
            </button>
            <div className="h-3 w-px bg-slate-300" />
            <button
                className="flex items-center text-xs text-muted-foreground"
                onClick={() => setShowInfo(false)}
            >
                Back
                <kbd className="ml-2 mr-0.5 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">Esc</span>
                </kbd>
            </button>
        </div>
    );
};

export default function CommandFooter({
    showInfo,
    onUseItem,
    setShowInfo,
}: {
    showInfo: boolean;
    onUseItem: () => void;
    setShowInfo: (show: boolean) => void;
}) {
    return showInfo ? (
        <InfoFooter onUseItem={onUseItem} setShowInfo={setShowInfo} />
    ) : (
        <DefaultFooter setShowInfo={setShowInfo} />
    );
}
