import { Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowReturnLeft, BsCheck, BsX } from 'react-icons/bs';
  
import { Alert, Button, FormSelect, Spinner, TimeInput } from '../../Components';
import { Enrollments, Courses, Students } from '../../Models';
import { classDaysCheckBoxes, getCheckedDays, hoursToMinutes, validateForm } from '../../utils';

const { 
    validateStudentId,
    validateCourseId,
    validateClassDays,
    validateClassTimes,
    validateClassDuration,
    validateEnviroment
} = validateForm;

export default function NewEnrollmentForm() {
    const navigate = useNavigate();
    const [ showSpinner, setShowSpinner ] = useState(false);
    const [ alert, setAlert ] = useState({ show: false });
    const [ students, setStudents ] = useState([]);
    const [ courses, setCourses ] = useState([]);
    const [ studentId, setStudentId ] = useState(0);
    const [ courseId, setCourseId ] = useState(0);
    const [ classTimes, setClassTimes ] = useState(['']);
    const [ classDuration, setClassDuration ] = useState(['']);
    const [ classDays, setClassDays ] = useState(classDaysCheckBoxes);
    const [ isOnline, setIsOnline ] = useState(-1);

    async function loadAllStudents() {
        /**
         * Reads all students registered
         * in the Database.
         */
        const response = await Students.getAll();
        setStudents(response.data);
    }

    async function loadAllCourses() {
        /**
         * Reads all courses registered
         * in the Database.
         */
        const response = await Courses.getAll();
        setCourses(response.data);
    }

    function handleClassTimeChange(time, index, remove=false) {
        const tmp = classTimes.map(t => t)
        if (remove) { tmp.pop() } 
        else { tmp[index] = time }
        
        setClassTimes(tmp)
    }
    
    function handleClassDurationChange(time, index, remove=false) {
        const tmp = classDuration.map(t => t)
        if (remove) { tmp.pop() } 
        else { tmp[index] = time }
        setClassDuration(tmp)
    }

    function addClasstimeAndDurationInputs() {
        /**
         * Aumenta a quantidade de vezes que os
         * inputs de classTime e duration serão
         * repetidos. Insere uma nova string vazia 
         * na última posição de ambos os arrays.
         * Ambos os arrays sempre possuirão o mesmo
         * tamanho.
         */
        const newIndex = classTimes.length;
        // setNumberOfClassTimeAndDurationInputs(previous => previous+1);
        handleClassTimeChange('', newIndex);
        handleClassDurationChange('', newIndex);
    }
    
    function removeClasstimeAndDurationInputs() {
        /**
         * Diminui a quantidade de vezes que os
         * inputs de classTime e duration serão
         * repetidos. Remove o valor da última
         * posição de ambos os arrays.
         * Ambos os arrays sempre possuirão o mesmo
         * tamanho.
         */
        // setNumberOfClassTimeAndDurationInputs(previous => previous-1);
        handleClassTimeChange('', '', true);
        handleClassDurationChange('', '', true);
    }

    function handleClassDayCheck(e) {
        /**
         * Handle the value change on the selecting
         * of the checkboxes.
         * 
         * Since HTMl does not accept and element id 
         * to be equal 0, it is necessary to add 1. 
         * Hence the subtraction by 1 on the *boxId* variable. 
         */
        const tmp = classDays.map(d=>d);
        const boxId = e.target.id - 1;
        tmp[boxId].checked = !tmp[boxId].checked;
        setClassDays(tmp);
    }

    async function submit() {
        /**
         * Handle the form data submition.
         * Showing alerts in cases of successes
         * and (potential) failures.
         */
        const checkedClassDays = getCheckedDays(classDays);
        const classTimesInMinutes = classTimes.map(time => hoursToMinutes(time.split(':')));
        let alert = { show: true };
        setShowSpinner(true);

        try {
            validateStudentId(studentId);
            validateCourseId(courseId);
            validateClassTimes(classTimesInMinutes);
            validateClassDuration(classDuration);
            validateEnviroment(isOnline);
            validateClassDays(checkedClassDays);
            
            if(!showSpinner) {
                await Enrollments.create({
                    studentId: studentId,
                    courseId: courseId,
                    classDays: checkedClassDays.join(','),
                    classTime: classTimesInMinutes.join(','),
                    isOnline: isOnline,
                    duration: classDuration.join(',')
                });
                navigate('/matriculas', { replace: true, state: { created: true } });
            }
        } catch (error) {
            if(error.response){
                alert.variant = error.response.status === 400 ? 'warning' : 'danger';
                alert.message = error.response.status === 400 ? 'Esta matrícula já existe.' : 'Um erro ocorreu durante a operação.';
            }
            else {
                alert.variant = 'danger';
                alert.message = error.message;
            }
        }
        finally {
            setShowSpinner(false);
            setAlert(alert);
        }
    }

    useEffect(() => {
        loadAllStudents();
        loadAllCourses();
    }, [])

    return (
        <>
            <h1>Cadastro de Matrícula</h1>
            <Button
                    label='Voltar para as Matrículas'
                    variant='info'
                    Icon={ <BsArrowReturnLeft size={ 23 }/> }
                    onClickFn={ () => navigate('/matriculas') }
            />
            <Form onSubmit={ submit }>
                { !alert ? null : <Alert alert={ alert } setAlert={ setAlert } /> }

                <Form.Group as="section"  className='row mb-3'>
                    <div className='col-12 col-md-6'>
                        <FormSelect
                            label="Alunos"
                            defaultOptionText="Escolha um aluno"
                            data={ students }
                            onChangeFn={ (e) => setStudentId(parseInt(e.target.value)) }
                        />
                    </div>
                    
                    <div className='col-12 col-md-6'>
                        <FormSelect
                            label="Cursos"
                            defaultOptionText="Escolha um curso"
                            data={ courses }
                            onChangeFn={ (e) => setCourseId(parseInt(e.target.value)) }
                        />
                    </div>
                </Form.Group>
                
                <Form.Group as="section"  className='row mb-3'>
                    {
                        classTimes.map((n, index) => (        
                            <div key={ index } className='col-12 mb-3'>
                                <div className='row'>
                                    <div className="col-12 col-md-6">
                                        <TimeInput
                                            label={ `Horário${classTimes.length > 1 ? ' '+(index+1) : ''}` }
                                            onChangeFn={(e) => handleClassTimeChange(e.target.value, index)}
                                            value={ classTimes[index] || '' }
                                        />
                                    </div>

                                    <div className='col-12 col-md-6'>
                                        <FormSelect
                                            label='Duração'
                                            defaultOptionText="Escolha a duração da aula"
                                            data={[{ id: 60, name: '01 hr' }, { id: 120, name: '02 hrs' } ]}
                                            onChangeFn={ (e) => handleClassDurationChange(e.target.value, index) }
                                        />
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                    <div className='col-12 d-flex justify-content-end gap-2'>
                        <Button
                            label="Adicionar horário"
                            onClickFn={ () => addClasstimeAndDurationInputs() }
                        />
                        {
                            classTimes.length > 1 ?
                            <Button
                                label="Remover horário"
                                variant='danger'
                                onClickFn={ () => removeClasstimeAndDurationInputs()}
                            />
                            : null
                        }
                    </div>
                </Form.Group>

                <Form.Group as="section"  className='row mb-3'>
                    <article className="col-12">
                        <Form.Label>Ambiente</Form.Label>
                        <FormSelect
                            defaultOptionText="Escolha o ambiente"
                            data={[
                                {
                                    id: 0,
                                    name: 'Presencial',
                                },
                                {
                                    id: 1,
                                    name: 'Online',
                                },
                            ]}
                            onChangeFn={ (e) => setIsOnline(parseInt(e.target.value))}
                        />
                    </article>
                </Form.Group>

                <Form.Group as="section"  className='row mb-3'>
                    <article className="col-12 col-md-6">
                        <Form.Label>Dias das aulas</Form.Label>
                            <div className="d-flex flex-wrap">
                            {
                                classDays.map((day, index) => (
                                    <Form.Check
                                        key={ index }
                                        className='text-capitalize col-6'
                                        type='checkbox'
                                        checked={ day.checked }
                                        id={ index+1 }
                                        label={ day.label }
                                        onChange={ (e) => handleClassDayCheck(e) }
                                    />
                                ))
                            }
                        </div>
                    </article>
                </Form.Group>
                
                <Form.Group as="section" className='d-flex align-items-center justify-content-end gap-2'>
                    <Spinner show={ showSpinner }/>
                    <Button
                        variant='success'
                        label='Salvar'
                        Icon={ <BsCheck size={ 23 }/> }
                        onClickFn={ () => submit()}
                    />
                    <Button 
                        variant='danger'
                        label='Cancelar'
                        Icon={ <BsX size={ 23 }/> }
                        onClickFn={ () => handleCloseModal() }
                    />
                </Form.Group>
            </Form>
        </>
    );
}