import React from 'react';
import { Card, CardHeader, CardBody, CardText, Container } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 100px;
`;

const StyledCard = styled(Card)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const News = () => (
  <StyledContainer>
    <StyledCard>
      <CardHeader>
        更新情報：太鼓さん次郎エクスポートを追加しました（2018/10/03）
      </CardHeader>
      <CardBody>
        <CardText>
          太鼓さん次郎エクスポートを追加しました。現在、連打・大連打・風船のエクスポート処理が不完全なので、今後修正していく予定です。
        </CardText>
      </CardBody>
    </StyledCard>
    <StyledCard>
      <CardHeader>
        更新情報：創作の達人を大幅にアップデートしました（2018/09/30）
      </CardHeader>
      <CardBody>
        <CardText>
          創作画面にYouTube動画が表示されるようになりました。プレイモードが追加されました。倍速設定ができるようになりました。また、創作譜面を検索できるようになりました。その他にも細かなデザイン修正などが行われています。是非お楽しみください。また、システムの不具合やバグなどを見つけた場合には、
          <a
            href="https://twitter.com/solt9029"
            target="_blank"
            rel="noopener noreferrer"
          >
            @solt9029
          </a>
          までご連絡ください。
        </CardText>
      </CardBody>
    </StyledCard>
  </StyledContainer>
);

export default News;
