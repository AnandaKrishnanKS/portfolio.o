import LenisProvider from "@/components/LenisProvider";
import PortfolioContainer from "@/components/PortfolioContainer";

export default function Home() {
  return (
    <LenisProvider>
      <PortfolioContainer />
    </LenisProvider>
  );
}
