import { EyeTracking } from "@/components/ui/eye-tracking";

export default function EyeTrackingDemo() {
  return (
    <div className="flex min-h-[420px] w-full items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)]">
      <EyeTracking 
        eyeSize={140} 
        gap={30} 
        variant="minimal"
        scleraColor="#f5f5f5"
        irisColor="#888888"
        irisColorSecondary="#1f1f1f"
        pupilColor="#030303"
      />
    </div>
  );
}
