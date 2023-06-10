import React from "react";
import propTypes from "prop-types";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function Pagination({ getElements, max }) {
  const [active, setActive] = React.useState(1);

  const next = () => {
    if (active === max) return;
    setActive(active + 1);
    getElements(active + 1);
  };

  const prev = () => {
    if (active === 1) return;
    setActive(active - 1);
    getElements(active - 1);
  };

  return (
    <div className="flex items-center gap-8 mt-8">
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={prev}
        disabled={active === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Trang <strong className="text-blue-gray-900">{active}</strong> /{" "}
        <strong className="text-blue-gray-900">{max}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        color="blue-gray"
        onClick={next}
        disabled={active === max}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}

Pagination.propTypes = {
  getElements: propTypes.func,
  max: propTypes.number,
};

export default Pagination;
