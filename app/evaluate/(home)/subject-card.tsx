import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import React from 'react'


interface SubjectCardProps{
    name:string,
    description:string,
    code:string,
    department:string,
    credits:int,
    classname?:string
}
const SubjectCard = ({
    name,
    description,
    code,
    department,
    credits,
    classname
}:SubjectCardProps) => {
  return (
    <Card className="cursor-pointer shadow-md rounded-2xl">
        <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
        <p><strong>Code:</strong> {code}</p>
        <p><strong>Department:</strong> {department}</p>
        <p><strong>Credits:</strong> {credits}</p>
        </CardContent>
        <CardFooter>
        <p>More actions related to {name}</p>
        </CardFooter>
    </Card>
  )
}

export default SubjectCard