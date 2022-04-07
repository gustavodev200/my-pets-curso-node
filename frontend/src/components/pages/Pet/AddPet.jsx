import api from '../../../utils/api';

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm';


import { useState } from 'react'; 
import { useNavigate } from "react-router-dom";

import useFlashMessage from '../../../hooks/useFlashMessage';

const AddPet = () => {
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate();

    const registerPet = async (pet) => {
        let msgType = 'success'

        const formData = new FormData
    }

    return ( 
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText="Cadastrar"/>
        </section>
     );
}
 
export default AddPet;