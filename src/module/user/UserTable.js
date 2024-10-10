import { ActionDelete, ActionEdit } from 'components/action';
import { Table } from 'components/table';
import { db } from 'firebase-app/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
    const [userList, setUserList] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        const colRef = collection(db, "users")
        onSnapshot(colRef, snapshot => {
            let result = []
            snapshot.forEach(doc => {
                result.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setUserList(result)
        })
    }, [])
    console.log(userList);

    const renderUserItem = (user) => {
        return (
          <tr key={user.id}>
            <td title={user.id}>{user.id.slice(0, 5) + "..."}</td>
            <td className="whitespace-nowrap">
              <div className="flex items-center gap-x-3">
                <img
                  src={user?.avatar}
                  alt=""
                  className="flex-shrink-0 object-cover w-10 h-10 rounded-md"
                />
                <div className="flex-1">
                  <h3>{user?.fullname}</h3>
                  <time className="text-sm text-gray-300">
                    {new Date(user?.createdAt?.seconds * 1000).toLocaleDateString(
                      "vi-VI"
                    )}
                  </time>
                </div>
              </div>
            </td>
            <td>{user?.username}</td>
            <td>{user?.email.slice(0, 10) + "..."}</td>
            <td></td>
            <td></td>
            <td>
              <div className="flex items-center gap-x-3">
                <ActionEdit
                  onClick={() => navigate(`/manage/update-user?id=${user.id}`)}
                ></ActionEdit>
                <ActionDelete></ActionDelete>
              </div>
            </td>
          </tr>
        );
      };
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Info</th>
                        <th>Username</th>
                        <th>Email address</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0 && userList.map((user) => renderUserItem(user))}
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;