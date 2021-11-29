import React, { ReactNode } from "react";
import { Card } from "react-bootstrap";
import Options from "../../../components/options";
import { InfoNotifyCard } from "../style";

interface IProps {
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  optionItems?: ReactNode;
}

const InfoNotify = (props: IProps) => {
  const { title, children, footer, optionItems } = props;
  return (
    <InfoNotifyCard className="w-100 notify-item">
      {optionItems && (
        <Options
          icon={<i className="bi bi-three-dots-vertical icon align-middle"></i>}
          menuCenter={true}
          className="position-absolute me-2 end-0 mt-2"
        >
          {optionItems}
        </Options>
      )}
      <Card.Body>
        <Card.Title className="fs-6 text-normal">{title}</Card.Title>
        <Card.Text>{children}</Card.Text>
        {footer}
      </Card.Body>
    </InfoNotifyCard>
  );
};

export default InfoNotify;
