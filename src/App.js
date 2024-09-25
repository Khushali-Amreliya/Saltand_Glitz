import React from 'react'
import Layout from './Components/Layout'
import "./App.css"
import { ToastContainer } from 'react-toastify'
// import ImportExcel from './Pages/ImportExcel'

const App = () => {
  return (
    <div>
      {/* <ImportExcel></ImportExcel> */}
      <Layout></Layout>
      <ToastContainer autoClose={2000} position='top-center' />
    </div>
  )
}

export default App