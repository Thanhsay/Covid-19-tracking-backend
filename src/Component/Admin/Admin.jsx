import {Component} from "react";
import Infected from "../Card/Infected/Infected";
import {Nav, NavItem, NavLink} from "reactstrap";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    render() {
        return(
            <div>
                <div style={{marginBottom:"50px"}}>
                    <Nav pills style={{marginLeft:"50px"}}>
                        <NavItem>
                            <NavLink className="NavStart" href="#" active>Trực quan</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="NavStart" href="/details">Chi tiết</NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div>
                    <Infected/>
                </div>
            </div>
        )
    }
}
export default Admin