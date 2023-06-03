import React, { useEffect, useState } from 'react';
import { getPsychologist } from '../actions/AppActions';
import { PSYCHOLOGIST_FETCHED } from '../constants/ActionTypes';
import appStore from '../stores/AppStore';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PsychologistProfile(props) {
  const [psychologist, setPsychologist] = useState(null);

  const { id } = useParams();
  console.log("ID: " + id);

  useEffect(() => {
    getPsychologist({ id });

    const handlePsychologistFetched = (psychologist) => {
      console.log(psychologist);
      setPsychologist(psychologist);
    };

    appStore.on(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);

    return () => {
      appStore.off(PSYCHOLOGIST_FETCHED, handlePsychologistFetched);
    };
  }, [id]);

  return (
    <div>
      <h2>Psikolog Profil Sayfası</h2>
      {psychologist ? (
        <>
          <p>ID: {id}</p>
          <p>Ad: {psychologist.name}</p>
          <p>Soyad: {psychologist.surname}</p>
          <p>Email: {psychologist.email}</p>
          <Link to={`/createAppointment/${id}`}>
            <button>Randevu Talep Et</button>
          </Link>
        </>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}

export default PsychologistProfile;
