import './App.css'
import './index.css'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  // array
  const [items, setItems] = useState( () => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [{itemName: 'DeleteThis', isSelected: true}];
    
});

  const [inputValue, setInputValue] = useState("");

  useEffect(() =>
  {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => 
  {
    const value = event.target.value;
    setInputValue(value);
  }


  const handleAddButtonClick = () => 
  {
    if (inputValue.trim() !== '') 
    { 
        const newItem = {
          itemName: inputValue,
          isSelected: false,
          
        };    
      const newItems = [...items, newItem];
      setItems (newItems);
      setInputValue('');
      notify();
     
    }
    else if (inputValue.trim() == '')
    {
      error();
    }
  }

  const toggleItemSelection = (index: number) => 
  {
    
      const updatedItems = items.map((item: { isSelected: boolean }, i: number) => ({
        ...item,
        isSelected: i === index ? !item.isSelected : item.isSelected,
      }));
      setItems(updatedItems);
      if (updatedItems[index].isSelected) {
        purchased();
      }
  }
  

  const deleteItem = (index: number) =>
  {
    const updateItem = [...items];
    updateItem.splice(index, 1);
    setItems(updateItem);
    deletes();
  }

  const notify = () => 
  {
    toast.success('Added!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const purchased = () => 
  {
    toast.success('Purchased!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  const error = () =>
  {
    toast.error('Empty input!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }

  const deletes = () =>
  {
    toast.error('Deleted!', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  }

  return (
    
      <div className = "appBG">
       
        <div className = "main">
          <h1> My List</h1>
          <div className = "add-item">
            <input 
            
              value = {inputValue} 
              onChange = {(event) => 
                {
                  setInputValue(event.target.value);
                  handleInputChange(event);
                  
                }}

              onKeyPress = {(event) => 
                
                {
                      if(event.key == "Enter") 
                      {
                        handleAddButtonClick();                  
                      }
                }} 
              className = "add-input" 
              placeholder = "  Add item ... "
              />
                  <button
                    className="button-add"
                    onClick={() => {
                      handleAddButtonClick();
                    }} >
                    Add
                  </button>
          </div>

          <div>
            <div className="item-list">
              {items.map((item, index) => (
                <div className="item-container" key={index}>

                  
                  <label className = "custom-checkbox">

                      <input
                        type = "checkbox"
                        checked = {item.isSelected}
                        onChange = {() => toggleItemSelection(index)}
                      />
                      <span className = "checkmark"></span>

                  </label>  
                  <div className = "item-name">
                    {item.isSelected ? (
                      <span className="completed">{item.itemName}</span>
                    ) : (
                      <span>{item.itemName} </span>
                    )}
                    <button onClick = {()=> deleteItem(index)} className = "button-delete" >Delete</button>

                  </div>
                </div>
              ))}
            </div>
            
          </div>

        </div>
        <ToastContainer />
      </div>
  )
}

export default App
