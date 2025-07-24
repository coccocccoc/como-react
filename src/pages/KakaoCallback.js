import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function KakaoCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      fetch(`http://localhost:8080/api/oauth/kakao?code=${code}`, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("백엔드 응답:", data);

          localStorage.setItem("token", data.token);

          localStorage.setItem("nickname", data.nickname);

          navigate("/");
        })
        .catch((error) => {
          console.error("카카오 로그인 에러:", error);
          alert("카카오 로그인 중 오류가 발생했습니다.");
        });
    }
  }, [navigate]);

  return null;
}

export default KakaoCallback;