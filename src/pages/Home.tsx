import React, { useState, useEffect } from 'react';
import Filter from '../components/filters/Filters';
import { connect } from 'react-redux';
import SpaceListing from '../components/gridboxes/SpaceListing';
import { handleFilter } from '../actions/filterActions';
import constants from '../constants/Legends';
import { useHistory, useLocation } from 'react-router-dom';
import './Home.css';

const queryString = require('query-string');
const axios = require('axios');

const mapStateToProps = (state: any) => {
    return {
        SpaceData: state.spaceListingReducers
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        handleFilter: (data: any) => dispatch(handleFilter(data)),
    }
}

const Home: React.FC<any> = (props: any) => {
    const history = useHistory();
    const location = useLocation();
    const queries = queryString.parse(location.search);

    const [year, setYear] = useState(queries?.year);
    const [launch, setLaunch] = useState(queries?.launch);
    const [land, setLand] = useState(queries?.land);
    const [loaded, setLoaded] = useState(false);
    const [deviceHeight, setDeviceHeight] = useState(window?.innerHeight);
    const [deviceWidth, setDeviceWidth] = useState(window?.innerWidth);

    const listingContainer = ( deviceHeight >= 768 && deviceWidth <= 1024 ) ? 'col-lg-6 col-md-6 col-sm-12' : 'col-lg-3 col-md-6 col-sm-12';
    const filterContainerClass = ( deviceHeight >= 768 && deviceWidth <= 1024 ) ? 'col-lg-3 col-md-3 col-sm-12 filter-margin' : 'col-lg-2 col-md-3 col-sm-12 filter-margin';
    const listingContainerClass = ( deviceHeight >= 768 && deviceWidth <= 1024 ) ? 'col-lg-9 col-md-9 col-sm-12' : 'col-lg-10 col-md-9 col-sm-12';
    const fetchApi = (apiUrl: any) => {
        setLoaded(false);
        axios.get(apiUrl)
            .then((response: any) => {
                props.handleFilter(response.data);
                setLoaded(true);
                redirectToHome();
            })
            .catch((err: any) => {
                setLoaded(true);
                console.log('err', err)
            });
    }

    useEffect(() => {
        let apiUrl = 'https://api.spacexdata.com/v3/launches?limit=100';
        if (launch) {
            apiUrl += '&launch_success=' + launch;
        }
        if (year) {
            apiUrl += '&launch_year=' + year;
        }
        if (land) {
            apiUrl += '&land_success=' + land;
        }
        fetchApi(apiUrl);
        window.addEventListener( 'resize', handleWindowResize, { passive: true } );
        return () => {
            window.removeEventListener( 'resize', handleWindowResize );
          }
    }, [year, launch, land]);

    const handleWindowResize = () => {
        setDeviceHeight(window?.innerHeight);
        setDeviceWidth(window?.innerWidth);
    }

    const updateFilters = (filterValue?: any, title?: string) => {
        if (title === constants.LAUNCH_YEAR) {
            setYear(filterValue);
        }
        if (title === constants.SUCCESSFUL_LAUNCH) {
            setLaunch(filterValue);
        }
        if (title === constants.SUCCESSFUL_LANDING) {
            setLand(filterValue);
        }
    }

    const redirectToHome = () => {
        const launchVal = launch !== undefined ? `&launch=${launch}` : '';
        const landVal = land !== undefined ? `&land=${land}` : '';
        const yearVal = year !== undefined ? `&year=${year}` : '';
        history.push(`/home?${yearVal}${launchVal}${landVal}`);
    }
    return (
        <div className={'home-container'}>
            <header>
                <h2 className={'header ml-3'}>SpaceX Launch Programs</h2>
            </header>
            <div className={'row m-0'}>
                <div className={filterContainerClass}>
                    <Filter updateFilters={updateFilters} selectedYear ={year} selectedLaunch={launch} selectedLand={land}/>
                </div>
                <div className={listingContainerClass}>
                    <SpaceListing spaceListingData={props.SpaceData} loaded={loaded} widgetContainerClass = {listingContainer}/>
                </div>
            </div>
            <footer>
                <p>Developed by: Shweta Sharma</p>
            </footer>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
