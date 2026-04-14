export function FftVisualizer({ fft }: { fft: number[] }) {
  return (
    <div className="flex gap-1 items-center h-full">
      {fft.map((value, i) => {
        const percent = (value / 4) * 100;
        return (
          <div
            className="min-h-0.5 bg-primary/75 w-0.5 rounded"
            key={i}
            style={{ height: `${percent < 10 ? 0 : percent}%` }}
          />
        );
      })}
    </div>
  );
}
