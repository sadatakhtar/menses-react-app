import React from 'react'
import ResultsForm from '../components/general/ResultsForm';
import Menu from '../components/general/Menu';

const DashboardPage = ({user}) => {
    const pageModel = (
       <div>
        <ResultsForm title="Dashboard" user={user}/>
        <Menu />
       </div>
    )
  return pageModel;
}

export default DashboardPage