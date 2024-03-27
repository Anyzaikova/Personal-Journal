import './App.css'
import LeftPanel from "./layouts/LeftPanel/LeftPanel.jsx";
import Body from "./layouts/Body/Body.jsx";
import Header from "./components/Header/Header.jsx";
import JournalList from "./components/JournalList/JournalList.jsx";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton.jsx";
import {useEffect, useState} from "react";
import JournalForm from "./components/JournalForm/JournalForm.jsx";

// const INITIAL_DATA = [
//     {
//         id: 1,
//         title: 'Подготовка к обновлению курсов',
//         text: 'Горные походы открывают удивительные природные ландшафты',
//         date: new Date()
//     },
//     {
//         id: 2,
//         title: 'Поход в горы',
//         text: 'Думал, что очень много времени',
//         date: new Date()
//     }
// ]

function App() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (data) {
            setItems(data.map(item => ({
                ...item,
                date: new Date(item.date),
            })));
        }
    }, []);

    useEffect(() => {
        if (items.length) {
            localStorage.setItem('data', JSON.stringify(items))
        }
    }, [items]);

    const addItem = (item) => {
        setItems(prev => [...prev, {
            post: item.post,
            title: item.title,
            date: new Date(item.date),
            id: prev.length > 0 ? Math.max(...prev.map(i => i.id)) + 1 : 1,
        }]);
    }


    return (
        <div className='app'>
            <LeftPanel>
                <Header/>
                <JournalAddButton/>
                <JournalList items={items}/>
            </LeftPanel>
            <Body>
                <JournalForm onSubmit={addItem}/>
            </Body>
        </div>

    )
}

export default App;
