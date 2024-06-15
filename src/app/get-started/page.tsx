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
import { Download, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import axios from "axios";

export default function Component() {
  const [activeTab, setActiveTab] = useState("input");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const predict = async (e:any) => {
    e.preventDefault();
    toast({
      title: "Calling API 📡",
      description: "Please wait while we process the data",
    });
    try {
      const response = await axios.post("https://httpbin.org/post", {
        userInput,
      });
      const data = JSON.parse(response.data.data); // Parse the string back to JSON

      toast({
        title: "Response Ready ✅✨",
        description: "Data has been fetched successfully.",
      });
      setOutput(data.userInput); // Now you can access userInput
      setActiveTab("output");
    } catch (error) {
      toast({
        title: "Error ❌",
        description:
          "An error occurred while fetching data. Please try again later.",
      });
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
              <div className="flex items-center">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Upload PDF</Label>
                  <Input id="picture" type="file" />
                </div>
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
          <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4">
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
              this is the summary of the job description
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
            <Button type="submit">
              <Link href={"/analyze-resume"}>analyze resume📜</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
