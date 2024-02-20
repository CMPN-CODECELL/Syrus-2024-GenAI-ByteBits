"use client"
import React, { useState } from 'react'
import SubjectCard from './subject-card';

const HomePage = () => {

  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
		const config = {
			method: "GET",
			url: `${serverUrl}/subjects`,
			headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
		};

    const createSubject = async () => {
      setCreatingSubject(true);
      const config = {
        method: "POST",
        url: `${serverUrl}/valuators`,
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": `application/json`,
        },
        data: {
          title: title,
          questionPaper: questionPaperUrl,
          answerKey: answerKeyUrl,
        }
      };
  
      axios(config)
        .then((response) => {
          setCreatingSubject(false);
          toast.success("Valuator created successfully!");
          getSubjects();
          (document.getElementById("new_valuation_modal") as any).close()
        })
        .catch((error) => {
          setCreatingValuator(false);
          toast.error("Error creating valuator!");
          (document.getElementById("new_valuation_modal") as any).close()
        });
    }
  
		axios(config)
			.then((response) => {
				setSubjects(response.data);
			})
			.catch((error) => {
				toast.error("Failed to fetch subjects");
			});
	}

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
    </div>
  )
};

export default HomePage