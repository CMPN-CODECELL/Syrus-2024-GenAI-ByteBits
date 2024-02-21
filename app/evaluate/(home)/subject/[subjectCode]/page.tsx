"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { AiFillCheckCircle } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import UploadButton from '../../../_components/utils/uploadthing';
import ValuatorCard from '../../valuator-card';
import { ValuatorData } from '../../valuator-data';

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
		};

		axios(config)
			.then((response) => {
				setValuators(response.data);
			})
			.catch((error) => {
				toast.error("Failed to fetch valuators");
			});
	}

	const createValuator = async (valuatorData) => {
		setCreatingValuator(true);
		const config = {
			method: "POST",
			url: `${serverUrl}/valuators`,
			data: {
				...valuatorData,
        subjectCode:subjectCode
			}
		};

		axios(config)
			.then((response) => {
				setCreatingValuator(false);
				toast.success("Valuator created successfully!");
				getValuators();
				(document.getElementById("new_valuation_modal") as any).close()
			})
			.catch((error) => {
				setCreatingValuator(false);
				toast.error("Error creating valuator!");
				(document.getElementById("new_valuation_modal") as any).close()
			});
	}


	useEffect(() => {
		getValuators();
	}, [])

  return (
    <>
   <ValuatorCard/>
   <Card className='cursor-pointer flex justify-center items-center'>
      <ValuatorData
      handleClick={createValuator}
      />
   </Card>
   </>
  )
}

export default SubjectPage;


