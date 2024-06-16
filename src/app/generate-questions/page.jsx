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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Download, Mail, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import axios from "axios";
import { getDocument, updateDocument, getResume } from "../appwrite";
import { useRouter } from "next/navigation";
import Editor from "@/components/Editor";
import "./loader.css";
import Image from "next/image";
import successKidGif from "./successkid.gif";

export default function Component() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("input");
  const [userInput, setUserInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const { toast } = useToast();

  const [showJDBadge, setShowJDBadge] = useState(false);
  const [showResumeBadge, setShowResumeBadge] = useState(false);
  const [showResumeAnalysisBadge, setShowResumeAnalysisBadge] = useState(false);

  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [userAdditionalInfo, setUserAdditionalInfo] = useState("");

  const [resumeUrl, setResumeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const content = `
 <center><h1>Getting ready</h1></center>
`;

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

  //setting the badges ,socials and additional info
  useEffect(() => {
    console.log(user);
    if (user) {
      if (user.user_jd) {
        setShowJDBadge(true);
      }
      if (user.user_resume) {
        // if user_resume is present, then it means the resume is available in storage
        // so we can get it from the storage
        getResume()
          .then((resumeurl) => {
            setResumeUrl(resumeurl);
            setShowResumeBadge(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      if (user.resume_report) {
        setShowResumeAnalysisBadge(true);
      }
      if (user.user_socials) {
        setLinkedin(user.user_socials[0]);
        setGithub(user.user_socials[1]);
        setPortfolio(user.user_socials[2]);
      }
      if (user.user_additional_info) {
        setUserAdditionalInfo(user.user_additional_info);
      }
    }
  }, [user]);
  const handleSave = async () => {
    const userSocials = [linkedin, github, portfolio];
    try {
      await updateDocument(undefined, undefined, userSocials, undefined);
      toast({
        title: "Social Linked Saved ✅",
        description: "Social links saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error ❌",
        description: "Failed to save links " + error.message,
      });
    }
  };

  const generateCoverLetter = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //setting all data to be sent in state as json
    const userData = {
      user_jd: user.user_jd,
      user_resume: resumeUrl,
      resume_report: user.resume_report,
      user_socials: [linkedin, github, portfolio],
      user_additional_info: userAdditionalInfo,
      // template
    };

    setUserInput(userData);

    toast({
      title: "Calling API 📡",
      description: "Please wait while we process the data",
    });

    try {
      // Download the file
      const responseFile = await axios.get(resumeUrl, { responseType: "blob" });
      const file = new File([responseFile.data], "resume.pdf", {
        type: "application/pdf",
      });

      // Create form data
      const formData = new FormData();
      formData.append("job_description", user.user_jd);
      formData.append("resume", file);

      // Send the request
      const response = await axios.post(
        "http://20.188.113.104/interviewguide",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data; // The response is already a JSON
      setIsLoading(false);
      console.log(data);
      toast({
        title: "Response Ready ✅✨",
        description: "Data has been fetched successfully.",
      });
      setOutput(JSON.stringify(data.interview_guide.replace(/\n/g, ""))); // Now you can access cover_letter
      setActiveTab("output");
    } catch (error) {
      toast({
        title: "Error ❌",
        description:
          "An error occurred while fetching data. Please try again later.",
      });
      setIsLoading(false);
    }
  };
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(
      "<html><head><title>Job Description</title></head><body>"
    );
    printWindow.document.write(output);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <>
      {isLoading && (
        <Dialog open defaultOpen>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Processing</DialogTitle>
              <DialogDescription>
                Your interview guide is being generated. Please wait.
              </DialogDescription>
            </DialogHeader>
            <div className="loader-container">
              {/* <div className="loader"></div> */}
              <div>
                <svg class="pl" width="240" height="240" viewBox="0 0 240 240">
                  <circle
                    className="pl__ring pl__ring--a"
                    cx="120"
                    cy="120"
                    r="105"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 660"
                    stroke-dashoffset="-330"
                    stroke-linecap="round"
                  ></circle>
                  <circle
                    className="pl__ring pl__ring--b"
                    cx="120"
                    cy="120"
                    r="35"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 220"
                    stroke-dashoffset="-110"
                    stroke-linecap="round"
                  ></circle>
                  <circle
                    className="pl__ring pl__ring--c"
                    cx="85"
                    cy="120"
                    r="70"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 440"
                    stroke-linecap="round"
                  ></circle>
                  <circle
                    className="pl__ring pl__ring--d"
                    cx="155"
                    cy="120"
                    r="70"
                    fill="none"
                    stroke="#000"
                    stroke-width="20"
                    stroke-dasharray="0 440"
                    stroke-linecap="round"
                  ></circle>
                </svg>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
      <div className="w-full max-w-3xl mx-auto">
        <div className="pb-10">
          <CardTitle>Generate Interview Guide 📝🔍</CardTitle>
          <CardDescription>
            Generate an interview prep guide based on your JD and resume
          </CardDescription>
        </div>
        <br />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="">
          <TabsList className="grid gap-2">
            <TabsTrigger value="input">Input</TabsTrigger>
          </TabsList>
          <TabsContent value="input">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Input checklist</CardTitle>
                    <CardDescription></CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 grid-rows-3 gap-4">
                  {/* JD section */}
                  <Card className="rounded-lg border w-full max-w-md">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-5">
                        <Checkbox id="resume" defaultChecked className="mr-2" />
                        <Label htmlFor="resume">JD</Label>
                      </div>
                      {showJDBadge ? (
                        <Badge
                          variant="outline"
                          className="px-3 py-1 rounded-full"
                        >
                          automatically parsed
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => {
                            router.push("/get-started");
                          }}
                          variant="outline"
                        >
                          add
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Resume Section */}
                  <Card className="rounded-lg border w-full max-w-md">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-5">
                        <Checkbox id="resume" defaultChecked className="mr-2" />
                        <Label htmlFor="resume">Your Resume</Label>
                      </div>
                      {showResumeBadge ? (
                        <Badge
                          variant="outline"
                          className="px-3 py-1 rounded-full"
                        >
                          automatically parsed
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => {
                            router.push("/analyze-resume");
                          }}
                          variant="outline"
                        >
                          add
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 flex justify-center">
                <Button type="submit" onClick={generateCoverLetter}>
                  Generate Interview Guide📝🔍
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
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Interview Guide Generated 📝🔍</CardTitle>
                    <CardDescription>
                      {
                        "Here's your interview guide based on your JD and resume"
                      }
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture">do you like it?</Label>
                      <Button onClick={generateCoverLetter}>
                        Generate again 🔂
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Editor
                  content={output
                    .replace(/\n/g, "")
                    .replace(/"```html|```"/g, "")
                    .replace(/"/g, " ")}
                />
                {/* <div className="prose">{output}</div> */}
              </CardContent>
              <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 ">
                <Button
                  variant={"outline"}
                  className="mr-4"
                  onClick={handlePrint}
                >
                  Download
                  <Download className="ml-2 h-4 w-4" />
                </Button>
                {/* <Button type="submit"> */}
                {/* <Link href={"/"}>Done😉✨</Link> */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button type="submit">click me🪄</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle></DialogTitle>
                      <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 font-extrabold text-lg text-gray-800">
                      {"Heyo! You're all set to grab your next opportunity."}
                      <br />
                      {" We wish you all the best! 🪄"}
                    </div>
                    <div className="flex justify-center">
                      <Image
                        src={successKidGif}
                        width={350}
                        height={300}
                        alt="Picture of the author"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={() => {
                          window.location.href = "https://ctt.ac/9E03F";
                        }}
                        variant={"outline"}
                      >
                        <Twitter /> {"Spread the word✨"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {/* </Button> */}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
