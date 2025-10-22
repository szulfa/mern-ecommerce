import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, sellerOnly=false }) {
  const user = JSON.parse(localStorage.getItem('user'));

  if(!user) return <Navigate to="/login" />;
  if(sellerOnly && user.role!=='seller') return <Navigate to="/" />;
  return children;
}
