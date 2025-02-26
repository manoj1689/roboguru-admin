import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Image from "next/image";
import "../../app/globals.css";

import { MessageCircle, MessageSquare } from "lucide-react";

export type User = {
  id: number;
  name: string;
  chats: number;
  lastActivity: string;
  status: string;
  avatar: string;
};

const ChatActivityCard = () => {
  const [data, setData] = useState<{
    totalChats: number;
    activeChats: number;
    newUsers: User[];
  }>({
    totalChats: 0,
    activeChats: 0,
    newUsers: [],
  });

  useEffect(() => {
    fetch("/data/dashboardData.json")
      .then((res) => res.json())
      .then((json) => setData(json.chatActivity))
      .catch((error) => console.error("Error fetching chat activity:", error));
  }, []);

  return (
    <Card className="p-6 flex gap-6 items-center">
      {/* Left Section - Total and Active Chats */}
      <div className="w-1/3 flex flex-col gap-6 items-center border-r pr-6">
        <h3 className="text-[36px] oxygen-light">Chat Activity</h3>
        <div className="text-center flex">
          <img src="/icons/message_1.svg" />
          <div>
            <p className="text-[30px] text-gray-500 oxygen-light">
              Total Chats
            </p>
            <p className="text-[57px] oxygen-light">{data.totalChats}</p>
          </div>
        </div>
        <div className="flex text-center">
          <img src="/icons/message_2.svg" />
          <div>
            <p className="text-[30px] text-gray-500 oxygen-light">
              Active Chats
            </p>
            <p className="text-[57px] oxygen-light">{data.activeChats}</p>
          </div>
        </div>
      </div>

      {/* Right Section - User List */}
      <div className="w-2/3">
        <div className="flex justify-between">
          <h4 className="text-[24px] text-lg oxygen-regular">New Users</h4>
          <img src="/icons/group.svg" />
        </div>
        <table className="w-full border-collapse text-left mt-2">
          <thead>
            <tr>
              <th className="p-2 oxygen-light text-[16px]">#</th>
              <th className="p-2 oxygen-light text-[16px]">User</th>
              <th className="p-2 oxygen-light text-[16px]">Chats</th>
              <th className="p-2 oxygen-light text-[16px]">Last Activity</th>
              <th className="p-2 oxygen-light text-[16px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.newUsers.map((user, index) => (
              <tr key={user.id}>
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className="p-2 flex items-center gap-2">
                  <Image
                    src={user.avatar}
                    width={30}
                    height={30}
                    alt={user.name}
                  />
                  <span className="font-semibold ml-2">{user.name}</span>
                </td>
                <td className="p-2 font-bold">{user.chats}</td>
                <td className="p-2">{user.lastActivity}</td>
                <td className="p-2 text-green-500 font-medium">
                  {user.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ChatActivityCard;
