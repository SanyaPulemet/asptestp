import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import TextField from '../components/textField';
import CustomSelect from '../components/customSelect';
import './personalInfo.css';
import './modals.css';

const UnitInfo = ({ data, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit } = useForm({
        defaultValues: data,
      });

    const departments = [
      { value: 'Дизайн', label: 'Дизайн' },
      { value: 'Разработка', label: 'Разработка' },
      { value: 'Маркетинг', label: 'Маркетинг' }
    ];

    const levels = [
        { value: 'Junior', label: 'Junior' },
        { value: 'Mid', label: 'Mid' },
        { value: 'Senior', label: 'Senior' }
    ];

    const positions = [
        { value: 'UI/UX Designer', label: 'UI/UX Designer' },
        { value: 'Frontend Developer', label: 'Frontend Developer' },
        { value: 'Backend Developer', label: 'Backend Developer' }
    ];
    
    function close() {
      setIsOpen(false)
    }

      
    useEffect(() => {
       if (data) {
         setLoading(false);
       }
     }, [data]);
    
    const onSubmit = async (updatedData) => {
      try {
          const response = await fetch('../api/updateData', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
          });
    
        if (response.ok) {
            console.log('Данные успешно обновлены');
          } else {
            console.error('Ошибка при обновлении данных');
          }
    
        setIsOpen(false); // Закрыть модалку после сохранения данных
        onUpdate(); // Обновить отображение всех полей после изменения данных
        } catch (error) {
          console.error('Ошибка:', error);
        }
    };



    if (loading) return <div>loading</div>

    return (
        <div className="p-4">
        <div className="">
            <div className="flex flex-row justify-between items-center mb-10">
                <div className="card-name">Подразделение</div>
                <button 
                  onClick={() => setIsOpen(true)} 
                  className="change-btn"
                >
                  Изменить
                </button>
            </div>
          <div className="mt-4">
            <div className="flex flex-col md:flex-row gap-6 my-gap">
                <div className="w-full md:w-1/2">
                    <TextField label="Отдел" value={data.department} />
                </div>
                <div className="w-full md:w-1/2">
                    <TextField label="Руководитель" value={data.manager} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 my-gap">
                <div className="w-full md:w-1/2">
                    <TextField label="Уровень" value={data.level} />
                </div>
                <div className="w-full md:w-1/2">
                    <TextField label="Должность" value={data.position} />
                </div>
            </div>
          </div>
        </div>

        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} open={isOpen}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                  <DialogPanel className="w-full max-modal-w rounded-xl card-bg p-6 backdrop-blur-2xl">
                    <div className="mt-4 flex items-center justify-between">
                        <DialogTitle className="modal-label">
                            Подразделение
                        </DialogTitle>
                        <img src="exit.png" alt="Exit" className="ml-auto cursor-pointer mr-4" onClick={close} />
                    </div>
                    {/* Господь знает какой ошибкой было не вынести это в отдельные компоненты, простите*/}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <div className="flex flex-col md:flex-row gap-6 my-gap">
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Отдел</label>
                                    <div>
                                      <select
                                        {...register('department')} 
                                        defaultValue={data.department}
                                        className="appearance-none input-element w-full"
                                      >
                                        {departments.map((option, index) => (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        ))}
                                      </select>
                                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                          <img className="fill-current h-4 w-4" src="dropdown-icon.png"/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Руководитель</label>
                                    <input 
                                        {...register('manager')} 
                                        placeholder={data.manager} 
                                        defaultValue={data.manager}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 my-gap">
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Уровень</label>
                                    <div>
                                      <select
                                        {...register('level')} 
                                        defaultValue={data.level}
                                        className="appearance-none input-element w-full"
                                      >
                                        {levels.map((option, index) => (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        ))}
                                      </select>
                                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                          <img className="fill-current h-4 w-4" src="dropdown-icon.png"/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Должность</label>
                                    <div>
                                      <select
                                        {...register('position')} 
                                        defaultValue={data.position}
                                        className="appearance-none input-element w-full"
                                      >
                                        {positions.map((option, index) => (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        ))}
                                      </select>
                                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                          <img className="fill-current h-4 w-4" src="dropdown-icon.png"/>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="modal-btn py-2 px-4 rounded mt-4 w-full">
                            Сохранить
                        </button>
                    </form>
                  </DialogPanel>
              </div>
            </div>
          </Dialog>
      </div>
    );
};

export default UnitInfo;