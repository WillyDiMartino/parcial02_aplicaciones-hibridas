import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useCheckAccess = (endpoint) => {

    const navigate = useNavigate();

    useEffect(() => {
        const checkAccess = async (endpoint) => {
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        Autorization: `Bearer ${Cookies.get('token')}`,
                    },
                });
                if (response.status === 403) {
                    navigate('/');
                }
            } catch (error) {
                console.error('Error al verificar acceso al admin:', error);
                navigate('/');
            }
        };
        checkAccess();
    }, [navigate, endpoint]);
};

export { useCheckAccess }