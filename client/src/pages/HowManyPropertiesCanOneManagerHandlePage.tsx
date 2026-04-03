import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function HowManyPropertiesCanOneManagerHandlePage() {
  return <ResourceArticlePage article={getResourceArticle("/how-many-properties-can-one-manager-handle")!} />;
}
