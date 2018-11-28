import React, { Fragment } from 'react';
import styled from 'styled-components';
import DescriptionBox from './DescriptionBox';

const Comment = styled.p`
  margin-bottom: 3px;
`;

const DescriptionBoxList = () => {
  return (
    <Fragment>
      <DescriptionBox title="すぐに始められる" src="/images/1.png" alt="start">
        <Comment>曲の準備はYouTube動画IDの入力だけ。</Comment>
        <Comment>曲ファイルの準備は必要なし。</Comment>
      </DescriptionBox>

      <DescriptionBox title="簡単に創作できる" src="/images/2.png" alt="create">
        <Comment>クリックだけでノーツを配置。</Comment>
        <Comment>直感的に創作譜面。</Comment>
      </DescriptionBox>

      <DescriptionBox title="その場で遊べる" src="/images/3.png" alt="play">
        <Comment>プレイモードで遊ぼう。</Comment>
        <Comment>太鼓さん次郎も必要なし。</Comment>
      </DescriptionBox>

      <DescriptionBox title="みんなと共有できる" src="/images/3.png" alt="play">
        <Comment>創作譜面は保存・共有。</Comment>
        <Comment>みんなの譜面も見てみよう。</Comment>
      </DescriptionBox>
    </Fragment>
  );
};

export default DescriptionBoxList;
