import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Container } from '@/components/common/layouts/Container';
import { useApi } from '@/context/ApiContext';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath, RouterPath } from '@/routes/path';

const apiServers: { [key: string]: string } = {
  유경미: 'http://3.17.81.229:8080',
  김태윤: 'http://43.202.1.135:8080',
  강수민: 'http://3.34.182.32:8080',
};

export const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { setApiUrl } = useApi();
  const [selectedServer, setSelectedServer] = useState('유경미');

  useEffect(() => {
    setApiUrl(apiServers[selectedServer]); // 선택된 서버의 URL로 설정
  }, [selectedServer, setApiUrl]);

  const handleLogin = () => {
    navigate(getDynamicPath.login());
  };

  return (
    <Wrapper>
      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <Link to={RouterPath.home}>
          <Logo
            src="https://gift-s.kakaocdn.net/dn/gift/images/m640/pc_gift_logo.png"
            alt="카카오 선물하기 로고"
          />
        </Link>
        <RightWrapper>
          <select value={selectedServer} onChange={(e) => setSelectedServer(e.target.value)}>
            {Object.keys(apiServers).map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
          {authInfo ? (
            <LinkButton onClick={() => navigate(RouterPath.myAccount)}>내 계정</LinkButton>
          ) : (
            <LinkButton onClick={handleLogin}>로그인</LinkButton>
          )}
        </RightWrapper>
      </Container>
    </Wrapper>
  );
};

export const HEADER_HEIGHT = '54px';

export const Wrapper = styled.header`
  position: fixed;
  z-index: 9999;
  width: 100%;
  max-width: 100vw;
  height: ${HEADER_HEIGHT};
  background-color: #fff;
  padding: 0 16px;
`;

const Logo = styled.img`
  height: ${HEADER_HEIGHT};
`;

const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LinkButton = styled.p`
  align-items: center;
  font-size: 14px;
  color: #000;
  text-decoration: none;
  cursor: pointer;
  margin-left: 12px;
`;
