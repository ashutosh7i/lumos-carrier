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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import axios from "axios";
import GaugeChart from "react-gauge-chart";

export default function Component() {
  const [activeTab, setActiveTab] = useState("input");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const { toast } = useToast();

  const predict = async (e) => {
    e.preventDefault();
    toast({
      title: "Calling API 📡",
      description: "Please wait while we process the data",
    });
    try {
      const response = await axios.post("https://httpbin.org/post", {
        userInput,
      });
      const data = JSON.parse(response.data.data);

      toast({
        title: "Response Ready ✅✨",
        description: "Data has been fetched successfully.",
      });
      setOutput(data.userInput);
      setActiveTab("output");
    } catch (error) {
      toast({
        title: "Error ❌",
        description:
          "An error occurred while fetching data. Please try again later.",
      });
    }
  };

  const handlePrintCard = () => {
    const printWindow = window.open("", "_blank");
    const cardHTML = document.getElementById("resume-analyzer-card").outerHTML;
    printWindow.document.write(
      "<html><head><title>Resume Analyzer</title></head><body>"
    );
    printWindow.document.write(cardHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
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
                <CardTitle>Resume Analyzer📜</CardTitle>
                <CardDescription>
                  Analyze your resume and get a summary of it.
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
                placeholder="Paste raw resume here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full"
              />
            </form>
          </CardContent>
          <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4">
            <Button type="submit" onClick={predict}>
              Analyze📃
            </Button>
          </CardFooter>
        </Card>
        <TabsList className="grid gap-2">
          <TabsTrigger value="output">Output</TabsTrigger>
        </TabsList>
      </TabsContent>
      <TabsContent value="output">
        <Card id="resume-analyzer-card">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="w-1/2">
                <CardTitle>Resume Analyzer📜</CardTitle>
                <CardDescription>
                  This is the summary of your resume.
                </CardDescription>
                <p>
                  Profile Summary: Lorem ipsum, dolor sit amet consectetur
                  adipisicing elit. Ratione sapiente molestiae, est soluta
                  deserunt quidem consequatur doloribus ut voluptatum omnis!
                  Quae totam vero voluptatem amet et provident iure quaerat ad,
                  dolorem, omnis incidunt aut quis modi doloribus quidem?
                  Perferendis soluta adipisci consequatur possimus maxime. Et
                  maiores ducimus animi culpa dignissimos.
                </p>
              </div>
              <div className="flex flex-col items-center w-1/2 space-y-4">
                <div className="flex flex-col items-center w-full">
                  <GaugeChart
                    textColor="black"
                    colors={["#FF5F6D", "#FFC371", "#ffe300", "#00ff00"]}
                    id="gauge-chart4"
                    nrOfLevels={10}
                    arcPadding={0.1}
                    cornerRadius={3}
                    percent={0.6}
                  />
                  <p>JD match score</p>
                </div>
                <div className="flex flex-col items-center w-full">
                  <p>ATS Friendliness: Good</p>
                  <p>Missing Keywords: </p>
                </div>
              </div>
            </div>
          </CardHeader>

          {/* <CardContent className="pt-10">
            <div className="prose">{output}</div>
          </CardContent> */}
          <CardContent className="pt-2">
            <p>
              Things to add: Lorem ipsum, dolor sit amet consectetur adipisicing
              elit.
            </p>
            <p>Things to remove: </p>
          </CardContent>
          <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 ">
            <Button
              variant={"outline"}
              className="mr-4"
              onClick={handlePrintCard}
            >
              Download
              <Download className="ml-2 h-4 w-4" />
            </Button>
            <Button type="submit">
              <Link href={"/generate-resume"}>Generate resume🪄✨</Link>
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
