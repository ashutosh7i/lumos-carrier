// "use client";

// import { useState, useEffect } from "react";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Download, Mail } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
// import Link from "next/link";
// import axios from "axios";
// import { getDocument, updateDocument, getResume } from "../appwrite";
// import { useRouter } from "next/navigation";
// import Editor from "@/components/Editor";
// import Image from "next/image";

// export default function Component() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [activeTab, setActiveTab] = useState("input");
//   const [userInput, setUserInput] = useState("");
//   const [output, setOutput] = useState("");
//   const [selectedOption, setSelectedOption] = useState(null);
//   const { toast } = useToast();

//   const [showJDBadge, setShowJDBadge] = useState(false);
//   const [showResumeBadge, setShowResumeBadge] = useState(false);
//   const [showResumeAnalysisBadge, setShowResumeAnalysisBadge] = useState(false);

//   const [linkedin, setLinkedin] = useState("");
//   const [github, setGithub] = useState("");
//   const [portfolio, setPortfolio] = useState("");

//   const [userAdditionalInfo, setUserAdditionalInfo] = useState("");

//   const [resumeUrl, setResumeUrl] = useState("");

//   const content = `
//   <div style="font-family: Arial, sans-serif;">
//     <h1 style="color: blue;">John Doe</h1>
//     <h2 style="color: darkblue;">Software Engineer</h2>
//     <p>123 Main St, Anytown, USA</p>
//     <p>(123) 456-7890 | johndoe@example.com</p>

//     <h2 style="color: darkblue;">Objective</h2>
//     <p>Highly motivated Software Engineer looking to leverage my knowledge in a challenging role.</p>

//     <h2 style="color: darkblue;">Skills</h2>
//     <ul>
//       <li>JavaScript, Python, Java</li>
//       <li>React, Angular, Vue</li>
//       <li>Node.js, Express.js</li>
//       <li>MongoDB, PostgreSQL, MySQL</li>
//     </ul>

//     <h2 style="color: darkblue;">Experience</h2>
//     <h3>Software Engineer | Company XYZ | 2019 - Present</h3>
//     <p>Developed and maintained web applications using React and Node.js.</p>

//     <h2 style="color: darkblue;">Education</h2>
//     <h3>Bachelor of Science in Computer Science | University ABC | 2015 - 2019</h3>
// </div>
// `;

//   // Fetch the user's data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const user = await getDocument();
//         setUser(user);
//       } catch (error) {
//         alert("Failed to fetch user data: " + error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   //setting the badges ,socials and additional info
//   useEffect(() => {
//     console.log(user);
//     if (user) {
//       if (user.user_jd) {
//         setShowJDBadge(true);
//       }
//       if (user.user_resume) {
//         // if user_resume is present, then it means the resume is available in storage
//         // so we can get it from the storage
//         getResume()
//           .then((resumeurl) => {
//             setResumeUrl(resumeurl);
//             setShowResumeBadge(true);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       }
//       if (user.resume_report) {
//         setShowResumeAnalysisBadge(true);
//       }
//       if (user.user_socials) {
//         setLinkedin(user.user_socials[0]);
//         setGithub(user.user_socials[1]);
//         setPortfolio(user.user_socials[2]);
//       }
//       if (user.user_additional_info) {
//         setUserAdditionalInfo(user.user_additional_info);
//       }
//     }
//   }, [user]);
//   const handleSave = async () => {
//     const userSocials = [linkedin, github, portfolio];
//     try {
//       await updateDocument(undefined, undefined, userSocials, undefined);
//       toast({
//         title: "Social Linked Saved ✅",
//         description: "Social links saved successfully!",
//       });
//     } catch (error) {
//       toast({
//         title: "Error ❌",
//         description: "Failed to save links " + error.message,
//       });
//     }
//   };

//   const generateResume = async (e) => {
//     e.preventDefault();

//     //setting all data to be sent in state as json
//     const userData = {
//       user_jd: user.user_jd,
//       user_resume: resumeUrl,
//       resume_report: user.resume_report,
//       user_socials: [linkedin, github, portfolio],
//       user_additional_info: userAdditionalInfo,
//       // template
//     };

//     setUserInput(userData);

//     toast({
//       title: "Calling API 📡",
//       description: "Please wait while we process the data",
//     });
//     try {
//       const response = await axios.post("https://httpbin.org/post", {
//         userInput: userData,
//       });
//       const data = JSON.parse(response.data.data); // Parse the string back to JSON

//       toast({
//         title: "Response Ready ✅✨",
//         description: "Data has been fetched successfully.",
//       });
//       setOutput(JSON.stringify(data.userInput)); // Now you can access userInput
//       setActiveTab("output");
//     } catch (error) {
//       toast({
//         title: "Error ❌",
//         description:
//           "An error occurred while fetching data. Please try again later.",
//       });
//     }
//   };

//   const handlePrint = () => {
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(
//       "<html><head><title>Job Description</title></head><body>"
//     );
//     printWindow.document.write(content);
//     printWindow.document.write("</body></html>");
//     printWindow.document.close();
//     printWindow.print();
//   };

//   return (
//     <>
//       <div className="w-full max-w-3xl mx-auto">
//         <div className="pb-10">
//           <CardTitle>Generate resume✨</CardTitle>
//           <CardDescription>
//             Generate a resume by analyzing your resume and filling out the
//             details.
//           </CardDescription>
//         </div>
//         <Tabs value={activeTab} onValueChange={setActiveTab} className="">
//           <TabsList className="grid gap-2">
//             <TabsTrigger value="input">Input</TabsTrigger>
//           </TabsList>
//           <TabsContent value="input">
//             <Card>
//               <CardHeader>
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <CardTitle>Input checklist</CardTitle>
//                     <CardDescription></CardDescription>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-2 grid-rows-3 gap-4">
//                   {/* JD section */}
//                   <Card className="rounded-lg border w-full max-w-md">
//                     <CardContent className="flex items-center justify-between p-6">
//                       <div className="flex items-center gap-5">
//                         <Checkbox id="resume" defaultChecked className="mr-2" />
//                         <Label htmlFor="resume">JD</Label>
//                       </div>
//                       {showJDBadge ? (
//                         <Badge
//                           variant="outline"
//                           className="px-3 py-1 rounded-full"
//                         >
//                           automatically parsed
//                         </Badge>
//                       ) : (
//                         <Button
//                           onClick={() => {
//                             router.push("/get-started");
//                           }}
//                           variant="outline"
//                         >
//                           add
//                         </Button>
//                       )}
//                     </CardContent>
//                   </Card>

//                   {/* Links Section */}
//                   <Card className="rounded-lg border w-full max-w-md">
//                     <CardContent className="flex items-center justify-between p-6">
//                       <div className="flex items-center gap-5">
//                         <Checkbox id="resume" defaultChecked className="mr-2" />
//                         <Label htmlFor="resume">Links</Label>
//                       </div>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button variant="outline">add</Button>
//                         </PopoverTrigger>

//                         <PopoverContent className="w-80">
//                           <div className="grid gap-4">
//                             <div className="space-y-2">
//                               <h4 className="font-medium leading-none">
//                                 add social links
//                               </h4>
//                               <p className="text-sm text-muted-foreground">
//                                 click save when youre done.
//                               </p>
//                             </div>
//                             <div className="grid gap-2">
//                               <div className="grid grid-cols-3 items-center gap-4">
//                                 <Label htmlFor="linkedin">Linkedin</Label>
//                                 <Input
//                                   id="linkedin"
//                                   className="col-span-2 h-8"
//                                   value={linkedin}
//                                   placeholder={linkedin}
//                                   onChange={(e) => setLinkedin(e.target.value)}
//                                 />
//                               </div>
//                               <div className="grid grid-cols-3 items-center gap-4">
//                                 <Label htmlFor="github">Github</Label>
//                                 <Input
//                                   id="github"
//                                   className="col-span-2 h-8"
//                                   value={github}
//                                   placeholder={github}
//                                   onChange={(e) => setGithub(e.target.value)}
//                                 />
//                               </div>
//                               <div className="grid grid-cols-3 items-center gap-4">
//                                 <Label htmlFor="portfolio">Portfolio</Label>
//                                 <Input
//                                   id="portfolio"
//                                   className="col-span-2 h-8"
//                                   value={portfolio}
//                                   placeholder={portfolio}
//                                   onChange={(e) => setPortfolio(e.target.value)}
//                                 />
//                               </div>
//                             </div>
//                             <button onClick={handleSave}>Save</button>
//                           </div>
//                         </PopoverContent>
//                       </Popover>
//                     </CardContent>
//                   </Card>

//                   {/* Resume Section */}
//                   <Card className="rounded-lg border w-full max-w-md">
//                     <CardContent className="flex items-center justify-between p-6">
//                       <div className="flex items-center gap-5">
//                         <Checkbox id="resume" defaultChecked className="mr-2" />
//                         <Label htmlFor="resume">Your Resume</Label>
//                       </div>
//                       {showResumeBadge ? (
//                         <Badge
//                           variant="outline"
//                           className="px-3 py-1 rounded-full"
//                         >
//                           automatically parsed
//                         </Badge>
//                       ) : (
//                         <Button
//                           onClick={() => {
//                             router.push("/analyze-resume");
//                           }}
//                           variant="outline"
//                         >
//                           add
//                         </Button>
//                       )}
//                     </CardContent>
//                   </Card>

//                   {/* Additional Info */}
//                   <Card className="rounded-lg border w-full max-w-md">
//                     <CardContent className="flex items-center justify-between p-6">
//                       <div className="flex items-center gap-5">
//                         <Checkbox id="resume" defaultChecked className="mr-2" />
//                         <Label htmlFor="resume">Additional info</Label>
//                       </div>
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button variant="outline">add</Button>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-md">
//                           <DialogHeader>
//                             <DialogTitle>Additional context</DialogTitle>
//                             <DialogDescription>
//                               we will take care of this while generating the
//                               resume.
//                             </DialogDescription>
//                           </DialogHeader>
//                           <div className="flex items-center space-x-2">
//                             <div className="grid flex-1 gap-2">
//                               <Label
//                                 htmlFor="additionalInfo"
//                                 className="sr-only"
//                               >
//                                 Additional Info
//                               </Label>
//                               <Textarea
//                                 // placeholder={userAdditionalInfo}
//                                 defaultValue={userAdditionalInfo}
//                                 id="additionalInfo"
//                               />
//                             </div>
//                           </div>
//                           <DialogFooter className="sm:justify-start">
//                             <DialogClose asChild>
//                               <Button type="button" variant="secondary">
//                                 Close
//                               </Button>
//                             </DialogClose>
//                             <Button
//                               onClick={() => {
//                                 updateDocument(
//                                   undefined,
//                                   undefined,
//                                   undefined,
//                                   document.getElementById("additionalInfo")
//                                     .value
//                                 ).then(() => {
//                                   toast({
//                                     title: "Saved Successfully ✅",
//                                     description:
//                                       "Additional info saved successfully!",
//                                   });
//                                 });
//                               }}
//                               type="submit"
//                             >
//                               Save changes
//                             </Button>
//                           </DialogFooter>
//                         </DialogContent>
//                       </Dialog>
//                     </CardContent>
//                   </Card>

//                   {/* Resume Analysis */}
//                   <Card className="rounded-lg border w-full max-w-md">
//                     <CardContent className="flex items-center justify-between p-6">
//                       <div className="flex items-center gap-5">
//                         <Checkbox id="resume" defaultChecked className="mr-2" />
//                         <Label htmlFor="resume">Resume Analysis</Label>
//                       </div>
//                       {showResumeAnalysisBadge ? (
//                         <Badge
//                           variant="outline"
//                           className="px-3 py-1 rounded-full"
//                         >
//                           automatically parsed
//                         </Badge>
//                       ) : (
//                         <Button
//                           variant="outline"
//                           onClick={() => {
//                             router.push("/analyze-resume");
//                           }}
//                         >
//                           add
//                         </Button>
//                       )}
//                     </CardContent>
//                   </Card>

//                   {/* Templates */}
//                   <Card className="rounded-lg border w-full max-w-md">
//                     <CardContent className="flex items-center justify-between p-6">
//                       <div className="flex items-center gap-5">
//                         <Label htmlFor="resume">Templates</Label>
//                       </div>
//                       <Dialog>
//                         <DialogTrigger asChild>
//                           <Button variant="outline">select</Button>
//                         </DialogTrigger>
//                         <DialogContent className="sm:max-w-[600px]">
//                           <DialogHeader>
//                             <DialogTitle>Select a Template</DialogTitle>
//                             <DialogDescription>
//                               Choose from one of our pre-designed templates to
//                               get started.
//                             </DialogDescription>
//                           </DialogHeader>
//                           <div className="grid sm:grid-cols-3 gap-6 py-6">
//                             <Card
//                               onClick={() => setSelectedOption("option1")}
//                               className={`cursor-pointer transition-all ${
//                                 selectedOption === "option1"
//                                   ? "ring-2 ring-primary"
//                                   : "hover:scale-105"
//                               }`}
//                             >
//                               <Image
//                                 src="/placeholder.svg"
//                                 alt="Template 1"
//                                 width={300}
//                                 height={200}
//                                 className="rounded-t-lg object-cover"
//                               />
//                               <CardContent>
//                                 <CardTitle>Template 1</CardTitle>
//                                 <CardDescription>
//                                   A simple and clean template to get you
//                                   started.
//                                 </CardDescription>
//                               </CardContent>
//                             </Card>
//                             <Card
//                               onClick={() => setSelectedOption("option2")}
//                               className={`cursor-pointer transition-all ${
//                                 selectedOption === "option2"
//                                   ? "ring-2 ring-primary"
//                                   : "hover:scale-105"
//                               }`}
//                             >
//                               <Image
//                                 src="/placeholder.svg"
//                                 alt="Template 2"
//                                 width={300}
//                                 height={200}
//                                 className="rounded-t-lg object-cover"
//                               />
//                               <CardContent>
//                                 <CardTitle>Template 2</CardTitle>
//                                 <CardDescription>
//                                   A more visually appealing template with a
//                                   modern design.
//                                 </CardDescription>
//                               </CardContent>
//                             </Card>
//                             <Card
//                               onClick={() => setSelectedOption("option3")}
//                               className={`cursor-pointer transition-all ${
//                                 selectedOption === "option3"
//                                   ? "ring-2 ring-primary"
//                                   : "hover:scale-105"
//                               }`}
//                             >
//                               <Image
//                                 src="/placeholder.svg"
//                                 alt="Template 3"
//                                 width={300}
//                                 height={200}
//                                 className="rounded-t-lg object-cover"
//                               />
//                               <CardContent>
//                                 <CardTitle>Template 3</CardTitle>
//                                 <CardDescription>
//                                   A feature-rich template with advanced
//                                   functionality.
//                                 </CardDescription>
//                               </CardContent>
//                             </Card>
//                           </div>
//                           <DialogFooter>
//                             {selectedOption && (
//                               <Button onClick={() => setSelectedOption(null)}>
//                                 Select {selectedOption}
//                               </Button>
//                             )}
//                             <Button
//                               variant="outline"
//                               onClick={() => setSelectedOption(null)}
//                             >
//                               Cancel
//                             </Button>
//                           </DialogFooter>
//                         </DialogContent>
//                       </Dialog>
//                     </CardContent>
//                   </Card>
//                 </div>
//               </CardContent>
//               <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 flex justify-center">
//                 <Button type="submit" onClick={generateResume}>
//                   Generate resume🪄✨
//                 </Button>
//               </CardFooter>
//             </Card>
//             <TabsList className="grid gap-2">
//               <TabsTrigger value="output">Output</TabsTrigger>
//             </TabsList>
//           </TabsContent>
//           <TabsContent value="output">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Resume Analyzer📜</CardTitle>
//                 <CardDescription>
//                   This is the summary of your resume.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <Editor content={content} />
//                 {/* <div className="prose">{output}</div> */}
//               </CardContent>
//               <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 ">
//                 <Button
//                   variant={"outline"}
//                   className="mr-4"
//                   onClick={handlePrint}
//                 >
//                   Download
//                   <Download className="ml-2 h-4 w-4" />
//                 </Button>
//                 <Button type="submit">
//                   <Link href={"/generate-cover-letter"}>
//                     Generate Cover Letter🪄✨
//                   </Link>
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </>
//   );
// }

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
import { Download, Mail } from "lucide-react";
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
import { Image } from "next/image";

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

  const generateNewResume = async (e) => {
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
      formData.append("resume_analysis", user.resume_report);
      formData.append("user_socials", [linkedin, github, portfolio]);
      formData.append("user_additional_info", userAdditionalInfo);

      // Send the request
      const response = await axios.post(
        "https://backend.lumoscareer.co/generateresume",
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
      setOutput(JSON.stringify(data.generated_resume.replace(/\n/g, ""))); // Now you can access cover_letter
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
                Your resume is being generated. Please wait.
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
          <CardTitle>Generate Resume📜</CardTitle>
          <CardDescription>
            Generate a resume based on your resume and job description.
          </CardDescription>
        </div>
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

                  {/* Links Section */}
                  <Card className="rounded-lg border w-full max-w-md">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-5">
                        <Checkbox id="resume" defaultChecked className="mr-2" />
                        <Label htmlFor="resume">Links</Label>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">add</Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-80">
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                add social links
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                click save when youre done.
                              </p>
                            </div>
                            <div className="grid gap-2">
                              <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="linkedin">Linkedin</Label>
                                <Input
                                  id="linkedin"
                                  className="col-span-2 h-8"
                                  value={linkedin}
                                  placeholder={linkedin}
                                  onChange={(e) => setLinkedin(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="github">Github</Label>
                                <Input
                                  id="github"
                                  className="col-span-2 h-8"
                                  value={github}
                                  placeholder={github}
                                  onChange={(e) => setGithub(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-3 items-center gap-4">
                                <Label htmlFor="portfolio">Portfolio</Label>
                                <Input
                                  id="portfolio"
                                  className="col-span-2 h-8"
                                  value={portfolio}
                                  placeholder={portfolio}
                                  onChange={(e) => setPortfolio(e.target.value)}
                                />
                              </div>
                            </div>
                            <button onClick={handleSave}>Save</button>
                          </div>
                        </PopoverContent>
                      </Popover>
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

                  {/* Additional Info */}
                  <Card className="rounded-lg border w-full max-w-md">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-5">
                        <Checkbox id="resume" defaultChecked className="mr-2" />
                        <Label htmlFor="resume">Additional info</Label>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">add</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Additional context</DialogTitle>
                            <DialogDescription>
                              we will take care of this while generating the
                              resume.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2">
                              <Label
                                htmlFor="additionalInfo"
                                className="sr-only"
                              >
                                Additional Info
                              </Label>
                              <Textarea
                                // placeholder={userAdditionalInfo}
                                defaultValue={userAdditionalInfo}
                                id="additionalInfo"
                              />
                            </div>
                          </div>
                          <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                              <Button type="button" variant="secondary">
                                Close
                              </Button>
                            </DialogClose>
                            <Button
                              onClick={() => {
                                updateDocument(
                                  undefined,
                                  undefined,
                                  undefined,
                                  document.getElementById("additionalInfo")
                                    .value
                                ).then(() => {
                                  toast({
                                    title: "Saved Successfully ✅",
                                    description:
                                      "Additional info saved successfully!",
                                  });
                                });
                              }}
                              type="submit"
                            >
                              Save changes
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

                  {/* Resume Analysis */}
                  <Card className="rounded-lg border w-full max-w-md">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-5">
                        <Checkbox id="resume" defaultChecked className="mr-2" />
                        <Label htmlFor="resume">Resume Analysis</Label>
                      </div>
                      {showResumeAnalysisBadge ? (
                        <Badge
                          variant="outline"
                          className="px-3 py-1 rounded-full"
                        >
                          automatically parsed
                        </Badge>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => {
                            router.push("/analyze-resume");
                          }}
                        >
                          add
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  {/* Templates */}
                  <Card className="rounded-lg border w-full max-w-md">
                    <CardContent className="flex items-center justify-between p-6">
                      <div className="flex items-center gap-5">
                        <Label htmlFor="resume">Templates</Label>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">select</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Select a Template</DialogTitle>
                            <DialogDescription>
                              Choose from one of our pre-designed templates to
                              get started.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid sm:grid-cols-3 gap-6 py-6">
                            <Card
                              onClick={() => setSelectedOption("option1")}
                              className={`cursor-pointer transition-all ${
                                selectedOption === "option1"
                                  ? "ring-2 ring-primary"
                                  : "hover:scale-105"
                              }`}
                            >
                              <Image
                                src="/placeholder.svg"
                                alt="Template 1"
                                width={300}
                                height={200}
                                className="rounded-t-lg object-cover"
                              />
                              <CardContent>
                                <CardTitle>Template 1</CardTitle>
                                <CardDescription>
                                  A simple and clean template to get you
                                  started.
                                </CardDescription>
                              </CardContent>
                            </Card>
                            <Card
                              onClick={() => setSelectedOption("option2")}
                              className={`cursor-pointer transition-all ${
                                selectedOption === "option2"
                                  ? "ring-2 ring-primary"
                                  : "hover:scale-105"
                              }`}
                            >
                              <Image
                                src="/placeholder.svg"
                                alt="Template 2"
                                width={300}
                                height={200}
                                className="rounded-t-lg object-cover"
                              />
                              <CardContent>
                                <CardTitle>Template 2</CardTitle>
                                <CardDescription>
                                  A more visually appealing template with a
                                  modern design.
                                </CardDescription>
                              </CardContent>
                            </Card>
                            <Card
                              onClick={() => setSelectedOption("option3")}
                              className={`cursor-pointer transition-all ${
                                selectedOption === "option3"
                                  ? "ring-2 ring-primary"
                                  : "hover:scale-105"
                              }`}
                            >
                              <Image
                                src="/placeholder.svg"
                                alt="Template 3"
                                width={300}
                                height={200}
                                className="rounded-t-lg object-cover"
                              />
                              <CardContent>
                                <CardTitle>Template 3</CardTitle>
                                <CardDescription>
                                  A feature-rich template with advanced
                                  functionality.
                                </CardDescription>
                              </CardContent>
                            </Card>
                          </div>
                          <DialogFooter>
                            {selectedOption && (
                              <Button onClick={() => setSelectedOption(null)}>
                                Select {selectedOption}
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              onClick={() => setSelectedOption(null)}
                            >
                              Cancel
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              <CardFooter className="sticky bottom-0 bg-white dark:bg-gray-950 py-4 flex justify-center">
                <Button type="submit" onClick={generateNewResume}>
                  Generate new resume🪄✨
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
                    <CardTitle>Your New Resume📜</CardTitle>
                    <CardDescription>
                      Your new resume has been generated.
                    </CardDescription>
                  </div>
                  <div className="flex items-center">
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="picture">do you like it?</Label>
                      <Button onClick={generateNewResume}>
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
                <Button type="submit">
                  <Link href={"/generate-cover-letter"}>Cover letter 📰❓</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
