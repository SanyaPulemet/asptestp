import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import './modals.css';
import './loadInfo.css';
import { faker } from '@faker-js/faker';
import TeamMember from '../components/teamMember';

const LoadInfo = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data) {
          setLoading(false);
        }
      }, [data]);

    function close() {
      setIsOpen(false)
    }

    const generateTeam = (numMembers) => {
      const team = [];
      for (let i = 0; i < numMembers; i++) {
        team.push({
          name: `${faker.name.firstName()} ${faker.name.lastName()}`,
          jobTitle: faker.name.jobTitle(),
          avatar: faker.image.avatar(),
        });
      }
      return team;
    };

    if (loading) return <div>loading</div>

    return (
        <div className="p-4">
        <div className="">
            <div className="flex flex-row justify-between items-center mb-10">
                <div className="card-name">Загрузка сотрудника</div>
                <div className="load-level">100%</div>
            </div>

            <div className='flex flex-col md:grid md:grid-cols-2 md:grid-rows-2'>
                <div className='flex flex-col mb-12'>
                    <div className='mb-4 regular-gray'>
                        Название проекта
                    </div>
                    <div className='regular-white'>
                        {data.projectName}
                    </div>
                </div>
                <div className='flex flex-col mb-12'>
                    <div className='mb-4 regular-gray'>
                        Тип проекта
                    </div>
                    <div className='regular-white'>
                        {data.projectType}
                    </div>
                </div>
                <div className='flex flex-col mb-4'>
                    <div className='mb-4 regular-gray'>
                        Ответственный
                    </div>
                    <div className='regular-white flex flex-row items-center space-x-3'>
                        <img className="w-10 h-10 rounded-full border-2 border-gray-800" src={faker.image.avatar()}/>
                        <div>
                            {data.manager}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col mb-4'>
                    <div className='mb-4 regular-gray'>
                        Команда
                    </div>
                    <div className="flex items-center space-x-3 regular-white">
                      <div className="flex -space-x-4">
                        <img className="w-10 h-10 rounded-full border-2 pic-border" src={faker.image.avatar()}/>
                        <img className="w-10 h-10 rounded-full border-2 pic-border" src={faker.image.avatar()}/>
                        <img className="w-10 h-10 rounded-full border-2 pic-border" src={faker.image.avatar()}/>
                        <img className="w-10 h-10 rounded-full border-2 pic-border" src={faker.image.avatar()}/>
                        <img className="w-10 h-10 rounded-full border-2 pic-border" src={faker.image.avatar()}/>
                        <img className="w-10 h-10 rounded-full border-2 pic-border" src={faker.image.avatar()}/>
                        <img className="w-10 h-10 rounded-full border-2 pic-border" src={faker.image.avatar()}/>
                      </div>
                      <div>+2</div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col mb-4'>
                <div className='mb-4 regular-gray'>
                    Сроки работы
                </div>
                <div className='regular-dates flex flex-row'>
                    <div>{data.leftTerm}</div>
                    <img src="arrow-right.png" alt="arrow" className="mr-4 ml-4"/>
                    <div>{data.rightTerm}</div>
                </div>
            </div>

            <button className="load-btn py-2 px-4 rounded mt-4 w-full" onClick={() => setIsOpen(true)}>
                Посмотреть всю загрузку
            </button>
        </div>

        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} open={isOpen}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                  <DialogPanel className="w-full team-modal-w rounded-xl card-bg p-6 backdrop-blur-2xl">
                    <div className="mt-4 flex items-center justify-between">
                        <DialogTitle className="modal-label">
                            Команда
                        </DialogTitle>
                        <img src="exit.png" alt="Exit" className="ml-auto cursor-pointer mr-4" onClick={close} />
                    </div>
                    <div className="mt-6">
                        <TeamMember team={generateTeam(10)} />
                    </div>
                  </DialogPanel>
              </div>
            </div>
          </Dialog>
      </div>
    );
};

export default LoadInfo;