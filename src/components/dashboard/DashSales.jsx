import React from 'react';
import SalesTable from './sales/SalesTable';

export default function DashSales({ user }) {
  
  return (
    <>
      {
        user && <SalesTable user={user} />
      }
    </>
  )
}
