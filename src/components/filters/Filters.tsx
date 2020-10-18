import React, {useState, useEffect} from 'react';
import filterConstants from '../../constants/Legends';
import constants from '../../constants/Legends';
import {handleFilter} from '../../actions/filterActions'; 
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import './Filters.css';
const queryString = require('query-string');

const axios = require('axios');

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleFilter : (data: any) => dispatch(handleFilter(data)),
    }
} 


const Filter : React.FunctionComponent<any>=(props: any) => {
    const history = useHistory();
// const params = new URLSearchParams()
const location = useLocation();

    const defaultLaunchYear = ['2006', '2007' , '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
    const defaultSuccessfulLaunch = ['true', 'false'];
    const defaultSuccessfulLanding = ['true', 'false'];
    const [year, setYear] = useState('');
    const [launch, setLaunch] = useState('');
    const [land, setLand] = useState('');
    const [apiUrl, setApiUrl] = useState('https://api.spacexdata.com/v3/launches?limit=10');

    const updateFilters = (filterValue?: any,  title?: string) => {
        if (title ===  constants.LAUNCH_YEAR) {
            setYear(filterValue);
        } 
         if (title ===  constants.SUCCESSFUL_LAUNCH) {
            setLaunch(filterValue);
        } 
         if (title ===  constants.SUCCESSFUL_LANDING) {
            setLand(filterValue);
        }
    }
    const handleFilterChange = () => {
        axios.get( apiUrl)
            .then( ( response: any ) => {
                props.handleFilter(response.data);
                redirectToHome();
            } )
            .catch( ( err: any ) => {
                console.log('err', err)
            } );
    }

    useEffect(()=>{
        const queries = queryString.parse(location.search);
        history.push(`/home?year=${queries.year}&launch=${queries.launch}&land=${queries.land}`);
    }, [history])
    

    const redirectToHome = () => {
        history.push(`/home?year=${year}&launch=${launch}&land=${land}`);
    }

    useEffect(()=>{
        handleFilterChange()
    }, [apiUrl])

    useEffect(()=>{
        setApiUrl(`https://api.spacexdata.com/v3/launches?limit=10&launch_success=${launch}&land_success=${land}&launch_year=${year}`);
    }, [year,launch, land])

    return (
        <div className={'filter-container'}>
        <h6 className={'filter-header'}>Filters</h6>
        <div className={'year-container'}>        
            <div className={'filter-title'}>{filterConstants.LAUNCH_YEAR}</div>
                <div className={'row'}>
                    {defaultLaunchYear.map( (value: string, key: number)=>{
                        return (<div className={'col-6 filter-content'}>
                            <span onClick={ () => updateFilters(value, filterConstants.LAUNCH_YEAR)} className={'filter-value'}>{value}</span></div>)
                    })}            
                </div> 
        </div>
        <div className={'launch-container'}>
        <div className={'filter-title'}>{filterConstants.SUCCESSFUL_LAUNCH}</div>
                <div className={'row'}>
                    {defaultSuccessfulLaunch.map( (value: string, key: number)=>{
                        return (<div className={'col-6 filter-content'}>
                            <span  onClick={ () => updateFilters(value, filterConstants.SUCCESSFUL_LAUNCH)} className={'filter-value'}>{value}</span></div>)
                    })}            
                </div> 
        </div>
        <div className={'landing-container'}>
        <div className={'filter-title'}>{filterConstants.LAUNCH_YEAR}</div>
                <div className={'row'}>
                    {defaultSuccessfulLanding.map( (value: string, key: number)=>{
                        return (<div className={'col-6 filter-content'} >
                            <span onClick={ () => updateFilters(value, filterConstants.SUCCESSFUL_LANDING)} className={'filter-value'}>{value}</span></div>)
                    })}            
                </div> 
        </div>
    </div>
    );
}
export default connect(null,mapDispatchToProps)(Filter);

// export default Filter;