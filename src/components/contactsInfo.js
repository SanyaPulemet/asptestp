import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import TextField from '../components/textField';
import './personalInfo.css';
import './modals.css';

const ContactsInfo = ({ data, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit } = useForm({
        defaultValues: data,
      });
    
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
                <div className="card-name">Контакты</div>
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
                    <TextField label="Номер телефона" value={data.phoneNumber} />
                </div>
                <div className="w-full md:w-1/2">
                    <TextField label="Электронная почта" value={data.email} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 my-gap">
                <div className="w-full md:w-1/2">
                    <TextField label="Telegram" value={data.telegram} />
                </div>
                <div className="w-full md:w-1/2">
                    <TextField label="Slack" value={data.slack} />
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
                            Контакты
                        </DialogTitle>
                        <img src="exit.png" alt="Exit" className="ml-auto cursor-pointer mr-4" onClick={close} />
                    </div>
                    {/* Господь знает какой ошибкой было не вынести это в отдельные компоненты, простите*/}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <div className="flex flex-col md:flex-row gap-6 my-gap">
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Номер телефона</label>
                                    <input 
                                        {...register('phoneNumber')} 
                                        placeholder={data.phoneNumber} 
                                        defaultValue={data.phoneNumber}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Электронная почта</label>
                                    <input 
                                        {...register('email')} 
                                        placeholder={data.email} 
                                        defaultValue={data.email}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 my-gap">
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Telegram</label>
                                    <input 
                                        {...register('telegram')} 
                                        placeholder={data.telegram} 
                                        defaultValue={data.telegram}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Slack</label>
                                    <input 
                                        {...register('slack')} 
                                        placeholder={data.slack} 
                                        defaultValue={data.slack}
                                        className="input-element w-full" 
                                    />
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

export default ContactsInfo;