import { RouteProps, Route } from "react-router-dom";
import React from "react";
import { PageHeader } from "antd";

interface Props extends RouteProps {
  title: React.ReactNode;
}

const LayoutRoute: React.FC<Props> = ({title, component, ...rest}) => {
  const Component = component as React.ReactType;

  return (
    <>
      <Route render={() => (
        <>
          <PageHeader title={title}/>
          <Component/>
        </>
      )} {...rest}/>
    </>
  );
}

export default LayoutRoute;