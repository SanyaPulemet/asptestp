'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MainInfo from '../components/maininfo.js';
import TestInfo from '../components/testinfo.js';
import Image from 'next/image';
import './page.css';
import '../components/tabbuttons.js';
import TabButtons from '@/components/tabbuttons';
import LoadInfo from '@/components/loadInfo.js';

const UserProfile = () => {
    const [activeTab, setActiveTab] = useState('Основная информация');
    const [data, setData] = useState(null);
    const [time, setTime] = useState('');

    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error loading JSON:', error);
      }
    };

    useEffect(() => {
      fetchData();
    }, []);

    const fetchTime = async () => {
      try {
        var region;
        var city;
        {data ? region=data.regionEn : 'load'}
        {data ? city=data.cityEn : 'load'}
        {/* я не нашёл открытого апи для получения городов по стране, 
          поэтому время будет ломаться при смене страны и города */}
        const timeResponse = await fetch(`https://worldtimeapi.org/api/timezone/${region}/${city}`);
        const timeData = await timeResponse.json();
        setTime(new Date(timeData.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      } catch (error) {
        console.error('Error loading JSON:', error);
      }
    };
    
    useEffect(() => {
      if(data)
        {
          fetchTime();
        }
    }, [data]);
  
    return (
        <div className="col-span-7">
            <div className="container mx-auto p-0">
                <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-4 mb-12">
                    <div className="col-span-12 text-white p-6 rounded-lg mt-2.5 card-bg">
                      <div className="lg:p-10 lg:grid lg:grid-cols-[160px_1fr] lg:grid-rows-[auto_auto] lg:gap-4 
                      md:p-10 md:grid md:grid-cols-[160px_1fr] md:grid-rows-[auto_auto] md:gap-4 flex flex-col items-center">
                        <Image src="/avatar.png" alt="avatar" width={160} height={160} className="rounded-full" />
                        <p className="text-xl font-bold full-name">{data ? data.lastName : 'load'}<br /> 
                        {data ? data.firstName : 'load'} <span> </span>
                        {data ? data.middleName : 'load'}</p>
                        <div></div>
                        <div>
                              <p className='info-text'>{data ? data.level : 'load'} 
                              {data ? data.position : 'load'}</p>
                              <p className="mt-5 info-text">{data ? data.countryRu : 'load'}, <span> </span>
                              {data ? data.cityRu : 'load'} 
                              <span className="gray-info-text" style={{paddingLeft:'10px', paddingRight:'5px',}}>•</span>
                              <span className="gray-info-text"> {time}</span></p>
                        </div>
                      </div>
                      <TabButtons activeTab={activeTab} onChangeTab={setActiveTab} />
                    </div>
                    <div className="col-span-7 p-6 rounded-lg card-bg card-height">
                      {activeTab === 'Основная информация' && <MainInfo data={data} onUpdate={fetchData} />}
                      {activeTab === 'Отпуск' && <TestInfo />}
                      {activeTab === 'Оборудование' && <TestInfo />}
                    </div>
                    <div className="col-span-5 p-6 rounded-lg card-bg card-height">
                      {activeTab === 'Основная информация' && <LoadInfo data={data} />}
                      {activeTab === 'Отпуск' && <TestInfo />}
                      {activeTab === 'Оборудование' && <TestInfo />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;