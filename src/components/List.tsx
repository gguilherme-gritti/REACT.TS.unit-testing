import { useState } from "react";

type ListProps = {
    initialItems: string[]
}

const List = ({ initialItems }: ListProps) => {
    const [newItem, setNewItem] = useState("");
    const [list, setList] = useState(initialItems);
  
    const addToList = () => {
      setList(state => [...state, newItem]);
    }
  
    /* 
      Simulando um intervalor de tempo, como a espera de um retorno de api
    */
    const eventAddToList = () => {
      setTimeout(() => {
        setList(state => [...state, newItem]);
      }, 1000)
    }
  
    const eventRemoveFromList = (item: string) => {
      setTimeout(()=> {
        setList(state => state.filter(item => item !== item));
      }, 1000);
    }
  
    return (
      <>
        <input 
          placeholder='Novo item' 
          value={newItem} 
          onChange={e => setNewItem(e.target.value)} 
          type="text" 
        />
        <h1 className="world">Salve mundo</h1>
        <br></br>
        <button onClick={addToList}>Adicionar</button>
        <button onClick={eventAddToList}>Adicionar Event</button>
      <ul>
        {list.map(item => (
          <li key={item}>
            {item}
            <button onClick={() => eventRemoveFromList(item)}>Remover</button>
          </li>
        ))}
      </ul>
      </>
    )
}

export default List;