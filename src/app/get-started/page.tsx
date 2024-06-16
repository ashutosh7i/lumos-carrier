"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import axios from "axios";
import { updateDocument } from "../appwrite";

export default function Component() {
  const [activeTab, setActiveTab] = useState("input");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state
  const { toast } = useToast();

  const predict = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!userInput.trim()) {
      toast({
        title: "Error ❌",
        description: "Please enter some text in the textarea.",
      });
      return;
    }

    toast({
      title: "Calling API 📡",
      description: "Please wait while we process the data",
    });

    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://backend.lumoscareer.co/summarize",
        {
          job_description: userInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data.summary);
      await updateDocument(
        undefined,
        undefined,
        undefined,
        undefined,
        response.data.summary
      );
      toast({
        title: "Data Saved ✅",
        description: "Your data has been saved successfully.",
      });
      setOutput(response.data.summary);
      setActiveTab("output");
    } catch (error) {
      toast({
        title: "Error ❌",
        description:
          "An error occurred while fetching data. Please try again later.",
      });
    } finally {
      setLoading(false); // End loading
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Job Description</title></head><body>"
      );
      printWindow.document.write(output);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error("Failed to open print window.");
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full max-w-3xl mx-auto"
    >
      <TabsList className="grid gap-2">
        <TabsTrigger value="input">Input</TabsTrigger>
      </TabsList>
      <TabsContent value="input">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Job-Description Summarizer📃</CardTitle>
                <CardDescription>
                  This tool will help you summarize your job description.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={predict} className="space-y-4">
              <Textarea
                placeholder="Paste job description here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full"
              />
            </form>
          </CardContent>
          <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 flex justify-center">
            <Button type="submit" onClick={predict}>
              Summarize📃
            </Button>
          </CardFooter>
        </Card>
        <TabsList className="grid gap-2">
          <TabsTrigger value="output">Output</TabsTrigger>
        </TabsList>
      </TabsContent>
      <TabsContent value="output">
        <Card>
          <CardHeader>
            <CardTitle>JD Summary:</CardTitle>
            <CardDescription>
              This is the summary of the job description.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose">{output}</div>
          </CardContent>
          <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 ">
            <Button variant={"outline"} className="mr-4" onClick={handlePrint}>
              Download
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button type="submit" disabled={loading}>
              <Link href={loading ? "#" : "/analyze-resume"}>
                analyze resume📜
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
