import React, { ReactElement, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutSide";
import { OptionMenu, StyledOptions } from "./styled/OptionStyle";

interface IOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactElement;
  menuCenter?: boolean;
}

function Options({
  icon,
  menuCenter = false,
  children,
  ...rest
}: IOptionsProps) {
  const [showMenu, setShowMenu] = useState(false);

  const ref = useRef(null);

  const handleClick = () => {
    setShowMenu(!showMenu);
  };

  useOnClickOutside(ref, () => setShowMenu(false));

  return (
    <>
      <StyledOptions
        isActive={showMenu}
        onClick={handleClick}
        ref={ref}
        {...rest}
      >
        <div className="blur-hover icon">{icon}</div>
        {showMenu && (
          <OptionMenu menuCenter={menuCenter}>{children}</OptionMenu>
        )}
      </StyledOptions>
    </>
  );
}

export default Options;
