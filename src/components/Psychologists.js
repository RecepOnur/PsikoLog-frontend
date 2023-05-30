import { useEffect, useState } from "react";
import { PSYCHOLOGISTS_FETCHED } from "../constants/ActionTypes";
import appStore from "../stores/AppStore";
import { getPsychologists } from "../actions/AppActions";
import { Link } from 'react-router-dom';

const Psychologists = () => {
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    getPsychologists();

    const handlePsychologistsFetched = (data) => {
      setPsychologists(data);
    };

    appStore.on(PSYCHOLOGISTS_FETCHED, handlePsychologistsFetched);

    return () => {
      appStore.off(PSYCHOLOGISTS_FETCHED, handlePsychologistsFetched);
    };
  }, []);


  return (
    <div>
      <h1>Psikologlar</h1>
      {psychologists.map((psychologist) => (
        <div key={psychologist.id}>
          <Link to={`/psychologists/${psychologist.id}`}>
            {psychologist.name} {psychologist.surname}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Psychologists;
