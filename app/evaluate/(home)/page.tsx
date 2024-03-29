"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import SubjectCard from './subject-card';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { InputData } from './input-data';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [subjects, setSubjects] = useState([]);
  const [creatingSubject, setCreatingSubject] = useState(false);
  const [subjectData,setSubjectData] = useState([])
  const router = useRouter();

  const getSubjects = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/subjects/`);
      setSubjects(response.data);
    } catch (error) {
      toast.error('Failed to fetch subjects');
    }
  };

  const createSubject = async (subjectData) => {
    setCreatingSubject(true);
    try {
      const response = await axios.post(`http://localhost:3001/subjects/`,subjectData);
      setCreatingSubject(false);
      toast.success('Subject created successfully!');
      // getSubjects();
    } catch (error) {
      setCreatingSubject(false);
      console.log(error)
      toast.error('Error creating subject!');
    }
  };


  useEffect(() => {
    getSubjects();
  }, []);

  const subjectsData = [
    {
      name: "Mathematics",
      description: "Study of numbers, quantities, shapes, and patterns.",
      code: "MATH101",
      department: "Mathematics Department",
      credits: 3
    },
    {
      name: "Computer Science",
      description: "Study of algorithms, data structures, and programming languages.",
      code: "COMP202",
      department: "Computer Science Department",
      credits: 4
    },
    {
      name: "English Literature",
      description: "Study of literary works written in the English language.",
      code: "ENGL301",
      department: "English Department",
      credits: 3
    },
    {
      name: "History",
      description: "Study of past events, particularly human affairs.",
      code: "HIST201",
      department: "History Department",
      credits: 3
    },
    {
      name: "Biology",
      description: "Study of living organisms and their interactions with each other and their environments.",
      code: "BIOL102",
      department: "Biology Department",
      credits: 4
    },
    {
      name: "Physics",
      description: "Study of matter, energy, space, and time.",
      code: "PHYS203",
      department: "Physics Department",
      credits: 4
    }
  ];


  return (
    <div className="grid grid-cols-4 gap-2 m-2 mt-4">
      {subjectsData.map((subject, index) => (
        <SubjectCard
          key={index}
          name={subject.name}
          description={subject.description}
          code={subject.code}
          department={subject.department}
          credits={subject.credits}
        />
      ))}
        {subjects.map((subject, index) => (
        <SubjectCard
          key={index}
          name={subject.name}
          description={subject.description}
          code={subject.code}
          department={subject.department}
          credits={subject.credits}
        />
      ))}
      <Card className='cursor-pointer flex justify-center items-center'>
         <InputData
          handleClick={createSubject}
         />
      </Card>
    </div>
  );
};

export default HomePage;
