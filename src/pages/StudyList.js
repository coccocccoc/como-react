import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { mockStudies } from '../data/mockData1';
import StudyCard from '../components/StudyCard';
import Navbar from '../components/Navbar';
import '../styles/StudyList.css';
import SearchIcon from '../img/Group 1418.svg';
import Footer from '../components/Footer';

function StudyList() {
  const [showTechFilter, setShowTechFilter] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showMethodFilter, setShowMethodFilter] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('전체');
  const [studyList, setStudyList] = useState([]);

  const location = useLocation();
  const newStudy = location.state;

  useEffect(() => {
    setStudyList(mockStudies);
  }, []);

  // 새로 등록된 스터디 추가
  useEffect(() => {
    if (newStudy) {
      setStudyList((prev) => {
        const isDuplicate = prev.some((study) => JSON.stringify(study) === JSON.stringify(newStudy));
        if (!isDuplicate) {
          return [newStudy, ...prev];
        }
        return prev;
      });
    }
  }, [newStudy]);

  const toggleTechFilter = () => {
    setShowTechFilter((prev) => {
      if (!prev) setShowMethodFilter(false);
      return !prev;
    });
  };

  const toggleMethodFilter = () => {
    setShowMethodFilter((prev) => {
      if (!prev) setShowTechFilter(false);
      return !prev;
    });
  };

  const handleTagClick = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setShowMethodFilter(false);
  };

  const techTags = [
    'javascript', 'typescript', 'react', 'vue', 'nodejs', 'spring', 'java', 'nextjs',
    'nestjs', 'express', 'go', 'c', 'python', 'django', 'swift', 'jest', 'kotlin',
    'mysql', 'mongodb', 'php', 'graphql', 'firebase', 'reactnative', 'unity',
    'flutter', 'aws', 'kubernetes', 'docker', 'git', 'figma', 'zeplin', 'svelte'
  ];

  const filteredStudies = studyList
    .filter((study) =>
      selectedTags.length === 0 ||
      selectedTags.every((tag) =>
        (study.tags || study.techStacks || [])
          .map((t) => t.toLowerCase())
          .includes(tag.toLowerCase())
      )
    )
    .filter((study) => study.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((study) => {
      if (selectedMethod === '전체') return true;
      return study.status === selectedMethod;
    });

  return (
    <div className="study-list-page">
      <Navbar />
      <div className="study-list-wrapper">
        <div className="study-banner" />

        {/* 필터 + 검색창 */}
        <div className="study-top-bar">
          <div className="study-filter">
            <button
              className={`filter-button ${showTechFilter ? 'active' : ''}`}
              onClick={toggleTechFilter}>
              기술 스택 ⌄
            </button>
            <div className="filter-dropdown-wrapper">
              <button
                className={`filter-button ${showMethodFilter ? 'active' : ''}`}
                onClick={toggleMethodFilter}>
                진행 방식 ⌄
              </button>
              {showMethodFilter && (
                <div className="method-filter-dropdown">
                  {['전체', '온라인', '오프라인', '온/오프라인'].map((method) => (
                    <div
                      key={method}
                      className="method-option"
                      onClick={() => handleMethodSelect(method)}>
                      {method}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 검색창 */}
          <div className="study-search">
            <input
              type="text"
              placeholder="스터디를 검색해보세요."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-button">
              <img src={SearchIcon} alt="검색" />
            </button>
          </div>
        </div>

        {/* 기술 스택 드롭다운 */}
        {showTechFilter && (
          <div className="tech-filter-dropdown">
            {techTags.map((tag) => (
              <div
                key={tag}
                className={`tech-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagClick(tag)}>
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* 스터디 카드 리스트 */}
        <div className="studylist-study-list">
          {filteredStudies.map((study, index) => (
            <StudyCard key={index} study={study} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default StudyList;