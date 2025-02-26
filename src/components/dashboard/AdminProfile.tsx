import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Image from "next/image";

const AdminProfile = () => {
  const [data, setData] = useState({ name: "", email: "" });

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => setData(json.adminProfile));
  }, []);

  return (
    <Card className="p-4 flex items-center justify-between">
      <div>
        <p className="text-[36px] font-bold">Admin Profile</p>
        <div className="flex items-center gap-4">
          <Image
            src="/admin.jpg"
            width={66.5}
            height={66.5}
            alt="Admin Avatar"
            className="rounded-full"
          />
          <div>
            <h3 className="text-[26px] font-semibold">{data.name}</h3>
            <p className="text-[20px] text-gray-500">{data.email}</p>
          </div>
        </div>
      </div>
      <button className="bg-sky-400 text-[16px] text-white px-6 py-3 rounded">
        View Profile
      </button>
      <img src="/images/admin+icn 1.svg"></img>
    </Card>
  );
};

export default AdminProfile;
