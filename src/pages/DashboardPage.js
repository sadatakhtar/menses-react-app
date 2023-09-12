import React from 'react'
import ResultsForm from '../components/general/ResultsForm';
import Menu from '../components/general/Menu';

const DashboardPage = () => {
    const pageModel = (
       <div>
        <ResultsForm title="Dashboard"/>
        <Menu />
       </div>
    )
  return pageModel;
}

export default DashboardPage