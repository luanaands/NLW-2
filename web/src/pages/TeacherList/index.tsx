import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PagesHeader';

import './styles.css';

import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/InputHeader';
import Select from '../../components/Select';
import api from '../../services/api';



function TeacherList() {
    const [list, setList] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    async function seachTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time,
            }
        });
        console.log(response.data);
        setList(response.data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={seachTeachers}>

                    <Select
                        label="Matéria"
                        name="subject"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciência', label: 'Ciência' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Química', label: 'Química' },
                        ]}
                    />
                    <Select
                        label="Dia da Semana"
                        name="week_day"
                        value={week_day}
                        onChange={e => setWeek_day(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda' },
                            { value: '2', label: 'Terça' },
                            { value: '3', label: 'Quarta' },
                            { value: '4', label: 'Quinta' },
                            { value: '5', label: 'Sexta' },
                            { value: '6', label: 'Sábado' },
                        ]}
                    />
                    <Input label="Horas" name="time" type="time"   value={time}
                        onChange={e => setTime(e.target.value)}/>
                        <button type="submit" >
                            Buscar
                        </button>

                </form>
            </PageHeader>

            <main>
            { list.map((teacher: Teacher) => { 
              return <TeacherItem key={teacher.id} teacher={teacher}  />
            })
            }
            </main>
        </div>
    );
}

export default TeacherList;