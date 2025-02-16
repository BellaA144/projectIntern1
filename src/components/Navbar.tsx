import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/transactions">Transactions</Link></li>
                <li><Link to="/summary">Summary</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
