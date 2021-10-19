import axios from "axios";

const CITY_URL = 'http://localhost:8888/city';
const DETAILS_URL = 'http://localhost:8888/details';

class ProjectService{
    //city
    //save city
    saveCity(detail){
        return axios.post(CITY_URL+'/save',detail);
    }
    // ---------------- detail -----------------
    //save detail
    saveDetail(detail){
        return axios.post(DETAILS_URL+'/save',detail);
    }
    //FindAll and Pagination
    pagination(page, offset){
        return axios.put(DETAILS_URL+'/pagination/'+page+'/'+offset);
    }
    //Find by id
    findById(id){
        return axios.put(DETAILS_URL+'/find/'+id);
    }
    //find city by id
    findCity(city, page, offset){
        return axios.put(DETAILS_URL+'/findCity/'+city+'/'+page+'/'+offset);
        // /findCity/28/1/10
    }
    //searching in table 2
    searchingCity(details){
        return axios.put(DETAILS_URL+'/searchingCity',details);
    }
    //searching city in table 1
    searching(id){
        return axios.put(DETAILS_URL+'/searching/'+id);
    }
    // get data from server to home page
    //--all country table
    homeTable(){
        return axios.put(DETAILS_URL+'/home')
    }
}
export default new ProjectService();
