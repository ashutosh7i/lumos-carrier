"use client";

import { useState, useEffect } from "react";
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
import { getDocument, updateDocument, uploadResume } from "../appwrite";

export default function Component() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("input");
  const [userInput, setUserInput] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jd, setJd] = useState("");
  const [output, setOutput] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const { toast } = useToast();

  // Fetch the user's data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getDocument();
        setUser(user);
      } catch (error) {
        alert("Failed to fetch user data: " + error.message);
      }
    };
    fetchData();
  }, []);
  // setting jd from user data
  useEffect(() => {
    if (user) {
      setJd(user.user_jd);
      console.log(jd);
    }
  }, [user,jd]);

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const parsePercentage = (percentageString) => {
    if (!percentageString) return 0;
    const numericPart = percentageString.replace("%", "");
    return parseFloat(numericPart) / 100;
  };

  const analyzeResume = async (e) => {
    e.preventDefault();
    toast({
      title: "Analyzing Resume 📡",
      description: "Please wait while we process the data",
    });

    // if (!userInput || !resumeFile) {
    //   toast({
    //     title: "Error ❌",
    //     description: "Please provide both job description and resume.",
    //   });
    //   return;
    // }

    if (!resumeFile) {
      toast({
        title: "Error ❌",
        description: "Please provide your resume.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("job_description", jd);
    formData.append("resume", resumeFile);

    try {
      const response = await axios.post(
        "http://20.188.113.104/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;

      // Update state with analysis result
      setAnalysisResult(data);
      setActiveTab("output");

      // Display success toast
      toast({
        title: "Analysis Complete ✅✨",
        description: "Your resume has been analyzed successfully.",
      });

      // Automatically save the analysis result to the database
      handleSave(data);
      // Upload the resume to the bucket
      handleUpload();
    } catch (error) {
      toast({
        title: "Error ❌",
        description:
          "An error occurred while analyzing the resume. Please try again later.",
      });
    }
  };

  //  Save the analysis result to the database
  const handleSave = async (analysisData) => {
    let analysisDataString = JSON.stringify(analysisData);
    console.log(typeof analysisDataString);
    try {
      await updateDocument(undefined, analysisDataString, undefined, undefined);
      toast({
        title: "Save Successful ✅",
        description: "Resume analysis has been saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Save Failed ❌",
        description: "Failed to save resume analysis: " + error.message,
      });
    }
  };

  // upload user's resume to bucket
  const handleUpload = async () => {
    try {
      await uploadResume(resumeFile);
      toast({
        title: "Upload Successful ✅",
        description: "Your resume has been uploaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Upload Failed ❌",
        description: "Failed to upload resume: " + error.message,
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
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="resume">Upload PDF</Label>
                <Input
                  required
                  id="resume"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 flex justify-center">
              <Button type="submit" onClick={analyzeResume}>
                Analyze📃
              </Button>
            </CardFooter>
          </CardContent>
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
                {analysisResult && (
                  <>
                    <p>Profile Summary: {analysisResult["Profile Summary"]}</p>
                    <p>
                      Things to be Removed:{" "}
                      {analysisResult["ThingsToBeRemoved"].join(", ")}
                    </p>
                    <p>
                      Things to be Added:{" "}
                      {analysisResult["ThingsToBeAdded"].join(", ")}
                    </p>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center w-1/2 space-y-4">
                <div className="flex flex-col items-center w-full">
                  {analysisResult && (
                    <GaugeChart
                      textColor="black"
                      colors={["#FF5F6D", "#FFC371", "#ffe300", "#00ff00"]}
                      id="gauge-chart4"
                      nrOfLevels={10}
                      arcPadding={0.1}
                      cornerRadius={3}
                      percent={parsePercentage(analysisResult["JD Match"])}
                    />
                  )}
                  <p>JD match score</p>
                </div>
                <div className="flex flex-col items-center w-full">
                  {analysisResult && (
                    <>
                      <p>
                        ATS Friendliness: {analysisResult["ATS Friendliness"]}
                      </p>
                      <p>
                        Missing Keywords:{" "}
                        {analysisResult["MissingKeywords"].join(", ")}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            {/* Render more details from analysisResult if needed */}
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
