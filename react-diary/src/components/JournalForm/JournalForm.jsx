import styles from './JournalForm.module.css';
import {useContext, useEffect, useReducer, useRef} from "react";
import Button from "../Button/Button.jsx";
import cn from 'classnames';
import {formReducer, INITIAL_STATE} from "./JournalForm.state.jsx";
import Input from "../Input/Input.jsx";
import {UserContext} from "../../context/user.context.jsx";

function JournalForm({onSubmit, data, onDelete}) {
    const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
    const {isValid, isFormReadyToSubmit, values} = formState;
    const titleRef = useRef();
    const dateRef = useRef();
    const postRef = useRef();
    const {userId} = useContext(UserContext);

    const focusError = (isValid) => {
        switch (true) {
            case !isValid.title:
                titleRef.current.focus();
                break;
            case !isValid.date:
                dateRef.current.focus();
                break;
            case !isValid.post:
                postRef.current.focus();
                break;
        }
    };

    useEffect(() => {
            if (!data) {
                dispatchForm({type: 'CLEAR'});
                dispatchForm({type: 'SET_VALUE', payload: {userId: userId}});
            }
            dispatchForm({type: 'SET_VALUE', payload: {...data}})
        }
        , [data]);

    useEffect(() => {
        let timerId;
        if (!isValid.date || !isValid.post || !isValid.title) {
            focusError(isValid)
            timerId = setTimeout(() => {
                dispatchForm({type: 'RESET_VALIDITY'});
            }, 2000);
        }
        return () => {
            clearTimeout(timerId);
        };
    }, [isValid]);

    useEffect(() => {
        if (formState.isFormReadyToSubmit) {
            onSubmit(values);
            dispatchForm({type: 'CLEAR'});
            dispatchForm({type: 'SET_VALUE', payload: {userId: userId}});
        }
    }, [isFormReadyToSubmit]);

    useEffect(() => {
        dispatchForm({type: 'SET_VALUE', payload: {userId: userId}});

    }, [userId]);

    const onChange = (e) => {
        dispatchForm({type: 'SET_VALUE', payload: {[e.target.name]: e.target.value}});
    };

    const addJournalItem = (e) => {
        e.preventDefault();
        dispatchForm({type: 'SUBMIT'});
    };
    const deleteJournalItem = (id) => {
        onDelete(data && data.id);
        dispatchForm({type: 'CLEAR'});
        dispatchForm({type: 'SET_VALUE', payload: {userId: userId}});
    }

    return (
        <form className={styles['journal-form']} onSubmit={addJournalItem}>
            <div className={styles['form-row']}>
                <Input type='text' name='title' ref={titleRef}
                       isValid={isValid.title}
                       value={values.title} onChange={onChange}
                       appearence='title'/>
                {data?.id && <button className={styles['delete']} type='button'>
                    <img src='/archive.svg' alt='Кнопка удалить'
                         onClick={deleteJournalItem}/>
                </button>}
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="date" className={styles['form-label']}>
                    <img src='/calendar.svg' alt='Иконка календаря'/>
                    <span>Дата</span>
                </label>
                <Input id='date' ref={dateRef} isValid={isValid.date}
                       type='date' name='date'
                       value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
                       onChange={onChange}/>
            </div>
            <div className={styles['form-row']}>
                <label htmlFor="tag" className={styles['form-label']}>
                    <img src='/folder.svg' alt='Иконка папки'/>
                    <span>Метки</span>
                </label>
                <Input id='tag' type='text' name='tag'
                       value={values.tag} onChange={onChange}/>
            </div>
            <textarea name='post' ref={postRef}
                      cols='30' rows='10' value={values.post} className={cn(styles['input'], {
                [styles['invalid']]: !isValid.post
            })}
                      onChange={onChange}></textarea>
            <Button>Сохранить</Button>
        </form>
    )
}

export default JournalForm;
