import TactileButton from "@/components/ui/tactile-button";

export default function TactileButtonDemo() {
  return (
    <div className="h-[420px] w-full overflow-hidden flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-[210px] h-[55px]">
        <TactileButton className="h-full w-full" href="#" />
      </div>
    </div>
  );
}
