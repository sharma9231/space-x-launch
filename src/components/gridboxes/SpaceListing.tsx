import React from 'react';
import LoadSpinner from '../spinner/LoadSpinner'
import './SpaceListing.css';


export interface ISpaceListingProps {
    spaceListingData?: any;
    SpaceData?: any;
    loaded?: boolean;
    widgetContainerClass?: string;
}

const SpaceListing: React.FunctionComponent<ISpaceListingProps> = (props: ISpaceListingProps) => {
    const listings = props.spaceListingData;
    return (
        <div className={'row'}>
            {!props.loaded ? <div className={window.innerWidth < 420 ? '' : 'spinner'}><LoadSpinner /></div> :
                (listings && listings.SpaceData && listings.SpaceData.length > 0) ?
                    (listings.SpaceData.map((lists: any, key: number) => {
                        return (
                            <div key={key} className={props.widgetContainerClass}>
                                <div className={'listing-container'}>
                                    <div className={'img-container'}>
                                        <img className={'img-box'} src={lists?.links?.mission_patch_small} alt={''} />
                                    </div>
                                    <span className={'mission-title'}>{lists?.mission_name} #{lists?.flight_number}</span>
                                    <div className={'details-container'}>
                                        {lists && lists.mission_id && lists.mission_id.length > 0 ?
                                            <div><label className={'m-0'}>Mission Ids:</label>
                                                <ul className={'m-0'}>
                                                    <li className={'mission-id'}>{lists?.mission_id?.[0]}</li>
                                                </ul></div> : ''}
                                        <div className={'details-content'}>
                                            <label>Launch Year: </label>
                                            <p className={'label-content'}>{lists?.launch_year?.toString()}</p>
                                        </div>
                                        <div className={'details-content'}>
                                            <label>Successful Launch: </label>
                                            <p className={'label-content'}>{lists?.launch_success?.toString()}</p>
                                        </div>
                                        <div className={'details-content'}>
                                            <label>Successful Landing: </label>
                                            <p className={'label-content'}>{lists?.rocket?.first_stage?.cores?.[0]?.land_success?.toString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })) : (<p>No data found for the selected filter... Please refine Your results!!</p>)}
        </div>
    )
}

export default SpaceListing;