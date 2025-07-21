export const cardData = {
  myStudies: [
    { id: 1,
    status: "온라인",
    dueDate: "2025.07.08",
    title: "컴퓨터랑 놀 사람! 여기여기 모여라~!",
    tags: ["리액트", "자바"],
    nickname: "말하는 감자"
    },
    { id: 1,
    status: "온라인",
    dueDate: "2025.07.31",
    title: "컴퓨터랑 놀 사람! 여기여기 모여라~!",
    tags: ["리액트", "자바"],
    nickname: "말하는 감자"
    },
    { id: 1,
    status: "온라인",
    dueDate: "2025.07.10",
    title: "컴퓨터랑 놀 사람! 여기여기 모여라~!",
    tags: ["리액트", "자바"],
    nickname: "말하는 감자" }
  ],
  popularStudies: [
    { id: 2,
    status: "오프라인",
    dueDate: "2025.08.10",
    title: "백엔드 개발자 모여! Spring 제대로 배워봐요",
    tags: ["Spring", "MySQL"],
    nickname: "백엔드왕"
    },
    { id: 2,
    status: "오프라인",
    dueDate: "2025.08.10",
    title: "백엔드 개발자 모여! Spring 제대로 배워봐요",
    tags: ["Spring", "MySQL"],
    nickname: "백엔드왕"
    },
    { id: 2,
    status: "오프라인",
    dueDate: "2025.08.10",
    title: "백엔드 개발자 모여! Spring 제대로 배워봐요",
    tags: ["Spring", "MySQL"],
    nickname: "백엔드왕"
    },
    { id: 2,
    status: "오프라인",
    dueDate: "2025.08.10",
    title: "백엔드 개발자 모여! Spring 제대로 배워봐요",
    tags: ["Spring", "MySQL"],
    nickname: "백엔드왕" }
  ],
  localStudies: [
    { id: 3,
    section: "local",
    status: "오프라인",
    dueDate: "2025.07.15",
    title: "AI 공부 같이 하실 분!",
    tags: ["AI"],
    nickname: "포항 AI팀"
    },
    { id: 3,
    section: "local",
    status: "오프라인",
    dueDate: "2025.07.03",
    title: "AI 공부 같이 하실 분!",
    tags: ["AI"],
    nickname: "포항 AI팀"
    },
    { id: 3,
    section: "local",
    status: "오프라인",
    dueDate: "2025.07.07",
    title: "AI 공부 같이 하실 분!",
    tags: ["AI"],
    nickname: "포항 AI팀"
    },
    { id: 3,
    section: "local",
    status: "오프라인",
    dueDate: "2025.07.06",
    title: "AI 공부 같이 하실 분!",
    tags: ["AI"],
    nickname: "포항 AI팀" }
  ]
};

export const studyInfo = {
  title: "BitO 스터디 신청 (프론트 인원 추가 모집)", // 글 제목
  author: "bongbong", // 글 작성자
  createdAt: "2025.07.05", // 글 작성일
  currentMemberCount: "4", // 현재 인원 수
  totalMemberCount: "6", // 총 모집 인원 수
  method: "온/오프라인", // 스터디 진행 방식
  startDate: "2025.07.18", // 시작일
  endDate: "2025.08.21", // 종료일
  language: "자바" 
};

export const boardPosts = {
  공지사항: [
    { id: 1, title: "스터디 시작일 공지", writer: "말하는 감자", date: "2025.07.06", content: "공지사항내용~~" },
    { id: 2, title: "스터디 시작일 공지22", writer: "말하는 감자", date: "2025.07.08", content: "공지사항내용22~~" }
  ],
  인증방: [
    { id: 3, title: "1주차 과제 인증", writer: "포항 AI팀", date: "2025.07.02", content: "인증 내용", category: "자유방" },
    { id: 4, title: "2주차 과제 인증", writer: "백엔드왕", date: "2025.07.08", content: "인증 내용", category: "자유방" },
    { id: 5, title: "3주차 과제 인증", writer: "말하는 감자", date: "2025.07.11", content: "인증 내용", category: "자유방" }
  ],
  자유방: [
    { id: 6, title: "오늘 날씨 너무 덥네요", writer: "백엔드왕", date: "2025.07.08", content: "자유방내용", category: "자유방" }
  ],
  질문방: [
    { id: 7, title: "자바 환경설정 질문 있습니다", writer: "devKim", date: "2025.07.07", content: "질문내용" }
  ]
};
