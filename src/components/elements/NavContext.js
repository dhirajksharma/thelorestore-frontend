import { createContext } from "react";

const NavContext = createContext({
    navOption: '',
    setNavOption: () => {},
});

export default NavContext;