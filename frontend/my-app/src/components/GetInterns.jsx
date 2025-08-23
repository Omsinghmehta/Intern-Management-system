import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "@/utils/constant";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const GetInterns = ({ token }) => {
  const [interns, setInterns] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const { data } = await axios.get(backendUrl+"/api/auth/interns", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setInterns(data);
      } catch (err) {
        console.error("Error fetching interns:", err);
      }
    };
    fetchInterns();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👩‍💻 Interns List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* {console.log(interns)} */}
        {interns.map((intern) => (
          <div
            key={intern._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{intern.name}</h3>
            <p className="text-sm text-gray-600">{intern.email}</p>
            <p className="mt-2 text-blue-600 font-medium">
              Id: {intern._id}
            </p>

            <Link to={`/chat/${intern._id}/${user.id}`} className=" text-green-700 font-bold">Chat 🔗 </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetInterns;
