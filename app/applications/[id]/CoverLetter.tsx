import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  company: string;
  position: string;
  notes: string;
};
export default function CoverLetter({ company, position, notes }: Props) {
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");

  const handleCoverLetter = async () => {
    setLoading(true);

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "user",
              content: `Write a professional cover letter for a ${position} position at ${company}.
Candidate name: ${name}.
Skills: ${skills}.
Experience: ${experience}.
Additional context: ${notes}.
Write a complete letter without any placeholders or brackets.`,
            },
          ],
        }),
      },
    );

    const data = await response.json();
    console.log(data);

    if (data.error) {
      toast.error("Failed to generate. Please try again in a moment.");
      setLoading(false);
      return;
    }

    const text = data.choices[0].message.content;
    setLetter(text);
    setLoading(false);
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="font-medium">AI Cover Letter</h2>
        <div className="space-y-4">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label>Skills</Label>
            <Input
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="React, TypeScript, Node.js"
            />
          </div>
          <div className="space-y-1">
            <Label>Experience</Label>
            <Input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="3 years of frontend development"
            />
          </div>
        </div>
        <Button onClick={handleCoverLetter} disabled={loading}>
          {loading ? "Generating..." : "Generate Cover Letter"}
        </Button>
        {letter && <p className="mt-4 text-sm whitespace-pre-wrap">{letter}</p>}
      </CardContent>
    </Card>
  );
}
