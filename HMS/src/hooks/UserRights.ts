import { useState, useEffect } from 'react';
import { useAuth } from 'react-oidc-context';
import axios from 'axios';

function useUserRights() {
  const auth = useAuth();
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!auth.isAuthenticated || !auth.user?.access_token) return;

      try {
        const response = await axios.get('http://localhost:8085/hello', {
          headers: {
            Authorization: `Bearer ${auth.user.access_token}`,
          },
        });

        setData(response.data);
      } catch (err:any) {
        setError(err.response?.data || 'Unauthorized or fetch error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [auth]);

  return { data, error, loading };
}

export default useUserRights;
