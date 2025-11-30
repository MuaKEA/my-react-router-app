import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useLoaderData } from "react-router";

// Loader function to get hostname from environment
export async function loader({}: Route.LoaderArgs) {
  // Hent hostname fra container
  // I Kubernetes sættes HOSTNAME via fieldRef til pod navn (metadata.name)
  // Dette er pod navnet som f.eks. "hello-website-xxxxx-xxxxx"
  const hostname = process.env.HOSTNAME || "unknown";
  
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
