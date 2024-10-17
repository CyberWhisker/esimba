import React from 'react'
import MasterAdmin from '../../../layouts/MasterAdmin'
import BaptismForm from './BaptismForm'
import { useParams } from 'react-router-dom'

function Form() {
    const {type} = useParams();
  return (
    <MasterAdmin>
        {type == 'baptism' && <BaptismForm/>}
    </MasterAdmin>
  )
}

export default Form