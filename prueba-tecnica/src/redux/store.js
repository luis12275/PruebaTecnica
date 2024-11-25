import { createStore, combineReducers, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { UsuarioReducer } from './UsuriosDuck'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['']
}

const appReducer = combineReducers({
    Usuario: UsuarioReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    localStorage.removeItem('persist:root')
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function generateStore() {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
  let persistor = persistStore(store)
  return { store, persistor }
}
