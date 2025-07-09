export default function Footer() {
  return (
    <footer className="fixed bottom-6 left-8">
      <p className="text-balance text-center text-xs leading-loose text-muted-foreground md:text-left">
        Built by{" "}
        <a
          href="https://github.com/NikSchaefer"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 font-medium"
        >
          Nik Schaefer
        </a>
        . The source code is available on{" "}
        <a
          href="https://github.com/NikSchaefer/math-calculator"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4 font-medium"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
