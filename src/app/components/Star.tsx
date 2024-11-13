import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

import React from "react";

interface StarProps {
  selected: boolean;
  onClick: () => void;
}

const Star: React.FC<StarProps> = ({ selected, onClick }) => {
  return (
    <>
      {selected ? (
        <div className="inline-block hover:cursor-pointer">
          <FontAwesomeIcon
            icon={faStar}
            color={"gold"}
            className="w-6 h-6"
            onClick={onClick}
          />
        </div>
      ) : (
        <div className="inline-block hover:cursor-pointer">
          <FontAwesomeIcon
            icon={regularStar}
            color={"gold"}
            className="w-6 h-6"
            onClick={onClick}
          />
        </div>
      )}
    </>
  );
};

export default Star;
