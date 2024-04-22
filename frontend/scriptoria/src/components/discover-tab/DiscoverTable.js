import React from 'react';
import './DiscoverTable.css';
import { useTranslation } from 'react-i18next';

const DiscoverTable = ({ select, onSelect }) => { 
  const { t } = useTranslation();

  const handleTabClick = (tabName) => {
    onSelect(tabName); 
  };

  return (
    <section className="tab-home-bar">
      <div className="nav nav-tabs nav-tabs-bar justify-content-between" id="nav-tab" role="tablist">
        <div>
          <button
            className={`nav-link nav-link-bar ${select === 'all' ? 'active' : ''}`}
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected={select === 'all'}
            onClick={() => handleTabClick('All')}
          >
            {t("DiscoverTable.all_genres")}
          </button>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-12">
            <button
              className={`nav-link nav-link-bar ${select === 'Action' ? 'active' : ''}`}
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected={select === 'action'}
              onClick={() => handleTabClick('Action')}
            >
              {t("DiscoverTable.action")}
            </button>
          </div>
          <div className="col-md-4 col-sm-12">
            <button
              className={`nav-link nav-link-bar ${select === 'Horror' ? 'active' : ''}`}
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected={select === 'Horror'}
              onClick={() => handleTabClick('Horror')}
            >
              {t("DiscoverTable.horror")}
            </button>
          </div>
          <div className="col-md-4 col-sm-12">
            <button
              className={`nav-link nav-link-bar ${select === 'Romance' ? 'active' : ''}`}
              id="nav-contact-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-contact"
              type="button"
              role="tab"
              aria-controls="nav-contact"
              aria-selected={select === 'romance'}
              onClick={() => handleTabClick('Romance')}
            >
              {t("DiscoverTable.romance")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverTable;