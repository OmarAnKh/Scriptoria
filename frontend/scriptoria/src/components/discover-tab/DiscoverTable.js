import React from 'react';
import './DiscoverTable.css';


const DiscoverTable = () => {

    return (
        <section className="tab-home-bar">
            <div className="nav nav-tabs nav-tabs-bar justify-content-between" id="nav-tab" role="tablist">
                <div>
                    <button className="nav-link nav-link-bar  active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">All genres</button>
                </div>
                <div className="row">
                    <div className="col-md-4 col-sm-12">
                        <button className="nav-link nav-link-bar " id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Action</button>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <button className="nav-link nav-link-bar " id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Horror</button>
                    </div>
                    <div className="col-md-4 col-sm-12">
                        <button className="nav-link nav-link-bar " id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Romance</button>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default DiscoverTable;
