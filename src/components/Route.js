import React from 'react';

const Route = ({path, component }) => {
  const pathname = window.location.pathname;
  if (pathname.match(path)) {
    return (
      component
    );
  } else {
    return null;
  }
}

export default Route;