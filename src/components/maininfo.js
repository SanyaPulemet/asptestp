import React from 'react';
import PersonalInfo from '../components/personalInfo.js';
import UnitInfo from '../components/unitInfo.js';
import ContactsInfo from '../components/contactsInfo.js';

const MainInfo = ({ data, onUpdate }) => {
    return (
        <div>
            <div className='mb-4'>
                <PersonalInfo data={data} onUpdate={onUpdate} />
            </div>
            <div className='mb-4'>
                <UnitInfo data={data} onUpdate={onUpdate} />
            </div>
            <div>
                <ContactsInfo data={data} onUpdate={onUpdate} />
            </div>
        </div>
    );
};

export default MainInfo;