import React, { useRef, useState } from 'react';
import classes from './PersonalInfo.module.css';
import { useRouter } from 'next/router';
import { User } from '@/model/User';

export default function PersonalInfo({ user }: { user: User }) {
  const [editing, setEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const nameRef = useRef<HTMLInputElement>(null);

  const handleEdit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editing) setEditing(true);
    else {
      setIsLoading(true);
      const res = await fetch('/api/user/update-user-info', {
        method: 'PATCH',
        body: JSON.stringify({
          name: (nameRef.current as HTMLInputElement).value,
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
      setIsLoading(false);
      if (!res.ok) setError((await res.json()).message);
      else router.push('');
    }
  };
  const handleCancel = () => {
    (nameRef.current as HTMLInputElement).value = user.name;
    setEditing(false);
  };

  return (
    <form onSubmit={handleEdit}>
      <h3>Personal Information</h3>
      <div className={classes.field}>
        <label>Name</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={user.name}
          disabled={!editing}
          ref={nameRef}
        />
      </div>
      <div className={classes.field}>
        <label>Email</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={user.email}
          disabled
        />
      </div>
      <div className={classes.btn}>
        <button disabled={isLoading}>
          {!editing ? 'Edit' : isLoading ? 'Saving...' : 'Save'}
        </button>
        {editing && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
