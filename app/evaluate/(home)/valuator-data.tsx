import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { useState } from "react";
  import { Plus } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  
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
          <Button variant={"outline"} size={"icon"}
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
            <Input
              placeholder="Question Paper"
              value={questionPaperUrl}
              type="file"
              onChange={(e) => setQuestionPaperUrl(e.target.value)}
            />
            <Input
              placeholder="Answer Key"
              value={answerKeyUrl}
              type="file"
              onChange={(e) => setAnswerKeyUrl(e.target.value)}
            />
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
  