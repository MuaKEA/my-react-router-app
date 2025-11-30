import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useLoaderData } from "react-router";

// Loader function to get hostname from environment
export async function loader({}: Route.LoaderArgs) {
  // Hent pod navn
  const podName = process.env.HOSTNAME || "unknown";
  
  // Generer statisk instance navn fra pod navn
  // Konverterer "hello-website-588dcc776f-nw4sp" til "instance-1", "instance-2", etc.
  function generateInstanceName(podName: string): string {
    if (podName === "unknown") {
      return "instance-unknown";
    }
    
    // Hash pod navn for at få konsistent nummer
    let hash = 0;
    for (let i = 0; i < podName.length; i++) {
      const char = podName.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Get instance number (1-999) based on hash
    const instanceNum = (Math.abs(hash) % 999) + 1;
    return `instance-${instanceNum}`;
  }
  
  const hostname = generateInstanceName(podName);
  
  return {
    hostname,
    timestamp: new Date().toISOString(),
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { hostname, timestamp } = useLoaderData<typeof loader>();
  return <Welcome hostname={hostname} timestamp={timestamp} />;
}
