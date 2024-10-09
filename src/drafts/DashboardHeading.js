import React from "react";

const DashboardHeading = ({ title = "", desc = "", Children }) => {
  return (
    <div className="mb-10">
      <h1 className="dashboard-heading">{title}</h1>
      <p className="dashboard-short-desc">{desc}</p>
      {Children}
    </div>
  );
};

export default DashboardHeading;