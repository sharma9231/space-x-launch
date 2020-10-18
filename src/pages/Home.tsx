import * as React from 'react';
import Filter from '../components/filters/Filters';
import { connect } from 'react-redux';
import SpaceListing from '../components/gridboxes/SpaceListing';

// import * as Styles from './Home.css';
// const Styles = require('./Home.css');
import './Home.css';

const mapStateToProps = (state: any) => {
    return {
        SpaceData : state.spaceListingReducers
    }
}

const Home: any = (props: any) => {
    return (
       <div className = {'home-container'}>
           <header>
              <h2 className={'header ml-3'}>SpaceX Launch Programs</h2>
            </header>
           <div className={'row m-0'}>
                <div className={'col-lg-2 col-md-2 col-sm-12 filter-margin'}>
                    <Filter/>
                </div>
                <div className={'col-lg-10 col-md-10 col-sm-12'}>
                    <SpaceListing spaceListingData={props.SpaceData}/>
                </div>
           </div>
           <footer>
                <p>Developed by: Shweta Sharma</p>
            </footer>
       </div>
    )
};

export default connect(mapStateToProps, null)(Home);