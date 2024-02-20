import Link from "next/link";
// import NavLinks from "./nav-links";
// import AcmeLogo from "./acme-logo";
// import { PowerIcon } from "@heroicons/react/24/outline";
import Wrapper from "./wrapper";
import {NavLinks} from "./navigation";

export const SideNav = ()=>{
  return (
    <Wrapper>
      <NavLinks/>
    </Wrapper>
  );
}
