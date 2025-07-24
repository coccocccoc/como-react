import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      axios.post('http://localhost:8080/api/oauth/google', { code })
        .then(res => {
          localStorage.setItem('jwt', res.data.token);
          navigate('/');
        })
        .catch(() => alert('로그인 실패'));
    }
  }, []);

  return <div style={{ color: 'white', padding: '100px' }}>로그인 처리 중...</div>;
}

export default GoogleCallback;