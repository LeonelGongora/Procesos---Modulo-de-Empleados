import React from 'react';
import { Outlet } from 'react-router-dom';

type Props = {};

const NotificationPage = (props: Props) => {
  return (
    <div><Outlet/></div>
  );
};

export default NotificationPage;