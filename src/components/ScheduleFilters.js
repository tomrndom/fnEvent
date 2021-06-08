import React from "react";
import { connect } from "react-redux";

import { updateFilter } from '../actions/schedule-actions';

// these two libraries are client-side only
import Filters from "schedule-filter-widget/dist";
import "schedule-filter-widget/dist/index.css";

const ScheduleFilters = ({ className, updateFilter, marketingSettings, ...rest }) => {
  const wrapperClass = "filter-container";

  const componentProps = {
    title: "Filter by",
    filtersData: marketingSettings.filters,
    filteredData: [],
    filterCallback: () => {},
    marketingData: marketingSettings.colors,
    onRef: () => {},
    ...rest,
  };

  return (
    <div className={className || wrapperClass}>
      <Filters {...componentProps} />
    </div>
  );
};

const mapStateToProps = ({ summitState }) => ({
  marketingSettings: summitState.marketingSettings
});

export default connect(mapStateToProps, { updateFilter })(ScheduleFilters);
