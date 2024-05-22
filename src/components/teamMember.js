import React from 'react';
import './loadInfo.css';

const TeamMember = ({ team }) => {
  return (
    <div>
      {team.map((member, index) => (
        <div key={index} className="flex items-center mb-4">
          <img className="w-10 h-10 rounded-full" src={member.avatar} alt={member.name} />
          <div className="ml-4">
            <p className="regular-white">{member.name}</p>
            <p className="regular-gray">{member.jobTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamMember;