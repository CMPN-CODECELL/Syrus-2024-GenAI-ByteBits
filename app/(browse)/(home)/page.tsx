import { ModeToggle } from "@/components/theme-toggle";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  DocumentIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <>
    

      <div className="flex-grow flex items-center justify-center mt-52 ml-56">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-1/3 px-2">
              <Card className="w-80 h-96 p-4 border border-gray-300 rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AcademicCapIcon className="h-6 w-6 mr-2" />
                    AI-TEACHER
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mt-2">
                    AI-TEACHER is a virtual voice assistant designed to help
                    students and teachers outside of school hours. It provides
                    personalized learning experiences and educational resources
                    tailored to individual needs.
                  </CardDescription>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="basis-1/3 px-2">
              <Card className="w-80 h-96 p-4 border border-gray-300 rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserGroupIcon className="h-6 w-6 mr-2" />
                    COMICSTAAN
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mt-2">
                    COMICSTAAN is an AI-powered tool that generates comics to
                    make learning fun and engaging. It creates visually
                    appealing comic strips based on educational content, making
                    complex concepts easy to understand.
                  </CardDescription>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="basis-1/3 px-2">
              <Card className="w-80 h-96 p-4 border border-gray-300 rounded-lg shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <DocumentIcon className="h-6 w-6 mr-2" />
                    TESTIFY
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mt-2">
                    Testify is a platform that creates personalized test series
                    on any topic. It helps students practice and assess their
                    knowledge, offering insights and feedback to improve
                    learning outcomes.
                  </CardDescription>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
