import React from 'react';
import UserTable from './user/UserTable';
import UserUpdateForm from './user/UserUpdateForm';


export default function DashUser({ user }) {

  return (
    <section className="user-section">
      <UserUpdateForm user={user} />

      {
        user?.role === 'admin' && <UserTable user={user} />
      }
    </section>
  )
}
