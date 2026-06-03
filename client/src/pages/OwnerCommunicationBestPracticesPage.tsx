import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function OwnerCommunicationBestPracticesPage() {
  return <ResourceArticlePage article={getResourceArticle("/owner-communication-best-practices")!} />;
}
