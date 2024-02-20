'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
    // Redirect to the selected option
    router.push(`/${event.target.value}`);
  };

  return (
    <>
      <h1>Hello!!</h1>
      <select value={selectedOption} onChange={handleDropdownChange}>
        <option value="">Select an option</option>
        <option value="pdfToQuiz">PDF</option>
        <option value="videoToQuiz">Video</option>
      </select>
    </>
  );
};

export default Page;
