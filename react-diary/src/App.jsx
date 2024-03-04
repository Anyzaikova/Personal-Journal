import './App.css'
import Button from "./components/Button/Button.jsx";
import JournalItem from "./components/JournalItem/JournalItem.jsx";
import CardButton from "./components/CardButton/CardButton.jsx";

function App () {
    const data = [
        {
            title: 'Подготовка к обновлению курсов',
            text: 'Горные походы открывают удивительные природные ландшафты',
            date: new Date ()
        },
        {
            title: 'Поход в горы',
            text: 'Думал, что очень много времени',
            date: new Date ()
        }
    ]

    return (
        <>
            <div>Проект</div>
            <Button name={'Сохранить'}/>
            <CardButton>
            Новое воспоминание
            </CardButton>
            <CardButton>
                <JournalItem
                    title={data[0].title}
                    text={data[0].text}
                    date={data[0].date}
                />
            </CardButton>
            <CardButton>
                <JournalItem title={data[1].title}
                             text={data[1].text}
                             date={data[1].date}/>
            </CardButton>
        </>

    )
}

export default App
