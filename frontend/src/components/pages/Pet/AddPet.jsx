import api from '../../../utils/api';

import styles from './AddPet.module.css'

import PetForm from '../../form/PetForm';


import { useState } from 'react'; 
import { useNavigate } from "react-router-dom";

import useFlashMessage from '../../../hooks/useFlashMessage';

const AddPet = () => {
    return ( 
        <section className={styles.addpet_header}>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>
            </div>
            <PetForm btnText="Cadastrar"/>
        </section>
     );
}
 
export default AddPet;