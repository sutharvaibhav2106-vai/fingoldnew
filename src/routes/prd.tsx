import { createFileRoute } from "@tanstack/react-router";
import FingoldPRD from "../components/site/FingoldPRD";

export const Route = createFileRoute("/prd")({
  component: FingoldPRD,
});
