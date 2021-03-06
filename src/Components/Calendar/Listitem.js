import React from 'react'
import Editlabel from './Editlabel';
import {Draggable} from 'react-beautiful-dnd';
import {StateDispatchContext} from './stateManager.js';

const Itemmenu = (props) => {
  return (
    <button
      className="item-menu"
      autoFocus={true}
      style={{ top: props.posY, left: props.posX }}
      onClick={props.onClick}
      onBlur={props.onBlur}
    >Delete</button>
  );
};

const Listitem = (props) => {
  // State hooks
  const [contextMenu, setContextMenu] = React.useState([0,0,false]);

  // Context consumers
  const stateDispatch = React.useContext(StateDispatchContext);

  // assigning props
  const setIsEdit = (id, newState) => {
    stateDispatch({
      type: "SET_IS_EDIT",
      itemId: props.id,
      newState: !props.itemObject.isEdit,
    });
  };

  const DeleteButton = () => {
    return (
        <button
          className="deleteItemButton list-item-objects"
          onClick={event => setContextMenu([event.pageX, event.pageY, !contextMenu[2]])}
        >
        {String.fromCharCode(9899) + ' ' + String.fromCharCode(9899) + ' ' + String.fromCharCode(9899)}
        </button>
    );
  };

  const Container = (props) => {
    return (
      <Draggable 
        key={props.id}
        draggableId={props.id.toString()} 
        index={parseInt(props.index)}
      >
        {(provided) => (
          <div 
            className="list-item" 
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {props.children}
          </div>
        )}
      </Draggable>
    );
  };

  return (
      <Container id={props.id} index={parseInt(props.index)}>
        <Editlabel
          className={"list-item-objects list-item-label"}
          id={props.id}
          content={props.itemObject.content}
          isEdit={props.itemObject.isEdit}
          onChange={props.onChange}
          setIsEdit={setIsEdit}
        />
        <DeleteButton />
        {contextMenu[2] && 
          <Itemmenu
            posX={contextMenu[0]}
            posY={contextMenu[1]}
            onClick={props.onDeleteClick}
          onBlur={event => setContextMenu([0,0,!contextMenu])}
          />
        }
      </Container>
  );
};

export default Listitem;
