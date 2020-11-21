import React, { useEffect, useState } from 'react';
import { getUser } from '../../utils/session';
import UserTable from './user/UserTable';
import UserUpdateForm from './user/UserUpdateForm';


export default function DashUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  return (
    <section className="user-section">
      <UserUpdateForm user={user} />

      {
        user?.role === 'admin' && <UserTable user={user} />
      }
    </section>
  )
}
