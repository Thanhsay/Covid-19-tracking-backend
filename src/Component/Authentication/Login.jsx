import {Component} from "react";
import {Col, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import {checkLogin} from "../Admin/LoginUtil/LoginAction";
import {connect} from "react-redux";
import $ from 'jquery';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            check: true,
            checkUser: true,
            checkPass: true
        }
    }
    //onChange
    handleOnChange = (e) =>{
        e.preventDefault();
        let na = e.target.name;
        let va = e.target.value;
        this.setState({
            [na] : va
        })
    }
    //Reset
    handleReset = () =>{
        this.setState({
            username: '',
            password: ''
        })
    }
    //Login
    handleLogin = () =>{
        $('#labelLogin').empty();
        this.props.checkLogin(this.state.username, this.state.password);
        setTimeout(()=>{
            if(this.props.loginChecking.isLogin){
                sessionStorage.setItem('isLogin', 'true');
                this.props.history.push('/details');
            }else {
                $('#labelLogin').append("Tên đăng nhập hoặc mật khẩu không đúng! Xin vui lòng thử lại.");
            }
        },500)
    }

    render() {
        return(
                <div>
                    <div style={{minHeight:'50px'}}></div>
                    <div className='row'>
                        <div className='col-sm-4'></div>
                        <div className='col-sm-4' style={{border: '1px solid', padding:'25px', borderRadius:'6px'}}>
                            <h5 style={{textAlign:'center'}}>Đăng nhập</h5>
                            <br/>
                            <Form>
                                <FormGroup className='row'>
                                    <Label sm={4}>Tên đăng nhập: </Label>
                                    <Col sm={7}>
                                           <Input type='text'
                                                name='username'
                                                invalid={false}
                                                value={this.state.username}
                                                onChange={this.handleOnChange}
                                                placeholder='Tên đăng nhập ...'/>
                                           <FormFeedback invalid>Vui lòng nhập tên đăng nhập</FormFeedback>
                                       </Col>
                                </FormGroup>
                                <FormGroup className='row'>
                                    <Label sm={4}>Mật khẩu: </Label>
                                    <Col sm={7}>
                                        <Input type='password'
                                               name='password'
                                               value={this.state.password}
                                               invalid={false}
                                               onChange={this.handleOnChange}
                                               placeholder='Mật khẩu ...'/>
                                        <FormFeedback invalid>Vui lòng nhập mật khẩu</FormFeedback>
                                    </Col>
                                </FormGroup>
                            </Form>
                            <Label id='labelLogin' style={{color:'red', justifyContent:'center', display:'flex'}}></Label>
                            <br/>
                            <div style={{justifyContent:'center', display:'flex'}}>
                                <button className='btn btn-primary' style={{marginRight:'10px'}} onClick={this.handleLogin}>Đăng nhập</button>
                                {/*<button className='btn btn-primary'>Đăng nhập với Google</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}
const mapStateToProps = state =>{
    return{
        loginChecking: state.loginChecking
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        checkLogin: (user, pass) => dispatch(checkLogin(user, pass))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)