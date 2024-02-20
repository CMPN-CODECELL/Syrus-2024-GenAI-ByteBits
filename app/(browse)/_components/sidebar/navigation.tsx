"use client"
import React, { useState } from 'react'
import {
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";
  import {
    PresentationChartBarIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
  } from "@heroicons/react/24/solid";
import { 
    ChevronRightIcon, 
    ChevronDownIcon
} from "@heroicons/react/24/outline";
// import { NavLink, useNavigate } from 'react-router-dom';
// import { GrStatusWarning } from "react-icons/gr";
// import { CiSquareQuestion } from "react-icons/ci";
// import { MdAddTask } from "react-icons/md";
// import { Icon } from './Icon';
import { useMediaQuery } from 'usehooks-ts';
import Link from 'next/link';




export const Navigation = () => {
    const routes = [
        {
            link:`/admin/dashboard`,
            label:"Member Location",
            // icon:PresentationChartBarIcon
        },
        {
            link:`/admin/dashboard/disposal-status`,
            label:"Disposal Status",
            // icon:GrStatusWarning
        },
        {
            link:`/admin/dashboard/inventory`,
            label:"Inventory",
            // icon:CiSquareQuestion
        },
        {
            link:`/admin/dashboard/store`,
            label:"Store",
            // icon:MdAddTask
        },
        {
            link:`/dashboard/admin/notifications`,
            label:"Notifications",
            // icon:InboxIcon
        },
        {
            link:`/dashboard/admin/settings`,
            label:"Settings",
            // icon:Cog6ToothIcon
        },
        {
            link:`/dashboard/admin/logout`,
            label:"Log Out",
            // icon:PowerIcon
        },
    ]
    const matches = useMediaQuery("(max-width:1024px)");


    const [open, setOpen] = useState(0);
    // const navigate = useNavigate();
    
    const handleOpen = (value:any) => {
        setOpen(open === value ? 0 : value);
      };
    return (
    <div>
        {!matches&&<div className="mb-2 p-4">
            <Typography variant="h5" color="blue-gray">
            Menu
            </Typography>
        </div>}
        {matches&&<List >
            {routes.map((item,i)=>(
                <ListItem key={i}>
                    <Link href ={item.link} className={"flex items-center"}>
                        <ListItemPrefix>
                            <Icon icon={item.icon}/>
                        </ListItemPrefix>
                            {!matches&&item.label}
                    </Link>
                </ListItem>
            ))}
        </List>}
        {!matches&&<List>
          <Accordion
            open={open === 1}
            icon={
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${
                  open === 1 ? 'rotate-180' : ''
                }`}
              />
            }
          >
            <ListItem className="p-0" selected={open === 1}>
              <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                <ListItemPrefix>
                  <PresentationChartBarIcon className="h-5 w-5" />
                </ListItemPrefix>
                <Typography color="blue-gray" className="mr-auto font-normal">
                  Dashboard
                </Typography>
              </AccordionHeader>
            </ListItem>
            <AccordionBody className="py-1">
              <List className="p-0">
                {routes.slice(0,4).map((item)=>(
                    <ListItem key={item.link}>
                    <NavLink to={item.link} className="flex items-center">
                        <ListItemPrefix>
                            <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                        </ListItemPrefix>
                        {item.label}
                    </NavLink>
                    </ListItem>))}
               </List>
            </AccordionBody>
          </Accordion>
          <hr className="my-2 border-blue-gray-50" />
          {routes.slice(4,7).map((item)=>(
                <ListItem key={item.link}>
                    <NavLink to ={item.link} className={"flex items-center"}>
                        <ListItemPrefix>
                            <Icon icon={item.icon}/>
                        </ListItemPrefix>
                            {!matches&&item.label}
                    </NavLink>
                </ListItem>
            ))}
        </List>}
    </div>
    )
}
