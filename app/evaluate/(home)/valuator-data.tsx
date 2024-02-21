import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { useState } from "react";
  import { Plus } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { UploadButton } from "@/utils/uploadthing";
import { AiFillCheckCircle } from "react-icons/ai";
  
  interface ValuatorDataProps {
    handleClick: Function;
  }
  
  export const ValuatorData = ({
    handleClick,
  }: ValuatorDataProps) => {
    
    const [title, setTitle] = useState("");
    const [questionPaperUrl, setQuestionPaperUrl] = useState("");
    const [answerKeyUrl, setAnswerKeyUrl] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault()
        handleClick({
          title,
          questionPaperUrl,
          answerKeyUrl
        });
        setTitle("");
        setQuestionPaperUrl("");
        setAnswerKeyUrl("");
      };
  
    return (
      <Dialog>
        <DialogTrigger>
          <Button 
          
          
          variant={"outline"} size={"icon"}
          asChild
          >
            <Plus size={30} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form className="p-4 flex flex-col gap-2">
            <label className="text-center text-2xl font-semibold">
              Add Valuator
            </label>
            <Input
              placeholder="Exam Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {questionPaperUrl ? <AiFillCheckCircle className="text-2xl mr-2 text-green-500" /> : ""}
            {questionPaperUrl ? questionPaperUrl : <UploadButton
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
            />}
            {answerKeyUrl ? <AiFillCheckCircle className="text-2xl mr-2 text-green-500" /> : ""}
                {answerKeyUrl ? answerKeyUrl : <UploadButton
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
                />}
            <Button
              variant={"default"}
              onClick={handleSubmit}
              type="submit"
            >
              Submit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  