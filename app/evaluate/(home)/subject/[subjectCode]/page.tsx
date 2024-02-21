"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { AiFillCheckCircle, AiOutlineFileDone } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import UploadButton from '../../../_components/utils/uploadthing';
import ValuatorCard from '../../valuator-card';
import { ValuatorData } from '../../valuator-data';
import { bgColors} from "@/utils/utils";

type Params = {
  params:{
    subjectCode:string
  }
}
const serverUrl = "http://localhost:3001";

const SubjectPage = ({ params: {subjectCode} }: Params) => {

  const [valuators, setValuators] = useState([]);
  const [valuation, setValuation] = useState([]);
  const router = useRouter();

  const [creatingValuator, setCreatingValuator] = useState(false);


  const getValuators = async () => {
		const config = {
			method: "GET",
			url: `${serverUrl}/valuators`,
      headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
		};
		axios(config)
			.then((response) => {
				setValuators(response.data);
        console.log(response)
			})
			.catch((error) => {
				toast.error("Failed to fetch valuators");
			});
	}

	const createValuator = async (valuatorData) => {
    console.log(valuatorData)
		setCreatingValuator(true);
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators`,
      headers: {
				"Authorization": `Bearer ${localStorage.getItem("token")}`
			},
			data: {
				title: valuatorData.title,
        questionPaper:valuatorData.questionPaperUrl,
        answerKey:valuatorData.answerKeyUrl,
        subjectCode:subjectCode
			}
		};

		axios(config)
			.then((response) => {
				setCreatingValuator(false);
				toast.success("Valuator created successfully!");
			})
			.catch((error) => {
				setCreatingValuator(false);
				toast.error("Error creating valuator!");
			});
	}

	useEffect(() => {
		getValuators();
	}, [])

  return (
    <>
    <main className="flex flex-col items-center w-full h-full ">
				<div className="w-full h-full p-5 px-10">
					<p className="text-2xl my-4 mb-7 font-semibold">My Exam Valuators ({valuators.length})</p>
					<div className="flex flex-wrap w-full gap-10">
      {/* <ValuatorCard/> */}
        <Card className='cursor-pointer flex justify-center items-center p-6 '>
            <ValuatorData
            handleClick={createValuator}
            />
        </Card>
        {
          valuators?.map((item: any, index: number) => (
            <div key={index} translate="translateY(10px)" duration={`${(index * 0.075 + 0.5).toString()}s`}>
              <div onClick={() => router.push(`/evaluate/valuate/${item._id}`)} className="hover:shadow-2xl duration-100 cursor-pointer border-2 flex flex-col h-full w-full mb-10 mr-10 rounded-3xl shadow-lg overflow-hidden p-10">
                <div style={{ background: `linear-gradient(45deg, ${bgColors[item?.title.toString().toLowerCase()[0]][0]}, ${bgColors[item?.title.toString().toLowerCase()[0]][1]})` }} className="flex items-center justify-center w-full h-full opacity-50">
                  <AiOutlineFileDone style={{ color: bgColors[item?.title.toString().toLowerCase()[0]][1] }} className="h-40 w-40 mb-2" />
                </div>
                <div className="p-5 h-auto">
                  <p className="font-semibold text-lg">{item?.title}</p>
                  <p className="text-gray-500">{item?.valuations} valuations</p>
                </div>
              </div>
            </div>
          ))
        }
    </div>
				</div>
			</main>
   </>
  )
}

export default SubjectPage;


