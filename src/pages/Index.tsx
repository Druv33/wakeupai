import { HeroSection } from "@/components/home/HeroSection";
import { ToolSection } from "@/components/home/ToolSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ValueSection } from "@/components/home/ValueSection";
import { UseCasesSection } from "@/components/home/UseCasesSection";
import { FAQSection } from "@/components/home/FAQSection";
import { AdSlot } from "@/components/home/AdSlot";

const Index = () => (
  <>
    <HeroSection />
    <AdSlot position="header" />
    <ToolSection />
    <HowItWorksSection />
    <ValueSection />
    <AdSlot position="in-content-1" />
    <UseCasesSection />
    <FAQSection />
  </>
);

export default Index;
