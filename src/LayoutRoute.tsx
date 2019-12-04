import { RouteProps, Route } from "react-router-dom";
import React from "react";
import { PageHeader, Layout } from "antd";

interface Props extends RouteProps {
  title: React.ReactNode;
}

const LayoutRoute: React.FC<Props> = ({title, component, ...rest}) => {
  const Component = component as React.ReactType;

  return (
    <>
      <Route render={() => (
        <Layout style={{height: '100%'}}>
          <PageHeader title={title}/>
          <Layout.Content style={{overflow: 'scroll', height: '100%'}}>
            <Component/>
          </Layout.Content>
        </Layout>
      )} {...rest}/>
    </>
  );
}

export default LayoutRoute;