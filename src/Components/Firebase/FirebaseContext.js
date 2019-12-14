import React from 'react'

const FirebaseContext = React.createContext({})

export const FirebaseProvider = FirebaseContext.Provider
export const FirebaseConsumer = FirebaseContext.Consumer

export default FirebaseContext