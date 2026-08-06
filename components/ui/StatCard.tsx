import { Counter } from "@/components/animations/Counter";

export function StatCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  return (
    <div className="rounded-card border border-ink/10 bg-white p-6">
      <p className="font-heading text-4xl font-semibold text-ink sm:text-5xl">
        <Counter value={value} suffix={suffix} />
      </p>
      <p className="mt-2 text-sm text-gray-body">{label}</p>
    </div>
  );
}
