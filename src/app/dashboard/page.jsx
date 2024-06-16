"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createDocument, getDocuments } from "../appwrite";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Component() {
  const { toast } = useToast();
  const [jobName, setJobName] = useState("");
  const [documents, setDocuments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getDocuments().then((docs) => {
      setDocuments(docs.documents);
    });
  }, []);

  function handleOpen(docId) {
    localStorage.setItem("documentId", docId);
    router.push("/get-started");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formattedJobName = jobName.replace(/\s/g, "-");
    toast({
      title: "Creating new application⌛",
      description: `Using formatted job name: ${formattedJobName}`,
    });
    createDocument(formattedJobName)
      .then((document) => {
        toast({
          title: "Created application✅",
          description: `It goes by ${document.$id}`,
        });
        handleOpen(document.$id);
      })
      .catch((error) => {
        if (
          error.message ===
          "Document with the requested ID already exists. Try again with a different ID or use ID.unique() to generate a unique ID."
        ) {
          toast({
            title: "Job already exists🛠️",
            description: "Please try creating with a different name",
          });
        } else {
          toast({
            title: "Error",
            description: error.message,
          });
        }
      });
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <header className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Welcome back!</h1>
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">➕ New Application</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create an Item</DialogTitle>
                <DialogDescription>
                  We identify applications by job name. Create something unique
                  like <br />
                  <code>fullstack-dev-google</code>
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    onChange={(e) => setJobName(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., swe-at-google"
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
        <div className="bg-white rounded-lg shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(documents) &&
                documents.map((doc, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{doc.$id}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            doc.$tenant === "Done"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        />
                        {doc.$tenant}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {new Date(doc.$updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">
                      <Button onClick={() => handleOpen(doc.$id)}>Open</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
