import { createContext, useEffect, useReducer } from "react";

const NotificationContext = createContext()

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'show':
            return {...state, notification: action.payload}
        case 'hide':
            return {...state, notification: null}
        default:
            return state
    }
}

const useNotification = (initialState, delay) => {
    const [state, dispatch] = useReducer(notificationReducer, initialState);
  
    useEffect(() => {
      let timeoutId;
  
      if (state.notification) {
        timeoutId = setTimeout(() => {
          dispatch({ type: 'hide' });
        }, delay);
      }
  
      return () => {
        clearTimeout(timeoutId);
      };
    }, [state.notification, delay]);
  
    const showNotification = (payload) => {
      dispatch({ type: 'show', payload });
    };
  
    const hideNotification = () => {
      dispatch({ type: 'hide' });
    };
  
    return [state.notification, showNotification, hideNotification];
  };

/*export const useNotificationValue = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}*/

export const NotificationContextProvider = (props) => {
    const [notification, showNotification, hideNotification] = useNotification('', 2000)
  
    return (
      <NotificationContext.Provider value={{notification, showNotification, hideNotification}}>
        {props.children}
      </NotificationContext.Provider>
    )
}

export default NotificationContext