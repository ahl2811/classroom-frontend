import React, { ReactElement, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutSide";
import { OptionMenu, OptionsStyle } from "./style";

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
      <OptionsStyle
        isActive={showMenu}
        onClick={handleClick}
        ref={ref}
        {...rest}
      >
        <div className="blur-hover">{icon}</div>
        {showMenu && (
          <OptionMenu menuCenter={menuCenter}>{children}</OptionMenu>
        )}
      </OptionsStyle>
    </>
  );
}

export default Options;
