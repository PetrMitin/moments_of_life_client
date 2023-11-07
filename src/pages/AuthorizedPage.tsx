import { FC } from "react";
import TopNavbar from "../components/ReusableComponents/Navbar/Navbar";
import Footer from "../components/ReusableComponents/Footer/Footer";

const AuthorizedPage: FC<{ Page: FC }> = ({ Page }) => {
    return (
        <div className="authorized-page">
            <TopNavbar />
            <Page />
            <Footer />
        </div>
    )
}

export default AuthorizedPage