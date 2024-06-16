import {
  Account,
  Client,
  Databases,
  Storage,
  Query,
  ID,
  AppwriteException,
} from "appwrite";

const client = new Client()
  .setEndpoint(`${process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT}`)
  .setProject(`${process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID}`);

const databases = new Databases(client);
const databaseID = `${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}`;
const collectionID = `${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID}`;

const storage = new Storage(client);
const storageID = `${process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID}`;

const jobName = "jobName";

// Auth routes

export const getUserData = async () => {
  try {
    const account = new Account(client);
    return account.get();
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const account = new Account(client);
    return account.createEmailPasswordSession(email, password);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const logout = async () => {
  try {
    const account = new Account(client);
    return account.deleteSession("current");
  } catch (error: unknown) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export const register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const account = new Account(client);
    return account.create(name, email, password, name);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

export default client;

// Database routes

// get all documents
export const getAllDocuments = async () => {
  try {
    return databases.listDocuments(databaseID, collectionID);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// create a document with a user's job description.
export const createDocument = async (jobNamee: string) => {
  const username = (await getUserData()).$id;
  try {
    const document = await databases.createDocument(
      databaseID,
      collectionID,
      `${username}-${jobNamee}`,
      {
        username: username,
      }
    );

    // Store the document ID in local storage
    localStorage.setItem("documentId", document.$id);

    return document;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// getting all documents of a user
// where the username is   const username = (await getUserData()).$id;
export const getDocuments = async () => {
  const username = (await getUserData()).$id;
  try {
    return databases.listDocuments(databaseID, collectionID, [
      Query.equal("username", [username]),
    ]);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// // create a document with a user's job description.
// export const createDocument = async (jobNamee: string, userJd: string) => {
//   const username = (await getUserData()).$id;
//   try {
//     const document = await databases.createDocument(
//       databaseID,
//       collectionID,
//       `${username}-${jobNamee}`,
//       {
//         username: username,
//         user_jd: userJd,
//       }
//     );

//     // Store the document ID in local storage
//     localStorage.setItem("documentId", document.$id);

//     return document;
//   } catch (error) {
//     const appwriteError = error as AppwriteException;
//     throw new Error(appwriteError.message);
//   }
// };
// update a document with the user's resume and report

export const updateDocument = async (
  userResume?: string,
  resumeReport?: string,
  userSocials?: string[],
  userAdditionalInfo?: string,
  userJd?: string
) => {
  try {
    // Get the document ID from local storage
    const documentId = localStorage.getItem("documentId");

    if (!documentId) {
      throw new Error("No document ID found in local storage");
    }

    // Create an update object and add properties if they are passed
    const updateData: { [key: string]: any } = {};

    if (userResume !== undefined) {
      updateData.user_resume = userResume;
    }

    if (resumeReport !== undefined) {
      updateData.resume_report = resumeReport;
    }

    if (userSocials !== undefined) {
      updateData.user_socials = userSocials;
    }

    if (userAdditionalInfo !== undefined) {
      updateData.user_additional_info = userAdditionalInfo;
    }

    if (userJd !== undefined) {
      updateData.user_jd = userJd;
    }
    // Update the document with the provided data
    return databases.updateDocument(
      databaseID,
      collectionID,
      documentId,
      updateData
    );
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// get a document
export const getDocument = async () => {
  const documentID = localStorage.getItem("documentId");
  try {
    if (!documentID) {
      throw new Error("No document ID found in local storage");
    }
    return databases.getDocument(databaseID, collectionID, documentID);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// Storage routes
// // uploading user's resume
// export const uploadResume = async (file: File) => {
//   const username = (await getUserData()).$id;
//   const fileName = `${username}-${jobName}`;

//   try {
//     //getting file with its id
//     const isFileExits = await storage.getFile(
//       storageID, // bucketId
//       fileName // fileId
//     );

//     console.log(isFileExits);

//     // If a file with the same name exists, delete it
//     if (isFileExits) {
//       await storage.deleteFile(storageID, fileName);
//       console.log("File deleted");
//     }

//     // Upload the new file
//     const uploadResponse = await storage.createFile(storageID, fileName, file);

//     // If the file upload is successful, update the document in the database
//     if (uploadResponse) {
//       await updateDocument(fileName, undefined, undefined, undefined);
//     }

//     return uploadResponse;
//   } catch (error) {
//     const appwriteError = error as AppwriteException;
//     throw new Error(appwriteError.message);
//   }
// };

// uploading user's resume
export const uploadResume = async (file: File) => {
  // const username = (await getUserData()).$id;
  const fileName = `${localStorage.getItem("documentId")}`;

  try {
    try {
      // Try to get the file
      const existingFile = await storage.getFile(storageID, fileName);

      // If the file exists, delete it
      if (existingFile) {
        await storage.deleteFile(storageID, fileName);
        console.log("File deleted");
      }
    } catch (error) {
      // If the file doesn't exist, an error will be thrown and caught here
      console.log("File not found, creating a new one");
    }

    // Upload the new file
    const uploadResponse = await storage.createFile(storageID, fileName, file);

    // If the file upload is successful, update the document in the database
    if (uploadResponse) {
      await updateDocument(fileName, undefined, undefined, undefined);
    }

    return uploadResponse;
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};

// get user's resume
export const getResume = async () => {
  const fileName = `${localStorage.getItem("documentId")}`;

  try {
    return await storage.getFileView(storageID, fileName);
  } catch (error) {
    const appwriteError = error as AppwriteException;
    throw new Error(appwriteError.message);
  }
};
