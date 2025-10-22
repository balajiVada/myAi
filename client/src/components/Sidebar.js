import React from 'react';
import { BsChatDots, BsPlusLg, BsTrash, BsGear, BsBoxArrowRight } from 'react-icons/bs';
import { FiUser } from 'react-icons/fi';

const dummyHistory = [
    "A brief history of React Hooks",
    "Code for Tailwind dark mode setup",
    "Explain the concept of closure",
    "Tailwind CSS Grid vs Flexbox tutorial",
    "My chat from yesterday",
    "Another old conversation here",
];

const Sidebar = () => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gpt-dark p-2 fixed left-0 top-0">
      
      {/* New Chat Button */}
      <button className="flex items-center justify-start p-3 mb-4 rounded-lg border border-gray-700 hover:bg-gpt-light text-white transition-colors">
        <BsPlusLg className="w-4 h-4 mr-3" />
        New chat
      </button>
      
      {/* Conversation History */}
      <div className="flex-grow overflow-y-auto chat-scrollbar pb-2">
        {dummyHistory.map((title, index) => (
          <div 
            key={index} 
            className="flex items-center p-3 mb-2 rounded-lg text-sm text-gray-300 hover:bg-gpt-light cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis"
          >
            <BsChatDots className="w-4 h-4 mr-3" />
            {title}
          </div>
        ))}
      </div>

      {/* User Options */}
      <div className="pt-4 border-t border-gray-700">
        <Option icon={<BsTrash />} label="Clear conversations" />
        <Option icon={<FiUser />} label="My profile" />
        <Option icon={<BsGear />} label="Settings" />
        <Option icon={<BsBoxArrowRight />} label="Log out" />
      </div>

    </div>
  );
};

// Helper component for options list
const Option = ({ icon, label }) => (
    <div className="flex items-center p-3 mb-1 rounded-lg text-sm text-white hover:bg-gpt-light cursor-pointer transition-colors">
        <div className="w-5 h-5 mr-3">{icon}</div>
        {label}
    </div>
);

export default Sidebar;