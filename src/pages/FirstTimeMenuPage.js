import React from 'react'
import Footer from '../components/general/Footer'
import HeaderWithoutInputs from '../components/general/HeaderWithoutInputs'
import MenuForm from '../components/general/MenuForm'

const FirstTimeMenuPage = ({user}) => {
  return (
   <>
   <HeaderWithoutInputs />
   <MenuForm user={user}/>
   <Footer/>
   </>
  )
}

export default FirstTimeMenuPage