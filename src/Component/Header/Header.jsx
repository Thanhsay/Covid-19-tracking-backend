import {Component} from "react";
import {Row, Col, Button} from "reactstrap";
import {Nav} from "reactstrap";
import {Link} from "react-router-dom";
import {AppBar, Typography, Toolbar, IconButton, MenuItem, MobileStepper} from "@material-ui/core";
import {connect} from "react-redux";
import {checkLogout} from "../Admin/LoginUtil/LoginAction";


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Date: ""
        }
    }

    GetDateTime = () => {
        let date = new Date();
        let month = date.getMonth()+1;
        let DateTime = date.getDate()+"/"+month+"/"+date.getFullYear();
        return DateTime;
    }

    componentDidMount() {
        this.setState({
            Date: this.GetDateTime()
        })
    }

    handleAdmin = () => {
        if(sessionStorage.getItem('isLogin') === 'true' || this.props.loginChecking.isLogin){
            return true;
        } else {
            return false;
        }
    }

    handleLogout = () => {
        if(sessionStorage.getItem('isLogin') === 'true'){
            sessionStorage.setItem('isLogin', 'false');
        }
        this.props.checkLogout();
    }

    render(){

        const Login = (
            <Link to="/login"><button className="btn btn-primary">Login</button></Link>
        )
        const Logout = (
            <Link to="/"><button className="btn btn-primary" onClick={this.handleLogout}>Logout</button></Link>
        )

        return(
            // <nav className="trackingNav">
            //     <Row className="TrackingAll">
            //         <Col sm="6">
            //             <Row>
            //                 <Col sm="3">
            //                     <img src="./logocovid19.png" style={{maxHeight:"50px", paddingLeft:"25px"}}/>
            //                 </Col>
            //                 <Col sm="9" style={{paddingTop:"6px"}}>
            //                     <div><b style={{fontSize:"2vw", paddingLeft:"15px"}}>COVID19-TRACKING</b></div>
            //                 </Col>
            //             </Row>
            //         </Col>
            //         <Col sm="4" style={{paddingTop:"12px"}}>
            //             <p>Việt Nam - Ngày: {this.state.Date}</p>
            //         </Col>
            //         <Col sm="2">
            //             <Row>
            //                 <Col sm="4" style={{paddingTop:"6px"}}>Admin</Col>
            //                 <Col sm="6">{Login}</Col>
            //             </Row>
            //         </Col>
            //     </Row>
            // </nav>


            <div>
                <AppBar position="static" >
                    <Toolbar>
                        <Typography variant="h5" style={{width:"60%", paddingLeft:"15px"}}>
                            <b>COVID19-TRACKING</b>
                        </Typography>
                        <Typography style={{width:"30%"}}>
                            Việt Nam - Ngày: {this.state.Date}
                        </Typography>
                        <Typography>
                            {this.handleAdmin() ? 'Admin' : ''}
                        </Typography>
                        <Typography style={{paddingLeft:"15px"}}>
                            {this.handleAdmin() ? Logout : Login}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return{
        loginChecking: state.loginChecking
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        checkLogout : () => dispatch(checkLogout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);