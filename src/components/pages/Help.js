import React from 'react';
import Navbar from '../parts/Navbar';
import Footer from '../parts/Footer';
import { Card, CardHeader, CardBlock, CardText, Container } from 'reactstrap';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 50px;
`;

const StyledCard = styled(Card)`
  margin-top: 15px;
  margin-bottom: 15px;
`;

const Help = () => (
  <div>
    <Navbar />
    <StyledContainer>
      <StyledCard>
        <CardHeader>どうやって創作譜面をするの？</CardHeader>
        <CardBlock>
          <CardText>
            ●
            右側の画面のドンやカッを選択した状態で、中央の画面をクリックするとノーツが配置できます。
          </CardText>
          <CardText>
            ●
            または、中央の画面で数字をタイピングすることでノーツを配置することもできます。こちらの手法ですと、素早く創作譜面ができるのでお勧めです。1がドン、2がカッ、3が大ドン、4が大カッ、5が連打、6が大連打、7が風船、0が空白、といったように対応しています。
          </CardText>
        </CardBlock>
      </StyledCard>

      <StyledCard>
        <CardHeader>どうやって再生するの？</CardHeader>
        <CardBlock>
          <CardText>
            ●
            YouTube動画IDとBPMとOFFSETがフォームに入力されていることを確認してください。
          </CardText>
          <CardText>
            ● YouTube動画を再生すると、それに合わせて譜面が再生されます。
          </CardText>
        </CardBlock>
      </StyledCard>

      <StyledCard>
        <CardHeader>YouTube動画IDって何？</CardHeader>
        <CardBlock>
          <CardText>
            ●
            YouTube動画URLが「https://www.youtube.com/watch?v=jhOVibLEDhA」だとすると、「jhOVibLEDhA」がYouTube動画IDです。
          </CardText>
          <CardText>
            ●
            分からない場合には、YouTube動画IDを入力するフォームにそのままYouTube動画URLを貼り付けてください。自動的にフォーマットされます。
          </CardText>
        </CardBlock>
      </StyledCard>

      <StyledCard>
        <CardHeader>プレイモードではどうやってプレイするの？</CardHeader>
        <CardBlock>
          <CardText>
            ●
            上側の画面をクリックしてください。その状態で、FまたはJのキーを入力するとドン、DまたはKのキーを入力するとカッになります。
          </CardText>
        </CardBlock>
      </StyledCard>

      <StyledCard>
        <CardHeader>他に分からないことがあるんだけど！</CardHeader>
        <CardBlock>
          <CardText>
            ● 何か分からない点や、追加して欲しい機能などがありましたら、
            <a
              href="https://twitter.com/solt9029"
              target="_blank"
              rel="noopener noreferrer"
            >
              @solt9029
            </a>
            までご連絡いただけると幸いです。よろしくお願いします。
          </CardText>
        </CardBlock>
      </StyledCard>
    </StyledContainer>
    <Footer />
  </div>
);

export default Help;
