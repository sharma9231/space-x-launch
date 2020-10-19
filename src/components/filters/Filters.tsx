import React from 'react';
import filterConstants from '../../constants/Legends';
import './Filters.css';

export interface IFilterProps {
    updateFilters: (filterValue?: any, title?: string) => void;
}

const Filter: React.FunctionComponent<IFilterProps> = (props: IFilterProps) => {

    const defaultLaunchYear = ['2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
    const defaultSuccessfulLaunch = ['true', 'false'];
    const defaultSuccessfulLanding = ['true', 'false'];

    return (
        <div className={'filter-container'}>
            <h6 className={'filter-header'}>Filters</h6>
            <div className={'year-container'}>
                <div className={'filter-title'}>{filterConstants.LAUNCH_YEAR}</div>
                <div className={'row'}>
                    {defaultLaunchYear.map((value: string, key: number) => {
                        return (<div key={key} className={'col-6 filter-content'}>
                            <span onClick={() => props.updateFilters(value, filterConstants.LAUNCH_YEAR)} className={'filter-value'}>{value}</span></div>)
                    })}
                </div>
            </div>
            <div className={'launch-container'}>
                <div className={'filter-title'}>{filterConstants.SUCCESSFUL_LAUNCH}</div>
                <div className={'row'}>
                    {defaultSuccessfulLaunch.map((value: string, key: number) => {
                        return (<div key={key} className={'col-6 filter-content'}>
                            <span onClick={() => props.updateFilters(value, filterConstants.SUCCESSFUL_LAUNCH)} className={'filter-value'}>{value}</span></div>)
                    })}
                </div>
            </div>
            <div className={'landing-container'}>
                <div className={'filter-title'}>{filterConstants.LAUNCH_YEAR}</div>
                <div className={'row'}>
                    {defaultSuccessfulLanding.map((value: string, key: number) => {
                        return (<div key={key} className={'col-6 filter-content'} >
                            <span onClick={() => props.updateFilters(value, filterConstants.SUCCESSFUL_LANDING)} className={'filter-value'}>{value}</span></div>)
                    })}
                </div>
            </div>
        </div>
    );
}

export default Filter;