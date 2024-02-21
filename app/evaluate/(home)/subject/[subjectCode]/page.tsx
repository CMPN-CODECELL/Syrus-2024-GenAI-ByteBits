"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import React from "react";
import { FiPlusCircle } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { UploadButton } from "../../../_components/utils/uploadthing";

type Params = {
  params: {
    subjectCode: string;
  };
};
const serverUrl = "http://localhost:3001"; // Example server URL, replace with your actual server URL

const SubjectPage = ({ params: { subjectCode } }: Params) => {
  const [valuators, setValuators] = useState([]);
  const [valuation, setValuation] = useState([]);
  const [title, setTitle] = useState("");
  const [questionPaperUrl, setQuestionPaperUrl] = useState("");
  const [answerKeyUrl, setAnswerKeyUrl] = useState("");
  const router = useRouter();

  const [creatingValuator, setCreatingValuator] = useState(false);

  const getValuators = async () => {
    const config = {
      method: "GET",
      url: `${serverUrl}/valuators`,
    };

    axios(config)
      .then((response) => {
        setValuators(response.data);
      })
      .catch((error) => {
        toast.error("Failed to fetch valuators");
      });
  };

  const createValuator = async () => {
    setCreatingValuator(true);
    const config = {
      method: "POST",
      url: `${serverUrl}/valuators`,
      data: {
        title: title,
        questionPaper: questionPaperUrl,
        answerKey: answerKeyUrl,
        subjectCode,
      },
    };

    axios(config)
      .then((response) => {
        setCreatingValuator(false);
        toast.success("Valuator created successfully!");
        getValuators();
        (document.getElementById("new_valuation_modal") as any).close();
      })
      .catch((error) => {
        setCreatingValuator(false);
        toast.error("Error creating valuator!");
        (document.getElementById("new_valuation_modal") as any).close();
      });
  };

  useEffect(() => {
    getValuators();
  }, []);

  return (
    <div
      onClick={() =>
        (document.getElementById("new_valuation_modal") as any)?.showModal()
      }
      className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col min-h-[400px] min-w-[350px] mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <CiCirclePlus className="h-40 w-40 mb-2" />
        <p className="font-semibold text-xl">New Valuator</p>
      </div>

      <dialog id="new_valuation_modal" className="modal">
        <div className="modal-box max-w-2xl align-middle">
          <h3 className="flex items-center font-bold text-2xl mb-5">
            <FiPlusCircle className="mr-2" /> Create new valuator
          </h3>
          <p className="mb-5 font-semibold">Exam title</p>
          <input
            type="text"
            placeholder="Exam Title"
            className="input input-bordered w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="w-full flex flex-col">
            <p className="mb-2 mt-7 font-semibold">Upload question paper</p>
            <div className="flex">
              {questionPaperUrl ? (
                <AiFillCheckCircle className="text-2xl mr-2 text-green-500" />
              ) : (
                ""
              )}
              {questionPaperUrl ? (
                questionPaperUrl
              ) : (
                <UploadButton
                  endpoint="media"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res![0].url);
                    setQuestionPaperUrl(res![0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>
          </div>
          <div className="w-full flex flex-col">
            <p className="mb-2 mt-7 font-semibold">
              Upload answer key / criteria
            </p>
            <div className="flex">
              {answerKeyUrl ? (
                <AiFillCheckCircle className="text-2xl mr-2 text-green-500" />
              ) : (
                ""
              )}
              {answerKeyUrl ? (
                answerKeyUrl
              ) : (
                <UploadButton
                  endpoint="media"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res![0].url);
                    setAnswerKeyUrl(res![0].url);
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
              )}
            </div>
          </div>
          <button
            className={
              "mt-10 btn w-full btn-primary " +
              (!title || !questionPaperUrl || !answerKeyUrl ? "opacity-50" : "")
            }
            onClick={() => {
              if (!title || !questionPaperUrl || !answerKeyUrl) return;
              createValuator();
            }}
          >
            {creatingValuator ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Create Valuator"
            )}
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default SubjectPage;

// import React from 'react'

// const page = () => {
//   return (
//     <div>page</div>
//   )
// }

// export default page
