import DashboardHeading from "module/dashboard/DashboardHeading";
import React, { useEffect, useState } from "react";
import UserTable from "./UserTable";
import { Button } from "components/button";
import { debounce } from "lodash";
import { collection, getDocs, limit, onSnapshot, query, where } from "firebase/firestore";
import { db } from "firebase-app/firebase-config";

const UserManage = () => {
  const [filter, setFilter] = useState()
  const [userList, setUserList] = useState([]);
  const [total, setTotal] = useState(0);
  const [lastDoc, setLastDoc] = useState();

  const CATEGORY_PER_PAGE = 10;
  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "users");
      
      const newRef = filter
        ? query(
            colRef,
            where("username", ">=", filter),
            where("username", "<=", filter + "utf8")
          )
        : query(colRef, limit(CATEGORY_PER_PAGE));
      console.log(newRef);
      
      const documentSnapshots = await getDocs(newRef);
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];

      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });

      onSnapshot(newRef, (snapshot) => {
        console.log(snapshot);
        
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserList(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);
  const handleInputFilter = debounce((e) => {
    setFilter(e.target.value);
    console.log(filter);
    
  }, 500);
  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      >
        <Button kind="ghost" height="60px" to="/manage/add-user">
          Create User
        </Button>
      </DashboardHeading>
      <div className="flex justify-end mb-10">
        <input
          type="text"
          placeholder="Search category..."
          className="px-5 py-4 border border-gray-300 rounded-lg outline-none"
          onChange={handleInputFilter}
        />
      </div>
      <UserTable></UserTable>
    </div>
  );
};

export default UserManage;