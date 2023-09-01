import React from 'react'
import '../styles/NewCyclePage.css'
// import AddCycleDetailsForm from '../components/general/AddCycleDetailsForm'
import Footer from '../components/general/Footer'
import HeaderWithoutInputs from '../components/general/HeaderWithoutInputs'

const NewCyclePage = () => {
  return (
    <div className='new-cycle-page-container'>
        <HeaderWithoutInputs />
        {/* <AddCycleDetailsForm /> */}
        <div>
          <h1>New cycle page</h1>
        </div>
        <Footer />
    </div>
  )
}

export default NewCyclePage