import AiAssistant from "@/components/Ai-assistant";
import Navbar from "@/components/Navbar";


export default function Home() {
  return(
    <main className="w-full h-screen flex flex-col items-between">
      <div className="w-full h-20">
        <Navbar />
      </div>
      <AiAssistant />
    </main>
  )
}