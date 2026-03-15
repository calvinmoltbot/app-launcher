import { MobileGrid } from "@/components/mobile-grid";
import { DesktopCards } from "@/components/desktop-cards";

export default function Home() {
  return (
    <>
      {/* Mobile: iOS grid layout */}
      <div className="md:hidden">
        <MobileGrid />
      </div>

      {/* Desktop: Card portfolio layout */}
      <div className="hidden md:block">
        <DesktopCards />
      </div>
    </>
  );
}
