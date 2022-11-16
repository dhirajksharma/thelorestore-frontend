import { createContext } from "react";

const NavContext = createContext({
    navOption: '',
    setNavOption: () => {},
    serverError:'',
});

export default NavContext;