import React from 'react';
import jwt_decode from "jwt-decode";
import { PATIENT, PSYCHOLOGIST } from '../constants/UserTypes';

const ProtectedRoute = ({ element, type }) => {
    const token = localStorage.getItem('token');


    if (token) {
        const decodedToken = jwt_decode(token);
        const userType = decodedToken.userType;
        if (type) {
            if (type === PATIENT) {
                if(userType === PATIENT){
                    return (element);
                }
                else{
                    return(<p>Kullanıcı tipi "Psikolog" olan uyeler bu sayfaya erisemez.</p>);
                }
            }
            else if (type === PSYCHOLOGIST) {
                if(userType === PSYCHOLOGIST){
                    return (element);
                }
                else{
                    return(<p>Kullanıcı tipi "Hasta" olan uyeler bu sayfaya erisemez.</p>);
                }
            }
            else {
                console.log("Hata!");
                <p>Hata!</p>
            }
        }
        else {
            return (element);
        }
    }
    else {
        return (
            <p>Lutfen giris yapiniz.</p>
        );
    }
};

export default ProtectedRoute;
