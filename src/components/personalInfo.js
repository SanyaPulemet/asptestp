import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import TextField from '../components/textField';
import './personalInfo.css';
import './modals.css';

const PersonalInfo = ({ data, onUpdate }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const { register, handleSubmit, setValue } = useForm({
      defaultValues: data,
    });
    
      function close() {
        setIsOpen(false)
      }

      
     useEffect(() => {
        if (data) {
          setLoading(false);
          const loadCountries = async () => {
            const countryList = await fetchCountries();
            setCountries(countryList);
          };
          loadCountries();
        }
      }, [data]);

      const fetchCountries = async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          const countries = await response.json();
          return countries.map(country => ({
            value: country.translations.rus.common,
            label: `${country.translations.rus.common}`,
            countryRu: country.translations.rus.common,
            countryEn: country.name.common,
          }));
        } catch (error) {
          console.error('Ошибка при загрузке стран:', error);
          return [];
        }
      };

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

    const handleCountryChange = (event) => {
        const selectedCountry = countries.find(country => country.value === event.target.value);
        if (selectedCountry) {
          setValue('countryRu', selectedCountry.countryRu);
          setValue('countryEn', selectedCountry.countryEn);
        }
      };

    if (loading) return <div>loading</div>

    return (
        <div className="p-4">
        <div className="">
            <div className="flex flex-row justify-between items-center mb-10">
                <div className="card-name">Персональная информация</div>
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
                    <TextField label="Имя" value={data.firstName} />
                </div>
                <div className="w-full md:w-1/2">
                    <TextField label="Фамилия" value={data.lastName} />
                </div>
            </div>
            <TextField label="Отчество" value={data.middleName} />
            <div className="flex flex-col md:flex-row gap-6 my-gap">
                <div className="w-full md:w-1/2">
                    <TextField label="Дата рождения" value={data.birthDate} />
                </div>
                <div className="w-full md:w-1/2">
                    <TextField label="Дата трудоустройства" value={data.employmentDate} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 my-gap">
                <div className="w-full md:w-1/2">
                    <TextField label="Страна" value={data.countryRu} />
                </div>
                <div className="w-full md:w-1/2">
                    <TextField label="Город" value={data.cityRu} />
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 my-gap">
                <div className="w-full md:w-1/2">
                    <TextField label="Зарплата" value={data.salary} />
                </div>
                <div className="w-full md:w-1/2">
                    <TextField label="Еженедельная зарплата" value={data.weeklySalary} />
                </div>
            </div>
            <TextField label="Номер счета" value={data.accountNumber} />
          </div>
        </div>

        <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close} open={isOpen}>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                  <DialogPanel className="w-full max-modal-w rounded-xl card-bg p-6 backdrop-blur-2xl">
                    <div className="mt-4 flex items-center justify-between">
                        <DialogTitle className="modal-label">
                            Персональная информация
                        </DialogTitle>
                        <img src="exit.png" alt="Exit" className="ml-auto cursor-pointer mr-4" onClick={close} />
                    </div>
                    {/* Господь знает какой ошибкой было не вынести это в отдельные компоненты, простите*/}
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                        <div className="flex flex-col md:flex-row gap-6 my-gap">
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Имя</label>
                                    <input 
                                        {...register('firstName')} 
                                        placeholder={data.firstName} 
                                        defaultValue={data.firstName}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Фамилия</label>
                                    <input 
                                        {...register('lastName')} 
                                        placeholder={data.lastName} 
                                        defaultValue={data.lastName}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="input-container">
                            <label className="input-label">Отчество</label>
                            <input 
                                {...register('middleName')} 
                                placeholder={data.middleName} 
                                defaultValue={data.middleName}
                                className="input-element w-full" 
                            />
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 my-gap">
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Дата рождения</label>
                                    <input 
                                        {...register('birthDate')} 
                                        placeholder={data.birthDate} 
                                        defaultValue={data.birthDate}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Дата трудоустройства</label>
                                    <input 
                                        {...register('employmentDate')} 
                                        placeholder={data.employmentDate} 
                                        defaultValue={data.employmentDate}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 my-gap">
                            <div className="w-full md:w-1/2">
                            <div className="input-container">
                              <label className="input-label">Страна</label>
                              <select onChange={handleCountryChange} 
                              className="input-element w-full"
                              defaultValue={data.countryRu}>
                                {countries.map(country => (
                                  <option key={country.value} value={country.value}>
                                    {country.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Город</label>
                                    <input 
                                        {...register('cityRu')} 
                                        placeholder={data.cityRu} 
                                        defaultValue={data.cityRu}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6 my-gap">
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Зарплата</label>
                                    <input 
                                        {...register('salary')} 
                                        placeholder={data.salary} 
                                        defaultValue={data.salary}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2">
                                <div className="input-container">
                                    <label className="input-label">Еженедельная зарплата</label>
                                    <input 
                                        {...register('weeklySalary')} 
                                        placeholder={data.weeklySalary} 
                                        defaultValue={data.weeklySalary}
                                        className="input-element w-full" 
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="input-container">
                            <label className="input-label">Номер счета</label>
                            <input 
                                {...register('accountNumber')} 
                                placeholder={data.accountNumber} 
                                defaultValue={data.accountNumber}
                                className="input-element w-full" 
                            />
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

export default PersonalInfo;