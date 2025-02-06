import { Badge } from "@/components/ui/badge";
import ideaService from "../_services/ideaService";

export default async function Admin() {
  const ideas = await ideaService.getAllIdeas();

  return (
    <div>
      {ideas.map((idea) => (
        <div key={idea.id}>
          <div>idea: {idea.idea}</div>
          <div>tags: {idea.tags}</div>
          <div>theme: {idea.theme}</div>
          <div>type: {idea.type}</div>
          <div>age: {idea.age_range}</div>
          <div>
            equipment:{" "}
            {idea.equipment.map((item) => (
              <Badge>{item.name}</Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
