import React from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell
} from "@material-ui/core";
import CountUp from "react-countup";
import {useState, useEffect} from "react";
import ProjectService from "../../../Service/ProjectService";
import {Chart, BarElement, BarController} from "chart.js";
import $ from 'jquery';
import {Bar, Line} from "react-chartjs-2";

const Infected = (props) => {
    const [total, setTotal] = useState({})
    const [detail, setDetail] = useState([])
    const [country, setCountry] = useState([])
    const [countryDate, setCountryDate] = useState([])
    const [countryInfected, setCountryInfected] = useState([])
    const [countryRecovered, setCountryRecovered] = useState([])
    const [treatment, setTreatment] = useState([])
    const [countryDeaths, setCountryDeaths] = useState([])
    const [hcmDate, setHcmDate] = useState([])
    const [hcmInfected, setHcmInfected] = useState([])
    const [hcmRecovered, setHcmRecovered] = useState([])
    const [hcmDeaths, setHcmDeaths] = useState([])
    const [hnDate, setHnDate] = useState([])
    const [hnInfected, setHnInfected] = useState([])
    const [hnRecovered, setHnRecovered] = useState([])
    const [hnDeaths, setHnDeaths] = useState([])
    const [show, setShow] = useState(true)

    //chart
    const fetching = async() => {
        await ProjectService.homeTable().then(res=>{
            let data = res.data;
            setTotal(data.total);
            setCountry(data.allCountry);
            //data of all country
            //--date
            const date = [];
            data.allCountry.forEach(row=>{
                let dd = row.date.split('-');

                date.push(dd[2]+'/'+dd[1])
            });
            setCountryDate(date);
            //--infected
            const infected = [];
            data.allCountry.forEach(row=>{
                infected.push(row.infected)
            });
            setCountryInfected(infected);
            //--recovered
            const recovered = [];
            data.allCountry.forEach(row=>{
                recovered.push(row.recovered)
            });
            setCountryRecovered(recovered);
            //--treatment
            const treatment = [];
            data.allCountry.forEach(row=>{
                treatment.push(row.infected-row.deaths-row.recovered);
            });
            setTreatment(treatment);
            //--deaths
            const deaths = [];
            data.allCountry.forEach(row=>{
                return deaths.push(row.deaths)
            });
            setCountryDeaths(deaths);
            //data of HCM city
            //--date
            const hcmDate = [];
            data.detailHCM.forEach(row=>{
                let dd = row.date.split('-');

                hcmDate.push(dd[2]+'/'+dd[1]);
            });
            setHcmDate(hcmDate);
            //--infected
            const hcmInfected = [];
            data.detailHCM.forEach(row=>{
                hcmInfected.push(row.infected)
            });
            setHcmInfected(hcmInfected);
            //-recovered
            const  hcmRecovered = [];
            data.detailHCM.forEach(row=>{
                hcmRecovered.push(row.recovered)
            });
            setHcmRecovered(hcmRecovered);
            //--deaths
            const hcmDeaths = [];
            data.detailHCM.forEach(row=>{
                hcmDeaths.push(row.deaths)
            });
            setHcmDeaths(hcmDeaths)
            //data of HN capital
            //--date
            const hnDate = [];
            data.detailHN.forEach(row=>{
                let dd = row.date.split('-');

                hnDate.push(dd[2]+'/'+dd[1]);
            });
            setHnDate(hnDate);
            //--infected
            const hnInfected = [];
            data.detailHN.forEach(row=>{
                hnInfected.push(row.infected)
            });
            setHnInfected(hnInfected);
            //-recovered
            const  hnRecovered = [];
            data.detailHN.forEach(row=>{
                hnRecovered.push(row.recovered)
            });
            setHnRecovered(hnRecovered);
            //--deaths
            const hnDeaths = [];
            data.detailHN.forEach(row=>{
                hnDeaths.push(row.deaths)
            });
            setHnDeaths(hnDeaths)
            //loading
        })
    }

    //table
    const fetchingDate = async () => {
        await ProjectService.pagination(1,20).then(res=>{
            let data = res.data;
            setDetail(data.allCityList)
        })
    }
    const fetchingDate1 = async () => {
        await ProjectService.pagination(1,65).then(res=>{
            let data = res.data;
            setDetail(data.allCityList)
        })
    }

    useEffect(() => {
        fetching();
        fetchingDate();
    },[]);

    const city = (id) => {
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

    const barChart = (
            <Line data={{
                labels: countryDate,
                datasets: [{
                    label: 'Nhiễm bệnh',
                    backgroundColor: 'palevioletred',
                    borderColor: 'palevioletred',
                    data: countryInfected,
                    fill: false
                },{
                    label: 'Khỏi bệnh',
                    backgroundColor: 'lightGreen',
                    borderColor: 'lightGreen',
                    data: countryRecovered,
                    fill: false
                },{
                    label: 'Tử vong',
                    backgroundColor: 'darkgrey',
                    borderColor: 'darkgrey',
                    data: countryDeaths,
                    fill: false
                }]
            }}
            />
        )
    const lineChart = (
        <Line data={{
            labels: countryDate,
            datasets: [{
                label: 'Đang điều trị',
                backgroundColor: 'lightBlue',
                borderColor: 'lightBlue',
                data: treatment,
                fill: false
            }]
        }}/>
    )
    const barHCMChart = (
        <Bar data={{
            labels: hcmDate,
            datasets: [{
                label: 'Nhiễm bệnh',
                backgroundColor: 'palevioletred',
                data: hcmInfected
            },{
                label: 'Khỏi bệnh',
                backgroundColor: 'lightGreen',
                data: hcmRecovered
            },{
                label: 'Tử vong',
                backgroundColor: 'darkgrey',
                data: hcmDeaths
            }]
        }}
        />
    )
    const barHNChart = (
        <Bar data={{
            labels: hnDate,
            datasets: [{
                label: 'Nhiễm bệnh',
                backgroundColor: 'palevioletred',
                data: hnInfected
            },{
                label: 'Khỏi bệnh',
                backgroundColor: 'lightGreen',
                data: hnRecovered
            },{
                label: 'Tử vong',
                backgroundColor: 'darkgrey',
                data: hnDeaths
            }]
        }}
        />
    )
    const handleShow = async () =>{
        setShow(!show);
        if(!show){
           await fetchingDate();
        } else {
            await fetchingDate1();
        }
    }

    return (
        <div>
            <div>
                <Grid justify="center" container spacing="3">
                <Grid item component={Card} xs={12} md={2} style={{backgroundColor:"palevioletred", minWidth:"13%"}}>
                    <CardContent style={{textAlign:"center", minWidth:"10%"}}>
                        <Typography variant="h6">Tổng số ca nhiễm</Typography>
                        <Typography>
                            <CountUp start={0} end={total.total_infected} duration={2}/>
                        </Typography>
                        <Typography style={{color:"whitesmoke"}}>+ {total.new_infected}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} style={{backgroundColor:"lightGreen", minWidth:"13%"}}>
                    <CardContent style={{textAlign:"center"}}>
                        <Typography variant="h6">Khỏi bệnh</Typography>
                        <Typography>
                            <CountUp start={0} end={total.total_recovered} duration={2}/>
                        </Typography>
                        <Typography style={{color:"red"}}>+ {total.new_recovered}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} style={{backgroundColor:"lightcoral", minWidth:"13%"}}>
                    <CardContent style={{textAlign:"center"}}>
                        <Typography variant="h6">Đang điều trị</Typography>
                        <Typography>
                            <CountUp start={0} end={total.total_infected - total.total_deaths - total.total_recovered} duration={2}/>
                        </Typography>
                        <Typography style={{color:"whitesmoke"}}>{total.new_infected-total.new_recovered-total.new_deaths < 0 ?
                            '- '+ (0-(total.new_infected-total.new_recovered-total.new_deaths)) : '+ '+ (total.new_infected-total.new_recovered-total.new_deaths)}</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={2} style={{backgroundColor:"darkgrey", minWidth:"13%"}}>
                    <CardContent style={{textAlign:"center"}}>
                        <Typography variant="h6">Tử vong</Typography>
                        <Typography>
                            <CountUp start={0} end={total.total_deaths} duration={2}/>
                        </Typography>
                        <Typography style={{color:"whitesmoke"}}>+ {total.new_deaths}</Typography>
                    </CardContent>
                </Grid>
            </Grid>
            </div>
            <div className="row" style={{justifyContent:"center", marginTop:'50px'}}>
                <hr width="80%" color="blue" size='5px' align='center'/>
                <div className='col-sm-5'>
                    <div className="col-sm-12" style={{marginBottom:"20px",
                        justifyContent:"center", textAlign:"center", marginTop:"15px"}}>
                        <h5>Biểu đồ số liệu covid-19 tại Việt Nam</h5>
                    </div>
                    <div className="col-sm-12" style={{marginLeft:'5%', marginBottom:'20px'}}>
                        {barChart}
                    </div>
                </div>
                <div className='col-sm-5'>
                    <div className="col-sm-12" style={{marginBottom:"20px",
                        justifyContent:"center", textAlign:"center", marginTop:"15px"}}>
                        <h5>Số ca đang điều trị covid-19 tại Việt Nam</h5>
                    </div>
                    <div className="col-sm-12" style={{marginLeft:'5%', marginBottom:'20px'}}>
                        {lineChart}
                    </div>
                </div>
                <hr width="80%" color="blue" size='5px' align='center'/>
                <div className="col-sm-5">
                    <div className="col-sm-12" style={{marginBottom:"20px",
                        justifyContent:"center", textAlign:"center", marginTop:"15px"}}>
                        <h6>Biểu đồ số liệu covid-19 tại TP Hồ Chí Minh</h6>
                    </div>
                    <div className="col-sm-12" style={{marginLeft:'5%', marginBottom:'20px'}}>
                        {barHCMChart}
                    </div>
                </div>
                {/*<hr width="80%" color="blue" size='5px' align='center'/>*/}
                <div className="col-sm-5">
                    <div className="col-sm-12" style={{marginBottom:"20px",
                        justifyContent:"center", textAlign:"center", marginTop:"15px"}}>
                        <h6>Biểu đồ số liệu covid-19 tại Hà Nội</h6>
                    </div>
                    <div className="col-sm-12" style={{marginLeft:'5%', marginBottom:'20px'}}>
                        {barHNChart}
                    </div>
                </div>
                <hr width="80%" color="blue" size='5px' align='center'/>
            </div>
            <div className="row">
                <div style={{justifyContent:'center', textAlign:'center', marginTop:'15px', marginBottom:'20px'}} className='col-sm-12'>
                    <h4>Chi tiết tỉnh thành</h4>
                </div>
                <div className='col-sm-1'></div>
                <TableContainer style={{marginLeft:"5%", marginRight:"50px"}} className="col-sm-9">
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
                            </TableRow>
                        </TableHead>
                        {
                            detail.map(
                                row =>
                                    <TableRow style={{alignItems:"center"}}>
                                        <TableCell>{city(row.city)}</TableCell>
                                        <TableCell>{row.total_infected}</TableCell>
                                        <TableCell style={{color:"red"}}>{row.new_infected == 0 ? "----" : "+ " +row.new_infected}</TableCell>
                                        <TableCell>{row.total_recovered}</TableCell>
                                        <TableCell style={{color:"blue"}}>{row.new_recovered == 0 ? "----" : "+ " +row.new_recovered}</TableCell>
                                        <TableCell>{row.total_deaths}</TableCell>
                                        <TableCell style={{color:"red"}}>{row.new_deaths == 0 ? "----" : "+ " +row.new_deaths}</TableCell>
                                    </TableRow>
                            )
                        }
                    </Table>
                </TableContainer>
                <div className='col-sm-1'></div>
                <div className='col-sm-10' style={{justifyContent:'center', display:'flex'}}>
                    <button className='btn btn-secondary' onClick={handleShow}>{show? 'Xem thêm' : 'Thu gọn'}</button>
                </div>
            </div>
        </div>
    )
}
export default Infected