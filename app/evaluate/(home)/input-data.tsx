import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { useState } from "react";
  import { Plus } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  
  interface InputDataProps {
    handleClick: Function;
  }
  
  export const InputData = ({
    handleClick,
    setSubjectData,
  }: InputDataProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [department, setDepartment] = useState("");
    const [credits, setCredits] = useState();

    const handleSubmit = (e) => {

        handleClick({
          name,
          description,
          code,
          department,
          credits,
        });
        setName("");
        setDescription("");
        setCode("");
        setDepartment("");
        setCredits("");
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
              Add Subject
            </label>
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Input
              placeholder="Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Input
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <Input
              placeholder="Credits"
              type="number"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
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
  