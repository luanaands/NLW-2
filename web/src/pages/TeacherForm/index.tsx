import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PagesHeader';
import { useHistory } from 'react-router-dom';

import './styles.css';
import Input from '../../components/InputHeader';
import Select from '../../components/Select';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import api from '../../services/api';

function TeacherForm() {

    const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whats, setWhats] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    const [scheduleItens, setschedule] = useState(
        [{ week_day: 0, from: '', to: '' }]
    );

    function addItensSchedule() {
        setschedule([
            ...scheduleItens,
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function setscheduleItemValue(position: number, field: string, value: string) {
        const updateSchedule = scheduleItens.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });
        setschedule(updateSchedule)
    }

    function createClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp: whats,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItens
        }).then(()=> {
            alert('Cadastro');
            history.push('/');
        }).catch(() =>{
            alert('Erro no cadastro');
        })
    }




    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você
               quer dar aulas."
                description="o primeiro passo é preencher esse formulário de inscrição"
            />


            <main>
                <form onSubmit={createClass}>


                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input label="Nome Completo" name="name" type="text" value={name}
                            onChange={(e) => { setName(e.target.value) }} />
                        <Input label="Avatar" name="avatar" type="text" value={avatar}
                            onChange={(e) => { setAvatar(e.target.value) }} />
                        <Input label="Whatsapp" name="whatsapp" type="text" value={whats}
                            onChange={(e) => { setWhats(e.target.value) }} />
                        <Textarea label="Biografia" name="bio" value={bio}
                            onChange={(e) => { setBio(e.target.value) }} />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

                        <Select
                            label="Matéria"
                            name="subject"
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            options={[
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciência', label: 'Ciência' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Química', label: 'Química' },
                            ]}
                        />
                        <Input label="Custo da sua aula" name="cost" type="text" value={cost}
                            onChange={(e) => { setCost(e.target.value) }} />


                    </fieldset>


                    <fieldset>
                        <legend>Horários disponíveis
                        <button type="button" onClick={addItensSchedule}>
                                + Novo horário
                        </button>
                        </legend>
                        {scheduleItens.map((schedule, index) => {
                            return (
                                <div key={schedule.week_day} className="schedule-item">
                                    <Select
                                        label="Dia da Semana"
                                        name="week_day"
                                        value={schedule.week_day}
                                        onChange={e => setscheduleItemValue(index, 'week_day', e.target.value)}
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
                                    <Input label="Das" name="from" type="time"
                                     value={schedule.from}
                                        onChange={(e) => { setscheduleItemValue(index, 'from', e.target.value) }} />
                                    <Input label="Até" name="to" type="time"
                                     value={schedule.to}
                                        onChange={(e) => { setscheduleItemValue(index, 'to', e.target.value) }} />
                                </div>
                            );
                        })
                        }

                    </fieldset>
             
                <footer>
                    <p>
                        <img src={warningIcon} alt="aviso importante" />
                       Importante! <br />
                       Preencha todos os dados
                   </p>
                    <button type="submit">
                        Salvar cadastro
                   </button>
                </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;