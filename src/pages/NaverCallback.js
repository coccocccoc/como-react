import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function NaverCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    const state = new URL(window.location.href).searchParams.get('state');

    if (code && state) {
      axios.post('http://localhost:8080/api/oauth/naver', { code, state })
        .then(res => {
          localStorage.setItem('jwt', res.data.token);
          navigate('/');
        })
        .catch(err => {
          console.error(err);
          alert('네이버 로그인 실패');
        });
    }
  }, []);

  return <div style={{ color: 'white', padding: '100px' }}>네이버 로그인 처리 중...</div>;
}

export default NaverCallback;
