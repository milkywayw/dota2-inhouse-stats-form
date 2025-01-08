import React, { useState } from 'react';

const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {children}
      </div>
      {show && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 text-sm bg-theme-tooltip text-theme-tooltip-text rounded whitespace-nowrap z-50">
          {content}
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-theme-tooltip" />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
