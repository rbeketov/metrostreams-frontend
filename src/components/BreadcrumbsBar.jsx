// BreadcrumbsBar.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BreadcrumbsBar = () => {
  const breadcrumbs = useSelector((state) => state.breadcrumbs.crumbs);
  const [validBreadcrumbs, setValidBreadcrumbs] = useState([]);

  useEffect(() => {
    const filteredBreadcrumbs = breadcrumbs.filter((crumb) => crumb.title && crumb.url);
    setValidBreadcrumbs(filteredBreadcrumbs);
  }, [breadcrumbs]);

  return (
    <div>
      {validBreadcrumbs.map((crumb, index) => (
        <span key={index}>
          <Link to={crumb.url}>{crumb.title}</Link>
          {index < validBreadcrumbs.length - 1 && <span> &gt; </span>}
        </span>
      ))}
    </div>
  );
};

export default BreadcrumbsBar;
