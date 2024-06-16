"use client";

import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Star from "@/components/star/star";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserData, logout } from "../app/appwrite";
import { ReactTyped } from "react-typed";
import React from "react";
import ReactPlayer from "react-player/lazy";
import Image from "next/image";

import appwrite from "../../public/appwrite.svg";
import azure from "../../public/azure.png";
import gemeni from "../../public/gemeni.png";
import next from "../../public/next.svg";
import nginx from "../../public/nginx.png";
import react from "../../public/react.svg";
import ubuntu from "../../public/ubuntu.png";
import vercel from "../../public/vercel.svg";

// Lazy load the YouTube player
export default function Hero() {
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData().then((account) => setUser(account));
  }, []);

  function handleGetStarted() {
    console.log(user);
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }

  function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Hero */}
      <div>
        <div className="container py-24 lg:py-32">
          {/* Announcement Banner */}
          <div className="flex justify-center">
            <a
              className="inline-flex items-center gap-x-2 bg-teal-200 border text-sm p-1 ps-3 rounded-full transition"
              href="#"
            >
              BETA release - Join to waitlist
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/15 font-semibold text-sm">
                <svg
                  className="flex-shrink-0 w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </span>
            </a>
          </div>
          {/* End Announcement Banner */}
          {/* Title */}
          <div className="mt-5 max-w-2xl text-center mx-auto">
            <div className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              <div>
                <ReactTyped
                  strings={[
                    "lumos🪄 career✨",
                    "lumos🪄 help✨",
                    "lumos🪄 analyze resume✨",
                    "lumos🪄 craft Resume✨",
                    "lumos🪄 summarize JD✨",
                    "lumos🪄 craft Cover letter✨",
                  ]}
                  typeSpeed={40}
                  backSpeed={50}
                  loop
                />
                <br />
              </div>
            </div>
          </div>
          {/* End Title */}
          <div className="mt-5 max-w-3xl text-center mx-auto">
            <p className="text-xl text-muted-foreground">
              Transfigure Yourself Into a Star Candidate🌟
            </p>
            <br />
            <p className="text-md text-muted-foreground">
              LumosCareer offers a comprehensive suite of tools to streamline
              your job and internship applications.
              <br />
              From resume analysis and JD summaries to custom cover letters and
              interview prep, we help you shine as the ideal candidate.😉.
            </p>
            <br />
          </div>
          {/* Buttons */}
          <div className="mt-8 gap-3 flex justify-center">
            <div
              size={"lg"}
              onClick={handleGetStarted}
              className="bg-blue-400 text-white dark:bg-blue-600 dark:text-gray-200"
            >
              <Star />
            </div>
            <Button
              size={"lg"}
              variant={"outline"}
              className="border-blue-400 text-blue-400 dark:border-blue-600 dark:text-blue-600"
              onClick={() => scrollToSection("learn-more-section")}
            >
              Learn more🤔
            </Button>
          </div>
          {/* End Buttons */}
          <div className="mt-5 flex justify-center items-center gap-x-1 sm:gap-x-3">
            <a
              className="inline-flex items-center gap-x-1 text-sm decoration-2 hover:underline font-medium"
              href="#"
              onClick={() => scrollToSection("video-section")}
            >
              Usage Guide
              <ChevronRightIcon className="flex-shrink-0 w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
      {/* End Hero */}

      {/* Learn More Section */}
      <div id="learn-more-section" className="container py-24 lg:py-32">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
            Learn More About LumosCareer
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {
              "LumosCareer is your comprehensive toolkit for transforming yourself into a star candidate. Whether you're applying for jobs or internships, we streamline every step of your application process.Our suite of tools offers resume analysis, job description summaries, resume and cover letter generation, and interview preparation, ensuring you shine in every application."
            }
          </p>
        </div>
      </div>
      {/* End Learn More Section */}

      {/* Video Section */}
      <div id="video-section" className="container py-24 lg:py-32">
        <div className="mt-6 md:mt-12 py-3 flex justify-center items-center text-muted-foreground text-sm gap-x-1.5 after:flex-[1_1_0%] after:border-t after:ms-6 after:border-t-muted-foreground/50">
          <span className="font-semibold bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
            Learn more
          </span>
          watch this video
        </div>
        <div className="flex justify-center">
          <ReactPlayer url="https://www.youtube.com/watch?v=ysz5S6PUM-U" />
        </div>
        {/* Clients */}
      </div>
      {/* End Video Section */}

      {/* Clients Section */}
      <div className="container py-24 lg:py-32">
        <div className="mt-6 md:mt-12 py-3 flex items-center text-muted-foreground text-sm gap-x-1.5 after:flex-[1_1_0%] after:border-t after:ms-6 after:border-t-muted-foreground/50">
          <span className="font-semibold bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400">
            Technologies we use
          </span>
          at LumosCareer🪄
        </div>
        <br />

        {/* Clients */}
        <div className="flex flex-wrap gap-x-6 sm:gap-x-12 lg:gap-x-4">
          <Image src={appwrite} height={30} alt="Picture of the author" />
          <Image src={azure} height={30} alt="Picture of the author" />
          <Image src={gemeni} height={30} alt="Picture of the author" />
          <Image src={next} height={25} alt="Picture of the author" />
          <Image src={nginx} height={25} alt="Picture of the author" />
          <Image src={react} height={30} alt="Picture of the author" />
          <Image src={ubuntu} height={30} alt="Picture of the author" />
          <Image src={vercel} height={30} alt="Picture of the author" />
        </div>
      </div>
      {/* End Clients */}

      {/* Learn More section  */}
      {/* end Learn More section  */}

      {/* Icon Blocks */}
      {/* <div className="container py-24 lg:py-32"> */}
      {/* Grid */}
      {/* <div className="grid md:grid-cols-2 gap-12">
          <div className="lg:w-3/4">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Why choose us?
            </h2>
            <p className="mt-3 text-muted-foreground">
              We use cutting-edge AI technology to provide reliable results for
              resume analysis. Our API integration allows you to use your own
              API key for personalized access and credits.
            </p>
            <p className="mt-5">
              <a
                className="inline-flex items-center gap-x-1 group font-medium hover:underline underline-offset-4 "
                href="#"
              >
                Contact sales to learn more
                <ChevronRightIcon className="flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1" />
              </a>
            </p>
          </div> */}
      {/* End Col */}
      {/* <div className="space-y-6 lg:space-y-10"> */}
      {/* Icon Block */}
      {/* <div className="flex"> */}
      {/* Icon */}
      {/* <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                <BookOpenIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Azure Open AI
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Powered by cutting-edge AI technology for reliable results.
                </p>
              </div>
            </div> */}
      {/* End Icon Block */}
      {/* Icon Block */}
      {/* <div className="flex"> */}
      {/* Icon */}
      {/* <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border  bg-primary text-primary-foreground">
                <MessagesSquareIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  Accuracy and Efficiency
                </h3>
                <p className="mt-1 text-muted-foreground">
                  In-depth resume analysis with parameters focused on accuracy.
                </p>
              </div>
            </div> */}
      {/* End Icon Block */}
      {/* Icon Block */}
      {/* <div className="flex"> */}
      {/* Icon */}
      {/* <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                <ThumbsUpIcon className="flex-shrink-0 w-5 h-5" />
              </span>
              <div className="ms-5 sm:ms-8">
                <h3 className="text-base sm:text-lg font-semibold">
                  API Integration
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Use your own API key for personalized access and credits.
                </p>
              </div>
            </div> */}
      {/* End Icon Block */}
      {/* </div> */}
      {/* End Col */}
      {/* </div> */}
      {/* End Grid */}
      {/* </div> */}
      {/* End Icon Blocks */}
    </>
  );
}

const backgroundSvg = (
  <svg
    className="absolute "
    xmlns="http://www.w3.org/2000/svg"
    width={192}
    height={192}
    viewBox="0 0 192 192"
  >
    <path
      fill="currentColor"
      d="M192 15v2a11 11 0 0 0-11 11c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H145v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11 13 13 0 1 1 .02 26 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43a6.1 6.1 0 0 0-3.03 4.87V143h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 181 164a11 11 0 0 0 11 11v2a13 13 0 0 1-13-13 12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84a6.1 6.1 0 0 0-4.87-3.03H145v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 124 181a11 11 0 0 0-11 11h-2a13 13 0 0 1 13-13c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43a6.1 6.1 0 0 0 3.03-4.87V145h-35.02a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 107 124a11 11 0 0 0-22 0c0 1.94 1.16 4.75 2.53 6.11l2.36 2.36a6.93 6.93 0 0 1 1.22 7.56l-.43.84a8.08 8.08 0 0 1-6.66 4.13H49v35.02a6.1 6.1 0 0 0 3.03 4.87l.84.43c1.58.79 4 .4 5.24-.85l2.36-2.36a12.04 12.04 0 0 1 7.51-3.11A13 13 0 0 1 81 192h-2a11 11 0 0 0-11-11c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V145H11.98a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 0 1 0 177v-2a11 11 0 0 0 11-11c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H47v-35.02a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 28 109a13 13 0 1 1 0-26c2.47 0 5.79 1.37 7.53 3.11l2.36 2.36a4.94 4.94 0 0 0 5.24.85l.84-.43A6.1 6.1 0 0 0 47 84.02V49H11.98a8.08 8.08 0 0 1-6.66-4.13l-.43-.84a6.91 6.91 0 0 1 1.22-7.56l2.36-2.36A10.06 10.06 0 0 0 11 28 11 11 0 0 0 0 17v-2a13 13 0 0 1 13 13c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84A6.1 6.1 0 0 0 11.98 47H47V11.98a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 68 11 11 11 0 0 0 79 0h2a13 13 0 0 1-13 13 12 12 0 0 1-7.53-3.11l-2.36-2.36a4.93 4.93 0 0 0-5.24-.85l-.84.43A6.1 6.1 0 0 0 49 11.98V47h35.02a8.08 8.08 0 0 1 6.66 4.13l.43.84a6.91 6.91 0 0 1-1.22 7.56l-2.36 2.36A10.06 10.06 0 0 0 85 68a11 11 0 0 0 22 0c0-1.94-1.16-4.75-2.53-6.11l-2.36-2.36a6.93 6.93 0 0 1-1.22-7.56l.43-.84a8.08 8.08 0 0 1 6.66-4.13H143V11.98a6.1 6.1 0 0 0-3.03-4.87l-.84-.43c-1.59-.8-4-.4-5.24.85l-2.36 2.36A12 12 0 0 1 124 13a13 13 0 0 1-13-13h2a11 11 0 0 0 11 11c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V47h35.02a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 179 28a13 13 0 0 1 13-13zM84.02 143a6.1 6.1 0 0 0 4.87-3.03l.43-.84c.8-1.59.4-4-.85-5.24l-2.36-2.36A12 12 0 0 1 83 124a13 13 0 1 1 26 0c0 2.47-1.37 5.79-3.11 7.53l-2.36 2.36a4.94 4.94 0 0 0-.85 5.24l.43.84a6.1 6.1 0 0 0 4.87 3.03H143v-35.02a8.08 8.08 0 0 1 4.13-6.66l.84-.43a6.91 6.91 0 0 1 7.56 1.22l2.36 2.36A10.06 10.06 0 0 0 164 107a11 11 0 0 0 0-22c-1.94 0-4.75 1.16-6.11 2.53l-2.36 2.36a6.93 6.93 0 0 1-7.56 1.22l-.84-.43a8.08 8.08 0 0 1-4.13-6.66V49h-35.02a6.1 6.1 0 0 0-4.87 3.03l-.43.84c-.79 1.58-.4 4 .85 5.24l2.36 2.36a12.04 12.04 0 0 1 3.11 7.51A13 13 0 1 1 83 68a12 12 0 0 1 3.11-7.53l2.36-2.36a4.93 4.93 0 0 0 .85-5.24l-.43-.84A6.1 6.1 0 0 0 84.02 49H49v35.02a8.08 8.08 0 0 1-4.13 6.66l-.84.43a6.91 6.91 0 0 1-7.56-1.22l-2.36-2.36A10.06 10.06 0 0 0 28 85a11 11 0 0 0 0 22c1.94 0 4.75-1.16 6.11-2.53l2.36-2.36a6.93 6.93 0 0 1 7.56-1.22l.84.43a8.08 8.08 0 0 1 4.13 6.66V143h35.02z"
    />
  </svg>
);
