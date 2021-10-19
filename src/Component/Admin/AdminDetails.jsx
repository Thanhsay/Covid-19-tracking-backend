import {Component, Fragment} from "react";
import {
    Alert,
    Button,
    Col,
    Form,
    FormFeedback,
    FormGroup,
    Input,
    Label,
    Nav,
    NavItem,
    NavLink,
    Modal,
    ModalBody,
    ModalFooter,
    Spinner
} from "reactstrap";
import {connect} from "react-redux";
import Infected from "../Card/Infected/Infected";
import {IconButton, Table, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@material-ui/core";
import ProjectService from "../../Service/ProjectService";
import confirm from "reactstrap-confirm";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {BorderBottom} from "@material-ui/icons";
import $ from 'jquery';
import {passCityId} from "./ReloadCityUtil/ReloadAction";

class AdminDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            city: '',
            date: '',
            infected: '',
            recovered: '',
            deaths: '',
            page: 1,
            rowsPerPage: 10,
            count: 65,
            detail: [],
            searching: false,
            idCity: '',
            cityCity: '',
            dateCity: '',
            infectedCity: '',
            recoveredCity: '',
            deathsCity: '',
            pageCity: 1,
            rowsPerPageCity: 5,
            countCity: '',
            detailCity: [],
            isSearchingCity: false,
            isSearching: false,
            cityValid: false,
            dateValid: false,
            dateValid1: false,
            infectedValid: false,
            recoveredValid: false,
            deathsValid: false,
            statusAdd: true,
            confirm: false
        }
    }

    componentDidMount() {
        ProjectService.pagination(this.state.page, this.state.rowsPerPage).then(res =>{
                let data = res.data;
                this.setState({
                    page: data.page,
                    rowsPerPage: data.offset,
                    detail: data.allCityList
                })
        })
        ProjectService.findCity(this.props.reloadCity.cityId, this.state.pageCity, this.state.rowsPerPageCity).then(res=>{
            let data = res.data;
            this.setState({
                detailCity: data.detailsList
            })
        })
    }

    handleChange = (e) =>{
        e.preventDefault();
        let na = e.target.name;
        let va = e.target.value;
        this.setState({

            [na] : va
        })
    }

    //handle change city table 2
    handleChange1 = (e) => {
        e.preventDefault();
        let va = e.target.value;
        this.setState({
            cityCity: va,
            cityValid: false
        })
    }
    //handle change date table 2
    handleChange2 = (e) => {
        e.preventDefault();
        let va = e.target.value;
        this.setState({
            dateCity: va,
            dateValid: false,
            dateValid1: false
        })
    }
    //handle change infected table 2
    handleChange3 = (e) => {
        e.preventDefault();
        let va = e.target.value;
        this.setState({
            infectedCity: va,
            infectedValid: false
        })
    }
    //handle change infected table 2
    handleChange4 = (e) => {
        e.preventDefault();
        let va = e.target.value;
        this.setState({
            recoveredCity: va,
            recoveredValid: false
        })
    }
    //handle change infected table 2
    handleChange5 = (e) => {
        e.preventDefault();
        let va = e.target.value;
        this.setState({
            deathsCity: va,
            deathsValid: false
        })
    }

    //change city
    handleChangeCity = () => {
        if(this.state.city == 2) {
            this.setState({
                isSearching: false,
                count: 65
            })
            this.componentDidMount();
        }else {
            this.setState({
                isSearching: true,
                count: 1
            })
            ProjectService.searching(this.state.city).then(res=>{
                let data = res.data;
                this.setState({
                    detail: data.allCityList
                })
            })
        }
    }

    //Reset
    handleReset = () =>{
        this.setState({
            cityCity: '',
            dateCity: '',
            infectedCity: '',
            recoveredCity: '',
            deathsCity: '',
            searching: false,
            isSearchingCity: false
        })
    }
    //change rows per page
    handleRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 1
        })
        if(this.state.isSearching == false){
            let rows = event.target.value;
            ProjectService.pagination(1, rows).then(res =>{
                let data = res.data;
                this.setState({
                    detail: data.allCityList
                })
            })
        }else {

        }
        $("body,html").animate({scrollTop: $("#tableAllCity").offset().top}, "slow");
    }
    //change rowsPerPage city
    handleChangeRowsPerPageCity = (e) => {
        this.setState({
            rowsPerPageCity: e.target.value,
            pageCity: 1
        })
        let rows = e.target.value;
        ProjectService.findCity(this.state.city, 1, rows).then(res=>{
            let data = res.data;
            this.setState({
                detailCity: data.detailsList
            })
        })
    }
    //change rows per page city when searching
    handleChangeRowsPerPageCitySearch = (e) => {
        this.setState({
            rowsPerPageCity: e.target.value,
            pageCity: 1
        })
        let rows = e.target.value;
        let detail = {
            city: this.state.cityCity,
            date: this.state.dateCity,
            page: 1,
            offset: rows
        }
        ProjectService.searchingCity(detail).then(res=>{
            let data = res.data;
            this.setState({
                detailCity: data.detailsList
            })
        })
    }
    //change page
    handleChangePage = (event, page) => {
        if(this.state.isSearching == false){
            ProjectService.pagination(page+1, this.state.rowsPerPage).then(res => {
                let data = res.data;
                this.setState({
                    detail: data.allCityList,
                    page: data.page
                })
            })
        }else {
            this.setState({
                page: 1
            })
        }
    }
    //change page city
    handleChangePageCity = (event, page) =>{
        ProjectService.findCity(this.state.city, page+1, this.state.rowsPerPageCity)
            .then(res=>{
                let data = res.data;
                this.setState({
                    detailCity: data.detailsList,
                    pageCity: data.page
                })
        })
    }
    //change page city when searching
    handleChangePageCitySearch = (event, page) => {
        let detail = {
            city: this.state.cityCity,
            date: this.state.dateCity,
            page: page + 1,
            offset: this.state.rowsPerPageCity
        }
        ProjectService.searchingCity(detail).then(res=>{
            let data = res.data;
            this.setState({
                detailCity: data.detailsList,
                pageCity: data.page
            })
        })
    }

    //edit
    handleEdit = (city) => {
        ProjectService.findCity(city, this.state.pageCity, this.state.rowsPerPageCity).then(res=>{
            let data = res.data;
            this.setState({
                detailCity: data.detailsList,
                city: data.city,
                countCity: data.totalItems
            })
        })
        $("body,html").animate({scrollTop: $("#detailCity").offset().top}, "slow");
        this.handleReset();
    }

    //edit by city
    handleEditCityById = (id) => {
        ProjectService.findById(id).then(res => {
            let data = res.data;
            this.props.passCityId(data.city);
            this.setState({
                idCity: id,
                cityCity: data.city,
                dateCity: data.date,
                infectedCity: data.infected,
                recoveredCity: data.recovered,
                deathsCity: data.deaths,
                searching: true
            })
        })
        $("body,html").animate({scrollTop: $("#cityEdit").offset().top}, "slow");
    }

    city = (id) => {
        switch (id) {
            case 2: return "Toàn quốc";
                    break;
            case 3: return "An Giang";
                break;
            case 4: return "Bà Rịa - Vũng Tàu";
                break;
            case 5: return "Bạc Liêu";
                break;
            case 6: return "Bắc Giang";
                break;
            case 7: return "Bắc Kạn";
                break;
            case 8: return "Bắc Ninh";
                break;
            case 9: return "Bến Tre";
                break;
            case 10: return "Bình Dương";
                break;
            case 11: return "Bình Định";
                break;
            case 12: return "Bình Phước";
                break;
            case 13: return "Bình Thuận";
                break;
            case 14: return "Cà Mau";
                break;
            case 15: return "Cao Bằng";
                break;
            case 16: return "Cần Thơ";
                break;
            case 17: return "Đà Nẵng";
                break;
            case 18: return "Đắk Lắk";
                break;
            case 19: return "Đắk Nông";
                break;
            case 20: return "Điện Biên";
                break;
            case 21: return "Đồng Nai";
                break;
            case 22: return "Đồng Tháp";
                break;
            case 23: return "Gia Lai";
                break;
            case 24: return "Hà Giang";
                break;
            case 25: return "Hà Nam";
                break;
            case 26: return "Hà Nội";
                break;
            case 27: return "Hà Tĩnh";
                break;
            case 28: return "Hải Dương";
                break;
            case 29: return "Hải Phòng";
                break;
            case 30: return "Hậu Giang";
                break;
            case 31: return "Hòa Bình";
                break;
            case 32: return "TP Hồ Chí Minh";
                break;
            case 33: return "Hưng Yên";
                break;
            case 34: return "Khánh Hòa";
                break;
            case 35: return "Kiên Giang";
                break;
            case 36: return "Kon Tum";
                break;
            case 37: return "Lai Châu";
                break;
            case 38: return "Lạng Sơn";
                break;
            case 39: return "Lào Cai";
                break;
            case 40: return "Lâm Đồng";
                break;
            case 41: return "Long An";
                break;
            case 42: return "Nam Định";
                break;
            case 43: return "Nghệ An";
                break;
            case 44: return "Ninh Bình";
                break;
            case 45: return "Ninh Thuận";
                break;
            case 46: return "Phú Thọ";
                break;
            case 47: return "Phú Yên";
                break;
            case 48: return "Quảng Bình";
                break;
            case 49: return "Quảng Nam";
                break;
            case 50: return "Quảng Ninh";
                break;
            case 51: return "Quảng Ngãi";
                break;
            case 52: return "Quảng Trị";
                break;
            case 53: return "Sóc Trăng";
                break;
            case 54: return "Sơn La";
                break;
            case 55: return "Tây Ninh";
                break;
            case 56: return "Thái Bình";
                break;
            case 57: return "Thái Nguyên";
                break;
            case 58: return "Thanh Hóa";
                break;
            case 59: return "Thừa Thiên Huế";
                break;
            case 60: return "Tiền Giang";
                break;
            case 61: return "Trà Vinh";
                break;
            case 62: return "Tuyên Quang";
                break;
            case 63: return "Vĩnh Long";
                break;
            case 64: return "Vĩnh Phúc";
                break;
            case 65: return "Yên Bái";
                break;
        }
    }

    //validate
    solveDate = (dateTime) =>{
       const date = dateTime.split('-');
       const time = new Date();
       if(time.getFullYear()<date[0]){
           return false;
       } else {
           if((time.getMonth()+1)<date[1]){
               return false;
           }else {
               if(time.getDate()<date[2]){
                   return false
               }
           }
       }
       return true;
    }

    //add new city
    handleAdd = async () => {
        let detailAdd = {
            city: this.state.cityCity,
            date: this.state.dateCity,
            infected: this.state.infectedCity,
            recovered: this.state.recoveredCity,
            deaths: this.state.deathsCity
        }
        this.setState({
            cityValid: false,
            dateValid: false,
            dateValid1: false,
            infectedValid: false,
            recoveredValid: false,
            deathsValid: false,
            statusAdd: true
        })
        if(this.state.cityCity === ""){
            this.setState({
                cityValid: true,
                statusAdd: false
            })
        }
        if(this.state.dateCity === "" ){
            this.setState({
                dateValid: true,
                statusAdd: false
            })
        }
        if(!this.solveDate(this.state.dateCity)){
            this.setState({
                dateValid: true,
                dateValid1: true,
                statusAdd: false
            })
        }
        if(this.state.infectedCity === ""){
            this.setState({
                infectedValid: true,
                statusAdd: false
            });
        }
        if(this.state.recoveredCity === ""){
            this.setState({
                recoveredValid: true,
                statusAdd: false
            })
        }
        if(this.state.deathsCity === ""){
            this.setState({
                deathsValid: true,
                statusAdd: false
            })
        }
        setTimeout(()=>{
            if(this.state.searching === false && this.state.statusAdd === true){
                let callBack = true;
                let detail = {
                    city: this.state.cityCity,
                    date: this.state.dateCity,
                    page: this.state.pageCity,
                    offset: this.state.rowsPerPageCity
                }
                ProjectService.searchingCity(detail).then(res=>{
                    let data = res.data;
                    if(data.detailsList.length === 0){
                        callBack = false;
                    }
                    if(callBack){
                        confirm({
                            title:"Trạng thái thêm mới: ",
                            message:(
                                <p style={{color:"red"}}>Ngày thêm mới đã tồn tại dữ liệu! Vui lòng chọn tìm kiếm.</p>
                            ),
                            cancelText:"",
                            confirmText:"Thoát",
                            confirmColor:"danger",
                            // cancelColor:"danger"
                        });
                    }else {
                        ProjectService.saveDetail(detailAdd).then(res => {
                            let del = res.data;
                            if(this.state.searching == false){
                                if (del === "success") {
                                    confirm({
                                        title:"Trạng thái thêm mới: ",
                                        message:(
                                            <p style={{color:"blue"}}>Thêm mới thành công!</p>
                                        ),
                                        cancelText:"",
                                        confirmText:"Thoát",
                                        confirmColor:"primary"
                                        // cancelColor:'primary'

                                    });
                                    this.componentDidMount();
                                }else {
                                    confirm({
                                        title:"Trạng thái thêm mới: ",
                                        message:(
                                            <p style={{color:"red"}}>Thêm mới thất bại! Vui lòng thử lại.</p>
                                        ),
                                        cancelText:"",
                                        confirmText:"Thoát",
                                        confirmColor:"danger"

                                    })
                                }
                            }
                        })
                        this.handleReset();
                    }
                });
            }
        },100)
    }

    //edit by city
    handleEditCity = () =>{
        this.setState({
            cityValid: false,
            dateValid: false,
            dateValid1: false,
            infectedValid: false,
            recoveredValid: false,
            deathsValid: false,
            statusAdd: true
        });
        if(this.state.cityCity === ""){
            this.setState({
                cityValid: true,
                statusAdd: false
            })
        }
        if(this.state.dateCity === "" ){
            this.setState({
                dateValid: true,
                statusAdd: false
            })
        }
        if(!this.solveDate(this.state.dateCity)){
            this.setState({
                dateValid: true,
                dateValid1: true,
                statusAdd: false
            })
        }
        if(this.state.infectedCity === ""){
            this.setState({
                infectedValid: true,
                statusAdd: false
            });
        }
        if(this.state.recoveredCity === ""){
            this.setState({
                recoveredValid: true,
                statusAdd: false
            })
        }
        if(this.state.deathsCity === ""){
            this.setState({
                deathsValid: true,
                statusAdd: false
            })
        }
        let detailEdit = {
            details_id: this.state.idCity,
            city: this.state.cityCity,
            date: this.state.dateCity,
            infected: this.state.infectedCity,
            recovered: this.state.recoveredCity,
            deaths: this.state.deathsCity
        }
        setTimeout(()=>{
            if(this.state.searching == true && this.state.statusAdd == true){
                ProjectService.saveDetail(detailEdit).then(res => {
                    let del = res.data;
                    if(this.state.searching == true){
                        if (del === "success") {
                            confirm({
                                title:"Trạng thái cập nhật: ",
                                message:(
                                    <p style={{color:"blue"}}>Cập nhật thành công!</p>
                                ),
                                cancelText:"",
                                confirmText:"Thoát",
                                confirmColor:"primary"

                            });
                            this.componentDidMount();
                            this.setState({
                                searching: false
                            })
                            this.handleReset();
                        }else {
                            confirm({
                                title:"Trạng thái cập nhật: ",
                                message:(
                                    <p style={{color:"red"}}>Cập nhật thất bại! Vui lòng thử lại.</p>
                                ),
                                cancelText:"",
                                confirmText:"Thoát",
                                confirmColor:"danger"

                            })
                        }
                    }
                });
            }
        },100)
    }
    //search in table 2
    searchingCity = () => {
        this.setState({
            isSearchingCity: true,
            city: this.state.cityCity,
            cityValid: false,
            dateValid: false,
            dateValid1: false,
            infectedValid: false,
            recoveredValid: false,
            deathsValid: false
        })
        let detail = {
            city: this.state.cityCity,
            date: this.state.dateCity,
            page: this.state.pageCity,
            offset: this.state.rowsPerPageCity
        }
        ProjectService.searchingCity(detail).then(res=>{
            let data = res.data;
            this.setState({
                detailCity: data.detailsList,
                pageCity: 1,
                countCity: data.totalItems

            })
        })
        $("body,html").animate({scrollTop: $("#cityEdit").offset().top}, "slow");
    }

    render() {

        return(
            <div style={{marginBottom:"50px"}}>
                <div style={{marginBottom:"50px"}}>
                    <Nav pills style={{marginLeft:"5%"}}>
                        <NavItem>
                            <NavLink className="NavStart" href="/admin" >Trực quan</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className="NavStart" href="#" active>Chi tiết</NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <div style={{marginLeft:"5%", marginBottom:"30px"}} id="tableAllCity">
                    <h3>Chi tiết dịch bệnh tại các tỉnh/thành phố</h3>
                </div>
                <div>
                    <Form style={{marginLeft:"5%"}} className="row">
                        <FormGroup row className="col-sm-6" style={{minHeight:"60px"}}>
                            <Label sm={3}>Tỉnh thành</Label>
                            <Col sm={6}>
                                <Input type="select"
                                       name="city"
                                       onChange={this.handleChange}
                                       onClick={this.handleChangeCity}
                                       invalid={false}
                                       value={this.state.city}>
                                    {/*<option disabled selected value="">Lựa chọn tỉnh thành</option>*/}
                                    <option value="2">Toàn quốc</option>
                                    <option value="3">An Giang</option>
                                    <option value="4">Bà Rịa - Vũng Tàu</option>
                                    <option value="5">Bạc Liêu</option>
                                    <option value="6">Bắc Giang</option>
                                    <option value="7">Bắc Kạn</option>
                                    <option value="8">Bắc Ninh</option>
                                    <option value="9">Bến Tre</option>
                                    <option value="10">Bình Dương</option>
                                    <option value="11">Bình Định</option>
                                    <option value="12">Bình Phước</option>
                                    <option value="13">Bình Thuận</option>
                                    <option value="14">Cà Mau</option>
                                    <option value="15">Cao Bằng</option>
                                    <option value="16">Cần Thơ</option>
                                    <option value="17">Đà Nẵng</option>
                                    <option value="18">Đắk Lắk</option>
                                    <option value="19">Đắk Nông</option>
                                    <option value="20">Điện Biên</option>
                                    <option value="21">Đồng Nai</option>
                                    <option value="22">Đồng Tháp</option>
                                    <option value="23">Gia Lai</option>
                                    <option value="24">Hà Giang</option>
                                    <option value="25">Hà Nam</option>
                                    <option value="26">Hà Nội</option>
                                    <option value="27">Hà Tĩnh</option>
                                    <option value="28">Hải Dương</option>
                                    <option value="29">Hải Phòng</option>
                                    <option value="30">Hậu Giang</option>
                                    <option value="31">Hòa Bình</option>
                                    <option value="32">TP Hồ Chí Minh</option>
                                    <option value="33">Hưng Yên</option>
                                    <option value="34">Khánh Hòa</option>
                                    <option value="35">Kiên Giang</option>
                                    <option value="36">Kon Tum</option>
                                    <option value="37">Lai Châu</option>
                                    <option value="38">Lạng Sơn</option>
                                    <option value="39">Lào Cai</option>
                                    <option value="40">Lâm Đồng</option>
                                    <option value="41">Long An</option>
                                    <option value="42">Nam Định</option>
                                    <option value="43">Nghệ An</option>
                                    <option value="44">Ninh Bình</option>
                                    <option value="45">Ninh Thuận</option>
                                    <option value="46">Phú Thọ</option>
                                    <option value="47">Phú Yên</option>
                                    <option value="48">Quảng Bình</option>
                                    <option value="49">Quảng Nam</option>
                                    <option value="50">Quảng Ninh</option>
                                    <option value="51">Quảng Ngãi</option>
                                    <option value="52">Quảng Trị</option>
                                    <option value="53">Sóc Trăng</option>
                                    <option value="54">Sơn La</option>
                                    <option value="55">Tây Ninh</option>
                                    <option value="56">Thái Bình</option>
                                    <option value="57">Thái Nguyên</option>
                                    <option value="58">Thanh Hóa</option>
                                    <option value="59">Thừa Thiên Huế</option>
                                    <option value="60">Tiền Giang</option>
                                    <option value="61">Trà Vinh</option>
                                    <option value="62">Tuyên Quang</option>
                                    <option value="63">Vĩnh Long</option>
                                    <option value="64">Vĩnh Phúc</option>
                                    <option value="65">Yên Bái</option>
                                </Input>
                                <FormFeedback invalid>Vui lòng chọn tỉnh thành</FormFeedback>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
                <div className="row">
                    <TableContainer style={{marginLeft:"5%", marginRight:"50px"}} className="col-sm-10">
                        <Table className="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tỉnh Thành</TableCell>
                                    <TableCell>Tổng số ca nhiễm</TableCell>
                                    <TableCell>Ca nhiễm hôm nay</TableCell>
                                    <TableCell>Khỏi bệnh</TableCell>
                                    <TableCell>Khỏi bệnh hôm nay</TableCell>
                                    <TableCell>Tử vong</TableCell>
                                    <TableCell>Tử vong hôm nay</TableCell>
                                    <TableCell>Chi tiết</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                this.state.detail.map(
                                    row =>
                                        <TableRow style={{alignItems:"center"}}>
                                            <TableCell>{this.city(row.city)}</TableCell>
                                            <TableCell>{row.total_infected}</TableCell>
                                            <TableCell style={{color:"red"}}>{row.new_infected == 0 ? "----" : "+ " +row.new_infected}</TableCell>
                                            <TableCell>{row.total_recovered}</TableCell>
                                            <TableCell style={{color:"blue"}}>{row.new_recovered == 0 ? "----" : "+ " +row.new_recovered}</TableCell>
                                            <TableCell>{row.total_deaths}</TableCell>
                                            <TableCell style={{color:"red"}}>{row.new_deaths == 0 ? "----" : "+ " +row.new_deaths}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => row.city === 2 ? '' : this.handleEdit(row.city)}>
                                                    <ArrowForwardIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                )
                            }
                            <TablePagination
                                count={this.state.count}
                                page={this.state.page-1}
                                onChangePage={this.handleChangePage}
                                // onPageChange={}
                                rowsPerPage={this.state.rowsPerPage}
                                onChangeRowsPerPage={this.handleRowsPerPage}
                                rowsPerPageOptions={[5, 10, 20]}
                            >

                            </TablePagination>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{marginLeft:"5%", marginBottom:"50px", marginTop:"25px"}} id="cityEdit">
                    <h3>Thêm dữ liệu theo ngày</h3>
                </div>
                <div style={{marginBottom:"50px"}}>
                    <Form style={{marginLeft:"5%"}} className="row">
                        <FormGroup row className="col-sm-6" style={{minHeight:"60px"}}>
                            <Label sm={4}>Tỉnh thành</Label>
                            <Col sm={6}>
                                <Input type="select"
                                       name="cityCity"
                                       onChange={this.handleChange1}
                                       invalid={this.state.cityValid}
                                       value={this.state.cityCity}>
                                    <option disabled selected value="">Lựa chọn tỉnh thành</option>
                                    {/*<option value="2">Toàn quốc</option>*/}
                                    <option value="3">An Giang</option>
                                    <option value="4">Bà Rịa - Vũng Tàu</option>
                                    <option value="5">Bạc Liêu</option>
                                    <option value="6">Bắc Giang</option>
                                    <option value="7">Bắc Kạn</option>
                                    <option value="8">Bắc Ninh</option>
                                    <option value="9">Bến Tre</option>
                                    <option value="10">Bình Dương</option>
                                    <option value="11">Bình Định</option>
                                    <option value="12">Bình Phước</option>
                                    <option value="13">Bình Thuận</option>
                                    <option value="14">Cà Mau</option>
                                    <option value="15">Cao Bằng</option>
                                    <option value="16">Cần Thơ</option>
                                    <option value="17">Đà Nẵng</option>
                                    <option value="18">Đắk Lắk</option>
                                    <option value="19">Đắk Nông</option>
                                    <option value="20">Điện Biên</option>
                                    <option value="21">Đồng Nai</option>
                                    <option value="22">Đồng Tháp</option>
                                    <option value="23">Gia Lai</option>
                                    <option value="24">Hà Giang</option>
                                    <option value="25">Hà Nam</option>
                                    <option value="26">Hà Nội</option>
                                    <option value="27">Hà Tĩnh</option>
                                    <option value="28">Hải Dương</option>
                                    <option value="29">Hải Phòng</option>
                                    <option value="30">Hậu Giang</option>
                                    <option value="31">Hòa Bình</option>
                                    <option value="32">TP Hồ Chí Minh</option>
                                    <option value="33">Hưng Yên</option>
                                    <option value="34">Khánh Hòa</option>
                                    <option value="35">Kiên Giang</option>
                                    <option value="36">Kon Tum</option>
                                    <option value="37">Lai Châu</option>
                                    <option value="38">Lạng Sơn</option>
                                    <option value="39">Lào Cai</option>
                                    <option value="40">Lâm Đồng</option>
                                    <option value="41">Long An</option>
                                    <option value="42">Nam Định</option>
                                    <option value="43">Nghệ An</option>
                                    <option value="44">Ninh Bình</option>
                                    <option value="45">Ninh Thuận</option>
                                    <option value="46">Phú Thọ</option>
                                    <option value="47">Phú Yên</option>
                                    <option value="48">Quảng Bình</option>
                                    <option value="49">Quảng Nam</option>
                                    <option value="50">Quảng Ninh</option>
                                    <option value="51">Quảng Ngãi</option>
                                    <option value="52">Quảng Trị</option>
                                    <option value="53">Sóc Trăng</option>
                                    <option value="54">Sơn La</option>
                                    <option value="55">Tây Ninh</option>
                                    <option value="56">Thái Bình</option>
                                    <option value="57">Thái Nguyên</option>
                                    <option value="58">Thanh Hóa</option>
                                    <option value="59">Thừa Thiên Huế</option>
                                    <option value="60">Tiền Giang</option>
                                    <option value="61">Trà Vinh</option>
                                    <option value="62">Tuyên Quang</option>
                                    <option value="63">Vĩnh Long</option>
                                    <option value="64">Vĩnh Phúc</option>
                                    <option value="65">Yên Bái</option>
                                </Input>
                                <FormFeedback invalid>Vui lòng chọn tỉnh thành</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="col-sm-6" style={{minHeight:"60px"}}>
                            <Label sm={4}>Ngày thống kê</Label>
                            <Col sm={6}>
                                <Input type="date"
                                       name="dateCity"
                                       onChange={this.handleChange2}
                                       invalid={this.state.dateValid}
                                       value={this.state.dateCity}/>
                                <FormFeedback invalid>{!this.state.dateValid1 ?
                                    'Vui lòng nhập ngày tháng' : 'Ngày tháng không được vượt quá ngày tháng hiện tại'}</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="col-sm-6" style={{minHeight:"60px"}}>
                            <Label sm={4}>Số ca nhiễm bệnh mới theo ngày</Label>
                            <Col sm={6}>
                                <Input type="number"
                                       name="infectedCity"
                                       onChange={this.handleChange3}
                                       invalid={this.state.infectedValid}
                                       value={this.state.infectedCity}/>
                                <FormFeedback invalid>Vui lòng nhập số ca nhiễm theo ngày</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="col-sm-6" style={{minHeight:"60px"}}>
                            <Label sm={4}>Số ca khỏi bệnh mới theo ngày</Label>
                            <Col sm={6}>
                                <Input type="number"
                                       name="recoveredCity"
                                       onChange={this.handleChange4}
                                       invalid={this.state.recoveredValid}
                                       value={this.state.recoveredCity}/>
                                <FormFeedback invalid>Vui lòng nhập số ca khỏi theo ngày</FormFeedback>
                            </Col>
                        </FormGroup>
                        <FormGroup row className="col-sm-6" style={{minHeight:"60px"}}>
                            <Label sm={4}>Số ca tử vong mới theo ngày</Label>
                            <Col sm={6}>
                                <Input type="number"
                                       name="deathsCity"
                                       onChange={this.handleChange5}
                                       invalid={this.state.deathsValid}
                                       value={this.state.deathsCity}/>
                                <FormFeedback invalid>Vui lòng nhập số ca tử vong theo ngày</FormFeedback>
                            </Col>
                        </FormGroup>
                    </Form>
                    <div style={{justifyContent:"center", display:"flex"}}>
                        <Button className="btn-primary" style={{marginRight:"20px"}}
                                onClick={this.state.searching ? this.handleEditCity : this.handleAdd}>
                            {this.state.searching ? "Cập nhật" : "Thêm mới"}</Button>
                        <Button onClick={this.state.searching ? this.handleReset : this.searchingCity}>
                            {this.state.searching ? "Nhập lại" : "Tìm kiếm"}</Button>
                    </div>
                </div>
                <div className="row" id="detailCity">
                    {/*<div style={{marginLeft:"5%"}}>*/}
                    {/*    <h5>Tỉnh thành: {this.city(this.state.city)}</h5>*/}
                    {/*</div>*/}
                    <TableContainer style={{marginLeft:"5%", marginRight:"50px"}} className="col-sm-10">
                        <Table className="table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tỉnh thành</TableCell>
                                    <TableCell>Ngày</TableCell>
                                    <TableCell>Số ca nhiễm mới</TableCell>
                                    <TableCell>Số ca khỏi bệnh</TableCell>
                                    <TableCell>Số ca tử vong</TableCell>
                                    <TableCell>Chỉnh sửa</TableCell>
                                </TableRow>
                            </TableHead>
                            {
                                this.state.detailCity.map(
                                    row =>
                                        <TableRow key={row.details_id}>
                                            <TableCell>{this.city(row.city)}</TableCell>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell style={{color:"red"}}>{row.infected == 0 ? "----" : "+ "+row.infected}</TableCell>
                                            <TableCell style={{color:"blue"}}>{row.recovered == 0 ? "----" : "+ "+row.recovered}</TableCell>
                                            <TableCell style={{color:"red"}}>{row.deaths == 0 ? "----" : "+ "+row.deaths}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => {this.handleEditCityById(row.details_id)}}>
                                                    <BorderColorIcon/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                )
                            }
                            <TablePagination
                                count={this.state.countCity}
                                page={this.state.pageCity-1}
                                onChangePage={this.state.isSearchingCity ?
                                    this.handleChangePageCitySearch : this.handleChangePageCity}
                                // onPageChange={}
                                rowsPerPage={this.state.rowsPerPageCity}
                                onChangeRowsPerPage={this.state.isSearchingCity ?
                                    this.handleChangeRowsPerPageCitySearch : this.handleChangeRowsPerPageCity}
                                rowsPerPageOptions={[5, 10, 20]}
                            >
                            </TablePagination>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        reloadCity: state.reloadCity
    };
}

const mapDispatchToProps = dispatch => {
    return{
        passCityId: (cityId) => dispatch(passCityId(cityId))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(AdminDetails)