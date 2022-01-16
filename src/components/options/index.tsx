import React, { ReactElement, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutSide";
import { Badge, OptionMenu, OptionsStyle } from "./style";

interface IOptionsProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactElement;
  menuCenter?: boolean;
  badge?: boolean;
  callback?: () => void;
}

function Options({
  icon,
  menuCenter = false,
  children,
  badge = false,
  callback,
  ...rest
}: IOptionsProps) {
  const [showMenu, setShowMenu] = useState(false);

  const ref = useRef(null);

  const handleClick = () => {
    callback && callback();
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
        {badge && <Badge className="position-absolute top-0 end-0 mt-1 me-1" />}
        {showMenu && (
          <OptionMenu menuCenter={menuCenter}>{children}</OptionMenu>
        )}
      </OptionsStyle>
    </>
  );
}

export default Options;
