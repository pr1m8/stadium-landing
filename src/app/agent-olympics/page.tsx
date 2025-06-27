import { AgentOlympics } from "@/components/sections/agent-olympics";
import { AgentOlympicsSignup } from "@/components/sections/agent-olympics-signup";
import StaidiumNav from "@/components/nav/staidium-nav";
import StaidiumFooter from "@/components/nav/staidium-footer";

export default function AgentOlympicsPage() {
  return (
    <>
      <StaidiumNav />
      <main className="min-h-screen bg-background">
        <AgentOlympics />
        <AgentOlympicsSignup />
      </main>
      <StaidiumFooter />
    </>
  );
}
