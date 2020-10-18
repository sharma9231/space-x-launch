import React from 'react';
import './SpaceListing.css';


export interface ISpaceListingProps {
    spaceListingData?: any;
    SpaceData?: any;
}

const SpaceListing: React.FunctionComponent<ISpaceListingProps> = (props: ISpaceListingProps) => {
    const listings = props.spaceListingData;
    return (
            <div className={'row'}>
                {(listings && listings.SpaceData && listings.SpaceData.length > 0) ?
                    listings.SpaceData.map((lists: any) => {
                        return (
                            <div className={' col-md-3 col-lg-3 col-sm-12'}>
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
                                    <div>
                                        <label>Successful Launch: </label>
                                        <span className={'label-content'}>{lists?.launch_success?.toString()}</span>
                                    </div>
                                    <div>
                                        <label>Successful Landing: </label>
                                        <span className={'label-content'}>{lists?.launch_date_utc}</span>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            
                        )
                    }) : <span>No data found for the selected filter... Please refine Your results!!</span>}
            </div>
    )
}

export default SpaceListing;